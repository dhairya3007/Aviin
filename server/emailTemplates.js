/**
 * Aviin Pure Luxury Clothing — Clean Email Templates for Aviin Family
 */
const DEFAULT_LOGO_URL = 'https://raw.githubusercontent.com/dhairya3007/Aviin/main/public/logo.png';

export function getSubscriberEmailHtml({ email, phone, logoUrl = DEFAULT_LOGO_URL }) {
  const phoneDisplay = phone
    ? `<span style="color: #15803d; font-weight: 600;">${phone}</span>`
    : '<span style="color: #888;">Not opted in</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome to Aviin Family</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 36px 16px; background-color: #f5f4ef; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #231f36;">
  <center>
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2ddcf; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 26px rgba(0,0,0,0.05); text-align: left;">
      
      <!-- Header -->
      <tr>
        <td style="padding: 24px 28px 20px; background-color: #1f1b2e; border-bottom: 2px solid #c5a059;">
          <div style="font-size: 11px; letter-spacing: 0.18em; color: #c5a059; font-weight: 700; text-transform: uppercase;">AVIIN FAMILY</div>
          <h2 style="margin: 6px 0 0; color: #ffffff; font-size: 19px; font-weight: 500; font-family: Georgia, serif;">Welcome to Aviin Family</h2>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding: 28px;">
          <!-- Aviin Logo -->
          <div style="text-align: center; margin-bottom: 22px;">
            <img src="${logoUrl}" alt="AVIIN" width="160" style="display: block; margin: 0 auto; width: 160px; max-width: 160px; height: auto;" />
          </div>

          <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #5a5568;">
            Thank you for subscribing. You are now part of the Aviin Family and will receive our priority collection announcements and private drop alerts.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285; width: 36%;">Registered Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; font-weight: 600;"><span style="color: #1f1b2e;">${email}</span></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285;">WhatsApp Updates</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1;">${phoneDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #767285;">Status</td>
              <td style="padding: 12px 0; font-weight: 600; color: #15803d;">Confirmed</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding: 14px 28px; background-color: #faf9f6; border-top: 1px solid #f0ece1; font-size: 11px; color: #8e899b;">
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
