using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankProfileIntroductionData
    {
        public string Name { get; set; }
        public int InstitutionKey { get; set; }
        public int FDICCertificate { get; set; }
        public string HeadQuarters { get; set; }
        public string BHCName { get; set; }
        public DateTime Established { get; set; }
        public string AssetConcentrationHierarchy { get; set; }
        public int Numberofbranches { get; set; }
        public int SubchapterS { get; set; }
        public int FTEEmployees { get; set; }
        public string TickerSymbols { get; set; }
        public string WebAddress { get; set; }
    }
}
