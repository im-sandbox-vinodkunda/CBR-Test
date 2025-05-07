using CBR.DataAccess;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace CBR.Web.Controllers.Api
{
    [RoutePrefix("api/DataRefresh")]
    public class DataRefreshController : ApiController
    {
        CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();

        [HttpGet]
        public List<ReportDates> GetReportDates()
        {
            List<ReportDates> lstReportDates = new List<ReportDates>();
            var lstDataRefreshTimePeriods = ent.DataRefreshTimePeriods.Where(c => c.IsStdGrpInstFilesDownloaded == false).OrderBy(c => c.PeriodId).ToList();
            //for (int i = 0; i < lstDataRefreshTimePeriods.Count; i++)
            //{
            //    ReportDates reportDates = new ReportDates();
            //    reportDates.FolderName = lstDataRefreshTimePeriods[i].QuarterName;
            //    reportDates.ReportDate = lstDataRefreshTimePeriods[i].QuarterDate.Replace("-", "/");
            //    lstReportDates.Add(reportDates);
            //}
            if (lstDataRefreshTimePeriods.Count > 0)
            {
                ReportDates reportDates = new ReportDates();
                reportDates.FolderName = lstDataRefreshTimePeriods[0].QuarterName;
                reportDates.ReportDate = lstDataRefreshTimePeriods[0].QuarterDate.Replace("-", "/");
                lstReportDates.Add(reportDates);
            }
            return lstReportDates;
        }

        [HttpGet]
        public List<ReportDates> GetReportYears()
        {
            List<ReportDates> lstReportDates = new List<ReportDates>();
            var lstDataRefreshTimePeriods = ent.DataRefreshTimePeriods.ToList();
            string[] strArrayUniqIds = new string[8];
            for (int i = 0; i < lstDataRefreshTimePeriods.Count; i++)
            {
                if (!strArrayUniqIds.Contains(lstDataRefreshTimePeriods[i].QuarterYear))
                {
                    ReportDates reportDates = new ReportDates();
                    reportDates.FolderName = lstDataRefreshTimePeriods[i].QuarterYear;
                    reportDates.ReportDate = lstDataRefreshTimePeriods[i].QuarterYear;
                    lstReportDates.Add(reportDates);
                    strArrayUniqIds[i] = lstDataRefreshTimePeriods[i].QuarterYear;
                }
            }
            return lstReportDates;
        }

        [HttpGet]
        public List<QuarterCertNumbers> GetFileNamesForAllQuarters()
        {
            List<QuarterCertNumbers> lstQuarterCertNumbers = new List<QuarterCertNumbers>();
            var lstDataRefreshTimePeriods = ent.DataRefreshTimePeriods.ToList();
            string[] strArrayUniqIds = new string[8];
            string fileNames = "";
            for (int i = 0; i < lstDataRefreshTimePeriods.Count; i++)
            {
                fileNames = getFileNames(lstDataRefreshTimePeriods[i].QuarterName);
                if (!string.IsNullOrEmpty(fileNames))
                {
                    QuarterCertNumbers quarterCertNumbers = new QuarterCertNumbers();
                    quarterCertNumbers.CertNumbers = fileNames;
                    quarterCertNumbers.QuarterName = lstDataRefreshTimePeriods[i].QuarterName;
                    lstQuarterCertNumbers.Add(quarterCertNumbers);
                }
            }
            return lstQuarterCertNumbers;
        }
        public static string getFileNames(string folderName)
        {
            string path = @"D:\CBR_Docs\DataRefresh\CallData files\" + folderName;
            List<string> certNumbers = new List<string>();
            if (Directory.Exists(path))
            {
                DirectoryInfo dir = new DirectoryInfo(path);
                var directoryFiles = dir.GetFiles();
                foreach (FileInfo flInfo in directoryFiles)
                {
                    var certNumber = flInfo.Name.Split(',')[0].Split()[3];
                    if (certNumber != "" && Regex.IsMatch(certNumber, @"^\d+$"))
                    {
                        certNumbers.Add(certNumber);
                    }
                }
            }
            return string.Join(",", certNumbers);
        }

        [HttpPost]
        public bool UpdateStndGrpInstFilesFilesDownloadedByScript(string quarter)
        {
            bool isSuccess = true;
            try
            {
                SqlParameter quarterName = new SqlParameter("@QuarterName", SqlDbType.VarChar);
                quarterName.Value = quarter;
                ent.Database.SqlQuery<int>("exec dbo.uspUpdateStndGrpInstFilesDownloadedByScript @QuarterName", quarterName).First();
            }
            catch (Exception)
            {
                isSuccess = false;
            }
            return isSuccess;
        }

        [HttpPost]
        public bool UpdateStndGrpInstFilesFilesDownloadedByScriptStarted(string quarter)
        {
            bool isSuccess = true;
            try
            {
                SqlParameter quarterName = new SqlParameter("@QuarterName", SqlDbType.VarChar);
                quarterName.Value = quarter;
                ent.Database.SqlQuery<int>("exec dbo.uspUpdateStndGrpInstFilesFilesDownloadedByScriptStarted @QuarterName", quarterName).First();
            }
            catch (Exception)
            {
                isSuccess = false;
            }
            return isSuccess;
        }

        [HttpPost]
        public bool UpdateStatFilesDownloadedByScript()
        {
            bool isSuccess = true;
            try
            {
                ent.Database.SqlQuery<int>("exec dbo.uspUpdateStatFilesDownloadedByScript").First();
            }
            catch (Exception)
            {
                isSuccess = false;
            }
            return isSuccess;
        }

        [HttpPost]
        public bool UpdateInstFilesDownloadedByScript()
        {
            bool isSuccess = true;
            try
            {
                ent.Database.SqlQuery<int>("exec dbo.uspUpdateInstFilesDownloadedByScript").First();
            }
            catch (Exception)
            {
                isSuccess = false;
            }
            return isSuccess;
        }

        [HttpPost]
        public bool UpdateTimePeriodFilesAvailableByScript(string quarter)
        {
            bool isSuccess = true;
            try
            {
                SqlParameter quarterName = new SqlParameter("@QuarterName", SqlDbType.VarChar);
                quarterName.Value = quarter;
                ent.Database.SqlQuery<int>("exec dbo.uspUpdateTimePeriodFilesAvailable @QuarterName", quarterName).First();
            }
            catch (Exception)
            {
                isSuccess = false;
            }
            return isSuccess;
        }
    }

    public class ReportDates
    {
        public string ReportDate { get; set; }
        public string FolderName { get; set; }
    }

    public class QuarterCertNumbers
    {
        public string CertNumbers { get; set; }
        public string QuarterName { get; set; }
    }
}
