using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    public class CustomPeerGroupMemberData
    {
        public int InstitutionKey { get; set; }
        public string InstitutionName { get; set; }
        public string InstitutionCity { get; set; }
        public string InstitutionStateName { get; set; }
        public int? CertNumber { get; set; }
        public int? RSSD { get; set; }
        public string SubS { get; set; }
        public long? AssetSize { get; set; }
        public bool IsSelected { get; set; }
    }
}
