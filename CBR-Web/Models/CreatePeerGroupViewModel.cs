using System;

namespace CBR.Web.Models
{
    [Serializable]
    public class CreatePeerGroupViewModel
    {
        public string CustPeerGroupName { get; set; }

        public int RSSD { get; set; }

        public string TenantName { get; set; }

        public string Login { get; set; }

        public bool IsDefault { get; set; }
    }
}
