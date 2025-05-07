using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankFindSearchCriteria
    {
        public string BankName { get; set; }
        public string CertNumber { get; set; }
        public string Location { get; set; }
        public string AssetMinSize { get; set; }
        public string AssetMaxSize { get; set; }
        public string CorporationType { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
    }
}
