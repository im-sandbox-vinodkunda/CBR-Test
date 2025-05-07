using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    public class CallReportDataRequest
    {
        public string TabName { get; set; }
        public int InstitutionKey { get; set; }
        public string QtdOrYtd { get; set; }
    }
}
