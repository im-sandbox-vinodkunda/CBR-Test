using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class TenantProfile
    {
        public string MemberSince { get; set; }
        public string AccountType { get; set; }
        public string AccountName { get; set; }
        public string InstitutionName { get; set; }
        public string CertNumber { get; set; }
        public string HeadQuarters { get; set; }
        public string BHCName { get; set; }
        public int? NumberofBranches { get; set; }
        public int? FTEmployees { get; set; }
        public string StockTicker { get; set; }
        public string Website { get; set; }
        public long TenantKey { get; set; }
        public bool IsActive { get; set; }
    }
}