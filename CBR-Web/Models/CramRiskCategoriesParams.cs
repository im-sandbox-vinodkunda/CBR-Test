using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class CramRiskCategoriesParams
    {
        public long ModelKey { get; set; }
        public int? CreditRisk { get; set; }
        public Decimal? CreditRiskWeight { get; set; }
        public int? InterestRateRisk { get; set; }
        public Decimal? InterestRateRiskWeight { get; set; }
        public int? LiquidityRisk { get; set; }
        public Decimal? LiquidityRiskWeight { get; set; }
        public int? OperationalRisk { get; set; }
        public Decimal? OperationalRiskWeight { get; set; }
        public int? ComplianceRisk { get; set; }
        public Decimal? ComplianceRiskWeight { get; set; }
        public int? StrategicRisk { get; set; }
        public Decimal? StrategicRiskWeight { get; set; }
        public int? ReputationRisk { get; set; }
        public Decimal? ReputationRiskWeight { get; set; }
    }
}
