using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    public class CallReportDataRequestParams
    {
        public int InstitutionKey { get; set; }
        public List<string> TabNames { get; set; }
        public List<string> SelectedTabNames { get; set; }
        public string QtdOrYtd { get; set; }
        public string TabTitle { get; set; }
    }
}
