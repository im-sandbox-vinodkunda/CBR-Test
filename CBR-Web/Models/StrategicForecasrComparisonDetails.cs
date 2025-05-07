using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    public class StrategicForecasrComparisonDetails
    {
        public int SummaryKey { get; set; }
        public int ScenarioKey { get; set; }
        public long UserKey { get; set; }
        public long TenantKey { get; set; }
    }
}
