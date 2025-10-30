// app/api/sendMail/route.js

import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // フォームデータの取得
    const body = await req.json();
    const { name, email, company, phone, message } = body || {};

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'name, email and message are required' }), { status: 400 });
    }

    const subject = `お問い合わせ from ${name}`;
    const text = `New contact form submission\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\nPhone: ${phone || '-'}\n\nMessage:\n${message}`;
    const html = `
      <p>New contact form submission</p>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(email)}</li>
        <li><strong>Company:</strong> ${escapeHtml(company || '-')}</li>
        <li><strong>Phone:</strong> ${escapeHtml(phone || '-')}</li>
      </ul>
      <h3>Message</h3>
      <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `;

    // If SMTP credentials are provided (either ZOHO_* or SMTP_*), use SMTP via nodemailer
    const smtpUser = process.env.ZOHO_SMTP_USER || process.env.SMTP_USER || process.env.SMTP_USERNAME;
    if (smtpUser) {
      const smtpHost = process.env.ZOHO_SMTP_HOST || process.env.SMTP_HOST || 'smtp.lolipop.jp';
      const smtpPort = parseInt(process.env.ZOHO_SMTP_PORT || process.env.SMTP_PORT || '587');
      const smtpSecure = (process.env.ZOHO_SMTP_SECURE === 'true') || (process.env.SMTP_SECURE === 'true') || false;
      const smtpPass = process.env.ZOHO_SMTP_PASS || process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.MAIL_FROM || smtpUser,
        to: process.env.MAIL_TO || smtpUser,
        subject,
        text,
        html,
        replyTo: email,
      });

      console.log('smtp sent', info && info.messageId);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Fallback to SendGrid if configured
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_FROM = process.env.SENDGRID_FROM || 'no-reply@your-domain.com';
    const SENDGRID_TO = process.env.SENDGRID_TO || 'info@soma-jp.net';

    if (!SENDGRID_API_KEY) {
      console.error('no mailer configured');
      return new Response(JSON.stringify({ ok: false, error: 'mailer not configured' }), { status: 500 });
    }

    const payload = {
      personalizations: [
        {
          to: [{ email: SENDGRID_TO }],
          subject,
        },
      ],
      from: { email: SENDGRID_FROM },
      reply_to: { email },
      content: [
        { type: 'text/plain', value: text },
        { type: 'text/html', value: html },
      ],
    };

    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('SendGrid error', res.status, errText);
      return new Response(JSON.stringify({ ok: false, error: `sendgrid ${res.status}` }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500 });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
