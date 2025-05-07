using CBR.Common;
using CBR.DataAccess;
using CBR.Identity;
using CBR.Web.Models;
using CBR.Web.WebCommons;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Web.Configuration;
using System.Configuration;
using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;

namespace CBR.Web.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private AuthUserManager _userManager;
        private static DateTime _lastLoginDate = DateTime.UtcNow;
        private ApplicationDbContext context;

        public AccountController()
        {
            context = new ApplicationDbContext();
        }

        private IEnumerable<SelectListItem> GetUserTitles()
        {
            List<SelectListItem> titles = new List<SelectListItem>();

            titles.Add(new SelectListItem() { Text = "What is your title?", Value = "", Selected = true });
            titles.Add(new SelectListItem() { Text = "Board Member", Value = "Board Member" });
            titles.Add(new SelectListItem() { Text = "President or CEO", Value = "President or CEO" });
            titles.Add(new SelectListItem() { Text = "CFO", Value = "CFO" });
            titles.Add(new SelectListItem() { Text = "CCO", Value = "CCO" });
            titles.Add(new SelectListItem() { Text = "CRO", Value = "CRO" });
            titles.Add(new SelectListItem() { Text = "CTO", Value = "CTO" });
            titles.Add(new SelectListItem() { Text = "COO", Value = "COO" });
            titles.Add(new SelectListItem() { Text = "CMO", Value = "CMO" });
            titles.Add(new SelectListItem() { Text = "Other Senior Level Executive", Value = "Other Senior Level Executive" });
            titles.Add(new SelectListItem() { Text = "Manager", Value = "Manager" });
            titles.Add(new SelectListItem() { Text = "Supervisor", Value = "Supervisor" });
            titles.Add(new SelectListItem() { Text = "Staff", Value = "Staff" });

            return titles;
        }

        private IEnumerable<SelectListItem> GetUserDepartments()
        {
            List<SelectListItem> departments = new List<SelectListItem>();
            departments.Add(new SelectListItem() { Text = "What is your department?", Value = "What is your department?", Selected = true });
            departments.Add(new SelectListItem() { Text = "Administration", Value = "Administration" });
            departments.Add(new SelectListItem() { Text = "Board", Value = "Board" });
            departments.Add(new SelectListItem() { Text = "Credit", Value = "Credit" });
            departments.Add(new SelectListItem() { Text = "Finance", Value = "Finance" });
            departments.Add(new SelectListItem() { Text = "Operations", Value = "Operations" });
            departments.Add(new SelectListItem() { Text = "Compliance", Value = "Compliance" });
            departments.Add(new SelectListItem() { Text = "IT", Value = "IT" });
            departments.Add(new SelectListItem() { Text = "Legal", Value = "Legal" });
            departments.Add(new SelectListItem() { Text = "Marketing", Value = "Marketing" });
            departments.Add(new SelectListItem() { Text = "Sales", Value = "Sales" });
            departments.Add(new SelectListItem() { Text = "Human Resources", Value = "Human Resources" });
            departments.Add(new SelectListItem() { Text = "Trust", Value = "Trust" });
            departments.Add(new SelectListItem() { Text = "Insurance", Value = "Insurance" });
            departments.Add(new SelectListItem() { Text = "Wealth Management", Value = "Wealth Management" });

            return departments;
        }

        //[AllowAnonymous]
        //public ActionResult Register()
        //{
        //    var registerViewModel = new RegisterViewModel();
        //    List<SelectListItem> titles = this.GetUserTitles().ToList<SelectListItem>();
        //    List<SelectListItem> departments = this.GetUserDepartments().ToList<SelectListItem>();
        //    registerViewModel.TitleSelectList = titles;
        //    registerViewModel.DepartmentSelectList = departments;
        //    return View(registerViewModel);
        //}

        public AccountController(AuthUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? System.Web.HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public AuthUserManager UserManager
        {
            get
            {
                return _userManager ?? System.Web.HttpContext.Current.GetOwinContext().GetUserManager<AuthUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            return RedirectToAction("Index", "Home");

            //ActionResult actionResult = null;
            ////var result =  HttpContext.GetOwinContext().Authentication.AuthenticateAsync("cookies");
            //var claimsIdentity = User.Identity as System.Security.Claims.ClaimsIdentity;
            //var claims = ((ClaimsPrincipal)User).Claims.ToList();

            //if (claimsIdentity != null)
            //{
            //    var userData = claimsIdentity.Claims.ToList();
            //    var email= userData.FirstOrDefault(m=>m.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value;

            //    //usually this can won't happen, as invaliduser/Inactiveuser/notVerified users are filter at STS system side
            //    if(string.IsNullOrEmpty(email))
            //    {
            //        ViewBag.ReturnUrl = returnUrl;
            //        HttpContext.GetOwinContext().Authentication.SignOut("oidc", "cookies");
            //        return View();
            //    }
            //    else
            //    {
            //        CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            //        var appUser = ent.AppUsers.FirstOrDefault(obj => obj.EMail == email);
            //        if (appUser != null && appUser.EmailConfirmed == true)
            //        {
            //            var ermAccessControl = ent.AppUserRoles.FirstOrDefault(obj => obj.UserKey == appUser.UserKey && obj.IsAccessible == true);
            //            Session["User"] = email;
            //            createCookie(email);
            //            validateUserForum(email);
            //            actionResult = RedirectToLocal(returnUrl);
            //            return actionResult;
            //        }
            //        else
            //        {
            //            //need to handle the new user functionality
            //        }
            //    }
            //}

            //ViewBag.ReturnUrl = returnUrl;
            //return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            return RedirectToAction("Index", "Home");
            //ActionResult actionResult = null;
            //try
            //{
            //    _lastLoginDate = DateTime.UtcNow;

            //    if (!ModelState.IsValid)
            //    {
            //        return View(model);
            //    }

            //    // This doesn't count login failures towards account lockout
            //    // To enable password failures to trigger account lockout, change to shouldLockout: true
            //    CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            //    var appUser = ent.AppUsers.FirstOrDefault(obj => obj.EMail == model.Email);
            //    if (appUser != null && appUser.EmailConfirmed == true)
            //    {
            //        var ermAccessControl = ent.AppUserRoles.FirstOrDefault(obj => obj.UserKey == appUser.UserKey && obj.IsAccessible == true);
            //        var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: true);
            //        switch (result)
            //        {
            //            case SignInStatus.Success:
            //                // Set the session here
            //                Session["User"] = model.Email;
            //                createCookie(model.Email);
            //                //TempData["ForumURL"] = "my url";
            //                if (ermAccessControl != null && ermAccessControl.IsAccessible)
            //                {
            //                    validateUserForum(model.Email);
            //                }

            //                actionResult = RedirectToLocal(returnUrl);
            //                break;
            //            case SignInStatus.LockedOut:
            //                actionResult = View("Lockout");
            //                break;
            //            case SignInStatus.RequiresVerification:
            //                actionResult = RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
            //                break;
            //            case SignInStatus.Failure:
            //                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            //                ModelState.AddModelError("", "Invalid login attempt.");
            //                actionResult = View(model);
            //                break;
            //            default:
            //                ModelState.AddModelError("", "Invalid login attempt.");
            //                actionResult = View(model);
            //                break;
            //        }
            //    }
            //    else
            //    {
            //        ModelState.AddModelError("", "Please confirm your account by clicking the link sent to your registered e-mail.");
            //        actionResult = View(model);
            //    }
            //}
            //catch (Exception ex)
            //{
            //    ExceptionHelper.TrackException(ex);
            //    ModelState.AddModelError("", "Something Went Wrong, please try again after some time");
            //    return View(model);
            //}

            //return actionResult;
        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            try
            {
                // Require that the user has already logged in via username/password or external login
                if (!await SignInManager.HasBeenVerifiedAsync())
                {
                    return View("Error");
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            ActionResult actionResult = null;
            try
            {
                if (!ModelState.IsValid)
                {
                    return View(model);
                }

                // The following code protects for brute force attacks against the two factor codes. 
                // If a user enters incorrect codes for a specified amount of time then the user account 
                // will be locked out for a specified amount of time. 
                // You can configure the account lockout settings in IdentityConfig
                var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberBrowser: model.RememberBrowser);
                switch (result)
                {
                    case SignInStatus.Success:
                        actionResult = RedirectToLocal(model.ReturnUrl);
                        break;
                    case SignInStatus.LockedOut:
                        actionResult = View("Lockout");
                        break;
                    case SignInStatus.Failure:
                    default:
                        ModelState.AddModelError("", "Invalid code.");
                        actionResult = View(model);
                        break;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return actionResult;
        }

        //
        // GET: /Account/Register
        //[AllowAnonymous]
        //public ActionResult Register()
        //{
        //    return View();
        //}

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            return RedirectToAction("Index", "Home");
            //ActionResult actionResult = null;
            //try
            //{
            //    if (ModelState.IsValid)
            //    {
            //        //string decodedInfo = CommonFunctions.Decrypt(model.TenantKey, true);
            //        string[] parts = model.TenantKey.Split(',');
            //        var user = new AuthUser
            //        {
            //            FirstName = model.FirstName,
            //            LastName = model.LastName,
            //            UserName = model.Email,
            //            Email = model.Email,
            //            PhoneNumber = model.PhoneNumner,
            //            Title = model.Title,
            //            Department = model.Department,
            //            TenantKey = Convert.ToInt64(parts[0]),
            //            LockoutEnabled = true,
            //        };

            //        var result = await UserManager.CreateAsync(user, model.Password);
            //        if (result.Succeeded)
            //        {
            //            // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
            //            // Send an email with this link
            //            UtilityFunctions.AddUserToRole(model.Email, Convert.ToInt32(parts[1]));
            //            UtilityFunctions.MakeTenantBankAsDefaultFavorite(model.Email);

            //            string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
            //            var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
            //            string emailBodyMarkup = EmailTemplates.accountConfirmationEmailTemplate;
            //            emailBodyMarkup = string.Format(emailBodyMarkup, model.FirstName, callbackUrl);
            //            await UserManager.SendEmailAsync(user.Id, "E-Mail Address and Registration Confirmation", emailBodyMarkup);
            //            string Script = "<script language='javascript' type='text/javascript'> alert('You have been registered. We have sent you an e-mail on your email-Id to confirm your e-mail account. Please click on the link in the e-mail to confirm. Post confirming your e-mail you will be able to login to the application.'); window.close(); </script>";
            //            return Content(Script);
            //        }

            //        AddErrors(result);
            //    }

            //    // If we got this far, something failed, redisplay form
            //    List<SelectListItem> titles = this.GetUserTitles().ToList<SelectListItem>();
            //    List<SelectListItem> departments = this.GetUserDepartments().ToList<SelectListItem>();
            //    model.TitleSelectList = titles;
            //    model.DepartmentSelectList = departments;
            //    actionResult = View(model);
            //}
            //catch (Exception ex)
            //{
            //    ExceptionHelper.TrackException(ex);
            //}

            //return actionResult;
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(long userId, string code)
        {
            return RedirectToAction("Index", "Home");
            //IdentityResult result = null;
            //try
            //{
            //    if (code == null)
            //    {
            //        return View("Error");
            //    }

            //    result = await UserManager.ConfirmEmailAsync(userId, code);
            //}
            //catch (Exception ex)
            //{
            //    ExceptionHelper.TrackException(ex);
            //}

            //return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return RedirectToAction("Index", "Home");
            //return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            return RedirectToAction("Index", "Home");

            //try
            //{
            //    if (ModelState.IsValid)
            //    {
            //        var user = await UserManager.FindByNameAsync(model.Email);
            //        //else if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
            //        if (user == null)
            //        {
            //            // Don't reveal that the user does not exist or is not confirmed
            //            return View("UserNotFound");
            //        }
            //        else if (!(await UserManager.IsEmailConfirmedAsync(user.Id)))
            //        {
            //            await GenerateEmailConfirmatinOnceAgainBecauseOfExpires(user);
            //            return View("ForgotPasswordConfirmation");
            //        }

            //        // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
            //        // Send an email with this link
            //        string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
            //        var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);

            //        var message = "Dear CB BankAnalytics user, <br /> <br /> This link is specific to your account, please do not share. For security purposes, " +
            //            "the link is set to expire in 24 hours.If the link expires, please use the <b> FORGOT PASSWORD </b> " +
            //            "link in CB BankAnalytics login page to reset your password. <br /> <br />" +
            //            "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here. </a>";

            //        // await UserManager.SendEmailAsync(user.Id, "CB BankAnalytics Reset Password Link", "Dear CB BankAnalytics user, <br /> <br /> This link is specific to your account. Please do not share. Please reset your password by clicking <a href=\"" + callbackUrl + "\">here. </a>");

            //        //await UserManager.SendEmailAsync(user.Id, "CB BankAnalytics Reset Password Link", "Dear CB BankAnalytics user, <br /> <br />" +
            //        //    "If you received an email to reset your password and were not able to reset it, or is getting an “Invalid Token” error, that is because the original link had a 2-hour expiration period for security purposes.<br /><br />" +
            //        //    "A new link has been issued to you and is set to time out in 24 hours.If you are not able to reset your password within the 24 hours, please contact us for a new link.<br /><br />" +
            //        //    " This link is specific to your account. Please do not share. Please reset your password by clicking <a href=\"" + callbackUrl + "\">here. </a>");

            //        await UserManager.SendEmailAsync(user.Id, "CB BankAnalytics Reset Password Link", message);


            //        CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            //        var loggedInUser = ent.AppUsers.FirstOrDefault(obj => obj.UserKey == user.Id);
            //        if (loggedInUser != null)
            //        {
            //            loggedInUser.IsEmailSent = true;
            //            ent.SaveChanges();
            //        }
            //        return View("ForgotPasswordConfirmation");
            //    }
            //}
            //catch (Exception ex)
            //{
            //    ExceptionHelper.TrackException(ex);
            //}

            //// If we got this far, something failed, redisplay form
            //return View(model);
        }

        //private async Task GenerateEmailConfirmatinOnceAgainBecauseOfExpires(AuthUser user)
        //{
        //    string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
        //    var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
        //    string emailBodyMarkup = EmailTemplates.accountConfirmationEmailTemplate;
        //    emailBodyMarkup = string.Format(emailBodyMarkup, user.FirstName, callbackUrl);
        //    await UserManager.SendEmailAsync(user.Id, "E-Mail Address and Registration Confirmation", emailBodyMarkup);
        //}

        private void createCookie(string userEmail)
        {
            // DateTime expire = DateTime.Now.AddMinutes(FormsAuthentication.Timeout.TotalMinutes);
            var cookie = new HttpCookie("ERMAccessEmail", userEmail);
            cookie.Domain = ".cb-resource.com";//This should be Domain not Sub Domain. even if there is setting in your Web.Config you need to specify this  
            Response.Cookies.Add(cookie);
        }

        #region Forum Authentication

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

        private string CreateUserForumUrl(string forumHomeURL, string authToken)
        {
            //return string.Format("<a href=\"https://ermforum.cb-resource.com/?authtoken={0}&remember=REMEMBER\">Forum</a>", authToken);
            return string.Format(forumHomeURL, authToken);
        }

        private void validateUserForum(string userName)
        {
            ForumConfig forumConfig = UtilityFunctions.GetForumConfig();

            if (forumConfig != null && forumConfig.ForumId > 0)
            {
                if (!string.IsNullOrEmpty(forumConfig.ForumAuthenticationURL) && !string.IsNullOrEmpty(forumConfig.ForumRegistrationURL) && !string.IsNullOrEmpty(forumConfig.ForumHomeURL))
                {
                    string forumUrl = string.Format(forumConfig.ForumAuthenticationURL, userName);
                    UserForumData response = AuthenticateUserForum(forumUrl);
                    if (string.IsNullOrEmpty(response.message))
                    {
                        string url = CreateUserForumUrl(forumConfig.ForumHomeURL, response.authtoken);
                        TempData["ForumURL"] = url;
                    }
                    else if (string.Compare(response.message, "Error: The specified user does not exist.", true) == 0)
                    {
                        forumUrl = string.Format(forumConfig.ForumRegistrationURL, userName, userName);
                        UserForumData response1 = AuthenticateUserForum(forumUrl);
                        if (string.IsNullOrEmpty(response1.message))
                        {
                            string url = CreateUserForumUrl(forumConfig.ForumHomeURL, response1.authtoken);
                            TempData["ForumURL"] = url;
                        }
                    }
                }
            }
        }

        #endregion
        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return RedirectToAction("Index", "Home");
            //return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return View(model);
                }
                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null)
                {
                    // Don't reveal that the user does not exist
                    return RedirectToAction("ResetPasswordConfirmation", "Account");
                }
                var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
                if (result.Succeeded)
                {
                    CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                    var loggedInUser = ent.AppUsers.FirstOrDefault(obj => obj.UserKey == user.Id);
                    if (loggedInUser != null)
                    {
                        loggedInUser.IsPasswordReset = true;
                        ent.SaveChanges();
                    }
                    return RedirectToAction("ResetPasswordConfirmation", "Account");
                }
                AddErrors(result);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new AuthUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }

                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult CustomError(string url)
        {
            return View("~/Views/Account/CustomError.cshtml");
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task LogOff(string url)
        {
            await LogOff();
        }

        [HttpPost]
        public async Task LogOff()
        {
            var owinContext = HttpContext.GetOwinContext();
            if (owinContext != null)
            {

                var identity = (ClaimsIdentity)User.Identity;

                if (identity?.IsAuthenticated == true)
                {
                    var userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                    IEnumerable<Claim> claims = identity.Claims;
                    var id_token = claims.FirstOrDefault(c => c.Type == "id_token")?.Value;

                    var authTypes = owinContext.Authentication.GetAuthenticationTypes().Select(x => x.AuthenticationType).ToArray();
                    owinContext.Authentication.SignOut(authTypes);
                    owinContext.Authentication.SignOut(OpenIdConnectAuthenticationDefaults.AuthenticationType);
                    owinContext.Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
                    owinContext.Authentication.SignOut();

                    var ent = new CBRDataWareHouseEntities();
                    var loggedInUser = ent.AppUsers.FirstOrDefault(obj => obj.UserKey == userKey);
                    if (loggedInUser != null)
                    {
                        loggedInUser.LastLoginDate = _lastLoginDate;
                        ent.SaveChanges();
                    }

                    Session.Clear();
                    Session.Abandon();

                    // if we have a valid id_token, end the session with the identity server directly!
                    if (!string.IsNullOrWhiteSpace(id_token))
                    {
                        var authUrl = ConfigurationManager.AppSettings["SSOAuthority"]; 
                        var postRedirectUrl = ConfigurationManager.AppSettings["SSORedirect"]; 
                        var endSessionUri = ($"{authUrl}/connect/endsession?id_token_hint={id_token}&post_logout_redirect_uri={HttpUtility.UrlEncode(postRedirectUrl)}");
                        HttpContext.Response.Redirect(endSessionUri, true);
                    }
                }

            }

            // if we don't have
            HttpContext.Response.Redirect($"/", true);
        }

        //
        // POST: /Account/LogOff
        [AllowAnonymous]
        public ActionResult EndSession()
        {
            // Clear the session
            Session.Clear();
            Session.Abandon();

            // Sign out the user from the authentication manager
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

            // Clear authentication cookie
            if (Response.Cookies[FormsAuthentication.FormsCookieName] != null)
            {
                Response.Cookies[FormsAuthentication.FormsCookieName].Expires = DateTime.Now.AddYears(-1);
            }
            return null;
        }
        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        public async Task<ActionResult> LoginRedirect()
        {
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> LoginRedirect(string returnurl)
        {
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> PostLogout()
        {
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> PostLogout(string returnurl)
        {
            return RedirectToAction("Index", "Home");
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }

        #endregion

        #region Encrypting the Cookie
        private void setMachineKey()
        {
            try
            {
                // Set the path of the config file.
                string configPath = "";

                // Get the Web application configuration object.
                Configuration config = WebConfigurationManager.OpenWebConfiguration(configPath);

                // Get the section related object.
                MachineKeySection configSection =
                  (MachineKeySection)config.GetSection("system.web/machineKey");



                // Set ValidationKey property.
                configSection.ValidationKey = "E4451576F51E0562D91A1748DF7AB3027FEF3C2CCAC46D756C833E1AF20C7BAEFFACF97C7081ADA4648918E0B56BF27D1699A6EB2D9B6967A562CAD14767F163";

                // Set DecryptionKey property.
                configSection.DecryptionKey = "6159C46C9E288028ED26F5A65CED7317A83CB3485DE8C592";

                // Set Validation property.
                configSection.Validation = MachineKeyValidation.HMACSHA256;
                configSection.Decryption = "AES";

                // Update if not locked.
                if (!configSection.SectionInformation.IsLocked)
                {
                    config.Save();
                    Console.WriteLine("** Configuration updated.");
                }
                else
                {
                    Console.WriteLine("** Could not update, section is locked.");
                }
            }

            catch (Exception e)
            {
                // Unknown error.
                Console.WriteLine(e.ToString());
            }
        }

        private void createCookieWithEncryption(string userEmail)
        {
            DateTime expire = DateTime.Now.AddMinutes(FormsAuthentication.Timeout.TotalMinutes);
            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, "ERMAccessEmail", DateTime.Now, expire, false, userEmail);

            string hashTicket = FormsAuthentication.Encrypt(ticket);

            var cookie = new HttpCookie("ERMAccessEmail", hashTicket);
            cookie.Domain = ".cb-resource.com";//This should be Domain not Sub Domain. even if there is setting in your Web.Config you need to specify this  
            Response.Cookies.Add(cookie);
        }
        private void ReadCookie()
        {
            HttpCookie authCookie = Request.Cookies["ERMAccessEmail"];
            if (authCookie != null)
            {
                if (authCookie == null)
                {
                    //return null;
                }
                var cookieValue = authCookie.Value;

                if (string.IsNullOrWhiteSpace(cookieValue)) //return null;

                    setMachineKey();

                var authTicket = FormsAuthentication.Decrypt(cookieValue);
            }
            #endregion
        }

        internal class UserForumData
        {
            public string userid { get; set; }
            public string authtoken { get; set; }
            public string message { get; set; }

        }
    }
}
