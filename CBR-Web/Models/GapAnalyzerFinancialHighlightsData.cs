using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class GapAnalyzerFinancialHighlightsData
    {
        public int SectionOrder { get; set; }
        public int GroupOrder { get; set; }
        public string UBPRConceptCode { get; set; }
        public string Description { get; set; }
        public string Bank { get; set; }
        public string BenchMark { get; set; }
        public string PEER1 { get; set; }
        public string PEER2 { get; set; }
        public string Variance { get; set; }
        public string BenchMarkVariance { get; set; }
        public string Peer1Variance { get; set; }
        public string Peer2Variance { get; set; }
        public string Category { get; set; }

        public string NextUbprCode { get; set; }
    }
}
