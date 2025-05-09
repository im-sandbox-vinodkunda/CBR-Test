﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    public class StrategicForecastForecastData
    {
        #region //Properties
        public Decimal? NetIncomePriorYear { get; set; }
        public Decimal? NetIncomeCurrentQuarter { get; set; }
        public Decimal? NetIncomeYear0 { get; set; }
        public Decimal? NetIncomeYear1 { get; set; }
        public Decimal? NetIncomeYear2 { get; set; }
        public Decimal? NetIncomeYear3 { get; set; }
        public Decimal? NetIncomeYear4 { get; set; }
        public Decimal? NetIncomeYear5 { get; set; }
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
        public Decimal? BankEquityCapitalPriorYear { get; set; }
        public Decimal? BankEquityCapitalCurrentQuarter { get; set; }
        public Decimal? BankEquityCapitalYear0 { get; set; }
        public Decimal? BankEquityCapitalYear1 { get; set; }
        public Decimal? BankEquityCapitalYear2 { get; set; }
        public Decimal? BankEquityCapitalYear3 { get; set; }
        public Decimal? BankEquityCapitalYear4 { get; set; }
        public Decimal? BankEquityCapitalYear5 { get; set; }
        public Decimal? NewCapitalPriorYear { get; set; }
        public Decimal? NewCapitalCurrentQuarter { get; set; }
        public Decimal? NewCapitalYear0 { get; set; }
        public Decimal? NewCapitalYear1 { get; set; }
        public Decimal? NewCapitalYear2 { get; set; }
        public Decimal? NewCapitalYear3 { get; set; }
        public Decimal? NewCapitalYear4 { get; set; }
        public Decimal? NewCapitalYear5 { get; set; }
        public Decimal? Cet1CapitalAdjustmentPriorYear { get; set; }
        public Decimal? Cet1CapitalAdjustmentCurrentQuarter { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear0 { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear1 { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear2 { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear3 { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear4 { get; set; }
        public Decimal? Cet1CapitalAdjustmentYear5 { get; set; }
        public Decimal? Cet1CapitalPriorYear { get; set; }
        public Decimal? Cet1CapitalCurrentQuarter { get; set; }
        public Decimal? Cet1CapitalYear0 { get; set; }
        public Decimal? Cet1CapitalYear1 { get; set; }
        public Decimal? Cet1CapitalYear2 { get; set; }
        public Decimal? Cet1CapitalYear3 { get; set; }
        public Decimal? Cet1CapitalYear4 { get; set; }
        public Decimal? Cet1CapitalYear5 { get; set; }
        public Decimal? Tier1CapitalAdjustmentPriorYear { get; set; }
        public Decimal? Tier1CapitalAdjustmentCurrentQuarter { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear0 { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear1 { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear2 { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear3 { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear4 { get; set; }
        public Decimal? Tier1CapitalAdjustmentYear5 { get; set; }
        public Decimal? Tier1CapitalPriorYear { get; set; }
        public Decimal? Tier1CapitalCurrentQuarter { get; set; }
        public Decimal? Tier1CapitalYear0 { get; set; }
        public Decimal? Tier1CapitalYear1 { get; set; }
        public Decimal? Tier1CapitalYear2 { get; set; }
        public Decimal? Tier1CapitalYear3 { get; set; }
        public Decimal? Tier1CapitalYear4 { get; set; }
        public Decimal? Tier1CapitalYear5 { get; set; }
        public Decimal? Tier2CapitalPriorYear { get; set; }
        public Decimal? Tier2CapitalCurrentQuarter { get; set; }
        public Decimal? Tier2CapitalYear0 { get; set; }
        public Decimal? Tier2CapitalYear1 { get; set; }
        public Decimal? Tier2CapitalYear2 { get; set; }
        public Decimal? Tier2CapitalYear3 { get; set; }
        public Decimal? Tier2CapitalYear4 { get; set; }
        public Decimal? Tier2CapitalYear5 { get; set; }
        public Decimal? TotalRiskBasedCapitalPriorYear { get; set; }
        public Decimal? TotalRiskBasedCapitalCurrentQuarter { get; set; }
        public Decimal? TotalRiskBasedCapitalYear0 { get; set; }
        public Decimal? TotalRiskBasedCapitalYear1 { get; set; }
        public Decimal? TotalRiskBasedCapitalYear2 { get; set; }
        public Decimal? TotalRiskBasedCapitalYear3 { get; set; }
        public Decimal? TotalRiskBasedCapitalYear4 { get; set; }
        public Decimal? TotalRiskBasedCapitalYear5 { get; set; }
        public Decimal? RiskWeightedAssetsPriorYear { get; set; }
        public Decimal? RiskWeightedAssetsCurrentQuarter { get; set; }
        public Decimal? RiskWeightedAssetsYear0 { get; set; }
        public Decimal? RiskWeightedAssetsYear1 { get; set; }
        public Decimal? RiskWeightedAssetsYear2 { get; set; }
        public Decimal? RiskWeightedAssetsYear3 { get; set; }
        public Decimal? RiskWeightedAssetsYear4 { get; set; }
        public Decimal? RiskWeightedAssetsYear5 { get; set; }
        public Decimal? TotalAssetsForLeveragePriorYear { get; set; }
        public Decimal? TotalAssetsForLeverageCurrentQuarter { get; set; }
        public Decimal? TotalAssetsForLeverageYear0 { get; set; }
        public Decimal? TotalAssetsForLeverageYear1 { get; set; }
        public Decimal? TotalAssetsForLeverageYear2 { get; set; }
        public Decimal? TotalAssetsForLeverageYear3 { get; set; }
        public Decimal? TotalAssetsForLeverageYear4 { get; set; }
        public Decimal? TotalAssetsForLeverageYear5 { get; set; }
        public Decimal? TotalAssetsPriorYear { get; set; }
        public Decimal? TotalAssetsCurrentQuarter { get; set; }
        public Decimal? TotalAssetsYear0 { get; set; }
        public Decimal? TotalAssetsYear1 { get; set; }
        public Decimal? TotalAssetsYear2 { get; set; }
        public Decimal? TotalAssetsYear3 { get; set; }
        public Decimal? TotalAssetsYear4 { get; set; }
        public Decimal? TotalAssetsYear5 { get; set; }
        public Decimal? NewAcquisitionAssetsPriorYear { get; set; }
        public Decimal? NewAcquisitionAssetsCurrentQuarter { get; set; }
        public Decimal? NewAcquisitionAssetsYear0 { get; set; }
        public Decimal? NewAcquisitionAssetsYear1 { get; set; }
        public Decimal? NewAcquisitionAssetsYear2 { get; set; }
        public Decimal? NewAcquisitionAssetsYear3 { get; set; }
        public Decimal? NewAcquisitionAssetsYear4 { get; set; }
        public Decimal? NewAcquisitionAssetsYear5 { get; set; }
        public Decimal? Cet1CapitalRatioPriorYear { get; set; }
        public Decimal? Cet1CapitalRatioCurrentQuarter { get; set; }
        public Decimal? Cet1CapitalRatioYear0 { get; set; }
        public Decimal? Cet1CapitalRatioYear1 { get; set; }
        public Decimal? Cet1CapitalRatioYear2 { get; set; }
        public Decimal? Cet1CapitalRatioYear3 { get; set; }
        public Decimal? Cet1CapitalRatioYear4 { get; set; }
        public Decimal? Cet1CapitalRatioYear5 { get; set; }
        public Decimal? Tier1RBCRatioPriorYear { get; set; }
        public Decimal? Tier1RBCRatioCurrentQuarter { get; set; }
        public Decimal? Tier1RBCRatioYear0 { get; set; }
        public Decimal? Tier1RBCRatioYear1 { get; set; }
        public Decimal? Tier1RBCRatioYear2 { get; set; }
        public Decimal? Tier1RBCRatioYear3 { get; set; }
        public Decimal? Tier1RBCRatioYear4 { get; set; }
        public Decimal? Tier1RBCRatioYear5 { get; set; }
        public Decimal? TotalRBCRatioPriorYear { get; set; }
        public Decimal? TotalRBCRatioCurrentQuarter { get; set; }
        public Decimal? TotalRBCRatioYear0 { get; set; }
        public Decimal? TotalRBCRatioYear1 { get; set; }
        public Decimal? TotalRBCRatioYear2 { get; set; }
        public Decimal? TotalRBCRatioYear3 { get; set; }
        public Decimal? TotalRBCRatioYear4 { get; set; }
        public Decimal? TotalRBCRatioYear5 { get; set; }
        public Decimal? Tier1LeverageRatioPriorYear { get; set; }
        public Decimal? Tier1LeverageRatioCurrentQuarter { get; set; }
        public Decimal? Tier1LeverageRatioYear0 { get; set; }
        public Decimal? Tier1LeverageRatioYear1 { get; set; }
        public Decimal? Tier1LeverageRatioYear2 { get; set; }
        public Decimal? Tier1LeverageRatioYear3 { get; set; }
        public Decimal? Tier1LeverageRatioYear4 { get; set; }
        public Decimal? Tier1LeverageRatioYear5 { get; set; }
        public Decimal? AssetGrowthRatePriorYear { get; set; }
        public Decimal? AssetGrowthRateCurrentQuarter { get; set; }
        public Decimal? AssetGrowthRateYear0 { get; set; }
        public Decimal? AssetGrowthRateYear1 { get; set; }
        public Decimal? AssetGrowthRateYear2 { get; set; }
        public Decimal? AssetGrowthRateYear3 { get; set; }
        public Decimal? AssetGrowthRateYear4 { get; set; }
        public Decimal? AssetGrowthRateYear5 { get; set; }
        public Decimal? ReturnOnAverageAssetsPriorYear { get; set; }
        public Decimal? ReturnOnAverageAssetsCurrentQuarter { get; set; }
        public Decimal? ReturnOnAverageAssetsYear0 { get; set; }
        public Decimal? ReturnOnAverageAssetsYear1 { get; set; }
        public Decimal? ReturnOnAverageAssetsYear2 { get; set; }
        public Decimal? ReturnOnAverageAssetsYear3 { get; set; }
        public Decimal? ReturnOnAverageAssetsYear4 { get; set; }
        public Decimal? ReturnOnAverageAssetsYear5 { get; set; }
        public Decimal? ReturnOnAverageEquityPriorYear { get; set; }
        public Decimal? ReturnOnAverageEquityCurrentQuarter { get; set; }
        public Decimal? ReturnOnAverageEquityYear0 { get; set; }
        public Decimal? ReturnOnAverageEquityYear1 { get; set; }
        public Decimal? ReturnOnAverageEquityYear2 { get; set; }
        public Decimal? ReturnOnAverageEquityYear3 { get; set; }
        public Decimal? ReturnOnAverageEquityYear4 { get; set; }
        public Decimal? ReturnOnAverageEquityYear5 { get; set; }
        public Decimal? MvEquityPriorYear { get; set; }
        public Decimal? MvEquityCurrentQuarter { get; set; }
        public Decimal? MvEquityYear0 { get; set; }
        public Decimal? MvEquityYear1 { get; set; }
        public Decimal? MvEquityYear2 { get; set; }
        public Decimal? MvEquityYear3 { get; set; }
        public Decimal? MvEquityYear4 { get; set; }
        public Decimal? MvEquityYear5 { get; set; }
        public Decimal? SharesOutstandingPriorYear { get; set; }
        public Decimal? SharesOutstandingCurrentQuarter { get; set; }
        public Decimal? SharesOutstandingYear0 { get; set; }
        public Decimal? SharesOutstandingYear1 { get; set; }
        public Decimal? SharesOutstandingYear2 { get; set; }
        public Decimal? SharesOutstandingYear3 { get; set; }
        public Decimal? SharesOutstandingYear4 { get; set; }
        public Decimal? SharesOutstandingYear5 { get; set; }
        public Decimal? BvSharePricePriorYear { get; set; }
        public Decimal? BvSharePriceCurrentQuarter { get; set; }
        public Decimal? BvSharePriceYear0 { get; set; }
        public Decimal? BvSharePriceYear1 { get; set; }
        public Decimal? BvSharePriceYear2 { get; set; }
        public Decimal? BvSharePriceYear3 { get; set; }
        public Decimal? BvSharePriceYear4 { get; set; }
        public Decimal? BvSharePriceYear5 { get; set; }
        public Decimal? MvSharePricePriorYear { get; set; }
        public Decimal? MvSharePriceCurrentQuarter { get; set; }
        public Decimal? MvSharePriceYear0 { get; set; }
        public Decimal? MvSharePriceYear1 { get; set; }
        public Decimal? MvSharePriceYear2 { get; set; }
        public Decimal? MvSharePriceYear3 { get; set; }
        public Decimal? MvSharePriceYear4 { get; set; }
        public Decimal? MvSharePriceYear5 { get; set; }
        public Decimal? EarningsPerSharePricePriorYear { get; set; }
        public Decimal? EarningsPerSharePriceCurrentQuarter { get; set; }
        public Decimal? EarningsPerSharePriceYear0 { get; set; }
        public Decimal? EarningsPerSharePriceYear1 { get; set; }
        public Decimal? EarningsPerSharePriceYear2 { get; set; }
        public Decimal? EarningsPerSharePriceYear3 { get; set; }
        public Decimal? EarningsPerSharePriceYear4 { get; set; }
        public Decimal? EarningsPerSharePriceYear5 { get; set; }
        public Decimal? EarningsPerShare15PricePriorYear { get; set; }
        public Decimal? EarningsPerShare15PriceCurrentQuarter { get; set; }
        public Decimal? EarningsPerShare15PriceYear0 { get; set; }
        public Decimal? EarningsPerShare15PriceYear1 { get; set; }
        public Decimal? EarningsPerShare15PriceYear2 { get; set; }
        public Decimal? EarningsPerShare15PriceYear3 { get; set; }
        public Decimal? EarningsPerShare15PriceYear4 { get; set; }
        public Decimal? EarningsPerShare15PriceYear5 { get; set; }
        public Decimal? EarningsPerShare20PricePriorYear { get; set; }
        public Decimal? EarningsPerShare20PriceCurrentQuarter { get; set; }
        public Decimal? EarningsPerShare20PriceYear0 { get; set; }
        public Decimal? EarningsPerShare20PriceYear1 { get; set; }
        public Decimal? EarningsPerShare20PriceYear2 { get; set; }
        public Decimal? EarningsPerShare20PriceYear3 { get; set; }
        public Decimal? EarningsPerShare20PriceYear4 { get; set; }
        public Decimal? EarningsPerShare20PriceYear5 { get; set; }
        public Decimal? DividendPerSharePricePriorYear { get; set; }
        public Decimal? DividendPerSharePriceCurrentQuarter { get; set; }
        public Decimal? DividendPerSharePriceYear0 { get; set; }
        public Decimal? DividendPerSharePriceYear1 { get; set; }
        public Decimal? DividendPerSharePriceYear2 { get; set; }
        public Decimal? DividendPerSharePriceYear3 { get; set; }
        public Decimal? DividendPerSharePriceYear4 { get; set; }
        public Decimal? DividendPerSharePriceYear5 { get; set; }
        public Decimal? PricePerSharePriorYear { get; set; }
        public Decimal? PricePerShareCurrentQuarter { get; set; }
        public Decimal? PricePerShareYear0 { get; set; }
        public Decimal? PricePerShareYear1 { get; set; }
        public Decimal? PricePerShareYear2 { get; set; }
        public Decimal? PricePerShareYear3 { get; set; }
        public Decimal? PricePerShareYear4 { get; set; }
        public Decimal? PricePerShareYear5 { get; set; }
        #endregion             
    }   
}
