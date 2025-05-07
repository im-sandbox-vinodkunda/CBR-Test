using CBR.Common;
using CBR.DataAccess;
using CBR.Web.CustomFilter;
using CBR.Web.ExportToExcel;
using CBR.Web.Models;
using CBR.Web.WebCommons;
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
    public class BenchmarkApiController : ApiController
    {
        // POST api/<controller>
        [HttpPost]
        public RiskProfileDataViewModel GetBenchmarkCreditRiskData([FromBody]GetRiskProfileDataViewModel riskProfileParams)
        {
            RiskProfileDataViewModel rPViewModel = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("Institutionkey", SqlDbType.Int);
                institutionKey.Value = riskProfileParams.InstitutionKey; // logged in user's tenant's institution
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
                int usersInstitution = UtilityFunctions.GetInstitutionKey(User.Identity.Name);
                bool doesUserBelongToInstitution = false;
                if (usersInstitution == riskProfileParams.InstitutionKey)
                    doesUserBelongToInstitution = true;
                rPViewModel = this.GroupBenchmarkCreditRiskDataPerSection(result, doesUserBelongToInstitution);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return rPViewModel;
        }

        private RiskProfileDataViewModel GroupBenchmarkCreditRiskDataPerSection(List<RiskProfileData> riskProfileRawData, bool doesUserBelongToInstitution)
        {
            RiskProfileDataViewModel riskProfileData = new RiskProfileDataViewModel();
            List<RiskProfileDataSection> summaryRatiosQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> yieldAndCostQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> offBalanceSheetItemsQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> creditAllowanceQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> loanMixQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> concentrationOfCreditQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> commercialRealEstateQtd = new List<RiskProfileDataSection>();

            List<RiskProfileDataSection> pastDueAndNonAccrualQtd = new List<RiskProfileDataSection>();

            List<RiskProfileDataSection> summaryRatiosYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> yieldAndCostYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> offBalanceSheetItemsYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> creditAllowanceYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> loanMixYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> concentrationOfCreditYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> commercialRealEstateYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> pastDueAndNonAccrualYtd = new List<RiskProfileDataSection>();
            RiskProfileDataSection rpdSection = null;

            foreach (RiskProfileData rpd in riskProfileRawData)
            {
                switch (rpd.SectionOrder)
                {
                    case 1:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        summaryRatiosQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        summaryRatiosYtd.Add(rpdSection);
                        break;
                    case 2:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        yieldAndCostQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        yieldAndCostYtd.Add(rpdSection);
                        break;
                    case 3:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        offBalanceSheetItemsQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        offBalanceSheetItemsYtd.Add(rpdSection);
                        break;
                    case 4:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        creditAllowanceQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        creditAllowanceYtd.Add(rpdSection);
                        break;
                    case 5:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        loanMixQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        loanMixYtd.Add(rpdSection);
                        break;
                    case 6:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        concentrationOfCreditQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        concentrationOfCreditYtd.Add(rpdSection);
                        break;
                    case 7:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        commercialRealEstateQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        commercialRealEstateYtd.Add(rpdSection);
                        break;
                    case 8:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        pastDueAndNonAccrualQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        pastDueAndNonAccrualYtd.Add(rpdSection);
                        break;
                }
            }

            riskProfileData.RiskProfileSections.Add("SummaryRatiosQtd", summaryRatiosQtd);
            riskProfileData.RiskProfileSections.Add("YieldAndCostQtd", yieldAndCostQtd);
            riskProfileData.RiskProfileSections.Add("CROffBalanceSheetQtd", offBalanceSheetItemsQtd);
            riskProfileData.RiskProfileSections.Add("CreditAllowanceQtd", creditAllowanceQtd);
            riskProfileData.RiskProfileSections.Add("LoanMixQtd", loanMixQtd);
            riskProfileData.RiskProfileSections.Add("CrConcentrationOfCreditQtd", concentrationOfCreditQtd);
            riskProfileData.RiskProfileSections.Add("CommercialRealEstateQtd", commercialRealEstateQtd);
            riskProfileData.RiskProfileSections.Add("PastDueQtd", pastDueAndNonAccrualQtd);

            riskProfileData.RiskProfileSections.Add("SummaryRatiosYtd", summaryRatiosYtd);
            riskProfileData.RiskProfileSections.Add("YieldAndCostYtd", yieldAndCostYtd);
            riskProfileData.RiskProfileSections.Add("CROffBalanceSheetYtd", offBalanceSheetItemsYtd);
            riskProfileData.RiskProfileSections.Add("CreditAllowanceYtd", creditAllowanceYtd);
            riskProfileData.RiskProfileSections.Add("LoanMixYtd", loanMixYtd);
            riskProfileData.RiskProfileSections.Add("CrConcentrationOfCreditYtd", concentrationOfCreditYtd);
            riskProfileData.RiskProfileSections.Add("CommercialRealEstateYtd", commercialRealEstateYtd);
            riskProfileData.RiskProfileSections.Add("PastDueYtd", pastDueAndNonAccrualYtd);

            return riskProfileData;
        }

        // POST api/<controller>
        [HttpPost]
        public RiskProfileDataViewModel GetBenchmarkInterestRiskData([FromBody]GetRiskProfileDataViewModel riskProfileParams)
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
                int usersInstitution = UtilityFunctions.GetInstitutionKey(User.Identity.Name);
                bool doesUserBelongToInstitution = false;
                if (usersInstitution == riskProfileParams.InstitutionKey)
                    doesUserBelongToInstitution = true;
                rPViewModel = this.GroupBenchmarkInterestRiskDataPerSection(result, doesUserBelongToInstitution);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return rPViewModel;
        }

        private RiskProfileDataViewModel GroupBenchmarkInterestRiskDataPerSection(List<RiskProfileData> result, bool doesUserBelongToInstitution)
        {
            RiskProfileDataViewModel riskProfileData = new RiskProfileDataViewModel();
            List<RiskProfileDataSection> yieldAndCostQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> offBalanceSheetItemsQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> interestRateRiskItemsQtd = new List<RiskProfileDataSection>();

            List<RiskProfileDataSection> yieldAndCostYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> offBalanceSheetItemsYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> interestRateRiskItemsYtd = new List<RiskProfileDataSection>();

            RiskProfileDataSection rpdSection = null;

            foreach (RiskProfileData rpd in result)
            {
                switch (rpd.SectionName)
                {
                    case "YIELDS & COSTS":
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        yieldAndCostQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        yieldAndCostYtd.Add(rpdSection);
                        break;
                    case "BALANCE SHEET":
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        offBalanceSheetItemsQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        offBalanceSheetItemsYtd.Add(rpdSection);
                        break;
                    case "INTEREST RATE RISK":
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        interestRateRiskItemsQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        interestRateRiskItemsYtd.Add(rpdSection);
                        break;
                }
            }

            riskProfileData.RiskProfileSections.Add("YieldAndCostQtd", yieldAndCostQtd);
            riskProfileData.RiskProfileSections.Add("IRRiskOffBalanceSheetQtd", offBalanceSheetItemsQtd);
            riskProfileData.RiskProfileSections.Add("InterestRateRiskItemsQtd", interestRateRiskItemsQtd);
            riskProfileData.RiskProfileSections.Add("YieldAndCostYtd", yieldAndCostYtd);
            riskProfileData.RiskProfileSections.Add("IRRiskOffBalanceSheetYtd", offBalanceSheetItemsYtd);
            riskProfileData.RiskProfileSections.Add("InterestRateRiskItemsYtd", interestRateRiskItemsYtd);

            return riskProfileData;
        }

        // POST api/<controller>
        [HttpPost]
        public RiskProfileDataViewModel GetBenchmarkLiquidityRiskData([FromBody]GetRiskProfileDataViewModel riskProfileParams)
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
                    riskProfileParams.InstitutionKey = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);

                object[] riskProfileDataParams = new object[6];
                riskProfileDataParams[0] = institutionKey;
                riskProfileDataParams[1] = period;
                riskProfileDataParams[2] = tenantKey;
                riskProfileDataParams[3] = stdPeerGroupKey;
                riskProfileDataParams[4] = custPeerGroupKey;
                riskProfileDataParams[5] = loggedInUserKey;

                var result = ent.Database.SqlQuery<RiskProfileData>("dbo.uspRptLIQPriceData @Institutionkey, @Period, @TenantKey, @StdPeerGroupKey, @CustPeerGroupKey, @UserKey", riskProfileDataParams).ToList();
                int usersInstitution = UtilityFunctions.GetInstitutionKey(User.Identity.Name);
                bool doesUserBelongToInstitution = false;
                if (usersInstitution == riskProfileParams.InstitutionKey)
                    doesUserBelongToInstitution = true;
                rPViewModel = this.GroupBenchmarkLiquidityRiskDataPerSection(result, doesUserBelongToInstitution);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return rPViewModel;
        }

        private RiskProfileDataViewModel GroupBenchmarkLiquidityRiskDataPerSection(List<RiskProfileData> result, bool doesUserBelongToInstitution)
        {
            RiskProfileDataViewModel riskProfileData = new RiskProfileDataViewModel();
            List<RiskProfileDataSection> liquidityAndFundingQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> liquidityInvestmentPortfolioQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> liquiditySecurityRatiosQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> offBalanceSheetItemsQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> concentrationOfCreditQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> capitalAnalysisQtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> newCapitalAnalysisQtd = new List<RiskProfileDataSection>();

            List<RiskProfileDataSection> liquidityAndFundingYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> liquidityInvestmentPortfolioYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> liquiditySecurityRatiosYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> offBalanceSheetItemsYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> concentrationOfCreditYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> capitalAnalysisYtd = new List<RiskProfileDataSection>();
            List<RiskProfileDataSection> newCapitalAnalysisYtd = new List<RiskProfileDataSection>();

            RiskProfileDataSection rpdSection = null;

            foreach (RiskProfileData rpd in result)
            {
                switch (rpd.SectionOrder)
                {
                    case 1:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        liquidityAndFundingQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        liquidityAndFundingYtd.Add(rpdSection);
                        break;
                    case 2:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        liquidityInvestmentPortfolioQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        liquidityInvestmentPortfolioYtd.Add(rpdSection);
                        break;
                    case 3:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        liquiditySecurityRatiosQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        liquiditySecurityRatiosYtd.Add(rpdSection);
                        break;
                    case 4:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        offBalanceSheetItemsQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        offBalanceSheetItemsYtd.Add(rpdSection);
                        break;
                    case 5:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        concentrationOfCreditQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        concentrationOfCreditYtd.Add(rpdSection);
                        break;
                    case 6:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        capitalAnalysisQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        capitalAnalysisYtd.Add(rpdSection);
                        break;
                    case 7:
                        rpdSection = this.MapDataSection(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        newCapitalAnalysisQtd.Add(rpdSection);
                        rpdSection = this.MapDataSection(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        newCapitalAnalysisYtd.Add(rpdSection);
                        break;
                }
            }

            riskProfileData.RiskProfileSections.Add("LiquidityAndFundingQtd", liquidityAndFundingQtd);
            riskProfileData.RiskProfileSections.Add("LiquidityInvestmentPortfolioQtd", liquidityInvestmentPortfolioQtd);
            riskProfileData.RiskProfileSections.Add("LiquiditySecurityRatiosQtd", liquiditySecurityRatiosQtd);
            riskProfileData.RiskProfileSections.Add("LiPrRiskOffBalanceSheetQtd", offBalanceSheetItemsQtd);
            riskProfileData.RiskProfileSections.Add("LiPrConcentrationOfCreditQtd", concentrationOfCreditQtd);
            riskProfileData.RiskProfileSections.Add("CapitalAnalysisQtd", capitalAnalysisQtd);
            riskProfileData.RiskProfileSections.Add("newCapitalAnalysisQtd", newCapitalAnalysisQtd);
            riskProfileData.RiskProfileSections.Add("LiquidityAndFundingYtd", liquidityAndFundingYtd);
            riskProfileData.RiskProfileSections.Add("LiquidityInvestmentPortfolioYtd", liquidityInvestmentPortfolioYtd);
            riskProfileData.RiskProfileSections.Add("LiquiditySecurityRatiosYtd", liquiditySecurityRatiosYtd);
            riskProfileData.RiskProfileSections.Add("LiPrRiskOffBalanceSheetYtd", offBalanceSheetItemsYtd);
            riskProfileData.RiskProfileSections.Add("LiPrConcentrationOfCreditYtd", concentrationOfCreditYtd);
            riskProfileData.RiskProfileSections.Add("CapitalAnalysisYtd", capitalAnalysisYtd);
            riskProfileData.RiskProfileSections.Add("newCapitalAnalysisYtd", newCapitalAnalysisYtd);

            return riskProfileData;
        }

        // POST api/<controller>
        [HttpPost]
        public RiskProfileDataViewModelOne GetBenchmarkStrategicRiskData([FromBody]GetRiskProfileDataViewModel riskProfileParams)
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
                int usersInstitution = UtilityFunctions.GetInstitutionKey(User.Identity.Name);
                bool doesUserBelongToInstitution = false;
                if (usersInstitution == riskProfileParams.InstitutionKey)
                    doesUserBelongToInstitution = true;
                rPViewModel = this.GroupBenchmarkStrategicRiskDataPerSection(result, doesUserBelongToInstitution);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return rPViewModel;
        }

        private RiskProfileDataViewModelOne GroupBenchmarkStrategicRiskDataPerSection(List<RiskProfileDataOne> result, bool doesUserBelongToInstitution)
        {
            RiskProfileDataViewModelOne riskProfileData = new RiskProfileDataViewModelOne();
            List<RiskProfileDataSectionOne> earningsAndProfitabilityQtd = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> nonIncomeAndExpensesQtd = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> interestRateRiskQtd = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> marginAnalysisQtd = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> growthRatesQtd = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> capitalRatiosQtd = new List<RiskProfileDataSectionOne>();

            List<RiskProfileDataSectionOne> earningsAndProfitabilityYtd = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> nonIncomeAndExpensesYtd = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> interestRateRiskYtd = new List<RiskProfileDataSectionOne>();           
            List<RiskProfileDataSectionOne> marginAnalysisYtd = new List<RiskProfileDataSectionOne>();           
            List<RiskProfileDataSectionOne> growthRatesYtd = new List<RiskProfileDataSectionOne>();
            List<RiskProfileDataSectionOne> capitalRatiosYtd = new List<RiskProfileDataSectionOne>();

            RiskProfileDataSectionOne rpdSection = null;

            foreach (RiskProfileDataOne rpd in result)
            {
                switch (rpd.SectionOrder)
                {
                    case 1:
                        rpdSection = this.MapDataSectionOne(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        earningsAndProfitabilityQtd.Add(rpdSection);
                        rpdSection = this.MapDataSectionOne(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        earningsAndProfitabilityYtd.Add(rpdSection);
                        break;
                    case 2:
                        rpdSection = this.MapDataSectionOne(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        marginAnalysisQtd.Add(rpdSection);
                        rpdSection = this.MapDataSectionOne(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        marginAnalysisYtd.Add(rpdSection);
                        break;
                    case 3:
                        rpdSection = this.MapDataSectionOne(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        nonIncomeAndExpensesQtd.Add(rpdSection);
                        rpdSection = this.MapDataSectionOne(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        nonIncomeAndExpensesYtd.Add(rpdSection);
                        break;
                    case 4:
                        rpdSection = this.MapDataSectionOne(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        interestRateRiskQtd.Add(rpdSection);
                        rpdSection = this.MapDataSectionOne(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        interestRateRiskYtd.Add(rpdSection);
                        break;
                    case 5:
                        rpdSection = this.MapDataSectionOne(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        growthRatesQtd.Add(rpdSection);
                        rpdSection = this.MapDataSectionOne(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        growthRatesYtd.Add(rpdSection);
                        break;
                    case 6:
                        rpdSection = this.MapDataSectionOne(rpd, true);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        capitalRatiosQtd.Add(rpdSection);
                        rpdSection = this.MapDataSectionOne(rpd, false);
                        if (!doesUserBelongToInstitution)
                            rpdSection.Benchmark = decimal.MinValue;
                        capitalRatiosYtd.Add(rpdSection);
                        break;
                }
            }

            riskProfileData.RiskProfileSections.Add("EarningsAndProfitabilityQtd", earningsAndProfitabilityQtd);
            riskProfileData.RiskProfileSections.Add("MarginAnalysisQtd", marginAnalysisQtd);
            riskProfileData.RiskProfileSections.Add("NonIncomeAndExpensesQtd", nonIncomeAndExpensesQtd);
            riskProfileData.RiskProfileSections.Add("InterestRateRiskQtd", interestRateRiskQtd);
            riskProfileData.RiskProfileSections.Add("GrowthRatesQtd", growthRatesQtd);
            riskProfileData.RiskProfileSections.Add("CapitalRatiosQtd", capitalRatiosQtd);

            riskProfileData.RiskProfileSections.Add("EarningsAndProfitabilityYtd", earningsAndProfitabilityYtd);
            riskProfileData.RiskProfileSections.Add("MarginAnalysisYtd", marginAnalysisYtd);
            riskProfileData.RiskProfileSections.Add("NonIncomeAndExpensesYtd", nonIncomeAndExpensesYtd);
            riskProfileData.RiskProfileSections.Add("InterestRateRiskYtd", interestRateRiskYtd);
            riskProfileData.RiskProfileSections.Add("GrowthRatesYtd", growthRatesYtd);
            riskProfileData.RiskProfileSections.Add("CapitalRatiosYtd", capitalRatiosYtd);

            return riskProfileData;
        }

        [HttpPost]
        public bool UpdateBenchmark(UpdateBenchmarkParameters updateParams)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                institutionKey.Value = updateParams.InstitutionKey;
                SqlParameter ubprConceptCode = new SqlParameter("UBPRConceptCode", SqlDbType.VarChar);
                ubprConceptCode.Value = updateParams.UBPRConceptCode;
                SqlParameter reportingPeriodType = new SqlParameter("ReportingPeriodType", SqlDbType.VarChar);
                reportingPeriodType.Value = updateParams.ReportingPeriodType;
                SqlParameter benchmarkvalue = new SqlParameter("BenchMarkvalue", SqlDbType.Decimal);
                SqlParameter loggedInUserKey = new SqlParameter("UserKey", SqlDbType.Int);
                loggedInUserKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                if (updateParams.BenchMarkvalue == null)
                    benchmarkvalue.Value = DBNull.Value;
                else
                    benchmarkvalue.Value = updateParams.BenchMarkvalue;
                SqlParameter tenantKey = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKey.Value = Convert.ToInt32(UtilityFunctions.GetTenantKey(User.Identity.Name));
                object[] benchmarkUpdateParams = new object[6];
                benchmarkUpdateParams[0] = institutionKey;
                benchmarkUpdateParams[1] = tenantKey;
                benchmarkUpdateParams[2] = ubprConceptCode;
                benchmarkUpdateParams[3] = reportingPeriodType;
                benchmarkUpdateParams[4] = benchmarkvalue;
                benchmarkUpdateParams[5] = loggedInUserKey;

                var rowsupdated = ent.Database.SqlQuery<int>("dbo.uspFactUBPRBenchMarkUpdate @Institutionkey, @TenantKey, @UBPRConceptCode, @ReportingPeriodType, @BenchMarkvalue, @UserKey", benchmarkUpdateParams).First();
                if (rowsupdated > 0)
                    result = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpPost]
        public UbprChartData GetBenchmarkChartData(GetRiskProfileChartDataViewModel chartDataParameters)
        {
            UbprChartData chartData = null;
            try
            {
                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                SqlParameter ubprConceptCode = new SqlParameter("UBPRConceptCode", SqlDbType.VarChar);
                ubprConceptCode.Value = chartDataParameters.UBPRConceptCode;
                SqlParameter institutionName = new SqlParameter("InstitutionName", SqlDbType.VarChar);
                institutionName.Value = chartDataParameters.InstitutionKey;
                SqlParameter custPeerGroupName = new SqlParameter("CustPeerGroupName", SqlDbType.VarChar);
                custPeerGroupName.Value = chartDataParameters.CustPeerGroupName;
                SqlParameter stdPeerGroupName = new SqlParameter("StdPeerGroupName", SqlDbType.VarChar);
                if (!string.IsNullOrEmpty(chartDataParameters.StdPeerGroupName))
                    stdPeerGroupName.Value = chartDataParameters.StdPeerGroupName;
                else
                    stdPeerGroupName.Value = DBNull.Value;
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
                var result = ent.Database.SqlQuery<RiskProfileChartDataViewModel>("dbo.uspRptBarGraphData @UBPRConceptCode, @InstitutionName, @CustPeerGroupName, @StdPeerGroupName, @Login, @RptName", chartParams).ToList();
                chartData = this.MapChartDataToChartSpecificObject(result, chartDataParameters);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return chartData;
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

            int usersInstitution = UtilityFunctions.GetInstitutionKey(User.Identity.Name);
            bool doesUserBelongToInstitution = false;
            if (usersInstitution == chartDataParameters.InstitutionKey)
                doesUserBelongToInstitution = true;

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
            DataValue benchmarkDataValue = null;
            DataSetDataItem institutionDataSet = new DataSetDataItem();
            DataSetDataItem custPeerDataSet = new DataSetDataItem();
            DataSetDataItem standardDataSet = new DataSetDataItem();
            DataSetDataItem benchmarkDataSet = new DataSetDataItem();
            institutionDataSet.SeriesName = ent.DimInstitutions.First(obj => obj.InstitutionKey == chartDataParameters.InstitutionKey).InstitutionName;
            institutionDataSet.ShowValues = "1";
            institutionDataSet.Visible = "1";
            custPeerDataSet.SeriesName = chartDataParameters.CustPeerGroupName;
            custPeerDataSet.RenderAs = "line";
            custPeerDataSet.Visible = "1";
            StdPeerGroupInfo stdPeerGroup = UtilityFunctions.GetStdPeerGroupForInstitution(chartDataParameters.InstitutionKey);
            if (stdPeerGroup != null)
                standardDataSet.SeriesName = "UBPR Group " + stdPeerGroup.StdPeerGroupCode;
            else
                standardDataSet.SeriesName = "N/A";

            standardDataSet.RenderAs = "line";
            standardDataSet.Visible = "1";
            benchmarkDataSet.SeriesName = "Benchmark";
            benchmarkDataSet.RenderAs = "line";
            benchmarkDataSet.Visible = "1";

            institutionDataSet.Data = new List<DataValue>();
            custPeerDataSet.Data = new List<DataValue>();
            standardDataSet.Data = new List<DataValue>();
            benchmarkDataSet.Data = new List<DataValue>();
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
                benchmarkDataValue = new DataValue();
                if (chartData.FactUBPRConceptValue != null)
                    institutionDataValue.Value = chartData.FactUBPRConceptValue.ToString();

                if (chartData.CustPGUBPRConceptValue != null)
                    custPeerDataValue.Value = chartData.CustPGUBPRConceptValue.ToString();

                if (chartData.StdPGUBPRDataValue != null)
                    standardDataValue.Value = chartData.StdPGUBPRDataValue.ToString();

                if (chartData.Benchmark != null && doesUserBelongToInstitution)
                    benchmarkDataValue.Value = chartData.Benchmark.ToString();

                institutionDataSet.Data.Add(institutionDataValue);
                custPeerDataSet.Data.Add(custPeerDataValue);
                standardDataSet.Data.Add(standardDataValue);
                benchmarkDataSet.Data.Add(benchmarkDataValue);
            }

            cate.Category = cg;

            yearlyChartData.Categories = cate;
            yearlyChartData.DataSetList.Add(institutionDataSet);
            yearlyChartData.DataSetList.Add(custPeerDataSet);
            yearlyChartData.DataSetList.Add(standardDataSet);
            yearlyChartData.DataSetList.Add(benchmarkDataSet);
            ubprChartData.YearlyChartData = yearlyChartData;

            List<RiskProfileChartDataViewModel> quarterlyData = result.Where(obje => obje.PeriodType == "QTR").ToList();
            institutionDataSet = new DataSetDataItem();
            custPeerDataSet = new DataSetDataItem();
            standardDataSet = new DataSetDataItem();
            benchmarkDataSet = new DataSetDataItem();
            institutionDataSet.Data = new List<DataValue>();
            custPeerDataSet.Data = new List<DataValue>();
            standardDataSet.Data = new List<DataValue>();
            benchmarkDataSet.Data = new List<DataValue>();
            institutionDataSet.SeriesName = ent.DimInstitutions.First(obj => obj.InstitutionKey == chartDataParameters.InstitutionKey).InstitutionName;
            institutionDataSet.ShowValues = "1";
            institutionDataSet.Visible = "1";
            custPeerDataSet.SeriesName = chartDataParameters.CustPeerGroupName;
            custPeerDataSet.RenderAs = "line";
            custPeerDataSet.Visible = "1";
            if (stdPeerGroup != null)
                standardDataSet.SeriesName = "UBPR Group " + stdPeerGroup.StdPeerGroupCode;
            else
                standardDataSet.SeriesName = "N/A";
            standardDataSet.RenderAs = "line";
            standardDataSet.Visible = "1";
            benchmarkDataSet.SeriesName = "Benchmark";
            benchmarkDataSet.RenderAs = "line";
            benchmarkDataSet.Visible = "1";

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
                benchmarkDataValue = new DataValue();

                if (chartData.FactUBPRConceptValue != null)
                    institutionDataValue.Value = chartData.FactUBPRConceptValue.ToString();

                if (chartData.CustPGUBPRConceptValue != null)
                    custPeerDataValue.Value = chartData.CustPGUBPRConceptValue.ToString();

                if (chartData.StdPGUBPRDataValue != null)
                    standardDataValue.Value = chartData.StdPGUBPRDataValue.ToString();

                if (chartData.Benchmark != null && doesUserBelongToInstitution)
                    benchmarkDataValue.Value = chartData.Benchmark.ToString();

                institutionDataSet.Data.Add(institutionDataValue);
                custPeerDataSet.Data.Add(custPeerDataValue);
                standardDataSet.Data.Add(standardDataValue);
                benchmarkDataSet.Data.Add(benchmarkDataValue);
            }

            cate.Category = cg;

            quarterlyChartData.Categories = cate;
            quarterlyChartData.DataSetList.Add(institutionDataSet);
            quarterlyChartData.DataSetList.Add(custPeerDataSet);
            quarterlyChartData.DataSetList.Add(standardDataSet);
            quarterlyChartData.DataSetList.Add(benchmarkDataSet);
            ubprChartData.QuarterlyChartData = quarterlyChartData;

            return ubprChartData;
        }

        private RiskProfileDataSection MapDataSection(RiskProfileData rpd, bool isQtd)
        {
            RiskProfileDataSection rpdSection = new RiskProfileDataSection();

            if (rpd.UBPRConceptDesc != null)
                rpdSection.UBPRConceptDesc = rpd.UBPRConceptDesc;

            rpdSection.Bank = rpd.Bank;
            rpdSection.Peer1 = rpd.Peer1;
            rpdSection.Peer2 = rpd.Peer2;
            if (isQtd)
                rpdSection.Benchmark = rpd.QTDBenchMarkValue;
            else
                rpdSection.Benchmark = rpd.YTDBenchMarkValue;

            if (rpd.UBPRConceptCode != null)
                rpdSection.UBPRConceptCode = rpd.UBPRConceptCode;

            if (rpd.RankTableSortOrder != null)
                rpdSection.SortOrder = rpd.RankTableSortOrder;

            return rpdSection;
        }

        private RiskProfileDataSectionOne MapDataSectionOne(RiskProfileDataOne rpd, bool isQtd)
        {
            RiskProfileDataSectionOne rpdSection = new RiskProfileDataSectionOne();

            if (rpd.UBPRConceptDesc != null)
                rpdSection.UBPRConceptDesc = rpd.UBPRConceptDesc;

            rpdSection.Bank = rpd.Bank;
            rpdSection.Peer1 = rpd.Peer1;
            rpdSection.Peer2 = rpd.Peer2;
            if (isQtd)
                rpdSection.Benchmark = rpd.QTDBenchMarkValue;
            else
                rpdSection.Benchmark = rpd.YTDBenchMarkValue;

            if (rpd.UBPRConceptCode != null)
                rpdSection.UBPRConceptCode = rpd.UBPRConceptCode;

            if (rpd.RankTableSortOrder != null)
                rpdSection.SortOrder = rpd.RankTableSortOrder;

            return rpdSection;
        }

        [HttpPost]
        public Decimal? GetThresHoldForInstitute(BenchmarkThresholdParameters benchmarkThresParams)
        {
            Decimal? thresholdValue = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
               // Fix for #19897
               // FactUBPRBenchmarkThreshold instValue = ent.FactUBPRBenchmarkThresholds.FirstOrDefault(obj => obj.InstitutionKey == benchmarkThresParams.InstitutionKey);
                
                var userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                FactUBPRBenchmarkThreshold instValue = ent.FactUBPRBenchmarkThresholds.FirstOrDefault(obj => obj.InstitutionKey == benchmarkThresParams.InstitutionKey && obj.UserKey == userKey);
                int usersInstitution = UtilityFunctions.GetInstitutionKey(User.Identity.Name);
                bool doesUserBelongToInstitution = false;
                if (usersInstitution == benchmarkThresParams.InstitutionKey)
                    doesUserBelongToInstitution = true;

                if (doesUserBelongToInstitution)
                {
                    if (instValue != null)
                    {
                        thresholdValue = instValue.ThresholdValue;
                    }
                }
                else
                    thresholdValue = decimal.MinValue;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return thresholdValue;
        }

        [HttpPost]
        public bool UpdateThresHoldForInstitute(BenchmarkThresholdParameters benchmarkThresParams)
        {
            bool operationResult = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                institutionKey.Value = benchmarkThresParams.InstitutionKey;
                SqlParameter thresholdValue = new SqlParameter("ThresholdValue", SqlDbType.Decimal);
                SqlParameter loggedInUserKey = new SqlParameter("UserKey", SqlDbType.Int);
                loggedInUserKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                if (benchmarkThresParams.ThresholdValue == null)
                    thresholdValue.Value = DBNull.Value;
                else
                    thresholdValue.Value = benchmarkThresParams.ThresholdValue;
                SqlParameter tenantKey = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKey.Value = Convert.ToInt32(UtilityFunctions.GetTenantKey(User.Identity.Name));

                int result = ent.Database.SqlQuery<int>("exec dbo.uspFactUBPRBenchMarkThresholdUpdate @InstitutionKey, @TenantKey, @ThresholdValue, @UserKey", institutionKey, tenantKey, thresholdValue, loggedInUserKey).First();
                if (result == 1)
                    operationResult = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return operationResult;
        }

        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage GetBenchmarkingExporttoExcel([FromBody]GetRiskProfileDataViewModel profileParams)
        {
            HttpResponseMessage result = new HttpResponseMessage();
            try
            {
                RiskProfileDataViewModel benchMarkCreditRiskData = this.GetBenchmarkCreditRiskData(profileParams);
                RiskProfileDataViewModel benchMarkInterestRateRiskData = this.GetBenchmarkInterestRiskData(profileParams);
                RiskProfileDataViewModel benchMarkLiquidityPriceRiskData = this.GetBenchmarkLiquidityRiskData(profileParams);
                RiskProfileDataViewModelOne benchMarkStrategicRiskData = this.GetBenchmarkStrategicRiskData(profileParams);

                DataTable dtInformation = new DataTable();
                DataTable dtCreditRiskQtd = new DataTable();
                DataTable dtInterestRiskDataQtd = new DataTable();
                DataTable dtLiquidityRiskDataQtd = new DataTable();
                DataTable dtStrategicRiskDataQtd = new DataTable();

                DataTable dtCreditRiskYtd = new DataTable();
                DataTable dtInterestRiskDataYtd = new DataTable();
                DataTable dtLiquidityRiskDataYtd = new DataTable();
                DataTable dtStrategicRiskDataYtd = new DataTable();

                dtInformation.TableName = "Information";
                dtCreditRiskQtd.TableName = "Credit Risk QTD";
                dtInterestRiskDataQtd.TableName = "Interest Rate Risk QTD";
                dtLiquidityRiskDataQtd.TableName = "Liquidity & Pric Risk QTD";
                dtStrategicRiskDataQtd.TableName = "Strategic Risk QTD";

                dtCreditRiskYtd.TableName = "Credit Risk YTD";
                dtInterestRiskDataYtd.TableName = "Interest Rate Risk YTD";
                dtLiquidityRiskDataYtd.TableName = "Liquidity & Pric Risk YTD";
                dtStrategicRiskDataYtd.TableName = "Strategic Risk YTD";

                dtInformation.Columns.Add("Bank");
                dtInformation.Columns.Add("Peer1");
                dtInformation.Columns.Add("Peer2");
                dtInformation.Columns.Add("Period");

                dtCreditRiskQtd.Columns.Add(benchMarkCreditRiskData.RiskProfileSections.ElementAt(0).Key);
                dtCreditRiskQtd.Columns.Add("Bank");
                dtCreditRiskQtd.Columns.Add("Peer1");
                dtCreditRiskQtd.Columns.Add("Peer2");
                dtCreditRiskQtd.Columns.Add("BenchMark");
                dtCreditRiskQtd.Columns.Add(" ");

                dtInterestRiskDataQtd.Columns.Add(benchMarkInterestRateRiskData.RiskProfileSections.ElementAt(0).Key);
                dtInterestRiskDataQtd.Columns.Add("Bank");
                dtInterestRiskDataQtd.Columns.Add("Peer1");
                dtInterestRiskDataQtd.Columns.Add("Peer2");
                dtInterestRiskDataQtd.Columns.Add("BenchMark");
                dtInterestRiskDataQtd.Columns.Add(" ");

                dtLiquidityRiskDataQtd.Columns.Add(benchMarkLiquidityPriceRiskData.RiskProfileSections.ElementAt(0).Key);
                dtLiquidityRiskDataQtd.Columns.Add("Bank");
                dtLiquidityRiskDataQtd.Columns.Add("Peer1");
                dtLiquidityRiskDataQtd.Columns.Add("Peer2");
                dtLiquidityRiskDataQtd.Columns.Add("BenchMark");
                dtLiquidityRiskDataQtd.Columns.Add(" ");

                dtStrategicRiskDataQtd.Columns.Add(benchMarkStrategicRiskData.RiskProfileSections.ElementAt(0).Key);
                dtStrategicRiskDataQtd.Columns.Add("Bank");
                dtStrategicRiskDataQtd.Columns.Add("Peer1");
                dtStrategicRiskDataQtd.Columns.Add("Peer2");
                dtStrategicRiskDataQtd.Columns.Add("BenchMark");
                dtStrategicRiskDataQtd.Columns.Add(" ");

                dtCreditRiskYtd.Columns.Add(benchMarkCreditRiskData.RiskProfileSections.ElementAt(0).Key);
                dtCreditRiskYtd.Columns.Add("Bank");
                dtCreditRiskYtd.Columns.Add("Peer1");
                dtCreditRiskYtd.Columns.Add("Peer2");
                dtCreditRiskYtd.Columns.Add("BenchMark");
                dtCreditRiskYtd.Columns.Add(" ");

                dtInterestRiskDataYtd.Columns.Add(benchMarkInterestRateRiskData.RiskProfileSections.ElementAt(0).Key);
                dtInterestRiskDataYtd.Columns.Add("Bank");
                dtInterestRiskDataYtd.Columns.Add("Peer1");
                dtInterestRiskDataYtd.Columns.Add("Peer2");
                dtInterestRiskDataYtd.Columns.Add("BenchMark");
                dtInterestRiskDataYtd.Columns.Add(" ");

                dtLiquidityRiskDataYtd.Columns.Add(benchMarkLiquidityPriceRiskData.RiskProfileSections.ElementAt(0).Key);
                dtLiquidityRiskDataYtd.Columns.Add("Bank");
                dtLiquidityRiskDataYtd.Columns.Add("Peer1");
                dtLiquidityRiskDataYtd.Columns.Add("Peer2");
                dtLiquidityRiskDataYtd.Columns.Add("BenchMark");
                dtLiquidityRiskDataYtd.Columns.Add(" ");

                dtStrategicRiskDataYtd.Columns.Add(benchMarkStrategicRiskData.RiskProfileSections.ElementAt(0).Key);
                dtStrategicRiskDataYtd.Columns.Add("Bank");
                dtStrategicRiskDataYtd.Columns.Add("Peer1");
                dtStrategicRiskDataYtd.Columns.Add("Peer2");
                dtStrategicRiskDataYtd.Columns.Add("BenchMark");
                dtStrategicRiskDataYtd.Columns.Add(" ");

                DataRow informationrow1 = dtInformation.NewRow();
                informationrow1["Bank"] = profileParams.Bank;
                informationrow1["Peer1"] = profileParams.Peer1;
                informationrow1["Peer2"] = profileParams.Peer2;
                informationrow1["Period"] = CommonFunctions.GetQuarterLabel(CommonFunctions.GetLastQuarterString());
                dtInformation.Rows.Add(informationrow1);             
                PeerGroupsApiController peerGroupObj = new PeerGroupsApiController();
                GetPeerGroupDetailsParam objpeerParams = new GetPeerGroupDetailsParam();
                objpeerParams.CustPeerGroupKey = profileParams.CustPeerGroupKey;
                var peerGroupsData = peerGroupObj.GetPeerGroupMembers(objpeerParams);
                foreach (var rec in peerGroupsData)
                {
                    DataRow informationrow = dtInformation.NewRow();
                    if (rec.InstitutionName != profileParams.Peer1)
                    {
                        informationrow["Peer1"] = rec.InstitutionName;
                        dtInformation.Rows.Add(informationrow);
                    }
                }
                foreach (var sec in benchMarkCreditRiskData.RiskProfileSections)
                {
                    if (sec.Key.Contains("Ytd"))
                    {
                        if (sec.Key != "SummaryRatiosYtd")
                        {

                            DataRow row1 = dtCreditRiskYtd.NewRow();
                            row1[benchMarkCreditRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                            row1["Bank"] = "Bank";
                            row1["Peer1"] = "Peer1";
                            row1["Peer2"] = "Peer2";
                            row1["BenchMark"] = "BenchMark";
                            row1[" "] = " ";
                            dtCreditRiskYtd.Rows.Add(row1);
                        }

                        foreach (var rec in sec.Value)
                        {
                            DataRow row = dtCreditRiskYtd.NewRow();
                            row[benchMarkCreditRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                            row["Bank"] = rec.Bank;
                            row["Peer1"] = rec.Peer1;
                            row["Peer2"] = rec.Peer2;
                            if (rec.Benchmark >= 0)
                            {
                                row["BenchMark"] = rec.Benchmark;
                            }
                            if (!string.IsNullOrEmpty(profileParams.ThresholdValue) && profileParams.ThresholdValue.Contains("-"))
                            {
                                row[" "] = GetTrafficLight(rec, null);
                            }
                            else
                            {
                                row[" "] = GetTrafficLight(rec, profileParams.ThresholdValue);
                            }
                            dtCreditRiskYtd.Rows.Add(row);
                        }
                        DataRow emptyrow = dtCreditRiskYtd.NewRow();
                        emptyrow[benchMarkCreditRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                        emptyrow["Bank"] = string.Empty;
                        emptyrow["Peer1"] = string.Empty;
                        emptyrow["Peer2"] = string.Empty;
                        emptyrow["BenchMark"] = string.Empty;
                        emptyrow[" "] = string.Empty;
                        dtCreditRiskYtd.Rows.Add(emptyrow);
                    }
                }

                foreach (var sec in benchMarkInterestRateRiskData.RiskProfileSections)
                {
                    if (sec.Key.Contains("Ytd"))
                    {
                        if (sec.Key != "YieldAndCostYtd")
                        {
                            DataRow row1 = dtInterestRiskDataYtd.NewRow();
                            row1[benchMarkInterestRateRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                            row1["Bank"] = "Bank";
                            row1["Peer1"] = "Peer1";
                            row1["Peer2"] = "Peer2";
                            row1["BenchMark"] = "BenchMark";
                            row1[" "] = " ";
                            dtInterestRiskDataYtd.Rows.Add(row1);
                        }
                        foreach (var rec in sec.Value)
                        {
                            DataRow row = dtInterestRiskDataYtd.NewRow();
                            row[benchMarkInterestRateRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                            row["Bank"] = rec.Bank;
                            row["Peer1"] = rec.Peer1;
                            row["Peer2"] = rec.Peer2;
                            if (rec.Benchmark >= 0)
                            {
                                row["BenchMark"] = rec.Benchmark;
                            }
                            if (!string.IsNullOrEmpty(profileParams.ThresholdValue) && profileParams.ThresholdValue.Contains("-"))
                            {
                                row[" "] = GetBindTrafficLightInterestRateRiskData(rec, null);
                            }
                            else
                            {
                                row[" "] = GetBindTrafficLightInterestRateRiskData(rec, profileParams.ThresholdValue);
                            }
                            dtInterestRiskDataYtd.Rows.Add(row);
                        }
                        DataRow emptyrow = dtInterestRiskDataYtd.NewRow();
                        emptyrow[benchMarkInterestRateRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                        emptyrow["Bank"] = string.Empty;
                        emptyrow["Peer1"] = string.Empty;
                        emptyrow["Peer2"] = string.Empty;
                        emptyrow["BenchMark"] = string.Empty;
                        emptyrow[" "] = string.Empty;
                        dtInterestRiskDataYtd.Rows.Add(emptyrow);
                    }
                }

                foreach (var sec in benchMarkLiquidityPriceRiskData.RiskProfileSections)
                {
                    if (sec.Key.Contains("Ytd"))
                    {
                        if (sec.Key != "LiquidityAndFundingYtd")
                        {
                            DataRow row1 = dtLiquidityRiskDataYtd.NewRow();
                            row1[benchMarkLiquidityPriceRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                            row1["Bank"] = "Bank";
                            row1["Peer1"] = "Peer1";
                            row1["Peer2"] = "Peer2";
                            row1["BenchMark"] = "BenchMark";
                            row1[" "] = " ";
                            dtLiquidityRiskDataYtd.Rows.Add(row1);
                        }

                        foreach (var rec in sec.Value)
                        {
                            DataRow row = dtLiquidityRiskDataYtd.NewRow();
                            row[benchMarkLiquidityPriceRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                            row["Bank"] = rec.Bank;
                            row["Peer1"] = rec.Peer1;
                            row["Peer2"] = rec.Peer2;
                            if (rec.Benchmark >= 0)
                            {
                                row["BenchMark"] = rec.Benchmark;
                            }
                            if (!string.IsNullOrEmpty(profileParams.ThresholdValue) && profileParams.ThresholdValue.Contains("-"))
                            {
                                row[" "] = GetBindTrafficLightLiquidityPriceRisk(rec, null);
                            }
                            else
                            {
                                row[" "] = GetBindTrafficLightLiquidityPriceRisk(rec, profileParams.ThresholdValue);
                            }
                            dtLiquidityRiskDataYtd.Rows.Add(row);
                        }
                        DataRow emptyrow = dtLiquidityRiskDataYtd.NewRow();
                        emptyrow[benchMarkLiquidityPriceRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                        emptyrow["Bank"] = string.Empty;
                        emptyrow["Peer1"] = string.Empty;
                        emptyrow["Peer2"] = string.Empty;
                        emptyrow["BenchMark"] = string.Empty;
                        emptyrow[" "] = string.Empty;
                        dtLiquidityRiskDataYtd.Rows.Add(emptyrow);
                    }
                }

                foreach (var sec in benchMarkCreditRiskData.RiskProfileSections)
                {
                    if (sec.Key.Contains("Qtd"))
                    {
                        if (sec.Key != "SummaryRatiosQtd")
                        {

                            DataRow row1 = dtCreditRiskQtd.NewRow();
                            row1[benchMarkCreditRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                            row1["Bank"] = "Bank";
                            row1["Peer1"] = "Peer1";
                            row1["Peer2"] = "Peer2";
                            row1["BenchMark"] = "BenchMark";
                            row1[" "] = " ";
                            dtCreditRiskQtd.Rows.Add(row1);
                        }
                        foreach (var rec in sec.Value)
                        {
                            DataRow row = dtCreditRiskQtd.NewRow();
                            row[benchMarkCreditRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                            row["Bank"] = rec.Bank;
                            row["Peer1"] = rec.Peer1;
                            row["Peer2"] = rec.Peer2;
                            if (rec.Benchmark >= 0)
                            {
                                row["BenchMark"] = rec.Benchmark;
                            }
                            if (!string.IsNullOrEmpty(profileParams.ThresholdValue) && profileParams.ThresholdValue.Contains("-"))
                            {
                                row[" "] = GetTrafficLight(rec, null);
                            }
                            else
                            {
                                row[" "] = GetTrafficLight(rec, profileParams.ThresholdValue);
                            }
                            dtCreditRiskQtd.Rows.Add(row);
                        }
                        DataRow emptyrow = dtCreditRiskQtd.NewRow();
                        emptyrow[benchMarkCreditRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                        emptyrow["Bank"] = string.Empty;
                        emptyrow["Peer1"] = string.Empty;
                        emptyrow["Peer2"] = string.Empty;
                        emptyrow["BenchMark"] = string.Empty;
                        emptyrow[" "] = string.Empty;
                        dtCreditRiskQtd.Rows.Add(emptyrow);
                    }
                }

                foreach (var sec in benchMarkInterestRateRiskData.RiskProfileSections)
                {
                    if (sec.Key.Contains("Qtd"))
                    {
                        if (sec.Key != "YieldAndCostQtd")
                        {
                            DataRow row1 = dtInterestRiskDataQtd.NewRow();
                            row1[benchMarkInterestRateRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                            row1["Bank"] = "Bank";
                            row1["Peer1"] = "Peer1";
                            row1["Peer2"] = "Peer2";
                            row1["BenchMark"] = "BenchMark";
                            row1[" "] = " ";
                            dtInterestRiskDataQtd.Rows.Add(row1);
                        }
                        foreach (var rec in sec.Value)
                        {
                            DataRow row = dtInterestRiskDataQtd.NewRow();
                            row[benchMarkInterestRateRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                            row["Bank"] = rec.Bank;
                            row["Peer1"] = rec.Peer1;
                            row["Peer2"] = rec.Peer2;
                            if (rec.Benchmark >= 0)
                            {
                                row["BenchMark"] = rec.Benchmark;
                            }
                            if (!string.IsNullOrEmpty(profileParams.ThresholdValue) && profileParams.ThresholdValue.Contains("-"))
                            {
                                row[" "] = GetBindTrafficLightInterestRateRiskData(rec, null);
                            }
                            else
                            {
                                row[" "] = GetBindTrafficLightInterestRateRiskData(rec, profileParams.ThresholdValue);
                            }
                            dtInterestRiskDataQtd.Rows.Add(row);
                        }
                        DataRow emptyrow = dtInterestRiskDataQtd.NewRow();
                        emptyrow[benchMarkInterestRateRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                        emptyrow["Bank"] = string.Empty;
                        emptyrow["Peer1"] = string.Empty;
                        emptyrow["Peer2"] = string.Empty;
                        emptyrow["BenchMark"] = string.Empty;
                        emptyrow[" "] = string.Empty;
                        dtInterestRiskDataQtd.Rows.Add(emptyrow);
                    }
                }

                foreach (var sec in benchMarkLiquidityPriceRiskData.RiskProfileSections)
                {
                    if (sec.Key.Contains("Qtd"))
                    {
                        if (sec.Key != "LiquidityAndFundingQtd")
                        {
                            DataRow row1 = dtLiquidityRiskDataQtd.NewRow();
                            row1[benchMarkLiquidityPriceRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                            row1["Bank"] = "Bank";
                            row1["Peer1"] = "Peer1";
                            row1["Peer2"] = "Peer2";
                            row1["BenchMark"] = "BenchMark";
                            row1[" "] = " ";
                            dtLiquidityRiskDataQtd.Rows.Add(row1);
                        }
                        foreach (var rec in sec.Value)
                        {
                            DataRow row = dtLiquidityRiskDataQtd.NewRow();
                            row[benchMarkLiquidityPriceRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                            row["Bank"] = rec.Bank;
                            row["Peer1"] = rec.Peer1;
                            row["Peer2"] = rec.Peer2;
                            if (rec.Benchmark >= 0)
                            {
                                row["BenchMark"] = rec.Benchmark;
                            }
                            if (!string.IsNullOrEmpty(profileParams.ThresholdValue) && profileParams.ThresholdValue.Contains("-"))
                            {
                                row[" "] = GetBindTrafficLightLiquidityPriceRisk(rec, null);
                            }
                            else
                            {
                                row[" "] = GetBindTrafficLightLiquidityPriceRisk(rec, profileParams.ThresholdValue);
                            }
                            dtLiquidityRiskDataQtd.Rows.Add(row);
                        }
                        DataRow emptyrow = dtLiquidityRiskDataQtd.NewRow();
                        emptyrow[benchMarkLiquidityPriceRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                        emptyrow["Bank"] = string.Empty;
                        emptyrow["Peer1"] = string.Empty;
                        emptyrow["Peer2"] = string.Empty;
                        emptyrow["BenchMark"] = string.Empty;
                        emptyrow[" "] = string.Empty;
                        dtLiquidityRiskDataQtd.Rows.Add(emptyrow);
                    }
                }

                foreach (var sec in benchMarkStrategicRiskData.RiskProfileSections)
                {
                    if (sec.Key.Contains("Qtd"))
                    {
                        if (sec.Key != "EarningsAndProfitabilityQtd")
                        {
                            DataRow row1 = dtStrategicRiskDataQtd.NewRow();
                            row1[benchMarkStrategicRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                            row1["Bank"] = "Bank";
                            row1["Peer1"] = "Peer1";
                            row1["Peer2"] = "Peer2";
                            row1["BenchMark"] = "BenchMark";
                            row1[" "] = " ";
                            dtStrategicRiskDataQtd.Rows.Add(row1);
                        }
                        foreach (var rec in sec.Value)
                        {
                            DataRow row = dtStrategicRiskDataQtd.NewRow();
                            row[benchMarkStrategicRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                            row["Bank"] = rec.Bank;
                            row["Peer1"] = rec.Peer1;
                            row["Peer2"] = rec.Peer2;
                            if (rec.Benchmark >= 0)
                            {
                                row["BenchMark"] = rec.Benchmark;
                            }
                            if (!string.IsNullOrEmpty(profileParams.ThresholdValue) && profileParams.ThresholdValue.Contains("-"))
                            {
                                row[" "] = GetBindTrafficLightStrategicRisk(rec, null);
                            }
                            else
                            {
                                row[" "] = GetBindTrafficLightStrategicRisk(rec, profileParams.ThresholdValue);
                            }
                            dtStrategicRiskDataQtd.Rows.Add(row);
                        }
                        DataRow emptyrow = dtStrategicRiskDataQtd.NewRow();
                        emptyrow[benchMarkStrategicRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                        emptyrow["Bank"] = string.Empty;
                        emptyrow["Peer1"] = string.Empty;
                        emptyrow["Peer2"] = string.Empty;
                        emptyrow["BenchMark"] = string.Empty;
                        emptyrow[" "] = string.Empty;
                        dtStrategicRiskDataQtd.Rows.Add(emptyrow);
                    }
                }

                foreach (var sec in benchMarkStrategicRiskData.RiskProfileSections)
                {
                    if (sec.Key.Contains("Ytd"))
                    {
                        if (sec.Key != "EarningsAndProfitabilityYtd")
                        {
                            DataRow row1 = dtStrategicRiskDataYtd.NewRow();
                            row1[benchMarkStrategicRiskData.RiskProfileSections.ElementAt(0).Key] = sec.Key;
                            row1["Bank"] = "Bank";
                            row1["Peer1"] = "Peer1";
                            row1["Peer2"] = "Peer2";
                            row1["BenchMark"] = "BenchMark";
                            row1[" "] = " ";
                            dtStrategicRiskDataYtd.Rows.Add(row1);
                        }

                        foreach (var rec in sec.Value)
                        {
                            DataRow row = dtStrategicRiskDataYtd.NewRow();
                            row[benchMarkStrategicRiskData.RiskProfileSections.ElementAt(0).Key] = rec.UBPRConceptDesc;
                            row["Bank"] = rec.Bank;
                            row["Peer1"] = rec.Peer1;
                            row["Peer2"] = rec.Peer2;
                            if (rec.Benchmark >= 0)
                            {
                                row["BenchMark"] = rec.Benchmark;
                            }
                            if (!string.IsNullOrEmpty(profileParams.ThresholdValue) && profileParams.ThresholdValue.Contains("-"))
                            {
                                row[" "] = GetBindTrafficLightStrategicRisk(rec, null);
                            }
                            else
                            {
                                row[" "] = GetBindTrafficLightStrategicRisk(rec, profileParams.ThresholdValue);
                            }
                            dtStrategicRiskDataYtd.Rows.Add(row);
                        }
                        DataRow emptyrow = dtStrategicRiskDataYtd.NewRow();
                        emptyrow[benchMarkStrategicRiskData.RiskProfileSections.ElementAt(0).Key] = string.Empty;
                        emptyrow["Bank"] = string.Empty;
                        emptyrow["Peer1"] = string.Empty;
                        emptyrow["Peer2"] = string.Empty;
                        emptyrow["BenchMark"] = string.Empty;
                        emptyrow[" "] = string.Empty;
                        dtStrategicRiskDataYtd.Rows.Add(emptyrow);
                    }
                }

                List<GetRiskProfileDataViewModel> BenchMarkParams = new List<GetRiskProfileDataViewModel>();
                GetRiskProfileDataViewModel objkeyparams = new GetRiskProfileDataViewModel();
                objkeyparams.Bank = profileParams.Bank;
                objkeyparams.ThresholdValue = profileParams.ThresholdValue;
                objkeyparams.Peer1 = profileParams.Peer1;
                objkeyparams.Peer2 = profileParams.Peer2;
                BenchMarkParams.Add(objkeyparams);

                //DataTable Information = CreateB2bExportToExcel.ListToDataTable(BenchMarkParams, "Information", string.Empty);
                DataTable[] metricArr = new DataTable[9];
                metricArr[0] = dtInformation;
                metricArr[1] = dtCreditRiskQtd;
                metricArr[2] = dtInterestRiskDataQtd;
                metricArr[3] = dtLiquidityRiskDataQtd;
                metricArr[4] = dtStrategicRiskDataQtd;

                metricArr[5] = dtCreditRiskYtd;
                metricArr[6] = dtInterestRiskDataYtd;
                metricArr[7] = dtLiquidityRiskDataYtd;
                metricArr[8] = dtStrategicRiskDataYtd;

                if (!string.IsNullOrEmpty(profileParams.ThresholdValue) && profileParams.ThresholdValue.Contains("-"))
                    profileParams.ThresholdValue = "NA";
                else
                    profileParams.ThresholdValue = profileParams.ThresholdValue + "  %";
                
                BankProfileOverviewParams bankdata = new BankProfileOverviewParams();
                bankdata.InstitutionKey = profileParams.InstitutionKey;
                bankdata.Period= CommonFunctions.GetLastQuarterString();
                var Bankfinalres = this.GetBankProfileIntroductionData(bankdata);
                byte[] exceldata = CreateBenchMarkExportToExcel.CreateExcelDocument(metricArr, "BenchMarking.xlsx", profileParams.ThresholdValue, Bankfinalres);
                result.Content = new ByteArrayContent(exceldata);
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ms-excel");
                result.Content.Headers.ContentLength = exceldata.Length;
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = "BenchMarking" + profileParams.InstitutionKey.ToString() + ".xlsx";
                result.Content.Headers.ContentDisposition.Size = exceldata.Length;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return result;
        }
        public static string GetTrafficLight(RiskProfileDataSection obj, string thresholdValue)
        {
            var className = "";
            try
            {
                if (Convert.ToInt32(thresholdValue) > 0)
                {
                    if (obj.UBPRConceptCode == "CALC0001" ||
                    obj.UBPRConceptCode == "UBPRE026" ||
                    obj.UBPRConceptCode == "UBPRE267" ||
                    obj.UBPRConceptCode == "UBPRE272" ||
                    obj.UBPRConceptCode == "UBPRE277" ||
                    obj.UBPRConceptCode == "UBPRE019" ||
                    obj.UBPRConceptCode == "UBPRE390" ||
                    obj.UBPRConceptCode == "UBPRD490" ||
                    obj.UBPRConceptCode == "UBPRE884" ||
                    obj.UBPRConceptCode == "UBPRD647" ||
                    obj.UBPRConceptCode == "UBPRD649" ||
                    obj.UBPRConceptCode == "UBPRD646" ||
                    obj.UBPRConceptCode == "UBPRD648" ||
                    obj.UBPRConceptCode == "UBPRD650" ||
                    obj.UBPRConceptCode == "UBPRE544" ||
                    obj.UBPRConceptCode == "UBPRE541" ||
                    obj.UBPRConceptCode == "UBPRE542" ||
                    obj.UBPRConceptCode == "UBPR7414")
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) <= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) > 0)
                        {
                            var perct = (Math.Abs(Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark)) / Convert.ToDecimal(obj.Benchmark)) * 100;

                            if (perct < Convert.ToDecimal(thresholdValue))
                            {
                                className = "YellowColor";
                            }
                            else
                            {
                                className = "RedColor";
                            }
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                    else
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) >= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) < 0)
                        {
                            var perct = (Math.Abs(Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark)) / Convert.ToDecimal(obj.Benchmark)) * 100;

                            if (perct < Convert.ToDecimal(thresholdValue))
                            {
                                className = "YellowColor";
                            }
                            else
                            {
                                className = "RedColor";
                            }
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                }
                else
                {
                    if (obj.UBPRConceptCode == "CALC0001" ||
                    obj.UBPRConceptCode == "UBPRE026" ||
                    obj.UBPRConceptCode == "UBPRE267" ||
                    obj.UBPRConceptCode == "UBPRE272" ||
                    obj.UBPRConceptCode == "UBPRE277" ||
                    obj.UBPRConceptCode == "UBPRE019" ||
                    obj.UBPRConceptCode == "UBPRE390" ||
                    obj.UBPRConceptCode == "UBPRD490" ||
                    obj.UBPRConceptCode == "UBPRE884" ||
                    obj.UBPRConceptCode == "UBPRD647" ||
                    obj.UBPRConceptCode == "UBPRD649" ||
                    obj.UBPRConceptCode == "UBPRD646" ||
                    obj.UBPRConceptCode == "UBPRD648" ||
                    obj.UBPRConceptCode == "UBPRD650" ||
                    obj.UBPRConceptCode == "UBPRE544" ||
                    obj.UBPRConceptCode == "UBPRE541" ||
                    obj.UBPRConceptCode == "UBPRE542" ||
                    obj.UBPRConceptCode == "UBPR7414")
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) <= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) > 0)
                        {
                            className = "RedColor";
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                    else
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) >= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) < 0)
                        {
                            className = "RedColor";
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return className;
        }
        public static string GetBindTrafficLightInterestRateRiskData(RiskProfileDataSection obj, string thresholdValue)
        {            
            var className = "";
            try {
                if (Convert.ToInt32(thresholdValue) > 0) {
                    if (obj.UBPRConceptCode == "UBPRE106" ||
                    obj.UBPRConceptCode == "UBPRE108" ||
                    obj.UBPRConceptCode == "UBPRE109" ||
                    obj.UBPRConceptCode == "UBPRE110" ||
                    obj.UBPRConceptCode == "UBPRE112" ||
                    obj.UBPRConceptCode == "UBPRE113" ||
                    obj.UBPRConceptCode == "UBPRE114" ||
                    obj.UBPRConceptCode == "UBPRE115" ||
                    obj.UBPRConceptCode == "UBPRE349" ||
                    obj.UBPRConceptCode == "UBPRE350" ||
                    obj.UBPRConceptCode == "UBPRE352" ||
                    obj.UBPRConceptCode == "UBPRK444")
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) <= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) > 0)
                        {
                            var perct = (Math.Abs(Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark)) / Convert.ToDecimal(obj.Benchmark)) * 100;

                            if (perct < Convert.ToDecimal(thresholdValue)) {
                                className = "YellowColor";
                            }
                            else {
                                className = "RedColor";
                            }
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                    else
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) >= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) < 0)
                        {
                            var perct = (Math.Abs(Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark)) / Convert.ToDecimal(obj.Benchmark)) * 100;

                            if (perct < Convert.ToDecimal(thresholdValue)) {
                                className = "YellowColor";
                            }
                            else {
                                className = "RedColor";
                            }
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                }
                else {
                    if (obj.UBPRConceptCode == "UBPRE106" ||
                    obj.UBPRConceptCode == "UBPRE108" ||
                    obj.UBPRConceptCode == "UBPRE109" ||
                    obj.UBPRConceptCode == "UBPRE110" ||
                    obj.UBPRConceptCode == "UBPRE112" ||
                    obj.UBPRConceptCode == "UBPRE113" ||
                    obj.UBPRConceptCode == "UBPRE114" ||
                    obj.UBPRConceptCode == "UBPRE115" ||
                    obj.UBPRConceptCode == "UBPRE349" ||
                    obj.UBPRConceptCode == "UBPRE350" ||
                    obj.UBPRConceptCode == "UBPRE352" ||
                    obj.UBPRConceptCode == "UBPRK444")
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) <= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) > 0)
                        {
                            className = "RedColor";
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                    else
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) >= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) < 0)
                        {
                            className = "RedColor";
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return className;
        }
        public static string GetBindTrafficLightLiquidityPriceRisk(RiskProfileDataSection obj, string thresholdValue)
        {
            var className = "";
            try
            {
                if (Convert.ToInt32(thresholdValue) > 0)
                {
                    if (obj.UBPRConceptCode == "UBPR7410" ||
                    obj.UBPRConceptCode == "UBPRK447" ||
                    obj.UBPRConceptCode == "UBPRE600" ||
                    obj.UBPRConceptCode == "UBPRE595" ||
                    obj.UBPRConceptCode == "UBPRE624" ||
                    obj.UBPRConceptCode == "UBPRE345" ||
                    obj.UBPRConceptCode == "UBPRE353" ||
                    obj.UBPRConceptCode == "UBPRE357" ||
                    obj.UBPRConceptCode == "UBPRE879")
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) <= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) > 0)
                        {
                            var perct = (Math.Abs(Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark)) / Convert.ToDecimal(obj.Benchmark)) * 100;

                            if (perct < Convert.ToDecimal(thresholdValue))
                            {
                                className = "YellowColor";
                            }
                            else
                            {
                                className = "RedColor";
                            }
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                    else
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) >= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) < 0)
                        {
                            var perct = (Math.Abs(Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark)) / Convert.ToDecimal(obj.Benchmark)) * 100;

                            if (perct < Convert.ToDecimal(thresholdValue))
                            {
                                className = "YellowColor";
                            }
                            else
                            {
                                className = "RedColor";
                            }
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                }
                else
                {
                    if (obj.UBPRConceptCode == "UBPR7410" ||
                    obj.UBPRConceptCode == "UBPRK447" ||
                    obj.UBPRConceptCode == "UBPRE600" ||
                    obj.UBPRConceptCode == "UBPRE595" ||
                    obj.UBPRConceptCode == "UBPRE624" ||
                    obj.UBPRConceptCode == "UBPRE345" ||
                    obj.UBPRConceptCode == "UBPRE353" ||
                    obj.UBPRConceptCode == "UBPRE357" ||
                    obj.UBPRConceptCode == "UBPRE879")
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) <= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) > 0)
                        {
                            className = "RedColor";
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                    else
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) >= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) < 0)
                        {
                            className = "RedColor";
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return className;
        }
        public static string GetBindTrafficLightStrategicRisk(RiskProfileDataSectionOne obj, string thresholdValue)
        {           
            var className = "";
            try
            {
                if (Convert.ToInt32(thresholdValue) > 0)
                {
                    if (obj.UBPRConceptCode == "UBPRE002" ||
                    obj.UBPRConceptCode == "UBPRE005" ||
                    obj.UBPRConceptCode == "UBPR7400" ||
                    obj.UBPRConceptCode == "UBPRE084" ||
                    obj.UBPRConceptCode == "UBPRE085" ||
                    obj.UBPRConceptCode == "UBPRE088" ||
                    obj.UBPRConceptCode == "UBPRE089")
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) <= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) > 0)
                        {
                            var perct = (Math.Abs(Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark)) / Convert.ToDecimal(obj.Benchmark)) * 100;

                            if (perct < Convert.ToDecimal(thresholdValue))
                            {
                                className = "YellowColor";
                            }
                            else
                            {
                                className = "RedColor";
                            }
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                    else
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) >= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) < 0)
                        {
                            var perct = (Math.Abs(Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark)) / Convert.ToDecimal(obj.Benchmark)) * 100;

                            if (perct < Convert.ToDecimal(thresholdValue))
                            {
                                className = "YellowColor";
                            }
                            else
                            {
                                className = "RedColor";
                            }
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                }
                else
                {
                    if (obj.UBPRConceptCode == "UBPRE002" ||
                    obj.UBPRConceptCode == "UBPRE005" ||
                    obj.UBPRConceptCode == "UBPR7400" ||
                    obj.UBPRConceptCode == "UBPRE084" ||
                    obj.UBPRConceptCode == "UBPRE085" ||
                    obj.UBPRConceptCode == "UBPRE088" ||
                    obj.UBPRConceptCode == "UBPRE089")
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) <= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) > 0)
                        {
                            className = "RedColor";
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                    else
                    {
                        if (obj.Benchmark == null)
                        {
                            className = "GreyColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) >= 0)
                        {
                            className = "GreenColor";
                        }
                        else if (obj.Benchmark >= 0 && Convert.ToDecimal(obj.Bank) - Convert.ToDecimal(obj.Benchmark) < 0)
                        {
                            className = "RedColor";
                        }
                        else
                        {
                            className = "GreyColor";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return className;
        }
        private  BankProfileIntroductionData GetBankProfileIntroductionData(BankProfileOverviewParams profileParams)
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
