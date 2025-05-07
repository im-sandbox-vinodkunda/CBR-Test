using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class GapAnalyzerParams
    {
        public int InstitutionKey { get; set; }
        public int Period { get; set; }
        public int CustomPeerGroupKey { get; set; }
        public int StandardPeerGroupKey { get; set; }
        public string UBPRConceptCode { get; set; }
        public float BenchmarkValue { get; set; }
        public string QtdOrYtd { get; set; }
        public Dictionary<string, List<GapAnalyzerFinancialHighlightsData>> FinancialHighlightsData { get; set; }
    }
}
