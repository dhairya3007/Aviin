/**
 * Aviin Pure Luxury Clothing — Haute Couture Email Templates
 */

export function getSubscriberEmailHtml({ email, name, preference, vipCode }) {
  const displayName = name && name.trim() ? name.trim() : 'Esteemed Patron';
  const displayPref = preference || 'Inaugural Haute Couture & Sartorial Collection';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome to the Aviin Privé Circle</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background-color: #0d0b14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e8e5dc; }
    table { border-spacing: 0; }
    td { padding: 0; }
    img { border: 0; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #0d0b14; padding-bottom: 60px; }
    .main { background-color: #141221; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; color: #e8e5dc; border: 1px solid rgba(197, 160, 89, 0.28); border-radius: 4px; overflow: hidden; }
    .gold-accent { color: #c5a059; letter-spacing: 0.18em; text-transform: uppercase; font-size: 11px; }
    .serif-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; font-weight: 400; line-height: 1.25; color: #ffffff; letter-spacing: 0.04em; }
    .vip-card { background: linear-gradient(135deg, rgba(35, 31, 54, 0.95), rgba(20, 18, 33, 0.98)); border: 1px solid rgba(197, 160, 89, 0.35); border-radius: 6px; padding: 24px; text-align: center; margin: 30px 0; }
    .vip-number { font-family: monospace; font-size: 20px; letter-spacing: 0.25em; color: #e4ce98; font-weight: 600; padding: 8px 0; }
    .btn { display: inline-block; background-color: #c5a059; color: #141221; text-decoration: none; padding: 14px 32px; font-size: 12px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; border-radius: 2px; }
    .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(197, 160, 89, 0.4), transparent); margin: 32px 0; }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      <!-- Header Brand Bar -->
      <tr>
        <td style="padding: 40px 30px 24px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.06);">
          <div class="gold-accent" style="margin-bottom: 8px;">Haute Couture &amp; Sartorial Atelier</div>
          <h1 style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 42px; font-weight: 500; color: #ffffff; letter-spacing: 0.12em;">AVIIN</h1>
          <p style="margin: 6px 0 0; font-size: 11px; letter-spacing: 0.28em; color: #8f8b9e; text-transform: uppercase;">Pure Luxury Clothing</p>
        </td>
      </tr>

      <!-- Body Content -->
      <tr>
        <td style="padding: 40px 36px 30px;">
          <div class="gold-accent" style="margin-bottom: 12px;">Private Circle Membership Confirmation</div>
          <div class="serif-title" style="margin-bottom: 20px;">
            Welcome to the Privé Salon, ${displayName}.
          </div>
          <p style="font-size: 14px; line-height: 1.8; color: #c0bcb0; margin: 0 0 16px;">
            It is our distinct honor to welcome you to the inner sanctum of <strong>Aviin</strong>. You have secured priority private access to our inaugural capsule collection ahead of our international unveiling.
          </p>
          <p style="font-size: 14px; line-height: 1.8; color: #c0bcb0; margin: 0 0 24px;">
            Selected Preference: <span style="color: #e4ce98; font-weight: 500;">${displayPref}</span>
          </p>

          <!-- Serialized VIP Card -->
          <div class="vip-card">
            <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #c5a059; margin-bottom: 6px;">
              Confidential Privé Access Pass
            </div>
            <div class="vip-number">${vipCode}</div>
            <div style="font-size: 11px; color: #9c98a8; margin-top: 6px;">
              Granted exclusively to: ${email}
            </div>
          </div>

          <!-- Privileges -->
          <div style="margin: 28px 0;">
            <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 20px; color: #ffffff; margin-bottom: 14px;">Your Privé Privileges</div>
            <table width="100%" style="font-size: 13px; color: #b8b4a7; line-height: 1.7;">
              <tr>
                <td style="padding-bottom: 10px; width: 22px; color: #c5a059;">✦</td>
                <td style="padding-bottom: 10px;"><strong style="color: #ffffff;">48-Hour Priority Window:</strong> Access to preview and reserve serialized garments before public release.</td>
              </tr>
              <tr>
                <td style="padding-bottom: 10px; width: 22px; color: #c5a059;">✦</td>
                <td style="padding-bottom: 10px;"><strong style="color: #ffffff;">Atelier Concierge:</strong> Direct access to our private stylists for bespoke measurement and sizing consultations.</td>
              </tr>
              <tr>
                <td style="padding-bottom: 10px; width: 22px; color: #c5a059;">✦</td>
                <td style="padding-bottom: 10px;"><strong style="color: #ffffff;">Numbered Edition Allocation:</strong> Guaranteed eligibility for our inaugural 001–100 serialized silk pieces.</td>
              </tr>
            </table>
          </div>

          <div class="divider"></div>

          <!-- Closing -->
          <p style="font-size: 13px; line-height: 1.8; color: #9c98a8; margin: 0 0 24px;">
            Our atelier doors will open shortly. Watch your inbox for your private entrance link when the inaugural countdown completes.
          </p>

          <div style="margin-top: 32px; font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 18px; color: #c5a059;">
            With highest regards,<br>
            <span style="font-style: normal; font-size: 14px; letter-spacing: 0.1em; color: #ffffff;">The Aviin Creative Direction &amp; Atelier Salon</span>
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding: 24px 30px; background-color: #0f0d18; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #6e6a7c; line-height: 1.6;">
          <p style="margin: 0 0 6px; letter-spacing: 0.15em; text-transform: uppercase;">Aviin Maison &bull; Paris &bull; Milan &bull; London &bull; New York</p>
          <p style="margin: 0;">This confidential invitation was addressed to ${email}. You received this as a subscriber to Aviin Privé.</p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
}

export function getAdminEmailHtml({ email, name, preference, vipCode, clientIp, timestamp }) {
  const timeStr = timestamp || new Date().toUTCString();
  const displayName = name && name.trim() ? name.trim() : 'Not Specified';
  const displayPref = preference || 'General Inaugural Collection';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Privé Circle Subscriber</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background-color: #f4f3ef; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #231f36; }
    .card { max-width: 600px; margin: 30px auto; background: #ffffff; border: 1px solid #e0dcce; border-radius: 8px; box-shadow: 0 4px 18px rgba(35, 31, 54, 0.08); overflow: hidden; }
    .header { background: #231f36; color: #ffffff; padding: 24px 30px; }
    .content { padding: 30px; }
    .badge { display: inline-block; background: #c5a059; color: #231f36; padding: 4px 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; border-radius: 3px; }
    .detail-table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13.5px; }
    .detail-table td { padding: 12px 14px; border-bottom: 1px solid #eee; }
    .detail-table tr:last-child td { border-bottom: none; }
    .label { color: #767285; font-weight: 500; width: 34%; }
    .value { color: #141221; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">AVIIN CONCIERGE ALERT</span>
      <h2 style="margin: 12px 0 0; font-family: Georgia, serif; font-size: 22px; font-weight: normal; color: #ffffff;">
        New Privé VIP Reservation Received
      </h2>
      <p style="margin: 4px 0 0; font-size: 12px; color: #a9a4b8;">
        A patron has requested confidential preview access to the inaugural capsule.
      </p>
    </div>

    <div class="content">
      <table class="detail-table">
        <tr>
          <td class="label">Subscriber Email</td>
          <td class="value"><a href="mailto:${email}" style="color: #231f36; text-decoration: underline;">${email}</a></td>
        </tr>
        <tr>
          <td class="label">Patron Name</td>
          <td class="value">${displayName}</td>
        </tr>
        <tr>
          <td class="label">Interested Capsule</td>
          <td class="value">${displayPref}</td>
        </tr>
        <tr>
          <td class="label">Assigned VIP Pass</td>
          <td class="value"><span style="font-family: monospace; background: #f6f3ea; padding: 3px 8px; border-radius: 4px; border: 1px solid #c5a059;">${vipCode}</span></td>
        </tr>
        <tr>
          <td class="label">Registration Time</td>
          <td class="value">${timeStr}</td>
        </tr>
        ${clientIp ? `<tr><td class="label">Client IP / Origin</td><td class="value">${clientIp}</td></tr>` : ''}
      </table>

      <div style="margin-top: 28px; padding: 14px; background: #faf9f5; border-radius: 6px; border: 1px solid #e5dfcf; font-size: 12px; color: #5a5666; line-height: 1.6;">
        <strong>Concierge Action Note:</strong> The automated welcome note with VIP Access Pass has been dispatched to the patron. If this is a high-value patron or custom consultation request, follow up directly via your atelier email.
      </div>
    </div>
  </div>
</body>
</html>`;
}

