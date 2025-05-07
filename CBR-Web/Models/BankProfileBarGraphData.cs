using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    public class BankProfileBarGraphData : IComparable<BankProfileBarGraphData>
    {
        public int Year { get; set; }

        public Decimal? AssetGrowthRate { get; set; }

        public Decimal? LoansLeasesGrowthRate { get; set; }

        public Decimal? DepositGrowthRate { get; set; }

        public Decimal? EquityCapitalGrowthRate { get; set; }

        public string PeriodType { get; set; }

        public int CompareTo(BankProfileBarGraphData other)
        {
            return this.Year.CompareTo(other.Year);
        }
    }
}
