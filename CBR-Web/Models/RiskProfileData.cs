using System;

namespace CBR.Web.Models
{
    [Serializable]
    public class RiskProfileData
    {
        public Int16? SectionOrder { get; set; }
        public Int16? GroupOrder { get; set; }
        public string SectionName { get; set; }
        public string UBPRConceptCode { get; set; }
        public string UBPRConceptDesc { get; set; }
        public string RankTableSortOrder { get; set; }
        public Decimal? Bank { get; set; }
        public Decimal? Peer1 { get; set; }
        public Decimal? Peer2 { get; set; }
        public Decimal? QTDBenchMarkValue { get; set; }
        public Decimal? YTDBenchMarkValue { get; set; }
    }

    [Serializable]
    public class RiskProfileDataOne
    {
        public Int16? SectionOrder { get; set; }
        public Int16? GroupOrder { get; set; }
        public string SectionName { get; set; }
        public string UBPRConceptCode { get; set; }
        public string UBPRConceptDesc { get; set; }
        public string RankTableSortOrder { get; set; }
        public string Bank { get; set; }
        public string Peer1 { get; set; }
        public string Peer2 { get; set; }
        public Decimal? QTDBenchMarkValue { get; set; }
        public Decimal? YTDBenchMarkValue { get; set; }
    }
}
