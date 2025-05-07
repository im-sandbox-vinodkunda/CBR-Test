using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class StrategicForecastDates
    {
        public string PriorYear { get; set; }
        public string CurrentYear { get; set; }
        public string Year0 { get; set; }
        public string Year1 { get; set; }
        public string Year2 { get; set; }
        public string Year3 { get; set; }
        public string Year4 { get; set; }
        public string Year5 { get; set; }
    }
}
