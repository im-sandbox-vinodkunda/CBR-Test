using CBR.Common;
using CBR.DataAccess;
using CBR.Web.Models;
using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CBR.Web.Controllers.Api
{
    public class SysAdminApiController : ApiController
    {
        [HttpPost]
        public List<Tenant> GetAllActiveTenants(GetTenantUserParams getTenantParams)
        {
            List<Tenant> allActiveTenants = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var allTenants = ent.AppTenants.ToList();
                if (allTenants != null && allTenants.Count > 0)
                {
                    allActiveTenants = new List<Tenant>();
                    int pageSizeToReturn = -1;

                    int totalCount = allTenants.Count;
                    if (getTenantParams.PageSize == -1)
                        pageSizeToReturn = allTenants.Count;
                    else
                        pageSizeToReturn = getTenantParams.PageSize;

                    if (getTenantParams.SortBy == "accountName")
                    {
                        if (getTenantParams.ReverseSort)
                        {
                            allTenants = allTenants.OrderByDescending(obj => obj.TenantName).ToList();
                        }
                        else
                        {
                            allTenants = allTenants.OrderBy(obj => obj.TenantName).ToList();
                        }

                        if (allTenants.Count > pageSizeToReturn)
                            allTenants = allTenants.Skip(pageSizeToReturn * (getTenantParams.PageNumber - 1)).Take(pageSizeToReturn).ToList<AppTenant>();
                    }

                    if (getTenantParams.SortBy == "memberSince")
                    {
                        if (getTenantParams.ReverseSort)
                        {
                            allTenants = allTenants.OrderByDescending(obj => obj.InsertedDateTime).ToList();
                        }
                        else
                        {
                            allTenants = allTenants.OrderBy(obj => obj.InsertedDateTime).ToList();
                        }

                        if (allTenants.Count > pageSizeToReturn)
                            allTenants = allTenants.Skip(pageSizeToReturn * (getTenantParams.PageNumber - 1)).Take(pageSizeToReturn).ToList<AppTenant>();
                    }

                    foreach (AppTenant ten in allTenants)
                    {
                        DimInstitution correspondingBank = ent.DimInstitutions.Where(obj => obj.InstitutionKey == ten.InstitutionKey).FirstOrDefault();
                        if (correspondingBank != null)
                        {
                            Tenant activeTenant = new Tenant();
                            activeTenant.AccountDomain = ten.TenantDomain;
                            activeTenant.AccountName = ten.TenantName;
                            activeTenant.AdminEmail = string.Empty;
                            activeTenant.AdminFirstName = string.Empty;
                            activeTenant.AdminLastName = string.Empty;
                            activeTenant.MemberSince = ten.InsertedDateTime;
                            activeTenant.TotalAccounts = totalCount;
                            activeTenant.TenantKey = ten.TenantKey;
                            activeTenant.FDICCert = correspondingBank.CertNumber.ToString();
                            activeTenant.State = correspondingBank.InstitutionStateName;
                            activeTenant.IsActive = ten.IsActive;
                            allActiveTenants.Add(activeTenant);
                        }
                    }

                    if (getTenantParams.SortBy == "state")
                    {
                        if (getTenantParams.ReverseSort)
                        {
                            allActiveTenants = allActiveTenants.OrderByDescending(obj => obj.State).ToList();
                        }
                        else
                        {
                            allActiveTenants = allActiveTenants.OrderBy(obj => obj.State).ToList();
                        }

                        if (allActiveTenants.Count > pageSizeToReturn)
                            allActiveTenants = allActiveTenants.Skip(pageSizeToReturn * (getTenantParams.PageNumber - 1)).Take(pageSizeToReturn).ToList<Tenant>();
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return allActiveTenants;
        }

        public bool IsInstitutionAvailable(RegisterTenantViewModel regTenantParams)
        {
            bool operationResult = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                int instKey = regTenantParams.SelectedInstitutions[0];
                var existingTenant = ent.AppTenants.FirstOrDefault(obj => obj.InstitutionKey == instKey);
                if (existingTenant == null || (existingTenant != null && existingTenant.IsDelete == true))
                {
                    operationResult = true;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return operationResult;
        }

        [HttpPost]
        public async Task<bool> AddAccount(RegisterTenantViewModel regTenantParams)
        {
            bool operationResult = false;
            string emailBodyMarkup = EmailTemplates.adminInvitationTemplate;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                int instKey = regTenantParams.SelectedInstitutions[0];
                string imageUrl = ConfigurationManager.AppSettings["SSORedirect"];
                string urlTemplate = ConfigurationManager.AppSettings["SSORegisterUrl"];

                // Inviting user as Administrator
                var roleId = 3;

                if (instKey > -1)
                {
                    var existingTenant = ent.AppTenants.FirstOrDefault(obj => obj.InstitutionKey == instKey);
                    if (existingTenant != null)
                    {
                        if (existingTenant.IsDelete == true)
                        {
                            var result = ent.Database.ExecuteSqlCommand("UPDATE [dbo].[AppTenant] SET IsDelete = 0 Where TenantKey = " + existingTenant.TenantKey.ToString());
                            if (result > 0)
                            {
                                string url = Request.RequestUri.AbsoluteUri.Substring(0, Request.RequestUri.AbsoluteUri.IndexOf("api"));
                                string encodedInfo = "{0},3";
                                encodedInfo = string.Format(encodedInfo, existingTenant.TenantKey.ToString());
                                ////encodedInfo = CommonFunctions.Encrypt(encodedInfo, true);
                                ////encodedInfo = CommonFunctions.EncryptToBase64(encodedInfo);
                                //url = url + "Account/Register/?TenantKey=" + encodedInfo;
                                //emailBodyMarkup = string.Format(emailBodyMarkup, regTenantParams.FirstName, url, regTenantParams.Message, imageUrl);
                                //await CommonFunctions.SendMail(regTenantParams.FirstName, emailBodyMarkup, regTenantParams.Email, "Administrator Registration to Stifel Bank Analytics", "castellonf@stifel.com");
                                //operationResult = true;                               

                                urlTemplate = urlTemplate + "&TenantKey=" + encodedInfo;

                                emailBodyMarkup = string.Format(emailBodyMarkup, regTenantParams.FirstName, urlTemplate, regTenantParams.Message, imageUrl);

                                UtilityFunctions.AddUserToRegistartion(regTenantParams.Email, regTenantParams.FirstName, regTenantParams.LastName, "", Convert.ToInt64(result.ToString()), roleId);

                                await CommonFunctions.SendMail(regTenantParams.FirstName, emailBodyMarkup, regTenantParams.Email, "Administrator Registration to Stifel Bank Analytics", "castellonf@stifel.com,salgatj@stifel.com");
                                operationResult = true;
                            }
                        }
                    }
                    else
                    {
                        SqlParameter institutionKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                        institutionKey.Value = instKey;

                        SqlParameter tenantName = new SqlParameter("TenantName", SqlDbType.VarChar);
                        tenantName.Value = regTenantParams.AccountName;

                        SqlParameter tenantDomain = new SqlParameter("TenantDomain", SqlDbType.VarChar);
                        tenantDomain.Value = "US";

                        SqlParameter referredBy = new SqlParameter("ReferredBy", SqlDbType.VarChar);
                        if (regTenantParams.AccountType.Contains("F500"))
                            referredBy.Value = "F500";
                        else
                            referredBy.Value = "CBR";

                        SqlParameter tenantType = new SqlParameter("TenantType", SqlDbType.VarChar);
                        if (regTenantParams.AccountType.Contains("Non-Bank"))
                            tenantType.Value = "Non-Bank";
                        else if (regTenantParams.AccountType.Contains("CreditUnion"))
                            tenantType.Value = "CreditUnion";
                        else
                            tenantType.Value = "Bank";

                        var result = ent.Database.SqlQuery<int>("dbo.uspRptAppTenantAdd @InstitutionKey, @TenantName, @TenantDomain, @TenantType, @ReferredBy", institutionKey, tenantName, tenantDomain, tenantType, referredBy).First<int>();
                        if (result > 0)
                        {
                            UtilityFunctions.BenchmarkTenantKeyUpdate(result);
                            string url = Request.RequestUri.AbsoluteUri.Substring(0, Request.RequestUri.AbsoluteUri.IndexOf("api"));
                            string encodedInfo = "{0},3";
                            encodedInfo = string.Format(encodedInfo, result.ToString());

                            //url = url + "Account/Register/?TenantKey=" + encodedInfo;
                            //emailBodyMarkup = string.Format(emailBodyMarkup, regTenantParams.FirstName, url, regTenantParams.Message, imageUrl);
                            //await CommonFunctions.SendMail(regTenantParams.FirstName, emailBodyMarkup, regTenantParams.Email, "Administrator Registration to Stifel Bank Analytics", "castellonf@stifel.com");
                            //operationResult = true;

                            urlTemplate = urlTemplate + "&TenantKey=" + encodedInfo;

                            emailBodyMarkup = string.Format(emailBodyMarkup, regTenantParams.FirstName, urlTemplate, regTenantParams.Message, imageUrl);

                            UtilityFunctions.AddUserToRegistartion(regTenantParams.Email, regTenantParams.FirstName, regTenantParams.LastName, "", Convert.ToInt64(result.ToString()), roleId);

                            await CommonFunctions.SendMail(regTenantParams.FirstName, emailBodyMarkup, regTenantParams.Email, "Administrator Registration to Stifel Bank Analytics", "castellonf@stifel.com,salgatj@stifel.com");
                            operationResult = true;
                        }
                    }
                }
                else
                {
                    SqlParameter institutionKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                    institutionKey.Value = instKey;

                    SqlParameter tenantName = new SqlParameter("TenantName", SqlDbType.VarChar);
                    tenantName.Value = regTenantParams.AccountName;

                    SqlParameter tenantDomain = new SqlParameter("TenantDomain", SqlDbType.VarChar);
                    tenantDomain.Value = "US";

                    SqlParameter referredBy = new SqlParameter("ReferredBy", SqlDbType.VarChar);
                    if (regTenantParams.AccountType.Contains("F500"))
                        referredBy.Value = "F500";
                    else
                        referredBy.Value = "CBR";

                    SqlParameter tenantType = new SqlParameter("TenantType", SqlDbType.VarChar);
                    if (regTenantParams.AccountType.Contains("Non-Bank"))
                        tenantType.Value = "Non-Bank";
                    else if (regTenantParams.AccountType.Contains("CreditUnion"))
                        tenantType.Value = "CreditUnion";
                    else
                        tenantType.Value = "Bank";

                    var result = ent.Database.SqlQuery<int>("dbo.uspRptAppTenantAdd @InstitutionKey, @TenantName, @TenantDomain, @TenantType, @ReferredBy", institutionKey, tenantName, tenantDomain, tenantType, referredBy).First<int>();

                    if (result > 0)
                    {
                        UtilityFunctions.BenchmarkTenantKeyUpdate(result);
                        string url = Request.RequestUri.AbsoluteUri.Substring(0, Request.RequestUri.AbsoluteUri.IndexOf("api"));
                        string encodedInfo = "{0},6";
                        encodedInfo = string.Format(encodedInfo, result.ToString());

                        //url = url + "Account/Register/?TenantKey=" + encodedInfo;
                        //emailBodyMarkup = string.Format(emailBodyMarkup, regTenantParams.FirstName, url, regTenantParams.Message, imageUrl);
                        //await CommonFunctions.SendMail(regTenantParams.FirstName, emailBodyMarkup, regTenantParams.Email, "Administrator Registration to Stifel Bank Analytics", "castellonf@stifel.com");
                        //operationResult = true;                      


                        urlTemplate = urlTemplate + "&TenantKey=" + encodedInfo;

                        emailBodyMarkup = string.Format(emailBodyMarkup, regTenantParams.FirstName, urlTemplate, regTenantParams.Message, imageUrl);

                        UtilityFunctions.AddUserToRegistartion(regTenantParams.Email, regTenantParams.FirstName, regTenantParams.LastName, "", Convert.ToInt64(result.ToString()), roleId);

                        await CommonFunctions.SendMail(regTenantParams.FirstName, emailBodyMarkup, regTenantParams.Email, "User Account Registration to Stifel Bank Analytics", "castellonf@stifel.com,salgatj@stifel.com");
                        operationResult = true;
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return operationResult;
        }

        [HttpPost]
        public bool DeactivateTenant(Tenant deactivationParams)
        {
            bool result = false;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var activeTenant = ent.AppTenants.FirstOrDefault(obj => obj.TenantKey == deactivationParams.TenantKey);
                if (activeTenant != null)
                {
                    activeTenant.IsActive = false;
                    activeTenant.IsDelete = true;
                    ent.SaveChanges();
                    int rowsUpdated = ent.Database.ExecuteSqlCommand("UPDATE AppUser set IsActive = 0 where TenantKey = " + deactivationParams.TenantKey.ToString());
                    if (rowsUpdated > 0)
                        result = true;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpPost]
        public bool DeleteTenant(Tenant tenantDeletionParameters)
        {
            bool result = false;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter tenantKey = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKey.Value = tenantDeletionParameters.TenantKey;

                SqlParameter isDelete = new SqlParameter("IsDelete", SqlDbType.Bit);
                isDelete.Value = tenantDeletionParameters.IsDelete;

                var modifiedRows = ent.Database.SqlQuery<int>("dbo.uspRptAppTenantDelete @TenantKey, @IsDelete", tenantKey, isDelete).First<int>();

                if (modifiedRows > 0)
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

        [HttpPost]
        public bool ReactivateTenant(Tenant tenantReactivationParameters)
        {
            bool result = false;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter tenantKey = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKey.Value = tenantReactivationParameters.TenantKey;

                SqlParameter isDelete = new SqlParameter("IsDelete", SqlDbType.Bit);
                isDelete.Value = tenantReactivationParameters.IsDelete;

                var modifiedRows = ent.Database.SqlQuery<int>("dbo.uspRptAppTenantDelete @TenantKey, @IsDelete", tenantKey, isDelete).First<int>();

                if (modifiedRows > 0)
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

        [HttpPost]
        public bool AddNewsOrEvent(HomePageContent homePageContent)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                AppHomePageContent newObject = new AppHomePageContent();
                newObject.AuditLastUpdatedDatetime = DateTime.Now;
                newObject.ContentType = "NewsOrEvent";
                newObject.Date = homePageContent.Date;
                newObject.Title = homePageContent.Title;
                newObject.Url = homePageContent.Url;
                newObject.PostedBy = "CBR";
                ent.AppHomePageContents.Add(newObject);
                ent.SaveChanges();
                result = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpPost]
        public bool AddBlog(HomePageContent homePageContent)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                AppHomePageContent newObject = new AppHomePageContent();
                newObject.AuditLastUpdatedDatetime = DateTime.Now;
                newObject.ContentType = "Blog";
                newObject.Date = homePageContent.Date;
                newObject.Title = homePageContent.Title;
                newObject.Url = homePageContent.Url;
                newObject.PostedBy = homePageContent.PostedBy;
                ent.AppHomePageContents.Add(newObject);
                ent.SaveChanges();
                result = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpGet]
        public List<HomePageContent> GetNewsAndEvents()
        {
            List<HomePageContent> newsAndEvents = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.AppHomePageContents.Where(obj => obj.ContentType == "NewsOrEvent").OrderByDescending(obj => obj.AuditLastUpdatedDatetime).ToList();
                if (result != null && result.Count > 0)
                {
                    newsAndEvents = new List<HomePageContent>();
                    foreach (AppHomePageContent contentItem in result)
                    {
                        HomePageContent obj = new HomePageContent();
                        obj.Date = contentItem.Date;
                        obj.Title = contentItem.Title;
                        obj.Url = contentItem.Url;
                        newsAndEvents.Add(obj);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return newsAndEvents;
        }

        [HttpGet]
        public List<HomePageContent> GetBlogs()
        {
            List<HomePageContent> blogs = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.AppHomePageContents.Where(obj => obj.ContentType == "Blog").OrderByDescending(obj => obj.AuditLastUpdatedDatetime).ToList();
                if (result != null && result.Count > 0)
                {
                    blogs = new List<HomePageContent>();
                    foreach (AppHomePageContent contentItem in result)
                    {
                        HomePageContent obj = new HomePageContent();
                        obj.Date = contentItem.Date;
                        obj.Title = contentItem.Title;
                        obj.Url = contentItem.Url;
                        obj.PostedBy = contentItem.PostedBy;
                        obj.LastUpdatedBy = contentItem.LastUpdatedBy;
                        obj.LastUpdatedOn = contentItem.LastUpdatedOn;
                        blogs.Add(obj);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return blogs;
        }

        [HttpPost]
        public bool UpdateInfoCenterImages(InfoCenterImages infoCenterImages)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                if (ent.AppInfoCenterImages.Count() > 0)
                {
                    AppInfoCenterImage images = ent.AppInfoCenterImages.First();
                    if (images != null)
                    {
                        if (!string.IsNullOrEmpty(infoCenterImages.Image1))
                            images.Image1 = infoCenterImages.Image1;

                        if (!string.IsNullOrEmpty(infoCenterImages.Image2))
                            images.Image2 = infoCenterImages.Image2;

                        ent.SaveChanges();
                        result = true;
                    }
                }
                else
                {
                    AppInfoCenterImage images = new AppInfoCenterImage();
                    if (!string.IsNullOrEmpty(infoCenterImages.Image1))
                        images.Image1 = infoCenterImages.Image1;

                    if (!string.IsNullOrEmpty(infoCenterImages.Image2))
                        images.Image2 = infoCenterImages.Image2;

                    ent.AppInfoCenterImages.Add(images);
                    ent.SaveChanges();
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
        public InfoCenterImages GetInfoCenterImages()
        {
            InfoCenterImages images = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                if (ent.AppInfoCenterImages.Count() > 0)
                {
                    AppInfoCenterImage img = ent.AppInfoCenterImages.First();
                    if (img != null)
                    {
                        images = new InfoCenterImages();
                        if (!string.IsNullOrEmpty(img.Image1))
                            images.Image1 = img.Image1;

                        if (!string.IsNullOrEmpty(img.Image2))
                            images.Image2 = img.Image2;
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return images;
        }

        [HttpGet]
        public List<CdRate> GetCdRates()
        {
            List<CdRate> cdRates = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                cdRates = ent.Database.SqlQuery<CdRate>("exec uspRptAppGetCDRates").ToList<CdRate>();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return cdRates;
        }

        [HttpPost]
        public int UpdateRates([FromBody] List<CdRate> rates)
        {
            int updatedRates = -1;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                DataTable createCdRatesParams = new DataTable();
                createCdRatesParams.Columns.Add("TermKey", typeof(int));
                createCdRatesParams.Columns.Add("Term", typeof(string));
                createCdRatesParams.Columns.Add("FixedRate", typeof(string));
                createCdRatesParams.Columns.Add("Callable", typeof(string));

                foreach (CdRate rate in rates)
                {
                    createCdRatesParams.Rows.Add(rate.TermKey,
                                                 rate.Term,
                                                 rate.FixedRate,
                                                 rate.Callable);
                }

                SqlParameter createRatesParam = new SqlParameter("@CDRateDetail", SqlDbType.Structured);
                createRatesParam.Value = createCdRatesParams;
                createRatesParam.TypeName = "dbo.AppCDRateDetailType";
                ent.Database.CommandTimeout = 600;
                updatedRates = ent.Database.SqlQuery<int>("exec dbo.uspRptAppInsertUpdateCDRates @CDRateDetail", createRatesParam).First();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return updatedRates;
        }

        [HttpPost]
        public List<Tenant> SearchTenant(BankFindSearchCriteria searchCriteria)
        {
            List<BankSearchResultData> result = null;
            List<Tenant> returnResult = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter bankName = new SqlParameter("@tenantName", SqlDbType.VarChar);
                SqlParameter location = new SqlParameter("@Location", SqlDbType.VarChar);
                SqlParameter certNumber = new SqlParameter("@CertNumber", SqlDbType.Int);

                if (string.IsNullOrEmpty(searchCriteria.BankName))
                    bankName.Value = string.Empty;
                else
                    bankName.Value = searchCriteria.BankName;

                if (string.IsNullOrEmpty(searchCriteria.Location))
                    location.Value = string.Empty;
                else
                    location.Value = searchCriteria.Location;

                if (string.IsNullOrEmpty(searchCriteria.CertNumber))
                    certNumber.Value = -1;
                else
                    certNumber.Value = Convert.ToInt32(searchCriteria.CertNumber);

                result = ent.Database.SqlQuery<BankSearchResultData>("exec dbo.uspRptFindTenant @tenantName, @Location, @CertNumber", bankName, location, certNumber).ToList<BankSearchResultData>();
                int totalCount = result.Count;
                int pageSizeToReturn = -1;

                if (searchCriteria.PageSize == -1)
                    pageSizeToReturn = result.Count;
                else
                    pageSizeToReturn = searchCriteria.PageSize;

                result = result.OrderBy(obj => obj.InstitutionName).ToList();

                if (result.Count > pageSizeToReturn)
                    result = result.Skip(pageSizeToReturn * (searchCriteria.PageNumber - 1)).Take(pageSizeToReturn).ToList<BankSearchResultData>();

                foreach (BankSearchResultData resultData in result)
                {
                    resultData.IsSelected = false;
                    resultData.TotalResults = totalCount;
                }

                returnResult = new List<Tenant>();
                foreach (BankSearchResultData resultData in result)
                {
                    Tenant tenObj = new Tenant();
                    tenObj.MemberSince = resultData.InsertedDateTime;
                    tenObj.AccountName = resultData.TenantName;
                    tenObj.FDICCert = resultData.CertNumber.ToString();
                    tenObj.State = resultData.InstitutionStateName;
                    tenObj.TotalAccounts = totalCount;
                    tenObj.TenantKey = resultData.TenantKey;
                    tenObj.IsActive = resultData.IsActive;
                    returnResult.Add(tenObj);
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return returnResult;
        }

        [HttpGet]
        public bool IsTenantNameAvailable(string tenantName)
        {
            bool retVal = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                tenantName = tenantName.ToLower();
                var existingTenant = ent.AppTenants.Where(obj => obj.TenantName.ToLower() == tenantName).FirstOrDefault();
                if (existingTenant == null)
                {
                    retVal = true;
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
