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
  // connectionTimeout/greetingTimeout/socketTimeout are supported by nodemailer
  // and help detect network problems quickly.
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: parseInt(process.env.SMTP_CONNECTION_TIMEOUT || '10000', 10),
    greetingTimeout: parseInt(process.env.SMTP_GREETING_TIMEOUT || '10000', 10),
    socketTimeout: parseInt(process.env.SMTP_SOCKET_TIMEOUT || '20000', 10),
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
    try {
      console.log('/send POST received', { ip: req.ip || req.connection && req.connection.remoteAddress, keys: Object.keys(req.body || {}) });
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

    const transporter = createTransporter();
    try {
      await transporter.verify();
    } catch (vErr) {
      console.error('transporter verify failed', vErr && vErr.code);
      // continue to attempt send, but log
    }

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      subject,
      text,
      html,
      replyTo: email,
    });

    return res.json({ ok: true, messageId: info && info.messageId });
  } catch (err) {
    console.error('send error', err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, error: 'send_failed', detail: String(err) });
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
