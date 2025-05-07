using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    public class CallReportRawData
    {
        public int SectionOrder { get; set; }
        public int GroupOrder { get; set; }
        public string UBPRConceptCode { get; set; }
        public int? Id { get; set; }
        public int? ParentId { get; set; }
        public string Description { get; set; }
        public string Year_5 { get; set; }
        public string Year_4 { get; set; }
        public string Year_3 { get; set; }
        public string Year_2 { get; set; }
        public string Year_1 { get; set; }
        public bool? IsBold { get; set; }
        public bool? IsExpandable { get; set; }
    }
}
