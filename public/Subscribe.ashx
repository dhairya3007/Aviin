<%@ WebHandler Language="C#" Class="Subscribe" %>

using System;
using System.Web;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Web.Script.Serialization;

/**
 * Aviin Pure Luxury Clothing - ASP.NET Generic Handler (.ashx)
 * Runs on the SAME PORT as the website on Windows Server (IIS).
 *
 * Configurable via:
 *  1) The constants below in this file, OR
 *  2) <appSettings> in web.config
 */
public class Subscribe : IHttpHandler
{
    // =========================================================================
    // 1. SMTP EMAIL CONFIGURATION
    // You can set your credentials here directly, or define them in web.config:
    //   System.Configuration.ConfigurationManager.AppSettings["AviinSmtpHost"]
    // =========================================================================
    private string SmtpHost     = "smtp.gmail.com";        // e.g., smtp.gmail.com
    private int    SmtpPort     = 587;                     // 587 (TLS/STARTTLS) or 465 (SSL)
    private bool   EnableSsl    = true;
    private string SmtpUser     = "INFO@AVIIN.CO.UK";      // Your SMTP email / username
    private string SmtpPass     = "ldurzzzqybfkgdbg";      // Your SMTP password or App Password
    private string FromEmail    = "INFO@AVIIN.CO.UK";      // Display From email address
    private string FromName     = "Aviin Family";          // Sender display name
    private string AdminEmail   = "INFO@AVIIN.CO.UK";      // Where notifications of new subscribers are sent

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "application/json";
        context.Response.Charset = "utf-8";

        // Enable CORS if ever tested cross-origin; same-port does not require it
        context.Response.AppendHeader("Access-Control-Allow-Origin", "*");
        context.Response.AppendHeader("Access-Control-Allow-Headers", "Content-Type");
        context.Response.AppendHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

        if (context.Request.HttpMethod == "OPTIONS")
        {
            context.Response.StatusCode = 200;
            return;
        }

        if (context.Request.HttpMethod != "POST")
        {
            SendJsonResponse(context, false, "Method not allowed. Only POST is accepted.", 405);
            return;
        }

        try
        {
            // Optional: Read overrides from web.config <appSettings> if present
            LoadConfigOverrides();

            // Read JSON body sent from SubscribeForm.jsx
            string jsonBody;
            using (var reader = new StreamReader(context.Request.InputStream))
            {
                jsonBody = reader.ReadToEnd();
            }

            if (string.IsNullOrWhiteSpace(jsonBody))
            {
                SendJsonResponse(context, false, "Empty request body.", 400);
                return;
            }

            var serializer = new JavaScriptSerializer();
            var payload = serializer.Deserialize<SubscribePayload>(jsonBody);

            if (payload == null || string.IsNullOrWhiteSpace(payload.email) || !payload.email.Contains("@"))
            {
                SendJsonResponse(context, false, "Please provide a valid email address.", 400);
                return;
            }

            string cleanEmail = payload.email.Trim();
            string cleanPhone = string.IsNullOrWhiteSpace(payload.phone) ? null : payload.phone.Trim();

            // Dispatch emails asynchronously in background thread
            System.Threading.Tasks.Task.Run(() =>
            {
                try { SendSubscriberEmail(cleanEmail, cleanPhone); } catch { }
                try { SendAdminAlertEmail(cleanEmail, cleanPhone); } catch { }
            });

            SendJsonResponse(context, true, "Welcome to the Aviin Family.", 200);
        }
        catch (Exception ex)
        {
            SendJsonResponse(context, false, "Unable to send reservation email: " + ex.Message, 500);
        }
    }

    private bool SendSubscriberEmail(string recipientEmail, string phone)
    {
        using (var mail = new MailMessage())
        {
            mail.From = new MailAddress(FromEmail, FromName);
            mail.To.Add(recipientEmail);
            mail.Subject = "Welcome to Aviin Family";
            mail.IsBodyHtml = true;

            string whatsappRow = string.IsNullOrWhiteSpace(phone) || phone.Trim().ToLower() == "null" || phone.Trim().ToLower() == "undefined"
                ? ""
                : "<tr><td style='padding:12px 0; border-bottom:1px solid #f0ece1; color:#767285; width:38%;'>WhatsApp Updates</td><td style='padding:12px 0; border-bottom:1px solid #f0ece1; font-weight:600;'><span style='color:#15803d;'>" + HttpUtility.HtmlEncode(phone.Trim()) + "</span></td></tr>";

            string logoUrl = "https://raw.githubusercontent.com/dhairya3007/Aviin/main/public/6-white-background.png";

            mail.Body = @"
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>Welcome to Aviin Family</title>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <meta name='color-scheme' content='light'>
  <meta name='supported-color-schemes' content='light'>
  <style>
    :root { color-scheme: light; supported-color-schemes: light; }
    .email-header-white { background-color: #ffffff !important; background: #ffffff linear-gradient(#ffffff, #ffffff) !important; }
    @media (prefers-color-scheme: dark) {
      .email-header-white { background-color: #ffffff !important; background: #ffffff linear-gradient(#ffffff, #ffffff) !important; }
    }
  </style>
</head>
<body style='margin:0; padding:36px 16px; background-color:#f7f5f0; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif; color:#231f36;'>
  <center>
    <table width='100%' cellpadding='0' cellspacing='0' style='max-width:500px; margin:0 auto; background-color:#ffffff; border:1px solid #e5dfd3; border-radius:14px; overflow:hidden; box-shadow:0 8px 26px rgba(0,0,0,0.05); text-align:left;'>
      
      <!-- Aviin Header Part (White background) -->
      <tr>
        <td class='email-header-white' style='padding:28px 24px 22px; background-color:#ffffff !important; background:#ffffff linear-gradient(#ffffff, #ffffff) !important; border-bottom:1px solid #f0ece1; text-align:center;'>
          <img src='" + logoUrl + @"' alt='AVIIN' width='180' style='display:block; margin:0 auto; width:180px; max-width:180px; height:auto; border:0; outline:none; text-decoration:none; background-color:#ffffff;' />
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style='padding:28px 30px 28px;'>
          <p style='margin:0 0 24px; font-size:14.5px; line-height:1.65; color:#5a5568; text-align:center;'>
            Thank you for subscribing. You are now part of the Aviin Family and will receive our priority collection announcements.
          </p>

          <table width='100%' cellpadding='0' cellspacing='0' style='font-size:14px;'>
            <tr>
              <td style='padding:12px 0; border-bottom:1px solid #f0ece1; color:#767285; width:38%;'>Registered Email</td>
              <td style='padding:12px 0; border-bottom:1px solid #f0ece1; font-weight:600;'><span style='color:#1f1b2e;'>" + HttpUtility.HtmlEncode(recipientEmail) + @"</span></td>
            </tr>
            " + whatsappRow + @"
            <tr>
              <td style='padding:12px 0; color:#767285;'>Status</td>
              <td style='padding:12px 0; font-weight:600; color:#15803d;'>Confirmed</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer with Social Links -->
      <tr>
        <td style='padding:20px 24px 18px; background-color:#faf9f6; border-top:1px solid #f0ece1; text-align:center;'>
          <div style='margin-bottom:12px;'>
            <a href='https://www.instagram.com/aviin.uk' target='_blank' style='display:inline-block; margin:3px 4px; padding:6px 14px; background-color:#ffffff; border:1px solid #e2ddd3; border-radius:16px; font-size:11.5px; font-weight:600; color:#231f36; text-decoration:none;'>Instagram</a>
            <a href='https://wa.me/message/73MSF3SNFN7LB1' target='_blank' style='display:inline-block; margin:3px 4px; padding:6px 14px; background-color:#ffffff; border:1px solid #e2ddd3; border-radius:16px; font-size:11.5px; font-weight:600; color:#15803d; text-decoration:none;'>WhatsApp</a>
            <a href='https://www.facebook.com/share/1DxpdGAXCo/?mibextid=wwXIfr' target='_blank' style='display:inline-block; margin:3px 4px; padding:6px 14px; background-color:#ffffff; border:1px solid #e2ddd3; border-radius:16px; font-size:11.5px; font-weight:600; color:#231f36; text-decoration:none;'>Facebook</a>
          </div>
          <p style='margin:0; font-size:11px; color:#8e899b; line-height:1.5;'>
            © " + DateTime.Now.Year + @" Aviin Family. All rights reserved.
          </p>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>";

            using (var smtp = new SmtpClient(SmtpHost, SmtpPort))
            {
                smtp.EnableSsl = EnableSsl;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(SmtpUser, SmtpPass);
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(mail);
            }
        }
        return true;
    }

    private void SendAdminAlertEmail(string subscriberEmail, string phone)
    {
        if (string.IsNullOrWhiteSpace(AdminEmail) || AdminEmail.Contains("yourdomain") || AdminEmail.Contains("your-email")) return;

        using (var mail = new MailMessage())
        {
            mail.From = new MailAddress(FromEmail, FromName);
            mail.To.Add(AdminEmail);
            mail.Subject = "[Aviin Alert] New Member: " + subscriberEmail;
            mail.IsBodyHtml = true;

            string adminWhatsappRow = string.IsNullOrWhiteSpace(phone) || phone.Trim().ToLower() == "null" || phone.Trim().ToLower() == "undefined"
                ? ""
                : "<tr><td style='padding:12px 0; border-bottom:1px solid #f0ece1; color:#767285; width:38%;'>WhatsApp Phone</td><td style='padding:12px 0; border-bottom:1px solid #f0ece1; font-weight:600;'><span style='color:#15803d;'>" + HttpUtility.HtmlEncode(phone.Trim()) + "</span></td></tr>";

            string logoUrl = "https://raw.githubusercontent.com/dhairya3007/Aviin/main/public/6-white-background.png";

            mail.Body = @"
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>New Aviin Family Member</title>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <meta name='color-scheme' content='light'>
  <meta name='supported-color-schemes' content='light'>
  <style>
    :root { color-scheme: light; supported-color-schemes: light; }
    .email-header-white { background-color: #ffffff !important; background: #ffffff linear-gradient(#ffffff, #ffffff) !important; }
    @media (prefers-color-scheme: dark) {
      .email-header-white { background-color: #ffffff !important; background: #ffffff linear-gradient(#ffffff, #ffffff) !important; }
    }
  </style>
</head>
<body style='margin:0; padding:36px 16px; background-color:#f7f5f0; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif; color:#231f36;'>
  <center>
    <table width='100%' cellpadding='0' cellspacing='0' style='max-width:500px; margin:0 auto; background-color:#ffffff; border:1px solid #e5dfd3; border-radius:14px; overflow:hidden; box-shadow:0 8px 26px rgba(0,0,0,0.05); text-align:left;'>
      
      <!-- Aviin Header Part (White background) -->
      <tr>
        <td class='email-header-white' style='padding:28px 24px 22px; background-color:#ffffff !important; background:#ffffff linear-gradient(#ffffff, #ffffff) !important; border-bottom:1px solid #f0ece1; text-align:center;'>
          <img src='" + logoUrl + @"' alt='AVIIN' width='180' style='display:block; margin:0 auto; width:180px; max-width:180px; height:auto; border:0; outline:none; text-decoration:none; background-color:#ffffff;' />
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style='padding:28px 30px 28px;'>
          <table width='100%' cellpadding='0' cellspacing='0' style='font-size:14px;'>
            <tr>
              <td style='padding:12px 0; border-bottom:1px solid #f0ece1; color:#767285; width:38%;'>Subscriber Email</td>
              <td style='padding:12px 0; border-bottom:1px solid #f0ece1; font-weight:600;'><a href='mailto:" + HttpUtility.HtmlEncode(subscriberEmail) + @"' style='color:#1f1b2e; text-decoration:underline;'>" + HttpUtility.HtmlEncode(subscriberEmail) + @"</a></td>
            </tr>
            " + adminWhatsappRow + @"
            <tr>
              <td style='padding:12px 0; color:#767285;'>Date &amp; Time</td>
              <td style='padding:12px 0; font-size:13px; color:#666;'>" + DateTime.UtcNow.ToString("MMM dd, yyyy HH:mm") + @" UTC</td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- Footer with Social Links -->
      <tr>
        <td style='padding:20px 24px 18px; background-color:#faf9f6; border-top:1px solid #f0ece1; text-align:center;'>
          <div style='margin-bottom:12px;'>
            <a href='https://www.instagram.com/aviin.uk' target='_blank' style='display:inline-block; margin:3px 4px; padding:6px 14px; background-color:#ffffff; border:1px solid #e2ddd3; border-radius:16px; font-size:11.5px; font-weight:600; color:#231f36; text-decoration:none;'>Instagram</a>
            <a href='https://wa.me/message/73MSF3SNFN7LB1' target='_blank' style='display:inline-block; margin:3px 4px; padding:6px 14px; background-color:#ffffff; border:1px solid #e2ddd3; border-radius:16px; font-size:11.5px; font-weight:600; color:#15803d; text-decoration:none;'>WhatsApp</a>
            <a href='https://www.facebook.com/share/1DxpdGAXCo/?mibextid=wwXIfr' target='_blank' style='display:inline-block; margin:3px 4px; padding:6px 14px; background-color:#ffffff; border:1px solid #e2ddd3; border-radius:16px; font-size:11.5px; font-weight:600; color:#231f36; text-decoration:none;'>Facebook</a>
          </div>
          <p style='margin:0; font-size:11px; color:#8e899b; line-height:1.5;'>
            Automated notification from Aviin Family Launch System.
          </p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>";

            using (var smtp = new SmtpClient(SmtpHost, SmtpPort))
            {
                smtp.EnableSsl = EnableSsl;
                smtp.Credentials = new NetworkCredential(SmtpUser, SmtpPass);
                smtp.Send(mail);
            }
        }
    }

    private void LoadConfigOverrides()
    {
        try
        {
            var host = System.Configuration.ConfigurationManager.AppSettings["AviinSmtpHost"];
            if (!string.IsNullOrEmpty(host)) SmtpHost = host;

            var portStr = System.Configuration.ConfigurationManager.AppSettings["AviinSmtpPort"];
            int p;
            if (!string.IsNullOrEmpty(portStr) && int.TryParse(portStr, out p)) SmtpPort = p;

            var user = System.Configuration.ConfigurationManager.AppSettings["AviinSmtpUser"];
            if (!string.IsNullOrEmpty(user)) SmtpUser = user;

            var pass = System.Configuration.ConfigurationManager.AppSettings["AviinSmtpPass"];
            if (!string.IsNullOrEmpty(pass)) SmtpPass = pass;

            var from = System.Configuration.ConfigurationManager.AppSettings["AviinFromEmail"];
            if (!string.IsNullOrEmpty(from)) FromEmail = from;

            var admin = System.Configuration.ConfigurationManager.AppSettings["AviinAdminEmail"];
            if (!string.IsNullOrEmpty(admin)) AdminEmail = admin;
        }
        catch { }
    }

    private void SendJsonResponse(HttpContext context, bool success, string message, int statusCode)
    {
        context.Response.StatusCode = statusCode;
        var serializer = new JavaScriptSerializer();
        var responseObj = new
        {
            success = success,
            message = message,
            error = success ? null : message
        };
        context.Response.Write(serializer.Serialize(responseObj));
    }

    public bool IsReusable
    {
        get { return true; }
    }

    public class SubscribePayload
    {
        public string email { get; set; }
        public string phone { get; set; }
    }
}
