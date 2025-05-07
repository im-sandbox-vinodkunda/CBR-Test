using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class RiskRadarKRIData
    {
        public string KRIGroup { get; set; }
        public int KRISequence { get; set; }
        public KRIData KRISelected { get; set; }
        public List<KRIData> KRIValueData { get; set; }
    }

    public class KRIData
    {
        public int KriMetricId { get; set; }       
        public string MetricDesc { get; set; }
        public string Metric { get; set; }       
        public bool IsDefault { get; set; }
        public int? KriMetricSeq { get; set; }
    }

    public class NameValue
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}