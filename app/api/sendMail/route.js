// app/api/sendMail/route.js

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // フォームデータの取得
    const body = await req.json();
    // Safe debug: log received payload shape (do not log actual message content)
    try {
      console.log('/api/sendMail received', {
        keys: Object.keys(body || {}),
        nameLen: body && body.name ? String(body.name).length : 0,
        emailLen: body && body.email ? String(body.email).length : 0,
        messageLen: body && body.message ? String(body.message).length : 0,
      });
    } catch (e) {
      // ignore
    }
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

    // If an external mailer service is configured, forward the request there and skip local SMTP.
    // Configure the external mailer URL in Vercel as MAILER_URL (e.g. https://soma-website.onrender.com)
    // and set MAILER_SECRET to the secret value. The external service exposes a /send endpoint.
    const MAILER_URL = process.env.MAILER_URL || process.env.MAILER_SERVICE_URL || process.env.EXTERNAL_MAILER_URL;
    const MAILER_SECRET = process.env.MAILER_SECRET;
    if (MAILER_URL) {
      try {
        const target = MAILER_URL.replace(/\/$/, '') + '/send';
        console.log('Forwarding to external mailer', { target });

        const headers = { 'Content-Type': 'application/json' };
        if (MAILER_SECRET) headers['x-mailer-secret'] = MAILER_SECRET;

        const forwardRes = await fetch(target, {
          method: 'POST',
          headers,
          body: JSON.stringify({ name, email, company, phone, message }),
        });

        if (!forwardRes.ok) {
          const bodyText = await forwardRes.text().catch(() => '<unreadable>');
          console.error('External mailer returned error', forwardRes.status, bodyText);
          return new Response(JSON.stringify({ ok: false, error: 'external_mailer_failed', status: forwardRes.status, body: bodyText }), { status: 500 });
        }

        console.log('External mailer accepted request');
        return new Response(JSON.stringify({ ok: true, via: 'external-mailer' }), { status: 200 });
      } catch (e) {
        console.error('External mailer request failed', e);
        // fall through to SMTP logic as a fallback
      }
    }

    // If SMTP credentials are provided (either ZOHO_* or SMTP_*), use SMTP via nodemailer
    const envZohoUser = process.env.ZOHO_SMTP_USER;
    const envSmtpUser = process.env.SMTP_USER || process.env.SMTP_USERNAME;
    const smtpUser = envZohoUser || envSmtpUser;

    if (smtpUser) {
      // Choose host/port/secure from Zoho-prefixed vars first, then generic SMTP_*, then sensible defaults
      const smtpHost = process.env.ZOHO_SMTP_HOST || process.env.SMTP_HOST || 'smtp.lolipop.jp';
      const smtpPort = parseInt(process.env.ZOHO_SMTP_PORT || process.env.SMTP_PORT || '587', 10);
      const smtpSecure = (process.env.ZOHO_SMTP_SECURE === 'true') || (process.env.SMTP_SECURE === 'true') || (smtpPort === 465);
      const smtpPass = process.env.ZOHO_SMTP_PASS || process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

      if (!smtpPass) {
        console.error('SMTP password missing in environment variables');
        return new Response(JSON.stringify({ ok: false, error: 'smtp credentials missing' }), { status: 500 });
      }

      // Safe debug: log which SMTP settings are being used, but do NOT log the password itself.
      try {
        console.log('SMTP config (selected)', {
          provider: envZohoUser ? 'zoho' : 'smtp',
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          user: smtpUser,
          passPresent: !!smtpPass,
          passLength: smtpPass ? smtpPass.length : 0,
        });
      } catch (e) {
        // ignore logging failures
      }

      const createTransport = (opts = {}) =>
        nodemailer.createTransport(Object.assign({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: { user: smtpUser, pass: smtpPass },
        }, opts));

      let transporter = createTransport();

      // Verify connection configuration before sending to provide clearer errors
      try {
        await transporter.verify();
      } catch (verifyErr) {
        console.error('SMTP verify failed', { code: verifyErr && verifyErr.code, response: verifyErr && verifyErr.response });

        // Try a fallback: some servers prefer LOGIN authMethod or different TLS options.
        try {
          console.log('Attempting fallback verify: authMethod=LOGIN, tls.rejectUnauthorized=false');
          const fallback = createTransport({ authMethod: 'LOGIN', tls: { rejectUnauthorized: false } });
          await fallback.verify();
          transporter = fallback; // swap to fallback if verify succeeds
          console.log('Fallback verify OK (using authMethod=LOGIN)');
        } catch (fbErr) {
          console.error('Fallback verify failed', { code: fbErr && fbErr.code, response: fbErr && fbErr.response });

          // If SendGrid is configured, attempt to send via SendGrid as a fallback.
          const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
          if (SENDGRID_API_KEY) {
            console.log('Attempting SendGrid fallback because SMTP failed');
            try {
              const SENDGRID_FROM = process.env.SENDGRID_FROM || process.env.MAIL_FROM || 'no-reply@example.com';
              const SENDGRID_TO = process.env.SENDGRID_TO || process.env.MAIL_TO || smtpUser;
              const payload = {
                personalizations: [{ to: [{ email: SENDGRID_TO }], subject }],
                from: { email: SENDGRID_FROM },
                reply_to: { email },
                content: [
                  { type: 'text/plain', value: text },
                  { type: 'text/html', value: html },
                ],
              };

              const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              });

              if (!sgRes.ok) {
                const errText = await sgRes.text();
                console.error('SendGrid fallback error', sgRes.status, errText);
                return new Response(JSON.stringify({ ok: false, error: 'smtp_auth_failed' }), { status: 500 });
              }

              console.log('SendGrid fallback sent');
              return new Response(JSON.stringify({ ok: true, via: 'sendgrid' }), { status: 200 });
            } catch (sgErr) {
              console.error('SendGrid fallback failed', sgErr);
              return new Response(JSON.stringify({ ok: false, error: 'smtp_auth_failed' }), { status: 500 });
            }
          }

          return new Response(JSON.stringify({ ok: false, error: 'smtp_auth_failed' }), { status: 500 });
        }
      }

      try {
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
      } catch (sendErr) {
        console.error('smtp send error', { code: sendErr && sendErr.code, response: sendErr && sendErr.response });
        return new Response(JSON.stringify({ ok: false, error: 'smtp_send_failed' }), { status: 500 });
      }
    }

    // Fallback to SendGrid if configured
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_FROM = process.env.SENDGRID_FROM || 'no-reply@your-domain.com';
      const SENDGRID_TO = process.env.SENDGRID_TO || process.env.MAIL_TO || 'info@soma-jp.net';

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
