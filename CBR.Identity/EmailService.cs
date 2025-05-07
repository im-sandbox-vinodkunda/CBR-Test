namespace CBR.Identity
{
    using System.Threading.Tasks;
    using Microsoft.AspNet.Identity;
    using System;
    using System.Configuration;
    using SendGrid;
    using SendGrid.Helpers.Mail;
    using System.Net;
    using System.Net.Mail;
    using System.Collections.Generic;
    using Azure.Identity;
    using Microsoft.Graph;

    public class EmailService : IIdentityMessageService
    {
        #region methods

        public Task SendAsync(IdentityMessage message)
        {
            try
            {
                var ccAdminEmail = ConfigurationManager.AppSettings["CcAdminEmail"];
                var bccRecipients = new List<Recipient>();

                // Split the comma-separated string and add each email to the BccRecipients list
                if (!string.IsNullOrEmpty(ccAdminEmail))
                {
                    var ccEmails = ccAdminEmail.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (var email in ccEmails)
                    {
                        bccRecipients.Add(new Recipient { EmailAddress = new Microsoft.Graph.EmailAddress { Address = email.Trim() } });
                    }
                }
                // IF YOU ARE USING A CLIENT ID / SECRET:
                // Define your credentials based on the created app and user details.
                // Specify the options. In most cases we're running the Azure Public Cloud.
                var credentials = new ClientSecretCredential(
                    ConfigurationManager.AppSettings["TenantId"], //Tenant id. store in config file.
                    ConfigurationManager.AppSettings["ApplicationOrClientId"], //Application/client id. store in config file
                    ConfigurationManager.AppSettings["ClientSecret"],// Client secret, store in the config file.
                    new TokenCredentialOptions { AuthorityHost = AzureAuthorityHosts.AzurePublicCloud });

                // IF YOU ARE USING MANAGED IDENTITY.
                //var credentials = new DefaultAzureCredential();

                // 
                // NUGET: Microsoft.Graph
                //
                //AuthProvider authProvider = new AuthProvider();
                // Define our new Microsoft Graph client.
                // Use the credentials we specified above.
                GraphServiceClient graphServiceClient = new GraphServiceClient(credentials);

                //var subject = "Test email";
                //var body = "Email Test from CBR";

                // Define a simple e-mail message.
                var emailMessage = new Microsoft.Graph.Message
                {
                    Subject = message.Subject,
                    Body = new ItemBody
                    {
                        ContentType = BodyType.Html,
                        Content = message.Body
                    },
                    ToRecipients = new List<Recipient>()
                    {
                        new Recipient { EmailAddress = new Microsoft.Graph.EmailAddress { Address = message.Destination}}
                    },
                    BccRecipients = bccRecipients
                    //CcRecipients = new List<Recipient>() 
                    //{ 
                    //    new Recipient{EmailAddress = new Microsoft.Graph.EmailAddress { Address = ccAdminEmail} }
                    //}
                };

                // Send mail as the given user. 
                return graphServiceClient
                      .Users[ConfigurationManager.AppSettings["UserObjectId"]] //User object id. Store this value in the config.
                      .SendMail(emailMessage, true)
                      .Request()
                      .PostAsync();

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public Task SendAsync_Using_SendGrid(IdentityMessage message)
        {
            // Credentials:
            var sendGridUserName = "cbradmin";
            var sentFrom = "castellonf@stifel.com";
            //var sendGridPassword = "CommunityBanking@14";

            //// Configure the client:
            //var client =
            //    new System.Net.Mail.SmtpClient("smtp.sendgrid.net", Convert.ToInt32(587));

            //client.Port = 587;
            //client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            //client.UseDefaultCredentials = false;

            //// Creatte the credentials:
            //System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(sendGridUserName, sendGridPassword);

            //client.EnableSsl = true;
            //client.Credentials = credentials;

            //// Create the message:
            //var mail = new System.Net.Mail.MailMessage(sentFrom, message.Destination);
            //mail.IsBodyHtml = true;
            //mail.Subject = message.Subject;
            //mail.Body = message.Body;

            //// Send:
            //return client.SendMailAsync(mail);

            //TODO Have to test the functionality because we are not using this method any where in the application.

            var apiKey = ConfigurationManager.AppSettings["SendGridAPIKey"];
            var client = new SendGridClient(apiKey);
            var from = new SendGrid.Helpers.Mail.EmailAddress(sentFrom, sendGridUserName);
            var to = new SendGrid.Helpers.Mail.EmailAddress(message.Destination);
            var msg = MailHelper.CreateSingleEmail(from, to, message.Subject, string.Empty, message.Body);
            msg.AddCc(sentFrom);
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
            return client.SendEmailAsync(msg);
        }
        public async Task SendAsync_SMTP(IdentityMessage message)
        {
            SmtpClient client = new SmtpClient("smtp.office365.com");

            var _sender = ConfigurationManager.AppSettings["SMTPUser"];
            var _password = ConfigurationManager.AppSettings["SMTPPwd"];

            client.Port = 587;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(_sender, _password);
            client.EnableSsl = true;
            client.Credentials = credentials;

            try
            {
                var mail = new MailMessage(_sender.Trim(), message.Destination.Trim());
                mail.Subject = message.Subject;
                mail.IsBodyHtml = true;
                mail.Body = message.Body;
                mail.CC.Add(_sender);
                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;

                client.Send(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                //Task.CompletedTask;
                //throw ex;
            }
        }

        #endregion
    }
}