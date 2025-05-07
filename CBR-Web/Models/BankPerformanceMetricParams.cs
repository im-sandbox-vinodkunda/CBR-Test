using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankPerformanceMetricParams
    {
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank Name")]
        public string BankName { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank Key")]
        public int InstitutionKey { get; set; }

        [PropertyInclusion(Include = true)]
        [CBRDescription("Location")]
        public string Location { get; set; }

        [PropertyInclusion(Include = true)]
        [CBRDescription("Asset Size")]
        public string AssetSize { get; set; }      

        [PropertyInclusion(Include = true)]
        [CBRDescription("KPI")]
        public string Percentile { get; set; }

        
        public string KPIName { get; set; }

        public string RankTableSortOrder { get; set; }
    }
}
