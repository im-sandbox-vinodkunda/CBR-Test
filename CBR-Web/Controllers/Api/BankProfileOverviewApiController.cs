using CBR.Web.Models;
using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;
using CBR.Common;
using System.Net.Http;
using System.IO;
using System.Net.Http.Headers;
using System.Net;
using CBR.Web.CustomFilter;
using System.Web;
using Aspose.Pdf.Text;
using System.Text;

namespace CBR.Web.Controllers.Api
{
    public class BankProfileOverviewApiController : ApiController
    {
        [HttpPost]
        public BankProfileIntroductionData GetBankProfileIntroductionData(BankProfileOverviewParams profileParams)
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
                        if(!profile.WebAddress.Contains("http"))
                            profile.WebAddress = "http://" + profile.WebAddress;
                    }
                    else
                    {
                        profile.WebAddress = "#";
                    }

                    profile.InstitutionKey = profileParams.InstitutionKey;
                }
            }
            catch(Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return profile;
        }

        [HttpPost]
        public BankProfileDetailsViewModel GetBankProfileDetails(BankProfileOverviewParams profileParams)
        {
            BankProfileDetailsViewModel profileData = null;
            try
            {
                if (profileParams.InstitutionKey == 0)
                    profileParams.InstitutionKey = UtilityFunctions.GetInstitutionKey(User.Identity.Name);

                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                SqlParameter instKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                instKey.Value = profileParams.InstitutionKey;
                var result = ent.Database.SqlQuery<BankProfileData>("exec dbo.uspRptBankProfileData @Institutionkey", instKey).ToList();
                profileData = new BankProfileDetailsViewModel();
                List<BankProfileData> qtrData = result.Where(obje => obje.ReportTabName == "QTD").ToList();
                List<BankProfileData> ytdData = result.Where(obje => obje.ReportTabName == "YTD").ToList();
                profileData.BankProfileDataSections.Add("QuarterlyProfileData", this.GroupBankProfileDataPerSection(qtrData));
                profileData.BankProfileDataSections.Add("YearlyProfileData", this.GroupBankProfileDataPerSection(ytdData));
            }
            catch(Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return profileData;
        }

        public Dictionary<string, List<BankProfileSectionHeader>> GetYtdHeaders()
        {
            Dictionary<string, List<BankProfileSectionHeader>> headersPerSection = new Dictionary<string, List<BankProfileSectionHeader>>();
            List<BankProfileSectionHeader> balanceSheet = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> incomeStatement = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> earningsAndPerformance = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> assetQuality = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> capitalRatios = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> liquidity = new List<BankProfileSectionHeader>();

            string lastQuarterString = CommonFunctions.GetLastQuarterString();
            string month = lastQuarterString.Substring(4, 2);
            string year = lastQuarterString.Substring(0, 4);
            string day = lastQuarterString.Substring(6, 2);
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));


            for (int i = (latestQuarterDate.Year - 4); i < (latestQuarterDate.Year); i++)
            {
                balanceSheet.Add(new BankProfileSectionHeader() { Label = i.ToString() + "Y" });
                incomeStatement.Add(new BankProfileSectionHeader() { Label = i.ToString() + "Y" });
                earningsAndPerformance.Add(new BankProfileSectionHeader() { Label = i.ToString() + "Y" });
                assetQuality.Add(new BankProfileSectionHeader() { Label = i.ToString() + "Y" });
                capitalRatios.Add(new BankProfileSectionHeader() { Label = i.ToString() + "Y" });
                liquidity.Add(new BankProfileSectionHeader() { Label = i.ToString() + "Y" });
            }

            string latestQuarterMonth = string.Empty;
            if (latestQuarterDate.Month < 10)
            {
                latestQuarterMonth = "0" + latestQuarterDate.Month.ToString();
            }
            else
            {
                latestQuarterMonth = latestQuarterDate.Month.ToString();
            }

            balanceSheet.Add(new BankProfileSectionHeader() { Label = CommonFunctions.GetYearlyLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString()) });
            incomeStatement.Add(new BankProfileSectionHeader() { Label = CommonFunctions.GetYearlyLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString()) });
            earningsAndPerformance.Add(new BankProfileSectionHeader() { Label = CommonFunctions.GetYearlyLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString()) });
            assetQuality.Add(new BankProfileSectionHeader() { Label = CommonFunctions.GetYearlyLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString()) });
            capitalRatios.Add(new BankProfileSectionHeader() { Label = CommonFunctions.GetYearlyLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString()) });
            liquidity.Add(new BankProfileSectionHeader() { Label = CommonFunctions.GetYearlyLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString()) });

            headersPerSection.Add("BalanceSheet", balanceSheet);
            headersPerSection.Add("IncomeStatement", incomeStatement);
            headersPerSection.Add("EarningsAndPerformance", earningsAndPerformance);
            headersPerSection.Add("AssetQuality", assetQuality);
            headersPerSection.Add("CapitalRatios", capitalRatios);
            headersPerSection.Add("Liquidity", liquidity);

            return headersPerSection;
        }

        public Dictionary<string, List<BankProfileSectionHeader>> GetQtrHeaders()
        {
            Dictionary<string, List<BankProfileSectionHeader>> headersPerSection = new Dictionary<string, List<BankProfileSectionHeader>>();
            List<BankProfileSectionHeader> balanceSheet = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> incomeStatement = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> earningsAndPerformance = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> assetQuality = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> capitalRatios = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> liquidity = new List<BankProfileSectionHeader>();

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
                minus2QuarterString = CommonFunctions.GetQuarterLabel(minus2QuarteDate.Year.ToString() + minus2QuarterMonth + minus2QuarteDate.Day.ToString());
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
            balanceSheet.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            balanceSheet.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            balanceSheet.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            balanceSheet.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            balanceSheet.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            incomeStatement.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            incomeStatement.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            incomeStatement.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            incomeStatement.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            incomeStatement.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            earningsAndPerformance.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            earningsAndPerformance.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            earningsAndPerformance.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            earningsAndPerformance.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            earningsAndPerformance.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            assetQuality.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            assetQuality.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            assetQuality.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            assetQuality.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            assetQuality.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            capitalRatios.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            capitalRatios.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            capitalRatios.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            capitalRatios.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            capitalRatios.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            liquidity.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            liquidity.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            liquidity.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            liquidity.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            liquidity.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            headersPerSection.Add("BalanceSheet", balanceSheet);
            headersPerSection.Add("IncomeStatement", incomeStatement);
            headersPerSection.Add("EarningsAndPerformance", earningsAndPerformance);
            headersPerSection.Add("AssetQuality", assetQuality);
            headersPerSection.Add("CapitalRatios", capitalRatios);
            headersPerSection.Add("Liquidity", liquidity);

            return headersPerSection;
        }

        [HttpPost]
        public Dictionary<string, List<Column2DChartDataValue>> GetBankProfileBarChartData(BankProfileOverviewParams profileParams)
        {
            string lastQuarterString = CommonFunctions.GetLastQuarterString();
            string month = lastQuarterString.Substring(4, 2);
            string year = lastQuarterString.Substring(0, 4);
            string day = lastQuarterString.Substring(6, 2);
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));

            string latestQuarterMonth = string.Empty;
            if (latestQuarterDate.Month < 10)
            {
                latestQuarterMonth = "0" + latestQuarterDate.Month.ToString();
            }
            else
            {
                latestQuarterMonth = latestQuarterDate.Month.ToString();
            }
            Dictionary<string, List<Column2DChartDataValue>> bankProfileBarChartData = new Dictionary<string, List<Column2DChartDataValue>>();
            List<Column2DChartDataValue> assetGrowthRateQtr = new List<Column2DChartDataValue>();
            List<Column2DChartDataValue> loansLeasesGrowthRateQtr = new List<Column2DChartDataValue>();
            List<Column2DChartDataValue> depositGrowthRateQtr = new List<Column2DChartDataValue>();
            List<Column2DChartDataValue> equityCapitalGrowthRateQtr = new List<Column2DChartDataValue>();

            List<Column2DChartDataValue> assetGrowthRateYtd = new List<Column2DChartDataValue>();
            List<Column2DChartDataValue> loansLeasesGrowthRateYtd = new List<Column2DChartDataValue>();
            List<Column2DChartDataValue> depositGrowthRateYtd = new List<Column2DChartDataValue>();
            List<Column2DChartDataValue> equityCapitalGrowthRateYtd = new List<Column2DChartDataValue>();
            try
            {
                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();

                if (profileParams.InstitutionKey == 0)
                    profileParams.InstitutionKey = UtilityFunctions.GetInstitutionKey(User.Identity.Name);

                SqlParameter instKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                instKey.Value = profileParams.InstitutionKey;
                var result = ent.Database.SqlQuery<BankProfileBarGraphData>("exec dbo.uspRptBankProfileBarGraphData @InstitutionKey", instKey).ToList();
                List<BankProfileBarGraphData> qtrBarGraphData = result.Where(obje => obje.PeriodType == "QTR").ToList();
                qtrBarGraphData.Sort();

                List<BankProfileBarGraphData> ytdBarGraphData = result.Where(obje => obje.PeriodType == "YTD").ToList();
                ytdBarGraphData.Sort();

                foreach (BankProfileBarGraphData qtrDataRow in qtrBarGraphData)
                {
                    assetGrowthRateQtr.Add(new Column2DChartDataValue()
                    {
                        label = CommonFunctions.GetQuarterLabel(qtrDataRow.Year.ToString()),
                        value = qtrDataRow.AssetGrowthRate.ToString()
                    });

                    loansLeasesGrowthRateQtr.Add(new Column2DChartDataValue()
                    {
                        label = CommonFunctions.GetQuarterLabel(qtrDataRow.Year.ToString()),
                        value = qtrDataRow.LoansLeasesGrowthRate.ToString()
                    });

                    depositGrowthRateQtr.Add(new Column2DChartDataValue()
                    {
                        label = CommonFunctions.GetQuarterLabel(qtrDataRow.Year.ToString()),
                        value = qtrDataRow.DepositGrowthRate.ToString()
                    });

                    equityCapitalGrowthRateQtr.Add(new Column2DChartDataValue()
                    {
                        label = CommonFunctions.GetQuarterLabel(qtrDataRow.Year.ToString()),
                        value = qtrDataRow.EquityCapitalGrowthRate.ToString()
                    });
                }

                foreach (BankProfileBarGraphData ytdRow in ytdBarGraphData)
                {
                    string effectiveLabel = string.Empty;
                    if (ytdRow.Year < DateTime.Now.Year)
                        effectiveLabel = ytdRow.Year.ToString() + "Y";

                    if (ytdRow.Year == DateTime.Now.Year)
                    {
                        effectiveLabel = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year + latestQuarterMonth + latestQuarterDate.Day.ToString());
                    }

                    assetGrowthRateYtd.Add(new Column2DChartDataValue()
                    {
                        label = effectiveLabel,
                        value = ytdRow.AssetGrowthRate.ToString()
                    });

                    loansLeasesGrowthRateYtd.Add(new Column2DChartDataValue()
                    {
                        label = effectiveLabel,
                        value = ytdRow.LoansLeasesGrowthRate.ToString()
                    });

                    depositGrowthRateYtd.Add(new Column2DChartDataValue()
                    {
                        label = effectiveLabel,
                        value = ytdRow.DepositGrowthRate.ToString()
                    });

                    equityCapitalGrowthRateYtd.Add(new Column2DChartDataValue()
                    {
                        label = effectiveLabel,
                        value = ytdRow.EquityCapitalGrowthRate.ToString()
                    });
                }

                bankProfileBarChartData.Add("AssetGrowthRateQtr", assetGrowthRateQtr);
                bankProfileBarChartData.Add("LoansLeasesGrowthRateQtr", loansLeasesGrowthRateQtr);
                bankProfileBarChartData.Add("DepositGrowthRateQtr", depositGrowthRateQtr);
                bankProfileBarChartData.Add("EquityCapitalGrowthRateQtr", equityCapitalGrowthRateQtr);

                bankProfileBarChartData.Add("AssetGrowthRateYtd", assetGrowthRateYtd);
                bankProfileBarChartData.Add("LoansLeasesGrowthRateYtd", loansLeasesGrowthRateYtd);
                bankProfileBarChartData.Add("DepositGrowthRateYtd", depositGrowthRateYtd);
                bankProfileBarChartData.Add("EquityCapitalGrowthYtd", equityCapitalGrowthRateYtd);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return bankProfileBarChartData;
        }

        [HttpPost]
        public BankProfilePieChartData GetBankProfilePieChartData(BankProfileOverviewParams profileParams)
        {
            Category qtdCategory = UtilityFunctions.GetQuarterlyCategories();
            Category ytdCategory = UtilityFunctions.GetYearlyCategories();

            BankProfilePieChartData pieChartData = new BankProfilePieChartData();
            try
            {
                if (profileParams.InstitutionKey == 0)
                    profileParams.InstitutionKey = UtilityFunctions.GetInstitutionKey(User.Identity.Name);

                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                SqlParameter instKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                instKey.Value = profileParams.InstitutionKey;
                var result = ent.Database.SqlQuery<BankProfileData>("exec dbo.uspRptBankProfileData @Institutionkey", instKey).ToList();
                BankProfileDetailsViewModel profileData = new BankProfileDetailsViewModel();
                List<BankProfileData> pieDataQtd = result.Where(obje => obje.ReportTabName == "QTD" && obje.SectionName == "Pie Charts").ToList();
                List<BankProfileData> pieDataYtd = result.Where(obje => obje.ReportTabName == "YTD" && obje.SectionName == "Pie Charts").ToList();

                //filter load composition data
                List<BankProfileData> loadCompDataQtd = pieDataQtd.Where(obje => obje.UBPRConceptCode == "CALC0520"
                || obje.UBPRConceptCode == "CALC0521"
                || obje.UBPRConceptCode == "CALC0522"
                || obje.UBPRConceptCode == "CALC0523"
                || obje.UBPRConceptCode == "CALC0524"
                || obje.UBPRConceptCode == "CALC0525"
                || obje.UBPRConceptCode == "CALC0526"
                || obje.UBPRConceptCode == "CALC0527"
                ).ToList();

                foreach (BankProfileData loadCompRow in loadCompDataQtd)
                {
                    StackedChartSeriesData stackChartData = new StackedChartSeriesData();
                    stackChartData.seriesname = this.GetShortLegend(loadCompRow.UBPRConceptDesc);
                    stackChartData.color = this.GetSeriesColor(this.GetShortLegend(loadCompRow.UBPRConceptDesc));
                    stackChartData.data = new List<ChartDataValue>();
                    stackChartData.data.Add(new ChartDataValue() { Value = loadCompRow.Minus4Data, ToolText = qtdCategory.CategoryLabels[0].Label + " " + loadCompRow.UBPRConceptDesc + " (" + Decimal.Round(loadCompRow.Minus4Data.HasValue ? loadCompRow.Minus4Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = loadCompRow.Minus3Data, ToolText = qtdCategory.CategoryLabels[1].Label + " " + loadCompRow.UBPRConceptDesc + " (" + Decimal.Round(loadCompRow.Minus3Data.HasValue ? loadCompRow.Minus3Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = loadCompRow.Minus2Data, ToolText = qtdCategory.CategoryLabels[2].Label + " " + loadCompRow.UBPRConceptDesc + " (" + Decimal.Round(loadCompRow.Minus2Data.HasValue ? loadCompRow.Minus2Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = loadCompRow.Minus1Data, ToolText = qtdCategory.CategoryLabels[3].Label + " " + loadCompRow.UBPRConceptDesc + " (" + Decimal.Round(loadCompRow.Minus1Data.HasValue ? loadCompRow.Minus1Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = loadCompRow.CurrentData, ToolText = qtdCategory.CategoryLabels[4].Label + " " + loadCompRow.UBPRConceptDesc + " (" + Decimal.Round(loadCompRow.CurrentData.HasValue ? loadCompRow.CurrentData.Value : 0, 2).ToString() + "%)" });
                    pieChartData.LoadCompositionStackChartDataQtd.Add(stackChartData);
                }

                List<BankProfileData> depositCompDataQtd = pieDataQtd.Where(obje => obje.UBPRConceptCode == "CALC0010"
                || obje.UBPRConceptCode == "CALC0011"
                || obje.UBPRConceptCode == "CALC0012"
                || obje.UBPRConceptCode == "CALC0013"
                || obje.UBPRConceptCode == "CALC0014"
                || obje.UBPRConceptCode == "CALC0116"
                || obje.UBPRConceptCode == "CALC0118"
                ).ToList();

                foreach (BankProfileData depositCompRow in depositCompDataQtd)
                {
                    StackedChartSeriesData stackChartData = new StackedChartSeriesData();
                    stackChartData.seriesname = this.GetShortLegend(depositCompRow.UBPRConceptDesc);
                    stackChartData.color = this.GetSeriesColor(this.GetShortLegend(depositCompRow.UBPRConceptDesc));
                    stackChartData.data = new List<ChartDataValue>();
                    stackChartData.data.Add(new ChartDataValue() { Value = depositCompRow.Minus4Data, ToolText = qtdCategory.CategoryLabels[0].Label + " " + depositCompRow.UBPRConceptDesc + " (" + Decimal.Round(depositCompRow.Minus4Data.HasValue ? depositCompRow.Minus4Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = depositCompRow.Minus3Data, ToolText = qtdCategory.CategoryLabels[1].Label + " " + depositCompRow.UBPRConceptDesc + " (" + Decimal.Round(depositCompRow.Minus3Data.HasValue ? depositCompRow.Minus3Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = depositCompRow.Minus2Data, ToolText = qtdCategory.CategoryLabels[2].Label + " " + depositCompRow.UBPRConceptDesc + " (" + Decimal.Round(depositCompRow.Minus2Data.HasValue ? depositCompRow.Minus2Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = depositCompRow.Minus1Data, ToolText = qtdCategory.CategoryLabels[3].Label + " " + depositCompRow.UBPRConceptDesc + " (" + Decimal.Round(depositCompRow.Minus1Data.HasValue ? depositCompRow.Minus1Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = depositCompRow.CurrentData, ToolText = qtdCategory.CategoryLabels[4].Label + " " + depositCompRow.UBPRConceptDesc + " (" + Decimal.Round(depositCompRow.CurrentData.HasValue ? depositCompRow.CurrentData.Value : 0, 2).ToString() + "%)" });
                    pieChartData.DepositCompositionStackChartDataQtd.Add(stackChartData);
                }

                List<BankProfileData> loadCompDataYtd = pieDataYtd.Where(obje => obje.UBPRConceptCode == "CALC0520"
                || obje.UBPRConceptCode == "CALC0521"
                || obje.UBPRConceptCode == "CALC0522"
                || obje.UBPRConceptCode == "CALC0523"
                || obje.UBPRConceptCode == "CALC0524"
                || obje.UBPRConceptCode == "CALC0525"
                || obje.UBPRConceptCode == "CALC0526"
                || obje.UBPRConceptCode == "CALC0527"
                ).ToList();

                foreach (BankProfileData loadCompRow in loadCompDataYtd)
                {
                    StackedChartSeriesData stackChartData = new StackedChartSeriesData();
                    stackChartData.seriesname = this.GetShortLegend(loadCompRow.UBPRConceptDesc);
                    stackChartData.color = this.GetSeriesColor(this.GetShortLegend(loadCompRow.UBPRConceptDesc));
                    stackChartData.data = new List<ChartDataValue>();
                    stackChartData.data.Add(new ChartDataValue() { Value = loadCompRow.Minus4Data, ToolText = ytdCategory.CategoryLabels[0].Label + " " + loadCompRow.UBPRConceptDesc + " (" + Decimal.Round(loadCompRow.Minus4Data.HasValue ? loadCompRow.Minus4Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = loadCompRow.Minus3Data, ToolText = ytdCategory.CategoryLabels[1].Label + " " + loadCompRow.UBPRConceptDesc + " (" + Decimal.Round(loadCompRow.Minus3Data.HasValue ? loadCompRow.Minus3Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = loadCompRow.Minus2Data, ToolText = ytdCategory.CategoryLabels[2].Label + " " + loadCompRow.UBPRConceptDesc + " (" + Decimal.Round(loadCompRow.Minus2Data.HasValue ? loadCompRow.Minus2Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = loadCompRow.Minus1Data, ToolText = ytdCategory.CategoryLabels[3].Label + " " + loadCompRow.UBPRConceptDesc + " (" + Decimal.Round(loadCompRow.Minus1Data.HasValue ? loadCompRow.Minus1Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = loadCompRow.CurrentData, ToolText = ytdCategory.CategoryLabels[4].Label + " " + loadCompRow.UBPRConceptDesc + " (" + Decimal.Round(loadCompRow.CurrentData.HasValue ? loadCompRow.CurrentData.Value : 0, 2).ToString() + "%)" });
                    pieChartData.LoadCompositionStackChartDataYtd.Add(stackChartData);
                }

                List<BankProfileData> depositCompDataYtd = pieDataYtd.Where(obje => obje.UBPRConceptCode == "CALC0010"
                || obje.UBPRConceptCode == "CALC0011"
                || obje.UBPRConceptCode == "CALC0012"
                || obje.UBPRConceptCode == "CALC0013"
                || obje.UBPRConceptCode == "CALC0014"
                || obje.UBPRConceptCode == "CALC0116"
                || obje.UBPRConceptCode == "CALC0118"
                ).ToList();

                foreach (BankProfileData depositCompRow in depositCompDataYtd)
                {
                    StackedChartSeriesData stackChartData = new StackedChartSeriesData();
                    stackChartData.seriesname = this.GetShortLegend(depositCompRow.UBPRConceptDesc);
                    stackChartData.color = this.GetSeriesColor(this.GetShortLegend(depositCompRow.UBPRConceptDesc));
                    stackChartData.data = new List<ChartDataValue>();
                    stackChartData.data.Add(new ChartDataValue() { Value = depositCompRow.Minus4Data, ToolText = ytdCategory.CategoryLabels[0].Label + " " + depositCompRow.UBPRConceptDesc +  " (" + Decimal.Round(depositCompRow.Minus4Data.HasValue ? depositCompRow.Minus4Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = depositCompRow.Minus3Data, ToolText = ytdCategory.CategoryLabels[1].Label + " " + depositCompRow.UBPRConceptDesc + " (" + Decimal.Round(depositCompRow.Minus3Data.HasValue ? depositCompRow.Minus3Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = depositCompRow.Minus2Data, ToolText = ytdCategory.CategoryLabels[2].Label + " " + depositCompRow.UBPRConceptDesc + " (" + Decimal.Round(depositCompRow.Minus2Data.HasValue ? depositCompRow.Minus2Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = depositCompRow.Minus1Data, ToolText = ytdCategory.CategoryLabels[3].Label + " " + depositCompRow.UBPRConceptDesc +  " (" + Decimal.Round(depositCompRow.Minus1Data.HasValue ? depositCompRow.Minus1Data.Value : 0, 2).ToString() + "%)" });
                    stackChartData.data.Add(new ChartDataValue() { Value = depositCompRow.CurrentData, ToolText = ytdCategory.CategoryLabels[4].Label + " " + depositCompRow.UBPRConceptDesc +  " (" + Decimal.Round(depositCompRow.CurrentData.HasValue ? depositCompRow.CurrentData.Value : 0, 2).ToString() + "%)" });
                    pieChartData.DepositCompositionStackChartDataYtd.Add(stackChartData);
                }

                pieChartData.CategoriesQtd.Category = qtdCategory;
                pieChartData.CategoriesYtd.Category = ytdCategory;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return pieChartData;
        }

        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage GetPdfOfBankProfile(BankProfileOverviewParams profileParams)
        {
            string periodType = string.Empty;
            if (string.Compare(profileParams.Period, "QTD") == 0)
            {
                periodType = "QuarterlyProfileData";
            }
            else
            {
                periodType = "YearlyProfileData";
            }

            Aspose.Pdf.Document bankProfile = new Aspose.Pdf.Document();
            BankProfileIntroductionData introData = this.GetBankProfileIntroductionData(profileParams);
            BankProfileDetailsViewModel profileDetails = this.GetBankProfileDetails(profileParams);
            Aspose.Pdf.PageInfo pageInfo = bankProfile.PageInfo;
            Aspose.Pdf.MarginInfo marginInfo = pageInfo.Margin;
            marginInfo.Left = 25;
            marginInfo.Right = 25;
            marginInfo.Top = 30;
            marginInfo.Bottom = 30;
            pageInfo.IsLandscape = false;
            Aspose.Pdf.Table profileIntroTable = new Aspose.Pdf.Table();
            profileIntroTable.Margin = new Aspose.Pdf.MarginInfo(0, 15, 0, 0);
            profileIntroTable.Border = new Aspose.Pdf.BorderInfo(Aspose.Pdf.BorderSide.All, 0.1F, Aspose.Pdf.Color.LightGray);
            profileIntroTable.ColumnWidths = "7cm 8cm 5cm";
            // Added page.
            Aspose.Pdf.Page curPage = bankProfile.Pages.Add();
            Aspose.Pdf.Row row = profileIntroTable.Rows.Add();
            row.FixedRowHeight = 20;

            Aspose.Pdf.Cell cell1 = row.Cells.Add();
            cell1.IsWordWrapped = true;
            cell1.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 8);
            Aspose.Pdf.Text.TextFragment FDICdata = new Aspose.Pdf.Text.TextFragment(introData.Name + ", FDIC #: " + introData.FDICCertificate.ToString());
            FDICdata.TextState.FontSize = 8;
            FDICdata.TextState.Font = Aspose.Pdf.Text.FontRepository.FindFont("Arial");
            FDICdata.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cell1.Paragraphs.Add(FDICdata);

            Aspose.Pdf.Cell cell2 = row.Cells.Add();
            cell2.Margin = new Aspose.Pdf.MarginInfo(5, 0, 0, 0);
            cell2.IsWordWrapped = true;
            cell2.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 6);
            Aspose.Pdf.Text.TextFragment BhcNamedata = new Aspose.Pdf.Text.TextFragment("BHC Name: " + introData.BHCName);
            BhcNamedata.TextState.FontSize = 6;
            BhcNamedata.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cell2.Paragraphs.Add(BhcNamedata);

            Aspose.Pdf.Cell cell3 = row.Cells.Add();
            cell3.IsWordWrapped = true;
            cell3.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 6);
            Aspose.Pdf.Text.TextFragment ftEmployeesdata = new Aspose.Pdf.Text.TextFragment("FT Employees: " + introData.FTEEmployees.ToString());
            ftEmployeesdata.TextState.FontSize = 6;
            ftEmployeesdata.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cell3.Margin = new Aspose.Pdf.MarginInfo(5, 0, 0, 0);
            cell3.Paragraphs.Add(ftEmployeesdata);

            row = profileIntroTable.Rows.Add();
            row.FixedRowHeight = 10;
            cell1 = row.Cells.Add();
            cell1.IsWordWrapped = true;
            cell1.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 6);
            Aspose.Pdf.Text.TextFragment Headquartersdata = new Aspose.Pdf.Text.TextFragment("Headquarters: " + introData.HeadQuarters);
            Headquartersdata.TextState.FontSize = 6;
            Headquartersdata.TextState.Font = FontRepository.FindFont("Arial");
            Headquartersdata.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cell1.Paragraphs.Add(Headquartersdata);

            cell2 = row.Cells.Add();
            cell2.IsWordWrapped = true;
            cell2.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 6);
            Aspose.Pdf.Text.TextFragment AssetConcentrationdata = new Aspose.Pdf.Text.TextFragment("Asset Concentration: " + introData.AssetConcentrationHierarchy);
            AssetConcentrationdata.TextState.FontSize = 6;
            AssetConcentrationdata.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cell2.Margin = new Aspose.Pdf.MarginInfo(5, 0, 0, 0);
            cell2.Paragraphs.Add(AssetConcentrationdata);
            cell3 = row.Cells.Add();
            cell3.IsWordWrapped = true;
            cell3.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 6);
            Aspose.Pdf.Text.TextFragment Subchapterdata = new Aspose.Pdf.Text.TextFragment("Subchapter S: " + (introData.SubchapterS == 0 ? "No" : "Yes"));
            Subchapterdata.TextState.FontSize = 6;
            Subchapterdata.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cell3.Margin = new Aspose.Pdf.MarginInfo(5, 0, 0, 0);
            cell3.Paragraphs.Add(Subchapterdata);

            row = profileIntroTable.Rows.Add();
            row.FixedRowHeight = 10;
            cell1 = row.Cells.Add();
            cell1.IsWordWrapped = true;
            cell1.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 6);
            Aspose.Pdf.Text.TextFragment NumberofBranchesdata = new Aspose.Pdf.Text.TextFragment("Number of Branches: " + introData.Numberofbranches.ToString());
            NumberofBranchesdata.TextState.FontSize = 6;
            NumberofBranchesdata.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cell1.Paragraphs.Add(NumberofBranchesdata);

            cell2 = row.Cells.Add();
            cell2.IsWordWrapped = true;
            cell2.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 6);
            Aspose.Pdf.Text.TextFragment Establisheddata = new Aspose.Pdf.Text.TextFragment("Established: " + introData.Established.ToShortDateString());
            Establisheddata.TextState.FontSize = 6;
            Establisheddata.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cell2.Margin = new Aspose.Pdf.MarginInfo(5, 0, 0, 0);
            cell2.Paragraphs.Add(Establisheddata);

            cell3 = row.Cells.Add();
            cell3.IsWordWrapped = true;
            cell3.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 6);
            Aspose.Pdf.Text.TextFragment Perioddata = new Aspose.Pdf.Text.TextFragment("Period: " + profileParams.Period);
            Perioddata.TextState.FontSize = 6;
            Perioddata.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cell3.Margin = new Aspose.Pdf.MarginInfo(5, 0, 0, 0);
            cell3.Paragraphs.Add(Perioddata);

            Aspose.Pdf.Paragraphs paragraphs = curPage.Paragraphs;
            paragraphs.Add(profileIntroTable);

            Aspose.Pdf.Table profileContentWrapperTable = new Aspose.Pdf.Table();
            profileContentWrapperTable.ColumnWidths = "10cm 12cm";
            Aspose.Pdf.Row onlyRow = profileContentWrapperTable.Rows.Add();
            Aspose.Pdf.Cell leftCell = onlyRow.Cells.Add();
            Aspose.Pdf.Cell rightCell = onlyRow.Cells.Add();
            Aspose.Pdf.Table leftContentWrapperTable = new Aspose.Pdf.Table();
            leftContentWrapperTable.ColumnWidths = "12cm";
            Aspose.Pdf.Row balanceSheet = leftContentWrapperTable.Rows.Add();
            Aspose.Pdf.Cell balanceSheetDataCell = balanceSheet.Cells.Add();
            Aspose.Pdf.Table balanceSheetDataTable = this.GetDataTable("BalanceSheet", profileDetails.BankProfileDataSections[periodType], periodType);
            balanceSheetDataCell.Paragraphs.Add(balanceSheetDataTable);

            Aspose.Pdf.Row incomeStatement = leftContentWrapperTable.Rows.Add();
            Aspose.Pdf.Cell incomeStatementDataCell = incomeStatement.Cells.Add();
            Aspose.Pdf.Table incomeStatementDataTable = this.GetDataTable("IncomeStatement", profileDetails.BankProfileDataSections[periodType], periodType);
            incomeStatementDataCell.Paragraphs.Add(incomeStatementDataTable);

            Aspose.Pdf.Row earningsAndPerformance = leftContentWrapperTable.Rows.Add();
            Aspose.Pdf.Cell earningsAndPerformanceDataCell = earningsAndPerformance.Cells.Add();
            Aspose.Pdf.Table earningsAndPerformanceDataTable = this.GetDataTable("EarningsAndPerformance", profileDetails.BankProfileDataSections[periodType], periodType);
            earningsAndPerformanceDataCell.Paragraphs.Add(earningsAndPerformanceDataTable);

            Aspose.Pdf.Row assetQuality = leftContentWrapperTable.Rows.Add();
            Aspose.Pdf.Cell assetQualityDataCell = assetQuality.Cells.Add();
            Aspose.Pdf.Table assetQualityDataTable = this.GetDataTable("AssetQuality", profileDetails.BankProfileDataSections[periodType], periodType);
            assetQualityDataCell.Paragraphs.Add(assetQualityDataTable);

            Aspose.Pdf.Row capitalRatios = leftContentWrapperTable.Rows.Add();
            Aspose.Pdf.Cell capitalRatiosDataCell = capitalRatios.Cells.Add();
            Aspose.Pdf.Table capitalRatiosDataTable = this.GetDataTable("CapitalRatios", profileDetails.BankProfileDataSections[periodType], periodType);
            capitalRatiosDataCell.Paragraphs.Add(capitalRatiosDataTable);

            Aspose.Pdf.Row liquidity = leftContentWrapperTable.Rows.Add();
            Aspose.Pdf.Cell liquidityDataCell = liquidity.Cells.Add();
            Aspose.Pdf.Table liquidityDataTable = this.GetDataTable("Liquidity", profileDetails.BankProfileDataSections[periodType], periodType);
            liquidityDataCell.Paragraphs.Add(liquidityDataTable);

            Aspose.Pdf.Table dataTable1 = new Aspose.Pdf.Table();
            dataTable1.Margin = new Aspose.Pdf.MarginInfo();
            dataTable1.Margin.Left = 400; dataTable1.Margin.Bottom = 5; dataTable1.Margin.Top = 0; dataTable1.Margin.Right = 0;

            List<ChartMetadata> fileNames = UtilityFunctions.GetChartFileNamesForScreen(UtilityFunctions.GetUserKey(User.Identity.Name), "SingleBankProfile");
            byte[] tmpBytes = null;
            byte[] tmpBytes2 = null;
            byte[] tmpBytes3 = null;
            byte[] tmpBytes4 = null;
            byte[] tmpBytes5 = null;
            byte[] tmpBytes6 = null;

            tmpBytes = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "AssetGrowthRate").First().ChartImageGuid + ".jpg");

            tmpBytes2 = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "DepositComposition").First().ChartImageGuid + ".jpg");

            tmpBytes3 = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "DepositGrowthRate").First().ChartImageGuid + ".jpg");

            tmpBytes4 = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "BankEquityCapitalGrowthRate").First().ChartImageGuid + ".jpg");

            tmpBytes5 = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "LoadComposition").First().ChartImageGuid + ".jpg");

            tmpBytes6 = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "LoansAndLeasesGrowthRate").First().ChartImageGuid + ".jpg");

            // first  Image 
            //byte[] tmpBytes = Convert.FromBase64String(profileParams.assetGrowthBarChart);    
            MemoryStream mystream = new MemoryStream(tmpBytes);          
            // Create an image object
            Aspose.Pdf.Image assetGrowthBarChart = new Aspose.Pdf.Image();
            // Set the image file stream
            assetGrowthBarChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
            assetGrowthBarChart.ImageStream = mystream;
            assetGrowthBarChart.FixHeight = 150;
            assetGrowthBarChart.FixWidth = 298;

            ////second Image           
            //byte[] tmpBytes2 = Convert.FromBase64String(profileParams.depositCompositionStackChart);
            MemoryStream mystream2 = new MemoryStream(tmpBytes2);
            //// Create an image object
            Aspose.Pdf.Image depositCompositionStackChart = new Aspose.Pdf.Image();
            //// Set the image file stream
            depositCompositionStackChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
            depositCompositionStackChart.ImageStream = mystream2;
            depositCompositionStackChart.FixHeight = 210;
            depositCompositionStackChart.FixWidth = 298;

            ////Third Image           
            //byte[] tmpBytes3 = Convert.FromBase64String(profileParams.depositGrowthBarChart);
            MemoryStream mystream3 = new MemoryStream(tmpBytes3);          
            //// Create an image object
            Aspose.Pdf.Image depositGrowthBarChart = new Aspose.Pdf.Image();
            //// Set the image file stream
            depositGrowthBarChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
            depositGrowthBarChart.ImageStream = mystream3;
            depositGrowthBarChart.FixHeight = 150;
            depositGrowthBarChart.FixWidth = 298;

            ////Fourth Image
            MemoryStream mystream4 = new MemoryStream(tmpBytes4);
            Aspose.Pdf.Image equityGrowthBarChart = new Aspose.Pdf.Image();
            equityGrowthBarChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
            equityGrowthBarChart.ImageStream = mystream4;
            equityGrowthBarChart.FixHeight = 150;
            equityGrowthBarChart.FixWidth = 298;

            ////Fifth Image           
            //byte[] tmpBytes5 = Convert.FromBase64String(profileParams.loadCompositionStackChart);
            MemoryStream mystream5 = new MemoryStream(tmpBytes5);
            //// Create an image object
            Aspose.Pdf.Image loadCompositionStackChart = new Aspose.Pdf.Image();
            //// Set the image file stream
            loadCompositionStackChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
            loadCompositionStackChart.ImageStream = mystream5;
            loadCompositionStackChart.FixHeight = 210;
            loadCompositionStackChart.FixWidth = 298;

            ////Sixth Image           
            //byte[] tmpBytes6 = Convert.FromBase64String(profileParams.loansLeasesGrowthBarChart);
            MemoryStream mystream6 = new MemoryStream(tmpBytes6);
            //// Create an image object
            Aspose.Pdf.Image loansLeasesGrowthBarChart = new Aspose.Pdf.Image();
            //// Set the image file stream
            loansLeasesGrowthBarChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
            loansLeasesGrowthBarChart.ImageStream = mystream6;
            loansLeasesGrowthBarChart.FixHeight = 150;
            loansLeasesGrowthBarChart.FixWidth = 298;

            // Add the image into paragraphs collection of the section
            //  rightCell.Paragraphs.Add(image2);
            //rightCell.Paragraphs.Add(img);
            Aspose.Pdf.Table rightContentWrapperTable = new Aspose.Pdf.Table();
            rightContentWrapperTable.ColumnWidths = "4.5cm 6cm";
            Aspose.Pdf.Row chartdatarow1 = rightContentWrapperTable.Rows.Add();
            Aspose.Pdf.Row chartdatarow2 = rightContentWrapperTable.Rows.Add();
            Aspose.Pdf.Row chartdatarow3 = rightContentWrapperTable.Rows.Add();

            Aspose.Pdf.Cell chartDataCell1 = chartdatarow1.Cells.Add();
            Aspose.Pdf.Cell chartDataCell2 = chartdatarow1.Cells.Add();

            Aspose.Pdf.Cell chartDataCell3 = chartdatarow2.Cells.Add();
            Aspose.Pdf.Cell chartDataCell4 = chartdatarow2.Cells.Add();

            Aspose.Pdf.Cell chartDataCell5 = chartdatarow3.Cells.Add();
            Aspose.Pdf.Cell chartDataCell6 = chartdatarow3.Cells.Add();

            chartDataCell1.Margin = new Aspose.Pdf.MarginInfo(2, 3, 0, 0);
            chartDataCell2.Margin = new Aspose.Pdf.MarginInfo(1, 3, 0, 0);
            chartDataCell1.Paragraphs.Add(assetGrowthBarChart);
            chartDataCell2.Paragraphs.Add(loansLeasesGrowthBarChart);
            chartDataCell3.Paragraphs.Add(depositGrowthBarChart);
            chartDataCell4.Paragraphs.Add(equityGrowthBarChart);
            chartDataCell5.Paragraphs.Add(loadCompositionStackChart);
            chartDataCell6.Paragraphs.Add(depositCompositionStackChart);
            leftCell.Paragraphs.Add(leftContentWrapperTable);
            // Add the image into paragraphs collection of the section
            rightCell.Paragraphs.Add(rightContentWrapperTable);
            paragraphs.Add(profileContentWrapperTable);

            MemoryStream pdfStream = new MemoryStream();
            bankProfile.Save(pdfStream);
            byte[] data1 = new byte[pdfStream.Length];
            pdfStream.Read(data1, 0, data1.Length);

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(data1);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            result.Content.Headers.ContentLength = pdfStream.Length;
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = "SingleBankProfile" + profileParams.InstitutionKey.ToString() + ".pdf";
            result.Content.Headers.ContentDisposition.Size = pdfStream.Length;

            mystream.Dispose();
            mystream2.Dispose();
            mystream3.Dispose();
            mystream4.Dispose();
            mystream5.Dispose();
            mystream6.Dispose();
            pdfStream.Dispose();
            //equityGrowthReqStream.Close();
            return result;
        }

        //BEGIN - Lavanya - 12/28/2016 - Added New Method for Creating Excel Export for Single Bank Profile 
        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage GetExcelOfBankProfile([FromBody]BankProfileOverviewParams profileParams)
        {
            HttpResponseMessage result = new HttpResponseMessage();
            int periodType;
            Category qtdCategory = UtilityFunctions.GetQuarterlyCategories(); 
            Category ytdCategory = UtilityFunctions.GetYearlyCategories();
            try
            {
                if (string.Compare(profileParams.Period, "QTD") == 0)
                {
                    periodType = 0;
                }
                else
                {
                    periodType = 1;
                }
                string column1 = string.Empty;
                string column2 = string.Empty;
                string column3 = string.Empty;
                string column4 = string.Empty;
                string column5 = string.Empty;

                if (periodType == 1)
                {
                    column1 = ytdCategory.CategoryLabels[0].Label;
                    column2 = ytdCategory.CategoryLabels[1].Label;
                    column3 = ytdCategory.CategoryLabels[2].Label;
                    column4 = ytdCategory.CategoryLabels[3].Label;
                    column5 = ytdCategory.CategoryLabels[4].Label;
                }
                else if (periodType == 0)
                {
                    column1 = qtdCategory.CategoryLabels[0].Label;
                    column2 = qtdCategory.CategoryLabels[1].Label;
                    column3 = qtdCategory.CategoryLabels[2].Label;
                    column4 = qtdCategory.CategoryLabels[3].Label;
                    column5 = qtdCategory.CategoryLabels[4].Label;
                }

                BankProfileIntroductionData introData = this.GetBankProfileIntroductionData(profileParams);
                BankProfileDetailsViewModel profileDetails = this.GetBankProfileDetails(profileParams);

                DataTable dtSingleBankProfile = new DataTable();
                dtSingleBankProfile.TableName = profileParams.Period;

                var YTDsec = profileDetails.BankProfileDataSections.ElementAt(periodType);
                dtSingleBankProfile.Columns.Add(YTDsec.Value.ElementAt(0).Key);
                    dtSingleBankProfile.Columns.Add(column1);
                    dtSingleBankProfile.Columns.Add(column2);
                    dtSingleBankProfile.Columns.Add(column3);
                    dtSingleBankProfile.Columns.Add(column4);
                    dtSingleBankProfile.Columns.Add(column5);
     
                foreach (var sec in YTDsec.Value)// profileDetails.BankProfileDataSections)
                {
                    if (sec.Key != "BalanceSheet")
                    {
                        DataRow row1 = dtSingleBankProfile.NewRow();
                        row1[profileDetails.BankProfileDataSections.ElementAt(periodType).Value.ElementAt(0).Key] = sec.Key;
                        row1[column1] = column1;
                        row1[column2] = column2;
                        row1[column3] = column3;
                        row1[column4] = column4;
                        row1[column5] = column5;

                        dtSingleBankProfile.Rows.Add(row1);
                    }
                    foreach (var rec in sec.Value)
                    {
                        DataRow row = dtSingleBankProfile.NewRow();
                        row[profileDetails.BankProfileDataSections.ElementAt(periodType).Value.ElementAt(0).Key] = rec.UBPRConceptDesc;
                        row[column1] = rec.Minus4Data;
                        row[column2] = rec.Minus3Data;
                        row[column3] = rec.Minus2Data;
                        row[column4] = rec.Minus1Data;
                        row[column5] = rec.CurrentData;

                        dtSingleBankProfile.Rows.Add(row);
                    }
                    DataRow emptyrow = dtSingleBankProfile.NewRow();
                    emptyrow[profileDetails.BankProfileDataSections.ElementAt(periodType).Value.ElementAt(0).Key] = string.Empty;
                    emptyrow[column1] = string.Empty;
                    emptyrow[column2] = string.Empty;
                    emptyrow[column3] = string.Empty;
                    emptyrow[column4] = string.Empty;
                    emptyrow[column5] = string.Empty;
                    dtSingleBankProfile.Rows.Add(emptyrow);
                }


                DataTable[] metricArr = new DataTable[1];
                metricArr[0] = dtSingleBankProfile;

                List<ChartMetadata> fileNames = UtilityFunctions.GetChartFileNamesForScreen(UtilityFunctions.GetUserKey(User.Identity.Name), "SingleBankProfile");
                byte[] tmpBytes = null;
                byte[] tmpBytes2 = null;
                byte[] tmpBytes3 = null;
                byte[] tmpBytes4 = null;
                byte[] tmpBytes5 = null;
                byte[] tmpBytes6 = null;

                tmpBytes = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "AssetGrowthRate").First().ChartImageGuid + ".jpg");

                tmpBytes2 = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "DepositComposition").First().ChartImageGuid + ".jpg");

                tmpBytes3 = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "DepositGrowthRate").First().ChartImageGuid + ".jpg");

                tmpBytes4 = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "BankEquityCapitalGrowthRate").First().ChartImageGuid + ".jpg");

                tmpBytes5 = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "LoadComposition").First().ChartImageGuid + ".jpg");

                tmpBytes6 = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == "LoansAndLeasesGrowthRate").First().ChartImageGuid + ".jpg");


                // first  Image 
                //byte[] tmpBytes = Convert.FromBase64String(profileParams.assetGrowthBarChart);    
                MemoryStream mystream = new MemoryStream(tmpBytes);
               // System.Drawing.Image image1 = Image.FromStream(mystream);

                ////second Image           
                //byte[] tmpBytes2 = Convert.FromBase64String(profileParams.depositCompositionStackChart);
                MemoryStream mystream2 = new MemoryStream(tmpBytes2);
                //// Create an image object
                Aspose.Pdf.Image depositCompositionStackChart = new Aspose.Pdf.Image();
                //// Set the image file stream
                depositCompositionStackChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
                depositCompositionStackChart.ImageStream = mystream2;
                depositCompositionStackChart.FixHeight = 210;
                depositCompositionStackChart.FixWidth = 298;
               // ExportToExcel.CreateSingleBankProfileExportToExcel.InsertImage(0,10,298,210, mystream2);

                ////Third Image           
                //byte[] tmpBytes3 = Convert.FromBase64String(profileParams.depositGrowthBarChart);
                MemoryStream mystream3 = new MemoryStream(tmpBytes3);
                //// Create an image object
                Aspose.Pdf.Image depositGrowthBarChart = new Aspose.Pdf.Image();
                //// Set the image file stream
                depositGrowthBarChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
                depositGrowthBarChart.ImageStream = mystream3;
                depositGrowthBarChart.FixHeight = 150;
                depositGrowthBarChart.FixWidth = 298;

                ////Fourth Image
                MemoryStream mystream4 = new MemoryStream(tmpBytes4);
                Aspose.Pdf.Image equityGrowthBarChart = new Aspose.Pdf.Image();
                equityGrowthBarChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
                equityGrowthBarChart.ImageStream = mystream4;
                equityGrowthBarChart.FixHeight = 150;
                equityGrowthBarChart.FixWidth = 298;

                ////Fifth Image           
                //byte[] tmpBytes5 = Convert.FromBase64String(profileParams.loadCompositionStackChart);
                MemoryStream mystream5 = new MemoryStream(tmpBytes5);
                //// Create an image object
                Aspose.Pdf.Image loadCompositionStackChart = new Aspose.Pdf.Image();
                //// Set the image file stream
                loadCompositionStackChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
                loadCompositionStackChart.ImageStream = mystream5;
                loadCompositionStackChart.FixHeight = 210;
                loadCompositionStackChart.FixWidth = 298;

                ////Sixth Image           
                //byte[] tmpBytes6 = Convert.FromBase64String(profileParams.loansLeasesGrowthBarChart);
                MemoryStream mystream6 = new MemoryStream(tmpBytes6);
                //// Create an image object
                Aspose.Pdf.Image loansLeasesGrowthBarChart = new Aspose.Pdf.Image();
                //// Set the image file stream
                loansLeasesGrowthBarChart.Margin = new Aspose.Pdf.MarginInfo(0, 10, 0, 0);
                loansLeasesGrowthBarChart.ImageStream = mystream6;
                loansLeasesGrowthBarChart.FixHeight = 150;
                loansLeasesGrowthBarChart.FixWidth = 298;

                //Adding a list object of the image byte array
                List<byte[]> img = new List<byte[]>();
                img.Add(tmpBytes);
                img.Add(tmpBytes6);
                img.Add(tmpBytes3);
                img.Add(tmpBytes4);
                img.Add(tmpBytes5);
                img.Add(tmpBytes2);

                byte[] exceldata = ExportToExcel.CreateSingleBankProfileExportToExcel.CreateExcelDocument(metricArr, "SingleBankProfile.xlsx", introData, img);
                result.Content = new ByteArrayContent(exceldata);
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ms-excel");
                result.Content.Headers.ContentLength = exceldata.Length;
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = "SingleBankProfile" + profileParams.InstitutionKey.ToString() + ".xlsx";
                result.Content.Headers.ContentDisposition.Size = exceldata.Length;

            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return result;
        }
        //END - Lavanya - 12/28/2016 - Added New Method for Creating Excel Export for Single Bank Profile 
        private Aspose.Pdf.Table GetDataTable(string key, Dictionary<string, List<BankProfileDataSection>> periodWiseData, string period)
        {
            List<BankProfileDataSection> balanceSheetData = periodWiseData[key];
            Dictionary<string, List<BankProfileSectionHeader>> headers = null;
            List<BankProfileSectionHeader> headerForSection = null;
            string columnWidth = "";
            if (period == "QuarterlyProfileData")
            {
                headers = this.GetQtrHeaders();
                columnWidth = "1.2cm";
            }
            else
            {
                headers = this.GetYtdHeaders();
                columnWidth = "1cm";
            }
            if (headers != null)
            {
                headerForSection = headers[key];
            }
            string labelValue = string.Empty;
            string tableLave = string.Empty;
            switch (key)
            {
                case "BalanceSheet":
                    labelValue = "BALANCE SHEET";
                    tableLave = "BALANCE SHEET";
                    break;
                case "IncomeStatement":
                    labelValue = "INCOME STATEMENT";
                    tableLave = "INCOME STATEMENT";
                    break;
                case "EarningsAndPerformance":
                    labelValue = "EARNINGS AND PERFORMANCE";
                    break;
                case "AssetQuality":
                    labelValue = "ASSET QUALITY";
                    break;
                case "CapitalRatios":
                    labelValue = "CAPITAL RATIO";
                    break;
                case "Liquidity":
                    labelValue = "LIQUIDITY";
                    break;
            }
            headerForSection.Insert(0, new BankProfileSectionHeader() { Label = labelValue });

            Aspose.Pdf.Table dataTable = new Aspose.Pdf.Table();
            dataTable.Margin = new Aspose.Pdf.MarginInfo(0, 1, 0, 0);
            Aspose.Pdf.Row headerRow = dataTable.Rows.Add();
            dataTable.ColumnWidths = "4cm " + columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + "";

            headerRow.Border = new Aspose.Pdf.BorderInfo(Aspose.Pdf.BorderSide.Bottom, 0.1F, Aspose.Pdf.Color.LightGray);
            foreach (BankProfileSectionHeader tableHeader in headerForSection)
            {
                Aspose.Pdf.Cell headerCell = headerRow.Cells.Add();
                headerCell.Margin = new Aspose.Pdf.MarginInfo(0, 0, 3, 5);
                Aspose.Pdf.Text.TextFragment headerTextFragment = new Aspose.Pdf.Text.TextFragment(tableHeader.Label);
                headerTextFragment.TextState.FontSize = 5;
                headerTextFragment.TextState.Font = FontRepository.FindFont("Verdana");               
                headerTextFragment.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
                headerCell.Paragraphs.Add(headerTextFragment);               
            }

            foreach (BankProfileDataSection dataSection in balanceSheetData)
            {
                Aspose.Pdf.Row dataRow = dataTable.Rows.Add();
                dataRow.Border = new Aspose.Pdf.BorderInfo(Aspose.Pdf.BorderSide.Bottom, 0.1F, Aspose.Pdf.Color.LightGray);
                Aspose.Pdf.Cell conceptDesc = dataRow.Cells.Add();
                conceptDesc.Margin = new Aspose.Pdf.MarginInfo(0, 3, 5, 5);
                Aspose.Pdf.Text.TextFragment conceptDescTextFragment = new Aspose.Pdf.Text.TextFragment(dataSection.UBPRConceptDesc);
                conceptDescTextFragment.TextState.FontSize = 3;
                conceptDescTextFragment.TextState.Font = FontRepository.FindFont("Verdana");               
                conceptDesc.Paragraphs.Add(conceptDescTextFragment);

                Aspose.Pdf.Cell minus4 = dataRow.Cells.Add();
                minus4.Margin = new Aspose.Pdf.MarginInfo(0, 3, 5, 5);
                Aspose.Pdf.Text.TextFragment minus4TextFragment = new Aspose.Pdf.Text.TextFragment();
               
                if (tableLave == "BALANCE SHEET" || tableLave == "INCOME STATEMENT")
                {
                    minus4TextFragment = new Aspose.Pdf.Text.TextFragment(string.Format("{0:#,##0}", dataSection.Minus4Data));
                }
                else
                {
                    minus4TextFragment = new Aspose.Pdf.Text.TextFragment(dataSection.Minus4Data.ToString() == "" ? "N/A" : dataSection.Minus4Data.ToString());
                }
                minus4TextFragment.TextState.FontSize = 5;
                minus4TextFragment.TextState.Font = FontRepository.FindFont("Verdana");
                minus4TextFragment.HorizontalAlignment = Aspose.Pdf.HorizontalAlignment.Right;
                minus4.Paragraphs.Add(minus4TextFragment);

                Aspose.Pdf.Cell minus3 = dataRow.Cells.Add();
                minus3.Margin = new Aspose.Pdf.MarginInfo(0, 3, 5, 5);
                Aspose.Pdf.Text.TextFragment minus3TextFragment = new Aspose.Pdf.Text.TextFragment();
                if (tableLave == "BALANCE SHEET" || tableLave == "INCOME STATEMENT")
                {
                     minus3TextFragment = new Aspose.Pdf.Text.TextFragment(string.Format("{0:#,##0}", dataSection.Minus3Data));
                }
                else
                {
                    minus3TextFragment = new Aspose.Pdf.Text.TextFragment(dataSection.Minus3Data.ToString() == "" ? "N/A" : dataSection.Minus3Data.ToString());
                }                
                minus3TextFragment.TextState.FontSize = 5;
                minus3TextFragment.TextState.Font = FontRepository.FindFont("Verdana");
                minus3TextFragment.HorizontalAlignment = Aspose.Pdf.HorizontalAlignment.Right;
                minus3.Paragraphs.Add(minus3TextFragment);

                Aspose.Pdf.Cell minus2 = dataRow.Cells.Add();
                minus2.Margin = new Aspose.Pdf.MarginInfo(0, 3, 5, 5);
                Aspose.Pdf.Text.TextFragment minus2TextFragment = new Aspose.Pdf.Text.TextFragment();
                if (tableLave == "BALANCE SHEET" || tableLave == "INCOME STATEMENT")
                {
                    minus2TextFragment = new Aspose.Pdf.Text.TextFragment(string.Format("{0:#,##0}", dataSection.Minus2Data));
                }
                else
                {
                    minus2TextFragment = new Aspose.Pdf.Text.TextFragment(dataSection.Minus2Data.ToString() == "" ? "N/A" : dataSection.Minus2Data.ToString());
                }               
                minus2TextFragment.TextState.FontSize = 5;
                minus2TextFragment.TextState.Font = FontRepository.FindFont("Verdana");
                minus2TextFragment.HorizontalAlignment = Aspose.Pdf.HorizontalAlignment.Right;
                minus2.Paragraphs.Add(minus2TextFragment);

                Aspose.Pdf.Cell minus1 = dataRow.Cells.Add();
                minus1.Margin = new Aspose.Pdf.MarginInfo(0, 3, 5, 5);
                Aspose.Pdf.Text.TextFragment minus1TextFragment = new Aspose.Pdf.Text.TextFragment();
                if (tableLave == "BALANCE SHEET" || tableLave == "INCOME STATEMENT")
                {
                     minus1TextFragment = new Aspose.Pdf.Text.TextFragment(string.Format("{0:#,##0}", dataSection.Minus1Data));
                }
                else
                {
                    minus1TextFragment = new Aspose.Pdf.Text.TextFragment(dataSection.Minus1Data.ToString() == "" ? "N/A" : dataSection.Minus1Data.ToString());
                }               
                minus1TextFragment.TextState.FontSize = 5;
                minus1TextFragment.TextState.Font = FontRepository.FindFont("Verdana");
                minus1TextFragment.HorizontalAlignment = Aspose.Pdf.HorizontalAlignment.Right;
                minus1.Paragraphs.Add(minus1TextFragment);

                Aspose.Pdf.Cell current = dataRow.Cells.Add();
                current.Margin = new Aspose.Pdf.MarginInfo(0, 3, 5, 5);
                Aspose.Pdf.Text.TextFragment currentTextFragment = new Aspose.Pdf.Text.TextFragment();
                if (tableLave == "BALANCE SHEET" || tableLave == "INCOME STATEMENT")
                {
                    currentTextFragment = new Aspose.Pdf.Text.TextFragment(string.Format("{0:#,##0}", dataSection.CurrentData));
                }
                else
                {
                    currentTextFragment = new Aspose.Pdf.Text.TextFragment(dataSection.CurrentData.ToString() == "" ? "N/A" : dataSection.CurrentData.ToString());
                }               
                currentTextFragment.TextState.FontSize = 5;
                currentTextFragment.TextState.Font = FontRepository.FindFont("Verdana");
                currentTextFragment.HorizontalAlignment = Aspose.Pdf.HorizontalAlignment.Right;
                current.Paragraphs.Add(currentTextFragment);
            }

            return dataTable;
        }

        private string GetSeriesColor(string seriesName)
        {
            string color = string.Empty;
            switch (seriesName)
            {
                case "CLD":
                    color = "#8ACAB7";
                    break;
                case "1-4FAM":
                    color = "#B5645A";
                    break;
                case "MULTI":
                    color = "#ECD791";
                    break;
                case "NFNR":
                    color = "#E1A900";
                    break;
                case "APL":
                    color = "#4590B4";
                    break;
                case "C&I":
                    color = "#D58748";
                    break;
                case "DDA":
                    color = "#008E96";
                    break;
                case "Other":
                    color = "#008E96";
                    break;
                case "NOW+ATS":
                    color = "#B5645A";
                    break;
                case "MMDA":
                    color = "#8ACAB7";
                    break;
                case "OSD":
                    color = "#ECD791";
                    break;
                case "TM<=250":
                    color = "#4590B4";
                    break;
                case "TM>250":
                    color = "#D58748";
                    break;
                case "FRGN":
                    color = "#AEABAA";
                    break;
            }

            return color;
        }

        private string GetShortLegend(string ubprConceptDesc)
        {
            string retVal = string.Empty;
            switch(ubprConceptDesc)
            {
                case "Construction & Land Development Loans (CLD)/ Avg. Gross Loans (%)":
                    retVal = "CLD";
                    break;
                case "1-4 Family Residential Loans/ Avg. Gross Loans (%)":
                    retVal = "1-4Fam";
                    break;
                case "Multifamily Loans/ Avg. Gross Loans (%)":
                    retVal = "Multi";
                    break;
                case "Non-Farm Non-Residential Loans (NFNR)/ Avg. Gross Loans (%)":
                    retVal = "NFNR";
                    break;
                case "Commercial & Industrial Loans/ Avg. Gross Loans (%)":
                    retVal = "C&I";
                    break;
                case "All Other Loans, % Gross LN&LS":
                    retVal = "AOL";
                    break;
                case "Demand Deposit Accounts/ Total Deposits (%)":
                    retVal = "DDA";
                    break;
                case "All NOW & ATS Accounts/ Total Deposits (%)":
                    retVal = "NOW+ATS";
                    break;
                case "Money Market Demand Deposits/ Total Deposits (%)":
                    retVal = "MMDA";
                    break;
                case "Other Savings Deposits/ Total Deposits (%)":
                    retVal = "OSD";
                    break;
                case "Total Time Deposits/ Total Deposits (%)":
                    retVal = "TTD";
                    break;
                case "Loans to Individuals":
                    retVal = "LTI";
                    break;
                case "Construction & Land Development Loans":
                    retVal = "CLD";
                    break;
                case "1-4 Family Residential Loans":
                    retVal = "1-4FAM";
                    break;
                case "Multifamily Loans":
                    retVal = "MULTI";
                    break;
                case "Non-Farm Non-Residential Loans":
                    retVal = "NFNR";
                    break;
                case "Agricultural Production Loans":
                    retVal = "APL";
                    break;
                case "Commercial & Industrial Loans":
                    retVal = "C&I";
                    break;
                case "Demand Deposit Accounts":
                    retVal = "DDA";
                    break;
                case "All Other Loans":
                    retVal = "Other";
                    break;
                case "All NOW & ATS Accounts":
                    retVal = "NOW+ATS";
                    break;
                case "Money Market Demand Deposits":
                    retVal = "MMDA";
                    break;
                case "Other Savings Deposits":
                    retVal = "OSD";
                    break;
                case "Time Deposits At or Below Insurance Limit":
                    retVal = "TM<=250";
                    break;
                case "Time Deposits Above Insurance Limit":
                    retVal = "TM>250";
                    break;
                case "Foreign Deposits":
                    retVal = "FRGN";
                    break;
                case "Time Deposits At or Below Insurance Limit (TM<=250)":
                    retVal = "TM<=250";
                    break;
                case "Time Deposits Above Insurance Limit (TM>250)":
                    retVal = "TM>250";
                    break;

            }

            return retVal;
        }

        private Dictionary<string, List<BankProfileDataSection>> GroupBankProfileDataPerSection(List<BankProfileData> bankProfileData)
        {
            Dictionary<string, List<BankProfileDataSection>> dataPerSection = new Dictionary<string, List<BankProfileDataSection>>();
            List<BankProfileDataSection> balanceSheet = new List<BankProfileDataSection>();
            List<BankProfileDataSection> incomeStatement = new List<BankProfileDataSection>();
            List<BankProfileDataSection> earningsAndPerformance = new List<BankProfileDataSection>();
            List<BankProfileDataSection> assetQuality = new List<BankProfileDataSection>();
            List<BankProfileDataSection> capitalRatios = new List<BankProfileDataSection>();
            List<BankProfileDataSection> liquidity = new List<BankProfileDataSection>();
            try
            {
                foreach (BankProfileData profData in bankProfileData)
                {
                    switch (profData.SectionName)
                    {
                        case "Balance Sheet":
                            balanceSheet.Add(this.MapProfileDataRow(profData));
                            break;
                        case "Income Statement":
                            incomeStatement.Add(this.MapProfileDataRow(profData));
                            break;
                        case "Earnings & Performance":
                            earningsAndPerformance.Add(this.MapProfileDataRow(profData));
                            break;
                        case "Asset Quality":
                            assetQuality.Add(this.MapProfileDataRow(profData));
                            break;
                        case "Capital Ratios":
                            capitalRatios.Add(this.MapProfileDataRow(profData));
                            break;
                        case "Liquidity":
                            liquidity.Add(this.MapProfileDataRow(profData));
                            break;
                    }
                }

                dataPerSection.Add("BalanceSheet", balanceSheet);
                dataPerSection.Add("IncomeStatement", incomeStatement);
                dataPerSection.Add("EarningsAndPerformance", earningsAndPerformance);
                dataPerSection.Add("AssetQuality", assetQuality);
                dataPerSection.Add("CapitalRatios", capitalRatios);
                dataPerSection.Add("Liquidity", liquidity);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return dataPerSection;
        }

        private BankProfileDataSection MapProfileDataRow(BankProfileData profileDataRow)
        {
            BankProfileDataSection section = new BankProfileDataSection();
            try
            {
                section.UBPRConceptCode = profileDataRow.UBPRConceptCode;
                section.UBPRConceptDesc = profileDataRow.UBPRConceptDesc;
                section.CurrentData = profileDataRow.CurrentData;
                section.Minus1Data = profileDataRow.Minus1Data;
                section.Minus2Data = profileDataRow.Minus2Data;
                section.Minus3Data = profileDataRow.Minus3Data;
                section.Minus4Data = profileDataRow.Minus4Data;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return section;
        }

        [HttpGet]
        public bool GetChartImagePresence()
        {
            bool result = true;
            List<ChartMetadata> fileNames = UtilityFunctions.GetChartFileNamesForScreen(UtilityFunctions.GetUserKey(User.Identity.Name), "SingleBankProfile");

            foreach(ChartMetadata metadata in fileNames)
            {
                if (UtilityFunctions.CheckBlobPresence(metadata.ChartImageGuid + ".jpg") == false)
                {
                    result = false;
                    break;
                }
            }

            return result;
        }
    }
}
