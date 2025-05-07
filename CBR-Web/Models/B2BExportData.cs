using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    public class B2BExportData
    {
        [PropertyInclusion(Include = true)]
        [CBRDescription("Label")]
        public string Label { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("DefaultBank")]
        public string DefaultBank { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank1")]
        public string Bank1 { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank2")]
        public string Bank2 { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank3")]
        public string Bank3 { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank4")]
        public string Bank4 { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank5")]
        public string Bank5 { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("CombinedBanks")]
        public string Ratio { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Ratio")]
        public string Dollar { get; set; }
    }
}
