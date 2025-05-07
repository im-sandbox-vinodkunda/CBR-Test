using System;

namespace CBR.Web.Models
{
    [Serializable]
    public class RiskProfileIntroductionData
    {
        public string BankName { get; set; }
        public string CustomPeerGroupName { get; set; }
        public string StandardPeerGroupName { get; set; }
        public string CustomPeerGroupKey { get; set; }
        public int InstitutionKey { get; set; }
    }
}
