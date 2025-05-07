using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class PerformanceIndexDetails
    {
        public string OverallDataRank { get; set; }
        public string InstitutionName { get; set; }
        public int CertNumber { get; set; }
        public string State { get; set; }
        public string Region { get; set; }
        public string AGR { get; set; }
        public string ROAA { get; set; }
        public string ROAE { get; set; }
        public string NIM { get; set; }
        public string ER { get; set; }
        public string NPA { get; set; }
        public string NIBD { get; set; }
        public string NII { get; set; }
    }
}