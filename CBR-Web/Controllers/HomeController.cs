using CBR.DataAccess;
using CBR.Identity;
using CBR.Web.CustomFilter;
using CBR.Web.Models;
using CBR.Web.WebCommons;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using static Aspose.Pdf.Operator;
using static CBR.Web.Controllers.AccountController;

namespace CBR.Web.Controllers
{
    public class HomeController : Controller
    {

        [Authorize]
        public async Task<ActionResult> Index()
        {
            if (Session["User"] == null)
            {
                await this.SetUserSessionAsync();
            }

            if (Session["User"] == null)
            {
                return View("~/Views/Account/UserRegistrationError.cshtml");
            }

            var roles = new[] { "System Administrator", "Standard User", "Administrator", "Non-Bank Standard User", "Non-Bank Administrator", "Project Manager" };

            if (roles.Contains(Session["Role"]))
            {
                ViewBag.ForumURL = TempData["ForumURL"];
                return View();
            }
            else
            {
                ViewBag.ForumURL = TempData["ForumURL"];
                return RedirectToAction("BankAnalytics");
            }
        }

        [Authorize]
        public ActionResult Projects()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult RiskAssessments()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult PeerAnalysis()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult BankAnalytics()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [AuthorizeRole(Roles = "Administrator, System Administrator, Non-Bank Administrator")]
        public ActionResult Admin()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [AuthorizeRole(Roles = "System Administrator")]
        public ActionResult SysAdmin()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }


        public ActionResult PrivacyPolicy()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult SingleBankProfileHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult BankToBankAnalyzerHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult KeyRiskTrendsHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult FindABankHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult PerformanceAnalyzerHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult BenchmarkingHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult BuildPeerGroupsHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult RatioDefinitionHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult CapitalRiskAnalyzerHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult StrategicForecastHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult GapAnalyzerHelp()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        [Authorize]
        public ActionResult SuperAccountAdministration()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        public ActionResult TermsofUse()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }
        public ActionResult GetUserInactivityTimeout()
        {
            var timeout = ConfigurationManager.AppSettings["UserInactivityTimeout"];
            return Json(timeout, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetIsUserFoundCodes()
        {
            var codes = ConfigurationManager.AppSettings["IsUserFoundCodes"];
            var intCodes = Array.ConvertAll(codes.Split(','), int.Parse);
            return Json(intCodes, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetIsUserNotFoundCodes()
        {
            var codes = ConfigurationManager.AppSettings["IsUserNotFoundCodes"];
            var intCodes = Array.ConvertAll(codes.Split(','), int.Parse);
            return Json(intCodes, JsonRequestBehavior.AllowGet);
        }

        private async Task SetUserSessionAsync()
        {
            var claimsIdentity = User.Identity as System.Security.Claims.ClaimsIdentity;
            var claims = ((ClaimsPrincipal)User).Claims.ToList();

            var role = claims.First(x => x.Type == ClaimTypes.Role).Value;
            var email = claims.First(x => x.Type == ClaimTypes.Name).Value;

            CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();

            var appUser = ent.AppUsers.FirstOrDefault(obj => obj.EMail == email);
            if (appUser == null)
            {
                var query = $@"select top 1 * from AppUserRegistration WHERE Email ='{email}' ORDER BY CreatedDate desc";
                var model = ent.Database.SqlQuery<AppUserRegistration>(query).FirstOrDefault();

                if (model == null)
                {
                    return;
                }

                var userManaer = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<AuthUserManager>();
                var user = new AuthUser
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    UserName = email,
                    Email = email,
                    PhoneNumber = string.Empty,
                    Title = model.Title,
                    Department = string.Empty,
                    TenantKey = model.TenantKey,
                    LockoutEnabled = true,
                    EmailConfirmed = true,
                };

                var result = await userManaer.CreateAsync(user, AuthConstants.DefaultPassWord);
                UtilityFunctions.AddUserToRole(email, (int)model.RoleId);
                UtilityFunctions.MakeTenantBankAsDefaultFavorite(email);
                appUser = ent.AppUsers.FirstOrDefault(obj => obj.EMail == email);
            }

            var ermAccessControl = ent.AppUserRoles.FirstOrDefault(obj => obj.UserKey == appUser.UserKey && obj.IsAccessible == true);

            if (ermAccessControl != null && ermAccessControl.IsAccessible)
            {
                validateUserForum(email);
            }
            Session["UserId"] = appUser.UserKey;
            Session["User"] = email;
            Session["Role"] = role;
            var cookie = new HttpCookie("ERMAccessEmail", email);
            cookie.Domain = ".cb-resource.com";//This should be Domain not Sub Domain. even if there is setting in your Web.Config you need to specify this  
            Response.Cookies.Add(cookie);
        }

        private string CreateUserForumUrl(string forumHomeURL, string authToken)
        {
            //return string.Format("<a href=\"https://ermforum.cb-resource.com/?authtoken={0}&remember=REMEMBER\">Forum</a>", authToken);
            return string.Format(forumHomeURL, authToken);
        }
        private UserForumData AuthenticateUserForum(string forumUrl)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(forumUrl);
            try
            {
                WebResponse response = request.GetResponse();
                using (Stream responseStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                    return JsonConvert.DeserializeObject<UserForumData>(reader.ReadToEnd());

                    //return reader.ReadToEnd();
                }
            }
            catch (WebException ex)
            {
                WebResponse errorResponse = ex.Response;
                using (Stream responseStream = errorResponse.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding("utf-8"));
                    String errorText = reader.ReadToEnd();
                    // log errorText
                }
                throw;
            }
        }

        private void validateUserForum(string userName)
        {
            ForumConfig forumConfig = UtilityFunctions.GetForumConfig();

            if (forumConfig != null && forumConfig.ForumId > 0)
            {
                if (!string.IsNullOrEmpty(forumConfig.ForumAuthenticationURL) &&
                    !string.IsNullOrEmpty(forumConfig.ForumRegistrationURL) &&
                    !string.IsNullOrEmpty(forumConfig.ForumHomeURL))
                {
                    string forumUrl = string.Format(forumConfig.ForumAuthenticationURL, userName);
                    UserForumData response = AuthenticateUserForum(forumUrl);

                    if (response != null && string.IsNullOrEmpty(response.message))
                    {
                        string url = CreateUserForumUrl(forumConfig.ForumHomeURL, response.authtoken);
                        TempData["ForumURL"] = url;
                    }
                    else if (response != null && string.Compare(response.message, "Error: The specified user does not exist.", true) == 0)
                    {
                        forumUrl = string.Format(forumConfig.ForumRegistrationURL, userName, userName);
                        UserForumData response1 = AuthenticateUserForum(forumUrl);

                        if (response1 != null && string.IsNullOrEmpty(response1.message))
                        {
                            string url = CreateUserForumUrl(forumConfig.ForumHomeURL, response1.authtoken);
                            TempData["ForumURL"] = url;
                        }
                    }                   
                }
                else
                {
                    // Log missing forum URLs
                    System.Diagnostics.Trace.TraceError("Forum URLs are not properly configured.");
                }
            }
            else
            {
                // Log missing or invalid forum configuration
                System.Diagnostics.Trace.TraceError("Forum configuration is missing or invalid.");
            }
        }

    }
}
