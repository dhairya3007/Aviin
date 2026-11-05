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
    private string SmtpUser     = "your-email@gmail.com";  // Your SMTP email / username
    private string SmtpPass     = "your-app-password";     // Your SMTP password or App Password
    private string FromEmail    = "noreply@aviin.com";     // Display From email address
    private string FromName     = "Aviin Family";          // Sender display name
    private string AdminEmail   = "admin@aviin.com";       // Where notifications of new subscribers are sent

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

            string whatsappNotice = string.IsNullOrEmpty(phone)
                ? ""
                : "<div style='margin:20px 0 0; padding:12px 18px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; font-size:13.5px; color:#166534; text-align:center;'>WhatsApp updates enabled for: <strong style='color:#15803d;'>" + HttpUtility.HtmlEncode(phone) + "</strong></div>";

            string logoPath = HttpContext.Current.Server.MapPath("~/logo.png");
            if (!File.Exists(logoPath)) logoPath = HttpContext.Current.Server.MapPath("~/assets/logo.png");

            mail.Body = @"
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>Welcome to Aviin Family</title>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<body style='margin:0; padding:40px 16px; background-color:#f7f5f0; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;'>
  <center>
    <table width='100%' cellpadding='0' cellspacing='0' style='max-width:560px; margin:0 auto; background-color:#ffffff; border:1px solid rgba(197,160,89,0.35); border-radius:16px; overflow:hidden; box-shadow:0 10px 35px rgba(35,31,54,0.06);'>
      <tr>
        <td style='padding:38px 30px 24px; text-align:center; background-color:#ffffff; border-bottom:1px solid #f0ecdf;'>
          <img src='cid:aviinlogo' alt='AVIIN' width='180' style='display:block; margin:0 auto; width:180px; max-width:180px; height:auto;' />
          <div style='font-size:10px; letter-spacing:0.28em; color:#8e899b; text-transform:uppercase; margin-top:10px; font-weight:500;'>Pure Luxury Clothing</div>
        </td>
      </tr>
      <tr>
        <td style='padding:38px 40px 32px; text-align:center;'>
          <h1 style='font-family:Georgia,serif; font-size:26px; font-weight:500; color:#1f1b2e; margin:0 0 14px; letter-spacing:0.02em;'>
            Welcome to the Aviin Family
          </h1>
          <p style='font-size:14.5px; line-height:1.7; color:#5a5568; margin:0 0 24px;'>
            Thank you for reserving your private access. You are now part of the Aviin family and will receive priority drop announcements, couture previews, and invitations before public release.
          </p>
          <div style='font-size:13px; color:#8e899b; margin-top:10px;'>
            Registered Email: <strong style='color:#231f36;'>" + HttpUtility.HtmlEncode(recipientEmail) + @"</strong>
          </div>
          " + whatsappNotice + @"
          <div style='height:1px; background:linear-gradient(90deg,transparent,rgba(197,160,89,0.3),transparent); margin:30px 0 24px;'></div>
          <p style='font-size:13px; line-height:1.6; color:#787385; margin:0;'>
            Our collection will be unveiled shortly. Watch your inbox for your exclusive entrance link when the countdown completes.
          </p>
        </td>
      </tr>
      <tr>
        <td style='padding:20px 30px; background-color:#faf9f6; text-align:center; border-top:1px solid #f0ecdf; font-size:11px; color:#9994a5;'>
          © " + DateTime.Now.Year + @" Aviin Family. All rights reserved.
        </td>
      </tr>
    </table>
  </center>
</body>
</html>";

            if (File.Exists(logoPath))
            {
                var att = new Attachment(logoPath);
                att.ContentId = "aviinlogo";
                mail.Attachments.Add(att);
            }

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

            string phoneDisplay = string.IsNullOrEmpty(phone) 
                ? "<span style='color:#888;'>Not opted in</span>" 
                : "<span style='color:#15803d; font-weight:600;'>" + HttpUtility.HtmlEncode(phone) + "</span>";

            mail.Body = @"
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>New Aviin Family Member</title>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<body style='margin:0; padding:36px 16px; background-color:#f5f4ef; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif; color:#231f36;'>
  <center>
    <table width='100%' cellpadding='0' cellspacing='0' style='max-width:500px; margin:0 auto; background-color:#ffffff; border:1px solid #e2ddcf; border-radius:12px; overflow:hidden; box-shadow:0 8px 26px rgba(0,0,0,0.05); text-align:left;'>
      <tr>
        <td style='padding:24px 28px 20px; background-color:#1f1b2e; border-bottom:2px solid #c5a059;'>
          <div style='font-size:11px; letter-spacing:0.18em; color:#c5a059; font-weight:700; text-transform:uppercase;'>AVIIN FAMILY NOTIFICATION</div>
          <h2 style='margin:6px 0 0; color:#ffffff; font-size:19px; font-weight:500; font-family:Georgia,serif;'>New Member Joined</h2>
        </td>
      </tr>
      <tr>
        <td style='padding:28px;'>
          <table width='100%' cellpadding='0' cellspacing='0' style='font-size:14px;'>
            <tr>
              <td style='padding:12px 0; border-bottom:1px solid #f0ece1; color:#767285; width:36%;'>Subscriber Email</td>
              <td style='padding:12px 0; border-bottom:1px solid #f0ece1; font-weight:600;'><a href='mailto:" + HttpUtility.HtmlEncode(subscriberEmail) + @"' style='color:#1f1b2e; text-decoration:underline;'>" + HttpUtility.HtmlEncode(subscriberEmail) + @"</a></td>
            </tr>
            <tr>
              <td style='padding:12px 0; border-bottom:1px solid #f0ece1; color:#767285;'>WhatsApp Phone</td>
              <td style='padding:12px 0; border-bottom:1px solid #f0ece1;'>" + phoneDisplay + @"</td>
            </tr>
            <tr>
              <td style='padding:12px 0; color:#767285;'>Date &amp; Time</td>
              <td style='padding:12px 0; font-size:13px; color:#666;'>" + DateTime.UtcNow.ToString("MMM dd, yyyy HH:mm") + @" UTC</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style='padding:14px 28px; background-color:#faf9f6; border-top:1px solid #f0ece1; font-size:11px; color:#8e899b;'>
          Automated notification from Aviin Family Launch System.
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
