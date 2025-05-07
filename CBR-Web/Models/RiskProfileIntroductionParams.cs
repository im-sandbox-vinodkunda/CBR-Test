using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class RiskProfileIntroductionParams
    {
        public int CustPeerGroupKey { get; set; }
        public int InstitutionKey { get; set; }
    }
}
