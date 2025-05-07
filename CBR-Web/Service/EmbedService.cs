

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

using Microsoft.PowerBI.Api;
using Microsoft.PowerBI.Api.Models;
using Microsoft.Rest;
using Newtonsoft.Json;

using CBR.Web.Models;


namespace CBR.Web.Service
{
    public static class EmbedService
    {
        private static readonly string powerBiApiUrl = ConfigurationManager.AppSettings["PBI_API_URL"];
        private static readonly string powerBiApiUrlRaw = ConfigurationManager.AppSettings["PBI_API_URL_RAW"];
        private static readonly string powerBiApiScope = ConfigurationManager.AppSettings["PBI_API_Scope"];
        private static readonly string powerBiApiUrlGCC = ConfigurationManager.AppSettings["PBI_API_URL_GCC"];
        private static readonly string powerBiTokenUrl = ConfigurationManager.AppSettings["PBI_TOKEN_URL"];

        private static readonly string powerBiLSCGId = ConfigurationManager.AppSettings["PBI_LSC_GID"];
        private static readonly string powerBiLSCRId = ConfigurationManager.AppSettings["PBI_LSC_RID"];
        private static readonly string powerBiAppId = ConfigurationManager.AppSettings["PBI_APP_ID"];
        private static readonly string powerBiAppSecret = ConfigurationManager.AppSettings["PBI_APP_Secret"];
        private static readonly string powerBiTenantId = ConfigurationManager.AppSettings["PBI_Tenant_Id"];
        private static readonly string powerBiLSCRInitial = ConfigurationManager.AppSettings["PBI_LSC_RID_Initials"];


        private static EmbedToken embedToken1 = null;

        public static async Task<ReportEmbedConfig> GetEmbedParams(string pUser)
        {
            var response = await GetLiquidityScorecardToken(pUser);
            EmbedContent reportData = new EmbedContent();
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var jsonString = await response.Content.ReadAsStringAsync();
                reportData = JsonConvert.DeserializeObject<EmbedContent>(jsonString);
            }

            // Add report data for embedding
            var embedReports = new List<EmbedReport>() {
                    new EmbedReport
                    {
                        ReportId = Guid.Parse(reportData.ReportId) , ReportName = "LCR", EmbedUrl = reportData.EmbedUrl
                    }
                };

            // Capture embed params
            var embedParams = new ReportEmbedConfig
            {
                EmbedReports = embedReports,
                EmbedToken = embedToken1
            };

            return embedParams;

        }



        private static async Task<HttpResponseMessage> GetLiquidityScorecardToken(string pUser)
        {
            string userName = pUser;
            var embedToken = "";
            try
            {
                //var context = Request.Properties["MS_HttpContext"] as HttpContext;
                //this.RequestContext.Principal.Identity.Name;
                HttpClient authclient = new HttpClient();
                var isGCC = false;


                var powerBI_API_URL = "api.powerbi.com";
                var powerBI_API_URL_RAW = "https://api.powerbi.com";
                IList<Guid> datasetIds = new List<Guid>();

                var powerBI_API_Scope = "https://analysis.windows.net/powerbi/api/.default";
                if (isGCC)
                {
                    powerBI_API_Scope = "https://analysis.usgovcloudapi.net/powerbi/api/.default";
                    powerBI_API_URL = "api.powerbigov.us";
                }

                // Power BI Report Details

                //Dev workspace
                //var groupId = "800c6fc1-9a46-494f-88ee-4685c92f04e3";
                //var reportId = "5a85e2df-046b-493c-93fe-3c577cb1312d";

                //Test Workspace
                var groupId = "f5607541-c332-4dee-977d-43b28b1adef4";
                var reportId = "a3961e34-ae62-4f0e-ad20-e4856fb5a252";

                //Prod Workspace

                //c44efe56-31ec-4f3f-b33e-d50bbbf87ac1
                //00f6c410-8969-4b91-b3d4-27deaba8bfd3

                //var groupId = "c44efe56-31ec-4f3f-b33e-d50bbbf87ac1";
                //var reportId = "00f6c410-8969-4b91-b3d4-27deaba8bfd3";

                //Azure App Registration
                var clientId = "7777ac82-7b1e-4861-bd71-bb2dadd486c8";
                var clientSecret = "7Vu8Q~mGbQwPPNWTT3qy6ciULZlZEnT~WuQPha3o";
                var tenantId = "cd70d26d-cd62-4f7f-84cd-11d13878b1e8";
                var content = new FormUrlEncodedContent(new[]
                   {
                     new KeyValuePair<string, string>("grant_type", "client_credentials"),
                     new KeyValuePair<string, string>("client_id", powerBiAppId),
                     new KeyValuePair<string, string>("scope", powerBiApiScope),
                     new KeyValuePair<string, string>("client_secret", powerBiAppSecret)
                    });

                // Generate Access Token to authenticate for Power BI
                var accessToken = await authclient.PostAsync($"{powerBiTokenUrl}{powerBiTenantId}/oauth2/v2.0/token", content).ContinueWith<string>((response) =>
                {
                    //log.LogInformation(response.Result.StatusCode.ToString());
                    //log.LogInformation(response.Result.ReasonPhrase.ToString());
                    //log.LogInformation(response.Result.Content.ReadAsStringAsync().Result);
                    AzureAdTokenResponse tokenRes =
                        JsonConvert.DeserializeObject<AzureAdTokenResponse>(response.Result.Content.ReadAsStringAsync().Result);
                    return tokenRes?.AccessToken; ;
                });

                // Get PowerBi report url and embed token


                HttpClient powerBiClient = new HttpClient();
                powerBiClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken}");
                var embedUrl =
                    await powerBiClient.GetAsync($"https://{powerBiApiUrl}/v1.0/myorg/groups/{powerBiLSCGId}/reports/{powerBiLSCRId}")
                    .ContinueWith<string>((response) =>
                    {
                        //log.LogInformation(response.Result.StatusCode.ToString());
                        //log.LogInformation(response.Result.ReasonPhrase.ToString());
                        PowerBiReport report =
                                       JsonConvert.DeserializeObject<PowerBiReport>(response.Result.Content.ReadAsStringAsync().Result);
                        datasetIds.Add(new Guid(report?.DatasetId));
                        return report?.EmbedUrl;
                    });

                if (powerBiLSCRId.StartsWith(powerBiLSCRInitial))
                {
                    embedToken = GetEmbedTokenwithIdentity(Guid.Parse(powerBiLSCRId), datasetIds, Guid.Parse(powerBiLSCGId), powerBiApiUrlRaw, accessToken, userName).Token;
                }
                else
                {
                    var tokenContent = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("accessLevel", "view")
                    });

                    embedToken = await powerBiClient.PostAsync($"https://{powerBiApiUrl}/v1.0/myorg/groups/{powerBiLSCGId}/reports/{powerBiLSCRId}/GenerateToken", tokenContent)
                     .ContinueWith<string>((response) =>
                     {
                         //log.LogInformation(response.Result.StatusCode.ToString());
                         //log.LogInformation(response.Result.ReasonPhrase.ToString());
                         PowerBiEmbedToken powerBiEmbedToken =
                                        JsonConvert.DeserializeObject<PowerBiEmbedToken>(response.Result.Content.ReadAsStringAsync().Result);
                         return powerBiEmbedToken?.Token;
                     });
                }

                // JSON Response
                EmbedContent data = new EmbedContent
                {
                    EmbedToken = embedToken,
                    EmbedUrl = embedUrl,
                    ReportId = powerBiLSCRId,
                    AccessToken = accessToken
                };
                string jsonp = JsonConvert.SerializeObject(data);
                // Return Response
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(jsonp, Encoding.UTF8, "application/json")
                };
            }
            catch (Exception ex)
            {
                //ExceptionHelper.TrackException(ex);
            }

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("", Encoding.UTF8, "application/json")
            };


        }


        private static EmbedToken GetEmbedTokenwithIdentity(Guid reportId, IList<Guid> datasetIds, [Optional] Guid targetWorkspaceId, string powerBIUrl, string token, string userName)
        {
            EmbedToken embedToken = new EmbedToken();
            try
            {
                PowerBIClient pbiClient = GetPowerBIClient(powerBIUrl, token);

                // Defines the user identity and roles.
                var rlsIdentity = new EffectiveIdentity(
                    username: userName,
                    roles: new List<string> { "CBA User" },
                    datasets: new List<string> { datasetIds[0].ToString() }
                );



                // Create a request for getting an embed token for the rls identity defined above

                var tokenRequest = new GenerateTokenRequestV2(
                    reports: new List<GenerateTokenRequestV2Report>() { new GenerateTokenRequestV2Report(reportId) },
                    datasets: datasetIds.Select(datasetId => new GenerateTokenRequestV2Dataset(datasetId.ToString())).ToList(),
                    targetWorkspaces: targetWorkspaceId != Guid.Empty ? new List<GenerateTokenRequestV2TargetWorkspace>() { new GenerateTokenRequestV2TargetWorkspace(targetWorkspaceId) } : null,
                    identities: new List<EffectiveIdentity> { rlsIdentity }
                );

                // Generate an embed token

                embedToken = pbiClient.EmbedToken.GenerateToken(tokenRequest);
                embedToken1 = embedToken;

                //embedToken = pbiClient.Reports.GenerateTokenInGroup(targetWorkspaceId, reportId, 
                //    new GenerateTokenRequest(accessLevel: "view", datasetId: datasetIds[0].ToString(), rlsIdentity));


            }
            catch (Exception ex)
            {
                string message = ex.Message;

            }
            return embedToken;
        }

        private static PowerBIClient GetPowerBIClient(string powerBIUrl, string token)
        {
            var tokenCredentials = new TokenCredentials(token, "Bearer");
            return new PowerBIClient(new Uri(powerBIUrl), tokenCredentials);
        }
    }


    internal class AzureAdTokenResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
    }
    internal class PowerBiReport
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "webUrl")]
        public string WebUrl { get; set; }
        [JsonProperty(PropertyName = "embedUrl")]
        public string EmbedUrl { get; set; }
        [JsonProperty(PropertyName = "datasetId")]
        public string DatasetId { get; set; }
    }

    internal class PowerBiEmbedToken
    {
        [JsonProperty(PropertyName = "token")]
        public string Token { get; set; }
        [JsonProperty(PropertyName = "tokenId")]
        public string TokenId { get; set; }
        [JsonProperty(PropertyName = "expiration")]
        public DateTime? Expiration { get; set; }
    }
    internal class EmbedContent
    {
        public string EmbedToken { get; set; }
        public string EmbedUrl { get; set; }
        public string ReportId { get; set; }
        public string AccessToken { get; set; }
    }

}
