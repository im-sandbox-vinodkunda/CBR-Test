using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class UpdateBenchmarkParameters
    {
        public int InstitutionKey { get; set; }
        public string UBPRConceptCode { get; set; }
        public string ReportingPeriodType { get; set; }
        public Decimal? BenchMarkvalue { get; set; }
    }
}
