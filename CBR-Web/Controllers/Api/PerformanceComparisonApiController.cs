using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CBR.DataAccess;
using CBR.Web.Models;
using System.Data.SqlClient;
using System.Data;
using CBR.Web.WebCommons;
using CBR.Common;
using CBR.Web.ExportToExcel;
using System.Reflection;
using System.ComponentModel;
using CBR.Web.CustomFilter;

namespace CBR.Web.Controllers.Api
{
    public class PerformanceComparisonApiController : ApiController
    {
        [HttpPost]
        public List<BankPerformanceMetricData> GetBankPerformanceMetrices(BankPerformanceMetricParams perfMetricParams)
        {
            List<BankPerformanceMetricData> banksPerfMetric = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter instKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                SqlParameter location = new SqlParameter("@Location", SqlDbType.VarChar);
                SqlParameter assetSize = new SqlParameter("@AssetSize", SqlDbType.VarChar);
                SqlParameter percentile = new SqlParameter("@Percentile", SqlDbType.VarChar);
                SqlParameter kpiName = new SqlParameter("@KPIName", SqlDbType.VarChar);
                if (perfMetricParams.InstitutionKey == 0)
                    instKey.Value = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);
                else
                {
                    int insKey = UtilityFunctions.GetInstitutionKeyFromFDICNumber(perfMetricParams.InstitutionKey);
                    instKey.Value = insKey;
                }

                if (string.Compare("Select a Location", perfMetricParams.Location) == 0)
                    location.Value = UtilityFunctions.GetInstitutionState(Convert.ToInt32(instKey.Value));
                else
                    location.Value = perfMetricParams.Location;

                if (string.Compare("Asset Size", perfMetricParams.AssetSize) == 0 || string.IsNullOrEmpty(perfMetricParams.AssetSize))
                    assetSize.Value = "All Banks";
                else
                    assetSize.Value = perfMetricParams.AssetSize;

                if (string.Compare("Select Percentile", perfMetricParams.Percentile) == 0)
                    percentile.Value = "Top/Bottom 10%";
                else
                    percentile.Value = perfMetricParams.Percentile;

                if (string.IsNullOrEmpty(perfMetricParams.KPIName))
                    kpiName.Value = DBNull.Value;
                else
                    kpiName.Value = perfMetricParams.KPIName;

                banksPerfMetric = ent.Database.SqlQuery<BankPerformanceMetricData>("exec dbo.uspRptPerformanceComparision @InstitutionKey, @Location, @AssetSize, @Percentile, @KPIName", instKey, location, assetSize, percentile, kpiName).ToList();

                foreach (BankPerformanceMetricData perfMet in banksPerfMetric)
                {
                    if (perfMet.Bank.HasValue && perfMet.Top.HasValue)
                    {
                        if ((string.Compare(perfMet.UBPRConceptDesc, "Efficiency Ratio (%)") == 0) || (string.Compare(perfMet.UBPRConceptDesc, "Non-Performing Assets / Total Assets (%)") == 0))
                        {
                            perfMet.BankMinusTop = perfMet.Top - perfMet.Bank;
                        }
                        else
                        {
                            perfMet.BankMinusTop = perfMet.Bank - perfMet.Top;
                        }

                        if (perfMet.BankMinusTop < 0)
                            perfMet.IsBankMinusTopRed = true;
                        else
                            perfMet.IsBankMinusTopRed = false;
                    }

                    if (perfMet.Bank.HasValue && perfMet.Bottom.HasValue)
                    {
                        if ((string.Compare(perfMet.UBPRConceptDesc, "Efficiency Ratio (%)") == 0) || (string.Compare(perfMet.UBPRConceptDesc, "Non-Performing Assets / Total Assets (%)") == 0))
                        {
                            perfMet.BankMinusBottom = perfMet.Bottom - perfMet.Bank;
                        }
                        else
                        {
                            perfMet.BankMinusBottom = perfMet.Bank - perfMet.Bottom;
                        }

                        if (perfMet.BankMinusBottom < 0)
                            perfMet.IsBankMinusBottomRed = true;
                        else
                            perfMet.IsBankMinusBottomRed = false;
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return banksPerfMetric;
        }

        [HttpPost]
        public BankPerformanceIntroductionData GetBankPerformanceIntroductionData(BankPerformanceIntroParams introParams)
        {
            BankPerformanceIntroductionData introData = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                if (introParams.CertNumber == 0)
                {
                    int instKey = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);
                    DimInstitution inst = ent.DimInstitutions.FirstOrDefault(obj => obj.InstitutionKey == instKey);
                    if (inst != null)
                    {
                        introData = new BankPerformanceIntroductionData();
                        introData.Name = inst.InstitutionName;
                        introData.CertNumber = inst.CertNumber;
                        introData.BankState = inst.InstitutionStateName;
                        introData.InstitutionKey = inst.InstitutionKey;
                    }
                }
                else
                {
                    DimInstitution inst = ent.DimInstitutions.FirstOrDefault(obj => obj.CertNumber == introParams.CertNumber && obj.IsActive == true);
                    if (inst != null)
                    {
                        introData = new BankPerformanceIntroductionData();
                        introData.Name = inst.InstitutionName;
                        introData.CertNumber = inst.CertNumber;
                        introData.BankState = inst.InstitutionStateName;
                        introData.InstitutionKey = inst.InstitutionKey;
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return introData;
        }

        [HttpPost]
        public BankPerformanceKpi GetBankPerformanceKpi(BankPerformanceMetricParams perfMetricParams)
        {
            BankPerformanceKpi kpi = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter instKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                SqlParameter location = new SqlParameter("@Location", SqlDbType.VarChar);
                SqlParameter assetSize = new SqlParameter("@AssetSize", SqlDbType.VarChar);
                SqlParameter percentile = new SqlParameter("@Percentile", SqlDbType.VarChar);
                SqlParameter kpiName = new SqlParameter("@KPIName", SqlDbType.VarChar);
                if (perfMetricParams.InstitutionKey == 0)
                    instKey.Value = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);
                else
                {
                    int insKey = UtilityFunctions.GetInstitutionKeyFromFDICNumber(perfMetricParams.InstitutionKey);
                    instKey.Value = insKey;
                }

                if (string.Compare("Select a Location", perfMetricParams.Location) == 0)
                    location.Value = UtilityFunctions.GetInstitutionState(Convert.ToInt32(instKey.Value));
                else
                    location.Value = perfMetricParams.Location;

                if (string.Compare("Asset Size", perfMetricParams.AssetSize) == 0 || string.IsNullOrEmpty(perfMetricParams.AssetSize))
                    assetSize.Value = "All Banks";
                else
                    assetSize.Value = perfMetricParams.AssetSize;

                if (string.Compare("Select Percentile", perfMetricParams.Percentile) == 0)
                    percentile.Value = "Top/Bottom 10%";
                else
                    percentile.Value = perfMetricParams.Percentile;

                if (string.IsNullOrEmpty(perfMetricParams.KPIName))
                    kpiName.Value = DBNull.Value;
                else
                    kpiName.Value = perfMetricParams.KPIName;

                var banksPerfMetric = ent.Database.SqlQuery<BankPerformanceKpiData>("exec dbo.uspRptPerformanceComparision @InstitutionKey, @Location, @AssetSize, @Percentile, @KPIName", instKey, location, assetSize, percentile, kpiName).ToList();

                if (banksPerfMetric.Count > 0)
                {
                    kpi = new BankPerformanceKpi();
                    List<BankPerformanceKpiData> topList = banksPerfMetric.Where(obj => obj.OrderType == "Top").ToList();
                    List<BankPerformanceKpiData> bottomList = banksPerfMetric.Where(obj => obj.OrderType == "Bottom").ToList();

                    if (perfMetricParams.RankTableSortOrder == "ASC")
                    {
                        topList = topList.OrderBy(obj => obj.UBPRDataValue).ToList();
                        bottomList = bottomList.OrderByDescending(obj => obj.UBPRDataValue).ToList();
                    }
                    else
                    {
                        topList = topList.OrderByDescending(obj => obj.UBPRDataValue).ToList();
                        bottomList = bottomList.OrderBy(obj => obj.UBPRDataValue).ToList();
                    }

                    for (int i = 0; i < topList.Count; i++)
                    {
                        topList[i].InstituteOrder = (i + 1);
                    }

                    for (int j = 0; j < bottomList.Count; j++)
                    {
                        bottomList[j].InstituteOrder = (j + 1);
                    }

                    kpi.TopBanks = topList;
                    kpi.BottomBanks = bottomList;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return kpi;
        }

        [HttpPost]
        public string SaveFavoriteSearch(FavoriteSearchParams favSearchParams)
        {
            string returnMessage = string.Empty;
            try
            {
                long userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long? minValue = (string.IsNullOrEmpty(favSearchParams.AssetMinSize) ? (long?)null : long.Parse(favSearchParams.AssetMinSize));
                long? maxValue = (string.IsNullOrEmpty(favSearchParams.AssetMaxSize) ? (long?)null : long.Parse(favSearchParams.AssetMaxSize));
                var existingRecord = ent.AppFavoriteSearches.FirstOrDefault(obj => obj.AssetSize == favSearchParams.AssetSize &&
                                                                                                    obj.Location == favSearchParams.Location &&
                                                                                                    obj.Percentile == favSearchParams.Percentile &&
                                                                                                    obj.UserKey == userKey);
                if (existingRecord != null)
                    returnMessage = "Favorite search criteria could not be saved as a similar search criteria already exists as favorite search.";
                else
                {
                    ent.AppFavoriteSearches.Add(new AppFavoriteSearch()
                    {
                        UserKey = userKey,
                        Location = favSearchParams.Location,
                        Percentile = favSearchParams.Percentile,
                        AssetSize = favSearchParams.AssetSize
                    });
                    ent.SaveChanges();
                    returnMessage = "Favorite search criteria successfully saved.";
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return returnMessage;
        }

        [HttpGet]
        public List<FavoriteSearchParams> GetFavoriteSearchesOfUser()
        {
            List<FavoriteSearchParams> favSearches = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                var result = ent.AppFavoriteSearches.SqlQuery("select * from AppFavoriteSearch where UserKey = " + userKey.ToString()).ToList();
                FavoriteSearchParams searchObj = null;
                if (result.Count > 0)
                {
                    favSearches = new List<FavoriteSearchParams>();
                    foreach (AppFavoriteSearch search in result)
                    {
                        searchObj = new FavoriteSearchParams();
                        searchObj.AssetSize = search.AssetSize;
                        searchObj.Location = search.Location;
                        searchObj.Percentile = search.Percentile;
                        favSearches.Add(searchObj);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return favSearches;
        }


        public Dictionary<string, List<BankProfileSectionHeader>> GetBottomBankQtrHeaders()
        {
            Dictionary<string, List<BankProfileSectionHeader>> qtrRiskProfileTableHeaders = new Dictionary<string, List<BankProfileSectionHeader>>();
            List<BankProfileSectionHeader> qtrRankTableHeaders = new List<BankProfileSectionHeader>();
            //List<BankProfileSectionHeader> qtrAverageTableHeaders = new List<BankProfileSectionHeader>();
            string lastQuarterString = CommonFunctions.GetLastQuarterString();
            string month = lastQuarterString.Substring(4, 2);
            string year = lastQuarterString.Substring(0, 4);
            string day = lastQuarterString.Substring(6, 2);
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));
            //DateTime minus1QuarteDate = latestQuarterDate.AddMonths(-3);
            //DateTime minus2QuarteDate = latestQuarterDate.AddMonths(-6);
            //DateTime minus3QuarteDate = latestQuarterDate.AddMonths(-9);
            //DateTime minus4QuarteDate = latestQuarterDate.AddMonths(-12);
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = "" });
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = "Bottom Performing Ranking Table" });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = "#" });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = "Peer Group Averages" });
            string latestQuarterString = string.Empty;
            if (latestQuarterDate.Month < 10)
            {
                string latestQuarterMonth = "0" + latestQuarterDate.Month.ToString();
                latestQuarterString = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString());
            }
            else
                latestQuarterString = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year.ToString() + latestQuarterDate.Month.ToString() + latestQuarterDate.Day.ToString());

            //string minus1QuarterString = string.Empty;
            //if (minus1QuarteDate.Month < 10)
            //{
            //    string minus1QuarterMonth = "0" + minus1QuarteDate.Month.ToString();
            //    minus1QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus1QuarterMonth + minus1QuarteDate.Day.ToString());
            //}
            //else
            //    minus1QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus1QuarteDate.Month.ToString() + minus1QuarteDate.Day.ToString());

            //string minus2QuarterString = string.Empty;
            //if (minus2QuarteDate.Month < 10)
            //{
            //    string minus2QuarterMonth = "0" + minus2QuarteDate.Month.ToString();
            //    minus2QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus2QuarterMonth + minus1QuarteDate.Day.ToString());
            //}
            //else
            //    minus1QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus2QuarteDate.Month.ToString() + minus2QuarteDate.Day.ToString());

            //string minus3QuarterString = string.Empty;
            //if (minus3QuarteDate.Month < 10)
            //{
            //    string minus3QuarterMonth = "0" + minus3QuarteDate.Month.ToString();
            //    minus3QuarterString = CommonFunctions.GetQuarterLabel(minus3QuarteDate.Year.ToString() + minus3QuarterMonth + minus3QuarteDate.Day.ToString());
            //}
            //else
            //    minus3QuarterString = CommonFunctions.GetQuarterLabel(minus3QuarteDate.Year.ToString() + minus3QuarteDate.Month.ToString() + minus3QuarteDate.Day.ToString());

            //string minus4QuarterString = string.Empty;
            //if (minus4QuarteDate.Month < 10)
            //{
            //    string minus4QuarterMonth = "0" + minus4QuarteDate.Month.ToString();
            //    minus4QuarterString = CommonFunctions.GetQuarterLabel(minus4QuarteDate.Year.ToString() + minus4QuarterMonth + minus4QuarteDate.Day.ToString());
            //}
            //else
            //    minus4QuarterString = CommonFunctions.GetQuarterLabel(minus4QuarteDate.Year.ToString() + minus4QuarteDate.Month.ToString() + minus4QuarteDate.Day.ToString());

            //qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            //qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            //qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            //qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            qtrRiskProfileTableHeaders.Add("QtrRankTableHeaders", qtrRankTableHeaders);
            //qtrRiskProfileTableHeaders.Add("QtrAverageTableHeaders", qtrAverageTableHeaders);

            return qtrRiskProfileTableHeaders;
        }

        public Dictionary<string, List<BankProfileSectionHeader>> GetTopBankQtrHeaders()
        {
            Dictionary<string, List<BankProfileSectionHeader>> qtrRiskProfileTableHeaders = new Dictionary<string, List<BankProfileSectionHeader>>();
            List<BankProfileSectionHeader> qtrRankTableHeaders = new List<BankProfileSectionHeader>();
            //List<BankProfileSectionHeader> qtrAverageTableHeaders = new List<BankProfileSectionHeader>();
            string lastQuarterString = CommonFunctions.GetLastQuarterString();
            string month = lastQuarterString.Substring(4, 2);
            string year = lastQuarterString.Substring(0, 4);
            string day = lastQuarterString.Substring(6, 2);
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));
            //DateTime minus1QuarteDate = latestQuarterDate.AddMonths(-3);
            //DateTime minus2QuarteDate = latestQuarterDate.AddMonths(-6);
            //DateTime minus3QuarteDate = latestQuarterDate.AddMonths(-9);
            //DateTime minus4QuarteDate = latestQuarterDate.AddMonths(-12);
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = "" });
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = "Top Performing Ranking Table" });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = "#" });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = "Peer Group Averages" });
            string latestQuarterString = string.Empty;
            if (latestQuarterDate.Month < 10)
            {
                string latestQuarterMonth = "0" + latestQuarterDate.Month.ToString();
                latestQuarterString = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString());
            }
            else
                latestQuarterString = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year.ToString() + latestQuarterDate.Month.ToString() + latestQuarterDate.Day.ToString());

            //string minus1QuarterString = string.Empty;
            //if (minus1QuarteDate.Month < 10)
            //{
            //    string minus1QuarterMonth = "0" + minus1QuarteDate.Month.ToString();
            //    minus1QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus1QuarterMonth + minus1QuarteDate.Day.ToString());
            //}
            //else
            //    minus1QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus1QuarteDate.Month.ToString() + minus1QuarteDate.Day.ToString());

            //string minus2QuarterString = string.Empty;
            //if (minus2QuarteDate.Month < 10)
            //{
            //    string minus2QuarterMonth = "0" + minus2QuarteDate.Month.ToString();
            //    minus2QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus2QuarterMonth + minus1QuarteDate.Day.ToString());
            //}
            //else
            //    minus1QuarterString = CommonFunctions.GetQuarterLabel(minus1QuarteDate.Year.ToString() + minus2QuarteDate.Month.ToString() + minus2QuarteDate.Day.ToString());

            //string minus3QuarterString = string.Empty;
            //if (minus3QuarteDate.Month < 10)
            //{
            //    string minus3QuarterMonth = "0" + minus3QuarteDate.Month.ToString();
            //    minus3QuarterString = CommonFunctions.GetQuarterLabel(minus3QuarteDate.Year.ToString() + minus3QuarterMonth + minus3QuarteDate.Day.ToString());
            //}
            //else
            //    minus3QuarterString = CommonFunctions.GetQuarterLabel(minus3QuarteDate.Year.ToString() + minus3QuarteDate.Month.ToString() + minus3QuarteDate.Day.ToString());

            //string minus4QuarterString = string.Empty;
            //if (minus4QuarteDate.Month < 10)
            //{
            //    string minus4QuarterMonth = "0" + minus4QuarteDate.Month.ToString();
            //    minus4QuarterString = CommonFunctions.GetQuarterLabel(minus4QuarteDate.Year.ToString() + minus4QuarterMonth + minus4QuarteDate.Day.ToString());
            //}
            //else
            //    minus4QuarterString = CommonFunctions.GetQuarterLabel(minus4QuarteDate.Year.ToString() + minus4QuarteDate.Month.ToString() + minus4QuarteDate.Day.ToString());

            //qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            //qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            //qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            //qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            //qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            qtrRiskProfileTableHeaders.Add("QtrRankTableHeaders", qtrRankTableHeaders);
            //qtrRiskProfileTableHeaders.Add("QtrAverageTableHeaders", qtrAverageTableHeaders);

            return qtrRiskProfileTableHeaders;
        }

        public byte[] ExportToExcel(BankPerformanceMetricParams perfMetricParams, string fileName)
        {
            byte[] excelBytes = null;
            try
            {
                BankPerformanceMetricParams metricParams = new BankPerformanceMetricParams();
                List<BankPerformanceMetricParams> bankInformationParams = new List<BankPerformanceMetricParams>();
                metricParams.AssetSize = perfMetricParams.AssetSize;
                metricParams.InstitutionKey = perfMetricParams.InstitutionKey;
                metricParams.KPIName = null;
                metricParams.Location = perfMetricParams.Location;
                metricParams.Percentile = perfMetricParams.Percentile;
                metricParams.RankTableSortOrder = null;
                bankInformationParams.Add(perfMetricParams);
                List<BankPerformanceMetricData> perfMet = this.GetBankPerformanceMetrices(metricParams);
                BankPerformanceKpi kpiData = this.GetBankPerformanceKpi(perfMetricParams);
                DataTable perfMetDataAsTable = CreateExcelFile.ListToDataTable(perfMet, "Performance Metrices", string.Empty);
                DataTable topBanks = CreateExcelFile.ListToDataTable(kpiData.TopBanks, "Top Banks", perfMetricParams.KPIName);
                DataTable bottomBanks = CreateExcelFile.ListToDataTable(kpiData.BottomBanks, "Bottom Banks", perfMetricParams.KPIName);
                DataTable bankInformation = CreateExcelFile.ListToDataTable(bankInformationParams, "Information", perfMetricParams.KPIName);
                DataTable[] metricArr = new DataTable[4];
                metricArr[0] = bankInformation;
                metricArr[1] = perfMetDataAsTable;
                metricArr[2] = topBanks;
                metricArr[3] = bottomBanks;
                excelBytes = CreateExcelFile.CreateExcelDocument(metricArr, "PerformanceAnalysis.xslx");
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return excelBytes;
        }
    }
}
