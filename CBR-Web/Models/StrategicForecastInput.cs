﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class StrategicForecastInput
    {
        public string ModelName { get; set; }
        public long? ModelKey { get; set; }
        public long? UserKey { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public bool IsSelected { get; set; }
        public string ModelOwner { get; set; }
        public Decimal? AssetGrowthRatePriorYear { get; set; }
        public Decimal? AssetGrowthRateCurrentQuarter { get; set; }
        public Decimal? AssetGrowthRateYear0 { get; set; }
        public Decimal? AssetGrowthRateYear1 { get; set; }
        public Decimal? AssetGrowthRateYear2 { get; set; }
        public Decimal? AssetGrowthRateYear3 { get; set; }
        public Decimal? AssetGrowthRateYear4 { get; set; }
        public Decimal? AssetGrowthRateYear5 { get; set; }
        public bool? UseNetIncomeInput { get; set; }
        public Decimal? NetIncomePriorYear { get; set; }
        public Decimal? NetIncomeCurrentQuarter { get; set; }
        public Decimal? NetIncomeYear0 { get; set; }
        public Decimal? NetIncomeYear1 { get; set; }
        public Decimal? NetIncomeYear2 { get; set; }
        public Decimal? NetIncomeYear3 { get; set; }
        public Decimal? NetIncomeYear4 { get; set; }
        public Decimal? NetIncomeYear5 { get; set; }
        public Decimal? ReturnOnAverageAssetsPriorYear { get; set; }
        public Decimal? ReturnOnAverageAssetsCurrentQuarter { get; set; }
        public Decimal? ReturnOnAverageAssetsYear0 { get; set; }
        public Decimal? ReturnOnAverageAssetsYear1 { get; set; }
        public Decimal? ReturnOnAverageAssetsYear2 { get; set; }
        public Decimal? ReturnOnAverageAssetsYear3 { get; set; }
        public Decimal? ReturnOnAverageAssetsYear4 { get; set; }
        public Decimal? ReturnOnAverageAssetsYear5 { get; set; }
        public bool? UseCashDividendsInput { get; set; }
        public Decimal? DividendsPriorYear { get; set; }
        public Decimal? DividendsCurrentQuarter { get; set; }
        public Decimal? DividendsYear0 { get; set; }
        public Decimal? DividendsYear1 { get; set; }
        public Decimal? DividendsYear2 { get; set; }
        public Decimal? DividendsYear3 { get; set; }
        public Decimal? DividendsYear4 { get; set; }
        public Decimal? DividendsYear5 { get; set; }
        public Decimal? DividendsRatePriorYear { get; set; }
        public Decimal? DividendsRateCurrentQuarter { get; set; }
        public Decimal? DividendsRateYear0 { get; set; }
        public Decimal? DividendsRateYear1 { get; set; }
        public Decimal? DividendsRateYear2 { get; set; }
        public Decimal? DividendsRateYear3 { get; set; }
        public Decimal? DividendsRateYear4 { get; set; }
        public Decimal? DividendsRateYear5 { get; set; }
        public bool? UseNewCapitalInput { get; set; }
        public Decimal? NewCapitalPriorYear { get; set; }
        public Decimal? NewCapitalCurrentQuarter { get; set; }
        public Decimal? NewCapitalYear0 { get; set; }
        public Decimal? NewCapitalYear1 { get; set; }
        public Decimal? NewCapitalYear2 { get; set; }
        public Decimal? NewCapitalYear3 { get; set; }
        public Decimal? NewCapitalYear4 { get; set; }
        public Decimal? NewCapitalYear5 { get; set; }
        public Decimal? PricePerSharePriorYear { get; set; }
        public Decimal? PricePerShareCurrentQuarter { get; set; }
        public Decimal? PricePerShareYear0 { get; set; }
        public Decimal? PricePerShareYear1 { get; set; }
        public Decimal? PricePerShareYear2 { get; set; }
        public Decimal? PricePerShareYear3 { get; set; }
        public Decimal? PricePerShareYear4 { get; set; }
        public Decimal? PricePerShareYear5 { get; set; }
        public Decimal? NewAcquisitionAssetsPriorYear { get; set; }
        public Decimal? NewAcquisitionAssetsCurrentQuarter { get; set; }
        public Decimal? NewAcquisitionAssetsYear0 { get; set; }
        public Decimal? NewAcquisitionAssetsYear1 { get; set; }
        public Decimal? NewAcquisitionAssetsYear2 { get; set; }
        public Decimal? NewAcquisitionAssetsYear3 { get; set; }
        public Decimal? NewAcquisitionAssetsYear4 { get; set; }
        public Decimal? NewAcquisitionAssetsYear5 { get; set; }
        public bool? UseCet1CapitalAdjustmentInput { get; set; }
        public Decimal? Cet1CapitalAdjustmentPriorYear { get; set; }
        public Decimal? Cet1CapitalAdjustmentCurrentQuarter { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear0 { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear1 { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear2 { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear3 { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear4 { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear5 { get; set; }
        public bool? UseTier1CapitalAdjustmentInput { get; set; }
        public Decimal? Tier1CapitalAdjustmentPriorYear { get; set; }
        public Decimal? Tier1CapitalAdjustmentCurrentQuarter { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear0 { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear1 { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear2 { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear3 { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear4 { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear5 { get; set; }
        public bool? UseTier2CapitalInput { get; set; }
        public Decimal? Tier2CapitalPriorYear { get; set; }
        public Decimal? Tier2CapitalCurrentQuarter { get; set; }
        public Decimal? Tier2CapitalYear0 { get; set; }
        public Decimal? Tier2CapitalYear1 { get; set; }
        public Decimal? Tier2CapitalYear2 { get; set; }
        public Decimal? Tier2CapitalYear3 { get; set; }
        public Decimal? Tier2CapitalYear4 { get; set; }
        public Decimal? Tier2CapitalYear5 { get; set; }
        public bool? UseRiskWeightedAssetsInput { get; set; }
        public Decimal? RiskWeightedAssetsPriorYear { get; set; }
        public Decimal? RiskWeightedAssetsCurrentQuarter { get; set; }
        public Decimal? RiskWeightedAssetsYear0 { get; set; }
        public Decimal? RiskWeightedAssetsYear1 { get; set; }
        public Decimal? RiskWeightedAssetsYear2 { get; set; }
        public Decimal? RiskWeightedAssetsYear3 { get; set; }
        public Decimal? RiskWeightedAssetsYear4 { get; set; }
        public Decimal? RiskWeightedAssetsYear5 { get; set; }
        public bool? UseTotalAssetsForLeverageInput { get; set; }
        public Decimal? TotalAssetsLeveragePriorYear { get; set; }
        public Decimal? TotalAssetsLeverageCurrentQuarter { get; set; }
        public Decimal? TotalAssetsLeverageYear0 { get; set; }
        public Decimal? TotalAssetsLeverageYear1 { get; set; }
        public Decimal? TotalAssetsLeverageYear2 { get; set; }
        public Decimal? TotalAssetsLeverageYear3 { get; set; }
        public Decimal? TotalAssetsLeverageYear4 { get; set; }
        public Decimal? TotalAssetsLeverageYear5 { get; set; }
        public bool? UseSharesOutstandingInput { get; set; }
        public Decimal? SharesOutstandingActualPriorYear { get; set; }
        public Decimal? SharesOutstandingActualCurrentQuarter { get; set; }
        public Decimal? SharesOutstandingActualYear0 { get; set; }
        public Decimal? SharesOutstandingActualYear1 { get; set; }
        public Decimal? SharesOutstandingActualYear2 { get; set; }
        public Decimal? SharesOutstandingActualYear3 { get; set; }
        public Decimal? SharesOutstandingActualYear4 { get; set; }
        public Decimal? SharesOutstandingActualYear5 { get; set; }
        public Decimal? Tier2CapitalToTier1PriorYear { get; set; }
        public Decimal? Tier2CapitalToTier1CurrentQuarter { get; set; }
        public Decimal? RiskWeightedAssetsToAssetsPriorYear { get; set; }
        public Decimal? RiskWeightedAssetsToAssetsCurrentQuarter { get; set; }
        public Decimal? AssetsForLeverageToAssetsPriorYear { get; set; }
        public Decimal? AssetsForLeverageToAssetsCurrentQuarter { get; set; }
    }
}
