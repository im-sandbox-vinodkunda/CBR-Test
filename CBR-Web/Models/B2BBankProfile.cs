using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class B2BBankProfile
    {
        [PropertyInclusion(Include = true)]
        [CBRDescription("Assets")]
        public Decimal? Assets { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Employees")]
        public Decimal? Employees { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("SubS")]
        public bool? SubS { get; set; }
        public Decimal? AvgAssetSize { get; set; }
    }
}
