using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class CramDashboardConcepts
    {
        public Decimal? CET1CapitalRatio { get; set; }
        public Decimal? CommonEquityTier1Capital { get; set; }
        public Decimal? Tier1LeverageRatio { get; set; }
        public Decimal? Tier1Capital { get; set; }
        public Decimal? TotalAssetsLeveragePurposes { get; set; }
        public Decimal? Tier1CapitalRatio { get; set; }
        public Decimal? TotalCapital { get; set; }
        public Decimal? TotalCapitalRatio { get; set; }
        public Decimal? TotalRiskWeightedAssets { get; set; }
    }
}
