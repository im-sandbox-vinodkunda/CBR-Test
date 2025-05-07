using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    public class StrategicForecastModelData
    {
        public Int16 Order { get; set; } 
        public string MetricName { get; set; }
        public Decimal? PriorYear { get; set; }
        public Decimal? CurrentYearYTD { get; set; }
        public Decimal? Year0 { get; set; }
        public Decimal? Year1 { get; set; }
        public Decimal? Year2 { get; set; }
        public Decimal? Year3 { get; set; }
        public Decimal? Year4 { get; set; }
        public Decimal? Year5 { get; set; }
        public bool? IsActive { get; set; } 
        public string UBPRConceptCode { get; set; }
    }
}
