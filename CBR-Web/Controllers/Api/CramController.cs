using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CBR.Web.Models;
using CBR.DataAccess;
using System.Data.SqlClient;
using System.Data;
using CBR.Web.WebCommons;
using CBR.Common;
using CBR.Web.CustomFilter;
using CBR.Web.ExportToExcel;
using System.Net.Http.Headers;

namespace CBR.Web.Controllers.Api
{
    public class CramController : ApiController
    {
        [HttpPost]
        public bool SaveOrUpdateRiskCategories(CramRiskCategoriesParams riskCategories)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter modelKey = new SqlParameter("@ModelKey", SqlDbType.BigInt);
                modelKey.Value = riskCategories.ModelKey;

                SqlParameter creditRiskScore = new SqlParameter("@CreditRiskScore", SqlDbType.SmallInt);
                if (riskCategories.CreditRisk == null)
                    creditRiskScore.Value = DBNull.Value;
                else
                    creditRiskScore.Value = riskCategories.CreditRisk;

                SqlParameter creditRiskWeighing = new SqlParameter("@CreditRiskWeighing", SqlDbType.Decimal);
                if (riskCategories.CreditRiskWeight == null)
                    creditRiskWeighing.Value = DBNull.Value;
                else
                    creditRiskWeighing.Value = riskCategories.CreditRiskWeight;

                SqlParameter interestRateRiskScore = new SqlParameter("@InterestRateRiskScore", SqlDbType.SmallInt);
                if (riskCategories.InterestRateRisk == null)
                    interestRateRiskScore.Value = DBNull.Value;
                else
                    interestRateRiskScore.Value = riskCategories.InterestRateRisk;

                SqlParameter interestRateRiskWeighing = new SqlParameter("@InterestRateRiskWeighing", SqlDbType.Decimal);
                if (riskCategories.InterestRateRiskWeight == null)
                    interestRateRiskWeighing.Value = DBNull.Value;
                else
                    interestRateRiskWeighing.Value = riskCategories.InterestRateRiskWeight;

                SqlParameter liquidityRiskScore = new SqlParameter("@LiquidityRiskScore", SqlDbType.SmallInt);
                if (riskCategories.LiquidityRisk == null)
                    liquidityRiskScore.Value = DBNull.Value;
                else
                    liquidityRiskScore.Value = riskCategories.LiquidityRisk;

                SqlParameter liquidityRiskWeighing = new SqlParameter("@LiquidityRiskWeighing", SqlDbType.Decimal);
                if (riskCategories.LiquidityRiskWeight == null)
                    liquidityRiskWeighing.Value = DBNull.Value;
                else
                    liquidityRiskWeighing.Value = riskCategories.LiquidityRiskWeight;

                SqlParameter operationalRiskScore = new SqlParameter("@OperationalRiskScore", SqlDbType.SmallInt);
                if (riskCategories.OperationalRisk == null)
                    operationalRiskScore.Value = DBNull.Value;
                else
                    operationalRiskScore.Value = riskCategories.OperationalRisk;

                SqlParameter operationalRiskWeighing = new SqlParameter("@OperationalRiskWeighing", SqlDbType.Decimal);
                if (riskCategories.OperationalRiskWeight == null)
                    operationalRiskWeighing.Value = DBNull.Value;
                else
                    operationalRiskWeighing.Value = riskCategories.OperationalRiskWeight;

                SqlParameter complianceRiskScore = new SqlParameter("@ComplianceRiskScore", SqlDbType.SmallInt);

                if (riskCategories.ComplianceRisk == null)
                    complianceRiskScore.Value = DBNull.Value;
                else
                    complianceRiskScore.Value = riskCategories.ComplianceRisk;

                SqlParameter complianceRiskWeighing = new SqlParameter("@ComplianceRiskWeighing", SqlDbType.Decimal);
                if (riskCategories.ComplianceRiskWeight == null)
                    complianceRiskWeighing.Value = DBNull.Value;
                else
                    complianceRiskWeighing.Value = riskCategories.ComplianceRiskWeight;

                SqlParameter strategicRiskScore = new SqlParameter("@StrategicRiskScore", SqlDbType.SmallInt);
                if (riskCategories.StrategicRisk == null)
                    strategicRiskScore.Value = DBNull.Value;
                else
                    strategicRiskScore.Value = riskCategories.StrategicRisk;

                SqlParameter strategicRiskWeighing = new SqlParameter("@StrategicRiskWeighing", SqlDbType.Decimal);
                if (riskCategories.StrategicRiskWeight == null)
                    strategicRiskWeighing.Value = DBNull.Value;
                else
                    strategicRiskWeighing.Value = riskCategories.StrategicRiskWeight;

                SqlParameter reputationRiskScore = new SqlParameter("@ReputationRiskScore", SqlDbType.SmallInt);
                if (riskCategories.ReputationRisk == null)
                    reputationRiskScore.Value = DBNull.Value;
                else
                    reputationRiskScore.Value = riskCategories.ReputationRisk;

                SqlParameter reputationRiskWeighing = new SqlParameter("@ReputationRiskWeighing", SqlDbType.Decimal);
                if (riskCategories.ReputationRiskWeight == null)
                    reputationRiskWeighing.Value = DBNull.Value;
                else
                    reputationRiskWeighing.Value = riskCategories.ReputationRiskWeight;

                SqlParameter taskType = new SqlParameter("@TaskType", SqlDbType.VarChar);

                if (UtilityFunctions.DoesCramModelExistsInRiskCategories(riskCategories.ModelKey))
                    taskType.Value = "Update";
                else
                    taskType.Value = "Insert";

                object[] riskCateParams = new object[16];
                riskCateParams[0] = modelKey;
                riskCateParams[1] = creditRiskScore;
                riskCateParams[2] = creditRiskWeighing;
                riskCateParams[3] = interestRateRiskScore;
                riskCateParams[4] = interestRateRiskWeighing;
                riskCateParams[5] = liquidityRiskScore;
                riskCateParams[6] = liquidityRiskWeighing;
                riskCateParams[7] = operationalRiskScore;
                riskCateParams[8] = operationalRiskWeighing;
                riskCateParams[9] = complianceRiskScore;
                riskCateParams[10] = complianceRiskWeighing;
                riskCateParams[11] = strategicRiskScore;
                riskCateParams[12] = strategicRiskWeighing;
                riskCateParams[13] = reputationRiskScore;
                riskCateParams[14] = reputationRiskWeighing;
                riskCateParams[15] = taskType;

                var rowsInsertedOrUpdated = ent.Database.SqlQuery<Int64>("exec dbo.uspRptAppCRAMRiskCategoriesUpdate @ModelKey, @CreditRiskScore,@CreditRiskWeighing, @InterestRateRiskScore,@InterestRateRiskWeighing, @LiquidityRiskScore,@LiquidityRiskWeighing, @OperationalRiskScore, @OperationalRiskWeighing, @ComplianceRiskScore, @ComplianceRiskWeighing, @StrategicRiskScore, @StrategicRiskWeighing, @ReputationRiskScore, @ReputationRiskWeighing, @TaskType", riskCateParams).First<Int64>();

                if (rowsInsertedOrUpdated > 0)
                    result = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpPost]
        public bool SaveOrUpdateAdjustBankData(CramAdjustBankDataParams adjustBankData)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter modelKey = new SqlParameter("@ModelKey", SqlDbType.BigInt);
                modelKey.Value = adjustBankData.ModelKey;

                SqlParameter tier1LeverageRatio = new SqlParameter("@Tier1LeverageRatio", SqlDbType.Decimal);
                if (adjustBankData.Tier1LeverageRatio == null)
                    tier1LeverageRatio.Value = DBNull.Value;
                else
                    tier1LeverageRatio.Value = adjustBankData.Tier1LeverageRatio;

                SqlParameter cET1CapitalRatio = new SqlParameter("@CET1CapitalRatio", SqlDbType.Decimal);
                if (adjustBankData.CET1CapitalRatio == null)
                    cET1CapitalRatio.Value = DBNull.Value;
                else
                    cET1CapitalRatio.Value = adjustBankData.CET1CapitalRatio;

                SqlParameter tier1CapitalRatio = new SqlParameter("@Tier1CapitalRatio", SqlDbType.Decimal);
                if (adjustBankData.Tier1CapitalRatio == null)
                    tier1CapitalRatio.Value = DBNull.Value;
                else
                    tier1CapitalRatio.Value = adjustBankData.Tier1CapitalRatio;

                SqlParameter totalCapitalRatio = new SqlParameter("@TotalCapitalRatio", SqlDbType.Decimal);
                if (adjustBankData.TotalCapitalRatio == null)
                    totalCapitalRatio.Value = DBNull.Value;
                else
                    totalCapitalRatio.Value = adjustBankData.TotalCapitalRatio;

                SqlParameter commonEquityTier1Capital = new SqlParameter("@CommonEquityTier1Capital", SqlDbType.Decimal);
                if (adjustBankData.CommonEquityTier1Capital == null)
                    commonEquityTier1Capital.Value = DBNull.Value;
                else
                    commonEquityTier1Capital.Value = adjustBankData.CommonEquityTier1Capital;

                SqlParameter tier1Capital = new SqlParameter("@Tier1Capital", SqlDbType.Decimal);
                if (adjustBankData.Tier1Capital == null)
                    tier1Capital.Value = DBNull.Value;
                else
                    tier1Capital.Value = adjustBankData.Tier1Capital;

                SqlParameter totalCapital = new SqlParameter("@TotalCapital", SqlDbType.Decimal);
                if (adjustBankData.TotalCapital == null)
                    totalCapital.Value = DBNull.Value;
                else
                    totalCapital.Value = adjustBankData.TotalCapital;

                SqlParameter totalAssetsLeveragePurposes = new SqlParameter("@TotalAssetsLeveragePurposes", SqlDbType.Decimal);
                if (adjustBankData.TotalAssetsLeveragePurposes == null)
                    totalAssetsLeveragePurposes.Value = DBNull.Value;
                else
                    totalAssetsLeveragePurposes.Value = adjustBankData.TotalAssetsLeveragePurposes;

                SqlParameter totalRiskWeightedAssets = new SqlParameter("@TotalRiskWeightedAssets", SqlDbType.Decimal);
                if (adjustBankData.TotalRiskWeightedAssets == null)
                    totalRiskWeightedAssets.Value = DBNull.Value;
                else
                    totalRiskWeightedAssets.Value = adjustBankData.TotalRiskWeightedAssets;

                SqlParameter taskType = new SqlParameter("@TaskType", SqlDbType.VarChar);

                if (UtilityFunctions.DoesCramModelExistsInAdjustmentData(adjustBankData.ModelKey))
                    taskType.Value = "Update";
                else
                    taskType.Value = "Insert";

                object[] riskCateParams = new object[11];
                riskCateParams[0] = modelKey;
                riskCateParams[1] = tier1LeverageRatio;
                riskCateParams[2] = cET1CapitalRatio;
                riskCateParams[3] = tier1CapitalRatio;
                riskCateParams[4] = totalCapitalRatio;
                riskCateParams[5] = commonEquityTier1Capital;
                riskCateParams[6] = tier1Capital;
                riskCateParams[7] = totalCapital;
                riskCateParams[8] = totalAssetsLeveragePurposes;
                riskCateParams[9] = totalRiskWeightedAssets;
                riskCateParams[10] = taskType;

                var rowsInsertedOrUpdated = ent.Database.SqlQuery<Int64>("exec dbo.uspRptAppCRAMAdjustBankDataUpdate @ModelKey, @Tier1LeverageRatio, @CET1CapitalRatio, @Tier1CapitalRatio, @TotalCapitalRatio, @CommonEquityTier1Capital, @Tier1Capital, @TotalCapital, @TotalAssetsLeveragePurposes, @TotalRiskWeightedAssets, @TaskType", riskCateParams).First<Int64>();

                if (rowsInsertedOrUpdated > 0)
                    result = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpPost]
        public bool SaveOrUpdateRiskRatings(CramRiskRatingsParams riskRatings)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter modelKey = new SqlParameter("@ModelKey", SqlDbType.BigInt);
                modelKey.Value = riskRatings.ModelKey;

                SqlParameter low = new SqlParameter("@Low", SqlDbType.Decimal);
                if (riskRatings.Low == null)
                    low.Value = DBNull.Value;
                else
                    low.Value = riskRatings.Low;

                SqlParameter lowModerate = new SqlParameter("@LowModerate", SqlDbType.Decimal);
                if (riskRatings.LowModerate == null)
                    lowModerate.Value = DBNull.Value;
                else
                    lowModerate.Value = riskRatings.LowModerate;

                SqlParameter moderate = new SqlParameter("@Moderate", SqlDbType.Decimal);
                if (riskRatings.Moderate == null)
                    moderate.Value = DBNull.Value;
                else
                    moderate.Value = riskRatings.Moderate;

                SqlParameter moderateHigh = new SqlParameter("@ModerateHigh", SqlDbType.Decimal);
                if (riskRatings.ModerateHigh == null)
                    moderateHigh.Value = DBNull.Value;
                else
                    moderateHigh.Value = riskRatings.ModerateHigh;

                SqlParameter high = new SqlParameter("@High", SqlDbType.Decimal);
                if (riskRatings.High == null)
                    high.Value = DBNull.Value;
                else
                    high.Value = riskRatings.High;

                SqlParameter taskType = new SqlParameter("@TaskType", SqlDbType.VarChar);

                if (UtilityFunctions.DoesCramModelExistsInRiskRatings(riskRatings.ModelKey))
                    taskType.Value = "Update";
                else
                    taskType.Value = "Insert";

                object[] riskCateParams = new object[7];
                riskCateParams[0] = modelKey;
                riskCateParams[1] = low;
                riskCateParams[2] = lowModerate;
                riskCateParams[3] = moderate;
                riskCateParams[4] = moderateHigh;
                riskCateParams[5] = high;
                riskCateParams[6] = taskType;

                var rowsInsertedOrUpdated = ent.Database.SqlQuery<Int64>("exec dbo.uspRptAppCRAMRiskRatingUpdate @ModelKey,@Low,@LowModerate,@Moderate,@ModerateHigh,@High,@TaskType", riskCateParams).First<Int64>();

                if (rowsInsertedOrUpdated > 0)
                    result = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpPost]
        public Int64 SaveOrUpdateModel(CramModel cramModel)
        {
            Int64 rowsInsertedOrUpdated = -1;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter modelKey = new SqlParameter("@ModelKey", SqlDbType.BigInt);
                if (cramModel.ModelKey == null)
                    modelKey.Value = DBNull.Value;
                else
                    modelKey.Value = cramModel.ModelKey;

                SqlParameter modelName = new SqlParameter("@ModelName", SqlDbType.VarChar);
                modelName.Value = cramModel.ModelName;

                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.BigInt);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);

                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                SqlParameter taskType = new SqlParameter("@TaskType", SqlDbType.VarChar);

                if (cramModel.ModelKey == null)
                    taskType.Value = "Insert";
                else
                    taskType.Value = "Update";

                object[] riskCateParams = new object[5];
                riskCateParams[0] = modelKey;
                riskCateParams[1] = modelName;
                riskCateParams[2] = tenantKey;
                riskCateParams[3] = userKey;
                riskCateParams[4] = taskType;

                rowsInsertedOrUpdated = ent.Database.SqlQuery<Int64>("exec dbo.uspRptAppCRAMModelUpdate @ModelKey, @ModelName, @TenantKey, @UserKey, @TaskType", riskCateParams).First<Int64>();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return rowsInsertedOrUpdated;
        }

        [HttpGet]
        public List<CramModel> GetModels()
        {
            List<CramModel> models = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long usersTenant = UtilityFunctions.GetTenantKey(User.Identity.Name);
                var cramModels = ent.AppCRAMModels.Where(obj => obj.TenantKey == usersTenant).ToList();

                if (cramModels != null && cramModels.Count > 0)
                {
                    models = new List<CramModel>();
                    foreach (AppCRAMModel model in cramModels)
                    {
                        CramModel cramModelObj = new CramModel();
                        cramModelObj.AdjustBankData = CramController.GetAdjustBankDataForModel(model.ModelKey);
                        cramModelObj.RiskCategories = CramController.GetRiskCategoriesForModel(model.ModelKey);
                        cramModelObj.RiskRatings = CramController.GetRiskRatingsForModel(model.ModelKey);
                        cramModelObj.IsSelected = false;
                        cramModelObj.ModelKey = model.ModelKey;
                        cramModelObj.ModelName = model.ModelName;
                        cramModelObj.UserKey = model.UserKey;
                        cramModelObj.ModelOwner = UtilityFunctions.GetModelOwnerName(model.ModelKey);
                        models.Add(cramModelObj);
                    }

                    models = models.OrderBy(obj => obj.ModelName).ToList();
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return models;
        }

        [HttpGet]
        public CbrUserInfo GetUserKey()
        {
            CbrUserInfo userInfo = new CbrUserInfo();
            userInfo.UserKey = UtilityFunctions.GetUserKey(User.Identity.Name);
            userInfo.UserName = UtilityFunctions.GetUserName(User.Identity.Name);
            return userInfo;
        }

        [HttpPost]
        public CramDashboardConcepts GetCramDashboardConcepts(CramDashboardConceptsParams conceptParams)
        {
            CramDashboardConcepts concepts = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                institutionKey.Value = conceptParams.InstitutionKey;
                SqlParameter reportPeriodDate = new SqlParameter("@ReportPeriodDate", SqlDbType.Int);
                reportPeriodDate.Value = conceptParams.Period;
                var result = ent.Database.SqlQuery<CramDashboardConceptsData>("exec dbo.uspRptCRAMDashboardConcepts @InstitutionKey, @ReportPeriodDate", institutionKey, reportPeriodDate).ToList<CramDashboardConceptsData>();
                if (result != null && result.Count > 0)
                {
                    concepts = new CramDashboardConcepts();
                    CramDashboardConceptsData RCFAP793 = result.Where(obj => obj.UBPRConceptCode == "RCFAP793").FirstOrDefault();
                    CramDashboardConceptsData RCFAP859 = result.Where(obj => obj.UBPRConceptCode == "RCFAP859").FirstOrDefault();
                    CramDashboardConceptsData RCFA7204 = result.Where(obj => obj.UBPRConceptCode == "RCFA7204").FirstOrDefault();
                    CramDashboardConceptsData RCFAA224 = result.Where(obj => obj.UBPRConceptCode == "RCFAA224").FirstOrDefault();
                    CramDashboardConceptsData RCFA7206 = result.Where(obj => obj.UBPRConceptCode == "RCFA7206").FirstOrDefault();
                    CramDashboardConceptsData RCFA8274 = result.Where(obj => obj.UBPRConceptCode == "RCFA8274").FirstOrDefault();
                    CramDashboardConceptsData RCFA3792 = result.Where(obj => obj.UBPRConceptCode == "RCFA3792").FirstOrDefault();
                    CramDashboardConceptsData RCFA7205 = result.Where(obj => obj.UBPRConceptCode == "RCFA7205").FirstOrDefault();
                    CramDashboardConceptsData RCFAA223 = result.Where(obj => obj.UBPRConceptCode == "RCFAA223").FirstOrDefault();

                    concepts.CET1CapitalRatio = RCFAP793.Value * 100;
                    concepts.CommonEquityTier1Capital = RCFAP859.Value;
                    concepts.Tier1Capital = RCFA8274.Value;
                    concepts.Tier1CapitalRatio = RCFA7206.Value * 100;
                    concepts.Tier1LeverageRatio = RCFA7204.Value * 100;
                    concepts.TotalAssetsLeveragePurposes = RCFAA224.Value;
                    concepts.TotalCapital = RCFA3792.Value;
                    concepts.TotalCapitalRatio = RCFA7205.Value * 100;
                    concepts.TotalRiskWeightedAssets = RCFAA223.Value;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return concepts;
        }

        [HttpGet]
        public CramDefaultRatings GetDefaultRatings()
        {
            CramDefaultRatings defaultRatings = new CramDefaultRatings();
            CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
            var low = ent.AppCRAMRiskRatingDefaults.Where(obj => obj.RiskRating == "Low").FirstOrDefault();
            var lowModerate = ent.AppCRAMRiskRatingDefaults.Where(obj => obj.RiskRating == "Low - Moderate").FirstOrDefault();
            var moderate = ent.AppCRAMRiskRatingDefaults.Where(obj => obj.RiskRating == "Moderate").FirstOrDefault();
            var moderateHigh = ent.AppCRAMRiskRatingDefaults.Where(obj => obj.RiskRating == "Moderate - High").FirstOrDefault();
            var high = ent.AppCRAMRiskRatingDefaults.Where(obj => obj.RiskRating == "High").FirstOrDefault();
            defaultRatings.Low = low.CapitalRiskBuffer;
            defaultRatings.LowModerate = lowModerate.CapitalRiskBuffer;
            defaultRatings.Moderate = moderate.CapitalRiskBuffer;
            defaultRatings.ModerateHigh = moderateHigh.CapitalRiskBuffer;
            defaultRatings.High = high.CapitalRiskBuffer;
            return defaultRatings;
        }

        private static CramAdjustBankDataParams GetAdjustBankDataForModel(long modelKey)
        {
            CramAdjustBankDataParams adjustData = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.AppCRAMAdjustBankDatas.Where(obj => obj.ModelKey == modelKey).FirstOrDefault();
                if (result != null)
                {
                    adjustData = new CramAdjustBankDataParams();
                    adjustData.CET1CapitalRatio = result.CET1CapitalRatio;
                    adjustData.CommonEquityTier1Capital = result.CommonEquityTier1Capital;
                    adjustData.ModelKey = result.ModelKey;
                    adjustData.Tier1Capital = result.Tier1Capital;
                    adjustData.Tier1CapitalRatio = result.Tier1CapitalRatio;
                    adjustData.Tier1LeverageRatio = result.Tier1LeverageRatio;
                    adjustData.TotalAssetsLeveragePurposes = result.TotalAssetsLeveragePurposes;
                    adjustData.TotalCapital = result.TotalCapital;
                    adjustData.TotalCapitalRatio = result.TotalCapitalRatio;
                    adjustData.TotalRiskWeightedAssets = result.TotalRiskWeightedAssets;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return adjustData;
        }

        private static CramRiskCategoriesParams GetRiskCategoriesForModel(long modelKey)
        {
            CramRiskCategoriesParams riskCategories = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.AppCRAMRiskCategories.Where(obj => obj.ModelKey == modelKey).FirstOrDefault();
                if (result != null)
                {
                    riskCategories = new CramRiskCategoriesParams();
                    riskCategories.ComplianceRisk = result.ComplianceRiskScore;
                    riskCategories.ComplianceRiskWeight = result.ComplianceRiskWeighing;
                    riskCategories.CreditRisk = result.CreditRiskScore;
                    riskCategories.CreditRiskWeight = result.CreditRiskWeighing;
                    riskCategories.InterestRateRisk = result.InterestRateRiskScore;
                    riskCategories.InterestRateRiskWeight = result.InterestRateRiskWeighing;
                    riskCategories.LiquidityRisk = result.LiquidityRiskScore;
                    riskCategories.LiquidityRiskWeight = result.LiquidityRiskWeighing;
                    riskCategories.ModelKey = result.ModelKey;
                    riskCategories.OperationalRisk = result.OperationalRiskScore;
                    riskCategories.OperationalRiskWeight = result.OperationalRiskWeighing;
                    riskCategories.ReputationRisk = result.ReputationRiskScore;
                    riskCategories.ReputationRiskWeight = result.ReputationRiskWeighing;
                    riskCategories.StrategicRisk = result.StrategicRiskScore;
                    riskCategories.StrategicRiskWeight = result.StrategicRiskWeighing;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return riskCategories;
        }

        private static CramRiskRatingsParams GetRiskRatingsForModel(long modelKey)
        {
            CramRiskRatingsParams riskRatings = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.AppCRAMRiskRatings.Where(obj => obj.ModelKey == modelKey).FirstOrDefault();
                if (result != null)
                {
                    riskRatings = new CramRiskRatingsParams();
                    riskRatings.High = result.High;
                    riskRatings.Low = result.Low;
                    riskRatings.LowModerate = result.LowModerate;
                    riskRatings.ModelKey = result.ModelKey;
                    riskRatings.Moderate = result.Moderate;
                    riskRatings.ModerateHigh = result.ModerateHigh;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return riskRatings;
        }

        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage GetCramExporttoExcel(CramDashboardConceptsParams dashboardParam)
        {
            byte[] excelBytes = null;
            try
            {
                HttpResponseMessage result1 = new HttpResponseMessage();
                CramDashboardConcepts getCramDashBoard = GetCramDashboardConcepts(dashboardParam);
                CramCalculations.SelectedBankVitals = getCramDashBoard;
                CramCalculationsLaverage.SelectedBankVitals = getCramDashBoard;
                CramCalculationsCet1.SelectedBankVitals= getCramDashBoard;
                CramCalculationsTier1.SelectedBankVitals= getCramDashBoard;
                CramCalculationsTotalCapital.SelectedBankVitals= getCramDashBoard;

                CramDefaultRatings getDefaultRating = GetDefaultRatings();
                CramRiskRatingsParams modelRiskRatings = GetRiskRatingsForModel(dashboardParam.ModelKey);
                if (modelRiskRatings.Low != null)
                    getDefaultRating.Low = modelRiskRatings.Low;
                if (modelRiskRatings.LowModerate != null)
                    getDefaultRating.LowModerate = modelRiskRatings.LowModerate;
                if (modelRiskRatings.Moderate != null)
                    getDefaultRating.Moderate = modelRiskRatings.Moderate;
                if (modelRiskRatings.ModerateHigh != null)
                    getDefaultRating.ModerateHigh = modelRiskRatings.ModerateHigh;
                if (modelRiskRatings.High != null)
                    getDefaultRating.High = modelRiskRatings.High;

                CramCalculations.DefaultRatings = getDefaultRating;
                CramCalculationsLaverage.DefaultRatings = getDefaultRating;
                CramCalculationsCet1.DefaultRatings = getDefaultRating;
                CramCalculationsTier1.DefaultRatings = getDefaultRating;
                CramCalculationsTotalCapital.DefaultRatings = getDefaultRating;

                CramAdjustBankDataParams getAdjustBankDataForModel = GetAdjustBankDataForModel(dashboardParam.ModelKey);
                CramCalculations.AdjustBankData = getAdjustBankDataForModel;
                CramCalculationsLaverage.AdjustBankData = getAdjustBankDataForModel;
                CramCalculationsCet1.AdjustBankData = getAdjustBankDataForModel;
                CramCalculationsTier1.AdjustBankData = getAdjustBankDataForModel;
                CramCalculationsTotalCapital.AdjustBankData = getAdjustBankDataForModel;
                if (getAdjustBankDataForModel.CommonEquityTier1Capital != null)
                    getCramDashBoard.CommonEquityTier1Capital = getAdjustBankDataForModel.CommonEquityTier1Capital;

                if (getAdjustBankDataForModel.Tier1Capital != null)
                    getCramDashBoard.Tier1Capital = getAdjustBankDataForModel.Tier1Capital;

                if (getAdjustBankDataForModel.TotalAssetsLeveragePurposes != null)
                    getCramDashBoard.TotalAssetsLeveragePurposes = getAdjustBankDataForModel.TotalAssetsLeveragePurposes;

                if (getAdjustBankDataForModel.TotalCapital != null)
                    getCramDashBoard.TotalCapital = getAdjustBankDataForModel.TotalCapital;

                if (getAdjustBankDataForModel.TotalRiskWeightedAssets != null)
                    getCramDashBoard.TotalRiskWeightedAssets = getAdjustBankDataForModel.TotalRiskWeightedAssets;

                CramRiskCategoriesParams getRiskCategoriesForModel= GetRiskCategoriesForModel(dashboardParam.ModelKey);
                CramCalculations.RiskCategoriesAndWeights = getRiskCategoriesForModel;
                CramCalculationsLaverage.RiskCategoriesAndWeights = getRiskCategoriesForModel;
                CramCalculationsCet1.RiskCategoriesAndWeights = getRiskCategoriesForModel;
                CramCalculationsTier1.RiskCategoriesAndWeights = getRiskCategoriesForModel;
                CramCalculationsTotalCapital.RiskCategoriesAndWeights = getRiskCategoriesForModel;

                CramRiskRatingsParams getRiskRatingsForModel= GetRiskRatingsForModel(dashboardParam.ModelKey);
                CramCalculations.RiskRating = getRiskRatingsForModel;
                CramCalculationsLaverage.RiskRating = getRiskRatingsForModel;
                CramCalculationsCet1.RiskRating = getRiskRatingsForModel;
                CramCalculationsTier1.RiskRating = getRiskRatingsForModel;
                CramCalculationsTotalCapital.RiskRating = getRiskRatingsForModel;

                DataTable dtInformation = new DataTable();
                DataTable dashBoardTable = this.Dashboard();
                DataTable tier1LeverageRatioTable = this.Tier1Leverageratio();
                DataTable cet1CapitalRatioTable = this.Cet1CapitalRatio();
                DataTable tier1CapitalRatioTable = this.Tier1CapitalRatio();
                DataTable totalCapitalRatioTable = this.TotalCapitalRatio();

                dtInformation.TableName = "Information";

                BankProfileOverviewParams bankdata = new BankProfileOverviewParams();
                bankdata.InstitutionKey = dashboardParam.InstitutionKey;
                bankdata.Period = dashboardParam.Period.ToString();
                var Bankfinalres = this.GetBankProfileIntroductionData(bankdata);

                //Information columns
                dtInformation.Columns.Add("Bank");
                dtInformation.Columns.Add("Period");
                dtInformation.Columns.Add("Scenario");
                //Information rows
                DataRow informationrow1 = dtInformation.NewRow();
                informationrow1["Bank"] = Bankfinalres.Name;
                informationrow1["Period"] = CommonFunctions.GetQuarterLabel(dashboardParam.Period.ToString());
                informationrow1["Scenario"] = dashboardParam.CramModelName;
                dtInformation.Rows.Add(informationrow1);

                DataTable[] metricArr = new DataTable[6];
                metricArr[0] = dtInformation;
                metricArr[1] = dashBoardTable;
                metricArr[2] = tier1LeverageRatioTable;
                metricArr[3] = cet1CapitalRatioTable;
                metricArr[4] = tier1CapitalRatioTable;
                metricArr[5] = totalCapitalRatioTable;                
                excelBytes = CramExportToExcel.CreateExcelDocument(metricArr, "CapitalRiskAnalyzer.xlsx", Bankfinalres);

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
            result.Content.Headers.ContentDisposition.FileName = "CapitalRiskAnalyzer.xlsx";
            result.Content.Headers.ContentDisposition.Size = excelBytes.Length;
            return result;
        }      
        private DataTable Dashboard()
        {
            DataTable dashBoard = new DataTable();
            dashBoard.TableName = "Dashboard";
            try
            { 
            //dashBoard columns
            dashBoard.Columns.Add("Regulatory Minimum (PCA Well-Capitalized)");
            dashBoard.Columns.Add(CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%");
            dashBoard.Columns.Add("$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital()));
            dashBoard.Columns.Add(" ");
            dashBoard.Columns.Add("Regulatory Minimum (PCA Well-Capitalized) ");
            dashBoard.Columns.Add(CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%");
            dashBoard.Columns.Add("$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital()));


            //Dashboard rows
            DataRow dashBoardrow1 = dashBoard.NewRow();
            dashBoardrow1["Regulatory Minimum (PCA Well-Capitalized)"] = "Buffer:  Implied Minimum Less PCA Well-Capitalized";
            dashBoardrow1[CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.LeverBufferImpliedMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow1["$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.LeverBufferImpliedMinimumCapital());
            dashBoardrow1[" "] = string.Empty;
            dashBoardrow1["Regulatory Minimum (PCA Well-Capitalized) "] = "Buffer:  Implied Minimum Less PCA Well-Capitalized"; 
             dashBoardrow1[CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.CETBufferImpliedMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow1["$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.CETBufferImpliedMinimumCapital());
            dashBoard.Rows.Add(dashBoardrow1);

            DataRow dashBoardrow2 = dashBoard.NewRow();
            dashBoardrow2["Regulatory Minimum (PCA Well-Capitalized)"] = "Buffer: Bank's Minimum (Policy) Less Implied Minimum";
            dashBoardrow2[CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.LeverBufferBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow2["$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.LeverBufferBanksMinimumCapital());
            dashBoardrow2[" "] = string.Empty;
            dashBoardrow2["Regulatory Minimum (PCA Well-Capitalized) "] = "Buffer:  Bank's Minimum (Policy) Less Implied Minimum";
            dashBoardrow2[CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.CETBufferBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow2["$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.CETBufferBanksMinimumCapital());
            dashBoard.Rows.Add(dashBoardrow2);

            DataRow dashBoardrow3 = dashBoard.NewRow();
            dashBoardrow3["Regulatory Minimum (PCA Well-Capitalized)"] = "Buffer: Actual Tier 1 Leverage Less Bank's Minimum (Policy)";
            dashBoardrow3[CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.LeverTier1LeverageLessBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow3["$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.LeverTier1LeverageLessBanksMinimumCapital());
            dashBoardrow3[" "] = string.Empty;
            dashBoardrow3["Regulatory Minimum (PCA Well-Capitalized) "] = "Buffer: Actual Tier 1 Leverage Less Bank's Minimum (Policy)";
            dashBoardrow3[CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.CETCet1CapitalLessBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow3["$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.CETCet1CapitalLessBanksMinimumCapital());
            dashBoard.Rows.Add(dashBoardrow3);

            DataRow dashBoardrow4 = dashBoard.NewRow();
            dashBoardrow4["Regulatory Minimum (PCA Well-Capitalized)"] = "Actual Tier 1 Leverage Ratio";
            dashBoardrow4[CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.LeverActualTier1LeverageRatioWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow4["$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.LeverActualTier1LeverageRatioCapital());
            dashBoardrow4[" "] = string.Empty;
            dashBoardrow4["Regulatory Minimum (PCA Well-Capitalized) "] = "Actual CET1 Capital Ratio";
            dashBoardrow4[CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.CETActualCet1CapitalRatioWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow4["$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.CETActualCet1CapitalRatioCapital());
            dashBoard.Rows.Add(dashBoardrow4);

            dashBoard.Rows.Add(dashBoard.NewRow());
            DataRow dashBoardrowempty4 = dashBoard.NewRow();

            dashBoardrowempty4["Regulatory Minimum (PCA Well-Capitalized)"] = "Tier 1 Capital Summary";
            dashBoardrowempty4[CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = string.Empty;
            dashBoardrowempty4["$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital())] = string.Empty;
            dashBoardrowempty4[" "] = string.Empty;
            dashBoardrowempty4["Regulatory Minimum (PCA Well-Capitalized) "] = "Total Capital Summary";
            dashBoardrowempty4[CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = string.Empty;
            dashBoardrowempty4["$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital())] = string.Empty;
            dashBoard.Rows.Add(dashBoardrowempty4);

            dashBoard.Rows.Add(dashBoard.NewRow());
            DataRow dashBoardrowheader1 = dashBoard.NewRow();

            dashBoardrowheader1["Regulatory Minimum (PCA Well-Capitalized)"] = "Regulatory Minimum (PCA Well-Capitalized)"; 
             dashBoardrowheader1[CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.Tier1RegulatoryMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrowheader1["$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.Tier1RegulatoryMinimumCapital());
            dashBoardrowheader1[" "] = string.Empty;
            dashBoardrowheader1["Regulatory Minimum (PCA Well-Capitalized) "] = "Regulatory Minimum (PCA Well-Capitalized)";
            dashBoardrowheader1[CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.TotalRegulatoryMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrowheader1["$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.TotalRegulatoryMinimumCapital());
            dashBoard.Rows.Add(dashBoardrowheader1);

            DataRow dashBoardrow6 = dashBoard.NewRow();
            dashBoardrow6["Regulatory Minimum (PCA Well-Capitalized)"] = "Buffer: Implied Minimum Less PCA Well-Capitalized";
            dashBoardrow6[CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.Tier1BufferImpliedMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow6["$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.Tier1BufferImpliedMinimumCapital());
            dashBoardrow6[" "] = string.Empty;
            dashBoardrow6["Regulatory Minimum (PCA Well-Capitalized) "] = "Buffer:  Implied Minimum Less PCA Well-Capitalized";
            dashBoardrow6[CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.TotalBufferImpliedMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow6["$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.TotalBufferImpliedMinimumCapital());
            dashBoard.Rows.Add(dashBoardrow6);

            DataRow dashBoardrow7 = dashBoard.NewRow();
            dashBoardrow7["Regulatory Minimum (PCA Well-Capitalized)"] = "Buffer:  Bank's Minimum (Policy) Less Implied Minimum	";
            dashBoardrow7[CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.Tier1BufferBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow7["$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.Tier1BufferBanksMinimumCapital());
            dashBoardrow7[" "] = string.Empty;
            dashBoardrow7["Regulatory Minimum (PCA Well-Capitalized) "] = "Buffer: Bank's Minimum (Policy) Less Implied Minimum";
            dashBoardrow7[CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.TotalBufferBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow7["$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.TotalBufferBanksMinimumCapital());
            dashBoard.Rows.Add(dashBoardrow7);

            DataRow dashBoardrow8 = dashBoard.NewRow();
            dashBoardrow8["Regulatory Minimum (PCA Well-Capitalized)"] = "Buffer:  Actual Tier 1 Capital Less Bank's Minimum (Policy)	";
            dashBoardrow8[CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.Tier1Tier1CapitalLessBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow8["$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.Tier1Tier1CapitalLessBanksMinimumCapital());
            dashBoardrow8[" "] = string.Empty;
            dashBoardrow8["Regulatory Minimum (PCA Well-Capitalized) "] = "Buffer:  Actual Total Capital Less Bank's Minimum (Policy)";
            dashBoardrow8[CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.TotalTotalCapitalLessBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow8["$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.TotalTotalCapitalLessBanksMinimumCapital());
            dashBoard.Rows.Add(dashBoardrow8);

            DataRow dashBoardrow9 = dashBoard.NewRow();
            dashBoardrow9["Regulatory Minimum (PCA Well-Capitalized)"] = "Actual Tier 1 Risk-Based Capital Ratio	";
            dashBoardrow9[CramCalculations.LeverRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.Tier1ActualTier1CapitalRatio().Value, 4) + "%";
            dashBoardrow9["$" + string.Format("{0:#,##0}", CramCalculations.LeverRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.Tier1ActualTier1CapitalRatioCapital());
            dashBoardrow9[" "] = string.Empty;
            dashBoardrow9["Regulatory Minimum (PCA Well-Capitalized) "] = "Actual Total Capital Ratio";
            dashBoardrow9[CramCalculations.CETRegulatoryMinimumWeightedRiskBuffer().ToString() + "%"] = Math.Round(CramCalculations.TotalActualTotalCapitalRatioWeightedRiskBuffer().Value, 4) + "%";
            dashBoardrow9["$" + string.Format("{0:#,##0}", CramCalculations.CETRegulatoryMinimumCapital())] = "$" + string.Format("{0:#,##0}", CramCalculations.TotalActualTotalCapitalRatioCapital());
            dashBoard.Rows.Add(dashBoardrow9);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return dashBoard;

        }
        private DataTable Tier1Leverageratio()
        {
            DataTable tier1LeverageRatio = new DataTable();
            tier1LeverageRatio.TableName = "Tier 1 Leverage Ratio";
            try
            { 
            //Tier 1 Leverage Ratio columns
            tier1LeverageRatio.Columns.Add("Risk Categories");
            tier1LeverageRatio.Columns.Add("Composite Risk Score");
            tier1LeverageRatio.Columns.Add("Risk Rating");
            tier1LeverageRatio.Columns.Add("Risk-Weighting");
            tier1LeverageRatio.Columns.Add("Capital Risk Buffer");
            tier1LeverageRatio.Columns.Add("Weighted Risk Buffer");
            tier1LeverageRatio.Columns.Add("Tier 1 Capital (000)");
            tier1LeverageRatio.Columns.Add(" ");
            tier1LeverageRatio.Columns.Add("LOW");
            tier1LeverageRatio.Columns.Add("LOW - MOD");
            tier1LeverageRatio.Columns.Add("MODERATE");
            tier1LeverageRatio.Columns.Add("MOD-HIGH");
            tier1LeverageRatio.Columns.Add("HIGH");

            DataRow tier1LeverageRatioRow1 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow1["Risk Categories"] = "Credit Risk";
            tier1LeverageRatioRow1["Composite Risk Score"] = CramCalculationsLaverage.CompositeRiskScoreCreditRisk();
            tier1LeverageRatioRow1["Risk Rating"] = CramCalculationsLaverage.RiskRatingCreditRisk();
            tier1LeverageRatioRow1["Risk-Weighting"] = Math.Round(CramCalculationsLaverage.RiskWeightingCreditRisk().Value, 2)+"%";
            tier1LeverageRatioRow1["Capital Risk Buffer"] = Math.Round(CramCalculationsLaverage.CapitalRiskBufferCreditRisk().Value, 2)+"%";
            tier1LeverageRatioRow1["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.WeightedRiskBufferCreditRisk().Value, 4) + "%";
            tier1LeverageRatioRow1["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.Tier1CapitalCreditRisk());

            tier1LeverageRatioRow1["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowCreditRisk());
            tier1LeverageRatioRow1["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowModerateCreditRisk());
            tier1LeverageRatioRow1["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateCreditRisk());
            tier1LeverageRatioRow1["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateHighCreditRisk());
            tier1LeverageRatioRow1["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.HighCreditRisk());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow1);

            DataRow tier1LeverageRatioRow2 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow2["Risk Categories"] = "Interest Rate Risk";
            tier1LeverageRatioRow2["Composite Risk Score"] = CramCalculationsLaverage.CompositeRiskScoreInterestRateRisk();
            tier1LeverageRatioRow2["Risk Rating"] = CramCalculationsLaverage.RiskRatingInterestRateRisk();
            tier1LeverageRatioRow2["Risk-Weighting"] = Math.Round(CramCalculationsLaverage.RiskWeightingInterestRateRisk().Value, 2) + "%";
            tier1LeverageRatioRow2["Capital Risk Buffer"] = Math.Round(CramCalculationsLaverage.CapitalRiskBufferInterestRateRisk().Value, 2) + "%";
            tier1LeverageRatioRow2["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.WeightedRiskBufferInterestRateRisk().Value, 2) + "%";
            tier1LeverageRatioRow2["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.Tier1CapitalInterestRateRisk());

            tier1LeverageRatioRow2["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowInterestRateRisk());
            tier1LeverageRatioRow2["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowModerateInterestRateRisk());
            tier1LeverageRatioRow2["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateInterestRateRisk());
            tier1LeverageRatioRow2["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateHighInterestRateRisk());
            tier1LeverageRatioRow2["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.HighInterestRateRisk());          
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow2);

            DataRow tier1LeverageRatioRow3 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow3["Risk Categories"] = "Liquidity Risk";
            tier1LeverageRatioRow3["Composite Risk Score"] = CramCalculationsLaverage.CompositeRiskScoreLiquidityRisk();
            tier1LeverageRatioRow3["Risk Rating"] = CramCalculationsLaverage.RiskRatingLiquidityRisk();
            tier1LeverageRatioRow3["Risk-Weighting"] = Math.Round(CramCalculationsLaverage.RiskWeightingLiquidityRisk().Value, 2) + "%";
            tier1LeverageRatioRow3["Capital Risk Buffer"] = Math.Round(CramCalculationsLaverage.CapitalRiskBufferLiquidityRisk().Value, 2) + "%";
            tier1LeverageRatioRow3["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.WeightedRiskBufferLiquidityRisk().Value, 2) + "%";
            tier1LeverageRatioRow3["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.Tier1CapitalLiquidityRisk());

            tier1LeverageRatioRow3["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowLiquidityRisk());
            tier1LeverageRatioRow3["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowModerateLiquidityRisk());
            tier1LeverageRatioRow3["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateLiquidityRisk());
            tier1LeverageRatioRow3["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateHighLiquidityRisk());
            tier1LeverageRatioRow3["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.HighLiquidityRisk());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow3);

            DataRow tier1LeverageRatioRow4 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow4["Risk Categories"] = "Operational Risk";
            tier1LeverageRatioRow4["Composite Risk Score"] = CramCalculationsLaverage.CompositeRiskScoreOperationalRisk();
            tier1LeverageRatioRow4["Risk Rating"] = CramCalculationsLaverage.RiskRatingOperationalRisk();
            tier1LeverageRatioRow4["Risk-Weighting"] = Math.Round(CramCalculationsLaverage.RiskWeightingOperationalRisk().Value, 2) + "%";
            tier1LeverageRatioRow4["Capital Risk Buffer"] = Math.Round(CramCalculationsLaverage.CapitalRiskBufferOperationalRisk().Value, 2) + "%";
            tier1LeverageRatioRow4["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.WeightedRiskBufferOperationalRisk().Value, 2) + "%";
            tier1LeverageRatioRow4["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.Tier1CapitalOperationalRisk());

            tier1LeverageRatioRow4["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowOperationalRisk());
            tier1LeverageRatioRow4["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowModerateOperationalRisk());
            tier1LeverageRatioRow4["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateOperationalRisk());
            tier1LeverageRatioRow4["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateHighOperationalRisk());
            tier1LeverageRatioRow4["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.HighOperationalRisk());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow4);

            DataRow tier1LeverageRatioRow5 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow5["Risk Categories"] = "Compliance Risk";
            tier1LeverageRatioRow5["Composite Risk Score"] = CramCalculationsLaverage.CompositeRiskScoreComplianceRisk();
            tier1LeverageRatioRow5["Risk Rating"] = CramCalculationsLaverage.RiskRatingComplianceRisk();
            tier1LeverageRatioRow5["Risk-Weighting"] = Math.Round(CramCalculationsLaverage.RiskWeightingComplianceRisk().Value, 2) + "%";
            tier1LeverageRatioRow5["Capital Risk Buffer"] = Math.Round(CramCalculationsLaverage.CapitalRiskBufferComplianceRisk().Value, 2) + "%";
            tier1LeverageRatioRow5["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.WeightedRiskBufferComplianceRisk().Value, 2) + "%";
            tier1LeverageRatioRow5["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.Tier1CapitalComplianceRisk());

            tier1LeverageRatioRow5["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowComplianceRisk());
            tier1LeverageRatioRow5["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowModerateComplianceRisk());
            tier1LeverageRatioRow5["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateComplianceRisk());
            tier1LeverageRatioRow5["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateHighComplianceRisk());
            tier1LeverageRatioRow5["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.HighComplianceRisk());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow5);

            DataRow tier1LeverageRatioRow6 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow6["Risk Categories"] = "Strategic Risk";
            tier1LeverageRatioRow6["Composite Risk Score"] = CramCalculationsLaverage.CompositeRiskScoreStrategicRisk();
            tier1LeverageRatioRow6["Risk Rating"] = CramCalculationsLaverage.RiskRatingStrategicRisk();
            tier1LeverageRatioRow6["Risk-Weighting"] = Math.Round(CramCalculationsLaverage.RiskWeightingStrategicRisk().Value, 2) + "%";
            tier1LeverageRatioRow6["Capital Risk Buffer"] = Math.Round(CramCalculationsLaverage.CapitalRiskBufferStrategicRisk().Value, 2) + "%";
            tier1LeverageRatioRow6["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.WeightedRiskBufferStrategicRisk().Value, 2) + "%";
            tier1LeverageRatioRow6["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.Tier1CapitalStrategicRisk());

            tier1LeverageRatioRow6["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowStrategicRisk());
            tier1LeverageRatioRow6["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowModerateStrategicRisk());
            tier1LeverageRatioRow6["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateStrategicRisk());
            tier1LeverageRatioRow6["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateHighStrategicRisk());
            tier1LeverageRatioRow6["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.HighStrategicRisk());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow6);

            DataRow tier1LeverageRatioRow7 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow7["Risk Categories"] = "Reputation Risk";
            tier1LeverageRatioRow7["Composite Risk Score"] = CramCalculationsLaverage.CompositeRiskScoreReputationRisk();
            tier1LeverageRatioRow7["Risk Rating"] = CramCalculationsLaverage.RiskRatingReputationRisk();
            tier1LeverageRatioRow7["Risk-Weighting"] = Math.Round(CramCalculationsLaverage.RiskWeightingReputationRisk().Value, 2) + "%";
            tier1LeverageRatioRow7["Capital Risk Buffer"] = Math.Round(CramCalculationsLaverage.CapitalRiskBufferReputationRisk().Value, 2) + "%";
            tier1LeverageRatioRow7["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.WeightedRiskBufferReputationRisk().Value, 2) + "%";
            tier1LeverageRatioRow7["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.Tier1CapitalReputationRisk());

            tier1LeverageRatioRow7["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowReputationRisk());
            tier1LeverageRatioRow7["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowModerateReputationRisk());
            tier1LeverageRatioRow7["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateReputationRisk());
            tier1LeverageRatioRow7["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateHighReputationRisk());
            tier1LeverageRatioRow7["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.HighReputationRisk());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow7);

            DataRow tier1LeverageRatioRow8 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow8["Risk Categories"] = "Total:";
            tier1LeverageRatioRow8["Composite Risk Score"] = Math.Round(CramCalculationsLaverage.TotalCompositeRiskScore().Value,2);
            tier1LeverageRatioRow8["Risk Rating"] = string.Empty;
            tier1LeverageRatioRow8["Risk-Weighting"] = Math.Round(CramCalculationsLaverage.TotalRiskWeighting().Value, 2) + "%";
            tier1LeverageRatioRow8["Capital Risk Buffer"] = string.Empty;
            tier1LeverageRatioRow8["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.TotalWeightedRiskBuffer().Value, 2) + "%";
            tier1LeverageRatioRow8["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.TotalTier1Capital());

            tier1LeverageRatioRow8["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowTotal());
            tier1LeverageRatioRow8["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.LowModerateTotal());
            tier1LeverageRatioRow8["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateTotal());
            tier1LeverageRatioRow8["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ModerateHighTotal());
            tier1LeverageRatioRow8["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.HighTotal());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow8);

            tier1LeverageRatio.Rows.Add(tier1LeverageRatio.NewRow());

            DataRow tier1LeverageRatioRow9 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow9["Risk Categories"] = "Tier 1 Leverage Capital";
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow9);

            DataRow tier1LeverageRatioRow10 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow10["Risk Categories"] = "Regulatory Minimum (PCA Well-Capitalized) for Tier 1 Leverage Ratio";
            tier1LeverageRatioRow10["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.RegulatoryMinimumWeightedRiskBuffer().Value, 2) + "%";
            tier1LeverageRatioRow10["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.RegulatoryMinimumCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow10);

            DataRow tier1LeverageRatioRow11 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow11["Risk Categories"] = "Implied Minimum for Tier 1 Leverage Ratio Based on Risk Assessment";
            tier1LeverageRatioRow11["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.ImpliedMinimumWeightedRiskBuffer().Value, 2) + "%";
            tier1LeverageRatioRow11["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ImpliedMinimumCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow11);

            DataRow tier1LeverageRatioRow12 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow12["Risk Categories"] = "Bank’s Minimum (Policy) for Tier 1 Leverage Ratio";
            tier1LeverageRatioRow12["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.BanksMinimumWeightedRiskBuffer().Value, 2) + "%";
            tier1LeverageRatioRow12["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.BanksMinimumCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow12);

            DataRow tier1LeverageRatioRow13 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow13["Risk Categories"] = "Risk Assessment Buffer:  Bank's Minimum (Policy) Less Implied Minimum";
            tier1LeverageRatioRow13["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.BanksMinimumLessImpliedMinimumWeightedRiskBuffer().Value, 2) + "%";
            tier1LeverageRatioRow13["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.BanksMinimumLessImpliedMinimumCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow13);

            tier1LeverageRatio.Rows.Add(tier1LeverageRatio.NewRow());

            DataRow tier1LeverageRatioRow14 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow14["Risk Categories"] = "Bank’s Tier 1 Leverage Ratio";
            tier1LeverageRatioRow14["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.BanksTier1LeverageRatioWeightedRiskBuffer().Value, 4) + "%";
            tier1LeverageRatioRow14["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.BanksTier1LeverageRatioCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow14);

            DataRow tier1LeverageRatioRow15 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow15["Risk Categories"] = "Risk Assessment Buffer:  Tier 1 Leverage Less Implied Minimum";
            tier1LeverageRatioRow15["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.RiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer().Value, 4) + "%";
            tier1LeverageRatioRow15["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.RiskAssessBufferTier1LeverageLessImpliedMinCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow15);

            tier1LeverageRatio.Rows.Add(tier1LeverageRatio.NewRow());

            DataRow tier1LeverageRatioRow16 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow16["Risk Categories"] = "Tier 1 Leverage Capital Summary";
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow16);

            DataRow tier1LeverageRatioRow17 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow17["Risk Categories"] = "Regulatory Minimum (PCA Well-Capitalized)";
            tier1LeverageRatioRow17["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.RegulatoryMinimumWeightedRiskBuffer().Value, 4) + "%";
            tier1LeverageRatioRow17["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.RegulatoryMinimumCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow17);

            DataRow tier1LeverageRatioRow18 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow18["Risk Categories"] = "Buffer:  Implied Minimum Less PCA Well-Capitalized";
            tier1LeverageRatioRow18["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.BufferImpliedMinimumWeightedRiskBuffer().Value, 4) + "%";
            tier1LeverageRatioRow18["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.BufferImpliedMinimumCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow18);

            DataRow tier1LeverageRatioRow19 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow19["Risk Categories"] = "  Buffer:  Bank's Minimum (Policy) Less Implied Minimum";
            tier1LeverageRatioRow19["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.BufferBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            tier1LeverageRatioRow19["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.BufferBanksMinimumCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow19);

            DataRow tier1LeverageRatioRow20 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow20["Risk Categories"] = "    Buffer:  Actual Tier 1 Leverage Less Bank's Minimum (Policy)";
            tier1LeverageRatioRow20["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.Tier1LeverageLessBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            tier1LeverageRatioRow20["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.Tier1LeverageLessBanksMinimumCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow20);

            DataRow tier1LeverageRatioRow21 = tier1LeverageRatio.NewRow();
            tier1LeverageRatioRow21["Risk Categories"] = "Actual Tier 1 Leverage Ratio";
            tier1LeverageRatioRow21["Weighted Risk Buffer"] = Math.Round(CramCalculationsLaverage.ActualTier1LeverageRatioWeightedRiskBuffer().Value, 4) + "%";
            tier1LeverageRatioRow21["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsLaverage.ActualTier1LeverageRatioCapital());
            tier1LeverageRatio.Rows.Add(tier1LeverageRatioRow21);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return tier1LeverageRatio;
        }
        private DataTable Cet1CapitalRatio()
        {          
            DataTable cet1CapitalRatio = new DataTable();
            cet1CapitalRatio.TableName = "CET 1 Capital Ratio";
            try
            { 
            //Tier 1 Leverage Ratio columns
            cet1CapitalRatio.Columns.Add("Risk Categories");
            cet1CapitalRatio.Columns.Add("Composite Risk Score");
            cet1CapitalRatio.Columns.Add("Risk Rating");
            cet1CapitalRatio.Columns.Add("Risk-Weighting");
            cet1CapitalRatio.Columns.Add("Capital Risk Buffer");
            cet1CapitalRatio.Columns.Add("Weighted Risk Buffer");
            cet1CapitalRatio.Columns.Add("Tier 1 Capital (000)");
            cet1CapitalRatio.Columns.Add(" ");
            cet1CapitalRatio.Columns.Add("LOW");
            cet1CapitalRatio.Columns.Add("LOW - MOD");
            cet1CapitalRatio.Columns.Add("MODERATE");
            cet1CapitalRatio.Columns.Add("MOD-HIGH");
            cet1CapitalRatio.Columns.Add("HIGH");

            DataRow cet1CapitalRatioRow1 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow1["Risk Categories"] = "Credit Risk";
            cet1CapitalRatioRow1["Composite Risk Score"] = CramCalculationsCet1.CompositeRiskScoreCreditRisk();
            cet1CapitalRatioRow1["Risk Rating"] = CramCalculationsCet1.RiskRatingCreditRisk();
            cet1CapitalRatioRow1["Risk-Weighting"] = Math.Round(CramCalculationsCet1.RiskWeightingCreditRisk().Value, 2) + "%"; 
            cet1CapitalRatioRow1["Capital Risk Buffer"] = Math.Round(CramCalculationsCet1.CapitalRiskBufferCreditRisk().Value, 2) + "%";
            cet1CapitalRatioRow1["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.WeightedRiskBufferCreditRisk().Value, 2) + "%";
            cet1CapitalRatioRow1["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.Cet1CapitalCreditRisk());

            cet1CapitalRatioRow1["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowCreditRisk());
            cet1CapitalRatioRow1["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowModerateCreditRisk());
            cet1CapitalRatioRow1["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateCreditRisk());
            cet1CapitalRatioRow1["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateHighCreditRisk());
            cet1CapitalRatioRow1["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.HighCreditRisk());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow1);

            DataRow cet1CapitalRatioRow2 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow2["Risk Categories"] = "Interest Rate Risk";
            cet1CapitalRatioRow2["Composite Risk Score"] = CramCalculationsCet1.CompositeRiskScoreInterestRateRisk();
            cet1CapitalRatioRow2["Risk Rating"] = CramCalculationsCet1.RiskRatingInterestRateRisk();
            cet1CapitalRatioRow2["Risk-Weighting"] = Math.Round(CramCalculationsCet1.RiskWeightingInterestRateRisk().Value, 2) + "%";
            cet1CapitalRatioRow2["Capital Risk Buffer"] = Math.Round(CramCalculationsCet1.CapitalRiskBufferInterestRateRisk().Value, 2) + "%";
            cet1CapitalRatioRow2["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.WeightedRiskBufferInterestRateRisk().Value, 2) + "%";
            cet1CapitalRatioRow2["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.Cet1CapitalInterestRateRisk());

            cet1CapitalRatioRow2["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowInterestRateRisk());
            cet1CapitalRatioRow2["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowModerateInterestRateRisk());
            cet1CapitalRatioRow2["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateInterestRateRisk());
            cet1CapitalRatioRow2["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateHighInterestRateRisk());
            cet1CapitalRatioRow2["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.HighInterestRateRisk());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow2);

            DataRow cet1CapitalRatioRow3 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow3["Risk Categories"] = "Liquidity Risk";
            cet1CapitalRatioRow3["Composite Risk Score"] = CramCalculationsCet1.CompositeRiskScoreLiquidityRisk();
            cet1CapitalRatioRow3["Risk Rating"] = CramCalculationsCet1.RiskRatingLiquidityRisk();
            cet1CapitalRatioRow3["Risk-Weighting"] = Math.Round(CramCalculationsCet1.RiskWeightingLiquidityRisk().Value, 2) + "%";
            cet1CapitalRatioRow3["Capital Risk Buffer"] = Math.Round(CramCalculationsCet1.CapitalRiskBufferLiquidityRisk().Value, 2) + "%";
            cet1CapitalRatioRow3["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.WeightedRiskBufferLiquidityRisk().Value, 2) + "%";
            cet1CapitalRatioRow3["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.Cet1CapitalLiquidityRisk());

            cet1CapitalRatioRow3["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowLiquidityRisk());
            cet1CapitalRatioRow3["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowModerateLiquidityRisk());
            cet1CapitalRatioRow3["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateLiquidityRisk());
            cet1CapitalRatioRow3["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateHighLiquidityRisk());
            cet1CapitalRatioRow3["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.HighLiquidityRisk());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow3);

            DataRow cet1CapitalRatioRow4 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow4["Risk Categories"] = "Operational Risk";
            cet1CapitalRatioRow4["Composite Risk Score"] = CramCalculationsCet1.CompositeRiskScoreOperationalRisk();
            cet1CapitalRatioRow4["Risk Rating"] = CramCalculationsCet1.RiskRatingOperationalRisk();
            cet1CapitalRatioRow4["Risk-Weighting"] = Math.Round(CramCalculationsCet1.RiskWeightingOperationalRisk().Value, 2) + "%";
            cet1CapitalRatioRow4["Capital Risk Buffer"] = Math.Round(CramCalculationsCet1.CapitalRiskBufferOperationalRisk().Value, 2) + "%";
            cet1CapitalRatioRow4["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.WeightedRiskBufferOperationalRisk().Value, 2) + "%";
            cet1CapitalRatioRow4["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.Cet1CapitalOperationalRisk());

            cet1CapitalRatioRow4["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowOperationalRisk());
            cet1CapitalRatioRow4["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowModerateOperationalRisk());
            cet1CapitalRatioRow4["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateOperationalRisk());
            cet1CapitalRatioRow4["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateHighOperationalRisk());
            cet1CapitalRatioRow4["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.HighOperationalRisk());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow4);

            DataRow cet1CapitalRatioRow5 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow5["Risk Categories"] = "Compliance Risk";
            cet1CapitalRatioRow5["Composite Risk Score"] = CramCalculationsCet1.CompositeRiskScoreComplianceRisk();
            cet1CapitalRatioRow5["Risk Rating"] = CramCalculationsCet1.RiskRatingComplianceRisk();
            cet1CapitalRatioRow5["Risk-Weighting"] = Math.Round(CramCalculationsCet1.RiskWeightingComplianceRisk().Value, 2) + "%";
            cet1CapitalRatioRow5["Capital Risk Buffer"] = Math.Round(CramCalculationsCet1.CapitalRiskBufferComplianceRisk().Value, 2) + "%";
            cet1CapitalRatioRow5["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.WeightedRiskBufferComplianceRisk().Value, 2) + "%";
            cet1CapitalRatioRow5["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.Cet1CapitalComplianceRisk());

            cet1CapitalRatioRow5["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowComplianceRisk());
            cet1CapitalRatioRow5["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowModerateComplianceRisk());
            cet1CapitalRatioRow5["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateComplianceRisk());
            cet1CapitalRatioRow5["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateHighComplianceRisk());
            cet1CapitalRatioRow5["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.HighComplianceRisk());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow5);

            DataRow cet1CapitalRatioRow6 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow6["Risk Categories"] = "Strategic Risk";
            cet1CapitalRatioRow6["Composite Risk Score"] = CramCalculationsCet1.CompositeRiskScoreStrategicRisk();
            cet1CapitalRatioRow6["Risk Rating"] = CramCalculationsCet1.RiskRatingStrategicRisk();
            cet1CapitalRatioRow6["Risk-Weighting"] = Math.Round(CramCalculationsCet1.RiskWeightingStrategicRisk().Value, 2) + "%";
            cet1CapitalRatioRow6["Capital Risk Buffer"] = Math.Round(CramCalculationsCet1.CapitalRiskBufferStrategicRisk().Value, 2) + "%";
            cet1CapitalRatioRow6["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.WeightedRiskBufferStrategicRisk().Value, 2) + "%";
            cet1CapitalRatioRow6["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.Cet1CapitalStrategicRisk());

            cet1CapitalRatioRow6["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowStrategicRisk());
            cet1CapitalRatioRow6["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowModerateStrategicRisk());
            cet1CapitalRatioRow6["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateStrategicRisk());
            cet1CapitalRatioRow6["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateHighStrategicRisk());
            cet1CapitalRatioRow6["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.HighStrategicRisk());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow6);

            DataRow cet1CapitalRatioRow7 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow7["Risk Categories"] = "Reputation Risk";
            cet1CapitalRatioRow7["Composite Risk Score"] = CramCalculationsCet1.CompositeRiskScoreReputationRisk();
            cet1CapitalRatioRow7["Risk Rating"] = CramCalculationsCet1.RiskRatingReputationRisk();
            cet1CapitalRatioRow7["Risk-Weighting"] = Math.Round(CramCalculationsCet1.RiskWeightingReputationRisk().Value, 2) + "%";
            cet1CapitalRatioRow7["Capital Risk Buffer"] = Math.Round(CramCalculationsCet1.CapitalRiskBufferReputationRisk().Value, 2) + "%";
            cet1CapitalRatioRow7["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.WeightedRiskBufferReputationRisk().Value, 2) + "%";
            cet1CapitalRatioRow7["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.Cet1CapitalReputationRisk());

            cet1CapitalRatioRow7["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowReputationRisk());
            cet1CapitalRatioRow7["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowModerateReputationRisk());
            cet1CapitalRatioRow7["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateReputationRisk());
            cet1CapitalRatioRow7["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateHighReputationRisk());
            cet1CapitalRatioRow7["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.HighReputationRisk());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow7);

            DataRow cet1CapitalRatioRow8 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow8["Risk Categories"] = "Total:";
            cet1CapitalRatioRow8["Composite Risk Score"] = Math.Round(CramCalculationsCet1.TotalCompositeRiskScore().Value,2);
            cet1CapitalRatioRow8["Risk Rating"] = string.Empty;
            cet1CapitalRatioRow8["Risk-Weighting"] = Math.Round(CramCalculationsCet1.TotalRiskWeighting().Value, 2) + "%";
            cet1CapitalRatioRow8["Capital Risk Buffer"] = string.Empty;
            cet1CapitalRatioRow8["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.TotalWeightedRiskBuffer().Value, 2) + "%";
            cet1CapitalRatioRow8["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.TotalCet1Capital());

            cet1CapitalRatioRow8["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowTotal());
            cet1CapitalRatioRow8["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.LowModerateTotal());
            cet1CapitalRatioRow8["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateTotal());
            cet1CapitalRatioRow8["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ModerateHighTotal());
            cet1CapitalRatioRow8["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.HighTotal());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow8);

            cet1CapitalRatio.Rows.Add(cet1CapitalRatio.NewRow());

            DataRow cet1CapitalRatioRow9 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow9["Risk Categories"] = "Common Equity Tier 1 Capital";
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow9);

            DataRow cet1CapitalRatioRow10 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow10["Risk Categories"] = "Regulatory Minimum (PCA Well-Capitalized) for CET1 Capital Ratio";
            cet1CapitalRatioRow10["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.RegulatoryMinimumWeightedRiskBuffer().Value, 2) + "%";
            cet1CapitalRatioRow10["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.RegulatoryMinimumCapital());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow10);

            DataRow cet1CapitalRatioRow11 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow11["Risk Categories"] = "Implied Minimum for CET1 Capital Ratio Based on Risk Assessment";
            cet1CapitalRatioRow11["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.ImpliedMinimumWeightedRiskBuffer().Value, 2) + "%";
            cet1CapitalRatioRow11["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ImpliedMinimumCapital());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow11);

            DataRow cet1CapitalRatioRow12 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow12["Risk Categories"] = "Bank’s Minimum (Policy) for CET1 Capital Ratio";
            cet1CapitalRatioRow12["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.BanksMinimumWeightedRiskBuffer().Value, 2) + "%";
            cet1CapitalRatioRow12["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.BanksMinimumCapital());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow12);

            DataRow cet1CapitalRatioRow13 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow13["Risk Categories"] = "Risk Assessment Buffer:  Bank's Minimum (Policy) Less Implied Minimum";
            cet1CapitalRatioRow13["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.BanksMinimumLessImpliedMinimumWeightedRiskBuffer().Value, 2) + "%";
            cet1CapitalRatioRow13["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.BanksMinimumLessImpliedMinimumCapital());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow13);

            cet1CapitalRatio.Rows.Add(cet1CapitalRatio.NewRow());

            DataRow cet1CapitalRatioRow14 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow14["Risk Categories"] = "Bank’s CET1 Capital Ratio";
            cet1CapitalRatioRow14["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.BanksCet1CapitalRatioWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow14["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.BanksCet1CapitalRatioCapital());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow14);

            DataRow cet1CapitalRatioRow15 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow15["Risk Categories"] = "Risk Assessment Buffer:  CET1 Capital Less Implied Minimum";
            cet1CapitalRatioRow15["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.RiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow15["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.RiskAssessBufferCet1CapitalLessImpliedMinCapital());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow15);

            cet1CapitalRatio.Rows.Add(cet1CapitalRatio.NewRow());

            DataRow cet1CapitalRatioRow16 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow16["Risk Categories"] = "Common Equity Tier 1 Capital Summary";
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow16);

            DataRow cet1CapitalRatioRow17 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow17["Risk Categories"] = "Regulatory Minimum (PCA Well-Capitalized)";
            cet1CapitalRatioRow17["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.RegulatoryMinimumWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow17["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.RegulatoryMinimumCapital());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow17);

            DataRow tier1LeverageRatioRow18 = cet1CapitalRatio.NewRow();
            tier1LeverageRatioRow18["Risk Categories"] = "Buffer:  Implied Minimum Less PCA Well-Capitalized";
            tier1LeverageRatioRow18["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.BufferImpliedMinimumWeightedRiskBuffer().Value, 4) + "%";
            tier1LeverageRatioRow18["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.BufferImpliedMinimumCapital());
            cet1CapitalRatio.Rows.Add(tier1LeverageRatioRow18);

            DataRow cet1CapitalRatioRow19 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow19["Risk Categories"] = "Buffer:  Bank's Minimum (Policy) Less Implied Minimum";
            cet1CapitalRatioRow19["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.BufferBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow19["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.BufferBanksMinimumCapital());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow19);

            DataRow cet1CapitalRatioRow20 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow20["Risk Categories"] = "Buffer:  Actual Tier 1 Leverage Less Bank's Minimum (Policy)";
            cet1CapitalRatioRow20["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.Cet1CapitalLessBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow20["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.Cet1CapitalLessBanksMinimumCapital());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow20);

            DataRow cet1CapitalRatioRow21 = cet1CapitalRatio.NewRow();
            cet1CapitalRatioRow21["Risk Categories"] = "Actual CET1 Capital Ratio";
            cet1CapitalRatioRow21["Weighted Risk Buffer"] = Math.Round(CramCalculationsCet1.ActualCet1CapitalRatioWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow21["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsCet1.ActualCet1CapitalRatioCapital());
            cet1CapitalRatio.Rows.Add(cet1CapitalRatioRow21);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return cet1CapitalRatio;
        }
        private DataTable Tier1CapitalRatio()
        {
            DataTable tier1CapitalRatio = new DataTable();
            tier1CapitalRatio.TableName = "Tier 1 Capital Ratio";
            try
            { 
            //Tier 1 Leverage Ratio columns
            tier1CapitalRatio.Columns.Add("Risk Categories");
            tier1CapitalRatio.Columns.Add("Composite Risk Score");
            tier1CapitalRatio.Columns.Add("Risk Rating");
            tier1CapitalRatio.Columns.Add("Risk-Weighting");
            tier1CapitalRatio.Columns.Add("Capital Risk Buffer");
            tier1CapitalRatio.Columns.Add("Weighted Risk Buffer");
            tier1CapitalRatio.Columns.Add("Tier 1 Capital (000)");
            tier1CapitalRatio.Columns.Add(" ");
            tier1CapitalRatio.Columns.Add("LOW");
            tier1CapitalRatio.Columns.Add("LOW - MOD");
            tier1CapitalRatio.Columns.Add("MODERATE");
            tier1CapitalRatio.Columns.Add("MOD-HIGH");
            tier1CapitalRatio.Columns.Add("HIGH");

            DataRow tier1CapitalRatioRow1 = tier1CapitalRatio.NewRow();
            tier1CapitalRatioRow1["Risk Categories"] = "Credit Risk";
            tier1CapitalRatioRow1["Composite Risk Score"] = CramCalculationsTier1.CompositeRiskScoreCreditRisk();
            tier1CapitalRatioRow1["Risk Rating"] = CramCalculationsTier1.RiskRatingCreditRisk();
            tier1CapitalRatioRow1["Risk-Weighting"] = Math.Round(CramCalculationsTier1.RiskWeightingCreditRisk().Value, 2) + "%";
            tier1CapitalRatioRow1["Capital Risk Buffer"] = Math.Round(CramCalculationsTier1.CapitalRiskBufferCreditRisk().Value, 2) + "%";
            tier1CapitalRatioRow1["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.WeightedRiskBufferCreditRisk().Value, 2) + "%";
            tier1CapitalRatioRow1["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.Tier1CapitalCreditRisk());

            tier1CapitalRatioRow1["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowCreditRisk());
            tier1CapitalRatioRow1["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowModerateCreditRisk());
            tier1CapitalRatioRow1["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateCreditRisk());
            tier1CapitalRatioRow1["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateHighCreditRisk());
            tier1CapitalRatioRow1["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.HighCreditRisk());
            tier1CapitalRatio.Rows.Add(tier1CapitalRatioRow1);

            DataRow tier1CapitalRatioRow2 = tier1CapitalRatio.NewRow();
            tier1CapitalRatioRow2["Risk Categories"] = "Interest Rate Risk";
            tier1CapitalRatioRow2["Composite Risk Score"] = CramCalculationsTier1.CompositeRiskScoreInterestRateRisk();
            tier1CapitalRatioRow2["Risk Rating"] = CramCalculationsTier1.RiskRatingInterestRateRisk();
            tier1CapitalRatioRow2["Risk-Weighting"] = Math.Round(CramCalculationsTier1.RiskWeightingInterestRateRisk().Value, 2) + "%";
            tier1CapitalRatioRow2["Capital Risk Buffer"] = Math.Round(CramCalculationsTier1.CapitalRiskBufferInterestRateRisk().Value, 2) + "%";
            tier1CapitalRatioRow2["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.WeightedRiskBufferInterestRateRisk().Value, 2) + "%";
            tier1CapitalRatioRow2["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.Tier1CapitalInterestRateRisk());

            tier1CapitalRatioRow2["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowInterestRateRisk());
            tier1CapitalRatioRow2["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowModerateInterestRateRisk());
            tier1CapitalRatioRow2["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateInterestRateRisk());
            tier1CapitalRatioRow2["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateHighInterestRateRisk());
            tier1CapitalRatioRow2["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.HighInterestRateRisk());
            tier1CapitalRatio.Rows.Add(tier1CapitalRatioRow2);

            DataRow tier1CapitalRatioRow3 = tier1CapitalRatio.NewRow();
            tier1CapitalRatioRow3["Risk Categories"] = "Liquidity Risk";
            tier1CapitalRatioRow3["Composite Risk Score"] = CramCalculationsTier1.CompositeRiskScoreLiquidityRisk();
            tier1CapitalRatioRow3["Risk Rating"] = CramCalculationsTier1.RiskRatingLiquidityRisk();
            tier1CapitalRatioRow3["Risk-Weighting"] = Math.Round(CramCalculationsTier1.RiskWeightingLiquidityRisk().Value, 2) + "%";
            tier1CapitalRatioRow3["Capital Risk Buffer"] = Math.Round(CramCalculationsTier1.CapitalRiskBufferLiquidityRisk().Value, 2) + "%";
            tier1CapitalRatioRow3["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.WeightedRiskBufferLiquidityRisk().Value, 2) + "%";
            tier1CapitalRatioRow3["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.Tier1CapitalLiquidityRisk());

            tier1CapitalRatioRow3["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowLiquidityRisk());
            tier1CapitalRatioRow3["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowModerateLiquidityRisk());
            tier1CapitalRatioRow3["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateLiquidityRisk());
            tier1CapitalRatioRow3["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateHighLiquidityRisk());
            tier1CapitalRatioRow3["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.HighLiquidityRisk());
            tier1CapitalRatio.Rows.Add(tier1CapitalRatioRow3);

            DataRow tier1CapitalRatioRow5 = tier1CapitalRatio.NewRow();
            tier1CapitalRatioRow5["Risk Categories"] = "Operational Risk";
            tier1CapitalRatioRow5["Composite Risk Score"] = CramCalculationsTier1.CompositeRiskScoreOperationalRisk();
            tier1CapitalRatioRow5["Risk Rating"] = CramCalculationsTier1.RiskRatingOperationalRisk();
            tier1CapitalRatioRow5["Risk-Weighting"] = Math.Round(CramCalculationsTier1.RiskWeightingOperationalRisk().Value, 2) + "%";
            tier1CapitalRatioRow5["Capital Risk Buffer"] = Math.Round(CramCalculationsTier1.CapitalRiskBufferOperationalRisk().Value, 2) + "%";
            tier1CapitalRatioRow5["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.WeightedRiskBufferOperationalRisk().Value, 2) + "%";
            tier1CapitalRatioRow5["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.Tier1CapitalOperationalRisk());

            tier1CapitalRatioRow5["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowOperationalRisk());
            tier1CapitalRatioRow5["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowModerateOperationalRisk());
            tier1CapitalRatioRow5["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateOperationalRisk());
            tier1CapitalRatioRow5["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateHighOperationalRisk());
            tier1CapitalRatioRow5["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.HighOperationalRisk());
            tier1CapitalRatio.Rows.Add(tier1CapitalRatioRow5);

            DataRow tier1CapitalRatioRow6 = tier1CapitalRatio.NewRow();
            tier1CapitalRatioRow6["Risk Categories"] = "Compliance Risk";
            tier1CapitalRatioRow6["Composite Risk Score"] = CramCalculationsTier1.CompositeRiskScoreComplianceRisk();
            tier1CapitalRatioRow6["Risk Rating"] = CramCalculationsTier1.RiskRatingComplianceRisk();
            tier1CapitalRatioRow6["Risk-Weighting"] = Math.Round(CramCalculationsTier1.RiskWeightingComplianceRisk().Value, 2) + "%";
            tier1CapitalRatioRow6["Capital Risk Buffer"] = Math.Round(CramCalculationsTier1.CapitalRiskBufferComplianceRisk().Value, 2) + "%";
            tier1CapitalRatioRow6["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.WeightedRiskBufferComplianceRisk().Value, 2) + "%";
            tier1CapitalRatioRow6["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.Tier1CapitalComplianceRisk());

            tier1CapitalRatioRow6["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowComplianceRisk());
            tier1CapitalRatioRow6["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowModerateComplianceRisk());
            tier1CapitalRatioRow6["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateComplianceRisk());
            tier1CapitalRatioRow6["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateHighComplianceRisk());
            tier1CapitalRatioRow6["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.HighComplianceRisk());
            tier1CapitalRatio.Rows.Add(tier1CapitalRatioRow6);

            DataRow tier1CapitalRatioRow7 = tier1CapitalRatio.NewRow();
            tier1CapitalRatioRow7["Risk Categories"] = "Strategic Risk";
            tier1CapitalRatioRow7["Composite Risk Score"] = CramCalculationsTier1.CompositeRiskScoreStrategicRisk();
            tier1CapitalRatioRow7["Risk Rating"] = CramCalculationsTier1.RiskRatingStrategicRisk();
            tier1CapitalRatioRow7["Risk-Weighting"] = Math.Round(CramCalculationsTier1.RiskWeightingStrategicRisk().Value, 2) + "%";
            tier1CapitalRatioRow7["Capital Risk Buffer"] = Math.Round(CramCalculationsTier1.CapitalRiskBufferStrategicRisk().Value, 2) + "%";
            tier1CapitalRatioRow7["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.WeightedRiskBufferStrategicRisk().Value, 2) + "%";
            tier1CapitalRatioRow7["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.Tier1CapitalStrategicRisk());

            tier1CapitalRatioRow7["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowStrategicRisk());
            tier1CapitalRatioRow7["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowModerateStrategicRisk());
            tier1CapitalRatioRow7["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateStrategicRisk());
            tier1CapitalRatioRow7["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateHighStrategicRisk());
            tier1CapitalRatioRow7["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.HighStrategicRisk());
            tier1CapitalRatio.Rows.Add(tier1CapitalRatioRow7);

            DataRow tier1CapitalRatioRow8 = tier1CapitalRatio.NewRow();
            tier1CapitalRatioRow8["Risk Categories"] = "Reputation Risk";
            tier1CapitalRatioRow8["Composite Risk Score"] = CramCalculationsTier1.CompositeRiskScoreReputationRisk();
            tier1CapitalRatioRow8["Risk Rating"] = CramCalculationsTier1.RiskRatingReputationRisk();
            tier1CapitalRatioRow8["Risk-Weighting"] = Math.Round(CramCalculationsTier1.RiskWeightingReputationRisk().Value, 2) + "%";
            tier1CapitalRatioRow8["Capital Risk Buffer"] = Math.Round(CramCalculationsTier1.CapitalRiskBufferReputationRisk().Value, 2) + "%";
            tier1CapitalRatioRow8["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.WeightedRiskBufferReputationRisk().Value, 2) + "%";
            tier1CapitalRatioRow8["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.Tier1CapitalReputationRisk());

            tier1CapitalRatioRow8["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowReputationRisk());
            tier1CapitalRatioRow8["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowModerateReputationRisk());
            tier1CapitalRatioRow8["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateReputationRisk());
            tier1CapitalRatioRow8["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateHighReputationRisk());
            tier1CapitalRatioRow8["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.HighReputationRisk());
            tier1CapitalRatio.Rows.Add(tier1CapitalRatioRow8);

            DataRow tier1CapitalRatioRow9 = tier1CapitalRatio.NewRow();
            tier1CapitalRatioRow9["Risk Categories"] = "Total:";
            tier1CapitalRatioRow9["Composite Risk Score"] = Math.Round(CramCalculationsTier1.TotalCompositeRiskScore().Value,2);
            tier1CapitalRatioRow9["Risk Rating"] = string.Empty;
            tier1CapitalRatioRow9["Risk-Weighting"] = Math.Round(CramCalculationsTier1.TotalRiskWeighting().Value, 2) + "%";
            tier1CapitalRatioRow9["Capital Risk Buffer"] = string.Empty;
            tier1CapitalRatioRow9["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.TotalWeightedRiskBuffer().Value, 2) + "%";
            tier1CapitalRatioRow9["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.TotalTier1Capital());

            tier1CapitalRatioRow9["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowTotal());
            tier1CapitalRatioRow9["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.LowModerateTotal());
            tier1CapitalRatioRow9["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateTotal());
            tier1CapitalRatioRow9["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ModerateHighTotal());
            tier1CapitalRatioRow9["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.HighTotal());
            tier1CapitalRatio.Rows.Add(tier1CapitalRatioRow9);

            tier1CapitalRatio.Rows.Add(tier1CapitalRatio.NewRow());

            DataRow cet1CapitalRatioRow10 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow10["Risk Categories"] = "Tier 1 Capital";
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow10);

            DataRow cet1CapitalRatioRow11 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow11["Risk Categories"] = "Regulatory Minimum (PCA Well-Capitalized) for Tier 1 RBC Ratio";
            cet1CapitalRatioRow11["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.RegulatoryMinimumWeightedRiskBuffer().Value, 2) + "%";
            cet1CapitalRatioRow11["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.RegulatoryMinimumCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow11);

            DataRow cet1CapitalRatioRow12 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow12["Risk Categories"] = "Implied Minimum for Tier 1 RBC Ratio Based on Risk Assessment";
            cet1CapitalRatioRow12["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.ImpliedMinimumWeightedRiskBuffer().Value, 2) + "%";
            cet1CapitalRatioRow12["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ImpliedMinimumCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow12);

            DataRow cet1CapitalRatioRow13 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow13["Risk Categories"] = "Bank’s Minimum (Policy) for Tier 1 RBC Ratio";
            cet1CapitalRatioRow13["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.BanksMinimumWeightedRiskBuffer().Value, 2) + "%";
            cet1CapitalRatioRow13["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.BanksMinimumCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow13);

            DataRow cet1CapitalRatioRow14 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow14["Risk Categories"] = "Risk Assessment Buffer:  Bank's Minimum (Policy) Less Implied Minimum";
            cet1CapitalRatioRow14["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.BanksMinimumLessImpliedMinimumWeightedRiskBuffer().Value, 2) + "%";
            cet1CapitalRatioRow14["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.BanksMinimumLessImpliedMinimumCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow14);

            tier1CapitalRatio.Rows.Add(tier1CapitalRatio.NewRow());

            DataRow cet1CapitalRatioRow15 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow15["Risk Categories"] = "Bank’s Tier 1 RBC Ratio";
            cet1CapitalRatioRow15["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.BanksTier1CapitalRatioWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow15["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.BanksTier1CapitalRatioCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow15);

            DataRow cet1CapitalRatioRow16 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow16["Risk Categories"] = "Risk Assessment Buffer:  Tier 1 Capital Less Implied Minimum ";
            cet1CapitalRatioRow16["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow16["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.RiskAssessBufferTier1CapitalLessImpliedMinCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow16);

            tier1CapitalRatio.Rows.Add(tier1CapitalRatio.NewRow());

            DataRow cet1CapitalRatioRow17 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow17["Risk Categories"] = "Tier 1 Capital Summary";
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow17);


            DataRow cet1CapitalRatioRow18 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow18["Risk Categories"] = "Regulatory Minimum (PCA Well-Capitalized)";
            cet1CapitalRatioRow18["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.RegulatoryMinimumWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow18["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.RegulatoryMinimumCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow18);

            DataRow cet1CapitalRatioRow19 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow19["Risk Categories"] = "Buffer:  Implied Minimum Less PCA Well-Capitalized";
            cet1CapitalRatioRow19["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.BufferImpliedMinimumWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow19["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.BufferImpliedMinimumCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow19);

           
            DataRow cet1CapitalRatioRow20 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow20["Risk Categories"] = "Buffer:  Bank's Minimum (Policy) Less Implied Minimum";
            cet1CapitalRatioRow20["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.BufferBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow20["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.BufferBanksMinimumCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow20);

            DataRow cet1CapitalRatioRow21 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow21["Risk Categories"] = "Buffer:  Actual Tier 1 Capital Less Bank's Minimum (Policy)";
            cet1CapitalRatioRow21["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.Tier1CapitalLessBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            cet1CapitalRatioRow21["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.Tier1CapitalLessBanksMinimumCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow21);

            DataRow cet1CapitalRatioRow22 = tier1CapitalRatio.NewRow();
            cet1CapitalRatioRow22["Risk Categories"] = "Actual Tier 1 Risk-Based Capital Ratio";
            cet1CapitalRatioRow22["Weighted Risk Buffer"] = Math.Round(CramCalculationsTier1.ActualTier1CapitalRatio().Value, 4) + "%";
            cet1CapitalRatioRow22["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTier1.ActualTier1CapitalRatioCapital());
            tier1CapitalRatio.Rows.Add(cet1CapitalRatioRow22);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return tier1CapitalRatio;
        }
        private DataTable TotalCapitalRatio()
        {
            DataTable totalCapitalRatio = new DataTable();
            totalCapitalRatio.TableName = "Total Capital Ratio";
            try
            { 
            //Tier 1 Leverage Ratio columns
            totalCapitalRatio.Columns.Add("Risk Categories");
            totalCapitalRatio.Columns.Add("Composite Risk Score");
            totalCapitalRatio.Columns.Add("Risk Rating");
            totalCapitalRatio.Columns.Add("Risk-Weighting");
            totalCapitalRatio.Columns.Add("Capital Risk Buffer");
            totalCapitalRatio.Columns.Add("Weighted Risk Buffer");
            totalCapitalRatio.Columns.Add("Tier 1 Capital (000)");
            totalCapitalRatio.Columns.Add(" ");
            totalCapitalRatio.Columns.Add("LOW");
            totalCapitalRatio.Columns.Add("LOW - MOD");
            totalCapitalRatio.Columns.Add("MODERATE");
            totalCapitalRatio.Columns.Add("MOD-HIGH");
            totalCapitalRatio.Columns.Add("HIGH");


            DataRow totalCapitalRatioRow1 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow1["Risk Categories"] = "Credit Risk";
            totalCapitalRatioRow1["Composite Risk Score"] = CramCalculationsTotalCapital.CompositeRiskScoreCreditRisk();
            totalCapitalRatioRow1["Risk Rating"] = CramCalculationsTotalCapital.RiskRatingCreditRisk();
            totalCapitalRatioRow1["Risk-Weighting"] = Math.Round(CramCalculationsTotalCapital.RiskWeightingCreditRisk().Value, 2) + "%";
            totalCapitalRatioRow1["Capital Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.CapitalRiskBufferCreditRisk().Value, 2) + "%";
            totalCapitalRatioRow1["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.WeightedRiskBufferCreditRisk().Value, 2) + "%";
            totalCapitalRatioRow1["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.TotalCapitalCreditRisk());

            totalCapitalRatioRow1["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowCreditRisk());
            totalCapitalRatioRow1["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowModerateCreditRisk());
            totalCapitalRatioRow1["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateCreditRisk());
            totalCapitalRatioRow1["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateHighCreditRisk());
            totalCapitalRatioRow1["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.HighCreditRisk());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow1);

            DataRow totalCapitalRatioRow2 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow2["Risk Categories"] = "Interest Rate Risk";
            totalCapitalRatioRow2["Composite Risk Score"] = CramCalculationsTotalCapital.CompositeRiskScoreInterestRateRisk();
            totalCapitalRatioRow2["Risk Rating"] = CramCalculationsTotalCapital.RiskRatingInterestRateRisk();
            totalCapitalRatioRow2["Risk-Weighting"] = Math.Round(CramCalculationsTotalCapital.RiskWeightingInterestRateRisk().Value, 2) + "%";
            totalCapitalRatioRow2["Capital Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.CapitalRiskBufferInterestRateRisk().Value, 2) + "%";
            totalCapitalRatioRow2["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.WeightedRiskBufferInterestRateRisk().Value, 2) + "%";
            totalCapitalRatioRow2["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.TotalCapitalInterestRateRisk());

            totalCapitalRatioRow2["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowInterestRateRisk());
            totalCapitalRatioRow2["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowModerateInterestRateRisk());
            totalCapitalRatioRow2["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateInterestRateRisk());
            totalCapitalRatioRow2["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateHighInterestRateRisk());
            totalCapitalRatioRow2["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.HighInterestRateRisk());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow2);

            DataRow totalCapitalRatioRow3 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow3["Risk Categories"] = "Liquidity Risk";
            totalCapitalRatioRow3["Composite Risk Score"] = CramCalculationsTotalCapital.CompositeRiskScoreLiquidityRisk();
            totalCapitalRatioRow3["Risk Rating"] = CramCalculationsTotalCapital.RiskRatingLiquidityRisk();
            totalCapitalRatioRow3["Risk-Weighting"] = Math.Round(CramCalculationsTotalCapital.RiskWeightingLiquidityRisk().Value, 2) + "%";
            totalCapitalRatioRow3["Capital Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.CapitalRiskBufferLiquidityRisk().Value, 2) + "%";
            totalCapitalRatioRow3["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.WeightedRiskBufferLiquidityRisk().Value, 2) + "%";
            totalCapitalRatioRow3["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.TotalCapitalLiquidityRisk());

            totalCapitalRatioRow3["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowLiquidityRisk());
            totalCapitalRatioRow3["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowModerateLiquidityRisk());
            totalCapitalRatioRow3["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateLiquidityRisk());
            totalCapitalRatioRow3["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateHighLiquidityRisk());
            totalCapitalRatioRow3["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.HighLiquidityRisk());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow3);

            DataRow totalCapitalRatioRow4 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow4["Risk Categories"] = "Operational Risk";
            totalCapitalRatioRow4["Composite Risk Score"] = CramCalculationsTotalCapital.CompositeRiskScoreOperationalRisk();
            totalCapitalRatioRow4["Risk Rating"] = CramCalculationsTotalCapital.RiskRatingOperationalRisk();
            totalCapitalRatioRow4["Risk-Weighting"] = Math.Round(CramCalculationsTotalCapital.RiskWeightingOperationalRisk().Value, 2) + "%";
            totalCapitalRatioRow4["Capital Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.CapitalRiskBufferOperationalRisk().Value, 2) + "%";
            totalCapitalRatioRow4["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.WeightedRiskBufferOperationalRisk().Value, 2) + "%";
            totalCapitalRatioRow4["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.TotalCapitalOperationalRisk());

            totalCapitalRatioRow4["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowOperationalRisk());
            totalCapitalRatioRow4["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowModerateOperationalRisk());
            totalCapitalRatioRow4["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateOperationalRisk());
            totalCapitalRatioRow4["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateHighOperationalRisk());
            totalCapitalRatioRow4["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.HighOperationalRisk());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow4);

            DataRow totalCapitalRatioRow5 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow5["Risk Categories"] = "Compliance Risk";
            totalCapitalRatioRow5["Composite Risk Score"] = CramCalculationsTotalCapital.CompositeRiskScoreComplianceRisk();
            totalCapitalRatioRow5["Risk Rating"] = CramCalculationsTotalCapital.RiskRatingComplianceRisk();
            totalCapitalRatioRow5["Risk-Weighting"] = Math.Round(CramCalculationsTotalCapital.RiskWeightingComplianceRisk().Value, 2) + "%";
            totalCapitalRatioRow5["Capital Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.CapitalRiskBufferComplianceRisk().Value, 2) + "%";
            totalCapitalRatioRow5["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.WeightedRiskBufferComplianceRisk().Value, 2) + "%";
            totalCapitalRatioRow5["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.TotalCapitalComplianceRisk());

            totalCapitalRatioRow5["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowComplianceRisk());
            totalCapitalRatioRow5["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowModerateComplianceRisk());
            totalCapitalRatioRow5["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateComplianceRisk());
            totalCapitalRatioRow5["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateHighComplianceRisk());
            totalCapitalRatioRow5["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.HighComplianceRisk());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow5);

            DataRow totalCapitalRatioRow6 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow6["Risk Categories"] = "Strategic Risk";
            totalCapitalRatioRow6["Composite Risk Score"] = CramCalculationsTotalCapital.CompositeRiskScoreStrategicRisk();
            totalCapitalRatioRow6["Risk Rating"] = CramCalculationsTotalCapital.RiskRatingStrategicRisk();
            totalCapitalRatioRow6["Risk-Weighting"] = Math.Round(CramCalculationsTotalCapital.RiskWeightingStrategicRisk().Value, 2) + "%";
            totalCapitalRatioRow6["Capital Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.CapitalRiskBufferStrategicRisk().Value, 2) + "%";
            totalCapitalRatioRow6["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.WeightedRiskBufferStrategicRisk().Value, 2) + "%";
            totalCapitalRatioRow6["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.TotalCapitalStrategicRisk());

            totalCapitalRatioRow6["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowStrategicRisk());
            totalCapitalRatioRow6["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowModerateStrategicRisk());
            totalCapitalRatioRow6["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateStrategicRisk());
            totalCapitalRatioRow6["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateHighStrategicRisk());
            totalCapitalRatioRow6["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.HighStrategicRisk());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow6);

            DataRow totalCapitalRatioRow7 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow7["Risk Categories"] = "Reputation Risk";
            totalCapitalRatioRow7["Composite Risk Score"] = CramCalculationsTotalCapital.CompositeRiskScoreReputationRisk();
            totalCapitalRatioRow7["Risk Rating"] = CramCalculationsTotalCapital.RiskRatingReputationRisk();
            totalCapitalRatioRow7["Risk-Weighting"] = Math.Round(CramCalculationsTotalCapital.RiskWeightingReputationRisk().Value, 2) + "%";
            totalCapitalRatioRow7["Capital Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.CapitalRiskBufferReputationRisk().Value, 2) + "%";
            totalCapitalRatioRow7["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.WeightedRiskBufferReputationRisk().Value, 2) + "%";
            totalCapitalRatioRow7["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.TotalCapitalReputationRisk());

            totalCapitalRatioRow7["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowReputationRisk());
            totalCapitalRatioRow7["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowModerateReputationRisk());
            totalCapitalRatioRow7["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateReputationRisk());
            totalCapitalRatioRow7["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateHighReputationRisk());
            totalCapitalRatioRow7["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.HighReputationRisk());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow7);

            DataRow totalCapitalRatioRow8 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow8["Risk Categories"] = "Total:";
            totalCapitalRatioRow8["Composite Risk Score"] = Math.Round(CramCalculationsTotalCapital.TotalCompositeRiskScore().Value,2);
            totalCapitalRatioRow8["Risk Rating"] = string.Empty;
            totalCapitalRatioRow8["Risk-Weighting"] = Math.Round(CramCalculationsTotalCapital.TotalRiskWeighting().Value, 2) + "%";
            totalCapitalRatioRow8["Capital Risk Buffer"] = string.Empty;
            totalCapitalRatioRow8["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.TotalWeightedRiskBuffer().Value, 2) + "%";
            totalCapitalRatioRow8["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.TotalTotalCapital());

            totalCapitalRatioRow8["LOW"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowTotal());
            totalCapitalRatioRow8["LOW - MOD"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.LowModerateTotal());
            totalCapitalRatioRow8["MODERATE"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateTotal());
            totalCapitalRatioRow8["MOD-HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ModerateHighTotal());
            totalCapitalRatioRow8["HIGH"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.HighTotal());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow8);

            totalCapitalRatio.Rows.Add(totalCapitalRatio.NewRow());

            DataRow totalCapitalRatioRow9 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow9["Risk Categories"] = "Total Capital";
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow9);

            DataRow totalCapitalRatioRow10 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow10["Risk Categories"] = "Regulatory Minimum (PCA Well-Capitalized) for Total Capital Ratio";
            totalCapitalRatioRow10["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.RegulatoryMinimumWeightedRiskBuffer().Value, 2) + "%";
            totalCapitalRatioRow10["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.RegulatoryMinimumCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow10);

            DataRow totalCapitalRatioRow11 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow11["Risk Categories"] = "Implied Minimum for Total Capital Ratio Based on Risk Assessment";
            totalCapitalRatioRow11["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.ImpliedMinimumWeightedRiskBuffer().Value, 2) + "%";
            totalCapitalRatioRow11["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ImpliedMinimumCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow11);

            DataRow totalCapitalRatioRow12 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow12["Risk Categories"] = "Bank’s Minimum (Policy) for Total Capital Ratio";
            totalCapitalRatioRow12["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.BanksMinimumWeightedRiskBuffer().Value, 2) + "%";
            totalCapitalRatioRow12["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.BanksMinimumCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow12);

            DataRow totalCapitalRatioRow13 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow13["Risk Categories"] = "Risk Assessment Buffer:  Bank's Minimum (Policy) Less Implied Minimum";
            totalCapitalRatioRow13["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.BanksMinimumLessImpliedMinimumWeightedRiskBuffer().Value, 2) + "%";
            totalCapitalRatioRow13["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.BanksMinimumLessImpliedMinimumCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow13);

            totalCapitalRatio.Rows.Add(totalCapitalRatio.NewRow());

            DataRow totalCapitalRatioRow14 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow14["Risk Categories"] = "Bank’s Total Capital Ratio";
            totalCapitalRatioRow14["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.BanksTotalCapitalRatioWeightedRiskBuffer().Value, 4) + "%";
            totalCapitalRatioRow14["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.BanksTotalCapitalRatioCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow14);

            DataRow totalCapitalRatioRow15 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow15["Risk Categories"] = "Risk Assessment Buffer:  Total Capital Less Implied Minimum";
            totalCapitalRatioRow15["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.RiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer().Value, 4) + "%";
            totalCapitalRatioRow15["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.RiskAssessBufferTotalCapitalLessImpliedMinCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow15);

            totalCapitalRatio.Rows.Add(totalCapitalRatio.NewRow());

            DataRow totalCapitalRatioRow16 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow16["Risk Categories"] = "Total Capital Summary";
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow16);

            DataRow totalCapitalRatioRow17 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow17["Risk Categories"] = "Regulatory Minimum (PCA Well-Capitalized)";
            totalCapitalRatioRow17["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.RegulatoryMinimumWeightedRiskBuffer().Value, 4) + "%";
            totalCapitalRatioRow17["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.RegulatoryMinimumCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow17);

            DataRow totalCapitalRatioRow18 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow18["Risk Categories"] = "Buffer:  Implied Minimum Less PCA Well-Capitalized";
            totalCapitalRatioRow18["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.BufferImpliedMinimumWeightedRiskBuffer().Value, 4) + "%";
            totalCapitalRatioRow18["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.BufferImpliedMinimumCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow18);

            DataRow totalCapitalRatioRow19 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow19["Risk Categories"] = "Buffer:  Bank's Minimum (Policy) Less Implied Minimum";
            totalCapitalRatioRow19["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.BufferBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            totalCapitalRatioRow19["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.BufferBanksMinimumCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow19);

            DataRow totalCapitalRatioRow20 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow20["Risk Categories"] = "Buffer:  Actual Total Capital Less Bank's Minimum (Policy)";
            totalCapitalRatioRow20["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.TotalCapitalLessBanksMinimumWeightedRiskBuffer().Value, 4) + "%";
            totalCapitalRatioRow20["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.TotalCapitalLessBanksMinimumCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow20);

            DataRow totalCapitalRatioRow21 = totalCapitalRatio.NewRow();
            totalCapitalRatioRow21["Risk Categories"] = "Actual Total Capital Ratio";
            totalCapitalRatioRow21["Weighted Risk Buffer"] = Math.Round(CramCalculationsTotalCapital.ActualTotalCapitalRatioWeightedRiskBuffer().Value, 4) + "%";
            totalCapitalRatioRow21["Tier 1 Capital (000)"] = "$" + string.Format("{0:#,##0}", CramCalculationsTotalCapital.ActualTotalCapitalRatioCapital());
            totalCapitalRatio.Rows.Add(totalCapitalRatioRow21);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return totalCapitalRatio;
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
