using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class FavoriteBank
    {
        public int InstitutionKey { get; set; }
        public string InstitutionName { get; set; }
        public int CertNumber { get; set; }
        public int RSSD { get; set; }
        public string InstitutionCity { get; set; }
        public string InstitutionStateName { get; set; }
        public string SubS { get; set; }
        public long? AssetSize { get; set; }
        public Decimal? NumOfBranches { get; set; }
        public DateTime? EstablishedDate { get; set; }
        public int? FTEmployees { get; set; }
        public string Regulator { get; set; }
        public bool IsSelected { get; set; }
        public int TotalResults { get; set; }
        public bool IsTenantBank { get; set; }
        public bool IsDefaultBank { get; set; }
    }
}
