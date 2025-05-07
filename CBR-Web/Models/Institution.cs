using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class Institution
    {
        public int InstitutionKey { get; set; }
        public string FdicCert { get; set; }
        public string InstitutionName { get; set; }
        public bool IsDefault { get; set; }
        public string StdPeerGroupCode { get; set; }
        public int StdPeerGroupKey { get; set; }
    }
}
