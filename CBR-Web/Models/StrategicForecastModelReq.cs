using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class StrategicForecastModelReq
    {
        public long ScenarioKey { get; set; }

        public long UserKey { get; set; }

        public long TenantKey { get; set; }

        public long InstitutionKey { get; set; }

        public long SelectedSFScenario1ModelKey { get; set; }
        public long SelectedSFScenario2ModelKey { get; set; }
        public long SelectedSFScenario3ModelKey { get; set; }
        public long SelectedSFScenario4ModelKey { get; set; }
        public long SelectedSFScenario5ModelKey { get; set; }
        public long SelectedSFScenario6ModelKey { get; set; }
        public long SelectedSFScenario7ModelKey { get; set; }
        public long SelectedSFScenario8ModelKey { get; set; }
        public long SelectedHorizon { get; set; }
        public string SelectedComparison { get; set; }

    }
}
