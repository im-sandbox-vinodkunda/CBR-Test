using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BenchmarkThresholdParameters
    {
        public Decimal? ThresholdValue { get; set; }
        public int InstitutionKey { get; set; }
    }
}
