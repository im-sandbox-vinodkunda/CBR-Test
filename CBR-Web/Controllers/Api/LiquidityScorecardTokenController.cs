using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using CBR.DataAccess;
using CBR.Common;
using CBR.Web.CustomFilter;
using System.Net.Http.Headers;
using CBR.Web.WebCommons;

using Microsoft.PowerBI.Api.Models;
using Microsoft.PowerBI.Api;
using System.Text;
using System.Web.Helpers;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using Microsoft.Rest;
using System.Web.Http.Cors;
using System.Web;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace CBR.Web.Controllers.Api
{

    public class LiquidityScorecardTokenController : ApiController
    {
        [HttpGet]  
        public async Task<HttpResponseMessage> GetLiquidityScorecardToken() 
        {
            string userName = User.Identity.Name;
            //ERMAccessEmail

            try
            {
                //var context = Request.Properties["MS_HttpContext"] as HttpContext;
                //this.RequestContext.Principal.Identity.Name;
                HttpClient authclient = new HttpClient();
                var isGCC = false;

                var embedToken = "";
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
                    new KeyValuePair<string, string>("client_id", clientId),
                    new KeyValuePair<string, string>("scope", powerBI_API_Scope),
                    new KeyValuePair<string, string>("client_secret", clientSecret)
                });

                // Generate Access Token to authenticate for Power BI
                var accessToken = await authclient.PostAsync($"https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token", content).ContinueWith<string>((response) =>
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
                    await powerBiClient.GetAsync($"https://{powerBI_API_URL}/v1.0/myorg/groups/{groupId}/reports/{reportId}")
                    .ContinueWith<string>((response) =>
                    {
                        //log.LogInformation(response.Result.StatusCode.ToString());
                        //log.LogInformation(response.Result.ReasonPhrase.ToString());
                        PowerBiReport report =
                            JsonConvert.DeserializeObject<PowerBiReport>(response.Result.Content.ReadAsStringAsync().Result);
                        datasetIds.Add(new Guid(report?.DatasetId));
                        return report?.EmbedUrl;
                    });

                if (reportId.StartsWith("a3961e34"))
                {
                    embedToken = GetEmbedTokenwithIdentity(Guid.Parse(reportId), datasetIds, Guid.Parse(groupId), powerBI_API_URL_RAW, accessToken, userName).Token;
                }
                else
                {
                    var tokenContent = new FormUrlEncodedContent(new[]
                    {
                            new KeyValuePair<string, string>("accessLevel", "view")
                        });

                    embedToken = await powerBiClient.PostAsync($"https://{powerBI_API_URL}/v1.0/myorg/groups/{groupId}/reports/{reportId}/GenerateToken", tokenContent)
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
                    ReportId = reportId,
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
                ExceptionHelper.TrackException(ex);
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

        public LoggedInUserDetails GetLoggedInUserDetails()
        {
            LoggedInUserDetails loggedInUserDetails = null;

            try
            {
                loggedInUserDetails = new LoggedInUserDetails();
                long tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name);
                loggedInUserDetails.InstitutionKey = UtilityFunctions.GetInstitutionKey(tenantKey);
                loggedInUserDetails.InstitutionName = UtilityFunctions.GetInstitutionName(tenantKey);
                loggedInUserDetails.UserName = UtilityFunctions.GetUserName(User.Identity.Name);
                // //User.Identity.Name is the email address.
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return loggedInUserDetails;
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
