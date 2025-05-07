using System;
using System.Data.SqlClient;
using System.Configuration;
using System.Security.Cryptography;
using System.Text;
using System.ComponentModel;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;
using CBR.DataAccess;
using System.Net.Mail;
using Azure.Identity;
using Microsoft.Graph;
using System.Threading.Tasks;

namespace CBR.Common
{
    public enum ChartTypeKeys
    {
        [Description("loadCompositionStackChart")]
        LoadComposition = 1,
        [Description("depositCompositionStackChart")]
        DepositComposition = 2,
        [Description("assetGrowthBarChart")]
        AssetGrowthRate = 3,
        [Description("loansLeasesGrowthBarChart")]
        LoansAndLeasesGrowthRate = 4,
        [Description("depositGrowthBarChart")]
        DepositGrowthRate = 5,
        [Description("equityGrowthBarChart")]
        BankEquityCapitalGrowthRate = 6,
        [Description("varianceChart")]
        LoansAndLeasesVarianceChart = 7,
        [Description("riskRadarKRI1")]
        RiskRadarKRI1 = 8,
        [Description("riskRadarKRI2")]
        RiskRadarKRI2 = 9,
        [Description("riskRadarKRI3")]
        RiskRadarKRI3 = 10,
        [Description("riskRadarKRI4")]
        RiskRadarKRI4 = 11,
        [Description("riskRadarKRI5")]
        RiskRadarKRI5 = 12,
        [Description("riskRadarKRI6")]
        RiskRadarKRI6 = 13,
        [Description("riskRadarKRI7")]
        RiskRadarKRI7 = 14,
        [Description("riskRadarKRI8")]
        RiskRadarKRI8 = 15,
        [Description("riskRadarKRI9")]
        RiskRadarKRI9 = 16,
        [Description("riskRadarKRI10")]
        RiskRadarKRI10 = 17,


    }

    public class CommonFunctions
    {
        public static T GetValueFromDescription<T>(string description)
        {
            var type = typeof(T);
            if (!type.IsEnum) throw new InvalidOperationException();
            foreach (var field in type.GetFields())
            {
                var attribute = Attribute.GetCustomAttribute(field,
                    typeof(DescriptionAttribute)) as DescriptionAttribute;
                if (attribute != null)
                {
                    if (attribute.Description == description)
                        return (T)field.GetValue(null);
                }
                else
                {
                    if (field.Name == description)
                        return (T)field.GetValue(null);
                }
            }
            throw new ArgumentException("Not found.", "description");
            // or return default(T);
        }


        public static string GetQuarterLabel(string date)
        {
            string quarterLabel = string.Empty;
            string month = date.Substring(4, 2);
            string year = date.Substring(0, 4);
            int monthInt = Convert.ToInt32(month);

            if (monthInt >= 1 && monthInt <= 3)
            {
                quarterLabel = year + "Q1";
            }
            if (monthInt >= 4 && monthInt <= 6)
            {
                quarterLabel = year + "Q2";
            }
            if (monthInt >= 7 && monthInt <= 9)
            {
                quarterLabel = year + "Q3";
            }
            if (monthInt >= 10 && monthInt <= 12)
            {
                quarterLabel = year + "Q4";
            }

            return quarterLabel;
        }

        public static string GetYearlyLabel(string date)
        {
            string quarterLabel = string.Empty;
            string month = date.Substring(4, 2);
            string year = date.Substring(0, 4);
            int monthInt = Convert.ToInt32(month);

            if (monthInt >= 1 && monthInt <= 3)
            {
                quarterLabel = year + "Q1";
            }

            if (monthInt >= 4 && monthInt <= 6)
            {
                quarterLabel = year + "Q2";
            }

            if (monthInt >= 7 && monthInt <= 9)
            {
                quarterLabel = year + "Q3";
            }

            if (monthInt >= 10 && monthInt < 12)
            {
                quarterLabel = year + "Q4";
            }
            else
            {
                quarterLabel = year + "Y";
            }

            return quarterLabel;
        }

        //public static string GetLastQuarterString()
        //{
        //    int startMonth = 0;
        //    int startYear = DateTime.Now.Year;
        //    int startDay = 1;
        //    int endMonth = 0;
        //    int endYear = DateTime.Now.Year;
        //    int endDay = 31;

        //    string quarter = string.Empty;

        //    if (DateTime.Today.Month >= 1 && DateTime.Today.Month <= 3)
        //    {
        //        quarter = "Q4";
        //    }
        //    if (DateTime.Today.Month >= 4 && DateTime.Today.Month <= 6)
        //    {
        //        quarter = "Q1";
        //    }
        //    if (DateTime.Today.Month >= 7 && DateTime.Today.Month <= 9)
        //    {
        //        quarter = "Q2";
        //    }
        //    if (DateTime.Today.Month >= 10 && DateTime.Today.Month <= 12)
        //    {
        //        quarter = "Q3";
        //    }

        //    switch (quarter)
        //    {
        //        case "Q1":
        //            startMonth = 1;
        //            endMonth = 3;
        //            endDay = 30;
        //            break;

        //        case "Q2":
        //            startMonth = 4;
        //            endMonth = 6;
        //            break;

        //        case "Q3":
        //            startMonth = 7;
        //            endMonth = 9;
        //            endDay = 30;
        //            break;

        //        case "Q4":
        //            startMonth = 10;
        //            startYear = DateTime.Now.Year - 1;
        //            endMonth = 12;
        //            endYear = DateTime.Now.Year - 1;
        //            break;
        //    }

        //    DateTime startDate = new DateTime(startYear, startMonth, startDay);
        //    DateTime endDate = new DateTime(endYear, endMonth, endDay);
        //    string day = string.Empty;
        //    string month = string.Empty;
        //    string year = string.Empty;

        //    if (endDate.Day < 10)
        //        day = "0" + endDate.Day.ToString();
        //    else
        //        day = endDate.Day.ToString();

        //    if (endDate.Month < 10)
        //        month = "0" + endDate.Month.ToString();
        //    else
        //        month = endDate.Month.ToString();

        //    return endDate.Year.ToString() + month + day;
        //}

        public static string GetLastQuarterString()
        {
            string connection = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            SqlConnection conn = new SqlConnection(connection);

            SqlDataReader rdr = null;
            string lastQuarter = string.Empty;
            try
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT [ConfiguredValue]" +
                                                " FROM [ETLFrameWork].[dbo].[ETLConfiguration]" +
                                                " WHERE ConfigurationFIlter = 'DataLoadLatestQuarter'", conn);
                rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    lastQuarter = rdr[0].ToString();
                }
            }
            finally
            {
                // close the reader
                if (rdr != null)
                {
                    rdr.Close();
                }

                // 5. Close the connection
                if (conn != null)
                {
                    conn.Close();
                }
            }


            //return endDate.Year.ToString() + month + day;
            return lastQuarter;
        }

        public static async Task SendMail(string firstName, string message, string emailAddress, string subject, string ccMail = null)
        {
            try
            {
                var ccAdminEmail = ccMail ?? ConfigurationManager.AppSettings["CcAdminEmail"];

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
                    Subject = subject,
                    Body = new ItemBody
                    {
                        ContentType = BodyType.Html,
                        Content = message
                    },
                    ToRecipients = new List<Recipient>()
                    {
                        new Recipient { EmailAddress = new Microsoft.Graph.EmailAddress { Address = emailAddress, Name = firstName}}
                    },
                    BccRecipients = bccRecipients
                    //CcRecipients = new List<Recipient>()
                    //{
                    //    new Recipient{EmailAddress = new Microsoft.Graph.EmailAddress { Address = ccAdminEmail} }
                    //}
                };

                // Send mail as the given user. 
                await graphServiceClient
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
        public static void SendMail_SendGrid(string firstName, string message, string emailAddress, string subject)
        {

            //// Credentials:
            var sendGridUserName = "cbradmin";
            var sentFrom = "castellonf@stifel.com";
            //var sendGridPassword = "CommunityBanking@14";

            var apiKey = ConfigurationManager.AppSettings["SendGridAPIKey"];
            var client = new SendGridClient(apiKey);
            var from = new SendGrid.Helpers.Mail.EmailAddress(sentFrom, sendGridUserName);
            var to = new SendGrid.Helpers.Mail.EmailAddress(emailAddress, firstName);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, string.Empty, message);
            msg.AddCc(sentFrom);
            Response res = client.SendEmailAsync(msg).Result;

            //// Configure the client:
            //var client = new System.Net.Mail.SmtpClient("smtp.sendgrid.net", Convert.ToInt32(587));

            //client.Port = 587;
            //client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            //client.UseDefaultCredentials = false;

            //// Creatte the credentials:
            //System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(sendGridUserName, sendGridPassword);

            //client.EnableSsl = true;
            //client.Credentials = credentials;

            //// Create the message:
            //var mail = new System.Net.Mail.MailMessage(sentFrom, emailAddress);
            //mail.IsBodyHtml = true;
            //mail.Subject = subject;
            //mail.Body = message;
            //mail.Bcc.Add("castellonf@stifel.com");
            //// Send:
            //client.Send(mail);
        }

        public static void SendMail_SMTP(string firstName, string message, string recipient, string subject)
        {
            SmtpClient client = new SmtpClient("smtp-mail.outlook.com");

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
                var mail = new MailMessage(_sender.Trim(), recipient.Trim(), subject.Trim(), message.Trim());
                mail.IsBodyHtml = true;
                mail.CC.Add(_sender);
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                client.Send(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                //Task.CompletedTask;
                //throw ex;
            }
        }
        public static string Encrypt(string toEncrypt, bool useHashing)
        {
            byte[] keyArray;
            byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);

            System.Configuration.AppSettingsReader settingsReader =
                                                new AppSettingsReader();
            string key = (string)settingsReader.GetValue("SecurityKey", typeof(String));
            //If hashing use get hashcode regards to your key
            if (useHashing)
            {
                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
                hashmd5.Clear();
            }
            else
                keyArray = UTF8Encoding.UTF8.GetBytes(key);

            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform = tdes.CreateEncryptor();
            byte[] resultArray =
              cTransform.TransformFinalBlock(toEncryptArray, 0,
              toEncryptArray.Length);
            tdes.Clear();
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }
        public static string Decrypt(string cipherString, bool useHashing)
        {
            byte[] keyArray;
            byte[] toEncryptArray = Convert.FromBase64String(cipherString);

            System.Configuration.AppSettingsReader settingsReader = new AppSettingsReader();
            string key = (string)settingsReader.GetValue("SecurityKey", typeof(String));

            if (useHashing)
            {
                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
                hashmd5.Clear();
            }
            else
            {
                keyArray = UTF8Encoding.UTF8.GetBytes(key);
            }

            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform = tdes.CreateDecryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            tdes.Clear();
            return UTF8Encoding.UTF8.GetString(resultArray);
        }

        public static string DecryptFromBase64(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public static string EncryptToBase64(string toEncrypt)
        {
            byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);
            return Convert.ToBase64String(toEncryptArray, 0, toEncryptArray.Length);
        }

        public static byte[] GetBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }

        public static string GetRandomNumberOfGivenArray(string[] inputArray)
        {
            Random rd = new Random();
            int randomIndex = rd.Next(0, inputArray.Length);
            return inputArray[randomIndex];
        }

        //public static Dictionary<string, string> prepareMinAndMaxAssetValues(AppFavoriteSearch savedFavoriteSearchItem)
        //{
        //    var minAndMaxAssetValues = new Dictionary<string, string>();
        //    if (savedFavoriteSearchItem.AssetMaxSize.HasValue && savedFavoriteSearchItem.AssetMinSize.HasValue)
        //    {
        //        minAndMaxAssetValues.Add("assetMinValue", savedFavoriteSearchItem.AssetMinSize.ToString());
        //        minAndMaxAssetValues.Add("assetMaxValue", savedFavoriteSearchItem.AssetMaxSize.ToString());
        //    }
        //    else if (savedFavoriteSearchItem.AssetMinSize.HasValue)
        //    {
        //        minAndMaxAssetValues.Add("assetMinValue", savedFavoriteSearchItem.AssetMinSize.ToString());
        //        minAndMaxAssetValues.Add("assetMaxValue", "");
        //    }
        //    else if (savedFavoriteSearchItem.AssetMaxSize.HasValue)
        //    {
        //        minAndMaxAssetValues.Add("assetMinValue", "");
        //        minAndMaxAssetValues.Add("assetMaxValue", savedFavoriteSearchItem.AssetMaxSize.ToString());
        //    }
        //    else if (!string.IsNullOrEmpty(savedFavoriteSearchItem.AssetSize))
        //    {
        //        var parts = savedFavoriteSearchItem.AssetSize.Split('-');
        //        var firstPart = parts[0].Replace("Banks ", "");
        //        if (parts.Length == 2)
        //        {
        //            if (firstPart.Contains("B") && parts[1].Contains("B"))
        //            {
        //                //Bilions case
        //                minAndMaxAssetValues.Add("assetMinValue", (int.Parse(firstPart.Replace("$", "").Replace("B", "")) * 1000).ToString());
        //                minAndMaxAssetValues.Add("assetMaxValue", (int.Parse(parts[1].Replace("$", "").Replace("B", "")) * 1000).ToString());

        //            }
        //            else
        //            {
        //                minAndMaxAssetValues.Add("assetMinValue", firstPart.Replace("$", "").Replace("M", ""));
        //                minAndMaxAssetValues.Add("assetMaxValue", parts[1].Replace("$", "").Replace("M", ""));
        //            }
        //        }
        //        else if (parts[0].Contains("Banks Over "))
        //        {
        //            //Billion case
        //            minAndMaxAssetValues.Add("assetMinValue", (int.Parse(parts[0].Replace("Banks Over ", "").Replace("$", "").Replace("B", "")) * 1000).ToString());
        //            minAndMaxAssetValues.Add("assetMaxValue", "");
        //        }
        //        else
        //        {
        //            minAndMaxAssetValues.Add("assetMinValue", "");
        //            minAndMaxAssetValues.Add("assetMaxValue", parts[0].Replace("Banks Less Than ", "").Replace("$", "").Replace("M", ""));
        //        }
        //    }
        //    return minAndMaxAssetValues;
        //}
    }
}
