using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankPerformanceIntroductionData
    {
        public string Name { get; set; }
        public int? CertNumber { get; set; }
        public string BankState { get; set; }
        public int InstitutionKey { get; set; }
    }
}
