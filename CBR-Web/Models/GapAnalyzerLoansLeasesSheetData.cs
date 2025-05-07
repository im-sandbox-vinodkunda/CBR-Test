using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class GapAnalyzerLoansLeasesSheetData
    {
        public int TabOrder { get; set; }
        public string UBPRConceptCode { get; set; }
        public string Description { get; set; }
        public string Bank { get; set; }
        public string Peer1 { get; set; }
        public string Variance { get; set; }
        public int? Rank { get; set; }
    }
}
