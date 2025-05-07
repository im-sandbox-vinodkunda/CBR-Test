using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankSearchResultDataToExport
    {

        [Description("Institution Name")]
        public string InstitutionName { get; set; }

        [Description("FDIC Cert Number")]
        public int CertNumber { get; set; }

        public int RSSD { get; set; }

        [Description("City")]
        public string InstitutionCity { get; set; }

        [Description("County")]
        public string InstitutionCounty { get; set; }

        [Description("State")]
        public string InstitutionStateName { get; set; }

        public string SubS { get; set; }

        public string Regulator { get; set; }

        [Description("Established Date")]
        public DateTime? EstablishedDate { get; set; }

        [Description("Number of Branches")]
        public int? NumberofBranches { get; set; }


        [Description("Full Time Employees")]
        public int? FTEmployees { get; set; }

        [Description("Asset Size")]
        public long? AssetSize { get; set; }

        [Description("Total Securities")]
        public int? TotalSecurities { get; set; }

        [Description("Brokered Deposits")]
        public Decimal? BrokeredDeposits { get; set; }

        [Description("Total Cash+Due")]
        public int? TotalCashDue { get; set; }

        [Description("Return on Average Assets (%)")]
        public Decimal? ReturnOnAverageAssets { get; set; }

        [Description("Return on Average Equity (%)")]
        public Decimal? ReturnOnAverageEquity { get; set; }

        [Description("Net Interest Margin (%)")]
        public Decimal? NetInterestMargin { get; set; }

        [Description("Efficiency Ratio (%)")]
        public Decimal? EfficiencyRatio { get; set; }

        [Description("Asset Growth Rate (YTD)")]
        public Decimal? AssetGrowthRate { get; set; }

        [Description("Liquidity Ratio")]
        public Decimal? LiquidityRatio { get; set; }

        [Description("Loan to Deposit")]
        public Decimal? LoanToDeposit { get; set; }

        [Description("Non Interest-Bearing Deposits / Total Deposits")]
        public Decimal? NonIntererestBearingDepositsByTotalDeposits { get; set; }

        [Description("Cost of Funding Earning Assets")]
        public Decimal? CostOfFundingEarningAssets { get; set; }

        [Description("Non-Interest Income / Average Total Assets")]
        public Decimal? NonInterestIncomeByAverageTotalAssets { get; set; }

        [Description("Tier 1 Leverage")]
        public Decimal? Tier1Leverage { get; set; }

        [Description("Non-Performing Assets/ Assets (%)")]
        public Decimal? NonPerformingAssetsByAssets { get; set; }

    }
}
