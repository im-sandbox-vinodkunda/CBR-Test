using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class StrategicForecastDashboardConcepts
    {
        public Decimal? NetIncomePriorYear { get; set; }
        public Decimal? NetIncomeCurrentQuarter { get; set; }
        public Decimal? DividendsPriorYear { get; set; }
        public Decimal? DividendsCurrentQuarter { get; set; }
        public Decimal? BankEquityCapitalPriorYear { get; set; }
        public Decimal? BankEquityCapitalCurrentQuarter { get; set; }
        public Decimal? Cet1CapitalAdjustmentPriorYear { get; set; }
        public Decimal? Cet1CapitalAdjustmentCurrentQuarter { get; set; }
        public Decimal? Cet1CapitalPriorYear { get; set; }
        public Decimal? Cet1CapitalCurrentQuarter { get; set; }
        public Decimal? Tier1CapitalAdjustmentPriorYear { get; set; }
        public Decimal? Tier1CapitalAdjustmentCurrentQuarter { get; set; }
        public Decimal? Tier1CapitalPriorYear { get; set; }
        public Decimal? Tier1CapitalCurrentQuarter { get; set; }
        public Decimal? Tier2CapitalPriorYear { get; set; }
        public Decimal? Tier2CapitalCurrentQuarter { get; set; }
        public Decimal? TotalRiskBasedCapitalPriorYear { get; set; }
        public Decimal? TotalRiskBasedCapitalCurrentQuarter { get; set; }
        public Decimal? RiskWeightedAssetsPriorYear { get; set; }
        public Decimal? RiskWeightedAssetsCurrentQuarter { get; set; }
        public Decimal? TotalAssetsForLeveragePriorYear { get; set; }
        public Decimal? TotalAssetsForLeverageCurrentQuarter { get; set; }
        public Decimal? TotalAssetsPriorYear { get; set; }
        public Decimal? TotalAssetsCurrentQuarter { get; set; }
        public Decimal? AssetGrowthRatePriorYear { get; set; }
        public Decimal? AssetGrowthRateCurrentQuarter { get; set; }
        public Decimal? Tier1RBCRatioPriorYear { get; set; }
        public Decimal? Tier1RBCRatioCurrentQuarter { get; set; }
        public Decimal? TotalRBCRatioPriorYear { get; set; }
        public Decimal? TotalRBCRatioCurrentQuarter { get; set; }
        public Decimal? Tier1LeverageRatioPriorYear { get; set; }
        public Decimal? Tier1LeverageRatioCurrentQuarter { get; set; }
        public Decimal? Cet1CapitalRatioPriorYear { get; set; }
        public Decimal? Cet1CapitalRatioCurrentQuarter { get; set; }
        public Decimal? ReturnOnAverageAssetsPriorYear { get; set; }
        public Decimal? ReturnOnAverageAssetsCurrentQuarter { get; set; }
        public Decimal? ReturnOnAverageEquityPriorYear { get; set; }
        public Decimal? ReturnOnAverageEquityCurrentQuarter { get; set; }
    }
}
