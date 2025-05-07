using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    [Serializable]
    public class UserActivateDeactivateParameters
    {
        public string UserName { get; set; }
        public int TenantKey { get; set; }
        public int UserKey { get; set; }
        public string EMail { get; set; }
    }
}