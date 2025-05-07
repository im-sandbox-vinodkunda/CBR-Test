using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class CramDashboardConceptsParams
    {
        public int InstitutionKey { get; set; }
        public int Period { get; set; }
        public long ModelKey { get; set; }
        public string CramModelName { get; set; }
    }
}
