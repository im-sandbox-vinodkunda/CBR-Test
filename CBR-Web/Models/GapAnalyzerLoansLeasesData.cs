using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class GapAnalyzerLoansLeasesData
    {
        public int? SectionOrder { get; set; }
        public int? GroupOrder { get; set; }
        public string UBPRConceptCode { get; set; }
        public string Description { get; set; }
        public string Bank_Year_5 { get; set; }
        public string Bank_Year_4 { get; set; }
        public string Bank_Year_3 { get; set; }
        public string Bank_Year_2 { get; set; }
        public string Bank_Year_1 { get; set; }
        public string Peer_Year_5 { get; set; }
        public string Peer_Year_4 { get; set; }
        public string Peer_Year_3 { get; set; }
        public string Peer_Year_2 { get; set; }
        public string Peer_Year_1 { get; set; }
        public string Variance_Year_5 { get; set; }
        public string Variance_Year_4 { get; set; }
        public string Variance_Year_3 { get; set; }
        public string Variance_Year_2 { get; set; }
        public string Variance_Year_1 { get; set; }
        public string SW { get; set; }
        public int? SWRank { get; set; }
    }
}
