using CBR.Common;
using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CBR.DataAccess;
using CBR.Web.WebCommons;
using CBR.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Threading.Tasks;
using System.Web.Security;
using System.Configuration;
using CBR.Web.CustomFilter;

namespace CBR.Web.Controllers.Api
{
    [AuthorizeRole(Roles = "Administrator, System Administrator")]
    public class AdminApiController : ApiController
    {
        [HttpGet]
        public TenantProfile GetTenantProfile()
        {
            TenantProfile retVal = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter accountKey = new SqlParameter("TenantKey", SqlDbType.Int);
                accountKey.Value = tenantKey;
                retVal = ent.Database.SqlQuery<TenantProfile>("dbo.uspRptGetAccountProfileDetails @TenantKey", accountKey).FirstOrDefault<TenantProfile>();
                retVal.TenantKey = Convert.ToInt64(tenantKey);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        [HttpGet]
        public AccountDetails GetAccountDetails()
        {
            AccountDetails actDetails = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name);
                var result = ent.AppTenants.FirstOrDefault(obj => obj.TenantKey == tenantKey);
                if (result != null)
                {
                    actDetails = new AccountDetails();
                    actDetails.MemberSince = result.InsertedDateTime;
                    actDetails.TenantDomain = result.TenantDomain;
                    actDetails.TenantName = result.TenantName;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return actDetails;
        }

        [HttpPost]
        public List<TenantUser> GetUsersForTenant(GetTenantUserParams getUsersParams)
        {
            List<TenantUser> tenantUsers = null;
            List<AppRole> existingRoles = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name);
                var result = ent.AppUsers.Where(obj => obj.TenantKey == tenantKey).ToList();
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

        [HttpPost]
        public string DeleteUser(TenantUser userToDelete)
        {
            string message = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.Database.ExecuteSqlCommand("update AppUser set IsDeleted = 1 where UserKey = " + userToDelete.UserKey.ToString());
                message = "The user has been successfully deleted.";
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
                message = "An error occurred while trying to delete the user. Please send an e-mail to admin@cb-resource.com.";
            }

            return message;
        }

        [HttpPost]
        public async Task<bool> InviteUser(InviteeDetails inviteeDetails)
        {
            bool retVal = false;
            string message = string.Empty;
            string emailBodyMarkup = EmailTemplates.userInvitationEmailTemplate;
            try
            {
                string isUserDuplicate = this.IsUserDuplicate(inviteeDetails, true);
                if (string.Compare(isUserDuplicate, "Available.") == 0)
                {
                    string url = Request.RequestUri.AbsoluteUri.Substring(0, Request.RequestUri.AbsoluteUri.IndexOf("api"));
                    long tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name);
                    var roleId = 0;
                    CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                    var loggedInUserTenant = ent.AppTenants.FirstOrDefault(obj => obj.TenantKey == tenantKey);
                    if (loggedInUserTenant != null)
                    {
                        string encodedInfo = "{0}";
                        if (string.Compare(loggedInUserTenant.TenantType, "Non-Bank") == 0)
                        {
                            encodedInfo = encodedInfo + ",5";
                            roleId = 5;
                        }
                        else
                        {
                            encodedInfo = encodedInfo + ",4";
                            roleId = 4;
                        }

                        encodedInfo = string.Format(encodedInfo, tenantKey.ToString());
                        //encodedInfo = CommonFunctions.Encrypt(encodedInfo, true);

                        string urlTemplate = ConfigurationManager.AppSettings["SSORegisterUrl"];
                        string imageUrl = ConfigurationManager.AppSettings["SSORedirect"];

                        urlTemplate = urlTemplate + "&TenantKey=" + encodedInfo;

                        emailBodyMarkup = string.Format(emailBodyMarkup, CommonFunctions.DecryptFromBase64(inviteeDetails.FirstName)
                                                , urlTemplate, CommonFunctions.DecryptFromBase64(inviteeDetails.Message), imageUrl);

                        UtilityFunctions.AddUserToRegistartion(CommonFunctions.DecryptFromBase64(inviteeDetails.EmailAddress), CommonFunctions.DecryptFromBase64(inviteeDetails.FirstName), CommonFunctions.DecryptFromBase64(inviteeDetails.LastName), CommonFunctions.DecryptFromBase64(inviteeDetails.Title), tenantKey, roleId);

                        await CommonFunctions.SendMail(CommonFunctions.DecryptFromBase64(inviteeDetails.FirstName), emailBodyMarkup
                                , CommonFunctions.DecryptFromBase64(inviteeDetails.EmailAddress), "User Account Registration to Stifel Bank Analytics", "castellonf@stifel.com,salgatj@stifel.com");
                        retVal = true;
                    }
                }
                else
                    retVal = false;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
                retVal = false;
            }

            return retVal;
        }

        [HttpPost]
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
        public bool EditUser(EditUserDetails userDetailsToEdit)
        {
            bool retVal = false;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var oldUserDetails = this.GetUserDetailsToEdit(new TenantUser() { UserKey = userDetailsToEdit.UserKey });
                var result = ent.Database.ExecuteSqlCommand("update AppUser set FirstName = {0}, LastName = {1}, EMail = {2}, PhoneNumber = {3}, Title = {4}, Department = {5}, Login = {6} where UserKey = {7}", userDetailsToEdit.FirstName, userDetailsToEdit.LastName, userDetailsToEdit.Email, userDetailsToEdit.PhoneNumber, userDetailsToEdit.Title, userDetailsToEdit.Department, userDetailsToEdit.Email, userDetailsToEdit.UserKey.ToString());
                if (result > 0)
                    retVal = true;

                if (string.Compare(oldUserDetails.Email, userDetailsToEdit.Email) != 0)
                {
                    result = ent.Database.ExecuteSqlCommand("update AppUser set EmailConfirmed = 0 where UserKey = {0}", userDetailsToEdit.UserKey.ToString());
                    AuthUserManager userManager = HttpContext.Current.GetOwinContext().GetUserManager<AuthUserManager>();
                    IAuthenticationManager authManager = HttpContext.Current.GetOwinContext().Authentication;
                    string code = userManager.GenerateEmailConfirmationToken(userDetailsToEdit.UserKey);
                    System.Web.Mvc.UrlHelper urlHelper = new System.Web.Mvc.UrlHelper();
                    string url = Request.RequestUri.AbsoluteUri.Substring(0, Request.RequestUri.AbsoluteUri.IndexOf("api"));
                    url = url + "Account/ConfirmEmail?userId=" + userDetailsToEdit.UserKey.ToString() + "&code=" + code;
                    userManager.SendEmail(userDetailsToEdit.UserKey, "Confirm your account", "Please confirm your account by clicking <a href=\"" + url + "\">here</a>");
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
        public string IsUserDuplicate(InviteeDetails inviteeDetails, bool canShowActualErrorMessage = false)
        {
            string duplicateUserMessage = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var decryptedEmail = CommonFunctions.DecryptFromBase64(inviteeDetails.EmailAddress);
                var result = ent.AppUsers.FirstOrDefault(obj => obj.EMail == decryptedEmail);
                if (result != null)
                {
                    if (canShowActualErrorMessage)
                    {
                        duplicateUserMessage = "An user already exists with this e-mail ID. Please use a different e-mail ID.";
                    }
                    else
                    {
                        var userExistsCodes = ConfigurationManager.AppSettings["IsUserFoundCodes"];
                        var splitedCodes = userExistsCodes.Split(',');
                        duplicateUserMessage = CommonFunctions.GetRandomNumberOfGivenArray(splitedCodes);
                    }
                }
                else
                {
                    if (canShowActualErrorMessage == true)
                    {
                        duplicateUserMessage = "Available.";
                    }
                    else
                    {
                        var userNotExistsCodes = ConfigurationManager.AppSettings["IsUserNotFoundCodes"];
                        var splitedCodes = userNotExistsCodes.Split(',');
                        duplicateUserMessage = CommonFunctions.GetRandomNumberOfGivenArray(splitedCodes);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
                duplicateUserMessage = "An error occurred while trying to find if the user is duplicate. Please send an e-mail to admin@cb-resource.com.";
            }
            return duplicateUserMessage;
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
    }
}
