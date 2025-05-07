using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class CramDashboardConceptsData
    {
        public string SectionName { get; set; }
        public Int16 GroupOrder { get; set; }
        public string UBPRConceptCode { get; set; }
        public string Description { get; set; }
        public Decimal? Value { get; set; }
    }
}
