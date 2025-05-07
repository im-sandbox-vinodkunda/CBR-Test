namespace CBR.Web.WebCommons
{
    using CBR.DataAccess;
    using System;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using CBR.Common;
    using Models;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Data;
    using Microsoft.Azure;
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Blob;
    using System.IO;
    using System.Configuration;
    using System.Reflection;
    using System.Globalization;
    using CBR.Identity;
    using DocumentFormat.OpenXml.EMMA;
    using Microsoft.AspNet.Identity;
    using Microsoft.Ajax.Utilities;

    public static class UtilityFunctions
    {
        public static string RenderProjectLink(string projectName, string userName)
        {
            string projectLink = string.Empty;
            if (UtilityFunctions.IsProjectAccessibleToUser(projectName, userName))
            {
                if (projectName.Contains("Capital"))
                    projectLink = string.Format("/Project/Projects?viewName={0}&tag=default", "Capital");
                else if (projectName.Contains("Strategic"))
                    projectLink = string.Format("/Project/Projects?viewName={0}&tag=default", "Strategy");
                else if (projectName.Contains("ERM"))
                    projectLink = string.Format("/Project/Projects?viewName={0}&tag=default", "ERM");
                else
                    projectLink = "/Cd";
            }
            else
            {
                projectLink = "javascript:void(0)";
            }

            return projectLink;
        }

        public static bool IsProjectAccessibleToUser(string projectName, string userName)
        {
            bool isProjectAccessible = false;
            List<UserRoleProfile> userRoles = null;
            List<AccountAccess> accountAccesses = null;
            bool isUserProjectManager = false;
            bool isUserAdministrator = false;
            bool isUserSystemAdministrator = false;
            bool isUserStandardUser = false;
            bool isUserNonBankStandardUser = false;
            bool isUserNonBankAdministrator = false;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var userKey = UtilityFunctions.GetUserKey(userName);
                var tenantKey = UtilityFunctions.GetTenantKey(userName);

                SqlParameter userKeyParam = new SqlParameter("UserKey", SqlDbType.Int);
                userKeyParam.Value = Convert.ToInt32(userKey);
                userRoles = ent.Database.SqlQuery<UserRoleProfile>("dbo.uspRptAppGetUserProfile @UserKey", userKeyParam).ToList<UserRoleProfile>();
                var usersRole = userRoles.Where(obj => obj.IsAccessible == true).FirstOrDefault();

                SqlParameter accountKey = new SqlParameter("TenantKey", SqlDbType.Int);
                accountKey.Value = Convert.ToInt32(tenantKey);

                SqlParameter moduleType = new SqlParameter("ModuleType", SqlDbType.VarChar);
                moduleType.Value = "Solutions";

                SqlParameter moduleName = new SqlParameter("ModuleName", SqlDbType.VarChar);
                moduleName.Value = "";

                SqlParameter isAccessible = new SqlParameter("IsAccessible", SqlDbType.Bit);
                isAccessible.Value = DBNull.Value;

                SqlParameter queryType = new SqlParameter("QueryType", SqlDbType.VarChar);
                queryType.Value = "Get";

                accountAccesses = ent.Database.SqlQuery<AccountAccess>("dbo.uspRptGetorUpdateTenantModuleAccess_test @TenantKey, @ModuleType, @ModuleName, @IsAccessible, @QueryType", accountKey, moduleType, moduleName, isAccessible, queryType).ToList<AccountAccess>();

                if (usersRole != null && usersRole.RoleValue == 1)
                {
                    if (UtilityFunctions.GetTenantType(userName) == "Bank")
                        isUserStandardUser = true;
                    else
                        isUserNonBankStandardUser = true;
                }
                else if (usersRole != null && usersRole.RoleValue == 2)
                {
                    isUserProjectManager = true;
                }
                else if (usersRole != null && usersRole.RoleValue == 3)
                {
                    if (UtilityFunctions.GetTenantType(userName) == "Bank")
                        isUserAdministrator = true;
                    else
                        isUserNonBankAdministrator = true;
                }
                else
                {
                    isProjectAccessible = true;
                    isUserSystemAdministrator = true;
                }

                if (isProjectAccessible == false)
                {
                    var concernedModule = accountAccesses.Where(obj => obj.ModuleName == projectName).FirstOrDefault();
                    if (isUserProjectManager && concernedModule.IsAccessible == true)
                    {
                        isProjectAccessible = true;
                    }

                    if (isUserAdministrator && concernedModule.IsAccessible == true)
                    {
                        isProjectAccessible = true;
                    }

                    if (isUserStandardUser)
                    {
                        if (concernedModule.ModuleName == "Issue A CD" && concernedModule.IsAccessible == true)
                            isProjectAccessible = true;
                    }
                }
            }          
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return isProjectAccessible;
        }

        public static string AllowAccessOrShowErrorMessage(string projectName, string userName)
        {
            string messageLink = string.Empty;
            List<UserRoleProfile> userRoles = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var userKey = UtilityFunctions.GetUserKey(userName);
                SqlParameter userKeyParam = new SqlParameter("UserKey", SqlDbType.Int);
                userKeyParam.Value = userKey;
                userRoles = ent.Database.SqlQuery<UserRoleProfile>("dbo.uspRptAppGetUserProfile @UserKey", userKeyParam).ToList<UserRoleProfile>();
                var usersRole = userRoles.Where(obj => obj.IsAccessible == true).FirstOrDefault();

                if (UtilityFunctions.IsProjectAccessibleToUser(projectName, userName) == false)
                {
                    if (usersRole.RoleValue == 2 || usersRole.RoleValue == 3)
                    {
                        if (projectName == "Capital Plan")
                            messageLink = "#solutionNotAccessibleAdminCapitalPlan";
                        else if (projectName == "Strategic Plan")
                            messageLink = "#solutionNotAccessibleAdminStrategicPlan";
                        else if (projectName == "ERM Solution")
                            messageLink = "#solutionNotAccessibleAdminErmSolution";
                        else
                            messageLink = "#solutionNotAccessibleSu";
                    }
                    else
                        messageLink = "#solutionNotAccessibleSu";
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return messageLink;
        }

        public static string LockUnLock(string projectName, string userName)
        {
            if (UtilityFunctions.IsProjectAccessibleToUser(projectName, userName) == false)
            {
                return "glyphicon glyphicon-lock pull-right";
            }
            else
            {
                return "";
            }
        }

        private static string GetTenantType(string userName)
        {
            string tenantType = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var userKey = UtilityFunctions.GetUserKey(userName);
                var tenantKey = UtilityFunctions.GetTenantKey(userName);
                var tenantObj = ent.AppTenants.Where(obj => obj.TenantKey == tenantKey).FirstOrDefault();
                if (tenantObj != null)
                {
                    tenantType = tenantObj.TenantType;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return tenantType;
        }

        public static int GetInstitutionKeyFromFDICNumber(int fdicNumber)
        {
            int institutionKey = int.MinValue;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                DimInstitution inst = ent.DimInstitutions.FirstOrDefault(obj => obj.CertNumber == fdicNumber);
                if (inst != null)
                    institutionKey = inst.InstitutionKey;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionKey;
        }

        public static int GetInstitutionKey(string userEmail)
        {
            int institutionKey = int.MinValue;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);
                AppTenant loggedInUserTenant = null;
                if (loggedInUserDetails != null)
                    loggedInUserTenant = ent.AppTenants.FirstOrDefault(tenantObj => tenantObj.TenantKey == loggedInUserDetails.TenantKey);
                if (loggedInUserTenant != null)
                    institutionKey = loggedInUserTenant.InstitutionKey;

                if (institutionKey == -1)
                {
                    var defaultBank = ent.AppFavoriteBanks.FirstOrDefault(obj => obj.IsDefaultBank == true && obj.UserKey == loggedInUserDetails.UserKey);
                    if (defaultBank != null)
                        institutionKey = defaultBank.InstitutionKey;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionKey;
        }

        public static int GetInstitutionKeyFromName(string instName)
        {
            int institutionKey = int.MinValue;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var inst = ent.DimInstitutions.FirstOrDefault(obj => obj.InstitutionName == instName);
                if (inst != null)
                    institutionKey = inst.InstitutionKey;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return institutionKey;
        }

        public static string GetInstitutionState(int institutionKey)
        {
            string institutionState = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                DimInstitution inst = ent.DimInstitutions.FirstOrDefault(obj => obj.InstitutionKey == institutionKey);
                if (inst != null)
                    institutionState = inst.InstitutionStateName;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionState;
        }

        public static string GetInstitutionName(long tenantKey)
        {
            string institutionName = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserTenant = ent.AppTenants.FirstOrDefault(tenantObj => tenantObj.TenantKey == tenantKey);
                DimInstitution loggedInUserInstitution = null;
                if (loggedInUserTenant != null)
                    loggedInUserInstitution = ent.DimInstitutions.FirstOrDefault(institutionObj => institutionObj.InstitutionKey == loggedInUserTenant.InstitutionKey);

                if (loggedInUserInstitution != null)
                    institutionName = loggedInUserInstitution.InstitutionName;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionName;
        }

        public static string GetInstitutionNameFromInstitutionKey(long institutionKey)
        {
            string institutionName = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var institution = ent.DimInstitutions.FirstOrDefault(obj => obj.InstitutionKey == institutionKey);
                if (institution != null)
                {
                    institutionName = institution.InstitutionName;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionName;
        }

        public static int GetInstitutionKey(long tenantKey)
        {
            int institutionKey = int.MinValue;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserTenant = ent.AppTenants.FirstOrDefault(tenantObj => tenantObj.TenantKey == tenantKey);
                if (loggedInUserTenant != null)
                    institutionKey = loggedInUserTenant.InstitutionKey;

                if (institutionKey == -1)
                {
                    var defaultFavoriteBank = ent.AppFavoriteBanks.FirstOrDefault(obj => obj.IsDefaultBank == true);
                    if (defaultFavoriteBank != null)
                        institutionKey = defaultFavoriteBank.InstitutionKey;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionKey;
        }

        public static long GetTenantKey(string userEmail)
        {
            long tenantKey = long.MinValue;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);
                AppTenant loggedInUserTenant = null;
                if (loggedInUserDetails != null)
                    loggedInUserTenant = ent.AppTenants.FirstOrDefault(tenantObj => tenantObj.TenantKey == loggedInUserDetails.TenantKey);

                if (loggedInUserTenant != null)
                    tenantKey = loggedInUserTenant.TenantKey;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return tenantKey;
        }

        public static string GetTenantName(string userEmail)
        {
            string tenantName = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);
                AppTenant loggedInUserTenant = null;
                if (loggedInUserDetails != null)
                    loggedInUserTenant = ent.AppTenants.FirstOrDefault(tenantObj => tenantObj.TenantKey == loggedInUserDetails.TenantKey);

                if (loggedInUserTenant != null)
                    tenantName = loggedInUserTenant.TenantName;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return tenantName;
        }

        public static long GetUserKey(string userEmail)
        {
            long userKey = long.MinValue;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);
                if (loggedInUserDetails != null)
                    userKey = loggedInUserDetails.UserKey;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return userKey;
        }

        public static int GetDefaultCustomPeerGroupKey(string email)
        {
            int peerGroupKey = int.MinValue;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long userKey = UtilityFunctions.GetUserKey(email);
                var result = ent.DimCustPeerGroups.FirstOrDefault(obj => obj.UserKey == userKey && obj.IsDefault == true);
                if (result != null)
                    peerGroupKey = result.CustPeerGroupKey;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return peerGroupKey;
        }

        public static string GetDefaultCustomPeerGroupName(string email)
        {
            string peerGroupName = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long userKey = UtilityFunctions.GetUserKey(email);
                var result = ent.DimCustPeerGroups.FirstOrDefault(obj => obj.UserKey == userKey && obj.IsDefault == true);
                if (result != null)
                    peerGroupName = result.CustPeerGroupName;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return peerGroupName;
        }

        public static string GetCustomPeerGroupName(int key)
        {
            string peerGroupName = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.DimCustPeerGroups.FirstOrDefault(obj => obj.CustPeerGroupKey == key);
                if (result != null)
                    peerGroupName = result.CustPeerGroupName;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return peerGroupName;
        }

        public static string IsSelected(this HtmlHelper<dynamic> html, string controllers = "", string actions = "", string cssClass = "active")
        {
            string[] acceptedActions = null;
            string[] acceptedControllers = null;
            string currentAction = string.Empty;
            string currentController = string.Empty;

            try
            {
                ViewContext viewContext = html.ViewContext;
                bool isChildAction = viewContext.Controller.ControllerContext.IsChildAction;

                if (isChildAction)
                    viewContext = html.ViewContext.ParentActionViewContext;

                RouteValueDictionary routeValues = viewContext.RouteData.Values;
                currentAction = routeValues["action"].ToString();
                currentController = routeValues["controller"].ToString();

                if (string.IsNullOrEmpty(actions))
                    actions = currentAction;

                if (string.IsNullOrEmpty(controllers))
                    controllers = currentController;

                acceptedActions = actions.Trim().Split(',').Distinct().ToArray();
                acceptedControllers = controllers.Trim().Split(',').Distinct().ToArray();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return acceptedActions.Contains(currentAction) && acceptedControllers.Contains(currentController) ? cssClass : string.Empty;
        }

        public static string GetUserName(string userEmail)
        {
            string userName = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var appUser = ent.AppUsers.FirstOrDefault(obj => obj.EMail == userEmail);
                if (appUser != null)
                {
                    if (!string.IsNullOrEmpty(appUser.FirstName))
                        userName = appUser.FirstName;
                    if (!string.IsNullOrEmpty(appUser.LastName))
                        userName = userName + " " + appUser.LastName;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return userName;
        }

        public static string GetUserName(long userKey)
        {
            string userName = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var appUser = ent.AppUsers.FirstOrDefault(obj => obj.UserKey == userKey);
                if (appUser != null)
                {
                    if (!string.IsNullOrEmpty(appUser.FirstName))
                        userName = appUser.FirstName;
                    if (!string.IsNullOrEmpty(appUser.LastName))
                        userName = userName + " " + appUser.LastName;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return userName;
        }

        public static string GetModelOwnerName(long modelKey)
        {
            string modelName = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var modelObj = ent.AppCRAMModels.FirstOrDefault(obj => obj.ModelKey == modelKey);
                if (modelObj != null)
                {
                    var userObj = ent.AppUsers.FirstOrDefault(obj => obj.UserKey == modelObj.UserKey);
                    if (userObj != null)
                    {
                        if (!string.IsNullOrEmpty(userObj.FirstName))
                            modelName = userObj.FirstName;

                        if (!string.IsNullOrEmpty(userObj.LastName))
                            modelName = modelName + " " + userObj.LastName;
                    }
                }

            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return modelName;
        }

        public static bool IsUserPartOfAllRoles(string roles, string email)
        {
            bool result = false;
            CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            try
            {
                string[] arrRoles = roles.Split(',');
                foreach (string role in arrRoles)
                {
                    var userRole = ent.AppUserRoles.FirstOrDefault(obj => obj.AppRole.Name == role && obj.AppUser.EMail == email && obj.IsAccessible == true);
                    if (userRole != null)
                        result = true;
                    else
                    {
                        result = false;
                        break;
                    }
                }

            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }
        public static string HideIfNotInAnyRole(string roles, string email)
        {
            string result = string.Empty;
            CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            try
            {
                string[] arrRoles = roles.Split(',');
                long userKey = UtilityFunctions.GetUserKey(email);
                foreach (string role in arrRoles)
                {
                    var appRole = ent.AppRoles.FirstOrDefault(obj => obj.Name == role);
                    var userRole = ent.AppUserRoles.FirstOrDefault(obj => obj.UserKey == userKey && obj.RoleKey == appRole.RoleKey);
                    if (userRole != null)
                        result = "hidden";
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        public static void AddUserToRole(string email, int roleId)
        {
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long userKey = UtilityFunctions.GetUserKey(email);
                var result = ent.Database.ExecuteSqlCommand(string.Format("insert into AppUserRole ([UserKey],[RoleKey],[IsAccessible]) values ({0},{1},{2})", userKey.ToString(), roleId.ToString(), 1));
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
        }

        public static void AddUserToRegistartion(string email, string firstName, string lastName, string title, long tenantKey, int roleId)
        {
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var query = $"insert into AppUserRegistration ([FirstName],[LastName],[Email],[Title], [TenantKey], [RoleId]) values ('{firstName}', '{lastName}', '{email}', '{title}', {tenantKey}, {roleId})";
                var result = ent.Database.ExecuteSqlCommand(query);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
        }

        

        public static void AddUserToERMAccessTable(long TenantKey, bool? isAccessible = false)
        {
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var res = ent.AppAccessControls.Where(c => c.TenantKey == TenantKey && c.ModuleKey == 3).ToList();
                if (res != null && res.Count > 0)
                {
                    SqlParameter accountKey = new SqlParameter("TenantKey", SqlDbType.Int);
                    accountKey.Value = Convert.ToInt32(TenantKey);

                    SqlParameter isERMAccessible = new SqlParameter("IsAccessible", SqlDbType.Bit);
                    isERMAccessible.Value = isAccessible.Value;

                    var result = ent.Database.SqlQuery<int>("dbo.uspGetOrUpdateERMAccessControlDetails @TenantKey, @IsAccessible", accountKey, isERMAccessible).FirstOrDefault<int>();
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
        }

        public static string GetEffectiveDataDate()
        {
            string effectiveDate = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.Database.SqlQuery<string>("SELECT [ConfiguredValue] FROM [ETLFrameWork].[dbo].[ETLConfiguration] WHERE ConfigurationFilter = 'DataRefreshedDate'").First();
                if (result != null)
                {
                    string month = result.Substring(4, 2);
                    string year = result.Substring(0, 4);
                    string day = result.Substring(6, 2);
                    effectiveDate = month + "/" + day + "/" + year;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return effectiveDate;
        }

        public static Category GetQuarterlyCategories()
        {
            Category cg = new Category();

            string lastQuarterString = CommonFunctions.GetLastQuarterString();
            string month = lastQuarterString.Substring(4, 2);
            string year = lastQuarterString.Substring(0, 4);
            string day = lastQuarterString.Substring(6, 2);
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));
            DateTime minus1QuarteDate = latestQuarterDate.AddMonths(-3);
            DateTime minus2QuarteDate = latestQuarterDate.AddMonths(-6);
            DateTime minus3QuarteDate = latestQuarterDate.AddMonths(-9);
            DateTime minus4QuarteDate = latestQuarterDate.AddMonths(-12);

            string latestQuarterString = string.Empty;
            if (latestQuarterDate.Month < 10)
            {
                string latestQuarterMonth = "0" + latestQuarterDate.Month.ToString();
                latestQuarterString = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString());
            }
            else
                latestQuarterString = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year.ToString() + latestQuarterDate.Month.ToString() + latestQuarterDate.Day.ToString());

            string minus1QuarterString = string.Empty;
            if (minus1QuarteDate.Month < 10)
            {
                string minus1QuarterMonth = "0" + minus1QuarteDate.Month.ToString();
                minus1QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus1QuarterMonth + minus1QuarteDate.Day.ToString());
            }
            else
                minus1QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus1QuarteDate.Month.ToString() + minus1QuarteDate.Day.ToString());

            string minus2QuarterString = string.Empty;
            if (minus2QuarteDate.Month < 10)
            {
                string minus2QuarterMonth = "0" + minus2QuarteDate.Month.ToString();
                minus2QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus2QuarterMonth + minus1QuarteDate.Day.ToString());
            }
            else
                minus2QuarterString = CommonFunctions.GetQuarterLabel(minus2QuarteDate.Year.ToString() + minus2QuarteDate.Month.ToString() + minus2QuarteDate.Day.ToString());

            string minus3QuarterString = string.Empty;
            if (minus3QuarteDate.Month < 10)
            {
                string minus3QuarterMonth = "0" + minus3QuarteDate.Month.ToString();
                minus3QuarterString = CommonFunctions.GetQuarterLabel(minus3QuarteDate.Year.ToString() + minus3QuarterMonth + minus3QuarteDate.Day.ToString());
            }
            else
                minus3QuarterString = CommonFunctions.GetQuarterLabel(minus3QuarteDate.Year.ToString() + minus3QuarteDate.Month.ToString() + minus3QuarteDate.Day.ToString());

            string minus4QuarterString = string.Empty;
            if (minus4QuarteDate.Month < 10)
            {
                string minus4QuarterMonth = "0" + minus4QuarteDate.Month.ToString();
                minus4QuarterString = CommonFunctions.GetQuarterLabel(minus4QuarteDate.Year.ToString() + minus4QuarterMonth + minus4QuarteDate.Day.ToString());
            }
            else
                minus4QuarterString = CommonFunctions.GetQuarterLabel(minus4QuarteDate.Year.ToString() + minus4QuarteDate.Month.ToString() + minus4QuarteDate.Day.ToString());

            cg.CategoryLabels.Add(new CategoryLabel() { Label = minus4QuarterString });
            cg.CategoryLabels.Add(new CategoryLabel() { Label = minus3QuarterString });
            cg.CategoryLabels.Add(new CategoryLabel() { Label = minus2QuarterString });
            cg.CategoryLabels.Add(new CategoryLabel() { Label = minus1QuarterString });
            cg.CategoryLabels.Add(new CategoryLabel() { Label = latestQuarterString });

            return cg;
        }

        public static Category GetYearlyCategories()
        {
            Category cg = new Category();
            string lastQuarterString = CommonFunctions.GetLastQuarterString();
            string month = lastQuarterString.Substring(4, 2);
            string year = lastQuarterString.Substring(0, 4);
            string day = lastQuarterString.Substring(6, 2);
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));
            for (int i = (latestQuarterDate.Year - 4); i < (latestQuarterDate.Year); i++)
            {
                cg.CategoryLabels.Add(new CategoryLabel() { Label = i.ToString() + "Y" });
            }

            string latestQuarterMonth = string.Empty;
            if (latestQuarterDate.Month < 10)
                latestQuarterMonth = "0" + latestQuarterDate.Month.ToString();
            else
                latestQuarterMonth = latestQuarterDate.Month.ToString();

            cg.CategoryLabels.Add(new CategoryLabel() { Label = CommonFunctions.GetYearlyLabel(latestQuarterDate.Year + latestQuarterMonth + latestQuarterDate.Day.ToString()) });

            return cg;
        }

        public static int GetDefaultInstitutionKey(string userEmail)
        {
            int institutionKey = int.MinValue;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);
                if (loggedInUserDetails != null)
                {
                    var defaultBankFromFavoriteList = ent.AppFavoriteBanks.FirstOrDefault(obj => obj.UserKey == loggedInUserDetails.UserKey && obj.IsDefaultBank == true);
                    if (defaultBankFromFavoriteList != null)
                        institutionKey = defaultBankFromFavoriteList.InstitutionKey;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionKey;
        }

        public static string GetDefaultInstitutionName(string userEmail)
        {
            string institutionName = string.Empty;
            int institutionKey = int.MinValue;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);
                if (loggedInUserDetails != null)
                {
                    var defaultBankFromFavoriteList = ent.AppFavoriteBanks.FirstOrDefault(obj => obj.UserKey == loggedInUserDetails.UserKey && obj.IsDefaultBank == true);
                    if (defaultBankFromFavoriteList != null)
                        institutionKey = defaultBankFromFavoriteList.InstitutionKey;
                    institutionName = ent.DimInstitutions.FirstOrDefault(obj => obj.InstitutionKey == institutionKey).InstitutionName;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionName;
        }

        public static StdPeerGroupInfo GetStdPeerGroupForInstitution(int institutionKey)
        {
            StdPeerGroupInfo stdPeerGroup = null;
            CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            SqlParameter instKeyParam = new SqlParameter("InstitutionKey", SqlDbType.Int);
            instKeyParam.Value = institutionKey;
            var result = ent.Database.SqlQuery<StdPeerGroupInfo>("dbo.uspRptGetStdPeerGroupKey @InstitutionKey", instKeyParam).ToList();
            if (result != null && result.Count > 0)
            {
                stdPeerGroup = result.First();
            }

            return stdPeerGroup;
        }

        public static List<Institution> GetInstitutionListForUser(string userEmail)
        {
            List<Institution> institutionList = new List<Institution>();
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                if (!string.IsNullOrEmpty(userEmail))
                {
                    var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);
                    if (loggedInUserDetails != null)
                    {
                        var favoritedBanks = ent.AppFavoriteBanks.Where(obj => obj.UserKey == loggedInUserDetails.UserKey).ToList();
                        foreach (AppFavoriteBank favoritedBank in favoritedBanks)
                        {
                            Institution favoritedInstitution = new Institution();
                            favoritedInstitution.InstitutionKey = favoritedBank.InstitutionKey;
                            favoritedInstitution.InstitutionName = ent.DimInstitutions.FirstOrDefault(obj => obj.InstitutionKey == favoritedBank.InstitutionKey).InstitutionName;
                            favoritedInstitution.FdicCert = ent.DimInstitutions.FirstOrDefault(obj => obj.InstitutionKey == favoritedBank.InstitutionKey).CertNumber.ToString();
                            favoritedInstitution.IsDefault = favoritedBank.IsDefaultBank;
                            StdPeerGroupInfo stdPeerGroup = UtilityFunctions.GetStdPeerGroupForInstitution(favoritedInstitution.InstitutionKey);
                            if (stdPeerGroup != null)
                            {
                                favoritedInstitution.StdPeerGroupCode = stdPeerGroup.StdPeerGroupCode;
                                favoritedInstitution.StdPeerGroupKey = stdPeerGroup.StdPeerGroupKey;
                            }
                            else
                            {
                                favoritedInstitution.StdPeerGroupCode = string.Empty;
                                favoritedInstitution.StdPeerGroupKey = -2;
                            }

                            institutionList.Add(favoritedInstitution);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionList;
        }

        public static List<Institution> GetInstitutionListForUserTenantBank(string userEmail)
        {
            List<Institution> institutionList = new List<Institution>();
            try
            {
                long tenantBankInstKey = UtilityFunctions.GetInstitutionKey(userEmail);
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);
                if (loggedInUserDetails != null)
                {
                    var favoritedBanks = ent.AppFavoriteBanks.Where(obj => obj.UserKey == loggedInUserDetails.UserKey).ToList();

                    foreach (AppFavoriteBank favoritedBank in favoritedBanks)
                    {
                        var dimInstitution = ent.DimInstitutions.FirstOrDefault(f => f.InstitutionKey == favoritedBank.InstitutionKey);
                        Institution favoritedInstitution = new Institution();
                        favoritedInstitution.InstitutionKey = favoritedBank.InstitutionKey;
                        favoritedInstitution.InstitutionName = dimInstitution?.InstitutionName;
                        favoritedInstitution.FdicCert = dimInstitution?.CertNumber.ToString();
                        favoritedInstitution.IsDefault = favoritedBank.IsDefaultBank;
                        StdPeerGroupInfo stdPeerGroup = UtilityFunctions.GetStdPeerGroupForInstitution(favoritedInstitution.InstitutionKey);
                        if (stdPeerGroup != null)
                        {
                            favoritedInstitution.StdPeerGroupCode = stdPeerGroup.StdPeerGroupCode;
                            favoritedInstitution.StdPeerGroupKey = stdPeerGroup.StdPeerGroupKey;
                        }
                        else
                        {
                            favoritedInstitution.StdPeerGroupCode = string.Empty;
                            favoritedInstitution.StdPeerGroupKey = -2;
                        }

                        institutionList.Add(favoritedInstitution);
                    }

                    if (tenantBankInstKey != -1)
                    {
                        foreach (Institution institution in institutionList)
                        {
                            institution.IsDefault = false;
                            if (institution.InstitutionKey == tenantBankInstKey)
                                institution.IsDefault = true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionList;
        }

        public static void MakeTenantBankAsDefaultFavorite(string emailId)
        {
            try
            {
                int instKey = UtilityFunctions.GetInstitutionKey(emailId);
                if (instKey > -1)
                {
                    long userKey = UtilityFunctions.GetUserKey(emailId);
                    CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                    var result = ent.AppFavoriteBanks.FirstOrDefault(obj => obj.UserKey == userKey && obj.InstitutionKey == instKey);
                    if (result == null)
                    {
                        var result1 = ent.AppFavoriteBanks.Add(new AppFavoriteBank() { UserKey = userKey, InstitutionKey = instKey, IsDefaultBank = true });
                        ent.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
        }

        public static bool DoesCramModelExistsInRiskCategories(long modelKey)
        {
            bool modelExists = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.AppCRAMRiskCategories.Where(obj => obj.ModelKey == modelKey).FirstOrDefault();
                if (result != null)
                    modelExists = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return modelExists;
        }

        public static bool DoesCramModelExistsInRiskRatings(long modelKey)
        {
            bool modelExists = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.AppCRAMRiskRatings.Where(obj => obj.ModelKey == modelKey).FirstOrDefault();
                if (result != null)
                    modelExists = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return modelExists;
        }

        public static bool DoesCramModelExistsInAdjustmentData(long modelKey)
        {
            bool modelExists = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.AppCRAMAdjustBankDatas.Where(obj => obj.ModelKey == modelKey).FirstOrDefault();
                if (result != null)
                    modelExists = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return modelExists;
        }

        public static bool DoesCramModelExists(long modelKey)
        {
            bool modelExists = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.AppCRAMModels.Where(obj => obj.ModelKey == modelKey).FirstOrDefault();
                if (result != null)
                    modelExists = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return modelExists;
        }

        public static bool IsReferredBy(int? referred, string username)
        {
            bool result = false;
            CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            try
            {
                long tenantKey = UtilityFunctions.GetTenantKey(username);
                var loggedInUserTenant = ent.AppTenants.FirstOrDefault(tenantObj => tenantObj.TenantKey == tenantKey);
                if (loggedInUserTenant != null)
                    result = loggedInUserTenant.ReferredBy != null && loggedInUserTenant.ReferredBy == referred;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        public static string GetTenantInstitutionName(string userEmail)
        {
            string institutionName = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long tenantKey = UtilityFunctions.GetTenantKey(userEmail);
                var loggedInUserTenant = ent.AppTenants.FirstOrDefault(tenantObj => tenantObj.TenantKey == tenantKey);
                if (loggedInUserTenant != null)
                {
                    institutionName = ent.DimInstitutions.FirstOrDefault(obj => obj.InstitutionKey == loggedInUserTenant.InstitutionKey).InstitutionName;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionName;
        }

        public static void SaveOrUpdateChartMetadata(long userKey, int chartKey, Guid chartId)
        {
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter userId = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userId.Value = userKey;

                SqlParameter chartTypeKey = new SqlParameter("@ChartKey", SqlDbType.Int);
                chartTypeKey.Value = chartKey;

                SqlParameter chartGuid = new SqlParameter("@ChartImageGuid", SqlDbType.UniqueIdentifier);
                chartGuid.Value = chartId;

                var result = ent.Database.SqlQuery<int>("exec [dbo].[uspSaveOrUpdateChartMetaData] @UserKey, @ChartKey, @ChartImageGuid", userId, chartTypeKey, chartGuid).First();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
        }

        public static void UploadChartToAzureStorage(string fileName, byte[] content)
        {
            try
            {
                string azureCon = CloudConfigurationManager.GetSetting("StorageConnectionString");
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(azureCon);
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference("userchartimages");
                container.CreateIfNotExists();
                CloudBlockBlob blob = container.GetBlockBlobReference(fileName);
                blob.UploadFromByteArray(content, 0, content.Length);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
        }

        public static byte[] DownloadChartFromAzureStorage(string fileName)
        {
            MemoryStream memStr = new MemoryStream();
            try
            {
                string azureCon = CloudConfigurationManager.GetSetting("StorageConnectionString");
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(azureCon);
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference("userchartimages");
                CloudBlockBlob blob = container.GetBlockBlobReference(fileName);
                blob.DownloadToStream(memStr);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return memStr.ToArray();
        }

        public static bool CheckBlobPresence(string fileName)
        {
            bool result = false;
            try
            {
                string azureCon = CloudConfigurationManager.GetSetting("StorageConnectionString");
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(azureCon);
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference("userchartimages");
                CloudBlockBlob blob = container.GetBlockBlobReference(fileName);
                result = blob.Exists();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        public static List<ChartMetadata> GetChartFileNamesForScreen(long userKey, string screenName)
        {
            List<ChartMetadata> result = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter userId = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userId.Value = userKey;

                SqlParameter screen = new SqlParameter("@ScreenName", SqlDbType.VarChar);
                screen.Value = screenName;

                result = ent.Database.SqlQuery<ChartMetadata>("exec [dbo].[uspGetChartMetadata] @UserKey, @ScreenName", userId, screen).ToList();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return result;
        }

        public static bool BenchmarkTenantKeyUpdate(long tenantKey)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter tKey = new SqlParameter("@TenantKey", SqlDbType.BigInt);
                tKey.Value = tenantKey;
                int rowsWorked = ent.Database.SqlQuery<Int32>("exec [dbo].[uspBenchmarkTenantKeyUpdate] @TenantKey", tKey).First();
                if (rowsWorked > 0)
                    result = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        public static int GetNewFileTotalCount(string userIdentity)
        {
            List<NewFileCount> newFileCounts = null;
            int sum = 0;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userKey.Value = UtilityFunctions.GetUserKey(userIdentity);
                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.BigInt);
                tenantKey.Value = UtilityFunctions.GetTenantKey(userIdentity);
                newFileCounts = ent.Database.SqlQuery<NewFileCount>("exec dbo.uspRptGetFileCount @UserKey, @TenantKey", userKey, tenantKey).ToList();
                if (newFileCounts != null && newFileCounts.Count > 0)
                {
                    foreach (NewFileCount filecount in newFileCounts)
                    {
                        sum += filecount.NewCount;
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return sum;
        }

        public static int GetInstitutionKeyOnly(string userEmail)
        {
            int institutionKey = int.MinValue;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);
                AppTenant loggedInUserTenant = null;

                if (loggedInUserDetails != null)
                    loggedInUserTenant = ent.AppTenants.FirstOrDefault(tenantObj => tenantObj.TenantKey == loggedInUserDetails.TenantKey);

                if (loggedInUserTenant != null)
                    institutionKey = loggedInUserTenant.InstitutionKey;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionKey;
        }

        public static bool DoesUserHaveAccessToIssueACd(string userEmail)
        {
            List<string> whiteListedUsers = new List<string>();
            bool retVal = true;

            string[] arrUsers = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("NonBankUsersHavingCDAccess"))
                ? Environment.GetEnvironmentVariable("NonBankUsersHavingCDAccess").Split(",".ToCharArray())
                : null;

            if (arrUsers != null)
            {
                foreach (string user in arrUsers)
                {
                    whiteListedUsers.Add(user);
                }
            }

            if (!string.IsNullOrEmpty(userEmail))
            {
                int institutionKey = UtilityFunctions.GetInstitutionKeyOnly(userEmail);
                if (institutionKey == -1)
                {
                    if (!whiteListedUsers.Contains(userEmail))
                    {
                        retVal = false;
                    }
                }
            }

            return retVal;
        }

        public static bool IsLoggedInUserSuperAdmin(string userEmail)
        {
            bool retVal = false;
            List<UserRoleProfile> userRoles = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);

                if (loggedInUserDetails != null)
                {
                    SqlParameter userKeyParam = new SqlParameter("UserKey", SqlDbType.Int);
                    userKeyParam.Value = loggedInUserDetails.UserKey;
                    userRoles = ent.Database.SqlQuery<UserRoleProfile>("dbo.uspRptAppGetUserProfile @UserKey", userKeyParam).ToList<UserRoleProfile>();
                    var superAdminUserRole = userRoles.Where(obj => obj.RoleValue == 4 && obj.IsAccessible == true).FirstOrDefault();
                    if (superAdminUserRole != null) retVal = superAdminUserRole.IsAccessible;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        public static string GetDefaultBanksTenantName(string userEmail)
        {
            string tenantName = string.Empty;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.Where(obj => obj.EMail == userEmail).FirstOrDefault();
                if (loggedInUserDetails != null)
                {
                    var defaultBank = ent.AppFavoriteBanks.Where(obj => obj.IsDefaultBank == true && obj.UserKey == loggedInUserDetails.UserKey).FirstOrDefault();
                    if (defaultBank != null)
                    {
                        var tenantDetails = ent.AppTenants.Where(obj => obj.InstitutionKey == defaultBank.InstitutionKey).FirstOrDefault();
                        if (tenantDetails != null)
                        {
                            tenantName = tenantDetails.TenantName;
                        }
                        else
                        {
                            tenantName = UtilityFunctions.GetTenantName(userEmail);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return tenantName;
        }

        public static string GetDefaultBanksTenantKey(string userEmail)
        {
            string tenantKey = string.Empty;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUserDetails = ent.AppUsers.Where(obj => obj.EMail == userEmail).FirstOrDefault();
                if (loggedInUserDetails != null)
                {
                    var defaultBank = ent.AppFavoriteBanks.Where(obj => obj.IsDefaultBank == true && obj.UserKey == loggedInUserDetails.UserKey).FirstOrDefault();
                    if (defaultBank != null)
                    {
                        var tenantDetails = ent.AppTenants.Where(obj => obj.InstitutionKey == defaultBank.InstitutionKey).FirstOrDefault();
                        if (tenantDetails != null)
                        {
                            tenantKey = tenantDetails.TenantKey.ToString();
                        }
                        else
                        {
                            tenantKey = UtilityFunctions.GetTenantKey(userEmail).ToString();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return tenantKey;
        }

        public static Dictionary<string, object> ObjectToDictionary(object obj)
        {
            Dictionary<string, object> ret = new Dictionary<string, object>();

            foreach (PropertyInfo prop in obj.GetType().GetProperties())
            {
                string propName = prop.Name;
                var val = obj.GetType().GetProperty(propName).GetValue(obj, null);
                if (val != null)
                {
                    ret.Add(propName, val);
                }
                else
                {
                    ret.Add(propName, null);
                }
            }

            return ret;
        }

        public static string ConvertToAssetFormat(string assetValue)
        {
            CultureInfo usCulture = new CultureInfo("en-US");
            return string.Format("{0}", (string.Format(usCulture, "{0:c0}", Convert.ToInt64(assetValue) / 1000)).Substring(1));
        }

        public static ForumConfig GetForumConfig()
        {
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                ForumConfig forumConfig = ent.ForumConfigs.FirstOrDefault();

                return forumConfig;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return null;
        }

        public static string GetUserRole(string userEmail)
        {
            string retUser = "Standard User";
            CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            try
            {
                var loggedInUserDetails = ent.AppUsers.FirstOrDefault(userObj => userObj.EMail == userEmail);

                if (loggedInUserDetails != null)
                {
                    SqlParameter userKeyParam = new SqlParameter("UserKey", SqlDbType.Int);
                    SqlParameter userKeyParam2 = new SqlParameter("UserKey", SqlDbType.Int);
                    userKeyParam.Value = loggedInUserDetails.UserKey;
                    var userRoles = ent.Database.SqlQuery<UserRoleProfile>("dbo.uspRptAppGetUserProfile @UserKey ", userKeyParam).ToList<UserRoleProfile>();
                    var superAdminUserRole = userRoles.Where(user => user.IsAccessible == true).OrderByDescending(x => x.RoleValue).FirstOrDefault()?.RoleName;
                    return superAdminUserRole ?? retUser;
                }
                else
                {
                    var query = $@"SELECT TOP 1 AR.RoleValue, AR.Name AS [RoleName] FROM dbo.AppRole AR
		                         JOIN dbo.AppUserRegistration AUR ON AUR.RoleId = AR.RoleKey
			                     AND Email = '{userEmail}'
			                     ORDER BY CreatedDate desc ";
                    var userRoles = ent.Database.SqlQuery<UserRoleProfile>(query).ToList<UserRoleProfile>();
                    return userRoles.FirstOrDefault()?.RoleName  ?? retUser;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retUser;
        }

        public static bool IsUserPartOfAnyRole(string roles, string email)
        {
            bool result = false;
            CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            try
            {
                string[] arrRoles = roles.Split(',');
                long userKey = UtilityFunctions.GetUserKey(email);
                foreach (string role in arrRoles)
                {
                    var appRole = ent.AppRoles.FirstOrDefault(obj => obj.Name == role);
                    var userRole = ent.AppUserRoles.FirstOrDefault(obj => obj.UserKey == userKey && obj.RoleKey == appRole.RoleKey && obj.IsAccessible == true);
                    if (userRole != null)
                        result = true;
                }

            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }
    }
}
