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
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CBR.Web.Controllers.Api
{
    public class SuperAccountAdminApiController : ApiController
    {
        [HttpGet]
        public string GetTenantName(string tenantKey)
        {
            string retVal = string.Empty;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long numericTenantKey = -1;
                bool parseSuccess = long.TryParse(tenantKey, out numericTenantKey);
                if (parseSuccess)
                {
                    AppTenant tenant = ent.AppTenants.Where(obj => obj.TenantKey == numericTenantKey).FirstOrDefault();
                    if (tenant != null)
                    {
                        retVal = tenant.TenantName;
                    }
                }
                else
                {
                    retVal = "Invalid Tenant Key";
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        [HttpGet]
        public TenantProfile GetTenantProfile(string tenantKey)
        {
            TenantProfile retVal = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long numericTenantKey = -1;
                bool parseSuccess = long.TryParse(tenantKey, out numericTenantKey);
                if (parseSuccess)
                {
                    SqlParameter accountKey = new SqlParameter("TenantKey", SqlDbType.Int);
                    accountKey.Value = numericTenantKey;
                    retVal = ent.Database.SqlQuery<TenantProfile>("dbo.uspRptGetAccountProfileDetails @TenantKey", accountKey).FirstOrDefault<TenantProfile>();
                    retVal.TenantKey = Convert.ToInt64(tenantKey);
                }
                else
                {
                    retVal = null;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        public bool UpdateAccountProfile(TenantProfile tenantProfile)
        {
            bool result = false;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter accountKey = new SqlParameter("TenantKey", SqlDbType.Int);
                accountKey.Value = tenantProfile.TenantKey;

                SqlParameter accountName = new SqlParameter("AccountName", SqlDbType.VarChar);
                accountName.Value = tenantProfile.AccountName;

                SqlParameter bhcName = new SqlParameter("BHCName", SqlDbType.VarChar);
                bhcName.Value = tenantProfile.BHCName;

                SqlParameter stockTicker = new SqlParameter("StockTicker", SqlDbType.VarChar);
                stockTicker.Value = tenantProfile.StockTicker;

                int retVal = ent.Database.SqlQuery<int>("dbo.uspRptEditAccountProfileDetails @TenantKey, @AccountName, @BHCName, @StockTicker", accountKey, accountName, bhcName, stockTicker).FirstOrDefault<int>();

                if (retVal > 0)
                {
                    result = true;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpGet]
        public List<AccountAccess> GetAccountsModuleAccessState(long tenantKey)
        {
            List<AccountAccess> accountAccesses = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter accountKey = new SqlParameter("TenantKey", SqlDbType.Int);
                accountKey.Value = tenantKey;

                SqlParameter moduleType = new SqlParameter("ModuleType", SqlDbType.VarChar);
                moduleType.Value = "Solutions";

                SqlParameter moduleName = new SqlParameter("ModuleName", SqlDbType.VarChar);
                moduleName.Value = "";

                SqlParameter isAccessible = new SqlParameter("IsAccessible", SqlDbType.Bit);
                isAccessible.Value = DBNull.Value;

                SqlParameter queryType = new SqlParameter("QueryType", SqlDbType.VarChar);
                queryType.Value = "Get";

                accountAccesses = ent.Database.SqlQuery<AccountAccess>("dbo.uspRptGetorUpdateTenantModuleAccess_test @TenantKey, @ModuleType, @ModuleName, @IsAccessible, @QueryType", accountKey, moduleType, moduleName, isAccessible, queryType).ToList<AccountAccess>();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return accountAccesses;
        }

        [HttpGet]
        public bool UpdateAccountsModuleAccessState(long tenantKey, string moduleName, bool? isAccessible)
        {
            bool retVal = false;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter accountKey = new SqlParameter("TenantKey", SqlDbType.Int);
                accountKey.Value = tenantKey;

                SqlParameter moduleType = new SqlParameter("ModuleType", SqlDbType.VarChar);
                moduleType.Value = "Solutions";

                SqlParameter moduleNameParam = new SqlParameter("ModuleName", SqlDbType.VarChar);
                moduleNameParam.Value = moduleName;

                SqlParameter isAccessibleParam = new SqlParameter("IsAccessible", SqlDbType.Bit);
                isAccessibleParam.Value = isAccessible.Value;

                SqlParameter queryType = new SqlParameter("QueryType", SqlDbType.VarChar);
                queryType.Value = "Update";

                var result = ent.Database.SqlQuery<int>("dbo.uspRptGetorUpdateTenantModuleAccess_test @TenantKey, @ModuleType, @ModuleName, @IsAccessible, @QueryType", accountKey, moduleType, moduleNameParam, isAccessibleParam, queryType).FirstOrDefault<int>();
                if (result > 0)
                {
                    if (moduleName.ToLower() == "erm solution")
                    {
                        UtilityFunctions.AddUserToERMAccessTable(tenantKey, isAccessible);
                    }
                    retVal = true;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        [HttpPost]
        public List<TenantUser> GetUsersForTenant(GetTenantUserParams getUsersParams)
        {
            List<TenantUser> tenantUsers = null;
            List<AppRole> existingRoles = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.AppUsers.Where(obj => obj.TenantKey == getUsersParams.TenantKey).ToList();
                existingRoles = ent.AppRoles.ToList();
                if (result != null && result.Count > 0)
                {
                    int pageSizeToReturn = -1;
                    int totalCount = result.Count;
                    tenantUsers = new List<TenantUser>();

                    if (getUsersParams.PageSize == -1)
                        pageSizeToReturn = result.Count;
                    else
                        pageSizeToReturn = getUsersParams.PageSize;

                    if (result.Count > pageSizeToReturn)
                        result = result.Skip(pageSizeToReturn * (getUsersParams.PageNumber - 1)).Take(pageSizeToReturn).ToList<AppUser>();

                    foreach (AppUser resultData in result)
                    {
                        TenantUser user = new TenantUser();
                        user.Title = resultData.Title;
                        user.UserKey = resultData.UserKey;
                        user.Email = resultData.EMail;
                        user.FirstName = resultData.FirstName;
                        user.LastName = resultData.LastName;
                        user.Status = resultData.IsActive ? "Active" : "Inactive";
                        user.TotalUsers = totalCount;
                        user.UserRoles = this.GetUserRoles(resultData.UserKey, existingRoles);
                        tenantUsers.Add(user);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return tenantUsers;
        }

        private string GetUserRoles(long userKey, List<AppRole> appRoles)
        {
            string roles = string.Empty;
            try
            {
                List<UserRoleProfile> userRoleProfiles = this.GetUserRoleProfile(Convert.ToInt32(userKey));
                foreach (UserRoleProfile userRoleProfile in userRoleProfiles)
                {
                    if (userRoleProfile.IsAccessible == true)
                    {
                        if (string.IsNullOrEmpty(roles))
                            roles += userRoleProfile.RoleName;
                        else
                            roles += "," + userRoleProfile.RoleName;
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return roles;
        }

        [HttpPost]
        public async Task<bool> InviteUser(InviteeDetails inviteeDetails)
        {
            bool retVal = false;
            string emailBodyMarkup = EmailTemplates.userInvitationEmailTemplate;
            try
            {
                //string url = Request.RequestUri.AbsoluteUri.Substring(0, Request.RequestUri.AbsoluteUri.IndexOf("api"));
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var decriptedTenantKey = long.Parse(CommonFunctions.DecryptFromBase64(inviteeDetails.TenantKey));
                var currentTenant = ent.AppTenants.FirstOrDefault(obj => obj.TenantKey == decriptedTenantKey);
                var roleId = 0;
                if (currentTenant != null)
                {
                    string encodedInfo = "{0}";
                    if (string.Compare(currentTenant.TenantType, "Non-Bank") == 0)
                    {
                        encodedInfo = encodedInfo + ",5";
                        roleId = 5;
                    }
                    else
                    {
                        encodedInfo = encodedInfo + ",4";
                        roleId = 4;
                    }

                    encodedInfo = string.Format(encodedInfo, decriptedTenantKey);
                    //encodedInfo = CommonFunctions.Encrypt(encodedInfo, true);

                    string urlTemplate = ConfigurationManager.AppSettings["SSORegisterUrl"];
                    string imageUrl = ConfigurationManager.AppSettings["SSORedirect"];

                    urlTemplate = urlTemplate + "&TenantKey=" + encodedInfo;

                    emailBodyMarkup = string.Format(emailBodyMarkup, CommonFunctions.DecryptFromBase64(inviteeDetails.FirstName)
                                                , urlTemplate, CommonFunctions.DecryptFromBase64(inviteeDetails.Message), imageUrl);

                    UtilityFunctions.AddUserToRegistartion(CommonFunctions.DecryptFromBase64(inviteeDetails.EmailAddress), CommonFunctions.DecryptFromBase64(inviteeDetails.FirstName), CommonFunctions.DecryptFromBase64(inviteeDetails.LastName), CommonFunctions.DecryptFromBase64(inviteeDetails.Title), decriptedTenantKey, roleId);

                    await CommonFunctions.SendMail(CommonFunctions.DecryptFromBase64(inviteeDetails.FirstName), emailBodyMarkup
                                    , CommonFunctions.DecryptFromBase64(inviteeDetails.EmailAddress), "User Account Registration to Stifel Bank Analytics", "castellonf@stifel.com,salgatj@stifel.com");
                    retVal = true;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        [HttpGet]
        public List<UserRoleProfile> GetUserRoleProfile(int userKey)
        {
            List<UserRoleProfile> userRoles = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter userKeyParam = new SqlParameter("UserKey", SqlDbType.Int);
                userKeyParam.Value = userKey;
                userRoles = ent.Database.SqlQuery<UserRoleProfile>("dbo.uspRptAppGetUserProfile @UserKey", userKeyParam).ToList<UserRoleProfile>();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return userRoles;
        }

        [HttpPost]
        public string IsUserDuplicate(InviteeDetails inviteeDetails)
        {
            string duplicateUserMessage = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var decryptedEmail = CommonFunctions.DecryptFromBase64(inviteeDetails.EmailAddress);
                var result = ent.AppUsers.FirstOrDefault(obj => obj.EMail == decryptedEmail);
                if (result != null)
                {
                    var userExistsCodes = ConfigurationManager.AppSettings["IsUserFoundCodes"];
                    var splitedCodes = userExistsCodes.Split(',');
                    duplicateUserMessage = CommonFunctions.GetRandomNumberOfGivenArray(splitedCodes);
                }
                else
                {
                    var userNotExistsCodes = ConfigurationManager.AppSettings["IsUserNotFoundCodes"];
                    var splitedCodes = userNotExistsCodes.Split(',');
                    duplicateUserMessage = CommonFunctions.GetRandomNumberOfGivenArray(splitedCodes);
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
                duplicateUserMessage = "An error occurred while trying to find if the user is duplicate. Please send an e-mail to admin@cb-resource.com.";
            }

            return duplicateUserMessage;
        }

        [HttpPost]
        public bool UpdateUser(UserProfile userProfile)
        {
            bool retVal = false;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var oldUserDetails = this.GetUserDetailsToEdit(new TenantUser() { UserKey = userProfile.UserKey });

                SqlParameter userKey = new SqlParameter("UserKey", SqlDbType.Int);
                userKey.Value = userProfile.UserKey;

                SqlParameter firstName = new SqlParameter("FirstName", SqlDbType.NVarChar);
                firstName.Value = userProfile.FirstName;

                SqlParameter lastName = new SqlParameter("LastName", SqlDbType.NVarChar);
                lastName.Value = userProfile.LastName;

                SqlParameter email = new SqlParameter("Email", SqlDbType.NVarChar);
                email.Value = userProfile.Email;

                SqlParameter title = new SqlParameter("Title", SqlDbType.NVarChar);
                title.Value = userProfile.Title;

                DataTable profileParameters = new DataTable();
                profileParameters.Columns.Add("RoleName", typeof(string));
                profileParameters.Columns.Add("IsAccessible", typeof(bool));
                bool isERMAccess = false;
                foreach (UserRoleProfile userRoleProfile in userProfile.UserRoles)
                {
                    profileParameters.Rows.Add(userRoleProfile.RoleName, userRoleProfile.IsAccessible);
                    if (userRoleProfile.IsAccessible && (userRoleProfile.RoleName.ToLower() == "project manager" || userRoleProfile.RoleName.ToLower() == "administrator"))
                    {
                        isERMAccess = true;
                    }
                }

                SqlParameter profile = new SqlParameter("ProfileType", SqlDbType.Structured);
                profile.Value = profileParameters;
                profile.TypeName = "dbo.AppUserProfileType";

                var result = ent.Database.SqlQuery<int>("dbo.uspRptAppEditUserProfile @UserKey, @FirstName, @LastName, @Title, @Email, @ProfileType", userKey, firstName, lastName, email, title, profile).FirstOrDefault<int>();
                if (result > 0)
                    retVal = true;

                //Updating entry in ERMAccessControl table
                UtilityFunctions.AddUserToERMAccessTable(UtilityFunctions.GetTenantKey(userProfile.Email), isERMAccess);

                if (string.Compare(oldUserDetails.Email, userProfile.Email) != 0 && result > 0)
                {
                    AuthUserManager userManager = HttpContext.Current.GetOwinContext().GetUserManager<AuthUserManager>();
                    IAuthenticationManager authManager = HttpContext.Current.GetOwinContext().Authentication;
                    string code = userManager.GenerateEmailConfirmationToken(Convert.ToInt64(userProfile.UserKey));
                    System.Web.Mvc.UrlHelper urlHelper = new System.Web.Mvc.UrlHelper();
                    string url = Request.RequestUri.AbsoluteUri.Substring(0, Request.RequestUri.AbsoluteUri.IndexOf("api"));
                    url = url + "Account/ConfirmEmail?userId=" + userProfile.UserKey.ToString() + "&code=" + HttpUtility.UrlEncode(code);
                    userManager.SendEmail(userProfile.UserKey, "Confirm your account", "Please confirm your account by clicking <a href=\"" + url + "\">here</a>");
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        public EditUserDetails GetUserDetailsToEdit(TenantUser userToEdit)
        {
            EditUserDetails editDetails = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var user = ent.AppUsers.FirstOrDefault(obj => obj.UserKey == userToEdit.UserKey);
                if (user != null)
                {
                    editDetails = new EditUserDetails();
                    editDetails.Department = user.Department;
                    editDetails.Email = user.EMail;
                    editDetails.FirstName = user.FirstName;
                    editDetails.LastName = user.LastName;
                    editDetails.PhoneNumber = user.PhoneNumber;
                    editDetails.Title = user.Title;
                    editDetails.UserKey = user.UserKey;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return editDetails;
        }

        [HttpPost]
        public bool DeleteUser(UserActivateDeactivateParameters userActivateDeactivateParameters)
        {
            bool retVal = false;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter userKey = new SqlParameter("UserKey", SqlDbType.Int);
                userKey.Value = userActivateDeactivateParameters.UserKey;

                SqlParameter tenantKey = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKey.Value = DBNull.Value;

                SqlParameter isDelete = new SqlParameter("IsDelete", SqlDbType.Bit);
                isDelete.Value = 1;

                var result = ent.Database.SqlQuery<int>("dbo.uspRptAppUserDelete @TenantKey, @UserKey, @IsDelete", tenantKey, userKey, isDelete).FirstOrDefault<int>();
                if (result > 0)
                    retVal = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        [HttpPost]
        public bool ReactivateUser(UserActivateDeactivateParameters userActivateDeactivateParameters)
        {
            bool retVal = false;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter userKey = new SqlParameter("UserKey", SqlDbType.Int);
                userKey.Value = userActivateDeactivateParameters.UserKey;

                SqlParameter tenantKey = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKey.Value = DBNull.Value;

                SqlParameter isDelete = new SqlParameter("IsDelete", SqlDbType.Bit);
                isDelete.Value = 0;

                var result = ent.Database.SqlQuery<int>("dbo.uspRptAppUserDelete @TenantKey, @UserKey, @IsDelete", tenantKey, userKey, isDelete).FirstOrDefault<int>();
                if (result > 0)
                {
                    retVal = true;
                    AuthUserManager userManager = HttpContext.Current.GetOwinContext().GetUserManager<AuthUserManager>();
                    System.Web.Mvc.UrlHelper urlHelper = new System.Web.Mvc.UrlHelper();
                    string url = Request.RequestUri.AbsoluteUri.Substring(0, Request.RequestUri.AbsoluteUri.IndexOf("api"));
                    url = url + "Account/ForgotPassword";
                    string emailBodyMarkup = EmailTemplates.passwordResetEmailTemplate;
                    emailBodyMarkup = string.Format(emailBodyMarkup, userActivateDeactivateParameters.UserName, url, userActivateDeactivateParameters.EMail);
                    userManager.SendEmail(Convert.ToInt64(userActivateDeactivateParameters.UserKey), "Reset your password", emailBodyMarkup);
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }
    }
}
