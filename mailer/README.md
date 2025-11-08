# soma-mailer

Small mailer service that exposes a /send HTTP endpoint and sends email via SMTP (nodemailer).

How to use

1. Setup environment variables in your hosting platform (Render/Fly/DO):

 - SMTP_HOST (e.g. smtp.lolipop.jp)
 - SMTP_PORT (e.g. 465 or 587)
 - SMTP_USER (SMTP username)
 - SMTP_PASS (SMTP password)
 - MAIL_FROM (From address)
 - MAIL_TO (Destination admin address)
 - MAILER_SECRET (random secret string used in header x-mailer-secret)

2. Deploy

 - On Render: create a new Web Service from this repository path (`/mailer`) or push this folder to a dedicated repo and connect.
 - Set the build command: `npm install` and start command: `npm start` (or use Dockerfile).

3. Test

 - Call the endpoint with header `x-mailer-secret: <MAILER_SECRET>`:

```powershell
$env:MAILER_SECRET="your-secret"
$body = @{ name='テスト'; email='test@example.com'; message='Hello' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri 'https://your-mailer.example.com/send' -ContentType 'application/json' -Body $body -Headers @{ 'x-mailer-secret' = $env:MAILER_SECRET }
```

Security note

 - Keep `MAILER_SECRET` secret. Do not expose SMTP credentials in public repos.
 - Rotate SMTP_PASS if it might be compromised.
