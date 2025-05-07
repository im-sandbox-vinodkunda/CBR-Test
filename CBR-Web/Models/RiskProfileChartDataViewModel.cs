using System;

namespace CBR.Web.Models
{
    public class RiskProfileChartDataViewModel : IComparable<RiskProfileChartDataViewModel>
    {
        public int Year { get; set; }
        public string UBPRConceptDesc { get; set; }
        public Decimal? FactUBPRConceptValue { get; set; }
        public Decimal? CustPGUBPRConceptValue { get; set; }
        public Decimal? StdPGUBPRDataValue { get; set; }
        public Decimal? Benchmark { get; set; }
        public string PeriodType { get; set; }
        public int CompareTo(RiskProfileChartDataViewModel other)
        {
            return this.Year.CompareTo(other.Year);
        }
    }
}
