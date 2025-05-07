using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.WebCommons
{
    public class StrategicForecastValueCalculations
    {
        public StrategicForecastInput strategicForecastInput = new StrategicForecastInput();
        public StrategicForecastValueData strategicForecastForecastValue = new StrategicForecastValueData();
        public StrategicForecastValueCalculations(StrategicForecastInput modelDetails, StrategicForecastDashboardConcepts dashboardConcepts)
        {
            strategicForecastInput = modelDetails;

            strategicForecastForecastValue.NetIncomePriorYear = dashboardConcepts.NetIncomePriorYear;
            strategicForecastForecastValue.NetIncomeCurrentQuarter = dashboardConcepts.NetIncomeCurrentQuarter;
            strategicForecastForecastValue.DividendsPriorYear = dashboardConcepts.DividendsPriorYear;
            strategicForecastForecastValue.DividendsCurrentQuarter = dashboardConcepts.DividendsCurrentQuarter;
            strategicForecastForecastValue.DividendsRatePriorYear = modelDetails.DividendsRatePriorYear * 100;
            strategicForecastForecastValue.DividendsRateCurrentQuarter = modelDetails.DividendsRateCurrentQuarter * 100;
            strategicForecastForecastValue.BankEquityCapitalPriorYear = dashboardConcepts.BankEquityCapitalPriorYear;
            strategicForecastForecastValue.BankEquityCapitalCurrentQuarter = dashboardConcepts.BankEquityCapitalCurrentQuarter;
            strategicForecastForecastValue.Cet1CapitalAdjustmentPriorYear = dashboardConcepts.Cet1CapitalAdjustmentPriorYear;
            strategicForecastForecastValue.Cet1CapitalAdjustmentCurrentQuarter = dashboardConcepts.Cet1CapitalAdjustmentCurrentQuarter;
            strategicForecastForecastValue.Cet1CapitalPriorYear = dashboardConcepts.Cet1CapitalPriorYear;
            strategicForecastForecastValue.Cet1CapitalCurrentQuarter = dashboardConcepts.Cet1CapitalCurrentQuarter;
            strategicForecastForecastValue.Tier1CapitalAdjustmentPriorYear = dashboardConcepts.Tier1CapitalAdjustmentPriorYear;
            strategicForecastForecastValue.Tier1CapitalAdjustmentCurrentQuarter = dashboardConcepts.Tier1CapitalAdjustmentCurrentQuarter;
            strategicForecastForecastValue.Tier1CapitalPriorYear = dashboardConcepts.Tier1CapitalPriorYear;
            strategicForecastForecastValue.Tier1CapitalCurrentQuarter = dashboardConcepts.Tier1CapitalCurrentQuarter;
            strategicForecastForecastValue.Tier2CapitalPriorYear = dashboardConcepts.Tier2CapitalPriorYear;
            strategicForecastForecastValue.Tier2CapitalCurrentQuarter = dashboardConcepts.Tier2CapitalCurrentQuarter;
            strategicForecastForecastValue.TotalRiskBasedCapitalPriorYear = dashboardConcepts.TotalRiskBasedCapitalPriorYear;
            strategicForecastForecastValue.TotalRiskBasedCapitalCurrentQuarter = dashboardConcepts.TotalRiskBasedCapitalCurrentQuarter;
            strategicForecastForecastValue.RiskWeightedAssetsPriorYear = dashboardConcepts.RiskWeightedAssetsPriorYear;
            strategicForecastForecastValue.RiskWeightedAssetsCurrentQuarter = dashboardConcepts.RiskWeightedAssetsCurrentQuarter;
            strategicForecastForecastValue.TotalAssetsForLeveragePriorYear = dashboardConcepts.TotalAssetsForLeveragePriorYear;
            strategicForecastForecastValue.TotalAssetsForLeverageCurrentQuarter = dashboardConcepts.TotalAssetsForLeverageCurrentQuarter;
            strategicForecastForecastValue.TotalAssetsPriorYear = dashboardConcepts.TotalAssetsPriorYear;
            strategicForecastForecastValue.TotalAssetsCurrentQuarter = dashboardConcepts.TotalAssetsCurrentQuarter;
            strategicForecastForecastValue.Cet1CapitalRatioPriorYear = dashboardConcepts.Cet1CapitalRatioPriorYear;
            strategicForecastForecastValue.Cet1CapitalRatioCurrentQuarter = dashboardConcepts.Cet1CapitalRatioCurrentQuarter;
            strategicForecastForecastValue.Tier1RBCRatioPriorYear = dashboardConcepts.Tier1RBCRatioPriorYear;
            strategicForecastForecastValue.Tier1RBCRatioCurrentQuarter = dashboardConcepts.Tier1RBCRatioCurrentQuarter;
            strategicForecastForecastValue.TotalRBCRatioPriorYear = dashboardConcepts.TotalRBCRatioPriorYear;
            strategicForecastForecastValue.TotalRBCRatioCurrentQuarter = dashboardConcepts.TotalRBCRatioCurrentQuarter;
            strategicForecastForecastValue.Tier1LeverageRatioPriorYear = dashboardConcepts.Tier1LeverageRatioPriorYear;
            strategicForecastForecastValue.Tier1LeverageRatioCurrentQuarter = dashboardConcepts.Tier1LeverageRatioCurrentQuarter;
            strategicForecastForecastValue.AssetGrowthRatePriorYear = dashboardConcepts.AssetGrowthRatePriorYear;
            strategicForecastForecastValue.AssetGrowthRateCurrentQuarter = dashboardConcepts.AssetGrowthRateCurrentQuarter;
            strategicForecastForecastValue.ReturnOnAverageAssetsPriorYear = dashboardConcepts.ReturnOnAverageAssetsPriorYear;
            strategicForecastForecastValue.ReturnOnAverageAssetsCurrentQuarter = dashboardConcepts.ReturnOnAverageAssetsCurrentQuarter;
            strategicForecastForecastValue.ReturnOnAverageEquityPriorYear = dashboardConcepts.ReturnOnAverageEquityPriorYear;
            strategicForecastForecastValue.ReturnOnAverageEquityCurrentQuarter = dashboardConcepts.ReturnOnAverageEquityCurrentQuarter;


            totalAssetsYear0();
            netIncomeYear0();
            dividendsYear0();
            bankEquityCapitalYear0();
            returnOnAverageEquityYear0();
            returnOnAverageAssetsYear0();
            bvSharePriceYear0();
            marketValueSharePrice125Year0();
            marketValueSharePrice150Year0();
            marketValueSharePrice175Year0();
            marketValueSharePrice200Year0();
            marketValueSharePrice225Year0();
            marketValueSharePrice250Year0();
            marketValueSharePrice275Year0();
            marketValueSharePrice300Year0();
            totalAssetsYear1();
            netIncomeYear1();
            dividendsYear1();
            bankEquityCapitalYear1();
            returnOnAverageEquityYear1();
            returnOnAverageAssetsYear1();
            bvSharePriceYear1();
            marketValueSharePrice125Year1();
            marketValueSharePrice150Year1();
            marketValueSharePrice175Year1();
            marketValueSharePrice200Year1();
            marketValueSharePrice225Year1();
            marketValueSharePrice250Year1();
            marketValueSharePrice275Year1();
            marketValueSharePrice300Year1();
            totalAssetsYear2();
            netIncomeYear2();
            dividendsYear2();
            bankEquityCapitalYear2();
            returnOnAverageEquityYear2();
            returnOnAverageAssetsYear2();
            bvSharePriceYear2();
            marketValueSharePrice125Year2();
            marketValueSharePrice150Year2();
            marketValueSharePrice175Year2();
            marketValueSharePrice200Year2();
            marketValueSharePrice225Year2();
            marketValueSharePrice250Year2();
            marketValueSharePrice275Year2();
            marketValueSharePrice300Year2();
            totalAssetsYear3();
            netIncomeYear3();
            dividendsYear3();
            bankEquityCapitalYear3();
            returnOnAverageEquityYear3();
            returnOnAverageAssetsYear3();
            bvSharePriceYear3();
            marketValueSharePrice125Year3();
            marketValueSharePrice150Year3();
            marketValueSharePrice175Year3();
            marketValueSharePrice200Year3();
            marketValueSharePrice225Year3();
            marketValueSharePrice250Year3();
            marketValueSharePrice275Year3();
            marketValueSharePrice300Year3();
            totalAssetsYear4();
            netIncomeYear4();
            dividendsYear4();
            bankEquityCapitalYear4();
            returnOnAverageEquityYear4();
            returnOnAverageAssetsYear4();
            bvSharePriceYear4();
            marketValueSharePrice125Year4();
            marketValueSharePrice150Year4();
            marketValueSharePrice175Year4();
            marketValueSharePrice200Year4();
            marketValueSharePrice225Year4();
            marketValueSharePrice250Year4();
            marketValueSharePrice275Year4();
            marketValueSharePrice300Year4();
            totalAssetsYear5();
            netIncomeYear5();
            dividendsYear5();
            bankEquityCapitalYear5();
            returnOnAverageEquityYear5();
            returnOnAverageAssetsYear5();
            bvSharePriceYear5();
            marketValueSharePrice125Year5();
            marketValueSharePrice150Year5();
            marketValueSharePrice175Year5();
            marketValueSharePrice200Year5();
            marketValueSharePrice225Year5();
            marketValueSharePrice250Year5();
            marketValueSharePrice275Year5();
            marketValueSharePrice300Year5();

            bookValueSharePricePriorYear();
            bookValueSharePriceCurrentQuarter();
            marketValueSharePrice125PriorYear();
            marketValueSharePrice125CurrentQuarter();
            marketValueSharePrice150PriorYear();
            marketValueSharePrice150CurrentQuarter();
            marketValueSharePrice175PriorYear();
            marketValueSharePrice175CurrentQuarter();
            marketValueSharePrice200PriorYear();
            marketValueSharePrice200CurrentQuarter();
            marketValueSharePrice225PriorYear();
            marketValueSharePrice225CurrentQuarter();
            marketValueSharePrice250PriorYear();
            marketValueSharePrice250CurrentQuarter();
            marketValueSharePrice275PriorYear();
            marketValueSharePrice275CurrentQuarter();
            marketValueSharePrice300PriorYear();
            marketValueSharePrice300CurrentQuarter();
        }
        public void bookValueSharePricePriorYear()
        {
            strategicForecastForecastValue.BookValueSharePricePriorYear = ((strategicForecastForecastValue.BankEquityCapitalPriorYear) * 1000) / (strategicForecastInput.SharesOutstandingActualPriorYear);
        }
        public void bookValueSharePriceCurrentQuarter()
        {
            strategicForecastForecastValue.BookValueSharePriceCurrentQuarter = (strategicForecastForecastValue.BankEquityCapitalCurrentQuarter) * 1000 / (strategicForecastInput.SharesOutstandingActualCurrentQuarter);
        }
        public void marketValueSharePrice125PriorYear()
        {
            strategicForecastForecastValue.MarketValueSharePrice125PriorYear = strategicForecastForecastValue.BookValueSharePricePriorYear * Convert.ToDecimal(1.25);
        }

        public void marketValueSharePrice125CurrentQuarter()
        {
            strategicForecastForecastValue.MarketValueSharePrice125CurrentQuarter = strategicForecastForecastValue.BookValueSharePriceCurrentQuarter * Convert.ToDecimal(1.25);
        }
        public void marketValueSharePrice150PriorYear()
        {
            strategicForecastForecastValue.MarketValueSharePrice150PriorYear = strategicForecastForecastValue.BookValueSharePricePriorYear * Convert.ToDecimal(1.5);
        }

        public void marketValueSharePrice150CurrentQuarter()
        {
            strategicForecastForecastValue.MarketValueSharePrice150CurrentQuarter = strategicForecastForecastValue.BookValueSharePriceCurrentQuarter * Convert.ToDecimal(1.5);
        }

        public void marketValueSharePrice175PriorYear()
        {
            strategicForecastForecastValue.MarketValueSharePrice175PriorYear = strategicForecastForecastValue.BookValueSharePricePriorYear * Convert.ToDecimal(1.75);
        }

        public void marketValueSharePrice175CurrentQuarter()
        {
            strategicForecastForecastValue.MarketValueSharePrice175CurrentQuarter = strategicForecastForecastValue.BookValueSharePriceCurrentQuarter * Convert.ToDecimal(1.75);
        }

        public void marketValueSharePrice200PriorYear()
        {
            strategicForecastForecastValue.MarketValueSharePrice200PriorYear = strategicForecastForecastValue.BookValueSharePricePriorYear * Convert.ToDecimal(2);
        }

        public void marketValueSharePrice200CurrentQuarter()
        {
            strategicForecastForecastValue.MarketValueSharePrice200CurrentQuarter = strategicForecastForecastValue.BookValueSharePriceCurrentQuarter * Convert.ToDecimal(2);
        }

        public void marketValueSharePrice225PriorYear()
        {
            strategicForecastForecastValue.MarketValueSharePrice225PriorYear = strategicForecastForecastValue.BookValueSharePricePriorYear * Convert.ToDecimal(2.25);
        }

        public void marketValueSharePrice225CurrentQuarter()
        {
            strategicForecastForecastValue.MarketValueSharePrice225CurrentQuarter = strategicForecastForecastValue.BookValueSharePriceCurrentQuarter * Convert.ToDecimal(2.25);
        }

        public void marketValueSharePrice250PriorYear()
        {
            strategicForecastForecastValue.MarketValueSharePrice250PriorYear = strategicForecastForecastValue.BookValueSharePricePriorYear * Convert.ToDecimal(2.5);
        }

        public void marketValueSharePrice250CurrentQuarter()
        {
            strategicForecastForecastValue.MarketValueSharePrice250CurrentQuarter = strategicForecastForecastValue.BookValueSharePriceCurrentQuarter * Convert.ToDecimal(2.5);
        }

        public void marketValueSharePrice275PriorYear()
        {
            strategicForecastForecastValue.MarketValueSharePrice275PriorYear = strategicForecastForecastValue.BookValueSharePricePriorYear * Convert.ToDecimal(2.75);
        }

        public void marketValueSharePrice275CurrentQuarter()
        {
            strategicForecastForecastValue.MarketValueSharePrice275CurrentQuarter = strategicForecastForecastValue.BookValueSharePriceCurrentQuarter * Convert.ToDecimal(2.75);
        }

        public void marketValueSharePrice300PriorYear()
        {
            strategicForecastForecastValue.MarketValueSharePrice300PriorYear = strategicForecastForecastValue.BookValueSharePricePriorYear * Convert.ToDecimal(3);
        }

        public void marketValueSharePrice300CurrentQuarter()
        {
            strategicForecastForecastValue.MarketValueSharePrice300CurrentQuarter = strategicForecastForecastValue.BookValueSharePriceCurrentQuarter * Convert.ToDecimal(3);
        }

        #region //Year 0 calcualtions

        public void totalAssetsYear0()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear0 == null)
                strategicForecastInput.NewAcquisitionAssetsYear0 = 0;

            strategicForecastForecastValue.TotalAssetsYear0 = (strategicForecastForecastValue.TotalAssetsPriorYear) * (1 + ((strategicForecastInput.AssetGrowthRateYear0) / 100)) + (strategicForecastInput.NewAcquisitionAssetsYear0);
        }

        public void netIncomeYear0()
        {
            if (strategicForecastInput.NetIncomeYear0 == null)
            {
                strategicForecastForecastValue.NetIncomeYear0 = (((strategicForecastForecastValue.TotalAssetsPriorYear) + (strategicForecastForecastValue.TotalAssetsYear0)) / 2) * ((strategicForecastInput.ReturnOnAverageAssetsYear0) / 100);
            }
            else
            {
                strategicForecastForecastValue.NetIncomeYear0 = strategicForecastInput.NetIncomeYear0;
            }
        }

        public void dividendsYear0()
        {
            if (strategicForecastInput.DividendsYear0 == null || strategicForecastInput.DividendsYear0 == 0)
                strategicForecastForecastValue.DividendsYear0 = strategicForecastForecastValue.NetIncomeYear0 * (strategicForecastInput.DividendsRateYear0) / 100;
            else
                strategicForecastForecastValue.DividendsYear0 = strategicForecastInput.DividendsYear0;
        }

        public void bankEquityCapitalYear0()
        {
            if (strategicForecastInput.NewCapitalYear0 != null)
                strategicForecastForecastValue.BankEquityCapitalYear0 = strategicForecastForecastValue.BankEquityCapitalPriorYear + strategicForecastForecastValue.NetIncomeYear0 - strategicForecastForecastValue.DividendsYear0 + strategicForecastInput.NewCapitalYear0;
            else
                strategicForecastForecastValue.BankEquityCapitalYear0 = strategicForecastForecastValue.BankEquityCapitalPriorYear + strategicForecastForecastValue.NetIncomeYear0 - strategicForecastForecastValue.DividendsYear0;
        }

        public void returnOnAverageEquityYear0()
        {
            strategicForecastForecastValue.ReturnOnAverageEquityYear0 = ((strategicForecastForecastValue.NetIncomeYear0) / (((strategicForecastForecastValue.BankEquityCapitalYear0) + (strategicForecastForecastValue.BankEquityCapitalCurrentQuarter)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear0()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear0 = (((strategicForecastInput.NetIncomeYear0) / (((strategicForecastForecastValue.TotalAssetsPriorYear) + (strategicForecastForecastValue.TotalAssetsYear0)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear0 = strategicForecastInput.ReturnOnAverageAssetsYear0;
            }
        }

        public void bvSharePriceYear0()
        {
            if(strategicForecastInput.SharesOutstandingActualYear0 > 0)
                strategicForecastForecastValue.BookValueSharePriceYear0 = strategicForecastForecastValue.BankEquityCapitalYear0 * 1000 / strategicForecastInput.SharesOutstandingActualYear0;
        }

        public void marketValueSharePrice125Year0()
        {
            strategicForecastForecastValue.MarketValueSharePrice125Year0 = strategicForecastForecastValue.BookValueSharePriceYear0 * Convert.ToDecimal(1.25);
        }

        public void marketValueSharePrice150Year0()
        {
            strategicForecastForecastValue.MarketValueSharePrice150Year0 = strategicForecastForecastValue.BookValueSharePriceYear0 * Convert.ToDecimal(1.50);
        }

        public void marketValueSharePrice175Year0()
        {
            strategicForecastForecastValue.MarketValueSharePrice175Year0 = strategicForecastForecastValue.BookValueSharePriceYear0 * Convert.ToDecimal(1.75);
        }

        public void marketValueSharePrice200Year0()
        {
            strategicForecastForecastValue.MarketValueSharePrice200Year0 = strategicForecastForecastValue.BookValueSharePriceYear0 * Convert.ToDecimal(2.00);
        }

        public void marketValueSharePrice225Year0()
        {
            strategicForecastForecastValue.MarketValueSharePrice225Year0 = strategicForecastForecastValue.BookValueSharePriceYear0 * Convert.ToDecimal(2.25);
        }

        public void marketValueSharePrice250Year0()
        {
            strategicForecastForecastValue.MarketValueSharePrice250Year0 = strategicForecastForecastValue.BookValueSharePriceYear0 * Convert.ToDecimal(2.50);
        }

        public void marketValueSharePrice275Year0()
        {
            strategicForecastForecastValue.MarketValueSharePrice275Year0 = strategicForecastForecastValue.BookValueSharePriceYear0 * Convert.ToDecimal(2.75);
        }

        public void marketValueSharePrice300Year0()
        {
            strategicForecastForecastValue.MarketValueSharePrice300Year0 = strategicForecastForecastValue.BookValueSharePriceYear0 * Convert.ToDecimal(3.00);
        }
        #endregion
        #region //Year 1 calcualtions
        public void totalAssetsYear1()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear1 == null)
                strategicForecastInput.NewAcquisitionAssetsYear1 = 0;

            strategicForecastForecastValue.TotalAssetsYear1 = ((strategicForecastForecastValue.TotalAssetsYear0) * (1 + ((strategicForecastInput.AssetGrowthRateYear1) / 100))) + (strategicForecastInput.NewAcquisitionAssetsYear1);
        }

        public void netIncomeYear1()
        {
            if (strategicForecastInput.NetIncomeYear1 == null)
            {
                strategicForecastForecastValue.NetIncomeYear1 = (((strategicForecastForecastValue.TotalAssetsYear0) + (strategicForecastForecastValue.TotalAssetsYear1)) / 2) * ((strategicForecastInput.ReturnOnAverageAssetsYear1) / 100);
            }
            else
            {
                strategicForecastForecastValue.NetIncomeYear1 = strategicForecastInput.NetIncomeYear1;
            }
        }

        public void dividendsYear1()
        {
            if (strategicForecastInput.DividendsYear1 == null || strategicForecastInput.DividendsYear1 == 0)
                strategicForecastForecastValue.DividendsYear1 = strategicForecastForecastValue.NetIncomeYear1 * (strategicForecastInput.DividendsRateYear1) / 100;
            else
                strategicForecastForecastValue.DividendsYear1 = strategicForecastInput.DividendsYear1;
        }

        public void bankEquityCapitalYear1()
        {
            if (strategicForecastInput.NewCapitalYear1 != null)
                strategicForecastForecastValue.BankEquityCapitalYear1 = strategicForecastForecastValue.BankEquityCapitalYear0 + strategicForecastForecastValue.NetIncomeYear1 - strategicForecastForecastValue.DividendsYear1 + strategicForecastInput.NewCapitalYear1;
            else
                strategicForecastForecastValue.BankEquityCapitalYear1 = strategicForecastForecastValue.BankEquityCapitalYear0 + strategicForecastForecastValue.NetIncomeYear1 - strategicForecastForecastValue.DividendsYear1;
        }

        public void returnOnAverageEquityYear1()
        {
            strategicForecastForecastValue.ReturnOnAverageEquityYear1 = ((strategicForecastForecastValue.NetIncomeYear1) / (((strategicForecastForecastValue.BankEquityCapitalYear1) + (strategicForecastForecastValue.BankEquityCapitalYear0)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear1()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear1 = (((strategicForecastInput.NetIncomeYear1) / (((strategicForecastForecastValue.TotalAssetsYear0) + (strategicForecastForecastValue.TotalAssetsYear1)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear1 = strategicForecastInput.ReturnOnAverageAssetsYear1;
            }
        }

        public void bvSharePriceYear1()
        {
            if(strategicForecastInput.SharesOutstandingActualYear1 > 0)
                strategicForecastForecastValue.BookValueSharePriceYear1 = (strategicForecastForecastValue.BankEquityCapitalYear1) * 1000 / strategicForecastInput.SharesOutstandingActualYear1;
        }

        public void marketValueSharePrice125Year1()
        {
            strategicForecastForecastValue.MarketValueSharePrice125Year1 = strategicForecastForecastValue.BookValueSharePriceYear1 * Convert.ToDecimal(1.25);
        }

        public void marketValueSharePrice150Year1()
        {
            strategicForecastForecastValue.MarketValueSharePrice150Year1 = strategicForecastForecastValue.BookValueSharePriceYear1 * Convert.ToDecimal(1.50);
        }

        public void marketValueSharePrice175Year1()
        {
            strategicForecastForecastValue.MarketValueSharePrice175Year1 = strategicForecastForecastValue.BookValueSharePriceYear1 * Convert.ToDecimal(1.75);
        }

        public void marketValueSharePrice200Year1()
        {
            strategicForecastForecastValue.MarketValueSharePrice200Year1 = strategicForecastForecastValue.BookValueSharePriceYear1 * Convert.ToDecimal(2.00);
        }

        public void marketValueSharePrice225Year1()
        {
            strategicForecastForecastValue.MarketValueSharePrice225Year1 = strategicForecastForecastValue.BookValueSharePriceYear1 * Convert.ToDecimal(2.25);
        }

        public void marketValueSharePrice250Year1()
        {
            strategicForecastForecastValue.MarketValueSharePrice250Year1 = strategicForecastForecastValue.BookValueSharePriceYear1 * Convert.ToDecimal(2.50);
        }

        public void marketValueSharePrice275Year1()
        {
            strategicForecastForecastValue.MarketValueSharePrice275Year1 = strategicForecastForecastValue.BookValueSharePriceYear1 * Convert.ToDecimal(2.75);
        }

        public void marketValueSharePrice300Year1()
        {
            strategicForecastForecastValue.MarketValueSharePrice300Year1 = strategicForecastForecastValue.BookValueSharePriceYear1 * Convert.ToDecimal(3.00);
        }
        #endregion
        #region //Year 2 calcualtions
        public void totalAssetsYear2()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear2 == null)
                strategicForecastInput.NewAcquisitionAssetsYear2 = 0;
            strategicForecastForecastValue.TotalAssetsYear2 = ((strategicForecastForecastValue.TotalAssetsYear1) * (1 + ((strategicForecastInput.AssetGrowthRateYear2) / 100))) + (strategicForecastInput.NewAcquisitionAssetsYear2);
        }

        public void netIncomeYear2()
        {
            if (strategicForecastInput.NetIncomeYear2 == null)
            {
                strategicForecastForecastValue.NetIncomeYear2 = (((strategicForecastForecastValue.TotalAssetsYear1) + (strategicForecastForecastValue.TotalAssetsYear2)) / 2) * ((strategicForecastInput.ReturnOnAverageAssetsYear2) / 100);
            }
            else
            {
                strategicForecastForecastValue.NetIncomeYear2 = strategicForecastInput.NetIncomeYear2;
            }
        }

        public void dividendsYear2()
        {
            if (strategicForecastInput.DividendsYear2 == null || strategicForecastInput.DividendsYear2 == 0)
                strategicForecastForecastValue.DividendsYear2 = strategicForecastForecastValue.NetIncomeYear2 * (strategicForecastInput.DividendsRateYear2) / 100;
            else
                strategicForecastForecastValue.DividendsYear2 = strategicForecastInput.DividendsYear2;
        }

        public void bankEquityCapitalYear2()
        {
            if (strategicForecastInput.NewCapitalYear2 != null)
                strategicForecastForecastValue.BankEquityCapitalYear2 = strategicForecastForecastValue.BankEquityCapitalYear1 + strategicForecastForecastValue.NetIncomeYear2 - strategicForecastForecastValue.DividendsYear2 + strategicForecastInput.NewCapitalYear2;
            else
                strategicForecastForecastValue.BankEquityCapitalYear2 = strategicForecastForecastValue.BankEquityCapitalYear1 + strategicForecastForecastValue.NetIncomeYear2 - strategicForecastForecastValue.DividendsYear2;
        }

        public void returnOnAverageEquityYear2()
        {
            strategicForecastForecastValue.ReturnOnAverageEquityYear2 = ((strategicForecastForecastValue.NetIncomeYear2) / (((strategicForecastForecastValue.BankEquityCapitalYear1) + (strategicForecastForecastValue.BankEquityCapitalYear2)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear2()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear2 = (((strategicForecastInput.NetIncomeYear2) / (((strategicForecastForecastValue.TotalAssetsYear1) + (strategicForecastForecastValue.TotalAssetsYear2)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear2 = strategicForecastInput.ReturnOnAverageAssetsYear2;
            }
        }

        public void bvSharePriceYear2()
        {
            if(strategicForecastInput.SharesOutstandingActualYear2 > 0)
                strategicForecastForecastValue.BookValueSharePriceYear2 = strategicForecastForecastValue.BankEquityCapitalYear2 * 1000 / strategicForecastInput.SharesOutstandingActualYear2;
        }

        public void marketValueSharePrice125Year2()
        {
            strategicForecastForecastValue.MarketValueSharePrice125Year2 = strategicForecastForecastValue.BookValueSharePriceYear2 * Convert.ToDecimal(1.25);
        }

        public void marketValueSharePrice150Year2()
        {
            strategicForecastForecastValue.MarketValueSharePrice150Year2 = strategicForecastForecastValue.BookValueSharePriceYear2 * Convert.ToDecimal(1.50);
        }

        public void marketValueSharePrice175Year2()
        {
            strategicForecastForecastValue.MarketValueSharePrice175Year2 = strategicForecastForecastValue.BookValueSharePriceYear2 * Convert.ToDecimal(1.75);
        }

        public void marketValueSharePrice200Year2()
        {
            strategicForecastForecastValue.MarketValueSharePrice200Year2 = strategicForecastForecastValue.BookValueSharePriceYear2 * Convert.ToDecimal(2.00);
        }

        public void marketValueSharePrice225Year2()
        {
            strategicForecastForecastValue.MarketValueSharePrice225Year2 = strategicForecastForecastValue.BookValueSharePriceYear2 * Convert.ToDecimal(2.25);
        }

        public void marketValueSharePrice250Year2()
        {
            strategicForecastForecastValue.MarketValueSharePrice250Year2 = strategicForecastForecastValue.BookValueSharePriceYear2 * Convert.ToDecimal(2.50);
        }

        public void marketValueSharePrice275Year2()
        {
            strategicForecastForecastValue.MarketValueSharePrice275Year2 = strategicForecastForecastValue.BookValueSharePriceYear2 * Convert.ToDecimal(2.75);
        }

        public void marketValueSharePrice300Year2()
        {
            strategicForecastForecastValue.MarketValueSharePrice300Year2 = strategicForecastForecastValue.BookValueSharePriceYear2 * Convert.ToDecimal(3.00);
        }
        #endregion

        #region  //Year 3 calcualtions
        public void totalAssetsYear3()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear3 == null)
                strategicForecastInput.NewAcquisitionAssetsYear3 = 0;

            strategicForecastForecastValue.TotalAssetsYear3 = ((strategicForecastForecastValue.TotalAssetsYear2) * (1 + ((strategicForecastInput.AssetGrowthRateYear3) / 100))) + (strategicForecastInput.NewAcquisitionAssetsYear3);
        }

        public void netIncomeYear3()
        {
            if (strategicForecastInput.NetIncomeYear3 == null)
            {
                strategicForecastForecastValue.NetIncomeYear3 = (((strategicForecastForecastValue.TotalAssetsYear2) + (strategicForecastForecastValue.TotalAssetsYear3)) / 2) * ((strategicForecastInput.ReturnOnAverageAssetsYear3) / 100);
            }
            else
            {
                strategicForecastForecastValue.NetIncomeYear3 = strategicForecastInput.NetIncomeYear3;
            }
        }

        public void dividendsYear3()
        {
            if (strategicForecastInput.DividendsYear3 == null || strategicForecastInput.DividendsYear3 == 0)
                strategicForecastForecastValue.DividendsYear3 = strategicForecastForecastValue.NetIncomeYear3 * (strategicForecastInput.DividendsRateYear3) / 100;
            else
                strategicForecastForecastValue.DividendsYear3 = strategicForecastInput.DividendsYear3;
        }

        public void bankEquityCapitalYear3()
        {
            if (strategicForecastInput.NewCapitalYear3 != null)
                strategicForecastForecastValue.BankEquityCapitalYear3 = strategicForecastForecastValue.BankEquityCapitalYear2 + strategicForecastForecastValue.NetIncomeYear3 - strategicForecastForecastValue.DividendsYear3 + strategicForecastInput.NewCapitalYear3;
            else
                strategicForecastForecastValue.BankEquityCapitalYear3 = strategicForecastForecastValue.BankEquityCapitalYear2 + strategicForecastForecastValue.NetIncomeYear3 - strategicForecastForecastValue.DividendsYear3;
        }

        public void returnOnAverageEquityYear3()
        {
            strategicForecastForecastValue.ReturnOnAverageEquityYear3 = ((strategicForecastForecastValue.NetIncomeYear3) / (((strategicForecastForecastValue.BankEquityCapitalYear2) + (strategicForecastForecastValue.BankEquityCapitalYear3)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear3()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear3 = (((strategicForecastInput.NetIncomeYear3) / (((strategicForecastForecastValue.TotalAssetsYear2) + (strategicForecastForecastValue.TotalAssetsYear3)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear3 = strategicForecastInput.ReturnOnAverageAssetsYear3;
            }
        }

        public void bvSharePriceYear3()
        {
            if(strategicForecastInput.SharesOutstandingActualYear3 > 0)
                strategicForecastForecastValue.BookValueSharePriceYear3 = strategicForecastForecastValue.BankEquityCapitalYear3 * 1000 / strategicForecastInput.SharesOutstandingActualYear3;
        }

        public void marketValueSharePrice125Year3()
        {
            strategicForecastForecastValue.MarketValueSharePrice125Year3 = strategicForecastForecastValue.BookValueSharePriceYear3 * Convert.ToDecimal(1.25);
        }

        public void marketValueSharePrice150Year3()
        {
            strategicForecastForecastValue.MarketValueSharePrice150Year3 = strategicForecastForecastValue.BookValueSharePriceYear3 * Convert.ToDecimal(1.50);
        }

        public void marketValueSharePrice175Year3()
        {
            strategicForecastForecastValue.MarketValueSharePrice175Year3 = strategicForecastForecastValue.BookValueSharePriceYear3 * Convert.ToDecimal(1.75);
        }

        public void marketValueSharePrice200Year3()
        {
            strategicForecastForecastValue.MarketValueSharePrice200Year3 = strategicForecastForecastValue.BookValueSharePriceYear3 * Convert.ToDecimal(2.00);
        }

        public void marketValueSharePrice225Year3()
        {
            strategicForecastForecastValue.MarketValueSharePrice225Year3 = strategicForecastForecastValue.BookValueSharePriceYear3 * Convert.ToDecimal(2.25);
        }

        public void marketValueSharePrice250Year3()
        {
            strategicForecastForecastValue.MarketValueSharePrice250Year3 = strategicForecastForecastValue.BookValueSharePriceYear3 * Convert.ToDecimal(2.50);
        }

        public void marketValueSharePrice275Year3()
        {
            strategicForecastForecastValue.MarketValueSharePrice275Year3 = strategicForecastForecastValue.BookValueSharePriceYear3 * Convert.ToDecimal(2.75);
        }

        public void marketValueSharePrice300Year3()
        {
            strategicForecastForecastValue.MarketValueSharePrice300Year3 = strategicForecastForecastValue.BookValueSharePriceYear3 * Convert.ToDecimal(3.00);
        }
        #endregion

        #region //Year 4 calcualtions
        public void totalAssetsYear4()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear4 == null)
                strategicForecastInput.NewAcquisitionAssetsYear4 = 0;

            strategicForecastForecastValue.TotalAssetsYear4 = ((strategicForecastForecastValue.TotalAssetsYear3) * (1 + ((strategicForecastInput.AssetGrowthRateYear4) / 100))) + (strategicForecastInput.NewAcquisitionAssetsYear4);
        }

        public void netIncomeYear4()
        {
            if (strategicForecastInput.NetIncomeYear4 == null)
            {
                strategicForecastForecastValue.NetIncomeYear4 = ((strategicForecastForecastValue.TotalAssetsYear3) + (strategicForecastForecastValue.TotalAssetsYear4)) / 2 * ((strategicForecastInput.ReturnOnAverageAssetsYear4) / 100);
            }
            else
            {
                strategicForecastForecastValue.NetIncomeYear4 = strategicForecastInput.NetIncomeYear4;
            }
        }

        public void dividendsYear4()
        {
            if (strategicForecastInput.DividendsYear4 == null || strategicForecastInput.DividendsYear4 == 0)
                strategicForecastForecastValue.DividendsYear4 = strategicForecastForecastValue.NetIncomeYear4 * (strategicForecastInput.DividendsRateYear4) / 100;
            else
                strategicForecastForecastValue.DividendsYear4 = strategicForecastInput.DividendsYear4;
        }

        public void bankEquityCapitalYear4()
        {
            if (strategicForecastInput.NewCapitalYear4 != null)
                strategicForecastForecastValue.BankEquityCapitalYear4 = strategicForecastForecastValue.BankEquityCapitalYear3 + strategicForecastForecastValue.NetIncomeYear4 - strategicForecastForecastValue.DividendsYear4 + strategicForecastInput.NewCapitalYear4;
            else
                strategicForecastForecastValue.BankEquityCapitalYear4 = strategicForecastForecastValue.BankEquityCapitalYear3 + strategicForecastForecastValue.NetIncomeYear4 - strategicForecastForecastValue.DividendsYear4;
        }

        public void returnOnAverageEquityYear4()
        {
            strategicForecastForecastValue.ReturnOnAverageEquityYear4 = ((strategicForecastForecastValue.NetIncomeYear4) / (((strategicForecastForecastValue.BankEquityCapitalYear3) + (strategicForecastForecastValue.BankEquityCapitalYear4)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear4()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear4 = (((strategicForecastInput.NetIncomeYear4) / (((strategicForecastForecastValue.TotalAssetsYear3) + (strategicForecastForecastValue.TotalAssetsYear4)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear4 = strategicForecastInput.ReturnOnAverageAssetsYear4;
            }
        }

        public void bvSharePriceYear4()
        {
            if (strategicForecastInput.SharesOutstandingActualYear4 > 0)
                strategicForecastForecastValue.BookValueSharePriceYear4 = strategicForecastForecastValue.BankEquityCapitalYear4 * 1000 / strategicForecastInput.SharesOutstandingActualYear4;
        }

        public void marketValueSharePrice125Year4()
        {
            strategicForecastForecastValue.MarketValueSharePrice125Year4 = strategicForecastForecastValue.BookValueSharePriceYear4 * Convert.ToDecimal(1.25);
        }

        public void marketValueSharePrice150Year4()
        {
            strategicForecastForecastValue.MarketValueSharePrice150Year4 = strategicForecastForecastValue.BookValueSharePriceYear4 * Convert.ToDecimal(1.50);
        }

        public void marketValueSharePrice175Year4()
        {
            strategicForecastForecastValue.MarketValueSharePrice175Year4 = strategicForecastForecastValue.BookValueSharePriceYear4 * Convert.ToDecimal(1.75);
        }

        public void marketValueSharePrice200Year4()
        {
            strategicForecastForecastValue.MarketValueSharePrice200Year4 = strategicForecastForecastValue.BookValueSharePriceYear4 * Convert.ToDecimal(2.00);
        }

        public void marketValueSharePrice225Year4()
        {
            strategicForecastForecastValue.MarketValueSharePrice225Year4 = strategicForecastForecastValue.BookValueSharePriceYear4 * Convert.ToDecimal(2.25);
        }

        public void marketValueSharePrice250Year4()
        {
            strategicForecastForecastValue.MarketValueSharePrice250Year4 = strategicForecastForecastValue.BookValueSharePriceYear4 * Convert.ToDecimal(2.50);
        }

        public void marketValueSharePrice275Year4()
        {
            strategicForecastForecastValue.MarketValueSharePrice275Year4 = strategicForecastForecastValue.BookValueSharePriceYear4 * Convert.ToDecimal(2.75);
        }

        public void marketValueSharePrice300Year4()
        {
            strategicForecastForecastValue.MarketValueSharePrice300Year4 = strategicForecastForecastValue.BookValueSharePriceYear4 * Convert.ToDecimal(3.00);
        }
        #endregion

        #region //Year 5 calcualtions
        public void totalAssetsYear5()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear5 == null)
                strategicForecastInput.NewAcquisitionAssetsYear5 = 0;

            strategicForecastForecastValue.TotalAssetsYear5 = ((strategicForecastForecastValue.TotalAssetsYear4) * (1 + ((strategicForecastInput.AssetGrowthRateYear5) / 100))) + (strategicForecastInput.NewAcquisitionAssetsYear5);
        }

        public void netIncomeYear5()
        {
            if (strategicForecastInput.NetIncomeYear5 == null)
            {
                strategicForecastForecastValue.NetIncomeYear5 = ((strategicForecastForecastValue.TotalAssetsYear4) + (strategicForecastForecastValue.TotalAssetsYear5)) / 2 * ((strategicForecastInput.ReturnOnAverageAssetsYear5) / 100);
            }
            else
            {
                strategicForecastForecastValue.NetIncomeYear5 = strategicForecastInput.NetIncomeYear5;
            }
        }

        public void dividendsYear5()
        {
            if (strategicForecastInput.DividendsYear5 == null || strategicForecastInput.DividendsYear5 == 0)
                strategicForecastForecastValue.DividendsYear5 = strategicForecastForecastValue.NetIncomeYear5 * (strategicForecastInput.DividendsRateYear5) / 100;
            else
                strategicForecastForecastValue.DividendsYear5 = strategicForecastInput.DividendsYear5;
        }

        public void bankEquityCapitalYear5()
        {
            if (strategicForecastInput.NewCapitalYear5 != null)
                strategicForecastForecastValue.BankEquityCapitalYear5 = strategicForecastForecastValue.BankEquityCapitalYear4 + strategicForecastForecastValue.NetIncomeYear5 - strategicForecastForecastValue.DividendsYear5 + strategicForecastInput.NewCapitalYear5;
            else
                strategicForecastForecastValue.BankEquityCapitalYear5 = strategicForecastForecastValue.BankEquityCapitalYear4 + strategicForecastForecastValue.NetIncomeYear5 - strategicForecastForecastValue.DividendsYear5;
        }

        public void returnOnAverageEquityYear5()
        {
            strategicForecastForecastValue.ReturnOnAverageEquityYear5 = ((strategicForecastForecastValue.NetIncomeYear5) / (((strategicForecastForecastValue.BankEquityCapitalYear4) + (strategicForecastForecastValue.BankEquityCapitalYear5)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear5()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear5 = (((strategicForecastInput.NetIncomeYear5) / (((strategicForecastForecastValue.TotalAssetsYear4) + (strategicForecastForecastValue.TotalAssetsYear5)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastValue.ReturnOnAverageAssetsYear5 = strategicForecastInput.ReturnOnAverageAssetsYear5;
            }
        }

        public void bvSharePriceYear5()
        {
            if (strategicForecastInput.SharesOutstandingActualYear5 > 0)
                strategicForecastForecastValue.BookValueSharePriceYear5 = strategicForecastForecastValue.BankEquityCapitalYear5 * 1000 / strategicForecastInput.SharesOutstandingActualYear5;
        }

        public void marketValueSharePrice125Year5()
        {
            strategicForecastForecastValue.MarketValueSharePrice125Year5 = strategicForecastForecastValue.BookValueSharePriceYear5 * Convert.ToDecimal(1.25);
        }

        public void marketValueSharePrice150Year5()
        {
            strategicForecastForecastValue.MarketValueSharePrice150Year5 = strategicForecastForecastValue.BookValueSharePriceYear5 * Convert.ToDecimal(1.50);
        }

        public void marketValueSharePrice175Year5()
        {
            strategicForecastForecastValue.MarketValueSharePrice175Year5 = strategicForecastForecastValue.BookValueSharePriceYear5 * Convert.ToDecimal(1.75);
        }

        public void marketValueSharePrice200Year5()
        {
            strategicForecastForecastValue.MarketValueSharePrice200Year5 = strategicForecastForecastValue.BookValueSharePriceYear5 * Convert.ToDecimal(2.00);
        }

        public void marketValueSharePrice225Year5()
        {
            strategicForecastForecastValue.MarketValueSharePrice225Year5 = strategicForecastForecastValue.BookValueSharePriceYear5 * Convert.ToDecimal(2.25);
        }

        public void marketValueSharePrice250Year5()
        {
            strategicForecastForecastValue.MarketValueSharePrice250Year5 = strategicForecastForecastValue.BookValueSharePriceYear5 * Convert.ToDecimal(2.50);
        }

        public void marketValueSharePrice275Year5()
        {
            strategicForecastForecastValue.MarketValueSharePrice275Year5 = strategicForecastForecastValue.BookValueSharePriceYear5 * Convert.ToDecimal(2.75);
        }

        public void marketValueSharePrice300Year5()
        {
            strategicForecastForecastValue.MarketValueSharePrice300Year5 = strategicForecastForecastValue.BookValueSharePriceYear5 * Convert.ToDecimal(3.00);
        }
        #endregion
    }
}
