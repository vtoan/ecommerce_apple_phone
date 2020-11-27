using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using ecommerce_apple_phone.Interfaces;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace ecommerce_apple_phone.Helper {

    public class MailSettings {
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }

    public class EmailSender : IMailSenderService {

        private readonly MailSettings _mailSettings;
        public EmailSender (IOptions<MailSettings> mailSettings) {
            _mailSettings = mailSettings.Value;
        }
        public async Task SendMail (string desMail, string subjectMail, string bodyMail) {
            //===================== With Mailkit ===================
            var email = new MimeMessage ();
            email.Sender = new MailboxAddress (_mailSettings.DisplayName, _mailSettings.Mail);
            email.From.Add (new MailboxAddress (_mailSettings.DisplayName, _mailSettings.Mail));
            email.To.Add (MailboxAddress.Parse (desMail));
            email.Subject = subjectMail;
            email.Body = new TextPart (TextFormat.Plain) { Text = bodyMail };
            //
            using var smtp = new MailKit.Net.Smtp.SmtpClient ();

            try {
                smtp.Connect (_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate (_mailSettings.Mail, _mailSettings.Password);
                await smtp.SendAsync (email);
            } catch (Exception ex) {
                Console.WriteLine (ex);
            }
            smtp.Disconnect (true);
            //===================== With SMTP Client and serverSMTP Gmail ===================
            // var email = new MailMessage (from: _mailSettings.DisplayName, to: desMail, subject: subjectMail, body: bodyMail);
            // email.BodyEncoding = System.Text.Encoding.UTF8;
            // email.SubjectEncoding = System.Text.Encoding.UTF8;
            // email.IsBodyHtml = true;
            // email.ReplyToList.Add (new MailAddress (_mailSettings.DisplayName));
            // email.Sender = new MailAddress (_mailSettings.DisplayName);

            // Tạo SmtpClient kết nối đến smtp.gmail.com
            // using (SmtpClient client = new SmtpClient ("smtp.gmail.com")) {
            //     client.Port = 587;
            //     client.Credentials = new NetworkCredential (_mailSettings.DisplayName, _mailSettings.Password);
            //     client.EnableSsl = true;
            //     return await SendMail (_mailSettings.DisplayName, desMail, subjectMail, bodyMail, client);
            // }
        }
    }
}