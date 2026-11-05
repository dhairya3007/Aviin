/**
 * Aviin Pure Luxury Clothing — Clean Email Templates for Aviin Family
 */
const DEFAULT_LOGO_URL = 'https://raw.githubusercontent.com/dhairya3007/Aviin/main/public/logo.png';

export function getSubscriberEmailHtml({ email, phone, logoUrl = DEFAULT_LOGO_URL }) {
  const whatsappNotice = phone
    ? `<div style="margin: 20px 0 0; padding: 12px 18px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; font-size: 13.5px; color: #166534; text-align: center;">
        WhatsApp drop notifications enabled for: <strong style="color: #15803d;">${phone}</strong>
       </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome to Aviin Family</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background-color: #f7f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #231f36; }
    table { border-spacing: 0; }
    td { padding: 0; }
    img { border: 0; }
  </style>
</head>
<body style="margin: 0; padding: 40px 16px; background-color: #f7f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <center>
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid rgba(197, 160, 89, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 35px rgba(35, 31, 54, 0.06);">
      
      <!-- Logo Header -->
      <tr>
        <td style="padding: 38px 30px 24px; text-align: center; background-color: #ffffff; border-bottom: 1px solid #f0ecdf;">
          <img src="${logoUrl}" alt="AVIIN" width="180" style="display: block; margin: 0 auto; width: 180px; max-width: 180px; height: auto;" />
          <div style="font-size: 10px; letter-spacing: 0.28em; color: #8e899b; text-transform: uppercase; margin-top: 10px; font-weight: 500;">
            Pure Luxury Clothing
          </div>
        </td>
      </tr>

      <!-- Body Content -->
      <tr>
        <td style="padding: 38px 40px 32px; text-align: center;">
          <h1 style="font-family: Georgia, 'Cormorant Garamond', serif; font-size: 26px; font-weight: 500; color: #1f1b2e; margin: 0 0 14px; letter-spacing: 0.02em;">
            Welcome to the Aviin Family
          </h1>
          <p style="font-size: 14.5px; line-height: 1.7; color: #5a5568; margin: 0 0 24px;">
            Thank you for reserving your private access. You are now part of the Aviin family and will receive priority drop announcements, couture previews, and invitations before our public release.
          </p>

          <div style="font-size: 13px; color: #8e899b; margin-top: 10px;">
            Registered Email: <strong style="color: #231f36;">${email}</strong>
          </div>

          ${whatsappNotice}

          <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(197, 160, 89, 0.3), transparent); margin: 30px 0 24px;"></div>

          <p style="font-size: 13px; line-height: 1.6; color: #787385; margin: 0;">
            Our collection will be unveiled shortly. Watch your inbox for your exclusive entrance link when the countdown completes.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding: 20px 30px; background-color: #faf9f6; text-align: center; border-top: 1px solid #f0ecdf; font-size: 11px; color: #9994a5;">
          © ${new Date().getFullYear()} Aviin Family. All rights reserved.
        </td>
      </tr>

    </table>
  </center>
</body>
</html>`;
}

export function getAdminEmailHtml({ email, phone, timestamp }) {
  const timeStr = timestamp || new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  const phoneDisplay = phone
    ? `<span style="color: #15803d; font-weight: 600;">${phone}</span>`
    : '<span style="color: #888;">Not opted in</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Aviin Family Member</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 36px 16px; background-color: #f5f4ef; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #231f36;">
  <center>
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2ddcf; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 26px rgba(0,0,0,0.05); text-align: left;">
      
      <!-- Header -->
      <tr>
        <td style="padding: 24px 28px 20px; background-color: #1f1b2e; border-bottom: 2px solid #c5a059;">
          <div style="font-size: 11px; letter-spacing: 0.18em; color: #c5a059; font-weight: 700; text-transform: uppercase;">AVIIN FAMILY NOTIFICATION</div>
          <h2 style="margin: 6px 0 0; color: #ffffff; font-size: 19px; font-weight: 500; font-family: Georgia, serif;">New Member Joined</h2>
        </td>
      </tr>

      <!-- Content Table -->
      <tr>
        <td style="padding: 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285; width: 36%;">Subscriber Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; font-weight: 600;"><a href="mailto:${email}" style="color: #1f1b2e; text-decoration: underline;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285;">WhatsApp Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1;">${phoneDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #767285;">Date &amp; Time</td>
              <td style="padding: 12px 0; font-size: 13px; color: #666;">${timeStr}</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding: 14px 28px; background-color: #faf9f6; border-top: 1px solid #f0ece1; font-size: 11px; color: #8e899b;">
          Automated notification from Aviin Family Launch System.
        </td>
      </tr>

    </table>
  </center>
</body>
</html>`;
}
