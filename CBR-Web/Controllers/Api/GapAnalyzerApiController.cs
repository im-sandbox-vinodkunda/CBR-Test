using CBR.Common;
using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CBR.DataAccess;
using System.Data.SqlClient;
using System.Data;
using CBR.Web.WebCommons;
using CBR.Web.CustomFilter;
using System.Net.Http.Headers;

namespace CBR.Web.Controllers.Api
{
    public class GapAnalyzerApiController : ApiController
    {
        [HttpGet]
        public int GetCurrentPeriod()
        {
            string lastQuarter = CommonFunctions.GetLastQuarterString();
            string month = lastQuarter.Substring(4, 2);
            string year = lastQuarter.Substring(0, 4);
            string day = lastQuarter.Substring(6, 2);
            string currentPeriod = year + month + day;
            int currentPer = Convert.ToInt32(currentPeriod);
            return currentPer;
        }

        [HttpPost]
        public Dictionary<string, List<GapAnalyzerFinancialHighlightsData>> GetFinancialHighlightsData(GapAnalyzerParams gapAnalyzerParams)
        {
            Dictionary<int, string> sectionMapping = new Dictionary<int, string>();
            sectionMapping.Add(1, "EarningsAndPerformance");
            sectionMapping.Add(2, "NonInterestExpense");
            sectionMapping.Add(3, "AssetQuality");
            sectionMapping.Add(4, "YieldsAndCosts");
            sectionMapping.Add(5, "CapitalRatios");
            sectionMapping.Add(6, "LoanComposition");
            sectionMapping.Add(7, "DepositComposition");
            sectionMapping.Add(8, "Liquidity");
            Dictionary<string, List<GapAnalyzerFinancialHighlightsData>> fhData = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                institutionKey.Value = gapAnalyzerParams.InstitutionKey;
                SqlParameter period = new SqlParameter("@Period", SqlDbType.Int);
                period.Value = gapAnalyzerParams.Period;
                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.Int);
                userKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);
                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.Int);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter stdPeerGroupKey = new SqlParameter("@StdPeerGroupKey", SqlDbType.Int);
                stdPeerGroupKey.Value = gapAnalyzerParams.StandardPeerGroupKey;
                SqlParameter custPeerGroupKey = new SqlParameter("@CustPeerGroupKey", SqlDbType.Int);
                custPeerGroupKey.Value = gapAnalyzerParams.CustomPeerGroupKey;
                var result = ent.Database.SqlQuery<GapAnalyzerFinancialHighlightsData>("exec dbo.uspRptGapAnalyzerFH @InstitutionKey, @Period, @UserKey,@TenantKey,@StdPeerGroupKey, @CustPeerGroupKey", institutionKey, period, userKey, tenantKey, stdPeerGroupKey, custPeerGroupKey).ToList();
                if (result != null && result.Count > 0)
                {
                    fhData = new Dictionary<string, List<GapAnalyzerFinancialHighlightsData>>();
                    foreach (GapAnalyzerFinancialHighlightsData item in result)
                    {
                        if (string.Compare(item.BenchMark, "N/A") == 0)
                            item.BenchMark = string.Empty;
                    }

                    for (int i = 0; i < (result.Count - 1); i++)
                    {
                        result[i].NextUbprCode = result[i + 1].UBPRConceptCode;
                    }

                    var uniqueSections = result.Select(obj => obj.SectionOrder).Distinct().ToList();
                    foreach (int uniqueSection in uniqueSections)
                    {
                        var filteredData = result.Where(obj => obj.SectionOrder == uniqueSection).ToList();
                        fhData.Add(sectionMapping[uniqueSection], filteredData);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return fhData;
        }

        public bool UpdateBenchmark(GapAnalyzerParams gapAnalyzerParams)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                institutionKey.Value = gapAnalyzerParams.InstitutionKey;
                SqlParameter period = new SqlParameter("@Period", SqlDbType.Int);
                period.Value = gapAnalyzerParams.Period;
                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.Int);
                userKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);
                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.Int);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                DataTable benchmarkValues = new DataTable();
                benchmarkValues.Columns.Add("UBPRConceptCode", typeof(string));
                benchmarkValues.Columns.Add("Benchmarkvalue", typeof(Decimal));

                foreach (GapAnalyzerFinancialHighlightsData dataItem in gapAnalyzerParams.FinancialHighlightsData["earningsAndPerformance"])
                {
                    if (!string.IsNullOrEmpty(dataItem.BenchMark))
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, Convert.ToDecimal(dataItem.BenchMark));
                    }
                    else
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, DBNull.Value);
                    }
                }

                foreach (GapAnalyzerFinancialHighlightsData dataItem in gapAnalyzerParams.FinancialHighlightsData["nonInterestExpense"])
                {
                    if (!string.IsNullOrEmpty(dataItem.BenchMark))
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, Convert.ToDecimal(dataItem.BenchMark));
                    }
                    else
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, DBNull.Value);
                    }
                }

                foreach (GapAnalyzerFinancialHighlightsData dataItem in gapAnalyzerParams.FinancialHighlightsData["assetQuality"])
                {
                    if (!string.IsNullOrEmpty(dataItem.BenchMark))
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, Convert.ToDecimal(dataItem.BenchMark));
                    }
                    else
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, DBNull.Value);
                    }
                }

                foreach (GapAnalyzerFinancialHighlightsData dataItem in gapAnalyzerParams.FinancialHighlightsData["yieldsAndCosts"])
                {
                    if (!string.IsNullOrEmpty(dataItem.BenchMark))
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, Convert.ToDecimal(dataItem.BenchMark));
                    }
                    else
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, DBNull.Value);
                    }
                }

                foreach (GapAnalyzerFinancialHighlightsData dataItem in gapAnalyzerParams.FinancialHighlightsData["capitalRatios"])
                {
                    if (!string.IsNullOrEmpty(dataItem.BenchMark))
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, Convert.ToDecimal(dataItem.BenchMark));
                    }
                    else
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, DBNull.Value);
                    }
                }

                foreach (GapAnalyzerFinancialHighlightsData dataItem in gapAnalyzerParams.FinancialHighlightsData["loanComposition"])
                {
                    if (!string.IsNullOrEmpty(dataItem.BenchMark))
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, Convert.ToDecimal(dataItem.BenchMark));
                    }
                    else
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, DBNull.Value);
                    }
                }

                foreach (GapAnalyzerFinancialHighlightsData dataItem in gapAnalyzerParams.FinancialHighlightsData["depositComposition"])
                {
                    if (!string.IsNullOrEmpty(dataItem.BenchMark))
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, Convert.ToDecimal(dataItem.BenchMark));
                    }
                    else
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, DBNull.Value);
                    }
                }

                foreach (GapAnalyzerFinancialHighlightsData dataItem in gapAnalyzerParams.FinancialHighlightsData["liquidity"])
                {
                    if (!string.IsNullOrEmpty(dataItem.BenchMark))
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, Convert.ToDecimal(dataItem.BenchMark));
                    }
                    else
                    {
                        benchmarkValues.Rows.Add(dataItem.UBPRConceptCode, DBNull.Value);
                    }
                }

                SqlParameter bmarkValues = new SqlParameter("@GapAnalyzerBenchmark", SqlDbType.Structured);
                bmarkValues.Value = benchmarkValues;
                bmarkValues.TypeName = "dbo.GapAnalyzerBenchMarkInput";

                int rowsUpdated = ent.Database.SqlQuery<int>("exec dbo.uspFactGapAnalyzerBenchMarkUpdate @InstitutionKey, @UserKey,@TenantKey,@GapAnalyzerBenchmark", institutionKey, userKey, tenantKey, bmarkValues).First();

                if (rowsUpdated >= 0)
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
        public List<GapAnalyzerLoansLeasesSheetData> GetLoansLeasesData(GapAnalyzerParams gapAnalyzerParams)
        {
            List<GapAnalyzerLoansLeasesSheetData> llData = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                institutionKey.Value = gapAnalyzerParams.InstitutionKey;
                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.Int);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter custPeerGroupKey = new SqlParameter("@CustPeerGroupKey", SqlDbType.Int);
                custPeerGroupKey.Value = gapAnalyzerParams.CustomPeerGroupKey;
                SqlParameter qtdOrYtd = new SqlParameter("@QTDorYTD", SqlDbType.VarChar);
                qtdOrYtd.Value = gapAnalyzerParams.QtdOrYtd;
                var result = ent.Database.SqlQuery<GapAnalyzerLoansLeasesData>("exec dbo.uspRptGapAnalyzerLL @InstitutionKey, @TenantKey, @CustPeerGroupKey, @QTDorYTD", institutionKey, tenantKey, custPeerGroupKey, qtdOrYtd).ToList();
                if (result != null && result.Count > 0)
                {
                    llData = new List<GapAnalyzerLoansLeasesSheetData>();
                    foreach (GapAnalyzerLoansLeasesData llDataItem in result)
                    {
                        GapAnalyzerLoansLeasesSheetData llDataObj = new Models.GapAnalyzerLoansLeasesSheetData();
                        llDataObj.Bank = llDataItem.Bank_Year_5;
                        llDataObj.Description = llDataItem.Description;
                        llDataObj.Peer1 = llDataItem.Peer_Year_5;
                        llDataObj.TabOrder = GapAnalyzerTabOrderMapping.TabOrderMapping[llDataItem.UBPRConceptCode];
                        llDataObj.UBPRConceptCode = llDataItem.UBPRConceptCode;
                        llDataObj.Variance = llDataItem.Variance_Year_5;
                        //Begin - Lavanya - Update the description based on the Tab order 
                        llDataObj.Description = GetTabOrder(llDataObj.TabOrder, llDataObj.Description);
                        llData.Add(llDataObj);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return llData;
        }

        [HttpPost]
        public Dictionary<string, List<GapAnalyzerLoansLeasesSheetData>> GetStrengthWeaknessData(GapAnalyzerParams gapAnalyzerParams)
        {
            Dictionary<string, List<GapAnalyzerLoansLeasesSheetData>> strWeakData = new Dictionary<string, List<GapAnalyzerLoansLeasesSheetData>>();
            strWeakData.Add("Strength", new List<GapAnalyzerLoansLeasesSheetData>());
            strWeakData.Add("Weakness", new List<GapAnalyzerLoansLeasesSheetData>());
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                institutionKey.Value = gapAnalyzerParams.InstitutionKey;
                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.Int);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter custPeerGroupKey = new SqlParameter("@CustPeerGroupKey", SqlDbType.Int);
                custPeerGroupKey.Value = gapAnalyzerParams.CustomPeerGroupKey;
                SqlParameter qtdOrYtd = new SqlParameter("@QTDorYTD", SqlDbType.VarChar);
                qtdOrYtd.Value = gapAnalyzerParams.QtdOrYtd;
                var result = ent.Database.SqlQuery<GapAnalyzerLoansLeasesData>("exec dbo.uspRptGapAnalyzerLL @InstitutionKey, @TenantKey, @CustPeerGroupKey, @QTDorYTD", institutionKey, tenantKey, custPeerGroupKey, qtdOrYtd).ToList();
                if (result != null && result.Count > 0)
                {
                    foreach (GapAnalyzerLoansLeasesData llDataItem in result)
                    {
                        if (llDataItem.SW != null && string.Compare(llDataItem.SW, "Strength") == 0)
                        {
                            GapAnalyzerLoansLeasesSheetData llDataObj = new Models.GapAnalyzerLoansLeasesSheetData();
                            llDataObj.Description = llDataItem.Description;
                            llDataObj.Variance = llDataItem.Variance_Year_5;
                            llDataObj.Rank = llDataItem.SWRank;
                            strWeakData["Strength"].Add(llDataObj);
                        }
                        else if (llDataItem.SW != null && string.Compare(llDataItem.SW, "Weakness") == 0)
                        {
                            GapAnalyzerLoansLeasesSheetData llDataObj = new Models.GapAnalyzerLoansLeasesSheetData();
                            llDataObj.Description = llDataItem.Description;
                            llDataObj.Variance = llDataItem.Variance_Year_5;
                            llDataObj.Rank = llDataItem.SWRank;
                            strWeakData["Weakness"].Add(llDataObj);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            strWeakData["Strength"] = strWeakData["Strength"].OrderBy(obj => obj.Rank).ToList();
            strWeakData["Weakness"] = strWeakData["Weakness"].OrderBy(obj => obj.Rank).ToList();

            return strWeakData;
        }

        [HttpPost]
        public Dictionary<string, List<Column2DChartDataValue>> GetChartData(GapAnalyzerParams gapAnalyzerParams)
        {
            Dictionary<string, List<Column2DChartDataValue>> chartData = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                institutionKey.Value = gapAnalyzerParams.InstitutionKey;
                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.Int);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter custPeerGroupKey = new SqlParameter("@CustPeerGroupKey", SqlDbType.Int);
                custPeerGroupKey.Value = gapAnalyzerParams.CustomPeerGroupKey;
                SqlParameter qtdOrYtd = new SqlParameter("@QTDorYTD", SqlDbType.VarChar);
                qtdOrYtd.Value = gapAnalyzerParams.QtdOrYtd;
                var result = ent.Database.SqlQuery<GapAnalyzerLoansLeasesData>("exec dbo.uspRptGapAnalyzerLL @InstitutionKey, @TenantKey, @CustPeerGroupKey, @QTDorYTD", institutionKey, tenantKey, custPeerGroupKey, qtdOrYtd).ToList();
                if (result != null && result.Count > 0)
                {
                    chartData = new Dictionary<string, List<Column2DChartDataValue>>();
                    if (gapAnalyzerParams.QtdOrYtd == "QTD")
                    {
                        BankToBankAnalyzerController b2bContoller = new BankToBankAnalyzerController();
                        List<FinancialPeriod> lastFiveQtrs = b2bContoller.GetLastFiveQuarters();
                        foreach (GapAnalyzerLoansLeasesData llDataItem in result)
                        {
                            List<Column2DChartDataValue> seriesData = new List<Column2DChartDataValue>();
                            seriesData.Add(new Column2DChartDataValue()
                            {
                                label = lastFiveQtrs[4].Label,
                                value = llDataItem.Variance_Year_1
                            });
                            seriesData.Add(new Column2DChartDataValue()
                            {
                                label = lastFiveQtrs[3].Label,
                                value = llDataItem.Variance_Year_2
                            });
                            seriesData.Add(new Column2DChartDataValue()
                            {
                                label = lastFiveQtrs[2].Label,
                                value = llDataItem.Variance_Year_3
                            });
                            seriesData.Add(new Column2DChartDataValue()
                            {
                                label = lastFiveQtrs[1].Label,
                                value = llDataItem.Variance_Year_4
                            });
                            seriesData.Add(new Column2DChartDataValue()
                            {
                                label = lastFiveQtrs[0].Label,
                                value = llDataItem.Variance_Year_5
                            });
                            chartData.Add(llDataItem.UBPRConceptCode, seriesData);
                        }
                    }
                    else
                    {
                        List<FinancialPeriod> lastFiveYears = new List<FinancialPeriod>();
                        string effectiveDate = CommonFunctions.GetLastQuarterString();
                        string month = effectiveDate.Substring(4, 2);
                        string year = effectiveDate.Substring(0, 4);
                        string day = effectiveDate.Substring(6, 2);
                        DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));

                        string latestQuarterMonth = string.Empty;
                        if (latestQuarterDate.Month < 10)
                            latestQuarterMonth = "0" + latestQuarterDate.Month.ToString();
                        else
                            latestQuarterMonth = latestQuarterDate.Month.ToString();

                        int currentYear = Convert.ToInt32(effectiveDate.Substring(0, 4));
                        for (int i = currentYear; i > currentYear - 5; i--)
                        {
                            string effectiveYear = string.Empty;
                            FinancialPeriod fPer = new FinancialPeriod();
                            if (i == DateTime.Now.Year)
                            {
                                effectiveYear = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString());
                            }
                            else
                            {
                                effectiveYear = i.ToString() + "Y";
                            }

                            fPer.Label = effectiveYear;
                            lastFiveYears.Add(fPer);
                        }

                        foreach (GapAnalyzerLoansLeasesData llDataItem in result)
                        {
                            List<Column2DChartDataValue> seriesData = new List<Column2DChartDataValue>();
                            seriesData.Add(new Column2DChartDataValue()
                            {
                                label = lastFiveYears[4].Label,
                                value = llDataItem.Variance_Year_1
                            });
                            seriesData.Add(new Column2DChartDataValue()
                            {
                                label = lastFiveYears[3].Label,
                                value = llDataItem.Variance_Year_2
                            });
                            seriesData.Add(new Column2DChartDataValue()
                            {
                                label = lastFiveYears[2].Label,
                                value = llDataItem.Variance_Year_3
                            });
                            seriesData.Add(new Column2DChartDataValue()
                            {
                                label = lastFiveYears[1].Label,
                                value = llDataItem.Variance_Year_4
                            });
                            seriesData.Add(new Column2DChartDataValue()
                            {
                                label = lastFiveYears[0].Label,
                                value = llDataItem.Variance_Year_5
                            });
                            chartData.Add(llDataItem.UBPRConceptCode, seriesData);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return chartData;
        }

        [HttpPost]
        public bool ResetBenchmarks(GapAnalyzerParams gapAnalyzerParams)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                institutionKey.Value = gapAnalyzerParams.InstitutionKey;
                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.Int);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.Int);
                userKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);
                int rowCount = ent.Database.SqlQuery<int>("exec dbo.uspFactGapAnalyzerBenchmarkReset @InstitutionKey, @UserKey, @TenantKey", institutionKey, userKey, tenantKey).First();
                if (rowCount >= 0)
                    result = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        private BankProfileIntroductionData GetBankProfileIntroductionData(GapAnalyzerParams profileParams)
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

        [HttpPost]
        public HttpResponseMessage GetGapAnalyzerExporttoExcel(GapAnalyzerParams profileParams)
        {
            HttpResponseMessage result = new HttpResponseMessage();

            BankProfileIntroductionData introData = this.GetBankProfileIntroductionData(profileParams);
            Dictionary<string, List<GapAnalyzerFinancialHighlightsData>> fhData = this.GetFinancialHighlightsData(profileParams);
            List < GapAnalyzerLoansLeasesSheetData > loansleasesData = this.GetLoansLeasesData(profileParams);
            Dictionary<string, List<GapAnalyzerLoansLeasesSheetData>> strWeakData = this.GetStrengthWeaknessData(profileParams);

            string rptPeriod = string.Empty;
            rptPeriod = GetReportPeriod(profileParams.Period.ToString());

            DataTable dtfhData = new DataTable();
            DataTable dtloansleasesData = new DataTable();
            DataTable dtstrengths = new DataTable();
            DataTable dtweeknesses = new DataTable();

            dtfhData.TableName = "Financial Highlights";
            dtloansleasesData.TableName = "Loans & Leases";
            dtstrengths.TableName = "Strengths";
            dtweeknesses.TableName = "Weeknesses";
                

            var first = fhData.First();
            string fhkey = first.Key;

            dtfhData.Columns.Add(fhkey);
            dtfhData.Columns.Add("Bank");
            dtfhData.Columns.Add("BenchMark");
            dtfhData.Columns.Add("Peer1");
            dtfhData.Columns.Add("Peer2");
            dtfhData.Columns.Add("BenchMarkVar");
            dtfhData.Columns.Add("Peer1Var");
            dtfhData.Columns.Add("Peer2Var");
            dtfhData.Columns.Add("Category");

            dtloansleasesData.Columns.Add("LOANS & LEASES (% of Loans & Leases)");
            dtloansleasesData.Columns.Add("Bank");
            dtloansleasesData.Columns.Add("Peer1");
            dtloansleasesData.Columns.Add("Variance ($000)");

            dtstrengths.Columns.Add("Rank");
            dtstrengths.Columns.Add("Variance");
            dtstrengths.Columns.Add("Description");

            dtweeknesses.Columns.Add("Rank");
            dtweeknesses.Columns.Add("Variance");
            dtweeknesses.Columns.Add("Description");

            foreach (var fh in fhData)
            {
                if (fh.Key != "EarningsAndPerformance")
                {
                    DataRow row1 = dtfhData.NewRow();
                    row1[fhkey] = fh.Key;
                    dtfhData.Rows.Add(row1);
                }
                foreach (var rec in fh.Value)
                {
                    DataRow row = dtfhData.NewRow();
                    row[fhkey] = rec.Description;
                    row["Bank"] = rec.Bank;
                    row["BenchMark"] = rec.BenchMark;
                    row["Peer1"] = rec.PEER1;
                    row["Peer2"] = rec.PEER2;
                    row["BenchMarkVar"] = rec.BenchMarkVariance;
                    row["Peer1Var"] = rec.Peer1Variance;
                    row["Peer2Var"] = rec.Peer2Variance;
                    row["Category"] = rec.Category;

                    dtfhData.Rows.Add(row);
                }
                DataRow emptyrow = dtfhData.NewRow();
                emptyrow[fhkey] = string.Empty;
                emptyrow["Bank"] = string.Empty;
                emptyrow["BenchMark"] = string.Empty;
                emptyrow["Peer1"] = string.Empty;
                emptyrow["Peer2"] = string.Empty;
                emptyrow["BenchMarkVar"] = string.Empty;
                emptyrow["Peer1Var"] = string.Empty;
                emptyrow["Peer2Var"] = string.Empty;
                emptyrow["Category"] = string.Empty;

                dtfhData.Rows.Add(emptyrow);
            }


            foreach (var rec in loansleasesData)
            {
                DataRow row = dtloansleasesData.NewRow();
                row["LOANS & LEASES (% of Loans & Leases)"] = rec.Description;
                row["Bank"] = rec.Bank;
                row["Peer1"] = rec.Peer1;
                row["Variance ($000)"] = rec.Variance;

                dtloansleasesData.Rows.Add(row);
            }

            foreach (var rec in strWeakData["Strength"])
            {
                DataRow row = dtstrengths.NewRow();
                row["Rank"] = rec.Rank;
                row["Variance"] = rec.Variance;
                row["Description"] = rec.Description;

                dtstrengths.Rows.Add(row);
            }

            foreach (var rec in strWeakData["Weakness"])
            {
                DataRow row = dtweeknesses.NewRow();
                row["Rank"] = rec.Rank;
                row["Variance"] = rec.Variance;
                row["Description"] = rec.Description;

                dtweeknesses.Rows.Add(row);
            }


            DataTable[] metricArr = new DataTable[2];
                metricArr[0] = dtfhData;
                metricArr[1] = dtloansleasesData;

                List<ChartMetadata> fileNames = UtilityFunctions.GetChartFileNamesForScreen(UtilityFunctions.GetUserKey(User.Identity.Name), "GapAnalyzer");
                byte[] tmpBytes = null;

                tmpBytes = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "LoansAndLeasesVarianceChart").First().ChartImageGuid + ".jpg");
        //    MemoryStream mystream = new MemoryStream(tmpBytes);
                List<byte[]> img = new List<byte[]>();
                img.Add(tmpBytes);

                byte[] exceldata = ExportToExcel.CreateGapAnalyzerExportToExcel.CreateExcelDocument(metricArr, "GapAnalyzer.xlsx", introData, img, rptPeriod,dtstrengths, dtweeknesses, profileParams.QtdOrYtd);
                result.Content = new ByteArrayContent(exceldata);
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ms-excel");
                result.Content.Headers.ContentLength = exceldata.Length;
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = "GapAnalyzer" + profileParams.InstitutionKey.ToString() + ".xlsx";
                result.Content.Headers.ContentDisposition.Size = exceldata.Length;
            
               return result;
        }

        private string GetReportPeriod(string period)
        {
            //20161231
            string quarter = string.Empty;
            int month = Convert.ToInt32(period.Substring(4, 2));
            string reportPeriod = string.Empty;
            
            if (month >= 3 && month <= 5)
                quarter = "Q1";
            else if (month >= 6 && month <= 7)
                quarter = "Q2";
            else if (month >= 9 && month <= 11)
                quarter = "Q3";
            else
                quarter = "Q4";

            reportPeriod = period.Substring(0, 4) + quarter;

            return reportPeriod;
            
        }

        public static string GetTabOrder(int tabOrder, string ubprdesc)
        {
            string resUbprOrder = ubprdesc;
            if (tabOrder == 1)
            {

                resUbprOrder = "\t \t \t \t \t \t" + ubprdesc;
                return resUbprOrder;
            }
            else if (tabOrder == 2)
            {
                resUbprOrder = "\t \t \t \t \t \t \t \t \t" + ubprdesc;
                return resUbprOrder;
            }
            else if (tabOrder == 3)
            {
                resUbprOrder = "\t \t \t \t \t \t \t \t \t \t \t \t \t \t" + ubprdesc;
                return resUbprOrder;
            }
            return resUbprOrder;
        }
    }
}
