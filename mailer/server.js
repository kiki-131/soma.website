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

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // keep default TLS options; can be extended if needed
  });
}

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/send', async (req, res) => {
  try {
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
