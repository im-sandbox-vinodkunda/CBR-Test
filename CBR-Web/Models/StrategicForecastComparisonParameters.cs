using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class StrategicForecastComparisonParameters
    {
        public string ComparisonName { get; set; }
        public long ComparisonKey { get; set; }
        public long? ScenarioKey1 { get; set; }
        public long? ScenarioKey2 { get; set; }
        public long? ScenarioKey3 { get; set; }
        public long? ScenarioKey4 { get; set; }
        public long? ScenarioKey5 { get; set; }
        public long? ScenarioKey6 { get; set; }
        public long? ScenarioKey7 { get; set; }
        public long? ScenarioKey8 { get; set; }

    }
}
