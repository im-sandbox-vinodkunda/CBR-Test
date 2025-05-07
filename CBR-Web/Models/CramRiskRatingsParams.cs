using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class CramRiskRatingsParams
    {
        public long ModelKey { get; set; }
        public Decimal? Low { get; set; }
        public Decimal? LowModerate { get; set; }
        public Decimal? Moderate { get; set; }
        public Decimal? ModerateHigh { get; set; }
        public Decimal? High { get; set; }
    }
}
