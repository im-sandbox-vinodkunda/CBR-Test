using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankProfileOverviewParams
    {
        public int InstitutionKey { get; set; }
        public string Period { get; set; }
        public string assetGrowthBarChart { get; set; }
        public string loansLeasesGrowthBarChart { get; set; }
        public string depositGrowthBarChart { get; set; }
        public string equityGrowthBarChart { get; set; }
        public string loadCompositionStackChart { get; set; }
        public string depositCompositionStackChart { get; set; }
    }
}
