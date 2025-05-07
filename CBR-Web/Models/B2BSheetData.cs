using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class B2BSheetData
    {
        public string TabName { get; set; }
        public Int16? SectionOrder { get; set; }
        public Int16? GroupOrder { get; set; }
        public string UBPRConceptCode { get; set; }
        public string UBPRConceptDesc { get; set; }
        public Decimal? Defaultbank { get; set; }
        public Decimal? Bank1 { get; set; }
        public Decimal? Bank2 { get; set; }
        public Decimal? Bank3 { get; set; }
        public Decimal? Bank4 { get; set; }
        public Decimal? Bank5 { get; set; }
        public Decimal? DollarSum { get; set; }
        public Decimal? Ratio { get; set; }
        public bool IsTopLevelRow { get; set; }
        public int TabOrder { get; set; }
    }
}
