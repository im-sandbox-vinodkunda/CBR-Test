using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class DefaultBankDetails
    {
        public string InstitutionName { get; set; }
        public int? CertNumber { get; set; }
        public string HeadQuarters { get; set; }
        public string BHCName { get; set; }
        public string StockTicker { get; set; }
        public int? NumberofBranches { get; set; }
        public int? FTEmployees { get; set; }
        public string SubchapterS { get; set; }
        public int InstitutionKey { get; set; }

        public int RSSD { get; set; }

        public string Regulator { get; set; }
    }
}