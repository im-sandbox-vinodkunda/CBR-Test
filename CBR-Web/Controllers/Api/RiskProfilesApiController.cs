namespace CBR.Web.Controllers.Api
{
    using CBR.Common;
    using CBR.Web.Models;
    using CBR.Web.WebCommons;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Web.Http;
    using CBR.DataAccess;
    using System.Net.Http;
    using ExportToExcel;
    using System.IO;
    using System.Net.Http.Headers;
    using System.Net;
    using System.Web;
    using CustomFilter;
    using Mvc = System.Web.Mvc;

    public class RiskProfilesApiController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public RiskProfileIntroductionData GetRiskProfileIntroductionData(RiskProfileIntroductionParams introParams)
        {
            RiskProfileIntroductionData riskProfileIntroductionData = null;
            try
            {
                riskProfileIntroductionData = new RiskProfileIntroductionData();
                StdPeerGroupInfo stdPeerGroup = UtilityFunctions.GetStdPeerGroupForInstitution(introParams.InstitutionKey);
                if (stdPeerGroup != null)
                    riskProfileIntroductionData.StandardPeerGroupName = stdPeerGroup.StdPeerGroupCode;
                else
                    riskProfileIntroductionData.StandardPeerGroupName = "N/A";
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return riskProfileIntroductionData;
        }

        // POST api/<controller>
        [HttpPost]
        public RiskProfileDataViewModel GetRiskProfileCreditRiskData([FromBody]GetRiskProfileDataViewModel riskProfileParams)
        {
            RiskProfileDataViewModel rPViewModel = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("Institutionkey", SqlDbType.Int);
                institutionKey.Value = riskProfileParams.InstitutionKey;
                SqlParameter period = new SqlParameter("Period", SqlDbType.Int);
                period.Value = CommonFunctions.GetLastQuarterString(); //riskProfileParams.Period;
                SqlParameter tenantKey = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name); // logged in user's tenant
                SqlParameter stdPeerGroupKey = new SqlParameter("StdPeerGroupKey", SqlDbType.Int);
                stdPeerGroupKey.Value = riskProfileParams.StdPeerGroupKey;
                SqlParameter custPeerGroupKey = new SqlParameter("CustPeerGroupKey", SqlDbType.Int);
                custPeerGroupKey.Value = riskProfileParams.CustPeerGroupKey;
                SqlParameter loggedInUserKey = new SqlParameter("UserKey", SqlDbType.Int);
                loggedInUserKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                if (riskProfileParams.InstitutionKey == 0)
                    institutionKey.Value = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);

                object[] riskProfileDataParams = new object[6];
                riskProfileDataParams[0] = institutionKey;
                riskProfileDataParams[1] = period;
                riskProfileDataParams[2] = tenantKey;
                riskProfileDataParams[3] = stdPeerGroupKey;
                riskProfileDataParams[4] = custPeerGroupKey;
                riskProfileDataParams[5] = loggedInUserKey;

                var result = ent.Database.SqlQuery<RiskProfileData>("dbo.uspRptCreditRiskData @Institutionkey, @Period, @TenantKey, @StdPeerGroupKey, @CustPeerGroupKey, @UserKey", riskProfileDataParams).ToList();
                rPViewModel = this.GroupRiskProfileCreditRiskDataPerSection(result);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return rPViewModel;
        }

        private RiskProfileDataViewModel GroupRiskProfileCreditRiskDataPerSection(List<RiskProfileData> riskProfileRawData)
        {
            RiskProfileDataViewModel riskProfileData = new RiskProfileDataViewModel();
            List<RiskProfileDataSection> summaryRatios = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> yieldAndCost = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> offBalanceSheetItems = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> creditAllowance = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> loanMix = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> concentrationOfCredit = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> commercialRealEstate = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> pastDueAndNonAccrual = new List<RiskProfileDataSection>();
            RiskProfileDataSection rpdSection = null;

            foreach (RiskProfileData rpd in riskProfileRawData)
            {
                switch (rpd.SectionOrder)
                {
                    case 1:
                        rpdSection = this.MapDataSection(rpd);
                        summaryRatios.Add(rpdSection);
                        break;
                    case 2:
                        rpdSection = this.MapDataSection(rpd);
                        yieldAndCost.Add(rpdSection);
                        break;
                    case 3:
                        rpdSection = this.MapDataSection(rpd);
                        offBalanceSheetItems.Add(rpdSection);
                        break;
                    case 4:
                        rpdSection = this.MapDataSection(rpd);
                        creditAllowance.Add(rpdSection);
                        break;
                    case 5:
                        rpdSection = this.MapDataSection(rpd);
                        loanMix.Add(rpdSection);
                        break;
                    case 6:
                        rpdSection = this.MapDataSection(rpd);
                        concentrationOfCredit.Add(rpdSection);
                        break;
                    case 7:
                        rpdSection = this.MapDataSection(rpd);
                        commercialRealEstate.Add(rpdSection);
                        break;
                    case 8:
                        rpdSection = this.MapDataSection(rpd);
                        pastDueAndNonAccrual.Add(rpdSection);
                        break;
                }
            }

            riskProfileData.RiskProfileSections.Add("SummaryRatios", summaryRatios);
            riskProfileData.RiskProfileSections.Add("YieldAndCost", yieldAndCost);
            riskProfileData.RiskProfileSections.Add("OffBalanceSheetCreditRisk", offBalanceSheetItems);
            riskProfileData.RiskProfileSections.Add("CreditAllowance", creditAllowance);
            riskProfileData.RiskProfileSections.Add("LoanMix", loanMix);
            riskProfileData.RiskProfileSections.Add("CrConcentrationOfCredit", concentrationOfCredit);
            riskProfileData.RiskProfileSections.Add("CommercialRealEstate", commercialRealEstate);
            riskProfileData.RiskProfileSections.Add("PastDue", pastDueAndNonAccrual);

            return riskProfileData;
        }

        // POST api/<controller>
        [HttpPost]
        public RiskProfileDataViewModel GetRiskProfileInterestRiskData([FromBody]GetRiskProfileDataViewModel riskProfileParams)
        {
            RiskProfileDataViewModel rPViewModel = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("Institutionkey", SqlDbType.Int);
                institutionKey.Value = riskProfileParams.InstitutionKey;
                SqlParameter period = new SqlParameter("Period", SqlDbType.Int);
                period.Value = CommonFunctions.GetLastQuarterString();
                SqlParameter tenantKey = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name); //this.GetTenantKey(User.Identity.Name);
                SqlParameter stdPeerGroupKey = new SqlParameter("StdPeerGroupKey", SqlDbType.Int);
                stdPeerGroupKey.Value = riskProfileParams.StdPeerGroupKey;
                SqlParameter custPeerGroupKey = new SqlParameter("CustPeerGroupKey", SqlDbType.Int);
                custPeerGroupKey.Value = riskProfileParams.CustPeerGroupKey;
                SqlParameter loggedInUserKey = new SqlParameter("UserKey", SqlDbType.Int);
                loggedInUserKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                if (riskProfileParams.InstitutionKey == 0)
                    institutionKey.Value = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);

                object[] riskProfileDataParams = new object[6];
                riskProfileDataParams[0] = institutionKey;
                riskProfileDataParams[1] = period;
                riskProfileDataParams[2] = tenantKey;
                riskProfileDataParams[3] = stdPeerGroupKey;
                riskProfileDataParams[4] = custPeerGroupKey;
                riskProfileDataParams[5] = loggedInUserKey;

                var result = ent.Database.SqlQuery<RiskProfileData>("dbo.uspRptIRRData @Institutionkey, @Period, @TenantKey, @StdPeerGroupKey, @CustPeerGroupKey, @UserKey", riskProfileDataParams).ToList();
                rPViewModel = this.GroupRiskProfileInterestRiskDataPerSection(result);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return rPViewModel;
        }

        private RiskProfileDataViewModel GroupRiskProfileInterestRiskDataPerSection(List<RiskProfileData> result)
        {
            RiskProfileDataViewModel riskProfileData = new RiskProfileDataViewModel();
            List<RiskProfileDataSection> yieldAndCost = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> offBalanceSheetItems = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> interestRateRiskItems = new List<RiskProfileDataSection>();
            RiskProfileDataSection rpdSection = null;

            foreach (RiskProfileData rpd in result)
            {
                switch (rpd.SectionName)
                {
                    case "YIELDS & COSTS":
                        rpdSection = this.MapDataSection(rpd);
                        yieldAndCost.Add(rpdSection);
                        break;
                    case "BALANCE SHEET":
                        rpdSection = this.MapDataSection(rpd);
                        offBalanceSheetItems.Add(rpdSection);
                        break;
                    case "INTEREST RATE RISK":
                        rpdSection = this.MapDataSection(rpd);
                        interestRateRiskItems.Add(rpdSection);
                        break;
                }
            }

            riskProfileData.RiskProfileSections.Add("YieldAndCost", yieldAndCost);
            riskProfileData.RiskProfileSections.Add("OffBalanceSheetIRrisk", offBalanceSheetItems);
            riskProfileData.RiskProfileSections.Add("InterestRateRiskItems", interestRateRiskItems);

            return riskProfileData;
        }

        // POST api/<controller>
        [HttpPost]
        public RiskProfileDataViewModel GetRiskProfileLiquidityRiskData([FromBody]GetRiskProfileDataViewModel riskProfileParams)
        {
            RiskProfileDataViewModel rPViewModel = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("Institutionkey", SqlDbType.Int);
                institutionKey.Value = riskProfileParams.InstitutionKey;
                SqlParameter period = new SqlParameter("Period", SqlDbType.Int);
                period.Value = CommonFunctions.GetLastQuarterString();
                SqlParameter tenantKey = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter stdPeerGroupKey = new SqlParameter("StdPeerGroupKey", SqlDbType.Int);
                stdPeerGroupKey.Value = riskProfileParams.StdPeerGroupKey;
                SqlParameter custPeerGroupKey = new SqlParameter("CustPeerGroupKey", SqlDbType.Int);
                custPeerGroupKey.Value = riskProfileParams.CustPeerGroupKey;
                SqlParameter loggedInUserKey = new SqlParameter("UserKey", SqlDbType.Int);
                loggedInUserKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                if (riskProfileParams.InstitutionKey == 0)
                    institutionKey.Value = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);

                object[] riskProfileDataParams = new object[6];
                riskProfileDataParams[0] = institutionKey;
                riskProfileDataParams[1] = period;
                riskProfileDataParams[2] = tenantKey;
                riskProfileDataParams[3] = stdPeerGroupKey;
                riskProfileDataParams[4] = custPeerGroupKey;
                riskProfileDataParams[5] = loggedInUserKey;

                var result = ent.Database.SqlQuery<RiskProfileData>("dbo.uspRptLIQPriceData @Institutionkey, @Period, @TenantKey, @StdPeerGroupKey, @CustPeerGroupKey, @UserKey", riskProfileDataParams).ToList();
                rPViewModel = this.GroupRiskProfileLiquidityRiskDataPerSection(result);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return rPViewModel;
        }

        private RiskProfileDataViewModel GroupRiskProfileLiquidityRiskDataPerSection(List<RiskProfileData> result)
        {
            RiskProfileDataViewModel riskProfileData = new RiskProfileDataViewModel();
            List<RiskProfileDataSection> liquidityAndFunding = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> liquidityInvestmentPortfolio = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> liquiditySecurityRatios = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> offBalanceSheetItems = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> concentrationOfCredit = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> capitalAnalysis = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> keyLiquidityRatios = new List<RiskProfileDataSection>();
            RiskProfileDataSection rpdSection = null;

            foreach (RiskProfileData rpd in result)
            {
                switch (rpd.SectionOrder)
                {
                    case 1:
                        rpdSection = this.MapDataSection(rpd);
                        keyLiquidityRatios.Add(rpdSection);
                        break;
                    case 2:
                        rpdSection = this.MapDataSection(rpd);
                        liquidityAndFunding.Add(rpdSection);
                        break;
                    case 3:
                        rpdSection = this.MapDataSection(rpd);
                        liquidityInvestmentPortfolio.Add(rpdSection);
                        break;
                    case 4:
                        rpdSection = this.MapDataSection(rpd);
                        liquiditySecurityRatios.Add(rpdSection);
                        break;
                    case 5:
                        rpdSection = this.MapDataSection(rpd);
                        offBalanceSheetItems.Add(rpdSection);
                        break;
                    case 6:
                        rpdSection = this.MapDataSection(rpd);
                        concentrationOfCredit.Add(rpdSection);
                        break;
                    case 7:
                        rpdSection = this.MapDataSection(rpd);
                        capitalAnalysis.Add(rpdSection);
                        break;
                }
            }

            riskProfileData.RiskProfileSections.Add("KeyLiquidityRatios", keyLiquidityRatios);
            riskProfileData.RiskProfileSections.Add("LiquidityAndFunding", liquidityAndFunding);
            riskProfileData.RiskProfileSections.Add("LiquidityInvestmentPortfolio", liquidityInvestmentPortfolio);
            riskProfileData.RiskProfileSections.Add("LiquiditySecurityRatios", liquiditySecurityRatios);
            riskProfileData.RiskProfileSections.Add("OffBalanceSheetLIPRrisk", offBalanceSheetItems);
            riskProfileData.RiskProfileSections.Add("ConcentrationOfCredit", concentrationOfCredit);
            riskProfileData.RiskProfileSections.Add("CapitalAnalysis", capitalAnalysis);
            return riskProfileData;
        }

        // POST api/<controller>
        [HttpPost]
        public RiskProfileDataViewModelOne GetRiskProfileStrategicRiskData([FromBody]GetRiskProfileDataViewModel riskProfileParams)
        {
            RiskProfileDataViewModelOne rPViewModel = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("Institutionkey", SqlDbType.Int);
                institutionKey.Value = riskProfileParams.InstitutionKey;
                SqlParameter period = new SqlParameter("Period", SqlDbType.Int);
                period.Value = CommonFunctions.GetLastQuarterString();
                SqlParameter tenantKey = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter stdPeerGroupKey = new SqlParameter("StdPeerGroupKey", SqlDbType.Int);
                stdPeerGroupKey.Value = riskProfileParams.StdPeerGroupKey;
                SqlParameter custPeerGroupKey = new SqlParameter("CustPeerGroupKey", SqlDbType.Int);
                custPeerGroupKey.Value = riskProfileParams.CustPeerGroupKey;
                SqlParameter loggedInUserKey = new SqlParameter("UserKey", SqlDbType.Int);
                loggedInUserKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                if (riskProfileParams.InstitutionKey == 0)
                    institutionKey.Value = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);

                object[] riskProfileDataParams = new object[6];
                riskProfileDataParams[0] = institutionKey;
                riskProfileDataParams[1] = period;
                riskProfileDataParams[2] = tenantKey;
                riskProfileDataParams[3] = stdPeerGroupKey;
                riskProfileDataParams[4] = custPeerGroupKey;
                riskProfileDataParams[5] = loggedInUserKey;
                var result = ent.Database.SqlQuery<RiskProfileDataOne>("dbo.uspRptStrategicData @Institutionkey, @Period, @TenantKey, @StdPeerGroupKey, @CustPeerGroupKey, @UserKey", riskProfileDataParams).ToList();
                rPViewModel = this.GroupRiskProfileStrategicRiskDataPerSection(result);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return rPViewModel;
        }

        private RiskProfileDataViewModelOne GroupRiskProfileStrategicRiskDataPerSection(List<RiskProfileDataOne> result)
        {
            RiskProfileDataViewModelOne riskProfileData = new RiskProfileDataViewModelOne();
            List<RiskProfileDataSectionOne> earningsAndProfitability = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> nonIncomeAndExpenses = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> interestRateRisk = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> marginAnalysis = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> growthRates = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> capitalRatios = new List<RiskProfileDataSectionOne>();

            RiskProfileDataSectionOne rpdSection = null;

            foreach (RiskProfileDataOne rpd in result)
            {
                switch (rpd.SectionOrder)
                {
                    case 1:
                        rpdSection = this.MapDataSectionOne(rpd);
                        earningsAndProfitability.Add(rpdSection);
                        break;
                    case 2:
                        rpdSection = this.MapDataSectionOne(rpd);
                        marginAnalysis.Add(rpdSection);
                        break;
                    case 3:
                        rpdSection = this.MapDataSectionOne(rpd);
                        nonIncomeAndExpenses.Add(rpdSection);
                        break;
                    case 4:
                        rpdSection = this.MapDataSectionOne(rpd);
                        interestRateRisk.Add(rpdSection);
                        break;
                    case 5:
                        rpdSection = this.MapDataSectionOne(rpd);
                        capitalRatios.Add(rpdSection);
                        break;
                    case 6:
                        rpdSection = this.MapDataSectionOne(rpd);
                        growthRates.Add(rpdSection);
                        break;
                }
            }

            riskProfileData.RiskProfileSections.Add("EarningsAndProfitability", earningsAndProfitability);
            riskProfileData.RiskProfileSections.Add("MarginAnalysis", marginAnalysis);
            riskProfileData.RiskProfileSections.Add("NonIncomeAndExpenses", nonIncomeAndExpenses);
            riskProfileData.RiskProfileSections.Add("InterestRateRisk", interestRateRisk);
            riskProfileData.RiskProfileSections.Add("CapitalRatios", capitalRatios);
            riskProfileData.RiskProfileSections.Add("GrowthRates", growthRates);

            return riskProfileData;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

        public List<CustomPeerGroupData> GetCustomPeerGroupsForUser()
        {
            List<CustomPeerGroupData> customPeerGroups = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                customPeerGroups = ent.Database.SqlQuery<CustomPeerGroupData>("select CustPeerGroupKey as [Key],CustPeerGroupName as Name,IsDefault as IsDefault from DimCustPeerGroup WHERE UserKey = " + userKey.ToString()).ToList<CustomPeerGroupData>();
                customPeerGroups = customPeerGroups.OrderBy(obj => obj.Name).ToList();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return customPeerGroups;
        }
        
        public HttpResponseMessage GetInstitutionsForUser()
        {
            List<Institution> institutionList = null;
            
            try
            {
                institutionList = UtilityFunctions.GetInstitutionListForUser(User.Identity.Name);
                institutionList = institutionList.OrderBy(obj => obj.InstitutionName).ToList();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, institutionList);
        }

        [HttpPost]
        public UbprChartData GetRiskProfileChartData(GetRiskProfileChartDataViewModel chartDataParameters)
        {
            UbprChartData chartData = null;
            try
            {
                string pGroupName = string.Empty;
                if (chartDataParameters.CustPeerGroupKey > 0)
                    pGroupName = UtilityFunctions.GetCustomPeerGroupName(chartDataParameters.CustPeerGroupKey);

                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                SqlParameter ubprConceptCode = new SqlParameter("UBPRConceptCode", SqlDbType.VarChar);
                ubprConceptCode.Value = chartDataParameters.UBPRConceptCode;
                SqlParameter institutionName = new SqlParameter("InstitutionName", SqlDbType.VarChar);
                institutionName.Value = chartDataParameters.InstitutionKey;
                SqlParameter custPeerGroupName = new SqlParameter("CustPeerGroupName", SqlDbType.VarChar);
                custPeerGroupName.Value = pGroupName;
                SqlParameter stdPeerGroupName = new SqlParameter("StdPeerGroupCode", SqlDbType.VarChar);
                if (string.IsNullOrEmpty(chartDataParameters.StdPeerGroupName))
                    stdPeerGroupName.Value = DBNull.Value;
                else
                    stdPeerGroupName.Value = chartDataParameters.StdPeerGroupName;
                SqlParameter login = new SqlParameter("Login", SqlDbType.VarChar);
                login.Value = User.Identity.Name;
                SqlParameter rptName = new SqlParameter("RptName", SqlDbType.VarChar);
                rptName.Value = chartDataParameters.RptName;
                object[] chartParams = new object[6];
                chartParams[0] = ubprConceptCode;
                chartParams[1] = institutionName;
                chartParams[2] = custPeerGroupName;
                chartParams[3] = stdPeerGroupName;
                chartParams[4] = login;
                chartParams[5] = rptName;
                var result = ent.Database.SqlQuery<RiskProfileChartDataViewModel>("dbo.uspRptBarGraphData @UBPRConceptCode, @InstitutionName, @CustPeerGroupName, @StdPeerGroupCode, @Login, @RptName", chartParams).ToList();
                chartData = this.MapChartDataToChartSpecificObject(result, chartDataParameters);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return chartData;
        }

        [HttpPost]
        public CustomPeerGroupRankingData GetRiskProfileRankingData(GetCustomPeerGroupRankingParams rankingParams)
        {
            CustomPeerGroupRankingData peerGroupRankAndAverages = null;
            try
            {
                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                SqlParameter ubprConceptCode = new SqlParameter("UBPRConceptCode", SqlDbType.VarChar);
                ubprConceptCode.Value = rankingParams.UBPRConceptCode;
                SqlParameter custPeerGroupName = new SqlParameter("CustPeerGroupName", SqlDbType.VarChar);
                custPeerGroupName.Value = rankingParams.CustPeerGroupName;
                SqlParameter instKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                instKey.Value = rankingParams.InstitutionKey;
                SqlParameter stdPeerGroupName = new SqlParameter("StdPeerGroupCode", SqlDbType.VarChar);
                if (!string.IsNullOrEmpty(rankingParams.StandardPeerGroupName))
                    stdPeerGroupName.Value = rankingParams.StandardPeerGroupName;
                else
                    stdPeerGroupName.Value = DBNull.Value;

                SqlParameter rptName = new SqlParameter("RptName", SqlDbType.VarChar);
                rptName.Value = rankingParams.RptName;
                SqlParameter login = new SqlParameter("Login", SqlDbType.VarChar);
                login.Value = User.Identity.Name;
                object[] rankingDataParams = new object[6];
                rankingDataParams[0] = ubprConceptCode;
                rankingDataParams[1] = custPeerGroupName;
                rankingDataParams[2] = stdPeerGroupName;
                rankingDataParams[3] = rptName;
                rankingDataParams[4] = login;
                rankingDataParams[5] = instKey;
                var result = ent.Database.SqlQuery<PeerGroupRankData>("dbo.uspRptCustomPeerGroupRanking @UBPRConceptCode, @CustPeerGroupName, @StdPeerGroupCode, @RptName, @Login, @InstitutionKey", rankingDataParams).ToList();
                int favoriteBanksKey = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);

                foreach (PeerGroupRankData pgrdata in result)
                {
                    if (pgrdata.InstitutionKey == favoriteBanksKey)
                        pgrdata.IsDefault = true;
                    else
                        pgrdata.IsDefault = false;
                }

                if (result != null && result.Count > 0)
                {
                    peerGroupRankAndAverages = new CustomPeerGroupRankingData();
                    peerGroupRankAndAverages.PeerGroupRankDataQtr = result.Where(obje => obje.RowDisplay == "InSide" && obje.PeriodType == "QTR").ToList();
                    peerGroupRankAndAverages.PeerGroupRankDataYtd = result.Where(obje => obje.RowDisplay == "InSide" && obje.PeriodType == "YTD").ToList();
                    if (rankingParams.SortOrder == "ASC")
                    {
                        peerGroupRankAndAverages.PeerGroupRankDataQtr = peerGroupRankAndAverages.PeerGroupRankDataQtr.OrderByDescending(obj => obj.CurrYear.HasValue).ThenBy(obj => obj.CurrYear).ToList();
                        peerGroupRankAndAverages.PeerGroupRankDataYtd = peerGroupRankAndAverages.PeerGroupRankDataYtd.OrderByDescending(obj => obj.CurrYear.HasValue).ThenBy(obj => obj.CurrYear).ToList();
                    }
                    else
                    {
                        peerGroupRankAndAverages.PeerGroupRankDataQtr = peerGroupRankAndAverages.PeerGroupRankDataQtr.OrderByDescending(obj => obj.CurrYear.HasValue).ThenByDescending(obj => obj.CurrYear).ToList();
                        peerGroupRankAndAverages.PeerGroupRankDataYtd = peerGroupRankAndAverages.PeerGroupRankDataYtd.OrderByDescending(obj => obj.CurrYear.HasValue).ThenByDescending(obj => obj.CurrYear).ToList();
                    }

                    List<PeerGroupRankData> averagesQtr = result.Where(obje => obje.RowDisplay == "OutSide" && obje.PeriodType == "QTR").ToList();
                    StdPeerGroupInfo stdPeerGroup = UtilityFunctions.GetStdPeerGroupForInstitution(rankingParams.InstitutionKey);

                    PeerGroupRankData pgRankData1 = averagesQtr.Where(obj => obj.InstitutionKey > 0).FirstOrDefault();
                    PeerGroupAverageData pgAvgData = new PeerGroupAverageData();
                    if(pgRankData1 != null)
                    {
                        pgAvgData.InstitutionName = pgRankData1.InstitutionName;
                        pgAvgData.CurrYear = pgRankData1.CurrYear;
                        pgAvgData.CurrYear1 = pgRankData1.CurrYear1;
                        pgAvgData.CurrYear2 = pgRankData1.CurrYear2;
                        pgAvgData.CurrYear3 = pgRankData1.CurrYear3;
                        pgAvgData.CurrYear4 = pgRankData1.CurrYear4;
                        pgAvgData.RowDisplay = pgRankData1.RowDisplay;
                        peerGroupRankAndAverages.PeerGroupAverageDataQtr.Add(pgAvgData);
                    }
                    
                    pgAvgData = new PeerGroupAverageData();
                    PeerGroupRankData pgRankData0 = averagesQtr.Where(obj => obj.InstitutionKey == null && obj.InstitutionName == "Custom Peer Group Average").FirstOrDefault();
                    if (pgRankData0 != null)
                    {
                        pgAvgData.InstitutionName = rankingParams.CustPeerGroupName;
                        pgAvgData.CurrYear = pgRankData0.CurrYear;
                        pgAvgData.CurrYear1 = pgRankData0.CurrYear1;
                        pgAvgData.CurrYear2 = pgRankData0.CurrYear2;
                        pgAvgData.CurrYear3 = pgRankData0.CurrYear3;
                        pgAvgData.CurrYear4 = pgRankData0.CurrYear4;
                        pgAvgData.RowDisplay = pgRankData0.RowDisplay;
                        peerGroupRankAndAverages.PeerGroupAverageDataQtr.Add(pgAvgData);
                    }
                    

                    pgAvgData = new PeerGroupAverageData();
                    PeerGroupRankData pgRankData2 = averagesQtr.Where(obj => obj.InstitutionKey == null && obj.InstitutionName == "UBPR Peer Group Average").FirstOrDefault();
                    if(pgRankData2 != null)
                    {
                        pgAvgData.InstitutionName = "UBPR Group " + stdPeerGroup.StdPeerGroupCode;
                        pgAvgData.CurrYear = pgRankData2.CurrYear;
                        pgAvgData.CurrYear1 = pgRankData2.CurrYear1;
                        pgAvgData.CurrYear2 = pgRankData2.CurrYear2;
                        pgAvgData.CurrYear3 = pgRankData2.CurrYear3;
                        pgAvgData.CurrYear4 = pgRankData2.CurrYear4;
                        pgAvgData.RowDisplay = pgRankData2.RowDisplay;
                        peerGroupRankAndAverages.PeerGroupAverageDataQtr.Add(pgAvgData);
                    }
                   

                    List<PeerGroupRankData> averagesYtd = result.Where(obje => obje.RowDisplay == "OutSide" && obje.PeriodType == "YTD").ToList();
                    pgRankData1 = averagesYtd.Where(obj => obj.InstitutionKey > 0).FirstOrDefault();
                    pgAvgData = new PeerGroupAverageData();
                    if(pgRankData1 != null)
                    {
                        pgAvgData.InstitutionName = pgRankData1.InstitutionName;
                        pgAvgData.CurrYear = pgRankData1.CurrYear;
                        pgAvgData.CurrYear1 = pgRankData1.CurrYear1;
                        pgAvgData.CurrYear2 = pgRankData1.CurrYear2;
                        pgAvgData.CurrYear3 = pgRankData1.CurrYear3;
                        pgAvgData.CurrYear4 = pgRankData1.CurrYear4;
                        pgAvgData.RowDisplay = pgRankData1.RowDisplay;
                        peerGroupRankAndAverages.PeerGroupAverageDataYtd.Add(pgAvgData);
                    }
                    

                    pgAvgData = new PeerGroupAverageData();
                    pgRankData0 = averagesYtd.Where(obj => obj.InstitutionKey == null && obj.InstitutionName == "Custom Peer Group Average").FirstOrDefault();
                    if(pgRankData0 != null)
                    {
                        pgAvgData.InstitutionName = rankingParams.CustPeerGroupName;
                        pgAvgData.CurrYear = pgRankData0.CurrYear;
                        pgAvgData.CurrYear1 = pgRankData0.CurrYear1;
                        pgAvgData.CurrYear2 = pgRankData0.CurrYear2;
                        pgAvgData.CurrYear3 = pgRankData0.CurrYear3;
                        pgAvgData.CurrYear4 = pgRankData0.CurrYear4;
                        pgAvgData.RowDisplay = pgRankData0.RowDisplay;
                        peerGroupRankAndAverages.PeerGroupAverageDataYtd.Add(pgAvgData);
                    }
                   

                    pgAvgData = new PeerGroupAverageData();
                    pgRankData2 = averagesYtd.Where(obj => obj.InstitutionKey == null && obj.InstitutionName == "UBPR Peer Group Average").FirstOrDefault();
                    if(pgRankData2 != null)
                    {
                        pgAvgData.InstitutionName = "UBPR Group " + stdPeerGroup.StdPeerGroupCode;
                        pgAvgData.CurrYear = pgRankData2.CurrYear;
                        pgAvgData.CurrYear1 = pgRankData2.CurrYear1;
                        pgAvgData.CurrYear2 = pgRankData2.CurrYear2;
                        pgAvgData.CurrYear3 = pgRankData2.CurrYear3;
                        pgAvgData.CurrYear4 = pgRankData2.CurrYear4;
                        pgAvgData.RowDisplay = pgRankData2.RowDisplay;
                        peerGroupRankAndAverages.PeerGroupAverageDataYtd.Add(pgAvgData);
                    }
                    
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return peerGroupRankAndAverages;
        }

        public Dictionary<string, List<BankProfileSectionHeader>> GetYtdHeaders()
        {
            Dictionary<string, List<BankProfileSectionHeader>> ytdRiskProfileTableHeaders = new Dictionary<string, List<BankProfileSectionHeader>>();
            List<BankProfileSectionHeader> ytdRankTableHeaders = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> ytdAverageTableHeaders = new List<BankProfileSectionHeader>();

            ytdRankTableHeaders.Add(new BankProfileSectionHeader() { Label = "#" });
            ytdRankTableHeaders.Add(new BankProfileSectionHeader() { Label = "Institution Name" });
            ytdAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = "#" });
            ytdAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = "Peer Group Averages" });

            string lastQuarterString = CommonFunctions.GetLastQuarterString();
            string month = lastQuarterString.Substring(4, 2);
            string year = lastQuarterString.Substring(0, 4);
            string day = lastQuarterString.Substring(6, 2);
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));

            for (int i = (latestQuarterDate.Year - 4); i < (latestQuarterDate.Year); i++)
            {
                ytdRankTableHeaders.Add(new BankProfileSectionHeader() { Label = i.ToString() + "Y" });
                ytdAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = i.ToString() + "Y" });
            }

            string latestQuarterMonth = string.Empty;
            if (latestQuarterDate.Month < 10)
                latestQuarterMonth = "0" + latestQuarterDate.Month.ToString();
            else
                latestQuarterMonth = latestQuarterDate.Month.ToString();


            ytdRankTableHeaders.Add(new BankProfileSectionHeader() { Label = CommonFunctions.GetYearlyLabel(latestQuarterDate.Year.ToString()+latestQuarterMonth+latestQuarterDate.Day.ToString()) });
            ytdAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = CommonFunctions.GetYearlyLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString()) });

            ytdRiskProfileTableHeaders.Add("YtdRankTableHeaders", ytdRankTableHeaders);
            ytdRiskProfileTableHeaders.Add("YtdAverageTableHeaders", ytdAverageTableHeaders);
            return ytdRiskProfileTableHeaders;
        }

        public Dictionary<string, List<BankProfileSectionHeader>> GetQtrHeaders()
        {
            Dictionary<string, List<BankProfileSectionHeader>> qtrRiskProfileTableHeaders = new Dictionary<string, List<BankProfileSectionHeader>>();
            List<BankProfileSectionHeader> qtrRankTableHeaders = new List<BankProfileSectionHeader>();
            List<BankProfileSectionHeader> qtrAverageTableHeaders = new List<BankProfileSectionHeader>();
            string lastQuarterString = CommonFunctions.GetLastQuarterString();
            string month = lastQuarterString.Substring(4, 2);
            string year = lastQuarterString.Substring(0, 4);
            string day = lastQuarterString.Substring(6, 2);
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));
            DateTime minus1QuarteDate = latestQuarterDate.AddMonths(-3);
            DateTime minus2QuarteDate = latestQuarterDate.AddMonths(-6);
            DateTime minus3QuarteDate = latestQuarterDate.AddMonths(-9);
            DateTime minus4QuarteDate = latestQuarterDate.AddMonths(-12);
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = "#" });
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = "Institution Name" });
            qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = "#" });
            qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = "Peer Group Averages" });
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

            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            qtrRankTableHeaders.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus4QuarterString });
            qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus3QuarterString });
            qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus2QuarterString });
            qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = minus1QuarterString });
            qtrAverageTableHeaders.Add(new BankProfileSectionHeader() { Label = latestQuarterString });

            qtrRiskProfileTableHeaders.Add("QtrRankTableHeaders", qtrRankTableHeaders);
            qtrRiskProfileTableHeaders.Add("QtrAverageTableHeaders", qtrAverageTableHeaders);

            return qtrRiskProfileTableHeaders;
        }

        private UbprChartData MapChartDataToChartSpecificObject(List<RiskProfileChartDataViewModel> result, GetRiskProfileChartDataViewModel chartDataParameters)
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

            UbprChartData ubprChartData = new UbprChartData();
            ChartCategoryAndSeriesData yearlyChartData = new ChartCategoryAndSeriesData();
            ChartCategoryAndSeriesData quarterlyChartData = new ChartCategoryAndSeriesData();
            CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            CategoryList cate = new CategoryList();
            Category cg = new Category();
            CategoryLabel label = null;
            DataValue institutionDataValue = null;
            DataValue custPeerDataValue = null;
            DataValue standardDataValue = null;
            DataSetDataItem institutionDataSet = new DataSetDataItem();
            DataSetDataItem custPeerDataSet = new DataSetDataItem();
            DataSetDataItem standardDataSet = new DataSetDataItem();
            int instKey = chartDataParameters.InstitutionKey;
            string pGroupName = string.Empty;
            institutionDataSet.SeriesName = ent.DimInstitutions.First(obj => obj.InstitutionKey == instKey).InstitutionName;
            institutionDataSet.ShowValues = "1";
            custPeerDataSet.SeriesName = chartDataParameters.CustPeerGroupName;
            custPeerDataSet.RenderAs = "line";
            StdPeerGroupInfo stdPeerGroup = UtilityFunctions.GetStdPeerGroupForInstitution(chartDataParameters.InstitutionKey);
            if (stdPeerGroup != null)
                standardDataSet.SeriesName = "UBPR Group " + stdPeerGroup.StdPeerGroupCode;
            else
                standardDataSet.SeriesName = "N/A";

            standardDataSet.RenderAs = "line";
            institutionDataSet.Data = new List<DataValue>();
            custPeerDataSet.Data = new List<DataValue>();
            standardDataSet.Data = new List<DataValue>();
            List<RiskProfileChartDataViewModel> yearlyData = result.Where(obje => obje.PeriodType == "YTD").ToList();
            yearlyData.Sort();
            foreach (RiskProfileChartDataViewModel chartData in yearlyData)
            {
                label = new CategoryLabel();
                string effectiveYearLabel = chartData.Year.ToString() + "Y";
                if (chartData.Year == DateTime.Now.Year)
                {
                    effectiveYearLabel = CommonFunctions.GetQuarterLabel(latestQuarterDate.Year.ToString() + latestQuarterMonth + latestQuarterDate.Day.ToString());
                }

                label.Label = effectiveYearLabel;
                cg.CategoryLabels.Add(label);
                institutionDataValue = new DataValue();
                custPeerDataValue = new DataValue();
                standardDataValue = new DataValue();

                if (chartData.FactUBPRConceptValue != null)
                    institutionDataValue.Value = chartData.FactUBPRConceptValue.ToString();

                if (chartData.CustPGUBPRConceptValue != null)
                    custPeerDataValue.Value = chartData.CustPGUBPRConceptValue.ToString();

                if (chartData.StdPGUBPRDataValue != null)
                    standardDataValue.Value = chartData.StdPGUBPRDataValue.ToString();

                institutionDataSet.Data.Add(institutionDataValue);
                custPeerDataSet.Data.Add(custPeerDataValue);
                standardDataSet.Data.Add(standardDataValue);
            }

            cate.Category = cg;

            yearlyChartData.Categories = cate;
            yearlyChartData.DataSetList.Add(institutionDataSet);
            yearlyChartData.DataSetList.Add(custPeerDataSet);
            yearlyChartData.DataSetList.Add(standardDataSet);
            ubprChartData.YearlyChartData = yearlyChartData;

            List<RiskProfileChartDataViewModel> quarterlyData = result.Where(obje => obje.PeriodType == "QTR").ToList();
            institutionDataSet = new DataSetDataItem();
            custPeerDataSet = new DataSetDataItem();
            standardDataSet = new DataSetDataItem();
            institutionDataSet.Data = new List<DataValue>();
            custPeerDataSet.Data = new List<DataValue>();
            standardDataSet.Data = new List<DataValue>();
            institutionDataSet.SeriesName = ent.DimInstitutions.First(obj => obj.InstitutionKey == instKey).InstitutionName;
            institutionDataSet.ShowValues = "1";
            custPeerDataSet.SeriesName = chartDataParameters.CustPeerGroupName;
            custPeerDataSet.RenderAs = "line";
            if (stdPeerGroup != null)
                standardDataSet.SeriesName = "UBPR Group " + stdPeerGroup.StdPeerGroupCode;
            else
                standardDataSet.SeriesName = "N/A";
            standardDataSet.RenderAs = "line";

            quarterlyData.Sort();
            cate = new CategoryList();
            cg = new Category();
            foreach (RiskProfileChartDataViewModel chartData in quarterlyData)
            {
                label = new CategoryLabel();
                label.Label = CommonFunctions.GetQuarterLabel(chartData.Year.ToString());
                cg.CategoryLabels.Add(label);
                institutionDataValue = new DataValue();
                custPeerDataValue = new DataValue();
                standardDataValue = new DataValue();

                if (chartData.FactUBPRConceptValue != null)
                    institutionDataValue.Value = chartData.FactUBPRConceptValue.ToString();

                if (chartData.CustPGUBPRConceptValue != null)
                    custPeerDataValue.Value = chartData.CustPGUBPRConceptValue.ToString();

                if (chartData.StdPGUBPRDataValue != null)
                    standardDataValue.Value = chartData.StdPGUBPRDataValue.ToString();

                institutionDataSet.Data.Add(institutionDataValue);
                custPeerDataSet.Data.Add(custPeerDataValue);
                standardDataSet.Data.Add(standardDataValue);
            }

            cate.Category = cg;

            quarterlyChartData.Categories = cate;
            quarterlyChartData.DataSetList.Add(institutionDataSet);
            quarterlyChartData.DataSetList.Add(custPeerDataSet);
            quarterlyChartData.DataSetList.Add(standardDataSet);
            ubprChartData.QuarterlyChartData = quarterlyChartData;

            return ubprChartData;
        }

        private RiskProfileDataSection MapDataSection(RiskProfileData rpd)
        {
            RiskProfileDataSection rpdSection = new RiskProfileDataSection();

            if (rpd.UBPRConceptDesc != null)
                rpdSection.UBPRConceptDesc = rpd.UBPRConceptDesc;

            rpdSection.Bank = rpd.Bank;
            rpdSection.Peer1 = rpd.Peer1;
            rpdSection.Peer2 = rpd.Peer2;

            if (rpd.UBPRConceptCode != null)
                rpdSection.UBPRConceptCode = rpd.UBPRConceptCode;

            if (rpd.RankTableSortOrder != null)
                rpdSection.SortOrder = rpd.RankTableSortOrder;

            return rpdSection;
        }

        private RiskProfileDataSectionOne MapDataSectionOne(RiskProfileDataOne rpd)
        {
            RiskProfileDataSectionOne rpdSection = new RiskProfileDataSectionOne();

            if (rpd.UBPRConceptDesc != null)
                rpdSection.UBPRConceptDesc = rpd.UBPRConceptDesc;

            rpdSection.Bank = rpd.Bank;
            rpdSection.Peer1 = rpd.Peer1;
            rpdSection.Peer2 = rpd.Peer2;

            if (rpd.UBPRConceptCode != null)
                rpdSection.UBPRConceptCode = rpd.UBPRConceptCode;

            if (rpd.RankTableSortOrder != null)
                rpdSection.SortOrder = rpd.RankTableSortOrder;

            return rpdSection;
        }

        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage GetKeyRiskTrendsExporttoExcel([FromBody]GetRiskProfileDataViewModel profileParams)
        {
            HttpResponseMessage result = new HttpResponseMessage();
            try
            {
                RiskProfilesApiController riskProfiles = new RiskProfilesApiController();
                RiskProfileDataViewModel riskProfileCreditRiskData = riskProfiles.GetRiskProfileCreditRiskData(profileParams);
                RiskProfileDataViewModel riskProfileInterestRiskData = riskProfiles.GetRiskProfileInterestRiskData(profileParams);
                RiskProfileDataViewModel riskProfileLiquidityRiskData = riskProfiles.GetRiskProfileLiquidityRiskData(profileParams);
                RiskProfileDataViewModelOne riskProfileStrategicRiskData = riskProfiles.GetRiskProfileStrategicRiskData(profileParams);

                DataTable dtInformation = new DataTable();
                DataTable dtCreditRisk = new DataTable();
                DataTable dtInterestRiskData = new DataTable();
                DataTable dtLiquidityRiskData = new DataTable();
                DataTable dtStrategicRiskData = new DataTable();

                dtInformation.TableName = "Information";
                dtCreditRisk.TableName = "Credit Risk";
                dtInterestRiskData.TableName = "Interest Rate Risk";
                dtLiquidityRiskData.TableName = "Liquidity & Pric Risk";
                dtStrategicRiskData.TableName = "Strategic Risk";

                dtInformation.Columns.Add("Bank");
                dtInformation.Columns.Add("Peer1");
                dtInformation.Columns.Add("Peer2");
                dtInformation.Columns.Add("Period");

                dtCreditRisk.Columns.Add(riskProfileCreditRiskData.RiskProfileSections.ElementAt(0).Key);
                dtCreditRisk.Columns.Add("Bank");
                dtCreditRisk.Columns.Add("Peer1");
                dtCreditRisk.Columns.Add("Peer2");

                dtInterestRiskData.Columns.Add(riskProfileInterestRiskData.RiskProfileSections.ElementAt(0).Key);
                dtInterestRiskData.Columns.Add("Bank");
                dtInterestRiskData.Columns.Add("Peer1");
                dtInterestRiskData.Columns.Add("Peer2");

                dtLiquidityRiskData.Columns.Add(riskProfileLiquidityRiskData.RiskProfileSections.ElementAt(0).Key);
                dtLiquidityRiskData.Columns.Add("Bank");
                dtLiquidityRiskData.Columns.Add("Peer1");
                dtLiquidityRiskData.Columns.Add("Peer2");

                dtStrategicRiskData.Columns.Add(riskProfileStrategicRiskData.RiskProfileSections.ElementAt(0).Key);
                dtStrategicRiskData.Columns.Add("Bank");
                dtStrategicRiskData.Columns.Add("Peer1");
                dtStrategicRiskData.Columns.Add("Peer2");


                DataRow informationrow1 = dtInformation.NewRow();
                informationrow1["Bank"] = profileParams.Bank;
                informationrow1["Peer1"] = profileParams.Peer1;
                informationrow1["Peer2"] = profileParams.Peer2;
                informationrow1["Period"] = CommonFunctions.GetQuarterLabel(CommonFunctions.GetLastQuarterString());
                dtInformation.Rows.Add(informationrow1);
                PeerGroupsApiController peerGroupObj = new PeerGroupsApiController();
                GetPeerGroupDetailsParam objpeerParams = new GetPeerGroupDetailsParam();
                objpeerParams.CustPeerGroupKey =profileParams.CustPeerGroupKey;               
                var peerGroupsData = peerGroupObj.GetPeerGroupMembers(objpeerParams);
                if (peerGroupsData != null)
                {
                    foreach (var rec in peerGroupsData)
                    {
                        DataRow informationrow = dtInformation.NewRow();
                        if (rec.InstitutionName != profileParams.Peer1)
                        {
                            informationrow["Peer1"] = rec.InstitutionName;
                            dtInformation.Rows.Add(informationrow);
                        }
                    }
                }
                foreach (var sec in riskProfileCreditRiskData.RiskProfileSections)
                {                    
                    if (sec.Key!= "SummaryRatios")
                    {
                        DataRow row1 = dtCreditRisk.NewRow();
                        row1[riskProfileCreditRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                        row1["Bank"] = "Bank";
                        row1["Peer1"] = "Peer1";
                        row1["Peer2"] = "Peer2";
                        dtCreditRisk.Rows.Add(row1);
                    }                    
                    foreach (var rec in sec.Value)
                    {
                        DataRow row = dtCreditRisk.NewRow();
                        row[riskProfileCreditRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                        row["Bank"] = rec.Bank;
                        row["Peer1"] = rec.Peer1;
                        row["Peer2"] = rec.Peer2;
                        dtCreditRisk.Rows.Add(row);
                    }
                    DataRow emptyrow = dtCreditRisk.NewRow();
                    emptyrow[riskProfileCreditRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                    emptyrow["Bank"] = string.Empty;
                    emptyrow["Peer1"] = string.Empty;
                    emptyrow["Peer2"] = string.Empty;                        
                    dtCreditRisk.Rows.Add(emptyrow);
                }
              
                foreach (var sec in riskProfileInterestRiskData.RiskProfileSections)
                {
                    if (sec.Key!= "YieldAndCost")
                    {
                        DataRow row2 = dtInterestRiskData.NewRow();
                        row2[riskProfileInterestRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                        row2["Bank"] = "Bank";
                        row2["Peer1"] = "Peer1";
                        row2["Peer2"] = "Peer2";
                        dtInterestRiskData.Rows.Add(row2);
                    }                    
                    foreach (var rec in sec.Value)
                    {
                        DataRow row = dtInterestRiskData.NewRow();
                        row[riskProfileInterestRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                        row["Bank"] = rec.Bank;
                        row["Peer1"] = rec.Peer1;
                        row["Peer2"] = rec.Peer2;
                        dtInterestRiskData.Rows.Add(row);
                    }
                    DataRow emptyrow = dtInterestRiskData.NewRow();
                    emptyrow[riskProfileInterestRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                    emptyrow["Bank"] = string.Empty;
                    emptyrow["Peer1"] = string.Empty;
                    emptyrow["Peer2"] = string.Empty;                   
                    dtInterestRiskData.Rows.Add(emptyrow);
                }
              
                foreach (var sec in riskProfileLiquidityRiskData.RiskProfileSections)
                {
                    if (sec.Key!= "KeyLiquidityRatios")
                    {
                        DataRow row3 = dtLiquidityRiskData.NewRow();
                        row3[riskProfileLiquidityRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                        row3["Bank"] = "Bank";
                        row3["Peer1"] = "Peer1";
                        row3["Peer2"] = "Peer2";
                        dtLiquidityRiskData.Rows.Add(row3);
                    }
                    foreach (var rec in sec.Value)
                    {
                        DataRow row = dtLiquidityRiskData.NewRow();
                        row[riskProfileLiquidityRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                        row["Bank"] = rec.Bank;
                        row["Peer1"] = rec.Peer1;
                        row["Peer2"] = rec.Peer2;
                        dtLiquidityRiskData.Rows.Add(row);
                    }
                    DataRow emptyrow = dtLiquidityRiskData.NewRow();
                    emptyrow[riskProfileLiquidityRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                    emptyrow["Bank"] = string.Empty;
                    emptyrow["Peer1"] = string.Empty;
                    emptyrow["Peer2"] = string.Empty;                  
                    dtLiquidityRiskData.Rows.Add(emptyrow);
                }
              
                foreach (var sec in riskProfileStrategicRiskData.RiskProfileSections)
                {
                    if (sec.Key!= "EarningsAndProfitability")
                    {
                        DataRow row4 = dtStrategicRiskData.NewRow();
                        row4[riskProfileStrategicRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                        row4["Bank"] = "Bank";
                        row4["Peer1"] = "Peer1";
                        row4["Peer2"] = "Peer2";
                        dtStrategicRiskData.Rows.Add(row4);
                    }                    
                    foreach (var rec in sec.Value)
                    {
                        DataRow row = dtStrategicRiskData.NewRow();
                        row[riskProfileStrategicRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                        row["Bank"] = rec.Bank;
                        row["Peer1"] = rec.Peer1;
                        row["Peer2"] = rec.Peer2;
                        dtStrategicRiskData.Rows.Add(row);
                    }
                    DataRow emptyrow = dtStrategicRiskData.NewRow();
                    emptyrow[riskProfileStrategicRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                    emptyrow["Bank"] = string.Empty;
                    emptyrow["Peer1"] = string.Empty;
                    emptyrow["Peer2"] = string.Empty;                    
                    dtStrategicRiskData.Rows.Add(emptyrow);
                }
                List<GetRiskProfileDataViewModel> keyRiskTrendParams = new List<GetRiskProfileDataViewModel>();
                GetRiskProfileDataViewModel objkeyparams = new GetRiskProfileDataViewModel();
                objkeyparams.Bank = profileParams.Bank;
                objkeyparams.Peer1 = profileParams.Peer1;
                objkeyparams.Peer2 = profileParams.Peer2;
                keyRiskTrendParams.Add(objkeyparams);               
                DataTable[] metricArr = new DataTable[5];
                metricArr[0] = dtInformation;
                metricArr[1] = dtCreditRisk;
                metricArr[2] = dtInterestRiskData;
                metricArr[3] = dtLiquidityRiskData;
                metricArr[4] = dtStrategicRiskData;

                BankProfileOverviewParams bankdata = new BankProfileOverviewParams();
                bankdata.InstitutionKey = profileParams.InstitutionKey;
                bankdata.Period = CommonFunctions.GetLastQuarterString();
                var Bankfinalres = this.GetBankProfileIntroductionData(bankdata);
                byte[] exceldata= CreateKeyTrendsExportFile.CreateExcelDocument(metricArr, "KeyRiskTrends.xlsx", Bankfinalres);
                result.Content = new ByteArrayContent(exceldata);
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ms-excel");
                result.Content.Headers.ContentLength = exceldata.Length;
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = "KeyRiskTrends" + profileParams.InstitutionKey.ToString() + ".xlsx";
                result.Content.Headers.ContentDisposition.Size = exceldata.Length;

            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }            
            return result;
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