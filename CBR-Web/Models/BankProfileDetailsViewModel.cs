using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankProfileDetailsViewModel
    {
        private Dictionary<string, Dictionary<string,List<BankProfileDataSection>>> bankProfileDataSections;

        public BankProfileDetailsViewModel()
        {
            this.bankProfileDataSections = new Dictionary<string, Dictionary<string, List<BankProfileDataSection>>>();
        }

        public Dictionary<string, Dictionary<string, List<BankProfileDataSection>>> BankProfileDataSections
        {
            get
            {
                return this.bankProfileDataSections;
            }

            set
            {
                this.bankProfileDataSections = value;
            }
        }
    }

    [Serializable]
    public class BankProfileDataSection
    {
        public string UBPRConceptDesc { get; set; }
        public string UBPRConceptCode { get; set; }
        public Decimal? Minus4Data { get; set; }
        public Decimal? Minus3Data { get; set; }
        public Decimal? Minus2Data { get; set; }
        public Decimal? Minus1Data { get; set; }
        public Decimal? CurrentData { get; set; }
    }
}
