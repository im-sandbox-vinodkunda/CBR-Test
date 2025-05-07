using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class RiskRadarRiskLevel
    {
        public string RiskLevel { get; set; }
        public string RiskLevelShortName { get; set; }
        public int MinPoints { get; set; }
        public int MaxPoints { get; set; }
        public int MinOverAll { get; set; }
        public int MaxOverAll { get; set; }
        public string BackGroundColor { get; set; }
        public string FontColor { get; set; }
    }
}