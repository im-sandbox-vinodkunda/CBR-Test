using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public  class BankPerformanceMetricData
    {
        [PropertyInclusion(Include = true)]
        public Int16 MetricOrder { get; set; }

        [PropertyInclusion(Include = true)]
        public string UBPRConceptDesc { get; set; }

        [PropertyInclusion(Include = true)]
        public Decimal? Bank { get; set; }

        [PropertyInclusion(Include = true)]
        public Decimal? Top { get; set; }

        [PropertyInclusion(Include = true)]
        public Decimal? Bottom { get; set; }

        [PropertyInclusion(Include = true)]
        public Decimal? BankMinusTop { get; set; }

        [PropertyInclusion(Include = true)]
        public Decimal? BankMinusBottom { get; set; }

        [PropertyInclusion(Include = false)]
        public bool IsBankMinusTopRed { get; set; }

        [PropertyInclusion(Include = false)]
        public bool IsBankMinusBottomRed { get; set; }

        [PropertyInclusion(Include = false)]
        public string RankTableSortOrder { get; set; }
    }
}
