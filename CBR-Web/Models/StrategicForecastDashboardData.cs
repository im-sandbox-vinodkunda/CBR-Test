using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class StrategicForecastDashboardData
    {
        public Int16 GroupOrder { get; set; }
        public string UBPRConceptCode { get; set; }
        public string Description { get; set; }
        public Decimal? PriorYear { get; set; }
        public Decimal? CurrentYearYTD { get; set; }
    }
}
