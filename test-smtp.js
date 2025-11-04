/*
  test-smtp.js
  - Reads SMTP config from .env.local via dotenv
  - Tries verify() on 465 (secure=true) and 587 (secure=false)
  - Prints only safe info: success/fail and error code/response (no passwords)

  Usage:
    npm i dotenv
    node test-smtp.js
*/
// Load .env.local explicitly (your Next.js env file). If you prefer .env, change the path.
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

const host = process.env.SMTP_HOST || 'smtp.lolipop.jp';
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

if (!user || !pass) {
  console.error('ERROR: SMTP_USER or SMTP_PASS is missing in environment (.env.local)');
  process.exit(1);
}

const tests = [
  { name: '465 (secure=true)', port: 465, secure: true },
  { name: '587 (secure=false)', port: 587, secure: false },
];

(async () => {
  console.log('Using host:', host);
  console.log('Using user:', user);
  console.log('passPresent:', !!pass, 'passLength:', pass ? pass.length : 0);

  for (const t of tests) {
    console.log('\n---', t.name, '---');
    const transporter = nodemailer.createTransport({
      host,
      port: t.port,
      secure: t.secure,
      auth: { user, pass },
      // dev-only: accept self-signed certs when testing locally
      tls: { rejectUnauthorized: false },
      // enable verbose logging for debugging SMTP handshake
      logger: true,
      debug: true,
    });

    try {
      await transporter.verify();
      console.log(t.name, 'verify OK');
    } catch (e) {
      console.error(t.name, 'verify failed', { code: e && e.code, response: e && e.response });
    }
  }
})();
