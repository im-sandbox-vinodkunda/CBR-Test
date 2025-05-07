using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CBR.Web.Controllers.Api;
using CBR.Web.App_Storage;
using CBR.DataAccess;
using CBR.Web.Models;
using System.Web.Script.Serialization;
using CBR.Web.WebCommons;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using CBR.Common;
using System.Text.RegularExpressions;

namespace CBR.Web.Controllers
{
    [Authorize]
    public class ProjectController : Controller
    {
        public ActionResult ProjectView(string viewName, string tag = "")
        {
            ViewData.Add("activeView", viewName);
            ViewData.Add("tag", tag);

            //var docTypes = new ProjectsStorage().GetDocTypes(viewName);

            var model = new ProjectsViewModel();
            model.DocsTypes = new ProjectApiController().GetDocTypes(viewName, DateTime.Now.Year.ToString());
            model.YearList.Add(new SelectListItem() { Text = "2017", Value = "2017", Selected = true });
            model.YearList.Add(new SelectListItem() { Text = "2016", Value = "2016" });
            model.YearList.Add(new SelectListItem() { Text = "2015", Value = "2015" });
            model.YearList.Add(new SelectListItem() { Text = "2014", Value = "2014" });
            model.YearList.Add(new SelectListItem() { Text = "2013", Value = "2013" });
            model.YearList.Add(new SelectListItem() { Text = "2012", Value = "2012" });


            HttpCookie cookie = new HttpCookie("lastLogin");
            cookie.Value = ProjectApiController.lastLoginDatetime.ToString();
            Response.Cookies.Add(cookie);

            //Session["type"] = docTypes;
            ViewData.Add("type", model);

            return View("Project", model);
        }

        public ActionResult ProjectDocumentView(string viewName, string tag, string docType, string year, string index)
        {
            ViewData.Add("activeView", viewName);
            ViewData.Add("tag", tag);

            ViewData.Add("docType", docType);
            ViewData.Add("selectedYear", year);

            HttpCookie doc = new HttpCookie("docType");
            doc.Value = docType;
            HttpCookie proj = new HttpCookie("projType");
            proj.Value = viewName;
            HttpCookie sYear = new HttpCookie("sYear");
            sYear.Value = year;

            Response.Cookies.Add(doc);
            Response.Cookies.Add(proj);
            Response.Cookies.Add(sYear);

            var model = new ProjectsViewModel();
            model.DocsTypes = new ProjectApiController().GetDocTypes(viewName, string.IsNullOrEmpty(year) ? DateTime.Now.Year.ToString() : year);
            model.YearList.Add(new SelectListItem() { Text = "2017", Value = "2017", Selected = true });
            model.YearList.Add(new SelectListItem() { Text = "2016", Value = "2016" });
            model.YearList.Add(new SelectListItem() { Text = "2015", Value = "2015" });
            model.YearList.Add(new SelectListItem() { Text = "2014", Value = "2014" });
            model.YearList.Add(new SelectListItem() { Text = "2013", Value = "2013" });
            model.YearList.Add(new SelectListItem() { Text = "2012", Value = "2012" });

            return View("Project", model);
        }

        public ActionResult ProjectDocument(string viewName, string tag, string docType, string year)
        {
            ViewData.Add("activeView", viewName);
            ViewData.Add("tag", tag);

            ViewData.Add("docType", docType);
            ViewData.Add("selectedYear", year);

            HttpCookie doc = new HttpCookie("docType");
            doc.Value = docType;
            HttpCookie proj = new HttpCookie("projType");
            proj.Value = viewName;
            HttpCookie sYear = new HttpCookie("sYear");
            sYear.Value = year;

            Response.Cookies.Add(doc);
            Response.Cookies.Add(proj);
            Response.Cookies.Add(sYear);

            //var type = Session["type"];
            var model = new ProjectsViewModel();
            model.DocsTypes = new ProjectApiController().GetDocTypes(viewName, string.IsNullOrEmpty(year) ? DateTime.Now.Year.ToString() : year);
            model.YearList.Add(new SelectListItem() { Text = "2017", Value = "2017", Selected = true });
            model.YearList.Add(new SelectListItem() { Text = "2016", Value = "2016" });
            model.YearList.Add(new SelectListItem() { Text = "2015", Value = "2015" });
            model.YearList.Add(new SelectListItem() { Text = "2014", Value = "2014" });
            model.YearList.Add(new SelectListItem() { Text = "2013", Value = "2013" });
            model.YearList.Add(new SelectListItem() { Text = "2012", Value = "2012" });

            return PartialView("ProjectYear", model);
        }

        public HttpResponseBase DownloadFile(string filename, string dType, string projType)
        {
            string contentType = string.Empty;
            string contentLength = string.Empty;

            try
            {
                if (!string.IsNullOrEmpty(filename))
                {
                    string docType = dType.ToLower();
                    string projectType = projType.ToLower();
                    string tenantName = UtilityFunctions.GetTenantName(User.Identity.Name);
                    string tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name).ToString();

                    tenantName = string.Join("", tenantName.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries)).ToLower();
                    tenantName = Regex.Replace(tenantName, @"[^\w\d]", "");

                    //string containerName = string.Join("", projectType.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries))
                    //+ string.Join("", docType.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries));

                    byte[] stream = AzureStorage.DownloadFileFromAzureStorage(filename, tenantName + tenantKey, out contentType, out contentLength);

                    Response.ContentType = contentType;
                    Response.AddHeader("Content-Disposition", "Attachment; filename=" + filename);// + blobName.ToString());
                    Response.AddHeader("Content-Length", contentLength);
                    Response.BinaryWrite(stream);
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            finally
            {
                HttpCookie cookie = new HttpCookie("fileDownloaded");
                cookie.Value = "success";
                Response.Cookies.Add(cookie);

                Response.Flush();
                Response.End();
            }

            return Response;
        }

        public HttpResponseBase ExportToExcel(string searchCriteria)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            try
            {
                BankFindSearchCriteria searchCr = serializer.Deserialize<BankFindSearchCriteria>(searchCriteria);
                string fileName = "BankSearchResults.xlsx";
                byte[] stream = new PeerGroupsApiController().ExportToExcel(searchCr, fileName);

                Response.ContentType = "application/vnd.ms-excel";
                Response.AddHeader("Content-Disposition", "Attachment; filename=" + fileName);
                Response.AddHeader("Content-Length", stream.Length.ToString());
                Response.BinaryWrite(stream);

            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            finally
            {
                HttpCookie cookie = new HttpCookie("fileDownloaded");
                cookie.Value = "success";
                Response.Cookies.Add(cookie);

                Response.Flush();
                Response.End();
            }

            return Response;
        }

        public ActionResult UploadFile(string docType, string projectType)
        {
            bool isSavedSuccessfully = true;
            string fName = string.Empty;
            AppStorage record = null;
            ProjectApiController storeFile = new ProjectApiController();
            string tenantName = string.Empty;
            string tenantKey = string.Empty;
            try
            {
                string userName = HttpContext.User.Identity.Name;
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

                //string containerName = string.Join("", projectType.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries))
                //    + string.Join("", docType.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries));

                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[fileName];
                    //Save file content goes here
                    fName = file.FileName;
                    if (file != null && file.ContentLength > 0)
                    {
                        record = new AppStorage();
                        record.DocumentType = docType;
                        record.ProjectType = projectType;
                        record.AuthorName = userName;
                        record.FileDisplayName = fName;
                        record.FileSize = BytesToString(file.ContentLength);
                        record.ActualFileSizeInBytes = file.ContentLength;
                        record.AuditInsertedDatetime = DateTime.Now;
                        record.AuditInsertedBy = userName;
                        record.AuditLastUpdatedDatetime = DateTime.Now;
                        record.DisplayDate = DateTime.Now.ToString("MMMM d, yyyy");
                        record.AuditLastUpdatedBy = userName;
                        record.TenantKey = Int32.Parse(tenantKey);
                        int fileID = storeFile.UploadFileInformationInDB(record);

                        if (fileID > -1)
                        {
                            try
                            {
                                var stauts = AzureStorage.UploadFileToAzureStorage(fileID.ToString() + "_" + fName, file.InputStream, tenantName + tenantKey);
                                if (!stauts)
                                {
                                    CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                                    var appStorage = ent.AppStorages.Where(obj => obj.FileId == fileID).FirstOrDefault();
                                    if (appStorage != null)
                                    {
                                        var deletedEntity = ent.AppStorages.Remove(appStorage);
                                        ent.SaveChanges();
                                    }
                                }
                            }
                            catch (Exception ex)
                            {
                                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                                var appStorage = ent.AppStorages.Where(obj => obj.FileId == fileID).FirstOrDefault();
                                if (appStorage != null)
                                {
                                    var deletedEntity = ent.AppStorages.Remove(appStorage);
                                    ent.SaveChanges();
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
                isSavedSuccessfully = false;
            }

            if (isSavedSuccessfully)
            {
                return Json(new { Message = fName });
            }
            else
            {
                return Json(new { Message = "Error in saving file" });
            }
        }

        static String BytesToString(long byteCount)
        {
            string[] suf = { "B", "kb", "MB", "GB", "TB", "PB" };
            if (byteCount == 0)
                return "0" + suf[0];
            long bytes = Math.Abs(byteCount);
            int place = Convert.ToInt32(Math.Floor(Math.Log(bytes, 1024)));
            double num = Math.Round(bytes / Math.Pow(1024, place), 1);
            return (Math.Sign(byteCount) * num).ToString() + suf[place];
        }

        public JsonResult GetDocuments(string docType, string projectType, string selYear)
        {
            int selectedYear;

            List<AppStorage> result = null;
            try
            {
                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();

                Int32.TryParse(!string.IsNullOrEmpty(selYear) ? selYear : DateTime.Now.Year.ToString(), out selectedYear);

                if (selectedYear == 0)
                {
                    result = ent.AppStorages.OrderByDescending(o => o.AuditInsertedDatetime).GroupBy(o => new { o.FileDisplayName, o.DocumentType, o.ProjectType }).Select(n => n.FirstOrDefault()).Where(doc => doc.DocumentType == docType && doc.ProjectType == projectType).ToList();
                }
                else
                {
                    string tenantKey = UtilityFunctions.GetDefaultBanksTenantKey(User.Identity.Name);
                    //result = new ProjectApiController().GetDocuments(docType, projectType, selectedYear.ToString(), tenantKey);
                }
            }
            catch (Exception ex)
            {
                result = new List<AppStorage>();
                ExceptionHelper.TrackException(ex);
            }

            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public HttpResponseBase DownloadPerformanceAnalysis(string perfAnalysisParameters)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            try
            {
                BankPerformanceMetricParams perfMetricParams = serializer.Deserialize<BankPerformanceMetricParams>(perfAnalysisParameters);
                Regex pattern = new Regex("[()&-/%]");
                string fileName = pattern.Replace(perfMetricParams.KPIName, string.Empty);
                fileName = fileName + ".xlsx";
                byte[] stream = new PerformanceComparisonApiController().ExportToExcel(perfMetricParams, fileName);
                Response.ContentType = "application/vnd.ms-excel";
                Response.AddHeader("Content-Disposition", "Attachment; filename=" + fileName);
                Response.AddHeader("Content-Length", stream.Length.ToString());
                Response.BinaryWrite(stream);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            finally
            {
                HttpCookie cookie = new HttpCookie("fileDownloaded");
                cookie.Value = "success";
                Response.Cookies.Add(cookie);

                Response.Flush();
                Response.End();
            }

            return Response;
        }

        public HttpResponseBase DownloadSingleBankProfile(string downloadBankProfileParams)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                BankProfileOverviewParams bankProfilePdfParams = serializer.Deserialize<BankProfileOverviewParams>(downloadBankProfileParams);
                //Aspose.Pdf.Document pdfDocument = new BankProfileOverviewApiController().GetPdfOfBankProfile(bankProfilePdfParams);
                MemoryStream pdfStream = new MemoryStream();
                //pdfDocument.Save(pdfStream);
                byte[] data1 = new byte[pdfStream.Length];
                pdfStream.Read(data1, 0, data1.Length);
                Response.ContentType = "application/pdf";
                Response.AddHeader("Content-Disposition", "Attachment; filename=" + bankProfilePdfParams.InstitutionKey.ToString() + ".pdf");
                Response.AddHeader("Content-Length", pdfStream.Length.ToString());
                Response.BinaryWrite(data1);
                pdfStream.Close();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            finally
            {
                HttpCookie cookie = new HttpCookie("fileDownloaded");
                cookie.Value = "success";
                Response.Cookies.Add(cookie);

                Response.Flush();
                Response.End();
            }

            return Response;
        }

        public ActionResult Projects(string viewName, string tag = "")
        {
            return View();
        }

    }
}