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
using System.Net.Http.Headers;
using CBR.Web.ExportToExcel;

namespace CBR.Web.Controllers.Api
{
    public class StrategicForecastApiController : ApiController
    {
        [HttpGet]
        public int GetEffectiveYear()
        {
            int strategicYear = 0;
            try
            {
                string lastQuarter = CommonFunctions.GetLastQuarterString();
                string year = lastQuarter.Substring(0, 4);
                strategicYear = Convert.ToInt32(year);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return strategicYear;
        }

        [HttpPost]
        public long SaveOrUpdateModel(StrategicForecastInput modelObj)
        {
            long newModelIdOrUpdatedRows = 0;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                DataTable createScenarioParams = new DataTable();
                createScenarioParams.Columns.Add("ScenarioKey", typeof(long));
                createScenarioParams.Columns.Add("MetricKey", typeof(Decimal));
                createScenarioParams.Columns.Add("PriorYear", typeof(Decimal));
                createScenarioParams.Columns.Add("CurrentYearYTD", typeof(Decimal));
                createScenarioParams.Columns.Add("Year0", typeof(Decimal));
                createScenarioParams.Columns.Add("Year1", typeof(Decimal));
                createScenarioParams.Columns.Add("Year2", typeof(Decimal));
                createScenarioParams.Columns.Add("Year3", typeof(Decimal));
                createScenarioParams.Columns.Add("Year4", typeof(Decimal));
                createScenarioParams.Columns.Add("Year5", typeof(Decimal));
                createScenarioParams.Columns.Add("IsActive", typeof(bool));

                SqlParameter scenarioKey = new SqlParameter("@ScenarioKey", SqlDbType.BigInt);
                if (modelObj.ModelKey == null)
                    scenarioKey.Value = DBNull.Value;
                else
                    scenarioKey.Value = modelObj.ModelKey;

                SqlParameter scenarioName = new SqlParameter("@ScenarioName", SqlDbType.VarChar);
                scenarioName.Value = modelObj.ModelName;

                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.BigInt);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);

                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                SqlParameter taskType = new SqlParameter("@TaskType", SqlDbType.VarChar);

                if (modelObj.ModelKey == null)
                    taskType.Value = "Insert";
                else
                    taskType.Value = "Update";

                newModelIdOrUpdatedRows = ent.Database.SqlQuery<Int64>("exec dbo.uspRptAppStrategicForecastScenarioUpdate @ScenarioKey, @ScenarioName, @TenantKey, @UserKey, @TaskType", scenarioKey, scenarioName, tenantKey, userKey, taskType).First();
                long? effectiveScenarioKey = 0;
                if (modelObj.ModelKey == null)
                    effectiveScenarioKey = newModelIdOrUpdatedRows;
                else
                    effectiveScenarioKey = modelObj.ModelKey;

                createScenarioParams.Rows.Add(effectiveScenarioKey, 1, null, null, modelObj.AssetGrowthRateYear0, modelObj.AssetGrowthRateYear1, modelObj.AssetGrowthRateYear2, modelObj.AssetGrowthRateYear3, modelObj.AssetGrowthRateYear4, modelObj.AssetGrowthRateYear5, false);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 2, null, null, modelObj.NetIncomeYear0, modelObj.NetIncomeYear1, modelObj.NetIncomeYear2, modelObj.NetIncomeYear3, modelObj.NetIncomeYear4, modelObj.NetIncomeYear5, modelObj.UseNetIncomeInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 3, null, null, modelObj.ReturnOnAverageAssetsYear0, modelObj.ReturnOnAverageAssetsYear1, modelObj.ReturnOnAverageAssetsYear2, modelObj.ReturnOnAverageAssetsYear3, modelObj.ReturnOnAverageAssetsYear4, modelObj.ReturnOnAverageAssetsYear5, false);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 4, null, null, modelObj.DividendsYear0, modelObj.DividendsYear1, modelObj.DividendsYear2, modelObj.DividendsYear3, modelObj.DividendsYear4, modelObj.DividendsYear5, modelObj.UseCashDividendsInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 5, null, null, modelObj.DividendsRateYear0, modelObj.DividendsRateYear1, modelObj.DividendsRateYear2, modelObj.DividendsRateYear3, modelObj.DividendsRateYear4, modelObj.DividendsRateYear5, false);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 6, null, null, modelObj.NewCapitalYear0, modelObj.NewCapitalYear1, modelObj.NewCapitalYear2, modelObj.NewCapitalYear3, modelObj.NewCapitalYear4, modelObj.NewCapitalYear5, modelObj.UseNewCapitalInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 7, null, null, modelObj.PricePerShareYear0, modelObj.PricePerShareYear1, modelObj.PricePerShareYear2, modelObj.PricePerShareYear3, modelObj.PricePerShareYear4, modelObj.PricePerShareYear5, modelObj.UseNewCapitalInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 8, null, null, modelObj.NewAcquisitionAssetsYear0, modelObj.NewAcquisitionAssetsYear1, modelObj.NewAcquisitionAssetsYear2, modelObj.NewAcquisitionAssetsYear3, modelObj.NewAcquisitionAssetsYear4, modelObj.NewAcquisitionAssetsYear5, modelObj.UseNewCapitalInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 9, null, null, modelObj.Cet1CapitalAdjustmentYear0, modelObj.Cet1CapitalAdjustmentYear1, modelObj.Cet1CapitalAdjustmentYear2, modelObj.Cet1CapitalAdjustmentYear3, modelObj.Cet1CapitalAdjustmentYear4, modelObj.Cet1CapitalAdjustmentYear5, modelObj.UseCet1CapitalAdjustmentInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 10, null, null, modelObj.Tier1CapitalAdjustmentYear0, modelObj.Tier1CapitalAdjustmentYear1, modelObj.Tier1CapitalAdjustmentYear2, modelObj.Tier1CapitalAdjustmentYear3, modelObj.Tier1CapitalAdjustmentYear4, modelObj.Tier1CapitalAdjustmentYear5, modelObj.UseTier1CapitalAdjustmentInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 11, null, null, modelObj.Tier2CapitalYear0, modelObj.Tier2CapitalYear1, modelObj.Tier2CapitalYear2, modelObj.Tier2CapitalYear3, modelObj.Tier2CapitalYear4, modelObj.Tier2CapitalYear5, modelObj.UseTier2CapitalInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 12, null, null, modelObj.RiskWeightedAssetsYear0, modelObj.RiskWeightedAssetsYear1, modelObj.RiskWeightedAssetsYear2, modelObj.RiskWeightedAssetsYear3, modelObj.RiskWeightedAssetsYear4, modelObj.RiskWeightedAssetsYear5, modelObj.UseRiskWeightedAssetsInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 13, null, null, modelObj.TotalAssetsLeverageYear0, modelObj.TotalAssetsLeverageYear1, modelObj.TotalAssetsLeverageYear2, modelObj.TotalAssetsLeverageYear3, modelObj.TotalAssetsLeverageYear4, modelObj.TotalAssetsLeverageYear5, modelObj.UseTotalAssetsForLeverageInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 14, modelObj.SharesOutstandingActualPriorYear, modelObj.SharesOutstandingActualCurrentQuarter, modelObj.SharesOutstandingActualYear0, modelObj.SharesOutstandingActualYear1, modelObj.SharesOutstandingActualYear2, modelObj.SharesOutstandingActualYear3, modelObj.SharesOutstandingActualYear4, modelObj.SharesOutstandingActualYear5, modelObj.UseSharesOutstandingInput);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 15, null, null, null, null, null, null, false);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 16, null, null, null, null, null, null, false);
                createScenarioParams.Rows.Add(effectiveScenarioKey, 17, null, null, null, null, null, null, false);

                SqlParameter tenantKey1 = new SqlParameter("@TenantKey", SqlDbType.BigInt);
                tenantKey1.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);

                SqlParameter userKey1 = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userKey1.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                SqlParameter taskType1 = new SqlParameter("@TaskType", SqlDbType.VarChar);

                if (modelObj.ModelKey == null)
                    taskType1.Value = "Insert";
                else
                    taskType1.Value = "Update";

                SqlParameter createScenario = new SqlParameter("@ScenarioData", SqlDbType.Structured);
                createScenario.Value = createScenarioParams;
                createScenario.TypeName = "dbo.StrategicForecatScenarioInput";
                ent.Database.CommandTimeout = 600;

                var result = ent.Database.SqlQuery<Int64>("exec dbo.uspRptAppStrategicForecastInputDataUpdate @ScenarioData, @UserKey, @TenantKey, @TaskType", createScenario, userKey1, tenantKey1, taskType1).First();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return newModelIdOrUpdatedRows;
        }

        [HttpGet]
        public List<StrategicForecastModel> GetModels()
        {
            List<StrategicForecastModel> models = null;
            try
            {
                long usrKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var usersScenarios = ent.AppStrategicForecastScenarios.Where(obj => obj.UserKey == usrKey).OrderBy(obj => obj.ScenarioName).ToList();
                if (usersScenarios != null && usersScenarios.Count > 0)
                {
                    models = new List<StrategicForecastModel>();
                    foreach (AppStrategicForecastScenario scenario in usersScenarios)
                    {
                        StrategicForecastModel sfModel = new StrategicForecastModel();
                        sfModel.IsSelected = false;
                        sfModel.ModelKey = scenario.ScenarioKey;
                        sfModel.ModelName = scenario.ScenarioName;
                        sfModel.ModelOwner = UtilityFunctions.GetUserName(scenario.UserKey);
                        models.Add(sfModel);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return models;
        }

        //uspRptGetAppStrategicForecastInputData
        [HttpPost]
        public StrategicForecastInput GetModelDetails(StrategicForecastModelReq modelRequest)
        {
            StrategicForecastInput modelInput = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();

                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.BigInt);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);

                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                SqlParameter scenarioKey = new SqlParameter("@ScenarioKey", SqlDbType.BigInt);
                scenarioKey.Value = modelRequest.ScenarioKey;

                SqlParameter institutionKey = new SqlParameter("@InstitutionKey", SqlDbType.BigInt);
                institutionKey.Value = modelRequest.InstitutionKey;

                var scenarioData = ent.Database.SqlQuery<StrategicForecastModelData>("exec uspRptGetAppStrategicForecastInputData @TenantKey, @UserKey, @ScenarioKey, @InstitutionKey", tenantKey, userKey, scenarioKey, institutionKey).ToList();

                if (scenarioData != null && scenarioData.Count > 0)
                {
                    modelInput = new StrategicForecastInput();
                    foreach (StrategicForecastModelData modelData in scenarioData)
                    {
                        switch (modelData.Order)
                        {
                            case 1:
                                modelInput.AssetGrowthRatePriorYear = modelData.PriorYear;
                                modelInput.AssetGrowthRateCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.AssetGrowthRateYear0 = modelData.Year0;
                                modelInput.AssetGrowthRateYear1 = modelData.Year1;
                                modelInput.AssetGrowthRateYear2 = modelData.Year2;
                                modelInput.AssetGrowthRateYear3 = modelData.Year3;
                                modelInput.AssetGrowthRateYear4 = modelData.Year4;
                                modelInput.AssetGrowthRateYear5 = modelData.Year5;
                                break;
                            case 2:
                                modelInput.NetIncomePriorYear = modelData.PriorYear;
                                modelInput.NetIncomeCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.NetIncomeYear0 = modelData.Year0;
                                modelInput.NetIncomeYear1 = modelData.Year1;
                                modelInput.NetIncomeYear2 = modelData.Year2;
                                modelInput.NetIncomeYear3 = modelData.Year3;
                                modelInput.NetIncomeYear4 = modelData.Year4;
                                modelInput.NetIncomeYear5 = modelData.Year5;
                                modelInput.UseNetIncomeInput = modelData.IsActive;
                                break;
                            case 3:
                                modelInput.ReturnOnAverageAssetsPriorYear = modelData.PriorYear;
                                modelInput.ReturnOnAverageAssetsCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.ReturnOnAverageAssetsYear0 = modelData.Year0;
                                modelInput.ReturnOnAverageAssetsYear1 = modelData.Year1;
                                modelInput.ReturnOnAverageAssetsYear2 = modelData.Year2;
                                modelInput.ReturnOnAverageAssetsYear3 = modelData.Year3;
                                modelInput.ReturnOnAverageAssetsYear4 = modelData.Year4;
                                modelInput.ReturnOnAverageAssetsYear5 = modelData.Year5;
                                break;
                            case 4:
                                modelInput.DividendsPriorYear = modelData.PriorYear;
                                modelInput.DividendsCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.DividendsYear0 = modelData.Year0;
                                modelInput.DividendsYear1 = modelData.Year1;
                                modelInput.DividendsYear2 = modelData.Year2;
                                modelInput.DividendsYear3 = modelData.Year3;
                                modelInput.DividendsYear4 = modelData.Year4;
                                modelInput.DividendsYear5 = modelData.Year5;
                                modelInput.UseCashDividendsInput = modelData.IsActive;
                                break;
                            case 5:
                                modelInput.DividendsRatePriorYear = modelData.PriorYear;
                                modelInput.DividendsRateCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.DividendsRateYear0 = modelData.Year0;
                                modelInput.DividendsRateYear1 = modelData.Year1;
                                modelInput.DividendsRateYear2 = modelData.Year2;
                                modelInput.DividendsRateYear3 = modelData.Year3;
                                modelInput.DividendsRateYear4 = modelData.Year4;
                                modelInput.DividendsRateYear5 = modelData.Year5;
                                break;
                            case 6:
                                modelInput.NewCapitalPriorYear = modelData.PriorYear;
                                modelInput.NewCapitalCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.NewCapitalYear0 = modelData.Year0;
                                modelInput.NewCapitalYear1 = modelData.Year1;
                                modelInput.NewCapitalYear2 = modelData.Year2;
                                modelInput.NewCapitalYear3 = modelData.Year3;
                                modelInput.NewCapitalYear4 = modelData.Year4;
                                modelInput.NewCapitalYear5 = modelData.Year5;
                                modelInput.UseNewCapitalInput = modelData.IsActive;
                                break;
                            case 7:
                                modelInput.PricePerSharePriorYear = modelData.PriorYear;
                                modelInput.PricePerShareCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.PricePerShareYear0 = modelData.Year0;
                                modelInput.PricePerShareYear1 = modelData.Year1;
                                modelInput.PricePerShareYear2 = modelData.Year2;
                                modelInput.PricePerShareYear3 = modelData.Year3;
                                modelInput.PricePerShareYear4 = modelData.Year4;
                                modelInput.PricePerShareYear5 = modelData.Year5;
                                break;
                            case 8:
                                modelInput.NewAcquisitionAssetsPriorYear = modelData.PriorYear;
                                modelInput.NewAcquisitionAssetsCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.NewAcquisitionAssetsYear0 = modelData.Year0;
                                modelInput.NewAcquisitionAssetsYear1 = modelData.Year1;
                                modelInput.NewAcquisitionAssetsYear2 = modelData.Year2;
                                modelInput.NewAcquisitionAssetsYear3 = modelData.Year3;
                                modelInput.NewAcquisitionAssetsYear4 = modelData.Year4;
                                modelInput.NewAcquisitionAssetsYear5 = modelData.Year5;
                                break;
                            case 9:
                                modelInput.Cet1CapitalAdjustmentPriorYear = modelData.PriorYear;
                                modelInput.Cet1CapitalAdjustmentCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.Cet1CapitalAdjustmentYear0 = modelData.Year0;
                                modelInput.Cet1CapitalAdjustmentYear1 = modelData.Year1;
                                modelInput.Cet1CapitalAdjustmentYear2 = modelData.Year2;
                                modelInput.Cet1CapitalAdjustmentYear3 = modelData.Year3;
                                modelInput.Cet1CapitalAdjustmentYear4 = modelData.Year4;
                                modelInput.Cet1CapitalAdjustmentYear5 = modelData.Year5;
                                modelInput.UseCet1CapitalAdjustmentInput = modelData.IsActive;
                                break;
                            case 10:
                                modelInput.Tier1CapitalAdjustmentPriorYear = modelData.PriorYear;
                                modelInput.Tier1CapitalAdjustmentCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.Tier1CapitalAdjustmentYear0 = modelData.Year0;
                                modelInput.Tier1CapitalAdjustmentYear1 = modelData.Year1;
                                modelInput.Tier1CapitalAdjustmentYear2 = modelData.Year2;
                                modelInput.Tier1CapitalAdjustmentYear3 = modelData.Year3;
                                modelInput.Tier1CapitalAdjustmentYear4 = modelData.Year4;
                                modelInput.Tier1CapitalAdjustmentYear5 = modelData.Year5;
                                modelInput.UseTier1CapitalAdjustmentInput = modelData.IsActive;
                                break;
                            case 11:
                                modelInput.Tier2CapitalPriorYear = modelData.PriorYear;
                                modelInput.Tier2CapitalCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.Tier2CapitalYear0 = modelData.Year0;
                                modelInput.Tier2CapitalYear1 = modelData.Year1;
                                modelInput.Tier2CapitalYear2 = modelData.Year2;
                                modelInput.Tier2CapitalYear3 = modelData.Year3;
                                modelInput.Tier2CapitalYear4 = modelData.Year4;
                                modelInput.Tier2CapitalYear5 = modelData.Year5;
                                modelInput.UseTier2CapitalInput = modelData.IsActive;
                                break;
                            case 12:
                                modelInput.RiskWeightedAssetsPriorYear = modelData.PriorYear;
                                modelInput.RiskWeightedAssetsCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.RiskWeightedAssetsYear0 = modelData.Year0;
                                modelInput.RiskWeightedAssetsYear1 = modelData.Year1;
                                modelInput.RiskWeightedAssetsYear2 = modelData.Year2;
                                modelInput.RiskWeightedAssetsYear3 = modelData.Year3;
                                modelInput.RiskWeightedAssetsYear4 = modelData.Year4;
                                modelInput.RiskWeightedAssetsYear5 = modelData.Year5;
                                modelInput.UseRiskWeightedAssetsInput = modelData.IsActive;
                                break;
                            case 13:
                                modelInput.TotalAssetsLeveragePriorYear = modelData.PriorYear;
                                modelInput.TotalAssetsLeverageCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.TotalAssetsLeverageYear0 = modelData.Year0;
                                modelInput.TotalAssetsLeverageYear1 = modelData.Year1;
                                modelInput.TotalAssetsLeverageYear2 = modelData.Year2;
                                modelInput.TotalAssetsLeverageYear3 = modelData.Year3;
                                modelInput.TotalAssetsLeverageYear4 = modelData.Year4;
                                modelInput.TotalAssetsLeverageYear5 = modelData.Year5;
                                modelInput.UseTotalAssetsForLeverageInput = modelData.IsActive;
                                break;
                            case 14:
                                modelInput.SharesOutstandingActualPriorYear = modelData.PriorYear;
                                modelInput.SharesOutstandingActualCurrentQuarter = modelData.CurrentYearYTD;
                                modelInput.SharesOutstandingActualYear0 = modelData.Year0;
                                modelInput.SharesOutstandingActualYear1 = modelData.Year1;
                                modelInput.SharesOutstandingActualYear2 = modelData.Year2;
                                modelInput.SharesOutstandingActualYear3 = modelData.Year3;
                                modelInput.SharesOutstandingActualYear4 = modelData.Year4;
                                modelInput.SharesOutstandingActualYear5 = modelData.Year5;
                                modelInput.UseSharesOutstandingInput = modelData.IsActive;
                                break;
                            case 15:
                                modelInput.Tier2CapitalToTier1PriorYear = modelData.PriorYear;
                                modelInput.Tier2CapitalToTier1CurrentQuarter = modelData.CurrentYearYTD;
                                break;
                            case 16:
                                modelInput.RiskWeightedAssetsToAssetsPriorYear = modelData.PriorYear;
                                modelInput.RiskWeightedAssetsToAssetsCurrentQuarter = modelData.CurrentYearYTD;
                                break;
                            case 17:
                                modelInput.AssetsForLeverageToAssetsPriorYear = modelData.PriorYear;
                                modelInput.AssetsForLeverageToAssetsCurrentQuarter = modelData.CurrentYearYTD;
                                break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return modelInput;
        }

        [HttpPost]
        public StrategicForecastDashboardConcepts GetDashboardConcepts(StrategicForecastModelReq modelRequest)
        {
            StrategicForecastDashboardConcepts dashboardConcepts = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("@InstitutionKey", SqlDbType.BigInt);
                institutionKey.Value = modelRequest.InstitutionKey;

                var scenarioData = ent.Database.SqlQuery<StrategicForecastModelData>("exec uspRptStrategicForecastDashboardConcepts @InstitutionKey", institutionKey).ToList();
                if (scenarioData != null && scenarioData.Count > 0)
                {
                    dashboardConcepts = new StrategicForecastDashboardConcepts();

                    dashboardConcepts.NetIncomePriorYear = scenarioData.Where(c => c.UBPRConceptCode == "RIAD4340").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RIAD4340").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.NetIncomeCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "RIAD4340").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RIAD4340").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.DividendsPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "CALC0176").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "CALC0176").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.DividendsCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "CALC0176").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "CALC0176").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.BankEquityCapitalPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "RCON3210").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCON3210").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.BankEquityCapitalCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "RCON3210").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCON3210").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.Cet1CapitalAdjustmentPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "RCOAP865").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCOAP865").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.Cet1CapitalAdjustmentCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "RCOAP865").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCOAP865").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.Cet1CapitalPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "RCOAP859").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCOAP859").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.Cet1CapitalCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "RCOAP859").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCOAP859").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.Tier1CapitalAdjustmentPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "CALC0177").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "CALC0177").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.Tier1CapitalAdjustmentCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "CALC0177").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "CALC0177").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.Tier1CapitalPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "RCON8274").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCON8274").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.Tier1CapitalCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "RCON8274").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCON8274").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.Tier2CapitalPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "RCON5311").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCON5311").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.Tier2CapitalCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "RCON5311").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCON5311").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.TotalRiskBasedCapitalPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "RCON3792").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCON3792").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.TotalRiskBasedCapitalCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "RCON3792").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCON3792").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.RiskWeightedAssetsPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "RCONA223").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCONA223").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.RiskWeightedAssetsCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "RCONA223").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCONA223").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.TotalAssetsForLeveragePriorYear = scenarioData.Where(c => c.UBPRConceptCode == "RCONL138").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCONL138").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.TotalAssetsForLeverageCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "RCONL138").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCONL138").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.TotalAssetsPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "RCON2170").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCON2170").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.TotalAssetsCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "RCON2170").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "RCON2170").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.Cet1CapitalRatioPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "UBPRR029").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRR029").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.Cet1CapitalRatioCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "UBPRR029").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRR029").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.Tier1RBCRatioPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "UBPRD487").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRD487").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.Tier1RBCRatioCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "UBPRD487").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRD487").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.TotalRBCRatioPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "UBPRD488").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRD488").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.TotalRBCRatioCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "UBPRD488").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRD488").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.Tier1LeverageRatioPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "UBPRD486").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRD486").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.Tier1LeverageRatioCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "UBPRD486").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRD486").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.AssetGrowthRatePriorYear = scenarioData.Where(c => c.UBPRConceptCode == "CALC0006").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "CALC0006").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.AssetGrowthRateCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "CALC0006").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "CALC0006").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.ReturnOnAverageAssetsPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "UBPRE013").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRE013").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.ReturnOnAverageAssetsCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "UBPRE013").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRE013").ToList()?[0]?.CurrentYearYTD : null;
                    dashboardConcepts.ReturnOnAverageEquityPriorYear = scenarioData.Where(c => c.UBPRConceptCode == "UBPRE630").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRE630").ToList()?[0]?.PriorYear : null;
                    dashboardConcepts.ReturnOnAverageEquityCurrentQuarter = scenarioData.Where(c => c.UBPRConceptCode == "UBPRE630").Any() ? scenarioData.Where(c => c.UBPRConceptCode == "UBPRE630").ToList()?[0]?.CurrentYearYTD : null;

                    //dashboardConcepts.NetIncomePriorYear = scenarioData[0].PriorYear;
                    //dashboardConcepts.NetIncomeCurrentQuarter = scenarioData[0].CurrentYearYTD;
                    //dashboardConcepts.DividendsPriorYear = scenarioData[1].PriorYear;
                    //dashboardConcepts.DividendsCurrentQuarter = scenarioData[1].CurrentYearYTD;
                    //dashboardConcepts.BankEquityCapitalPriorYear = scenarioData[2].PriorYear;
                    //dashboardConcepts.BankEquityCapitalCurrentQuarter = scenarioData[2].CurrentYearYTD;
                    //dashboardConcepts.Cet1CapitalAdjustmentPriorYear = scenarioData[3].PriorYear;
                    //dashboardConcepts.Cet1CapitalAdjustmentCurrentQuarter = scenarioData[3].CurrentYearYTD;
                    //dashboardConcepts.Cet1CapitalPriorYear = scenarioData[4].PriorYear;
                    //dashboardConcepts.Cet1CapitalCurrentQuarter = scenarioData[4].CurrentYearYTD;
                    //dashboardConcepts.Tier1CapitalAdjustmentPriorYear = scenarioData[5].PriorYear;
                    //dashboardConcepts.Tier1CapitalAdjustmentCurrentQuarter = scenarioData[5].CurrentYearYTD;
                    //dashboardConcepts.Tier1CapitalPriorYear = scenarioData[6].PriorYear;
                    //dashboardConcepts.Tier1CapitalCurrentQuarter = scenarioData[6].CurrentYearYTD;
                    //dashboardConcepts.Tier2CapitalPriorYear = scenarioData[7].PriorYear;
                    //dashboardConcepts.Tier2CapitalCurrentQuarter = scenarioData[7].CurrentYearYTD;
                    //dashboardConcepts.TotalRiskBasedCapitalPriorYear = scenarioData[8].PriorYear;
                    //dashboardConcepts.TotalRiskBasedCapitalCurrentQuarter = scenarioData[8].CurrentYearYTD;
                    //dashboardConcepts.RiskWeightedAssetsPriorYear = scenarioData[9].PriorYear;
                    //dashboardConcepts.RiskWeightedAssetsCurrentQuarter = scenarioData[9].CurrentYearYTD;
                    //dashboardConcepts.TotalAssetsForLeveragePriorYear = scenarioData[10].PriorYear;
                    //dashboardConcepts.TotalAssetsForLeverageCurrentQuarter = scenarioData[10].CurrentYearYTD;
                    //dashboardConcepts.TotalAssetsPriorYear = scenarioData[11].PriorYear;
                    //dashboardConcepts.TotalAssetsCurrentQuarter = scenarioData[11].CurrentYearYTD;
                    //dashboardConcepts.Cet1CapitalRatioPriorYear = scenarioData[12].PriorYear;
                    //dashboardConcepts.Cet1CapitalRatioCurrentQuarter = scenarioData[12].CurrentYearYTD;
                    //dashboardConcepts.Tier1RBCRatioPriorYear = scenarioData[13].PriorYear;
                    //dashboardConcepts.Tier1RBCRatioCurrentQuarter = scenarioData[13].CurrentYearYTD;
                    //dashboardConcepts.TotalRBCRatioPriorYear = scenarioData[14].PriorYear;
                    //dashboardConcepts.TotalRBCRatioCurrentQuarter = scenarioData[14].CurrentYearYTD;
                    //dashboardConcepts.Tier1LeverageRatioPriorYear = scenarioData[15].PriorYear;
                    //dashboardConcepts.Tier1LeverageRatioCurrentQuarter = scenarioData[15].CurrentYearYTD;
                    //dashboardConcepts.AssetGrowthRatePriorYear = scenarioData[16].PriorYear;
                    //dashboardConcepts.AssetGrowthRateCurrentQuarter = scenarioData[16].CurrentYearYTD;
                    //dashboardConcepts.ReturnOnAverageAssetsPriorYear = scenarioData[17].PriorYear;
                    //dashboardConcepts.ReturnOnAverageAssetsCurrentQuarter = scenarioData[17].CurrentYearYTD;
                    //dashboardConcepts.ReturnOnAverageEquityPriorYear = scenarioData[18].PriorYear;
                    //dashboardConcepts.ReturnOnAverageEquityCurrentQuarter = scenarioData[18].CurrentYearYTD;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return dashboardConcepts;
        }

        [HttpGet]
        public bool DoesUserHaveExistingScenarios()
        {
            bool userHaveScenarios = false;
            try
            {
                long usrKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var usersScenarios = ent.AppStrategicForecastScenarios.Where(obj => obj.UserKey == usrKey).ToList();
                if (usersScenarios != null && usersScenarios.Count > 0)
                {
                    userHaveScenarios = true;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return userHaveScenarios;
        }

        [HttpGet]
        public StrategicForecastDates GetStrategicDates()
        {
            StrategicForecastDates forecastDates = new StrategicForecastDates();
            string lastQuarter = CommonFunctions.GetLastQuarterString();
            string month = lastQuarter.Substring(4, 2);
            string year = lastQuarter.Substring(0, 4);
            string day = lastQuarter.Substring(6, 2);
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));
            DateTime priorYear = DateTime.MinValue;
            DateTime year0 = DateTime.MinValue;

            if (Convert.ToInt32(month) == 12)
            {
                priorYear = new DateTime((latestQuarterDate.Year), 12, 31);
                year0 = new DateTime(latestQuarterDate.Year, 12, 31).AddMonths(12);
            }
            else
            {
                priorYear = new DateTime((latestQuarterDate.Year - 1), 12, 31);
                year0 = new DateTime(latestQuarterDate.Year, 12, 31);
            }

            DateTime year1 = year0.AddMonths(12);
            DateTime year2 = year1.AddMonths(12);
            DateTime year3 = year2.AddMonths(12);
            DateTime year4 = year3.AddMonths(12);
            DateTime year5 = year4.AddMonths(12);

            forecastDates.CurrentYear = latestQuarterDate.ToString("MM/dd/yyyy");
            forecastDates.PriorYear = priorYear.ToString("MM/dd/yyyy");
            forecastDates.Year0 = year0.ToString("MM/dd/yyyy");
            forecastDates.Year1 = year1.ToString("MM/dd/yyyy");
            forecastDates.Year2 = year2.ToString("MM/dd/yyyy");
            forecastDates.Year3 = year3.ToString("MM/dd/yyyy");
            forecastDates.Year4 = year4.ToString("MM/dd/yyyy");
            forecastDates.Year5 = year5.ToString("MM/dd/yyyy");

            forecastDates.CurrentYear = forecastDates.CurrentYear.Replace('/', '-');
            forecastDates.PriorYear = forecastDates.PriorYear.Replace('/', '-');
            forecastDates.Year0 = forecastDates.Year0.Replace('/', '-');
            forecastDates.Year1 = forecastDates.Year1.Replace('/', '-');
            forecastDates.Year2 = forecastDates.Year2.Replace('/', '-');
            forecastDates.Year3 = forecastDates.Year3.Replace('/', '-');
            forecastDates.Year4 = forecastDates.Year4.Replace('/', '-');
            forecastDates.Year5 = forecastDates.Year5.Replace('/', '-');

            return forecastDates;
        }

        private object[] GetInputDataParams(int metricKey, StrategicForecastInput modelObj, long? effectiveScenarioKey)
        {
            object[] inputDataParams = new object[8];
            inputDataParams[0] = effectiveScenarioKey;
            inputDataParams[1] = metricKey;

            switch (metricKey)
            {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
                case 8:
                    break;
                case 9:
                    break;
                case 10:
                    break;
                case 11:
                    break;
                case 12:
                    break;
                case 13:
                    break;
                case 14:
                    break;
                case 15:
                    break;
                case 16:
                    break;
                case 17:
                    break;
            }
            return inputDataParams;
        }
        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage ExportToExcelForecastAndValueTabs(StrategicForecastModelReq dashboardParam)
        {
            byte[] excelBytes = null;
            try
            {
                StrategicForecastInput modelDetails = GetModelDetails(dashboardParam);
                StrategicForecastDashboardConcepts dashboardConcepts = GetDashboardConcepts(dashboardParam);
                StrategicForecastDates getStrategicDates = GetStrategicDates();
                List<StrategicForecastModel> getModels = GetModels();
                var modelName = getModels.FirstOrDefault(obj => obj.ModelKey == dashboardParam.ScenarioKey);
                StrategicForecastForecastCalculations strategicForecastForecastCalculations = null;
                StrategicForecastValueCalculations strategicForecastValueCalculations = null;
                if (modelDetails != null && dashboardConcepts != null)
                {
                    strategicForecastForecastCalculations = new StrategicForecastForecastCalculations(modelDetails, dashboardConcepts);
                    strategicForecastValueCalculations = new StrategicForecastValueCalculations(modelDetails, dashboardConcepts);
                }

                DataTable forecastData = this.ForecastData(getStrategicDates, modelDetails, strategicForecastForecastCalculations);
                DataTable forecastValue = this.ForecastValue(getStrategicDates, modelDetails, strategicForecastValueCalculations);

                BankProfileOverviewParams bankdata = new BankProfileOverviewParams();
                bankdata.InstitutionKey = Convert.ToInt32(dashboardParam.InstitutionKey);
                var Bankfinalres = this.GetBankProfileIntroductionData(bankdata);

                DataTable[] metricArr = new DataTable[2];
                metricArr[0] = forecastData;
                metricArr[1] = forecastValue;
                excelBytes = StrategicForecastExportToExcel.CreateExcelDocument(metricArr, "CapitalRiskAnalyzer.xlsx", Bankfinalres, modelName.ModelName);
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
            result.Content.Headers.ContentDisposition.FileName = "StrategicForecast.xlsx";
            result.Content.Headers.ContentDisposition.Size = excelBytes.Length;
            return result;
        }

        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage ExportToExcelStrategicForecastSummary(StrategicForecastModelReq dashboardParam)
        {
            byte[] excelBytes = null;
            try
            {
                List<StrategicForecastInput> listModels = new List<StrategicForecastInput>();
                List<StrategicForecastModel> getModels = GetModels();
                StrategicForecastModel modelName1 = null;
                StrategicForecastModel modelName2 = null;
                StrategicForecastModel modelName3 = null;
                StrategicForecastModel modelName4 = null;
                StrategicForecastModel modelName5 = null;
                StrategicForecastModel modelName6 = null;
                StrategicForecastModel modelName7 = null;
                StrategicForecastModel modelName8 = null;
                StrategicForecastInput modelDetails1 = null;
                StrategicForecastInput modelDetails2 = null;
                StrategicForecastInput modelDetails3 = null;
                StrategicForecastInput modelDetails4 = null;
                StrategicForecastInput modelDetails5 = null;
                StrategicForecastInput modelDetails6 = null;
                StrategicForecastInput modelDetails7 = null;
                StrategicForecastInput modelDetails8 = null;
                if (dashboardParam.SelectedSFScenario1ModelKey > 0)
                {
                    StrategicForecastModelReq params1 = new StrategicForecastModelReq();
                    params1.InstitutionKey = dashboardParam.InstitutionKey;
                    params1.ScenarioKey = dashboardParam.SelectedSFScenario1ModelKey;
                    modelDetails1 = GetModelDetails(params1);
                    listModels.Add(modelDetails1);
                    modelName1 = getModels.FirstOrDefault(obj => obj.ModelKey == dashboardParam.SelectedSFScenario1ModelKey);
                }
                else
                {
                    listModels.Add(modelDetails1);
                }
                if (dashboardParam.SelectedSFScenario2ModelKey > 0)
                {
                    StrategicForecastModelReq params2 = new StrategicForecastModelReq();
                    params2.InstitutionKey = dashboardParam.InstitutionKey;
                    params2.ScenarioKey = dashboardParam.SelectedSFScenario2ModelKey;
                    modelDetails2 = GetModelDetails(params2);
                    listModels.Add(modelDetails2);
                    modelName2 = getModels.FirstOrDefault(obj => obj.ModelKey == dashboardParam.SelectedSFScenario2ModelKey);
                }
                else
                {
                    listModels.Add(modelDetails2);
                }
                if (dashboardParam.SelectedSFScenario3ModelKey > 0)
                {
                    StrategicForecastModelReq params3 = new StrategicForecastModelReq();
                    params3.InstitutionKey = dashboardParam.InstitutionKey;
                    params3.ScenarioKey = dashboardParam.SelectedSFScenario3ModelKey;
                    modelDetails3 = GetModelDetails(params3);
                    listModels.Add(modelDetails3);
                    modelName3 = getModels.FirstOrDefault(obj => obj.ModelKey == dashboardParam.SelectedSFScenario3ModelKey);
                }
                else
                {
                    listModels.Add(modelDetails3);
                }
                if (dashboardParam.SelectedSFScenario4ModelKey > 0)
                {
                    StrategicForecastModelReq params4 = new StrategicForecastModelReq();
                    params4.InstitutionKey = dashboardParam.InstitutionKey;
                    params4.ScenarioKey = dashboardParam.SelectedSFScenario4ModelKey;
                    modelDetails4 = GetModelDetails(params4);
                    listModels.Add(modelDetails4);
                    modelName4 = getModels.FirstOrDefault(obj => obj.ModelKey == dashboardParam.SelectedSFScenario4ModelKey);
                }
                else
                {
                    listModels.Add(modelDetails4);
                }
                if (dashboardParam.SelectedSFScenario5ModelKey > 0)
                {
                    StrategicForecastModelReq params5 = new StrategicForecastModelReq();
                    params5.InstitutionKey = dashboardParam.InstitutionKey;
                    params5.ScenarioKey = dashboardParam.SelectedSFScenario5ModelKey;
                    modelDetails5 = GetModelDetails(params5);
                    listModels.Add(modelDetails5);
                    modelName5 = getModels.FirstOrDefault(obj => obj.ModelKey == dashboardParam.SelectedSFScenario5ModelKey);
                }
                else
                {
                    listModels.Add(modelDetails5);
                }
                if (dashboardParam.SelectedSFScenario6ModelKey > 0)
                {
                    StrategicForecastModelReq params6 = new StrategicForecastModelReq();
                    params6.InstitutionKey = dashboardParam.InstitutionKey;
                    params6.ScenarioKey = dashboardParam.SelectedSFScenario6ModelKey;
                    modelDetails6 = GetModelDetails(params6);
                    listModels.Add(modelDetails6);
                    modelName6 = getModels.FirstOrDefault(obj => obj.ModelKey == dashboardParam.SelectedSFScenario6ModelKey);
                }
                else
                {
                    listModels.Add(modelDetails6);
                }
                if (dashboardParam.SelectedSFScenario7ModelKey > 0)
                {
                    StrategicForecastModelReq params7 = new StrategicForecastModelReq();
                    params7.InstitutionKey = dashboardParam.InstitutionKey;
                    params7.ScenarioKey = dashboardParam.SelectedSFScenario7ModelKey;
                    modelDetails7 = GetModelDetails(params7);
                    listModels.Add(modelDetails7);
                    modelName7 = getModels.FirstOrDefault(obj => obj.ModelKey == dashboardParam.SelectedSFScenario7ModelKey);
                }
                else
                {
                    listModels.Add(modelDetails7);
                }
                if (dashboardParam.SelectedSFScenario8ModelKey > 0)
                {
                    StrategicForecastModelReq params8 = new StrategicForecastModelReq();
                    params8.InstitutionKey = dashboardParam.InstitutionKey;
                    params8.ScenarioKey = dashboardParam.SelectedSFScenario8ModelKey;
                    modelDetails8 = GetModelDetails(params8);
                    listModels.Add(modelDetails8);
                    modelName8 = getModels.FirstOrDefault(obj => obj.ModelKey == dashboardParam.SelectedSFScenario8ModelKey);
                }
                else
                {
                    listModels.Add(modelDetails8);
                }
                StrategicForecastDashboardConcepts dashboardConcepts = GetDashboardConcepts(dashboardParam);
                StrategicForecastDates getStrategicDates = GetStrategicDates();
                StrategicForecastSummaryCalculations strategicForecastSummaryCalculations = new StrategicForecastSummaryCalculations(listModels, dashboardConcepts, dashboardParam);

                DataTable summary = new DataTable();
                summary.TableName = "Summary";

                //Value columns
                summary.Columns.Add("Select from Saved Scenarios");
                if (dashboardParam.SelectedSFScenario1ModelKey > 0)
                {
                    summary.Columns.Add(modelName1.ModelName);
                }
                else
                {
                    summary.Columns.Add("Select Scenario1");
                }
                if (dashboardParam.SelectedSFScenario2ModelKey > 0)
                {
                    summary.Columns.Add(modelName2.ModelName);
                }
                else
                {
                    summary.Columns.Add("Select Scenario2");
                }
                if (dashboardParam.SelectedSFScenario3ModelKey > 0)
                {
                    summary.Columns.Add(modelName3.ModelName);
                }
                else
                {
                    summary.Columns.Add("Select Scenario3");
                }
                if (dashboardParam.SelectedSFScenario4ModelKey > 0)
                {
                    summary.Columns.Add(modelName4.ModelName);
                }
                else
                {
                    summary.Columns.Add("Select Scenario4");
                }
                if (dashboardParam.SelectedSFScenario5ModelKey > 0)
                {
                    summary.Columns.Add(modelName5.ModelName);
                }
                else
                {
                    summary.Columns.Add("Select Scenario5");
                }
                if (dashboardParam.SelectedSFScenario6ModelKey > 0)
                {
                    summary.Columns.Add(modelName6.ModelName);
                }
                else
                {
                    summary.Columns.Add("Select Scenario6");
                }
                if (dashboardParam.SelectedSFScenario7ModelKey > 0)
                {
                    summary.Columns.Add(modelName7.ModelName);
                }
                else
                {
                    summary.Columns.Add("Select Scenario7");
                }
                if (dashboardParam.SelectedSFScenario8ModelKey > 0)
                {
                    summary.Columns.Add(modelName8.ModelName);
                }
                else
                {
                    summary.Columns.Add("Select Scenario8");
                }
                //Dashboard rows
                DataRow summaryrow1 = summary.NewRow();
                summaryrow1["Select from Saved Scenarios"] = "Horizon";
                summaryrow1[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = dashboardParam.SelectedHorizon + " Year";
                summaryrow1[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = dashboardParam.SelectedHorizon + " Year";
                summaryrow1[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = dashboardParam.SelectedHorizon + " Year";
                summaryrow1[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = dashboardParam.SelectedHorizon + " Year";
                summaryrow1[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = dashboardParam.SelectedHorizon + " Year";
                summaryrow1[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = dashboardParam.SelectedHorizon + " Year";
                summaryrow1[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = dashboardParam.SelectedHorizon + " Year";
                summaryrow1[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = dashboardParam.SelectedHorizon + " Year";
                summary.Rows.Add(summaryrow1);

                DataRow summaryrow2 = summary.NewRow();
                summaryrow2["Select from Saved Scenarios"] = string.Empty;
                summaryrow2[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = DateTime.Now.Year + dashboardParam.SelectedHorizon - 1;
                summaryrow2[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = DateTime.Now.Year + dashboardParam.SelectedHorizon - 1;
                summaryrow2[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = DateTime.Now.Year + dashboardParam.SelectedHorizon - 1;
                summaryrow2[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = DateTime.Now.Year + dashboardParam.SelectedHorizon - 1;
                summaryrow2[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = DateTime.Now.Year + dashboardParam.SelectedHorizon - 1;
                summaryrow2[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = DateTime.Now.Year + dashboardParam.SelectedHorizon - 1;
                summaryrow2[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = DateTime.Now.Year + dashboardParam.SelectedHorizon - 1;
                summaryrow2[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = DateTime.Now.Year + dashboardParam.SelectedHorizon - 1;
                summary.Rows.Add(summaryrow2);

                summary.Rows.Add(summary.NewRow());

                DataRow summaryrow4 = summary.NewRow();
                summaryrow4["Select from Saved Scenarios"] = "New Capital ($000)";
                summaryrow4[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NewCapital1);
                summaryrow4[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NewCapital2);
                summaryrow4[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NewCapital3);
                summaryrow4[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NewCapital4);
                summaryrow4[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NewCapital5);
                summaryrow4[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NewCapital6);
                summaryrow4[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NewCapital7);
                summaryrow4[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NewCapital8);
                summary.Rows.Add(summaryrow4);

                DataRow summaryrow5 = summary.NewRow();
                summaryrow5["Select from Saved Scenarios"] = "Price / Conversion";
                summaryrow5[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.PriceConversion1);
                summaryrow5[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.PriceConversion2);
                summaryrow5[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.PriceConversion3);
                summaryrow5[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.PriceConversion4);
                summaryrow5[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.PriceConversion5);
                summaryrow5[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.PriceConversion6);
                summaryrow5[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.PriceConversion7);
                summaryrow5[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.PriceConversion8);
                summary.Rows.Add(summaryrow5);

                DataRow summaryrow6 = summary.NewRow();
                summaryrow6["Select from Saved Scenarios"] = "Total Assets ($000)";
                summaryrow6[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalAssets1);
                summaryrow6[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalAssets2);
                summaryrow6[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalAssets3);
                summaryrow6[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalAssets4);
                summaryrow6[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalAssets5);
                summaryrow6[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalAssets6);
                summaryrow6[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalAssets7);
                summaryrow6[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalAssets8);
                summary.Rows.Add(summaryrow6);

                DataRow summaryrow7 = summary.NewRow();
                summaryrow7["Select from Saved Scenarios"] = "Average Annual Asset Growth";
                summaryrow7[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth1 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth1.Value, 2) + "%";
                summaryrow7[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth2 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth2.Value, 2) + "%";
                summaryrow7[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth3 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth3.Value, 2) + "%";
                summaryrow7[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth4 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth4.Value, 2) + "%";
                summaryrow7[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth5 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth5.Value, 2) + "%";
                summaryrow7[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth6 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth6.Value, 2) + "%";
                summaryrow7[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth7 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth7.Value, 2) + "%";
                summaryrow7[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth8 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.AverageAnnualGrowth8.Value, 2) + "%";
                summary.Rows.Add(summaryrow7);

                DataRow summaryrow8 = summary.NewRow();
                summaryrow8["Select from Saved Scenarios"] = "Net Income ($000)";
                summaryrow8[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NetIncome1);
                summaryrow8[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NetIncome2);
                summaryrow8[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NetIncome3);
                summaryrow8[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NetIncome4);
                summaryrow8[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NetIncome5);
                summaryrow8[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NetIncome6);
                summaryrow8[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NetIncome7);
                summaryrow8[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.NetIncome8);
                summary.Rows.Add(summaryrow8);

                DataRow summaryrow9 = summary.NewRow();
                summaryrow9["Select from Saved Scenarios"] = "Tier 1 Leverage Ratio";
                summaryrow9[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio1 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio1.Value, 2) + "%";
                summaryrow9[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio2 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio2.Value, 2) + "%";
                summaryrow9[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio3 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio3.Value, 2) + "%";
                summaryrow9[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio4 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio4.Value, 2) + "%";
                summaryrow9[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio5 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio5.Value, 2) + "%";
                summaryrow9[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio6 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio6.Value, 2) + "%";
                summaryrow9[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio7 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio7.Value, 2) + "%";
                summaryrow9[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio8 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.Tier1LeverageRatio8.Value, 2) + "%";
                summary.Rows.Add(summaryrow9);

                DataRow summaryrow10 = summary.NewRow();
                summaryrow10["Select from Saved Scenarios"] = "Total Capital Ratio";
                summaryrow10[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio1 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio1.Value, 2) + "%";
                summaryrow10[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio2 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio2.Value, 2) + "%";
                summaryrow10[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio3 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio3.Value, 2) + "%";
                summaryrow10[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio4 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio4.Value, 2) + "%";
                summaryrow10[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio5 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio5.Value, 2) + "%";
                summaryrow10[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio6 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio6.Value, 2) + "%";
                summaryrow10[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio7 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio7.Value, 2) + "%";
                summaryrow10[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio8 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.TotalCapitalRatio8.Value, 2) + "%";
                summary.Rows.Add(summaryrow10);

                DataRow summaryrow11 = summary.NewRow();
                summaryrow11["Select from Saved Scenarios"] = "ROAA";
                summaryrow11[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA1 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA1.Value, 2) + "%";
                summaryrow11[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA2 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA2.Value, 2) + "%";
                summaryrow11[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA3 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA3.Value, 2) + "%";
                summaryrow11[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA4 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA4.Value, 2) + "%";
                summaryrow11[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA5 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA5.Value, 2) + "%";
                summaryrow11[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA6 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA6.Value, 2) + "%";
                summaryrow11[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA7 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA7.Value, 2) + "%";
                summaryrow11[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA8 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAA8.Value, 2) + "%";
                summary.Rows.Add(summaryrow11);

                DataRow summaryrow12 = summary.NewRow();
                summaryrow12["Select from Saved Scenarios"] = "ROAE";
                summaryrow12[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE1 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE1.Value, 2) + "%";
                summaryrow12[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE2 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE2.Value, 2) + "%";
                summaryrow12[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE3 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE3.Value, 2) + "%";
                summaryrow12[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE4 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE4.Value, 2) + "%";
                summaryrow12[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE5 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE5.Value, 2) + "%";
                summaryrow12[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE6 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE6.Value, 2) + "%";
                summaryrow12[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE7 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE7.Value, 2) + "%";
                summaryrow12[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE8 == null ? "%" : Math.Round(strategicForecastSummaryCalculations.strategicForecastSummaryData.ROAE8.Value, 2) + "%";
                summary.Rows.Add(summaryrow12);

                DataRow summaryrow13 = summary.NewRow();
                summaryrow13["Select from Saved Scenarios"] = "Book Value Equity";
                summaryrow13[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValueEquity1);
                summaryrow13[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValueEquity2);
                summaryrow13[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValueEquity3);
                summaryrow13[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValueEquity4);
                summaryrow13[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValueEquity5);
                summaryrow13[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValueEquity6);
                summaryrow13[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValueEquity7);
                summaryrow13[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValueEquity8);
                summary.Rows.Add(summaryrow13);

                DataRow summaryrow14 = summary.NewRow();
                summaryrow14["Select from Saved Scenarios"] = "Market Value Equity";
                summaryrow14[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.MarketValueEquity1);
                summaryrow14[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.MarketValueEquity2);
                summaryrow14[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.MarketValueEquity3);
                summaryrow14[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.MarketValueEquity4);
                summaryrow14[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.MarketValueEquity5);
                summaryrow14[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.MarketValueEquity6);
                summaryrow14[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.MarketValueEquity7);
                summaryrow14[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.MarketValueEquity8);
                summary.Rows.Add(summaryrow14);

                DataRow summaryrow15 = summary.NewRow();
                summaryrow15["Select from Saved Scenarios"] = "Book Value Per Share";
                summaryrow15[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValuePerShare1);
                summaryrow15[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValuePerShare2);
                summaryrow15[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValuePerShare3);
                summaryrow15[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValuePerShare4);
                summaryrow15[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValuePerShare5);
                summaryrow15[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValuePerShare6);
                summaryrow15[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValuePerShare7);
                summaryrow15[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.BookValuePerShare8);
                summary.Rows.Add(summaryrow15);

                DataRow summaryrow16 = summary.NewRow();
                summaryrow16["Select from Saved Scenarios"] = "EPS";
                summaryrow16[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.EPS1);
                summaryrow16[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.EPS2);
                summaryrow16[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.EPS3);
                summaryrow16[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.EPS4);
                summaryrow16[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.EPS5);
                summaryrow16[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.EPS6);
                summaryrow16[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.EPS7);
                summaryrow16[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.EPS8);
                summary.Rows.Add(summaryrow16);

                DataRow summaryrow17 = summary.NewRow();
                summaryrow17["Select from Saved Scenarios"] = "Exit 1.5X Book";
                summaryrow17[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.Exit15XBook1);
                summaryrow17[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.Exit15XBook2);
                summaryrow17[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.Exit15XBook3);
                summaryrow17[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.Exit15XBook4);
                summaryrow17[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.Exit15XBook5);
                summaryrow17[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.Exit15XBook6);
                summaryrow17[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.Exit15XBook7);
                summaryrow17[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.Exit15XBook8);
                summary.Rows.Add(summaryrow17);

                DataRow summaryrow18 = summary.NewRow();
                summaryrow18["Select from Saved Scenarios"] = "Exit EPS 15X";
                summaryrow18[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS15X1);
                summaryrow18[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS15X2);
                summaryrow18[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS15X3);
                summaryrow18[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS15X4);
                summaryrow18[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS15X5);
                summaryrow18[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS15X6);
                summaryrow18[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS15X7);
                summaryrow18[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS15X8);
                summary.Rows.Add(summaryrow18);

                DataRow summaryrow19 = summary.NewRow();
                summaryrow19["Select from Saved Scenarios"] = "Exit EPS 20X";
                summaryrow19[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS20X1);
                summaryrow19[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS20X2);
                summaryrow19[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS20X3);
                summaryrow19[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS20X4);
                summaryrow19[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS20X5);
                summaryrow19[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS20X6);
                summaryrow19[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS20X7);
                summaryrow19[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:0,0.00}", strategicForecastSummaryCalculations.strategicForecastSummaryData.ExitEPS20X8);
                summary.Rows.Add(summaryrow19);

                DataRow summaryrow20 = summary.NewRow();
                summaryrow20["Select from Saved Scenarios"] = "Dividends Per Share";
                summaryrow20[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastSummaryCalculations.strategicForecastSummaryData.DividendPerShare1);
                summaryrow20[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastSummaryCalculations.strategicForecastSummaryData.DividendPerShare2);
                summaryrow20[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastSummaryCalculations.strategicForecastSummaryData.DividendPerShare3);
                summaryrow20[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastSummaryCalculations.strategicForecastSummaryData.DividendPerShare4);
                summaryrow20[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastSummaryCalculations.strategicForecastSummaryData.DividendPerShare5);
                summaryrow20[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastSummaryCalculations.strategicForecastSummaryData.DividendPerShare6);
                summaryrow20[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastSummaryCalculations.strategicForecastSummaryData.DividendPerShare7);
                summaryrow20[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastSummaryCalculations.strategicForecastSummaryData.DividendPerShare8);
                summary.Rows.Add(summaryrow20);

                DataRow summaryrow21 = summary.NewRow();
                summaryrow21["Select from Saved Scenarios"] = "Shares Outstanding";
                summaryrow21[modelName1 == null ? "Select Scenario1" : modelName1.ModelName] = string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.SharesOutstanding1);
                summaryrow21[modelName2 == null ? "Select Scenario2" : modelName2.ModelName] = string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.SharesOutstanding2);
                summaryrow21[modelName3 == null ? "Select Scenario3" : modelName3.ModelName] = string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.SharesOutstanding3);
                summaryrow21[modelName4 == null ? "Select Scenario4" : modelName4.ModelName] = string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.SharesOutstanding4);
                summaryrow21[modelName5 == null ? "Select Scenario5" : modelName5.ModelName] = string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.SharesOutstanding5);
                summaryrow21[modelName6 == null ? "Select Scenario6" : modelName6.ModelName] = string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.SharesOutstanding6);
                summaryrow21[modelName7 == null ? "Select Scenario7" : modelName7.ModelName] = string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.SharesOutstanding7);
                summaryrow21[modelName8 == null ? "Select Scenario8" : modelName8.ModelName] = string.Format("{0:#,##0}", strategicForecastSummaryCalculations.strategicForecastSummaryData.SharesOutstanding8);
                summary.Rows.Add(summaryrow21);

                BankProfileOverviewParams bankdata = new BankProfileOverviewParams();
                bankdata.InstitutionKey = Convert.ToInt32(dashboardParam.InstitutionKey);
                var Bankfinalres = this.GetBankProfileIntroductionData(bankdata);

                DataTable[] metricArr = new DataTable[1];
                metricArr[0] = summary;
                excelBytes = StrategicForecastExportToExcel.CreateExcelDocument(metricArr, "StrategicForecastSummary.xlsx", Bankfinalres, dashboardParam.SelectedComparison);
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
            result.Content.Headers.ContentDisposition.FileName = "StrategicForecastSummary.xlsx";
            result.Content.Headers.ContentDisposition.Size = excelBytes.Length;
            return result;
        }
        private DataTable ForecastData(StrategicForecastDates getStrategicDates, StrategicForecastInput modelDetails, StrategicForecastForecastCalculations strategicForecastForecastCalculations)
        {
            DataTable forecast = new DataTable();
            forecast.TableName = "Forecast";
            try
            {
                //dashBoard columns
                forecast.Columns.Add(" ");
                forecast.Columns.Add("Actual");
                //forecast.Columns.Add("Actual ");
                forecast.Columns.Add("Actual / Estimate");
                forecast.Columns.Add("Estimate1");
                forecast.Columns.Add("Estimate2");
                forecast.Columns.Add("Estimate3");
                forecast.Columns.Add("Estimate4");
                forecast.Columns.Add("Estimate5");

                //Dashboard rows
                DataRow forecastrow1 = forecast.NewRow();
                forecastrow1[" "] = string.Empty;
                forecastrow1["Actual"] = "Prior Year";
                //forecastrow1["Actual "] = "Current Year YTD";
                forecastrow1["Actual / Estimate"] = "Year 0";
                forecastrow1["Estimate1"] = "Year 1";
                forecastrow1["Estimate2"] = "Year 2";
                forecastrow1["Estimate3"] = "Year 3";
                forecastrow1["Estimate4"] = "Year 4";
                forecastrow1["Estimate5"] = "Year 5";
                forecast.Rows.Add(forecastrow1);

                DataRow forecastrow2 = forecast.NewRow();
                forecastrow2[" "] = string.Empty;
                forecastrow2["Actual"] = getStrategicDates.PriorYear;
                //forecastrow2["Actual "] = getStrategicDates.CurrentYear;
                forecastrow2["Actual / Estimate"] = getStrategicDates.Year0;
                forecastrow2["Estimate1"] = getStrategicDates.Year1;
                forecastrow2["Estimate2"] = getStrategicDates.Year2;
                forecastrow2["Estimate3"] = getStrategicDates.Year3;
                forecastrow2["Estimate4"] = getStrategicDates.Year4;
                forecastrow2["Estimate5"] = getStrategicDates.Year5;
                forecast.Rows.Add(forecastrow2);

                DataRow forecastrow3 = forecast.NewRow();
                forecastrow3[" "] = "Projections for Major Categories ($000s)";
                forecastrow3["Actual"] = string.Empty;
                //forecastrow3["Actual "] = string.Empty;
                forecastrow3["Actual / Estimate"] = string.Empty;
                forecastrow3["Estimate1"] = string.Empty;
                forecastrow3["Estimate2"] = string.Empty;
                forecastrow3["Estimate3"] = string.Empty;
                forecastrow3["Estimate4"] = string.Empty;
                forecastrow3["Estimate5"] = string.Empty;
                forecast.Rows.Add(forecastrow3);

                DataRow forecastrow4 = forecast.NewRow();
                forecastrow4[" "] = "Net Income";
                forecastrow4["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NetIncomePriorYear);
                //forecastrow4["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NetIncomeCurrentQuarter);
                forecastrow4["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NetIncomeYear0);
                forecastrow4["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NetIncomeYear1);
                forecastrow4["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NetIncomeYear2);
                forecastrow4["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NetIncomeYear3);
                forecastrow4["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NetIncomeYear4);
                forecastrow4["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NetIncomeYear5);
                forecast.Rows.Add(forecastrow4);

                DataRow forecastrow5 = forecast.NewRow();
                forecastrow5[" "] = "Dividends";
                if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsPriorYear == 0)
                    forecastrow5["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsPriorYear);
                else
                {
                    if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsPriorYear < 0)
                        forecastrow5["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsPriorYear);
                    else
                        forecastrow5["Actual"] = "-" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsPriorYear);
                }

                //forecastrow5["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsCurrentQuarter);
                if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear0 == 0)
                    forecastrow5["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear0);
                else
                {
                    if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear0 < 0)
                        forecastrow5["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear0);
                    else
                        forecastrow5["Actual / Estimate"] = "-" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear0);
                }

                if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear1 == 0)
                    forecastrow5["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear1);
                else
                {
                    if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear1 < 0)
                        forecastrow5["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear1);
                    else
                        forecastrow5["Estimate1"] = "-" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear1);
                }

                if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear2 == 0)
                    forecastrow5["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear2);
                else
                {
                    if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear2 < 0)
                        forecastrow5["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear2);
                    else
                        forecastrow5["Estimate2"] = "-" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear2);
                }

                if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear3 == 0)
                    forecastrow5["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear3);
                else
                {
                    if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear3 < 0)
                        forecastrow5["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear3);
                    else
                        forecastrow5["Estimate3"] = "-" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear3);
                }

                if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear4 == 0)
                    forecastrow5["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear4);
                else
                {
                    if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear4 < 0)
                        forecastrow5["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear4);
                    else
                        forecastrow5["Estimate4"] = "-" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear4);
                }

                if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear5 == 0)
                    forecastrow5["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear5);
                else
                {
                    if (strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear5 < 0)
                        forecastrow5["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear5);
                    else
                        forecastrow5["Estimate5"] = "-" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendsYear5);
                }

                forecast.Rows.Add(forecastrow5);

                DataRow forecastrow6 = forecast.NewRow();
                forecastrow6[" "] = "\t \t \t \t \t \t Dividend Rate";
                forecastrow6["Actual"] = strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRatePriorYear == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRatePriorYear.Value, 2) * -1 + "%";
                //forecastrow6["Actual "] = strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateCurrentQuarter==null?"%": Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateCurrentQuarter.Value, 2) + "%";
                forecastrow6["Actual / Estimate"] = strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear0 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear0.Value, 2) * -1 + "%";
                forecastrow6["Estimate1"] = strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear1 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear1.Value, 2) * -1 + "%";
                forecastrow6["Estimate2"] = strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear2 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear2.Value, 2) * -1 + "%";
                forecastrow6["Estimate3"] = strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear3 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear3.Value, 2) * -1 + "%";
                forecastrow6["Estimate4"] = strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear4 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear4.Value, 2) * -1 + "%";
                forecastrow6["Estimate5"] = strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear5 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.DividendsRateYear5.Value, 2) * -1 + "%";
                forecast.Rows.Add(forecastrow6);

                DataRow forecastrow7 = forecast.NewRow();
                forecastrow7[" "] = "Bank Equity Capital";
                forecastrow7["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.BankEquityCapitalPriorYear);
                //forecastrow7["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.BankEquityCapitalCurrentQuarter);
                forecastrow7["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.BankEquityCapitalYear0);
                forecastrow7["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.BankEquityCapitalYear1);
                forecastrow7["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.BankEquityCapitalYear2);
                forecastrow7["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.BankEquityCapitalYear3);
                forecastrow7["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.BankEquityCapitalYear4);
                forecastrow7["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.BankEquityCapitalYear5);
                forecast.Rows.Add(forecastrow7);

                DataRow forecastrow8 = forecast.NewRow();
                forecastrow8[" "] = "\t \t \t \t \t \t New Capital";
                forecastrow8["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NewCapitalPriorYear);
                //forecastrow8["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NewCapitalCurrentQuarter);
                forecastrow8["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewCapitalYear0);
                forecastrow8["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewCapitalYear1);
                forecastrow8["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewCapitalYear2);
                forecastrow8["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewCapitalYear3);
                forecastrow8["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewCapitalYear4);
                forecastrow8["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewCapitalYear5);
                forecast.Rows.Add(forecastrow8);

                DataRow forecastrow9 = forecast.NewRow();
                forecastrow9[" "] = "CET 1 Capital Adjustment";
                forecastrow9["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalAdjustmentPriorYear);
                //forecastrow9["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalAdjustmentCurrentQuarter);
                forecastrow9["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalAdjustmentYear0);
                forecastrow9["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalAdjustmentYear1);
                forecastrow9["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalAdjustmentYear2);
                forecastrow9["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalAdjustmentYear3);
                forecastrow9["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalAdjustmentYear4);
                forecastrow9["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalAdjustmentYear5);
                forecast.Rows.Add(forecastrow9);

                DataRow forecastrow10 = forecast.NewRow();
                forecastrow10[" "] = "CET 1 Capital";
                forecastrow10["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalPriorYear);
                //forecastrow10["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalCurrentQuarter);
                forecastrow10["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalYear0);
                forecastrow10["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalYear1);
                forecastrow10["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalYear2);
                forecastrow10["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalYear3);
                forecastrow10["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalYear4);
                forecastrow10["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalYear5);
                forecast.Rows.Add(forecastrow10);

                DataRow forecastrow11 = forecast.NewRow();
                forecastrow11[" "] = "Tier 1 Capital Adjustment";
                forecastrow11["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalAdjustmentPriorYear);
                //forecastrow11["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalAdjustmentCurrentQuarter);
                forecastrow11["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalAdjustmentYear0);
                forecastrow11["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalAdjustmentYear1);
                forecastrow11["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalAdjustmentYear2);
                forecastrow11["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalAdjustmentYear3);
                forecastrow11["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalAdjustmentYear4);
                forecastrow11["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalAdjustmentYear5);
                forecast.Rows.Add(forecastrow11);

                DataRow forecastrow12 = forecast.NewRow();
                forecastrow12[" "] = "Tier 1 Capital";
                forecastrow12["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalPriorYear);
                //forecastrow12["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalCurrentQuarter);
                forecastrow12["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalYear0);
                forecastrow12["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalYear1);
                forecastrow12["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalYear2);
                forecastrow12["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalYear3);
                forecastrow12["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalYear4);
                forecastrow12["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier1CapitalYear5);
                forecast.Rows.Add(forecastrow12);

                DataRow forecastrow13 = forecast.NewRow();
                forecastrow13[" "] = "Tier 2 Capital";
                forecastrow13["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier2CapitalPriorYear);
                //forecastrow13["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier2CapitalCurrentQuarter);
                forecastrow13["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier2CapitalYear0);
                forecastrow13["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier2CapitalYear1);
                forecastrow13["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier2CapitalYear2);
                forecastrow13["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier2CapitalYear3);
                forecastrow13["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier2CapitalYear4);
                forecastrow13["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.Tier2CapitalYear5);
                forecast.Rows.Add(forecastrow13);

                DataRow forecastrow14 = forecast.NewRow();
                forecastrow14[" "] = "Total Risk-Based Capital";
                forecastrow14["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalRiskBasedCapitalPriorYear);
                //forecastrow14["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalRiskBasedCapitalCurrentQuarter);
                forecastrow14["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalRiskBasedCapitalYear0);
                forecastrow14["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalRiskBasedCapitalYear1);
                forecastrow14["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalRiskBasedCapitalYear2);
                forecastrow14["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalRiskBasedCapitalYear3);
                forecastrow14["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalRiskBasedCapitalYear4);
                forecastrow14["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalRiskBasedCapitalYear5);
                forecast.Rows.Add(forecastrow14);

                DataRow forecastrow15 = forecast.NewRow();
                forecastrow15[" "] = "Risk-Weighted Assets";
                forecastrow15["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.RiskWeightedAssetsPriorYear);
                //forecastrow15["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.RiskWeightedAssetsCurrentQuarter);
                forecastrow15["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.RiskWeightedAssetsYear0);
                forecastrow15["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.RiskWeightedAssetsYear1);
                forecastrow15["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.RiskWeightedAssetsYear2);
                forecastrow15["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.RiskWeightedAssetsYear3);
                forecastrow15["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.RiskWeightedAssetsYear4);
                forecastrow15["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.RiskWeightedAssetsYear5);
                forecast.Rows.Add(forecastrow15);

                DataRow forecastrow16 = forecast.NewRow();
                forecastrow16[" "] = "Total Assets (for Leverage)";
                forecastrow16["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalAssetsForLeveragePriorYear);
                //forecastrow16["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalAssetsForLeverageCurrentQuarter);
                forecastrow16["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.TotalAssetsLeverageYear0);
                forecastrow16["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.TotalAssetsLeverageYear1);
                forecastrow16["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.TotalAssetsLeverageYear2);
                forecastrow16["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.TotalAssetsLeverageYear3);
                forecastrow16["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.TotalAssetsLeverageYear4);
                forecastrow16["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.TotalAssetsLeverageYear5);
                forecast.Rows.Add(forecastrow16);

                DataRow forecastrow17 = forecast.NewRow();
                forecastrow17[" "] = "Total Assets";
                forecastrow17["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalAssetsPriorYear);
                //forecastrow17["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalAssetsCurrentQuarter);
                forecastrow17["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalAssetsYear0);
                forecastrow17["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalAssetsYear1);
                forecastrow17["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalAssetsYear2);
                forecastrow17["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalAssetsYear3);
                forecastrow17["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalAssetsYear4);
                forecastrow17["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.TotalAssetsYear5);
                forecast.Rows.Add(forecastrow17);

                DataRow forecastrow18 = forecast.NewRow();
                forecastrow18[" "] = "\t \t \t \t \t \t New Acquisition - Assets";
                forecastrow18["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NewAcquisitionAssetsPriorYear);
                //forecastrow18["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.NewAcquisitionAssetsCurrentQuarter);
                forecastrow18["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewAcquisitionAssetsYear0);
                forecastrow18["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewAcquisitionAssetsYear1);
                forecastrow18["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewAcquisitionAssetsYear2);
                forecastrow18["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewAcquisitionAssetsYear3);
                forecastrow18["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewAcquisitionAssetsYear4);
                forecastrow18["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.NewAcquisitionAssetsYear5);
                forecast.Rows.Add(forecastrow18);

                DataRow forecastrow19 = forecast.NewRow();
                forecastrow19[" "] = "CET 1 Capital Ratio";
                forecastrow19["Actual"] = strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioPriorYear == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioPriorYear.Value, 4) + "%";
                //forecastrow19["Actual "] = strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioCurrentQuarter == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioCurrentQuarter.Value, 2) + "%";
                forecastrow19["Actual / Estimate"] = strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear0 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear0.Value, 4) + "%";
                forecastrow19["Estimate1"] = strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear1 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear1.Value, 4) + "%";
                forecastrow19["Estimate2"] = strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear2 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear2.Value, 4) + "%";
                forecastrow19["Estimate3"] = strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear3 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear3.Value, 4) + "%";
                forecastrow19["Estimate4"] = strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear4 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear4.Value, 4) + "%";
                forecastrow19["Estimate5"] = strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear5 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Cet1CapitalRatioYear5.Value, 4) + "%";
                forecast.Rows.Add(forecastrow19);

                DataRow forecastrow20 = forecast.NewRow();
                forecastrow20[" "] = "Tier 1 RBC Ratio";
                forecastrow20["Actual"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioPriorYear == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioPriorYear.Value, 4) + "%";
                //forecastrow20["Actual "] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioCurrentQuarter == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioCurrentQuarter.Value, 2) + "%";
                forecastrow20["Actual / Estimate"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear0 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear0.Value, 4) + "%";
                forecastrow20["Estimate1"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear1 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear1.Value, 4) + "%";
                forecastrow20["Estimate2"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear2 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear2.Value, 4) + "%";
                forecastrow20["Estimate3"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear3 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear3.Value, 4) + "%";
                forecastrow20["Estimate4"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear4 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear4.Value, 4) + "%";
                forecastrow20["Estimate5"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear5 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1RBCRatioYear5.Value, 4) + "%";
                forecast.Rows.Add(forecastrow20);

                DataRow forecastrow21 = forecast.NewRow();
                forecastrow21[" "] = "Total RBC Ratio";
                forecastrow21["Actual"] = strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioPriorYear == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioPriorYear.Value, 4) + "%";
                //forecastrow21["Actual "] = strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioCurrentQuarter == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioCurrentQuarter.Value, 2) + "%";
                forecastrow21["Actual / Estimate"] = strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear0 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear0.Value, 4) + "%";
                forecastrow21["Estimate1"] = strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear1 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear1.Value, 4) + "%";
                forecastrow21["Estimate2"] = strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear2 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear2.Value, 4) + "%";
                forecastrow21["Estimate3"] = strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear3 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear3.Value, 4) + "%";
                forecastrow21["Estimate4"] = strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear4 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear4.Value, 4) + "%";
                forecastrow21["Estimate5"] = strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear5 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.TotalRBCRatioYear5.Value, 4) + "%";
                forecast.Rows.Add(forecastrow21);

                DataRow forecastrow22 = forecast.NewRow();
                forecastrow22[" "] = "Tier 1 Leverage Ratio";
                forecastrow22["Actual"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioPriorYear == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioPriorYear.Value, 4) + "%";
                //forecastrow22["Actual "] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioCurrentQuarter == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioCurrentQuarter.Value, 2) + "%";
                forecastrow22["Actual / Estimate"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear0 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear0.Value, 4) + "%";
                forecastrow22["Estimate1"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear1 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear1.Value, 4) + "%";
                forecastrow22["Estimate2"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear2 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear2.Value, 4) + "%";
                forecastrow22["Estimate3"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear3 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear3.Value, 4) + "%";
                forecastrow22["Estimate4"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear4 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear4.Value, 4) + "%";
                forecastrow22["Estimate5"] = strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear5 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.Tier1LeverageRatioYear5.Value, 4) + "%";
                forecast.Rows.Add(forecastrow22);

                DataRow forecastrow23 = forecast.NewRow();
                forecastrow23[" "] = "Asset Growth Rate";
                forecastrow23["Actual"] = strategicForecastForecastCalculations.strategicForecastForecastData.AssetGrowthRatePriorYear == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.AssetGrowthRatePriorYear.Value, 2) + "%";
                //forecastrow23["Actual "] = strategicForecastForecastCalculations.strategicForecastForecastData.AssetGrowthRateCurrentQuarter == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.AssetGrowthRateCurrentQuarter.Value, 2) + "%";
                forecastrow23["Actual / Estimate"] = strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear0 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear0.Value, 2) + "%";
                forecastrow23["Estimate1"] = strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear1 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear1.Value, 2) + "%";
                forecastrow23["Estimate2"] = strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear2 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear2.Value, 2) + "%";
                forecastrow23["Estimate3"] = strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear3 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear3.Value, 2) + "%";
                forecastrow23["Estimate4"] = strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear4 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear4.Value, 2) + "%";
                forecastrow23["Estimate5"] = strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear5 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastInput.AssetGrowthRateYear5.Value, 2) + "%";
                forecast.Rows.Add(forecastrow23);

                DataRow forecastrow24 = forecast.NewRow();
                forecastrow24[" "] = "ROAA";
                forecastrow24["Actual"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsPriorYear == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsPriorYear.Value, 2) + "%";
                //forecastrow24["Actual "] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsCurrentQuarter == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsCurrentQuarter.Value, 2) + "%";
                forecastrow24["Actual / Estimate"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear0 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear0.Value, 2) + "%";
                forecastrow24["Estimate1"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear1 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear1.Value, 2) + "%";
                forecastrow24["Estimate2"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear2 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear2.Value, 2) + "%";
                forecastrow24["Estimate3"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear3 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear3.Value, 2) + "%";
                forecastrow24["Estimate4"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear4 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear4.Value, 2) + "%";
                forecastrow24["Estimate5"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear5 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageAssetsYear5.Value, 2) + "%";
                forecast.Rows.Add(forecastrow24);

                DataRow forecastrow25 = forecast.NewRow();
                forecastrow25[" "] = "ROAE";
                forecastrow25["Actual"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityPriorYear == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityPriorYear.Value, 2) + "%";
                //forecastrow25["Actual "] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityCurrentQuarter == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityCurrentQuarter.Value, 2) + "%";
                forecastrow25["Actual / Estimate"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear0 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear0.Value, 2) + "%";
                forecastrow25["Estimate1"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear1 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear1.Value, 2) + "%";
                forecastrow25["Estimate2"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear2 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear2.Value, 2) + "%";
                forecastrow25["Estimate3"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear3 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear3.Value, 2) + "%";
                forecastrow25["Estimate4"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear4 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear4.Value, 2) + "%";
                forecastrow25["Estimate5"] = strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear5 == null ? "%" : Math.Round(strategicForecastForecastCalculations.strategicForecastForecastData.ReturnOnAverageEquityYear5.Value, 2) + "%";
                forecast.Rows.Add(forecastrow25);

                DataRow forecastrow26 = forecast.NewRow();
                forecastrow26[" "] = "Equity Analysis";
                forecast.Rows.Add(forecastrow26);

                DataRow forecastrow27 = forecast.NewRow();
                forecastrow27[" "] = "\t \t \t \t \t \t MV Equity (1.5X Book)";
                forecastrow27["Actual"] = "$" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.MvEquityPriorYear);
                //forecastrow27["Actual "] = "$" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.MvEquityCurrentQuarter);
                forecastrow27["Actual / Estimate"] = "$" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.MvEquityYear0);
                forecastrow27["Estimate1"] = "$" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.MvEquityYear1);
                forecastrow27["Estimate2"] = "$" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.MvEquityYear2);
                forecastrow27["Estimate3"] = "$" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.MvEquityYear3);
                forecastrow27["Estimate4"] = "$" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.MvEquityYear4);
                forecastrow27["Estimate5"] = "$" + string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.MvEquityYear5);
                forecast.Rows.Add(forecastrow27);

                DataRow forecastrow28 = forecast.NewRow();
                forecastrow28[" "] = "\t \t \t \t \t \t Shares Outstanding (Base)";
                forecastrow28["Actual"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.SharesOutstandingActualPriorYear);
                //forecastrow28["Actual "] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastInput.SharesOutstandingActualCurrentQuarter);
                forecastrow28["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.SharesOutstandingYear0);
                forecastrow28["Estimate1"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.SharesOutstandingYear1);
                forecastrow28["Estimate2"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.SharesOutstandingYear2);
                forecastrow28["Estimate3"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.SharesOutstandingYear3);
                forecastrow28["Estimate4"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.SharesOutstandingYear4);
                forecastrow28["Estimate5"] = string.Format("{0:#,##0}", strategicForecastForecastCalculations.strategicForecastForecastData.SharesOutstandingYear5);
                forecast.Rows.Add(forecastrow28);

                DataRow forecastrow29 = forecast.NewRow();
                forecastrow29[" "] = "\t \t \t \t \t \t BV Share Price";
                forecastrow29["Actual"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.BvSharePricePriorYear);
                //forecastrow29["Actual "] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.BvSharePriceCurrentQuarter);
                forecastrow29["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.BvSharePriceYear0);
                forecastrow29["Estimate1"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.BvSharePriceYear1);
                forecastrow29["Estimate2"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.BvSharePriceYear2);
                forecastrow29["Estimate3"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.BvSharePriceYear3);
                forecastrow29["Estimate4"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.BvSharePriceYear4);
                forecastrow29["Estimate5"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.BvSharePriceYear5);
                forecast.Rows.Add(forecastrow29);

                DataRow forecastrow30 = forecast.NewRow();
                forecastrow30[" "] = "\t \t \t \t \t \t MV Share Price (1.5X)";
                forecastrow30["Actual"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.MvSharePricePriorYear);
                //forecastrow30["Actual "] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.MvSharePriceCurrentQuarter);
                forecastrow30["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.MvSharePriceYear0);
                forecastrow30["Estimate1"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.MvSharePriceYear1);
                forecastrow30["Estimate2"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.MvSharePriceYear2);
                forecastrow30["Estimate3"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.MvSharePriceYear3);
                forecastrow30["Estimate4"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.MvSharePriceYear4);
                forecastrow30["Estimate5"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.MvSharePriceYear5);
                forecast.Rows.Add(forecastrow30);

                DataRow forecastrow31 = forecast.NewRow();
                forecastrow31[" "] = "\t \t \t \t \t \t EPS";
                forecastrow31["Actual"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerSharePricePriorYear);
                //forecastrow31["Actual "] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerSharePriceCurrentQuarter);
                forecastrow31["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerSharePriceYear0);
                forecastrow31["Estimate1"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerSharePriceYear1);
                forecastrow31["Estimate2"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerSharePriceYear2);
                forecastrow31["Estimate3"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerSharePriceYear3);
                forecastrow31["Estimate4"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerSharePriceYear4);
                forecastrow31["Estimate5"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerSharePriceYear5);
                forecast.Rows.Add(forecastrow31);

                DataRow forecastrow32 = forecast.NewRow();
                forecastrow32[" "] = "\t \t \t \t \t \t EPS 15X";
                forecastrow32["Actual"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare15PricePriorYear);
                //forecastrow32["Actual "] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare15PriceCurrentQuarter);
                forecastrow32["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare15PriceYear0);
                forecastrow32["Estimate1"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare15PriceYear1);
                forecastrow32["Estimate2"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare15PriceYear2);
                forecastrow32["Estimate3"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare15PriceYear3);
                forecastrow32["Estimate4"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare15PriceYear4);
                forecastrow32["Estimate5"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare15PriceYear5);
                forecast.Rows.Add(forecastrow32);

                DataRow forecastrow33 = forecast.NewRow();
                forecastrow33[" "] = "\t \t \t \t \t \t EPS 20X";
                forecastrow33["Actual"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare20PricePriorYear);
                //forecastrow33["Actual "] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare20PriceCurrentQuarter);
                forecastrow33["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare20PriceYear0);
                forecastrow33["Estimate1"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare20PriceYear1);
                forecastrow33["Estimate2"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare20PriceYear2);
                forecastrow33["Estimate3"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare20PriceYear3);
                forecastrow33["Estimate4"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare20PriceYear4);
                forecastrow33["Estimate5"] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.EarningsPerShare20PriceYear5);
                forecast.Rows.Add(forecastrow33);

                DataRow forecastrow34 = forecast.NewRow();
                forecastrow34[" "] = "\t \t \t \t \t \t Dividend Per Share";
                forecastrow34["Actual"] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastForecastCalculations.strategicForecastForecastData.DividendPerSharePricePriorYear);
                //forecastrow34["Actual "] = "$" + string.Format("{0:0,0.00}", strategicForecastForecastCalculations.strategicForecastForecastData.DividendPerSharePriceCurrentQuarter);
                forecastrow34["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastForecastCalculations.strategicForecastForecastData.DividendPerSharePriceYear0);
                forecastrow34["Estimate1"] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastForecastCalculations.strategicForecastForecastData.DividendPerSharePriceYear1);
                forecastrow34["Estimate2"] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastForecastCalculations.strategicForecastForecastData.DividendPerSharePriceYear2);
                forecastrow34["Estimate3"] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastForecastCalculations.strategicForecastForecastData.DividendPerSharePriceYear3);
                forecastrow34["Estimate4"] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastForecastCalculations.strategicForecastForecastData.DividendPerSharePriceYear4);
                forecastrow34["Estimate5"] = "$" + string.Format("{0:0,0.00}", -1 * strategicForecastForecastCalculations.strategicForecastForecastData.DividendPerSharePriceYear5);
                forecast.Rows.Add(forecastrow34);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return forecast;
        }

        private DataTable ForecastValue(StrategicForecastDates getStrategicDates, StrategicForecastInput modelDetails, StrategicForecastValueCalculations strategicForecastValueCalculations)
        {
            DataTable value = new DataTable();
            value.TableName = "Value";
            try
            {
                //Value columns
                value.Columns.Add(" ");
                value.Columns.Add("Actual");
                //value.Columns.Add("Actual ");
                value.Columns.Add("Actual / Estimate");
                value.Columns.Add("Estimate");
                value.Columns.Add("Estimate ");
                value.Columns.Add("Estimate  ");
                value.Columns.Add("Estimate   ");
                value.Columns.Add("Estimate    ");

                //Dashboard rows
                DataRow forecastvalrow1 = value.NewRow();
                forecastvalrow1[" "] = string.Empty;
                forecastvalrow1["Actual"] = "Prior Year";
                //forecastvalrow1["Actual "] = "Current Year YTD";
                forecastvalrow1["Actual / Estimate"] = "Year 0";
                forecastvalrow1["Estimate"] = "Year 1";
                forecastvalrow1["Estimate "] = "Year 2";
                forecastvalrow1["Estimate  "] = "Year 3";
                forecastvalrow1["Estimate   "] = "Year 4";
                forecastvalrow1["Estimate    "] = "Year 5";
                value.Rows.Add(forecastvalrow1);

                DataRow forecastvalrow2 = value.NewRow();
                forecastvalrow2[" "] = string.Empty;
                forecastvalrow2["Actual"] = getStrategicDates.PriorYear;
                //forecastvalrow2["Actual "] = getStrategicDates.CurrentYear;
                forecastvalrow2["Actual / Estimate"] = getStrategicDates.Year0;
                forecastvalrow2["Estimate"] = getStrategicDates.Year1;
                forecastvalrow2["Estimate "] = getStrategicDates.Year2;
                forecastvalrow2["Estimate  "] = getStrategicDates.Year3;
                forecastvalrow2["Estimate   "] = getStrategicDates.Year4;
                forecastvalrow2["Estimate    "] = getStrategicDates.Year5;
                value.Rows.Add(forecastvalrow2);

                DataRow forecastvalrow3 = value.NewRow();
                forecastvalrow3[" "] = "Projections for Major Categories ($000s)";
                value.Rows.Add(forecastvalrow3);

                DataRow forecastvalrow4 = value.NewRow();
                forecastvalrow4[" "] = "Net Income";
                forecastvalrow4["Actual"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.NetIncomePriorYear);
                //forecastvalrow4["Actual "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.NetIncomeCurrentQuarter);
                forecastvalrow4["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.NetIncomeYear0);
                forecastvalrow4["Estimate"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.NetIncomeYear1);
                forecastvalrow4["Estimate "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.NetIncomeYear2);
                forecastvalrow4["Estimate  "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.NetIncomeYear3);
                forecastvalrow4["Estimate   "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.NetIncomeYear4);
                forecastvalrow4["Estimate    "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.NetIncomeYear5);
                value.Rows.Add(forecastvalrow4);

                DataRow forecastvalrow5 = value.NewRow();
                forecastvalrow5[" "] = "Dividends";

                if (strategicForecastValueCalculations.strategicForecastForecastValue.DividendsPriorYear <= 0)
                    forecastvalrow5["Actual"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsPriorYear);
                else
                    forecastvalrow5["Actual"] = "-" + string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsPriorYear);

                //forecastvalrow5["Actual "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsCurrentQuarter);
                if (strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear0 <= 0)
                    forecastvalrow5["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear0);
                else
                    forecastvalrow5["Actual / Estimate"] = "-" + string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear0);

                if (strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear1 <= 0)
                    forecastvalrow5["Estimate"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear1);
                else
                    forecastvalrow5["Estimate"] = "-" + string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear1);

                if (strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear2 <= 0)
                    forecastvalrow5["Estimate "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear2);
                else
                    forecastvalrow5["Estimate "] = "-" + string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear2);

                if (strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear3 <= 0)
                    forecastvalrow5["Estimate  "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear3);
                else
                    forecastvalrow5["Estimate  "] = "-" + string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear3);

                if (strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear4 <= 0)
                    forecastvalrow5["Estimate   "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear4);
                else
                    forecastvalrow5["Estimate   "] = "-" + string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear4);

                if (strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear5 <= 0)
                    forecastvalrow5["Estimate    "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear5);
                else
                    forecastvalrow5["Estimate    "] = "-" + string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.DividendsYear5);

                value.Rows.Add(forecastvalrow5);

                DataRow forecastvalrow6 = value.NewRow();
                forecastvalrow6[" "] = "Bank Equity Capital";
                forecastvalrow6["Actual"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.BankEquityCapitalPriorYear);
                //forecastvalrow6["Actual "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.BankEquityCapitalCurrentQuarter);
                forecastvalrow6["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.BankEquityCapitalYear0);
                forecastvalrow6["Estimate"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.BankEquityCapitalYear1);
                forecastvalrow6["Estimate "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.BankEquityCapitalYear2);
                forecastvalrow6["Estimate  "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.BankEquityCapitalYear3);
                forecastvalrow6["Estimate   "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.BankEquityCapitalYear4);
                forecastvalrow6["Estimate    "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.BankEquityCapitalYear5);
                value.Rows.Add(forecastvalrow6);

                value.Rows.Add(value.NewRow());

                DataRow forecastvalrow7 = value.NewRow();
                forecastvalrow7[" "] = "Total Assets";
                forecastvalrow7["Actual"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.TotalAssetsPriorYear);
                //forecastvalrow7["Actual "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.TotalAssetsCurrentQuarter);
                forecastvalrow7["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.TotalAssetsYear0);
                forecastvalrow7["Estimate"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.TotalAssetsYear1);
                forecastvalrow7["Estimate "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.TotalAssetsYear2);
                forecastvalrow7["Estimate  "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.TotalAssetsYear3);
                forecastvalrow7["Estimate   "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.TotalAssetsYear4);
                forecastvalrow7["Estimate    "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastForecastValue.TotalAssetsYear5);
                value.Rows.Add(forecastvalrow7);

                DataRow forecastvalrow8 = value.NewRow();
                forecastvalrow8[" "] = "ROAA";
                forecastvalrow8["Actual"] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsPriorYear == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsPriorYear.Value, 2) + "%";
                //forecastvalrow8["Actual "] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsCurrentQuarter == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsCurrentQuarter.Value, 2) + "%";
                forecastvalrow8["Actual / Estimate"] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear0 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear0.Value, 2) + "%";
                forecastvalrow8["Estimate"] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear1 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear1.Value, 2) + "%";
                forecastvalrow8["Estimate "] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear2 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear2.Value, 2) + "%";
                forecastvalrow8["Estimate  "] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear3 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear3.Value, 2) + "%";
                forecastvalrow8["Estimate   "] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear4 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear4.Value, 2) + "%";
                forecastvalrow8["Estimate    "] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear5 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageAssetsYear5.Value, 2) + "%";
                value.Rows.Add(forecastvalrow8);

                DataRow forecastvalrow9 = value.NewRow();
                forecastvalrow9[" "] = "ROAE";
                forecastvalrow9["Actual"] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityPriorYear == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityPriorYear.Value, 2) + "%";
                //forecastvalrow9["Actual "] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityCurrentQuarter == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityCurrentQuarter.Value, 2) + "%";
                forecastvalrow9["Actual / Estimate"] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear0 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear0.Value, 2) + "%";
                forecastvalrow9["Estimate"] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear1 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear1.Value, 2) + "%";
                forecastvalrow9["Estimate "] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear2 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear2.Value, 2) + "%";
                forecastvalrow9["Estimate  "] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear3 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear3.Value, 2) + "%";
                forecastvalrow9["Estimate   "] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear4 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear4.Value, 2) + "%";
                forecastvalrow9["Estimate    "] = strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear5 == null ? "%" : Math.Round(strategicForecastValueCalculations.strategicForecastForecastValue.ReturnOnAverageEquityYear5.Value, 2) + "%";
                value.Rows.Add(forecastvalrow9);

                DataRow forecastvalrow10 = value.NewRow();
                forecastvalrow10[" "] = "Shares Outstanding (Base)";
                forecastvalrow10["Actual"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastInput.SharesOutstandingActualPriorYear);
                //forecastvalrow10["Actual "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastInput.SharesOutstandingActualCurrentQuarter);
                forecastvalrow10["Actual / Estimate"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastInput.SharesOutstandingActualYear0);
                forecastvalrow10["Estimate"] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastInput.SharesOutstandingActualYear1);
                forecastvalrow10["Estimate "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastInput.SharesOutstandingActualYear2);
                forecastvalrow10["Estimate  "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastInput.SharesOutstandingActualYear3);
                forecastvalrow10["Estimate   "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastInput.SharesOutstandingActualYear4);
                forecastvalrow10["Estimate    "] = string.Format("{0:#,##0}", strategicForecastValueCalculations.strategicForecastInput.SharesOutstandingActualYear5);
                value.Rows.Add(forecastvalrow10);

                DataRow forecastvalrow11 = value.NewRow();
                forecastvalrow11[" "] = "Book Value (BV) Share Price";
                forecastvalrow11["Actual"] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.BookValueSharePricePriorYear);
                //forecastvalrow11["Actual "] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.BookValueSharePriceCurrentQuarter);
                forecastvalrow11["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.BookValueSharePriceYear0);
                forecastvalrow11["Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.BookValueSharePriceYear1);
                forecastvalrow11["Estimate "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.BookValueSharePriceYear2);
                forecastvalrow11["Estimate  "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.BookValueSharePriceYear3);
                forecastvalrow11["Estimate   "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.BookValueSharePriceYear4);
                forecastvalrow11["Estimate    "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.BookValueSharePriceYear5);
                value.Rows.Add(forecastvalrow11);

                DataRow forecastvalrow12 = value.NewRow();
                forecastvalrow12[" "] = "Market Value Share Price 1.25X";
                forecastvalrow12["Actual"] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice125PriorYear);
                //forecastvalrow12["Actual "] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice125CurrentQuarter);
                forecastvalrow12["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice125Year0);
                forecastvalrow12["Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice125Year1);
                forecastvalrow12["Estimate "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice125Year2);
                forecastvalrow12["Estimate  "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice125Year3);
                forecastvalrow12["Estimate   "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice125Year4);
                forecastvalrow12["Estimate    "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice125Year5);
                value.Rows.Add(forecastvalrow12);

                DataRow forecastvalrow13 = value.NewRow();
                forecastvalrow13[" "] = "Market Value Share Price 1.50X";
                forecastvalrow13["Actual"] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice150PriorYear);
                //forecastvalrow13["Actual "] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice150CurrentQuarter);
                forecastvalrow13["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice150Year0);
                forecastvalrow13["Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice150Year1);
                forecastvalrow13["Estimate "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice150Year2);
                forecastvalrow13["Estimate  "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice150Year3);
                forecastvalrow13["Estimate   "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice150Year4);
                forecastvalrow13["Estimate    "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice150Year5);
                value.Rows.Add(forecastvalrow13);

                DataRow forecastvalrow14 = value.NewRow();
                forecastvalrow14[" "] = "Market Value Share Price 1.75X";
                forecastvalrow14["Actual"] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice175PriorYear);
                //forecastvalrow14["Actual "] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice175CurrentQuarter);
                forecastvalrow14["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice175Year0);
                forecastvalrow14["Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice175Year1);
                forecastvalrow14["Estimate "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice175Year2);
                forecastvalrow14["Estimate  "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice175Year3);
                forecastvalrow14["Estimate   "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice175Year4);
                forecastvalrow14["Estimate    "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice175Year5);
                value.Rows.Add(forecastvalrow14);

                DataRow forecastvalrow15 = value.NewRow();
                forecastvalrow15[" "] = "Market Value Share Price 2.00X";
                forecastvalrow15["Actual"] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice200PriorYear);
                //forecastvalrow15["Actual "] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice200CurrentQuarter);
                forecastvalrow15["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice200Year0);
                forecastvalrow15["Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice200Year1);
                forecastvalrow15["Estimate "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice200Year2);
                forecastvalrow15["Estimate  "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice200Year3);
                forecastvalrow15["Estimate   "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice200Year4);
                forecastvalrow15["Estimate    "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice200Year5);
                value.Rows.Add(forecastvalrow15);

                DataRow forecastvalrow16 = value.NewRow();
                forecastvalrow16[" "] = "Market Value Share Price 2.25X";
                forecastvalrow16["Actual"] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice225PriorYear);
                //forecastvalrow16["Actual "] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice225CurrentQuarter);
                forecastvalrow16["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice225Year0);
                forecastvalrow16["Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice225Year1);
                forecastvalrow16["Estimate "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice225Year2);
                forecastvalrow16["Estimate  "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice225Year3);
                forecastvalrow16["Estimate   "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice225Year4);
                forecastvalrow16["Estimate    "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice225Year5);
                value.Rows.Add(forecastvalrow16);

                DataRow forecastvalrow17 = value.NewRow();
                forecastvalrow17[" "] = "Market Value Share Price 2.50X";
                forecastvalrow17["Actual"] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice250PriorYear);
                //forecastvalrow17["Actual "] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice250CurrentQuarter);
                forecastvalrow17["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice250Year0);
                forecastvalrow17["Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice250Year1);
                forecastvalrow17["Estimate "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice250Year2);
                forecastvalrow17["Estimate  "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice250Year3);
                forecastvalrow17["Estimate   "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice250Year4);
                forecastvalrow17["Estimate    "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice250Year5);
                value.Rows.Add(forecastvalrow17);

                DataRow forecastvalrow18 = value.NewRow();
                forecastvalrow18[" "] = "Market Value Share Price 2.75X";
                forecastvalrow18["Actual"] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice275PriorYear);
                //forecastvalrow18["Actual "] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice275CurrentQuarter);
                forecastvalrow18["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice275Year0);
                forecastvalrow18["Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice275Year1);
                forecastvalrow18["Estimate "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice275Year2);
                forecastvalrow18["Estimate  "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice275Year3);
                forecastvalrow18["Estimate   "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice275Year4);
                forecastvalrow18["Estimate    "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice275Year5);
                value.Rows.Add(forecastvalrow18);

                DataRow forecastvalrow19 = value.NewRow();
                forecastvalrow19[" "] = "Market Value Share Price 3.00X";
                forecastvalrow19["Actual"] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice300PriorYear);
                //forecastvalrow19["Actual "] = string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice300CurrentQuarter);
                forecastvalrow19["Actual / Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice300Year0);
                forecastvalrow19["Estimate"] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice300Year1);
                forecastvalrow19["Estimate "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice300Year2);
                forecastvalrow19["Estimate  "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice300Year3);
                forecastvalrow19["Estimate   "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice300Year4);
                forecastvalrow19["Estimate    "] = "$" + string.Format("{0:0,0.00}", strategicForecastValueCalculations.strategicForecastForecastValue.MarketValueSharePrice300Year5);
                value.Rows.Add(forecastvalrow19);

            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return value;
        }


        [HttpPost]
        public string DeleteScenario(StrategicForecastModelReq deleteScenarioInput)
        {
            string result = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter scenarioKey = new SqlParameter("@ScenarioKey", SqlDbType.Int);
                scenarioKey.Value = deleteScenarioInput.ScenarioKey;
                result = ent.Database.SqlQuery<string>("exec uspRptDeleteStrategicForecastScenario @ScenarioKey", scenarioKey).FirstOrDefault();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpPost]
        public bool SaveOrUpdateComparison(StrategicForecastComparisonParameters sfCompParams)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter summaryKey = new SqlParameter("@SummaryKey", SqlDbType.BigInt);
                SqlParameter summaryName = new SqlParameter("@SummaryName", SqlDbType.VarChar);
                summaryName.Value = sfCompParams.ComparisonName;
                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.BigInt);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);
                SqlParameter taskType = new SqlParameter("@TaskType", SqlDbType.VarChar);
                if (sfCompParams.ComparisonKey == -1)
                {
                    taskType.Value = "Insert";
                    summaryKey.Value = DBNull.Value;
                }
                else
                {
                    taskType.Value = "Update";
                    summaryKey.Value = sfCompParams.ComparisonKey;
                }

                var comparisonKeyOrRowsUpdated = ent.Database.SqlQuery<Int64>("exec uspRptAppStrategicForecastSummaryUpdate @SummaryKey, @SummaryName, @TenantKey, @UserKey, @TaskType", summaryKey, summaryName, tenantKey, userKey, taskType).FirstOrDefault();
                long summaryKeyComp = 0;
                SqlParameter tenantKeyComp = new SqlParameter("@TenantKey", SqlDbType.BigInt);
                tenantKeyComp.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter userKeyComp = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userKeyComp.Value = UtilityFunctions.GetUserKey(User.Identity.Name);
                SqlParameter taskTypeComp = new SqlParameter("@TaskType", SqlDbType.VarChar);
                if (sfCompParams.ComparisonKey == -1)
                {
                    taskTypeComp.Value = "Insert";
                    summaryKeyComp = comparisonKeyOrRowsUpdated;
                }
                else
                {
                    taskTypeComp.Value = "Update";
                    summaryKeyComp = sfCompParams.ComparisonKey;
                }

                DataTable createScenarioParams = new DataTable();
                createScenarioParams.Columns.Add("SummaryKey", typeof(long));
                createScenarioParams.Columns.Add("ScenarioKey", typeof(long));

                if (sfCompParams.ScenarioKey1.HasValue)
                    createScenarioParams.Rows.Add(summaryKeyComp, sfCompParams.ScenarioKey1.Value);
                if (sfCompParams.ScenarioKey2.HasValue)
                    createScenarioParams.Rows.Add(summaryKeyComp, sfCompParams.ScenarioKey2.Value);
                if (sfCompParams.ScenarioKey3.HasValue)
                    createScenarioParams.Rows.Add(summaryKeyComp, sfCompParams.ScenarioKey3.Value);
                if (sfCompParams.ScenarioKey4.HasValue)
                    createScenarioParams.Rows.Add(summaryKeyComp, sfCompParams.ScenarioKey4.Value);
                if (sfCompParams.ScenarioKey5.HasValue)
                    createScenarioParams.Rows.Add(summaryKeyComp, sfCompParams.ScenarioKey5.Value);
                if (sfCompParams.ScenarioKey6.HasValue)
                    createScenarioParams.Rows.Add(summaryKeyComp, sfCompParams.ScenarioKey6.Value);
                if (sfCompParams.ScenarioKey7.HasValue)
                    createScenarioParams.Rows.Add(summaryKeyComp, sfCompParams.ScenarioKey7.Value);
                if (sfCompParams.ScenarioKey8.HasValue)
                    createScenarioParams.Rows.Add(summaryKeyComp, sfCompParams.ScenarioKey8.Value);

                SqlParameter summaryScenarioTable = new SqlParameter("@SummaryScenarioTable", SqlDbType.Structured);
                summaryScenarioTable.Value = createScenarioParams;
                summaryScenarioTable.TypeName = "dbo.SummaryScenario";
                var numberOfRecords = ent.Database.SqlQuery<Int32>("exec uspRptAppStrategicForecastSummaryScenarioUpdate @SummaryScenarioTable, @UserKey, @TenantKey, @TaskType", summaryScenarioTable, userKeyComp, tenantKeyComp, taskTypeComp).FirstOrDefault();
                result = true;
            }
            catch (Exception ex)
            {

            }

            return result;
        }

        [HttpPost]
        public StrategicForecastComparisonParameters GetComparisonDetails(StrategicForecastComparisonParameters sfCompParams)
        {
            StrategicForecastComparisonParameters comp = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter compKey = new SqlParameter("@ComparisonKey", SqlDbType.BigInt);
                compKey.Value = sfCompParams.ComparisonKey;
                var scenarios = ent.Database.SqlQuery<StrategicForecasrComparisonDetails>("exec uspRptAppStrategicForecastGetComparisonDetails @ComparisonKey", compKey).ToList();
                if (scenarios != null & scenarios.Count > 0)
                {
                    comp = new StrategicForecastComparisonParameters();
                    comp.ScenarioKey1 = scenarios[0].ScenarioKey;
                    if (scenarios.Count > 1)
                        comp.ScenarioKey2 = scenarios[1].ScenarioKey;
                    if (scenarios.Count > 2)
                        comp.ScenarioKey3 = scenarios[2].ScenarioKey;
                    if (scenarios.Count > 3)
                        comp.ScenarioKey4 = scenarios[3].ScenarioKey;
                    if (scenarios.Count > 4)
                        comp.ScenarioKey5 = scenarios[4].ScenarioKey;
                    if (scenarios.Count > 5)
                        comp.ScenarioKey6 = scenarios[5].ScenarioKey;
                    if (scenarios.Count > 6)
                        comp.ScenarioKey7 = scenarios[6].ScenarioKey;
                    if (scenarios.Count > 7)
                        comp.ScenarioKey8 = scenarios[7].ScenarioKey;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return comp;
        }

        [HttpGet]
        public List<StrategicForecastComparisonParameters> GetAllComparisons()
        {
            List<StrategicForecastComparisonParameters> comparisons = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var uKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                var comps = ent.AppStrategicForecastSummaries.Where(obj => obj.UserKey == uKey).ToList();
                if (comps != null && comps.Count > 0)
                {
                    comparisons = new List<StrategicForecastComparisonParameters>();
                    foreach (AppStrategicForecastSummary summ in comps)
                    {
                        StrategicForecastComparisonParameters comp = new StrategicForecastComparisonParameters();
                        comp.ComparisonKey = summ.SummaryKey;
                        comp.ComparisonName = summ.SummaryName;
                        comparisons.Add(comp);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return comparisons;
        }

        [HttpPost]
        public bool IsThereAComparisonWithSameName(StrategicForecastComparisonParameters sfCompParams)
        {
            bool result = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var existingComparisons = ent.AppStrategicForecastSummaries.Where(obj => obj.SummaryName == sfCompParams.ComparisonName).ToList();
                if (existingComparisons != null && existingComparisons.Count > 0)
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
