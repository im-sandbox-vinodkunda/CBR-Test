using System;

namespace CBR.Web.Models
{
    [Serializable]
    public class PeerGroupAverageData
    {
        public string InstitutionName { get; set; }

        public Decimal? CurrYear { get; set; }

        public Decimal? CurrYear1 { get; set; }

        public Decimal? CurrYear2 { get; set; }

        public Decimal? CurrYear3 { get; set; }

        public Decimal? CurrYear4 { get; set; }

        public string RowDisplay { get; set; }
    }
}
