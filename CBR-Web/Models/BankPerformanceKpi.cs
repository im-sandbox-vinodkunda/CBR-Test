using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankPerformanceKpi
    {
        private List<BankPerformanceKpiData> topBanks = null;
        private List<BankPerformanceKpiData> bottomBanks = null;

        public List<BankPerformanceKpiData> TopBanks
        {
            get
            {
                return this.topBanks;
            }
            
            set
            {
                this.topBanks = value;
            }
        }

        public List<BankPerformanceKpiData> BottomBanks
        {
            get
            {
                return this.bottomBanks;
            }

            set
            {
                this.bottomBanks = value;
            }
        }
    }
}
