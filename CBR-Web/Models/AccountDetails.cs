using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class AccountDetails
    {
        public DateTime? MemberSince { get; set; }

        public string TenantName { get; set; }

        public string TenantDomain { get; set; }
    }
}
