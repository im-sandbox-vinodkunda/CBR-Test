using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankPerformanceKpiData
    {
        [PropertyInclusion(Include = true)]
        [CBRDescription("RSSD Number")]
        public int RSSD { get; set; }

        [PropertyInclusion(Include = true)]
        [CBRDescription("FDIC Cert Number")]
        public int CertNumber { get; set; }

        [PropertyInclusion(Include = false)]
        public int InstitutionKey { get; set; }

        [PropertyInclusion(Include = true)]
        public string InstitutionName { get; set; }

        [PropertyInclusion(Include = true)]
        [CBRDescription("UBPR Data Value")]
        public Decimal? UBPRDataValue { get; set; }

        [PropertyInclusion(Include = true)]
        public string OrderType { get; set; }

        [PropertyInclusion(Include = true)]
        public Int64 InstituteOrder { get; set; }

        
    }
}
