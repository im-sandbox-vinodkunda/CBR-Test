using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using CBR.DataAccess;
using CBR.Common;
using CBR.Web.CustomFilter;
using System.Net.Http.Headers;
using CBR.Web.WebCommons;
using CBR.Web.ExportToExcel;

namespace CBR.Web.Controllers.Api
{
    public class CallReportAnalyzerApiController : ApiController
    {
        [HttpPost]
        public List<CallReportData> GetCallReportData(CallReportDataRequest callReportDataRequest)
        {
            List<CallReportData> callReportData = null;
            try
            {
                string lastQuarterString = CommonFunctions.GetLastQuarterString();
                string month = lastQuarterString.Substring(4, 2);
                string year = lastQuarterString.Substring(0, 4);
                string day = lastQuarterString.Substring(6, 2);
                DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));

                string latestQuarterMonth = string.Empty;
                if (latestQuarterDate.Month < 10)
                    latestQuarterMonth = "0" + latestQuarterDate.Month.ToString();
                else
                    latestQuarterMonth = latestQuarterDate.Month.ToString();

                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter instKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                SqlParameter tabName = new SqlParameter("@TabName", SqlDbType.VarChar);
                SqlParameter qtdOrYtd = new SqlParameter("@QTDorYTD", SqlDbType.VarChar);
                qtdOrYtd.Value = callReportDataRequest.QtdOrYtd;
                instKey.Value = callReportDataRequest.InstitutionKey;
                tabName.Value = callReportDataRequest.TabName;
                var rawData = ent.Database.SqlQuery<CallReportRawData>("exec dbo.uspRptCallReportDashboardConcepts @InstitutionKey, @TabName, @QTDorYTD", instKey, tabName, qtdOrYtd).ToList();
                if (rawData != null && rawData.Count > 0)
                {
                    callReportData = new List<Models.CallReportData>();
                    foreach (CallReportRawData rawDataItem in rawData)
                    {
                        CallReportData dataObj = new CallReportData();
                        dataObj.Id = rawDataItem.Id;
                        dataObj.Label = rawDataItem.Description;
                        dataObj.NoClicked = rawDataItem.IsExpandable;
                        dataObj.Opened = true;
                        dataObj.Date0 = rawDataItem.Year_1;
                        dataObj.Date1 = rawDataItem.Year_2;
                        dataObj.Date2 = rawDataItem.Year_3;
                        dataObj.Date3 = rawDataItem.Year_4;
                        dataObj.Date4 = rawDataItem.Year_5;

                        dataObj.Bold = rawDataItem.IsBold.HasValue ? rawDataItem.IsBold.Value : false;
                        if (rawDataItem.ParentId != null)
                        {
                            this.FindParent(rawDataItem.ParentId, callReportData, dataObj);
                            //parentdataObj.Children.Add(dataObj);
                        }
                        else
                        {
                            callReportData.Add(dataObj);
                        }
                    }

                    if (callReportDataRequest.QtdOrYtd == "YTD")
                        callReportData[0].Date4 = CommonFunctions.GetYearlyLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString());
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return callReportData;
        }

        private void FindParent(int? parentId, List<CallReportData> dataList, CallReportData dataObj)
        {
            foreach (CallReportData dataItem in dataList)
            {
                if (dataItem.Children != null)
                {
                    this.FindParent(parentId, dataItem.Children, dataObj);
                }
                if (dataItem.Id == parentId)
                {
                    dataItem.Children.Add(dataObj);
                    break;
                }
            }
        }
        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage ExportToExcelCallReportTabs(CallReportDataRequestParams callReportDataRequest)
        {
            byte[] excelBytes = null;
            try
            {
                List<DataTable> crTables = new List<DataTable>();
                var n = 0;
                foreach (var tab in callReportDataRequest.TabNames)
                {                    
                    CallReportDataRequest obj = new CallReportDataRequest();
                    obj.InstitutionKey = callReportDataRequest.InstitutionKey;
                    obj.TabName = tab;
                    obj.QtdOrYtd = callReportDataRequest.QtdOrYtd;
                    List<CallReportData> GetCallReportData = this.GetCallReportData(obj);

                    DataTable callReport = new DataTable();
                    callReport.TableName = callReportDataRequest.SelectedTabNames[n];
                    if (GetCallReportData != null)
                    {                       
                        //callreport columns
                        callReport.Columns.Add(GetCallReportData[0].Label);
                        callReport.Columns.Add(GetCallReportData[0].Date0);
                        callReport.Columns.Add(GetCallReportData[0].Date1);
                        callReport.Columns.Add(GetCallReportData[0].Date2);
                        callReport.Columns.Add(GetCallReportData[0].Date3);
                        callReport.Columns.Add(GetCallReportData[0].Date4);

                        //callReport rows
                        foreach (var crRows in GetCallReportData)
                        {
                            if (GetCallReportData[0].Date0 != crRows.Date0)
                            {
                                DataRow callReportrow1 = callReport.NewRow();
                                callReportrow1[GetCallReportData[0].Label] = GetTabOrder(0, crRows.Label);
                                callReportrow1[GetCallReportData[0].Date0] = crRows.Date0;
                                callReportrow1[GetCallReportData[0].Date1] = crRows.Date1;
                                callReportrow1[GetCallReportData[0].Date2] = crRows.Date2;
                                callReportrow1[GetCallReportData[0].Date3] = crRows.Date3;
                                callReportrow1[GetCallReportData[0].Date4] = crRows.Date4;
                                callReport.Rows.Add(callReportrow1);
                                if (crRows.Children.Count > 0)
                                {
                                    AppendChildernReports(callReport, crRows.Children, GetCallReportData[0].Label, 1);
                                    DataRow callReportrow2 = callReport.NewRow();
                                }
                            }
                        }
                        crTables.Add(callReport);
                    }
                    n++;
                }

                DataTable[] metricArr = new DataTable[crTables.Count];
                for (int i = 0; i < crTables.Count; i++)
                {
                    metricArr[i] = crTables[i];
                }
                BankProfileOverviewParams bankdata = new BankProfileOverviewParams();
                bankdata.InstitutionKey = Convert.ToInt32(callReportDataRequest.InstitutionKey);
                var Bankfinalres = this.GetBankProfileIntroductionData(bankdata);
                excelBytes = CallReportExportToExcel.CreateExcelDocument(metricArr, "BenchMarking.xlsx", Bankfinalres, callReportDataRequest.TabTitle);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(excelBytes);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ms-excel");
            result.Content.Headers.ContentLength = excelBytes.Length;
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = callReportDataRequest.TabTitle+".xlsx";
            result.Content.Headers.ContentDisposition.Size = excelBytes.Length;
            return result;
        }

        public static void AppendChildernReports(DataTable dt, List<CallReportData> data, String label, int hierarchy)
        {
            foreach (var item in data)
            {
                DataRow callReportrow3 = dt.NewRow();
                callReportrow3[label] = GetTabOrder(hierarchy, item.Label);
                callReportrow3[dt.Columns[1]] = item.Date0;
                callReportrow3[dt.Columns[2]] = item.Date1;
                callReportrow3[dt.Columns[3]] = item.Date2;
                callReportrow3[dt.Columns[4]] = item.Date3;
                callReportrow3[dt.Columns[5]] = item.Date4;
                dt.Rows.Add(callReportrow3);

                if (item.Children != null && item.Children.Any())
                    AppendChildernReports(dt, item.Children, label, hierarchy + 1);
            }
        }

        public static string GetTabOrder(int? tabOrder, string description)
        {
            if (tabOrder.HasValue && tabOrder.Value >= 1)
            {
                var tab = "\t \t \t \t";
                while (tabOrder.Value > 0)
                {
                    tabOrder = tabOrder.Value - 1;
                    tab += " " + tab;
                }
                return tab + description;
            }
            return description;
        }
        private BankProfileIntroductionData GetBankProfileIntroductionData(BankProfileOverviewParams profileParams)
        {
            List<BankProfileIntroductionData> profiles = null;
            BankProfileIntroductionData profile = null;
            try
            {
                if (profileParams.InstitutionKey == 0)
                    profileParams.InstitutionKey = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);

                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                profiles = ent.Database.SqlQuery<BankProfileIntroductionData>(string.Format("SELECT * FROM dbo.udfRptGetBankProfileDetails ({0})", profileParams.InstitutionKey.ToString())).ToList();
                if (profiles.Count > 0)
                {
                    profile = profiles[0];
                    if (!string.IsNullOrEmpty(profile.WebAddress))
                    {
                        if (!profile.WebAddress.Contains("http"))
                            profile.WebAddress = "http://" + profile.WebAddress;
                    }
                    else
                    {
                        profile.WebAddress = "#";
                    }

                    profile.InstitutionKey = profileParams.InstitutionKey;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return profile;
        }
    }
}
