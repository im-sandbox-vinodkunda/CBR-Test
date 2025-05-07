using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class PerformanceIndexChartParams
    {
        public int InstitutionKey { get; set; }
        public string TabType { get; set; }
        public string DataType { get; set; }
    }
}