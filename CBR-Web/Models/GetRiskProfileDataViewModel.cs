using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;

namespace CBR.Web.Models
{
    [Serializable]
    public class GetRiskProfileDataViewModel
    {
        public int InstitutionKey { get; set; }
        public int Period { get; set; }
        public int TenantKey { get; set; }
        public int StdPeerGroupKey { get; set; }
        public int CustPeerGroupKey { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank")]
        public string Bank { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Peer1")]
        public string Peer1 { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Peer2")]
        public string Peer2 { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("ThresholdValue")]
        public string ThresholdValue { get; set; }

        public List<CustomPeerGroupData> PeerGroups { get; set; }
    }
}
