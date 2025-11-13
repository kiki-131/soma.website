const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Required env vars:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO, MAILER_SECRET

const PORT = process.env.PORT || 3000;
const SECRET = process.env.MAILER_SECRET || '';

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = (process.env.SMTP_SECURE === 'true') || (port === 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Set short timeouts so an unreachable SMTP server fails fast instead of
  // causing the entire /send request to hang until the client times out.
  // Defaults are intentionally conservative (faster failure) but can be
  // overridden by environment variables if needed.
  const connectionTimeout = parseInt(process.env.SMTP_CONNECTION_TIMEOUT || '5000', 10);
  const greetingTimeout = parseInt(process.env.SMTP_GREETING_TIMEOUT || '5000', 10);
  const socketTimeout = parseInt(process.env.SMTP_SOCKET_TIMEOUT || '10000', 10);

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout,
    greetingTimeout,
    socketTimeout,
  });
}

app.get('/health', (req, res) => res.json({ ok: true }));

// Render uses /healthz by default for internal health checks in some configs.
// Add an alias so both /health and /healthz return 200 OK.
app.get('/healthz', (req, res) => res.json({ ok: true }));

// Optional root path to help debugging from a browser
app.get('/', (req, res) => res.send('soma-mailer: ok'));

app.post('/send', async (req, res) => {
  try {
    // Immediate request logging to help debug arrival and timing
    const start = Date.now();
    try {
      console.log('/send POST received', { ip: req.ip || (req.connection && req.connection.remoteAddress), keys: Object.keys(req.body || {}), ts: new Date().toISOString() });
    } catch (e) {}
    // Useful quick-debug bypass: if MAILER_DEBUG=true, accept requests and
    // return success without attempting SMTP. Set this in Render for a
    // quick integration test when SMTP may be unavailable.
    if (process.env.MAILER_DEBUG === 'true') {
      console.log('MAILER_DEBUG active: skipping SMTP send and returning ok');
      return res.json({ ok: true, debug: true });
    }
    // simple header-based auth to avoid public abuse
    const header = req.get('x-mailer-secret') || '';
    if (!SECRET || header !== SECRET) {
      return res.status(401).json({ ok: false, error: 'unauthorized' });
    }

    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'name,email,message required' });
    }

    const subject = `お問い合わせ from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const html = `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><hr/><p>${escapeHtml(message).replace(/\n/g,'<br/>')}</p>`;

    // Helper: Postmark send with timeout using AbortController
    const tryPostmark = async (timeoutMs = parseInt(process.env.POSTMARK_TIMEOUT || '8000', 10)) => {
      const POSTMARK_TOKEN = process.env.POSTMARK_SERVER_TOKEN || process.env.POSTMARK_API_KEY;
      if (!POSTMARK_TOKEN) return { ok: false, error: 'no_postmark_token' };

      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);
      try {
        console.log('Postmark: sending (timeout ms)', timeoutMs, 'ts', new Date().toISOString());
        const pmRes = await fetch('https://api.postmarkapp.com/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': POSTMARK_TOKEN,
          },
          signal: controller.signal,
          body: JSON.stringify({
            From: process.env.MAIL_FROM || process.env.SMTP_USER,
            To: process.env.MAIL_TO || process.env.SMTP_USER,
            Subject: subject,
            HtmlBody: html,
            TextBody: text,
            ReplyTo: email,
          }),
        });
        clearTimeout(id);
        if (!pmRes.ok) {
          const txt = await pmRes.text().catch(() => '<unreadable>');
          console.error('Postmark error', pmRes.status, txt);
          return { ok: false, status: pmRes.status, body: txt };
        }
        const pmJson = await pmRes.json().catch(() => ({}));
        console.log('Postmark sent', pmJson.MessageID || pmJson);
        return { ok: true, meta: pmJson };
      } catch (err) {
        clearTimeout(id);
        console.error('Postmark send failed', err && err.name ? err.name : err);
        return { ok: false, error: String(err) };
      }
    };

    // If Postmark is available and configured as preferred, use it first to avoid
    // slow SMTP fallbacks. Set MAILER_PREFERRED=postmark to enable.
    const preferPostmark = (process.env.MAILER_PREFERRED === 'postmark' || process.env.FORCE_POSTMARK === 'true');

    if (preferPostmark) {
      const pmResult = await tryPostmark();
      if (pmResult.ok) {
        console.log('send total ms', Date.now() - start);
        return res.json({ ok: true, via: 'postmark', meta: pmResult.meta });
      }
      // If Postmark failed and SMTP is configured, fall through to SMTP attempt
      console.warn('Postmark preferred failed, falling back to SMTP', pmResult.error || pmResult);
    }

    // Attempt SMTP send first (unless preferring Postmark above). If SMTP fails
    // we fall back to Postmark (if configured). This block should be fast due to
    // the conservative timeouts set in createTransporter().
    const transporter = createTransporter();
    
    // Optionally skip verify to save round-trip time; VERIFY can be enabled
    // by setting SMTP_VERIFY=true in env. By default we skip explicit verify
    // and attempt send directly which is usually faster.
    if (process.env.SMTP_VERIFY === 'true') {
      try {
        await transporter.verify();
      } catch (vErr) {
        console.error('transporter verify failed', vErr && vErr.code);
      }
    }

    try {
      const info = await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: process.env.MAIL_TO || process.env.SMTP_USER,
        subject,
        text,
        html,
        replyTo: email,
      });
      console.log('smtp send complete, ms', Date.now() - start);
      return res.json({ ok: true, messageId: info && info.messageId, via: 'smtp' });
    } catch (sendErr) {
      console.error('smtp send error', sendErr && sendErr.message ? sendErr.message : sendErr);

      // Try Postmark as a fast fallback (with timeout)
      const pmResult = await tryPostmark();
      if (pmResult.ok) {
        console.log('fallback postmark success, total ms', Date.now() - start);
        return res.json({ ok: true, via: 'postmark', meta: pmResult.meta });
      }

      console.error('both smtp and postmark failed', { smtp: String(sendErr), postmark: pmResult });
      return res.status(500).json({ ok: false, error: 'send_failed', detail: { smtp: String(sendErr), postmark: pmResult } });
    }
  } catch (err) {
    console.error('send error', err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, error: 'send_failed', detail: String(err) });
  }
});

// Probe endpoint to check SMTP connectivity from the running instance.
// Returns 200 + JSON { ok: true, verified: true } when transporter.verify() succeeds.
// Useful for diagnosing network / auth issues from Render without sending an email.
app.get('/probe', async (req, res) => {
  try {
    // create a transporter with the same factory used for /send
    const transporter = createTransporter();
    // attempt a quick verify (subject to transporter timeouts set above)
    await transporter.verify();
    return res.json({ ok: true, verified: true });
  } catch (err) {
    console.error('probe verify failed', err && err.code ? err.code : String(err));
    return res.status(500).json({ ok: false, verified: false, error: String(err && err.message ? err.message : err) });
  }
});

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

app.listen(PORT, () => console.log(`Mailer listening on ${PORT}`));
