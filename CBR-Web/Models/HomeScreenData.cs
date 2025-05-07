using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class HomeScreenData
    {
        public Int16 MetricOrder { get; set; }
        public string InstitutionName { get; set; }
        public string UBPRConceptCode { get; set; }
        public string UBPRConceptDescription { get; set; }
        public Decimal? Minus4Data { get; set; }
        public Decimal? Minus3Data { get; set; }
        public Decimal? Minus2Data { get; set; }
        public Decimal? Minus1Data { get; set; }
        public Decimal? CurrentData { get; set; }
        public string ChartLegend { get; set; }
    }

    public class HomeScreenDataEqualityComparer : IEqualityComparer<HomeScreenData>
    {
        public bool Equals(HomeScreenData b1, HomeScreenData b2)
        {
            if (b2 == null && b1 == null)
                return true;
            else if (b1 == null | b2 == null)
                return false;
            else if (b1.InstitutionName == b2.InstitutionName)
                return true;
            else
                return false;
        }

        public int GetHashCode(HomeScreenData bx)
        {
            int hCode = UtilityFunctions.GetInstitutionKeyFromName(bx.InstitutionName);
            return hCode.GetHashCode();
        }
    }

}
