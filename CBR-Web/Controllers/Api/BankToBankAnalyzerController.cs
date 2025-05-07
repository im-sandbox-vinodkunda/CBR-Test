using CBR.Common;
using CBR.DataAccess;
using CBR.Web.CustomFilter;
using CBR.Web.ExportToExcel;
using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace CBR.Web.Controllers.Api
{
    public class BankToBankAnalyzerController : ApiController
    {
        [HttpGet]
        public List<FinancialPeriod> GetLastFiveQuarters()
        {
            Dictionary<string, string> fourQuarters = new Dictionary<string, string>();
            fourQuarters.Add("03/31", "Q1");
            fourQuarters.Add("06/30", "Q2");
            fourQuarters.Add("09/30", "Q3");
            fourQuarters.Add("12/31", "Q4");
            Dictionary<string, List<KeyValuePair<string, int>>> previousQuarters = new Dictionary<string, List<KeyValuePair<string, int>>>();
            List<KeyValuePair<string, int>> prevQuarters = new List<KeyValuePair<string, int>>();
            prevQuarters.Add(new KeyValuePair<string, int>("Q4", 1));
            prevQuarters.Add(new KeyValuePair<string, int>("Q3", 1));
            prevQuarters.Add(new KeyValuePair<string, int>("Q2", 1));
            prevQuarters.Add(new KeyValuePair<string, int>("Q1", 1));
            previousQuarters.Add("Q1", prevQuarters);

            prevQuarters = new List<KeyValuePair<string, int>>();
            prevQuarters.Add(new KeyValuePair<string, int>("Q1", 0));
            prevQuarters.Add(new KeyValuePair<string, int>("Q4", 1));
            prevQuarters.Add(new KeyValuePair<string, int>("Q3", 1));
            prevQuarters.Add(new KeyValuePair<string, int>("Q2", 1));
            previousQuarters.Add("Q2", prevQuarters);

            prevQuarters = new List<KeyValuePair<string, int>>();
            prevQuarters.Add(new KeyValuePair<string, int>("Q2", 0));
            prevQuarters.Add(new KeyValuePair<string, int>("Q1", 0));
            prevQuarters.Add(new KeyValuePair<string, int>("Q4", 1));
            prevQuarters.Add(new KeyValuePair<string, int>("Q3", 1));
            previousQuarters.Add("Q3", prevQuarters);

            prevQuarters = new List<KeyValuePair<string, int>>();
            prevQuarters.Add(new KeyValuePair<string, int>("Q3", 0));
            prevQuarters.Add(new KeyValuePair<string, int>("Q2", 0));
            prevQuarters.Add(new KeyValuePair<string, int>("Q1", 0));
            prevQuarters.Add(new KeyValuePair<string, int>("Q4", 1));
            previousQuarters.Add("Q4", prevQuarters);

            List<FinancialPeriod> periods = new List<FinancialPeriod>();
            string lastQuarterString = CommonFunctions.GetLastQuarterString();
            string month = lastQuarterString.Substring(4, 2);
            string year = lastQuarterString.Substring(0, 4);
            string day = lastQuarterString.Substring(6, 2);
            string currentQuarter = fourQuarters[month + "/" + day];
            List<KeyValuePair<string, int>> prevQuartersToAdd = previousQuarters[currentQuarter];
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));

            string monthAndDayKey = string.Empty;
            foreach(string key in fourQuarters.Keys)
            {
                if(string.Compare(prevQuartersToAdd[0].Key, fourQuarters[key]) == 0)
                {
                    monthAndDayKey = key;
                    break;
                }
            }
            
            string minus1QuarteDate = monthAndDayKey + "/" + (Convert.ToInt32(year) - prevQuartersToAdd[0].Value).ToString();

            monthAndDayKey = string.Empty;
            foreach (string key in fourQuarters.Keys)
            {
                if (string.Compare(prevQuartersToAdd[1].Key, fourQuarters[key]) == 0)
                {
                    monthAndDayKey = key;
                    break;
                }
            }

            string minus2QuarteDate = monthAndDayKey + "/" + (Convert.ToInt32(year) - prevQuartersToAdd[1].Value).ToString();

            monthAndDayKey = string.Empty;
            foreach (string key in fourQuarters.Keys)
            {
                if (string.Compare(prevQuartersToAdd[2].Key, fourQuarters[key]) == 0)
                {
                    monthAndDayKey = key;
                    break;
                }
            }
            string minus3QuarteDate = monthAndDayKey + "/" + (Convert.ToInt32(year) - prevQuartersToAdd[2].Value).ToString();

            monthAndDayKey = string.Empty;
            foreach (string key in fourQuarters.Keys)
            {
                if (string.Compare(prevQuartersToAdd[3].Key, fourQuarters[key]) == 0)
                {
                    monthAndDayKey = key;
                    break;
                }
            }
            string minus4QuarteDate = monthAndDayKey + "/" + (Convert.ToInt32(year) - prevQuartersToAdd[3].Value).ToString();

            string latestQuarterString = string.Empty;
            FinancialPeriod latest = new FinancialPeriod();
            FinancialPeriod minus1 = new FinancialPeriod();
            FinancialPeriod minus2 = new FinancialPeriod();
            FinancialPeriod minus3 = new FinancialPeriod();
            FinancialPeriod minus4 = new FinancialPeriod();

            if (latestQuarterDate.Month < 10)
            {
                string latestQuarterMonth = "0" + latestQuarterDate.Month.ToString();
                latestQuarterString = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString());
                latest.Value = latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString();
            }
            else
            {
                latestQuarterString = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year.ToString() + latestQuarterDate.Month.ToString() + latestQuarterDate.Day.ToString());
                latest.Value = latestQuarterDate.Year.ToString() + latestQuarterDate.Month.ToString() + latestQuarterDate.Day.ToString();
            }

            latest.Label = latestQuarterString;
            
            string minus1QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Split("/".ToCharArray())[2]+ minus1QuarteDate.Split("/".ToCharArray())[0]+ minus1QuarteDate.Split("/".ToCharArray())[1]);
            minus1.Value = minus1QuarteDate.Split("/".ToCharArray())[2] + minus1QuarteDate.Split("/".ToCharArray())[0] + minus1QuarteDate.Split("/".ToCharArray())[1];
            minus1.Label = minus1QuarterString;

            string minus2QuarterString = CommonFunctions.GetQuarterLabel(minus2QuarteDate.Split("/".ToCharArray())[2] + minus2QuarteDate.Split("/".ToCharArray())[0] + minus2QuarteDate.Split("/".ToCharArray())[1]);
            minus2.Value = minus2QuarteDate.Split("/".ToCharArray())[2] + minus2QuarteDate.Split("/".ToCharArray())[0] + minus2QuarteDate.Split("/".ToCharArray())[1];
            minus2.Label = minus2QuarterString;

            string minus3QuarterString = CommonFunctions.GetQuarterLabel(minus3QuarteDate.Split("/".ToCharArray())[2] + minus3QuarteDate.Split("/".ToCharArray())[0] + minus3QuarteDate.Split("/".ToCharArray())[1]);
            minus3.Value = minus3QuarteDate.Split("/".ToCharArray())[2] + minus3QuarteDate.Split("/".ToCharArray())[0] + minus3QuarteDate.Split("/".ToCharArray())[1];
            minus3.Label = minus3QuarterString;

            string minus4QuarterString = CommonFunctions.GetQuarterLabel(minus4QuarteDate.Split("/".ToCharArray())[2] + minus4QuarteDate.Split("/".ToCharArray())[0] + minus4QuarteDate.Split("/".ToCharArray())[1]);
            minus4.Value = minus4QuarteDate.Split("/".ToCharArray())[2] + minus4QuarteDate.Split("/".ToCharArray())[0] + minus4QuarteDate.Split("/".ToCharArray())[1];
            minus4.Label = minus4QuarterString;

            periods.Add(latest);
            periods.Add(minus1);
            periods.Add(minus2);
            periods.Add(minus3);
            periods.Add(minus4);

            return periods;
        }

        [HttpPost]
        public Dictionary<string, B2BBankProfile> GetBanksBasicData(B2BParameters b2bParams)
        {
            Dictionary<string, B2BBankProfile> profiles = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter periodKey = new SqlParameter("@PeriodKey", SqlDbType.Int);
                periodKey.Value = b2bParams.Period;
                SqlParameter tabName = new SqlParameter("@TabName", SqlDbType.VarChar);
                tabName.Value = b2bParams.TabName;
                SqlParameter defaultBank = new SqlParameter("@DefaultBank", SqlDbType.Int);
                defaultBank.Value = b2bParams.DefaultBankKey;
                SqlParameter bank1 = new SqlParameter("@Bank1", SqlDbType.Int);
                bank1.Value = b2bParams.Bank1Key;
                SqlParameter bank2 = new SqlParameter("@Bank2", SqlDbType.Int);
                bank2.Value = b2bParams.Bank2Key;
                SqlParameter bank3 = new SqlParameter("@Bank3", SqlDbType.Int);
                bank3.Value = b2bParams.Bank3Key;
                SqlParameter bank4 = new SqlParameter("@Bank4", SqlDbType.Int);
                bank4.Value = b2bParams.Bank4Key;
                SqlParameter bank5 = new SqlParameter("@Bank5", SqlDbType.Int);
                bank5.Value = b2bParams.Bank5Key;
                object[] b2bObjParams = new object[8];
                b2bObjParams[0] = periodKey;
                b2bObjParams[1] = tabName;
                b2bObjParams[2] = defaultBank;
                b2bObjParams[3] = bank1;
                b2bObjParams[4] = bank2;
                b2bObjParams[5] = bank3;
                b2bObjParams[6] = bank4;
                b2bObjParams[7] = bank5;
                var result = ent.Database.SqlQuery<B2BBankProfileData>("exec dbo.uspRptBank2bankAnalysisReportHeaderData @PeriodKey, @TabName, @DefaultBank, @Bank1, @Bank2, @Bank3, @Bank4, @Bank5", b2bObjParams).ToList<B2BBankProfileData>();

                B2BBankProfile defaultBankProfile = new B2BBankProfile();
                B2BBankProfile bank1Profile = new B2BBankProfile();
                B2BBankProfile bank2Profile = new B2BBankProfile();
                B2BBankProfile bank3Profile = new B2BBankProfile();
                B2BBankProfile bank4Profile = new B2BBankProfile();
                B2BBankProfile bank5Profile = new B2BBankProfile();
                profiles = new Dictionary<string, B2BBankProfile>();
                if (result != null && result.Count > 0)
                {
                    defaultBankProfile.Assets = result[0].Defaultbank;
                    bank1Profile.Assets = result[0].Bank1;
                    bank2Profile.Assets = result[0].Bank2;
                    bank3Profile.Assets = result[0].Bank3;
                    bank4Profile.Assets = result[0].Bank4;
                    bank5Profile.Assets = result[0].Bank5;

                    defaultBankProfile.Employees = result[1].Defaultbank;
                    bank1Profile.Employees = result[1].Bank1;
                    bank2Profile.Employees = result[1].Bank2;
                    bank3Profile.Employees = result[1].Bank3;
                    bank4Profile.Employees = result[1].Bank4;
                    bank5Profile.Employees = result[1].Bank5;

                    defaultBankProfile.AvgAssetSize = result[3].Defaultbank;
                    bank1Profile.AvgAssetSize = result[3].Bank1;
                    bank2Profile.AvgAssetSize = result[3].Bank2;
                    bank3Profile.AvgAssetSize = result[3].Bank3;
                    bank4Profile.AvgAssetSize = result[3].Bank4;
                    bank5Profile.AvgAssetSize = result[3].Bank5;

                    if (result[2].Defaultbank != null)
                        defaultBankProfile.SubS = (result[2].Defaultbank == 0 || result[2].Defaultbank == -1) ? false : true;

                    if (result[2].Bank1 != null)
                        bank1Profile.SubS = (result[2].Bank1 == 0 || result[2].Bank1 == -1) ? false : true;

                    if (result[2].Bank2 != null)
                        bank2Profile.SubS = (result[2].Bank2 == 0 || result[2].Bank2 == -1) ? false : true;

                    if (result[2].Bank3 != null)
                        bank3Profile.SubS = (result[2].Bank3 == 0 || result[2].Bank3 == -1) ? false : true;

                    if (result[2].Bank4 != null)
                        bank4Profile.SubS = (result[2].Bank4 == 0 || result[2].Bank4 == -1) ? false : true;

                    if (result[2].Bank5 != null)
                        bank5Profile.SubS = (result[2].Bank5 == 0 || result[2].Bank5 == -1) ? false : true;
                }

                profiles.Add("DefaultBankProfile", defaultBankProfile);
                profiles.Add("Bank1Profile", bank1Profile);
                profiles.Add("Bank2Profile", bank2Profile);
                profiles.Add("Bank3Profile", bank3Profile);
                profiles.Add("Bank4Profile", bank4Profile);
                profiles.Add("Bank5Profile", bank5Profile);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return profiles;
        }

        [HttpPost]
        public Dictionary<string, List<B2BSheetData>> GetIncomeStatementData(B2BParameters b2bParams)
        {
            Dictionary<string, List<B2BSheetData>> sheetData = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter periodKey = new SqlParameter("@PeriodKey", SqlDbType.Int);
                periodKey.Value = b2bParams.Period;
                SqlParameter tabName = new SqlParameter("@TabName", SqlDbType.VarChar);
                tabName.Value = b2bParams.TabName;
                SqlParameter defaultBank = new SqlParameter("@DefaultBank", SqlDbType.Int);
                defaultBank.Value = b2bParams.DefaultBankKey;
                SqlParameter bank1 = new SqlParameter("@Bank1", SqlDbType.Int);
                bank1.Value = b2bParams.Bank1Key;
                SqlParameter bank2 = new SqlParameter("@Bank2", SqlDbType.Int);
                bank2.Value = b2bParams.Bank2Key;
                SqlParameter bank3 = new SqlParameter("@Bank3", SqlDbType.Int);
                bank3.Value = b2bParams.Bank3Key;
                SqlParameter bank4 = new SqlParameter("@Bank4", SqlDbType.Int);
                bank4.Value = b2bParams.Bank4Key;
                SqlParameter bank5 = new SqlParameter("@Bank5", SqlDbType.Int);
                bank5.Value = b2bParams.Bank5Key;
                object[] b2bObjParams = new object[8];
                b2bObjParams[0] = periodKey;
                b2bObjParams[1] = tabName;
                b2bObjParams[2] = defaultBank;
                b2bObjParams[3] = bank1;
                b2bObjParams[4] = bank2;
                b2bObjParams[5] = bank3;
                b2bObjParams[6] = bank4;
                b2bObjParams[7] = bank5;
                var result = ent.Database.SqlQuery<B2BSheetData>("exec dbo.uspRptBank2bankAnalysisReport @PeriodKey, @TabName, @DefaultBank, @Bank1, @Bank2, @Bank3, @Bank4, @Bank5", b2bObjParams).ToList<B2BSheetData>();
                if (result != null && result.Count > 0)
                {
                    sheetData = new Dictionary<string, List<B2BSheetData>>();
                    var uniqueSections = result.Select(obj => obj.SectionOrder).Distinct().ToList();
                    foreach (short? sheetDataItem in uniqueSections)
                    {
                        var uniqueSectionItems = result.Where(obj => obj.SectionOrder == sheetDataItem).ToList();
                        if (uniqueSectionItems.Count > 1)
                        {
                            for (int i = 0; i < uniqueSectionItems.Count; i++)
                            {
                                if (i == 0)
                                    uniqueSectionItems[i].IsTopLevelRow = true;
                                else
                                    uniqueSectionItems[i].IsTopLevelRow = false;

                                if (B2BUBPRTabOrders.TabOrderMapping.ContainsKey(uniqueSectionItems[i].UBPRConceptCode))
                                {
                                    uniqueSectionItems[i].TabOrder = B2BUBPRTabOrders.TabOrderMapping[uniqueSectionItems[i].UBPRConceptCode];
                                }
                            }

                            sheetData.Add(sheetDataItem.ToString(), uniqueSectionItems);
                        }
                        else
                        {
                            uniqueSectionItems[0].IsTopLevelRow = false;
                            sheetData.Add(sheetDataItem.ToString(), uniqueSectionItems);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return sheetData;
        }

        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage ExportToExcel(B2BParameters b2bIncomeParams)
        {
            byte[] excelBytes = null;
            try
            {
                List<B2BExportData> exportDataList = new List<B2BExportData>();
                B2BParameters metricParams = new B2BParameters();
                List<B2BParameters> b2bInformationParams = new List<B2BParameters>();
                metricParams.Bank1Name = b2bIncomeParams.Bank1Name;
                metricParams.Bank2Name = b2bIncomeParams.Bank2Name;
                metricParams.Bank3Name = b2bIncomeParams.Bank3Name;
                metricParams.Bank4Name = b2bIncomeParams.Bank4Name;
                metricParams.Bank5Name = b2bIncomeParams.Bank5Name;
                metricParams.PeriodType = b2bIncomeParams.PeriodType;
                metricParams.TabName = b2bIncomeParams.TabName;
                metricParams.DefaultBankKey = b2bIncomeParams.DefaultBankKey;
                metricParams.CombinedBanks = b2bIncomeParams.CombinedBanks;
                b2bInformationParams.Add(b2bIncomeParams);
                B2BParameters balanceparams = new B2BParameters();
                if (b2bIncomeParams.TabName == "Income %")
                {
                    balanceparams.Bank1Key = b2bIncomeParams.Bank1Key;
                    balanceparams.Bank2Key = b2bIncomeParams.Bank2Key;
                    balanceparams.Bank3Key = b2bIncomeParams.Bank3Key;
                    balanceparams.Bank4Key = b2bIncomeParams.Bank4Key;
                    balanceparams.Bank5Key = b2bIncomeParams.Bank5Key;
                    balanceparams.Period = b2bIncomeParams.Period;                 
                    balanceparams.TabName = "Balance %";
                    balanceparams.DefaultBankKey = b2bIncomeParams.DefaultBankKey;
                    balanceparams.Bank1Name = b2bIncomeParams.Bank1Name;
                    balanceparams.Bank2Name = b2bIncomeParams.Bank2Name;
                    balanceparams.Bank3Name = b2bIncomeParams.Bank3Name;
                    balanceparams.Bank4Name = b2bIncomeParams.Bank4Name;
                    balanceparams.Bank5Name = b2bIncomeParams.Bank5Name;
                    balanceparams.DefaultBankName = b2bIncomeParams.DefaultBankName;
                    balanceparams.PeriodType = b2bIncomeParams.PeriodType;
                    balanceparams.SelectedSecondBank = b2bIncomeParams.SelectedSecondBank;
                    balanceparams.SelectedSecondBankName = b2bIncomeParams.SelectedSecondBankName;
                }
                else if (b2bIncomeParams.TabName == "Income $$$")
                {
                    balanceparams.Bank1Key = b2bIncomeParams.Bank1Key;
                    balanceparams.Bank2Key = b2bIncomeParams.Bank2Key;
                    balanceparams.Bank3Key = b2bIncomeParams.Bank3Key;
                    balanceparams.Bank4Key = b2bIncomeParams.Bank4Key;
                    balanceparams.Bank5Key = b2bIncomeParams.Bank5Key;
                    balanceparams.Period = b2bIncomeParams.Period;
                    balanceparams.TabName = "Balance $$$";
                    balanceparams.DefaultBankKey = b2bIncomeParams.DefaultBankKey;
                    balanceparams.Bank1Name = b2bIncomeParams.Bank1Name;
                    balanceparams.Bank2Name = b2bIncomeParams.Bank2Name;
                    balanceparams.Bank3Name = b2bIncomeParams.Bank3Name;
                    balanceparams.Bank4Name = b2bIncomeParams.Bank4Name;
                    balanceparams.Bank5Name = b2bIncomeParams.Bank5Name;
                    balanceparams.DefaultBankName = b2bIncomeParams.DefaultBankName;
                    balanceparams.PeriodType = b2bIncomeParams.PeriodType;
                    balanceparams.SelectedSecondBank = b2bIncomeParams.SelectedSecondBank;
                    balanceparams.SelectedSecondBankName = b2bIncomeParams.SelectedSecondBankName;
                }
                else if (b2bIncomeParams.TabName == "Balance %")
                {
                    balanceparams.Bank1Key = b2bIncomeParams.Bank1Key;
                    balanceparams.Bank2Key = b2bIncomeParams.Bank2Key;
                    balanceparams.Bank3Key = b2bIncomeParams.Bank3Key;
                    balanceparams.Bank4Key = b2bIncomeParams.Bank4Key;
                    balanceparams.Bank5Key = b2bIncomeParams.Bank5Key;
                    balanceparams.Period = b2bIncomeParams.Period;
                    balanceparams.TabName = "Income %";
                    balanceparams.DefaultBankKey = b2bIncomeParams.DefaultBankKey;
                    balanceparams.Bank1Name = b2bIncomeParams.Bank1Name;
                    balanceparams.Bank2Name = b2bIncomeParams.Bank2Name;
                    balanceparams.Bank3Name = b2bIncomeParams.Bank3Name;
                    balanceparams.Bank4Name = b2bIncomeParams.Bank4Name;
                    balanceparams.Bank5Name = b2bIncomeParams.Bank5Name;
                    balanceparams.DefaultBankName = b2bIncomeParams.DefaultBankName;
                    balanceparams.PeriodType = b2bIncomeParams.PeriodType;
                    balanceparams.SelectedSecondBank = b2bIncomeParams.SelectedSecondBank;
                    balanceparams.SelectedSecondBankName = b2bIncomeParams.SelectedSecondBankName;
                }
                else if (b2bIncomeParams.TabName == "Balance $$$")
                {
                    balanceparams.Bank1Key = b2bIncomeParams.Bank1Key;
                    balanceparams.Bank2Key = b2bIncomeParams.Bank2Key;
                    balanceparams.Bank3Key = b2bIncomeParams.Bank3Key;
                    balanceparams.Bank4Key = b2bIncomeParams.Bank4Key;
                    balanceparams.Bank5Key = b2bIncomeParams.Bank5Key;
                    balanceparams.Period = b2bIncomeParams.Period;
                    balanceparams.TabName = "Income $$$";
                    balanceparams.DefaultBankKey = b2bIncomeParams.DefaultBankKey;
                    balanceparams.Bank1Name = b2bIncomeParams.Bank1Name;
                    balanceparams.Bank2Name = b2bIncomeParams.Bank2Name;
                    balanceparams.Bank3Name = b2bIncomeParams.Bank3Name;
                    balanceparams.Bank4Name = b2bIncomeParams.Bank4Name;
                    balanceparams.Bank5Name = b2bIncomeParams.Bank5Name;
                    balanceparams.DefaultBankName = b2bIncomeParams.DefaultBankName;
                    balanceparams.PeriodType = b2bIncomeParams.PeriodType;
                    balanceparams.SelectedSecondBank = b2bIncomeParams.SelectedSecondBank;
                    balanceparams.SelectedSecondBankName = b2bIncomeParams.SelectedSecondBankName;                  
                }
                Dictionary<string, B2BBankProfile> bankBasicData = this.GetBanksBasicData(b2bIncomeParams);
                Dictionary<string, List<B2BSheetData>> bankIncomeData = this.GetIncomeStatementData(b2bIncomeParams);
                Dictionary<string, B2BBankProfile> bankbalanceBasicData = this.GetBanksBasicData(balanceparams);
                Dictionary<string, List<B2BSheetData>> bankBalanceData = this.GetIncomeStatementData(balanceparams);
                List<B2BExportData> exportBalaceDataList = BankToBankAnalyzerController.GetBalanceSheetData(bankbalanceBasicData, bankBalanceData, balanceparams);
                List<B2BExportData> exportIncomeDataList = BankToBankAnalyzerController.GetBalanceSheetData(bankBasicData, bankIncomeData, b2bIncomeParams );
               
                DataTable bankInformation = CreateExcelFile.ListToDataTable(b2bInformationParams, "Information", string.Empty);
                DataTable bankIncomestmt;
                DataTable bankBalancestmt;
                if (b2bIncomeParams.TableName.Contains("Income"))
                {
                    bankIncomestmt = CreateExcelFile.ListToDataTable(exportIncomeDataList, "Income Statement", string.Empty);

                    bankBalancestmt = CreateExcelFile.ListToDataTable(exportBalaceDataList, " Balance Sheet", string.Empty);
                }
                else
                {
                     bankIncomestmt = CreateExcelFile.ListToDataTable(exportIncomeDataList, "Balance Sheet", string.Empty);

                     bankBalancestmt = CreateExcelFile.ListToDataTable(exportBalaceDataList, "Income Statement", string.Empty);
                }
               

                DataTable[] metricArr = new DataTable[3];
                metricArr[0] = bankInformation;
                metricArr[1] = bankIncomestmt;
                metricArr[2] = bankBalancestmt;
                excelBytes = CreateB2bExportToExcel.CreateExcelDocument(metricArr, "B2BAnalytics.xlsx");
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
            result.Content.Headers.ContentDisposition.FileName = "B2BAnalytics.xlsx";
            result.Content.Headers.ContentDisposition.Size = excelBytes.Length;
            return result;
        }

        public static List<B2BExportData> GetBalanceSheetData(Dictionary<string, B2BBankProfile> bankBasicData, Dictionary<string, List<B2BSheetData>> bankBalanceData, B2BParameters b2bIncomeParams)
        {
            List<B2BExportData> exportDataList = new List<B2BExportData>();
            B2BExportData bankNameRow = new B2BExportData();
            B2BExportData assetsRow = new B2BExportData();
            B2BExportData employeeRow = new B2BExportData();
            B2BExportData subsRow = new B2BExportData();
            B2BExportData reportingPeriodRow = new B2BExportData();
            B2BExportData combinedBank = new B2BExportData();
            B2BExportData lables = new B2BExportData();
            bankNameRow.Label = "Choose Banks";
            assetsRow.Label = "Assets";
            employeeRow.Label = "Employees";
            subsRow.Label = "Sub-S";
            reportingPeriodRow.Label = "Reporting Period";
            foreach (string key in bankBasicData.Keys)
            {
                B2BBankProfile data = bankBasicData[key];
                if (key.Contains("DefaultBankProfile"))
                {
                    bankNameRow.DefaultBank = b2bIncomeParams.DefaultBankName;
                    assetsRow.DefaultBank =string.Format("{0:#,##0}",  data.Assets);
                    employeeRow.DefaultBank = data.Employees.ToString();
                    subsRow.DefaultBank = data.SubS.ToString() == "True" ? "Yes" : data.SubS.ToString() == "False" ? "No":data.SubS.ToString();
                    reportingPeriodRow.DefaultBank = b2bIncomeParams.PeriodType;
                }
                else if (key.Contains("Bank1"))
                {
                    bankNameRow.Bank1 = b2bIncomeParams.Bank1Name;
                    assetsRow.Bank1 = string.Format("{0:#,##0}", data.Assets);
                    employeeRow.Bank1 = data.Employees.ToString();
                    subsRow.Bank1 = data.SubS.ToString() == "True" ? "Yes" : data.SubS.ToString() == "False" ? "No" : data.SubS.ToString();
                    reportingPeriodRow.Bank1 = b2bIncomeParams.PeriodType;
                }
                else if (key.Contains("Bank2"))
                {
                    bankNameRow.Bank2 = b2bIncomeParams.Bank2Name;
                    assetsRow.Bank2 = string.Format("{0:#,##0}", data.Assets);
                    employeeRow.Bank2 = data.Employees.ToString();
                    subsRow.Bank2 = data.SubS.ToString() == "True" ? "Yes" : data.SubS.ToString() == "False" ? "No" : data.SubS.ToString();
                    reportingPeriodRow.Bank2 = b2bIncomeParams.PeriodType;
                }
                else if (key.Contains("Bank3"))
                {
                    bankNameRow.Bank3 = b2bIncomeParams.Bank3Name;
                    assetsRow.Bank3 = string.Format("{0:#,##0}", data.Assets);
                    employeeRow.Bank3 = data.Employees.ToString();
                    subsRow.Bank3 = data.SubS.ToString() == "True" ? "Yes" : data.SubS.ToString() == "False" ? "No" : data.SubS.ToString();
                    reportingPeriodRow.Bank3 = b2bIncomeParams.PeriodType;
                }
                else if (key.Contains("Bank4"))
                {
                    bankNameRow.Bank4 = b2bIncomeParams.Bank4Name;
                    assetsRow.Bank4 = string.Format("{0:#,##0}", data.Assets);
                    employeeRow.Bank4 = data.Employees.ToString();
                    subsRow.Bank4 = data.SubS.ToString() == "True" ? "Yes" : data.SubS.ToString() == "False" ? "No" : data.SubS.ToString();
                    reportingPeriodRow.Bank4 = b2bIncomeParams.PeriodType;
                }
                else if (key.Contains("Bank5"))
                {
                    bankNameRow.Bank5 = b2bIncomeParams.Bank5Name;
                    assetsRow.Bank5 = string.Format("{0:#,##0}", data.Assets);
                    employeeRow.Bank5 = data.Employees.ToString();
                    subsRow.Bank5 = data.SubS.ToString() == "True" ? "Yes" : data.SubS.ToString() == "False" ? "No" : data.SubS.ToString();
                    reportingPeriodRow.Bank5 = b2bIncomeParams.PeriodType;
                }                        
            }

            exportDataList.Add(bankNameRow);
            exportDataList.Add(assetsRow);
            exportDataList.Add(employeeRow);
            exportDataList.Add(subsRow);
            exportDataList.Add(reportingPeriodRow);
            exportDataList.Add(combinedBank);
            exportDataList.Add(lables);
            foreach (string key in bankBalanceData.Keys)
            {
                List<B2BSheetData> data = bankBalanceData[key];
                foreach (B2BSheetData sheetData in data)
                {
                    B2BExportData exportDataObj = new B2BExportData();
                    if (b2bIncomeParams.TabName.Contains("%"))
                    {
                        exportDataObj.Label = GetTabOrder(sheetData.TabOrder, sheetData.UBPRConceptDesc);
                        exportDataObj.DefaultBank = sheetData.Defaultbank==null?"0": Math.Round((decimal)sheetData.Defaultbank,2).ToString();
                        exportDataObj.Bank1 = sheetData.Bank1 == null ? "0" : Math.Round(sheetData.Bank1.Value, 2).ToString();
                        exportDataObj.Bank2 = sheetData.Bank2 == null ? "0" : Math.Round(sheetData.Bank2.Value, 2).ToString();
                        exportDataObj.Bank3 = sheetData.Bank3 == null ? "0" : Math.Round(sheetData.Bank3.Value, 2).ToString();
                        exportDataObj.Bank4 = sheetData.Bank4 == null ? "0" : Math.Round(sheetData.Bank4.Value, 2).ToString();
                        exportDataObj.Bank5 = sheetData.Bank5 == null ? "0" : Math.Round(sheetData.Bank5.Value, 2).ToString();
                    }
                    else
                    {
                        exportDataObj.Label = GetTabOrder(sheetData.TabOrder, sheetData.UBPRConceptDesc);
                        exportDataObj.DefaultBank = string.Format("{0:#,##0}", sheetData.Defaultbank);
                        exportDataObj.Bank1 = string.Format("{0:#,##0}", sheetData.Bank1);
                        exportDataObj.Bank2 = string.Format("{0:#,##0}", sheetData.Bank2);
                        exportDataObj.Bank3 = string.Format("{0:#,##0}", sheetData.Bank3);
                        exportDataObj.Bank4 = string.Format("{0:#,##0}", sheetData.Bank4);
                        exportDataObj.Bank5 = string.Format("{0:#,##0}", sheetData.Bank5);
                    }
                    Decimal? avgAsset = 0;

                    if (b2bIncomeParams.SelectedSecondBank == b2bIncomeParams.Bank1Key.ToString() && b2bIncomeParams.SelectedSecondBank != null)
                    {
                        avgAsset = bankBasicData["DefaultBankProfile"].AvgAssetSize + bankBasicData["Bank1Profile"].AvgAssetSize;
                        sheetData.DollarSum = sheetData.Defaultbank + sheetData.Bank1;
                        bankNameRow.Ratio = b2bIncomeParams.SelectedSecondBankName;
                        decimal thousandsepassert = Convert.ToDecimal((Convert.ToInt32(bankBasicData["DefaultBankProfile"].Assets) + bankBasicData["Bank1Profile"].Assets));
                        assetsRow.Ratio = string.Format("{0:#,##0}", thousandsepassert);
                        employeeRow.Ratio = (Convert.ToInt32(bankBasicData["DefaultBankProfile"].Employees) + bankBasicData["Bank1Profile"].Employees).ToString();                       
                        string subsrow1=  bankBasicData["DefaultBankProfile"].SubS.ToString() == "True" ? "Yes" : bankBasicData["DefaultBankProfile"].SubS.ToString() == "False" ? "No" : bankBasicData["DefaultBankProfile"].SubS.ToString();
                        string subsrow2 = bankBasicData["Bank1Profile"].SubS.ToString() == "True" ? "Yes" : bankBasicData["Bank1Profile"].SubS.ToString() == "False" ? "No" : bankBasicData["Bank1Profile"].SubS.ToString();
                        subsRow.Ratio = subsrow1 + '/' + subsrow2;
                        reportingPeriodRow.Ratio = b2bIncomeParams.PeriodType;
                    }
                    else if (b2bIncomeParams.SelectedSecondBank == b2bIncomeParams.Bank2Key.ToString() && b2bIncomeParams.SelectedSecondBank != null)
                    {
                        avgAsset = bankBasicData["DefaultBankProfile"].AvgAssetSize + bankBasicData["Bank2Profile"].AvgAssetSize;
                        sheetData.DollarSum = sheetData.Defaultbank + sheetData.Bank2;
                        bankNameRow.Ratio = b2bIncomeParams.SelectedSecondBankName;
                        decimal thousandsepassert =Convert.ToDecimal((Convert.ToInt32(bankBasicData["DefaultBankProfile"].Assets) + bankBasicData["Bank2Profile"].Assets));
                        assetsRow.Ratio= string.Format("{0:#,##0}", thousandsepassert);
                        employeeRow.Ratio = (Convert.ToInt32(bankBasicData["DefaultBankProfile"].Employees) + bankBasicData["Bank2Profile"].Employees).ToString();
                        string subsrow1 = bankBasicData["DefaultBankProfile"].SubS.ToString() == "True" ? "Yes" : bankBasicData["DefaultBankProfile"].SubS.ToString() == "False" ? "No" : bankBasicData["DefaultBankProfile"].SubS.ToString();
                        string subsrow2 = bankBasicData["Bank2Profile"].SubS.ToString() == "True" ? "Yes" : bankBasicData["Bank2Profile"].SubS.ToString() == "False" ? "No" : bankBasicData["Bank2Profile"].SubS.ToString();
                        subsRow.Ratio = subsrow1 + '/' + subsrow2;
                        reportingPeriodRow.Ratio = b2bIncomeParams.PeriodType;
                    }
                    else if (b2bIncomeParams.SelectedSecondBank == b2bIncomeParams.Bank3Key.ToString() && b2bIncomeParams.SelectedSecondBank != null)
                    {
                        avgAsset = bankBasicData["DefaultBankProfile"].AvgAssetSize + bankBasicData["Bank3Profile"].AvgAssetSize;
                        sheetData.DollarSum = sheetData.Defaultbank + sheetData.Bank3;
                        bankNameRow.Ratio = b2bIncomeParams.SelectedSecondBankName;
                        decimal thousandsepassert = Convert.ToDecimal((Convert.ToInt32(bankBasicData["DefaultBankProfile"].Assets) + bankBasicData["Bank3Profile"].Assets));
                        assetsRow.Ratio = string.Format("{0:#,##0}", thousandsepassert);
                        employeeRow.Ratio = (Convert.ToInt32(bankBasicData["DefaultBankProfile"].Employees) + bankBasicData["Bank3Profile"].Employees).ToString();
                        string subsrow1 = bankBasicData["DefaultBankProfile"].SubS.ToString() == "True" ? "Yes" : bankBasicData["DefaultBankProfile"].SubS.ToString() == "False" ? "No" : bankBasicData["DefaultBankProfile"].SubS.ToString();
                        string subsrow2 = bankBasicData["Bank3Profile"].SubS.ToString() == "True" ? "Yes" : bankBasicData["Bank3Profile"].SubS.ToString() == "False" ? "No" : bankBasicData["Bank3Profile"].SubS.ToString();
                        subsRow.Ratio = subsrow1 + '/' + subsrow2;                       
                        reportingPeriodRow.Ratio = b2bIncomeParams.PeriodType;
                    }
                    else if (b2bIncomeParams.SelectedSecondBank == b2bIncomeParams.Bank4Key.ToString() && b2bIncomeParams.SelectedSecondBank != null)
                    {
                        avgAsset = bankBasicData["DefaultBankProfile"].AvgAssetSize + bankBasicData["Bank4Profile"].AvgAssetSize;
                        sheetData.DollarSum = sheetData.Defaultbank + sheetData.Bank4;
                        bankNameRow.Ratio = b2bIncomeParams.SelectedSecondBankName;
                        decimal thousandsepassert = Convert.ToDecimal(Convert.ToInt32(bankBasicData["DefaultBankProfile"].Assets) + bankBasicData["Bank4Profile"].Assets);
                        assetsRow.Ratio = string.Format("{0:#,##0}", thousandsepassert);
                        employeeRow.Ratio = (Convert.ToInt32(bankBasicData["DefaultBankProfile"].Employees) + bankBasicData["Bank4Profile"].Employees).ToString();
                        string subsrow1 = bankBasicData["DefaultBankProfile"].SubS.ToString() == "True" ? "Yes" : bankBasicData["DefaultBankProfile"].SubS.ToString() == "False" ? "No" : bankBasicData["DefaultBankProfile"].SubS.ToString();
                        string subsrow2 = bankBasicData["Bank4Profile"].SubS.ToString() == "True" ? "Yes" : bankBasicData["Bank4Profile"].SubS.ToString() == "False" ? "No" : bankBasicData["Bank4Profile"].SubS.ToString();
                        subsRow.Ratio = subsrow1 + '/' + subsrow2;                       
                        reportingPeriodRow.Ratio = b2bIncomeParams.PeriodType;
                    }
                    else if (b2bIncomeParams.SelectedSecondBank == b2bIncomeParams.Bank5Key.ToString() && b2bIncomeParams.SelectedSecondBank != null)
                    {
                        avgAsset = bankBasicData["DefaultBankProfile"].AvgAssetSize + bankBasicData["Bank5Profile"].AvgAssetSize;
                        sheetData.DollarSum = sheetData.Defaultbank + sheetData.Bank5;
                        bankNameRow.Ratio = b2bIncomeParams.SelectedSecondBankName;
                        decimal thousandsepassert = Convert.ToDecimal(Convert.ToInt32(bankBasicData["DefaultBankProfile"].Assets) + bankBasicData["Bank5Profile"].Assets);
                        assetsRow.Ratio = string.Format("{0:#,##0}", thousandsepassert);
                        employeeRow.Ratio = (Convert.ToInt32(bankBasicData["DefaultBankProfile"].Employees) + bankBasicData["Bank5Profile"].Employees).ToString();
                        string subsrow1 = bankBasicData["DefaultBankProfile"].SubS.ToString() == "True" ? "Yes" : bankBasicData["DefaultBankProfile"].SubS.ToString() == "False" ? "No" : bankBasicData["DefaultBankProfile"].SubS.ToString();
                        string subsrow2 = bankBasicData["Bank5Profile"].SubS.ToString() == "True" ? "Yes" : bankBasicData["BankProfile"].SubS.ToString() == "False" ? "No" : bankBasicData["Bank5Profile"].SubS.ToString();
                        subsRow.Ratio = subsrow1 + '/' + subsrow2;                       
                        reportingPeriodRow.Ratio = b2bIncomeParams.PeriodType;
                    }
                    var ratio = Math.Round((Convert.ToDecimal(sheetData.DollarSum / avgAsset) * 100), 2);
                    decimal dollar =  Math.Round(Convert.ToDecimal(sheetData.DollarSum), 2); 
                    string thousansepdollar = string.Format("{0:#,##0}", dollar);
                    exportDataObj.Dollar = ratio.ToString();
                    exportDataObj.Ratio = thousansepdollar;

                    //exportDataObj.Ratio = (sheetData.DollarSum / avgAsset * 100).ToString() + '-' + '-' + '-' + sheetData.DollarSum.ToString();
                    exportDataList.Add(exportDataObj);
                   
                }
            }
            return exportDataList;
        }

        public static string GetTabOrder(int tabOrder,string ubprdesc)
        {
            string resUbprOrder= ubprdesc;
            if (tabOrder == 1) {

                resUbprOrder = "\t \t \t \t \t \t" + ubprdesc;
                return resUbprOrder;
            }
            else if(tabOrder == 2)
            {
                resUbprOrder = "\t \t \t \t \t \t \t \t \t" + ubprdesc;
                return resUbprOrder;
            }
            else if(tabOrder == 3)
            {
                resUbprOrder = "\t \t \t \t \t \t \t \t \t \t \t \t \t \t" + ubprdesc;
                return resUbprOrder;
            }
            return resUbprOrder;
        }
    }
}
