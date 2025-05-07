using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CBR.DataAccess;
using CBR.Web.WebCommons;
using CBR.Common;
using CBR.Web.Models;
using CBR.Web.CustomFilter;
using System.IO;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using CBR.Web.App_Storage;
using Microsoft.WindowsAzure.Storage;

namespace CBR.Web.Controllers.Api
{
    public class ProjectApiController : ApiController
    {
        [HttpGet]
        public string GetTenantName()
        {
            string retVal = string.Empty;

            try
            {
                if (UtilityFunctions.IsLoggedInUserSuperAdmin(User.Identity.Name))
                {
                    retVal = UtilityFunctions.GetDefaultBanksTenantName(User.Identity.Name);
                }
                else
                {
                    retVal = UtilityFunctions.GetTenantName(User.Identity.Name);
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        public static DateTime lastLoginDatetime;

        public IEnumerable<AppStorage> GetAllRecords(string docType, string projectType)
        {
            List<AppStorage> result = null;
            try
            {
                result = new List<AppStorage>();
                List<AppStorage> listOfFiles = new List<AppStorage>();
                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                result = ent.Database.SqlQuery<AppStorage>(string.Format("SELECT * FROM dbo.AppStorage WHERE DocumentType = '{0}' AND ProjectType = '{1}'", docType, projectType)).ToList();
            }
            catch (Exception ex)
            {
                result = new List<AppStorage>();
                ExceptionHelper.TrackException(ex);
            }

            return result;

        }

        public List<vwProjectNewDocCount> GetDocTypes(string projectType, string year)
        {
            List<vwProjectNewDocCount> result = null;

            try
            {
                lastLoginDatetime = new DateTime();
                string userName = User.Identity.Name;
                long userKey = UtilityFunctions.GetUserKey(userName);

                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var loggedInUser = ent.AppUsers.FirstOrDefault(obj => obj.UserKey == userKey);

                if (loggedInUser != null)
                {
                    DateTime.TryParse(loggedInUser.LastLoginDate != null ? ((DateTime)loggedInUser.LastLoginDate).ToString("MM/dd/yyyy HH:MM:ss") : new DateTime(2001, 01, 01).ToString("MM/dd/yyyy HH:MM:ss"), System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out lastLoginDatetime);
                    var msDates = (lastLoginDatetime - DateTime.MinValue).TotalMilliseconds;
                    //System.Web.HttpContext.Current.Session["LastLoginDate"] = lastLoginDatetime;
                }

                List<vwProjectNewDocCount> listOfFiles = new List<vwProjectNewDocCount>();
                result = new List<vwProjectNewDocCount>();
                string tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name).ToString();
                result = ent.Database.SqlQuery<vwProjectNewDocCount>(string.Format("WITH e AS" +
                                                                                        " (" +
                                                                                             " SELECT *," +
                                                                                                 " ROW_NUMBER() OVER" +
                                                                                                 " (" +
                                                                                                     " PARTITION BY FileDisplayName, DocumentType, ProjectType" +
                                                                                                     " ORDER BY CONVERT(datetime, [AuditInsertedDatetime], 101) DESC" +
                                                                                                 " ) AS Recency" +
                                                                                             " FROM [AppStorage]" +
                                                                                             " WHERE TenantKey = {4}" +
                                                                                        " )" +

                                                                                        " , ProjDocCount" +
                                                                                        " AS" +
                                                                                        "(" +
                                                                                        "    SELECT ProjectType, DocumentType, COUNT(FileId) AS DocCount FROM e" +
                                                                                        "    WHERE AuditInsertedDateTime > '{0}' AND AuditInsertedBy != '{1}' AND YEAR(AuditInsertedDateTime) = {2} AND Recency = 1 " +
                                                                                        "    GROUP BY ProjectType, DocumentType" +
                                                                                        " )" +
                                                                                        " SELECT A.ProjectType, A.DocumentType, A.DocumentDisplayName, ISNULL(DocCount, 0) AS NewDocCount" +
                                                                                        " FROM AppProjectInfo A" +
                                                                                        " LEFT JOIN ProjDocCount P on A.ProjectType = P.ProjectType AND A.DocumentType = P.DocumentType" +
                                                                                        " WHERE A.ProjectType = '{3}' ", lastLoginDatetime.ToString("MM/dd/yyyy HH:MM:ss"), userName, year, projectType, tenantKey)
                                                                         ).ToList();
            }
            catch (Exception ex)
            {
                result = new List<vwProjectNewDocCount>();
                ExceptionHelper.TrackException(ex);
            }
            return result;

        }

        [HttpGet]
        public List<ProjectDocument> GetDocuments(string docType, string projectType, string year, int pageSize, int pageNumber)
        {
            List<ProjectDocument> result = null;
            long tenantKey = -1;

            if (UtilityFunctions.IsLoggedInUserSuperAdmin(User.Identity.Name))
            {
                tenantKey = Convert.ToInt64(UtilityFunctions.GetDefaultBanksTenantKey(User.Identity.Name));
            }
            else
            {
                tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name);
            }

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                List<AppStorage> listOfFiles = new List<AppStorage>();
                List<AppStorage> resultDocuments = new List<AppStorage>();
                resultDocuments = ent.Database.SqlQuery<AppStorage>(string.Format(" WITH e AS" +
                                                                        " (" +
                                                                             " SELECT *," +
                                                                                 " ROW_NUMBER() OVER" +
                                                                                 " (" +
                                                                                     " PARTITION BY FileDisplayName, DocumentType, ProjectType" +
                                                                                     " ORDER BY CONVERT(datetime, [AuditInsertedDatetime], 101) DESC" +
                                                                                 " ) AS Recency" +
                                                                             " FROM [AppStorage]" +
                                                                        " )" +
                                                                        " SELECT *" +
                                                                        " FROM e" +
                                                                        " WHERE Recency = 1" +
                                                                        " AND DocumentType = '{0}'" +
                                                                        " AND ProjectType = '{1}' AND TenantKey = {2} AND year(CONVERT(datetime, [AuditInsertedDatetime], 101)) = {3} ORDER BY CONVERT(datetime, [AuditInsertedDatetime], 101) DESC", docType, projectType, tenantKey, year)
                                                                         ).ToList();

                if (resultDocuments != null && resultDocuments.Count > 0)
                {
                    result = new List<ProjectDocument>();
                    foreach (AppStorage appStorage in resultDocuments)
                    {
                        ProjectDocument projectDocument = new ProjectDocument();
                        projectDocument.ActualFileSizeInBytes = appStorage.ActualFileSizeInBytes;
                        projectDocument.AuditInsertedBy = appStorage.AuditInsertedBy;
                        projectDocument.AuditInsertedDatetime = appStorage.AuditInsertedDatetime;
                        projectDocument.AuditLastUpdatedBy = appStorage.AuditLastUpdatedBy;
                        projectDocument.AuditLastUpdatedDatetime = appStorage.AuditLastUpdatedDatetime;
                        projectDocument.AuthorName = appStorage.AuthorName;
                        projectDocument.DisplayDate = appStorage.DisplayDate;
                        projectDocument.DocumentType = appStorage.DocumentType;
                        projectDocument.FileDisplayName = appStorage.FileDisplayName;
                        projectDocument.FileId = appStorage.FileId;
                        projectDocument.FileName = appStorage.FileName;
                        projectDocument.FileSize = appStorage.FileSize;
                        projectDocument.ProjectType = appStorage.ProjectType;
                        projectDocument.TenantKey = appStorage.TenantKey;
                        projectDocument.TotalDocuments = resultDocuments.Count;
                        result.Add(projectDocument);
                    }
                    int pageSizeToReturn = -1;

                    if (pageSize == -1)
                        pageSizeToReturn = result.Count;
                    else
                        pageSizeToReturn = pageSize;

                    result = result.Skip(pageSizeToReturn * (pageNumber - 1)).Take(pageSizeToReturn).ToList<ProjectDocument>();
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        public int UploadFileInformationInDB(AppStorage record)
        {
            int retVal = -1;
            try
            {
                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                AppStorage app = new AppStorage();

                ent.AppStorages.Add(record);
                retVal = ent.SaveChanges();
                ent.Entry(record).GetDatabaseValues();
                retVal = record.FileId;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage DownloadProjectFile(ProjectFileDownloadParameters projectFileDownloadParameters)
        {
            HttpResponseMessage result = null;
            string tenantName = string.Empty;
            string tenantKey = string.Empty;
            string contentType = string.Empty;
            string contentLength = string.Empty;

            if (UtilityFunctions.IsLoggedInUserSuperAdmin(User.Identity.Name))
            {
                tenantName = UtilityFunctions.GetDefaultBanksTenantName(User.Identity.Name);
                tenantKey = UtilityFunctions.GetDefaultBanksTenantKey(User.Identity.Name);
            }
            else
            {
                tenantName = UtilityFunctions.GetTenantName(User.Identity.Name);
                tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name).ToString();
            }

            tenantName = string.Join("", tenantName.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries)).ToLower();
            tenantName = Regex.Replace(tenantName, @"[^\w\d]", "");

            try
            {
                byte[] stream = AzureStorage.DownloadFileFromAzureStorage(projectFileDownloadParameters.FileName, tenantName + tenantKey, out contentType, out contentLength);
                result = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream)
                };
                result.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);
                result.Content.Headers.ContentLength = Convert.ToInt64(contentLength);
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = projectFileDownloadParameters.FileName,
                    Size = Convert.ToInt64(contentLength)
                };
            }
            catch (StorageException storageEx)
            {
                // Log detailed storage exception
                ExceptionHelper.TrackException(storageEx);
                result = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent("An error occurred while accessing Azure Storage. Please try again later.")
                };
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
                result = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent("An unexpected error occurred. Please try again later.")
                };
            }

            return result;
        }


        [HttpPost]
        public bool DeleteFile(ProjectFileDownloadParameters projectFileDownloadParameters)
        {
            bool retVal = false;
            try
            {
                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                var appStorage = ent.AppStorages.Where(obj => obj.FileId == projectFileDownloadParameters.FileId).FirstOrDefault();
                if (appStorage != null)
                {
                    var deletedEntity = ent.AppStorages.Remove(appStorage);
                    ent.SaveChanges();
                    string tenantName = string.Empty;
                    string tenantKey = string.Empty;
                    if (UtilityFunctions.IsLoggedInUserSuperAdmin(User.Identity.Name))
                    {
                        tenantName = UtilityFunctions.GetDefaultBanksTenantName(User.Identity.Name);
                        tenantKey = UtilityFunctions.GetDefaultBanksTenantKey(User.Identity.Name);
                    }
                    else
                    {
                        tenantName = UtilityFunctions.GetTenantName(User.Identity.Name);
                        tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name).ToString();
                    }

                    tenantName = string.Join("", tenantName.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries)).ToLower();
                    tenantName = Regex.Replace(tenantName, @"[^\w\d]", "");
                    retVal = AzureStorage.DeleteFileFromAzureStorage(projectFileDownloadParameters.FileName, tenantName + tenantKey);
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