using System;
using Microsoft.Owin.Security.Cookies;
using Owin;
using CBR.Web.Models;
using CBR.Identity;
using Microsoft.Owin.Security.OpenIdConnect;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Owin.Extensions;
using System.Security.Claims;
using System.Configuration;
using System.Web.Helpers;
using CBR.Web.WebCommons;
using System.Threading.Tasks;

namespace CBR.Web
{
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864

        public void ConfigureAuth(IAppBuilder app)
        {
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<AuthUserManager>(AuthUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);

            // Configure cookie authentication
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = AuthConstants.SignInAsAuthenticationType,
                ExpireTimeSpan = TimeSpan.FromMinutes(10),
                SlidingExpiration = true
            });

            JwtSecurityTokenHandler.DefaultMapInboundClaims = true;
            app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
            {
                AuthenticationType = AuthConstants.AuthenticationType,
                SignInAsAuthenticationType = AuthConstants.SignInAsAuthenticationType,
                ResponseType = Microsoft.IdentityModel.Protocols.OpenIdConnect.OpenIdConnectResponseType.CodeIdTokenToken,
                Authority = ConfigurationManager.AppSettings["SSOAuthority"],
                ClientId = ConfigurationManager.AppSettings["SSOClientId"],
                ClientSecret = ConfigurationManager.AppSettings["SSOClientSecret"],
                RedirectUri = ConfigurationManager.AppSettings["SSORedirect"]+ "Account/LoginRedirect",
                PostLogoutRedirectUri = ConfigurationManager.AppSettings["SSORedirect"]+ "Account/PostLogout",
                Scope = ConfigurationManager.AppSettings["SSOScope"],
                UseTokenLifetime = false,
                SaveTokens = true,
                RedeemCode = true,
                UsePkce = true,
                Notifications = new OpenIdConnectAuthenticationNotifications
                {
                    SecurityTokenValidated = async n =>
                    {
                        var identity = n.AuthenticationTicket.Identity;
                        var email = identity.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
                        identity.AddClaim(new Claim(ClaimTypes.Name, email));
                        identity.AddClaim(new Claim(ClaimTypes.Role, UtilityFunctions.GetUserRole(email)));
                        identity.AddClaim(new Claim("id_token", n.ProtocolMessage.IdToken));
                        AntiForgeryConfig.UniqueClaimTypeIdentifier = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
                    },
                    AuthenticationFailed = (context) =>
                    {
                        if (context.Exception.Message.Contains("IDX21323"))
                        {
                            context.SkipToNextMiddleware();
                        }
                        else
                        {
                            context.ProtocolMessage.RedirectUri = ConfigurationManager.AppSettings["SSORedirect"] + "Account/CustomError";
                            context.HandleResponse();
                            context.Response.Redirect(context.ProtocolMessage.RedirectUri);
                        }
                        return Task.FromResult(0);
                    }
                }
            });

            app.UseStageMarker(PipelineStage.Authenticate);
        }
    }
}