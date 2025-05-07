using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class B2BBankProfileData
    {
        public string MetricName { get; set; }
        public Int64? Defaultbank { get; set; }
        public Int64? Bank1 { get; set; }
        public Int64? Bank2 { get; set; }
        public Int64? Bank3 { get; set; }
        public Int64? Bank4 { get; set; }
        public Int64? Bank5 { get; set; }
        public Decimal? AvgAssetSize { get; set; }
    }
}
