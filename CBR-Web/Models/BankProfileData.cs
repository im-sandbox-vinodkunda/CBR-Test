using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankProfileData
    {
        public string ReportTabName { get; set; }
        public Int16 SectionOrder { get; set; }
        public Int16 GroupOrder { get; set; }
        public string SectionName { get; set; }
        public string UBPRConceptCode { get; set; }
        public string UBPRConceptDesc { get; set; }
        public Decimal? Minus4Data { get; set; }
        public Decimal? Minus3Data { get; set; }
        public Decimal? Minus2Data { get; set; }
        public Decimal? Minus1Data { get; set; }
        public Decimal? CurrentData { get; set; }
    }
}
