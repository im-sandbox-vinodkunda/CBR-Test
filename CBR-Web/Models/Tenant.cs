using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class Tenant
    {
        public string AccountName { get; set; }
        public string AccountDomain { get; set; }
        public string AdminFirstName { get; set; }
        public string AdminLastName { get; set; }
        public string AdminEmail { get; set; }
        public DateTime? MemberSince { get; set; }
        public int TotalAccounts { get; set; }
        public long TenantKey { get; set; }
        public string State { get; set; }
        public string FDICCert { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
    }
}
