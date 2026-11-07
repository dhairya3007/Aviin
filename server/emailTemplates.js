/**
 * Aviin Pure Luxury Clothing — Clean Email Templates for Aviin Family
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localLogoPath = path.resolve(__dirname, '../public/6.png');

export const DEFAULT_LOGO_URL = process.env.LOGO_URL || (
  fs.existsSync(localLogoPath)
    ? 'cid:aviin-logo-header'
    : 'https://raw.githubusercontent.com/dhairya3007/Aviin/main/public/6.png'
);

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/aviin.uk',
  whatsapp: 'https://wa.me/message/73MSF3SNFN7LB1',
  facebook: 'https://www.facebook.com/share/1DxpdGAXCo/?mibextid=wwXIfr',
};

export function getSubscriberEmailHtml({ email, phone, logoUrl = DEFAULT_LOGO_URL }) {
  const cleanPhone = phone && String(phone).trim() && String(phone).trim() !== 'null' && String(phone).trim() !== 'undefined'
    ? String(phone).trim()
    : null;

  const whatsappRow = cleanPhone
    ? `<tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285; width: 38%;">WhatsApp Updates</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; font-weight: 600;"><span style="color: #15803d;">${cleanPhone}</span></td>
      </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome to Aviin Family</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <style>
    :root {
      color-scheme: light;
      supported-color-schemes: light;
    }
    .email-header-white {
      background-color: #ffffff !important;
      background: #ffffff linear-gradient(#ffffff, #ffffff) !important;
    }
    @media (prefers-color-scheme: dark) {
      .email-header-white {
        background-color: #ffffff !important;
        background: #ffffff linear-gradient(#ffffff, #ffffff) !important;
      }
    }
    [data-ogsc] .email-header-white {
      background-color: #ffffff !important;
      background: #ffffff linear-gradient(#ffffff, #ffffff) !important;
    }
  </style>
</head>
<body style="margin: 0; padding: 36px 16px; background-color: #f7f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #231f36;">
  <center>
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5dfd3; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 26px rgba(0,0,0,0.05); text-align: left;">
      
      <!-- Aviin Header Part (Locked Solid White background even in Dark Mode) -->
      <tr>
        <td class="email-header-white" style="padding: 28px 24px 22px; background-color: #ffffff !important; background: #ffffff linear-gradient(#ffffff, #ffffff) !important; border-bottom: 1px solid #f0ece1; text-align: center;">
          <img src="${logoUrl}" alt="AVIIN" width="180" style="display: block; margin: 0 auto; width: 180px; max-width: 180px; height: auto; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; background-color: #ffffff;" />
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding: 28px 30px 28px;">
          <p style="margin: 0 0 24px; font-size: 14.5px; line-height: 1.65; color: #5a5568; text-align: center;">
            Thank you for subscribing. You are now part of the Aviin Family and will receive our priority collection announcements.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285; width: 38%;">Registered Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; font-weight: 600;"><span style="color: #1f1b2e;">${email}</span></td>
            </tr>
            ${whatsappRow}
            <tr>
              <td style="padding: 12px 0; color: #767285;">Status</td>
              <td style="padding: 12px 0; font-weight: 600; color: #15803d;">Confirmed</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer with Social Links -->
      <tr>
        <td style="padding: 20px 24px 18px; background-color: #faf9f6; border-top: 1px solid #f0ece1; text-align: center;">
          <div style="margin-bottom: 12px;">
            <a href="${SOCIAL_LINKS.instagram}" target="_blank" style="display: inline-block; margin: 3px 4px; padding: 6px 14px; background-color: #ffffff; border: 1px solid #e2ddd3; border-radius: 16px; font-size: 11.5px; font-weight: 600; color: #231f36; text-decoration: none;">Instagram</a>
            <a href="${SOCIAL_LINKS.whatsapp}" target="_blank" style="display: inline-block; margin: 3px 4px; padding: 6px 14px; background-color: #ffffff; border: 1px solid #e2ddd3; border-radius: 16px; font-size: 11.5px; font-weight: 600; color: #15803d; text-decoration: none;">WhatsApp</a>
            <a href="${SOCIAL_LINKS.facebook}" target="_blank" style="display: inline-block; margin: 3px 4px; padding: 6px 14px; background-color: #ffffff; border: 1px solid #e2ddd3; border-radius: 16px; font-size: 11.5px; font-weight: 600; color: #231f36; text-decoration: none;">Facebook</a>
          </div>
          <p style="margin: 0; font-size: 11px; color: #8e899b; line-height: 1.5;">
            © ${new Date().getFullYear()} Aviin Family. All rights reserved.
          </p>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>`;
}

export function getAdminEmailHtml({ email, phone, timestamp, logoUrl = DEFAULT_LOGO_URL }) {
  const timeStr = timestamp || new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  const cleanPhone = phone && String(phone).trim() && String(phone).trim() !== 'null' && String(phone).trim() !== 'undefined'
    ? String(phone).trim()
    : null;

  const whatsappRow = cleanPhone
    ? `<tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285; width: 38%;">WhatsApp Phone</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; font-weight: 600;"><span style="color: #15803d;">${cleanPhone}</span></td>
      </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Aviin Family Member</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <style>
    :root {
      color-scheme: light;
      supported-color-schemes: light;
    }
    .email-header-white {
      background-color: #ffffff !important;
      background: #ffffff linear-gradient(#ffffff, #ffffff) !important;
    }
    @media (prefers-color-scheme: dark) {
      .email-header-white {
        background-color: #ffffff !important;
        background: #ffffff linear-gradient(#ffffff, #ffffff) !important;
      }
    }
    [data-ogsc] .email-header-white {
      background-color: #ffffff !important;
      background: #ffffff linear-gradient(#ffffff, #ffffff) !important;
    }
  </style>
</head>
<body style="margin: 0; padding: 36px 16px; background-color: #f7f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #231f36;">
  <center>
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5dfd3; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 26px rgba(0,0,0,0.05); text-align: left;">
      
      <!-- Aviin Header Part (Locked Solid White background even in Dark Mode) -->
      <tr>
        <td class="email-header-white" style="padding: 28px 24px 22px; background-color: #ffffff !important; background: #ffffff linear-gradient(#ffffff, #ffffff) !important; border-bottom: 1px solid #f0ece1; text-align: center;">
          <img src="${logoUrl}" alt="AVIIN" width="180" style="display: block; margin: 0 auto; width: 180px; max-width: 180px; height: auto; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; background-color: #ffffff;" />
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding: 28px 30px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; color: #767285; width: 38%;">Subscriber Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0ece1; font-weight: 600;"><a href="mailto:${email}" style="color: #1f1b2e; text-decoration: underline;">${email}</a></td>
            </tr>
            ${whatsappRow}
            <tr>
              <td style="padding: 12px 0; color: #767285;">Date &amp; Time</td>
              <td style="padding: 12px 0; font-size: 13px; color: #666;">${timeStr}</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer with Social Links -->
      <tr>
        <td style="padding: 20px 24px 18px; background-color: #faf9f6; border-top: 1px solid #f0ece1; text-align: center;">
          <div style="margin-bottom: 12px;">
            <a href="${SOCIAL_LINKS.instagram}" target="_blank" style="display: inline-block; margin: 3px 4px; padding: 6px 14px; background-color: #ffffff; border: 1px solid #e2ddd3; border-radius: 16px; font-size: 11.5px; font-weight: 600; color: #231f36; text-decoration: none;">Instagram</a>
            <a href="${SOCIAL_LINKS.whatsapp}" target="_blank" style="display: inline-block; margin: 3px 4px; padding: 6px 14px; background-color: #ffffff; border: 1px solid #e2ddd3; border-radius: 16px; font-size: 11.5px; font-weight: 600; color: #15803d; text-decoration: none;">WhatsApp</a>
            <a href="${SOCIAL_LINKS.facebook}" target="_blank" style="display: inline-block; margin: 3px 4px; padding: 6px 14px; background-color: #ffffff; border: 1px solid #e2ddd3; border-radius: 16px; font-size: 11.5px; font-weight: 600; color: #231f36; text-decoration: none;">Facebook</a>
          </div>
          <p style="margin: 0; font-size: 11px; color: #8e899b; line-height: 1.5;">
            Automated notification from Aviin Family Launch System.
          </p>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>`;
}
