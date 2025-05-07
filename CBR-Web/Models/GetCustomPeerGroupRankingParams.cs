using System;

namespace CBR.Web.Models
{
    [Serializable]
    public class GetCustomPeerGroupRankingParams
    {
        public string UBPRConceptCode { get; set; }
        public string CustPeerGroupName { get; set; }
        public int InstitutionKey { get; set; }
        public int CustPeerGroupKey { get; set; }
        public string Login { get; set; }
        public string StandardPeerGroupName { get; set; }
        public string RptName { get; set; }
        public string SortOrder { get; set; }
    }
}
