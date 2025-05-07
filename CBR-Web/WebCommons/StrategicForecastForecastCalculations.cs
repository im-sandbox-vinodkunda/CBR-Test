using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.WebCommons
{
    public class StrategicForecastForecastCalculations
    {
        public StrategicForecastInput strategicForecastInput = new StrategicForecastInput();
        public StrategicForecastForecastData strategicForecastForecastData = new StrategicForecastForecastData();
        public StrategicForecastForecastCalculations(StrategicForecastInput modelDetails, StrategicForecastDashboardConcepts dashboardConcepts)
        {
            #region construtor
            strategicForecastInput = modelDetails;

            strategicForecastInput.NetIncomeYear0 = modelDetails.NetIncomeYear0;
            strategicForecastInput.NetIncomeYear1 = modelDetails.NetIncomeYear1;
            strategicForecastInput.NetIncomeYear2 = modelDetails.NetIncomeYear2;
            strategicForecastInput.NetIncomeYear3 = modelDetails.NetIncomeYear3;
            strategicForecastInput.NetIncomeYear4 = modelDetails.NetIncomeYear4;
            strategicForecastInput.NetIncomeYear5 = modelDetails.NetIncomeYear5;
            strategicForecastInput.DividendsYear0 = modelDetails.DividendsYear0;
            strategicForecastInput.DividendsYear1 = modelDetails.DividendsYear1;
            strategicForecastInput.DividendsYear2 = modelDetails.DividendsYear2;
            strategicForecastInput.DividendsYear3 = modelDetails.DividendsYear3;
            strategicForecastInput.DividendsYear4 = modelDetails.DividendsYear4;
            strategicForecastInput.DividendsYear5 = modelDetails.DividendsYear5;
            strategicForecastInput.DividendsRateYear0 = modelDetails.DividendsRateYear0;
            strategicForecastInput.DividendsRateYear1 = modelDetails.DividendsRateYear1;
            strategicForecastInput.DividendsRateYear2 = modelDetails.DividendsRateYear2;
            strategicForecastInput.DividendsRateYear3 = modelDetails.DividendsRateYear3;
            strategicForecastInput.DividendsRateYear4 = modelDetails.DividendsRateYear4;
            strategicForecastInput.DividendsRateYear5 = modelDetails.DividendsRateYear5;
            strategicForecastInput.NewCapitalYear0 = modelDetails.NewCapitalYear0;
            strategicForecastInput.NewCapitalYear1 = modelDetails.NewCapitalYear1;
            strategicForecastInput.NewCapitalYear2 = modelDetails.NewCapitalYear2;
            strategicForecastInput.NewCapitalYear3 = modelDetails.NewCapitalYear3;
            strategicForecastInput.NewCapitalYear4 = modelDetails.NewCapitalYear4;
            strategicForecastInput.NewCapitalYear5 = modelDetails.NewCapitalYear5;
            strategicForecastInput.Cet1CapitalAdjustmentYear0 = modelDetails.Cet1CapitalAdjustmentYear0;
            strategicForecastInput.Cet1CapitalAdjustmentYear1 = modelDetails.Cet1CapitalAdjustmentYear1;
            strategicForecastInput.Cet1CapitalAdjustmentYear2 = modelDetails.Cet1CapitalAdjustmentYear2;
            strategicForecastInput.Cet1CapitalAdjustmentYear3 = modelDetails.Cet1CapitalAdjustmentYear3;
            strategicForecastInput.Cet1CapitalAdjustmentYear4 = modelDetails.Cet1CapitalAdjustmentYear4;
            strategicForecastInput.Cet1CapitalAdjustmentYear5 = modelDetails.Cet1CapitalAdjustmentYear5;
            strategicForecastInput.PricePerShareYear0 = modelDetails.PricePerShareYear0;
            strategicForecastInput.PricePerShareYear1 = modelDetails.PricePerShareYear1;
            strategicForecastInput.PricePerShareYear2 = modelDetails.PricePerShareYear2;
            strategicForecastInput.PricePerShareYear3 = modelDetails.PricePerShareYear3;
            strategicForecastInput.PricePerShareYear4 = modelDetails.PricePerShareYear4;
            strategicForecastInput.PricePerShareYear5 = modelDetails.PricePerShareYear5;
            strategicForecastInput.Tier1CapitalAdjustmentYear0 = modelDetails.Tier1CapitalAdjustmentYear0;
            strategicForecastInput.Tier1CapitalAdjustmentYear1 = modelDetails.Tier1CapitalAdjustmentYear1;
            strategicForecastInput.Tier1CapitalAdjustmentYear2 = modelDetails.Tier1CapitalAdjustmentYear2;
            strategicForecastInput.Tier1CapitalAdjustmentYear3 = modelDetails.Tier1CapitalAdjustmentYear3;
            strategicForecastInput.Tier1CapitalAdjustmentYear4 = modelDetails.Tier1CapitalAdjustmentYear4;
            strategicForecastInput.Tier1CapitalAdjustmentYear5 = modelDetails.Tier1CapitalAdjustmentYear5;
            strategicForecastInput.Tier2CapitalYear0 = modelDetails.Tier2CapitalYear0;
            strategicForecastInput.Tier2CapitalYear1 = modelDetails.Tier2CapitalYear1;
            strategicForecastInput.Tier2CapitalYear2 = modelDetails.Tier2CapitalYear2;
            strategicForecastInput.Tier2CapitalYear3 = modelDetails.Tier2CapitalYear3;
            strategicForecastInput.Tier2CapitalYear4 = modelDetails.Tier2CapitalYear4;
            strategicForecastInput.Tier2CapitalYear5 = modelDetails.Tier2CapitalYear5;
            strategicForecastInput.RiskWeightedAssetsYear0 = modelDetails.RiskWeightedAssetsYear0;
            strategicForecastInput.RiskWeightedAssetsYear1 = modelDetails.RiskWeightedAssetsYear1;
            strategicForecastInput.RiskWeightedAssetsYear2 = modelDetails.RiskWeightedAssetsYear2;
            strategicForecastInput.RiskWeightedAssetsYear3 = modelDetails.RiskWeightedAssetsYear3;
            strategicForecastInput.RiskWeightedAssetsYear4 = modelDetails.RiskWeightedAssetsYear4;
            strategicForecastInput.RiskWeightedAssetsYear5 = modelDetails.RiskWeightedAssetsYear5;
            strategicForecastInput.TotalAssetsLeverageYear0 = modelDetails.TotalAssetsLeverageYear0;
            strategicForecastInput.TotalAssetsLeverageYear1 = modelDetails.TotalAssetsLeverageYear1;
            strategicForecastInput.TotalAssetsLeverageYear2 = modelDetails.TotalAssetsLeverageYear2;
            strategicForecastInput.TotalAssetsLeverageYear3 = modelDetails.TotalAssetsLeverageYear3;
            strategicForecastInput.TotalAssetsLeverageYear4 = modelDetails.TotalAssetsLeverageYear4;
            strategicForecastInput.TotalAssetsLeverageYear5 = modelDetails.TotalAssetsLeverageYear5;
            strategicForecastInput.NewAcquisitionAssetsYear0 = modelDetails.NewAcquisitionAssetsYear0;
            strategicForecastInput.NewAcquisitionAssetsYear1 = modelDetails.NewAcquisitionAssetsYear1;
            strategicForecastInput.NewAcquisitionAssetsYear2 = modelDetails.NewAcquisitionAssetsYear2;
            strategicForecastInput.NewAcquisitionAssetsYear3 = modelDetails.NewAcquisitionAssetsYear3;
            strategicForecastInput.NewAcquisitionAssetsYear4 = modelDetails.NewAcquisitionAssetsYear4;
            strategicForecastInput.NewAcquisitionAssetsYear5 = modelDetails.NewAcquisitionAssetsYear5;
            strategicForecastInput.AssetGrowthRateYear0 = modelDetails.AssetGrowthRateYear0;
            strategicForecastInput.AssetGrowthRateYear1 = modelDetails.AssetGrowthRateYear1;
            strategicForecastInput.AssetGrowthRateYear2 = modelDetails.AssetGrowthRateYear2;
            strategicForecastInput.AssetGrowthRateYear3 = modelDetails.AssetGrowthRateYear3;
            strategicForecastInput.AssetGrowthRateYear4 = modelDetails.AssetGrowthRateYear4;
            strategicForecastInput.AssetGrowthRateYear5 = modelDetails.AssetGrowthRateYear5;
            strategicForecastInput.ReturnOnAverageAssetsYear0 = modelDetails.ReturnOnAverageAssetsYear0;
            strategicForecastInput.ReturnOnAverageAssetsYear1 = modelDetails.ReturnOnAverageAssetsYear1;
            strategicForecastInput.ReturnOnAverageAssetsYear2 = modelDetails.ReturnOnAverageAssetsYear2;
            strategicForecastInput.ReturnOnAverageAssetsYear3 = modelDetails.ReturnOnAverageAssetsYear3;
            strategicForecastInput.ReturnOnAverageAssetsYear4 = modelDetails.ReturnOnAverageAssetsYear4;
            strategicForecastInput.ReturnOnAverageAssetsYear5 = modelDetails.ReturnOnAverageAssetsYear5;

            strategicForecastInput.SharesOutstandingActualPriorYear = modelDetails.SharesOutstandingActualPriorYear;
            strategicForecastInput.SharesOutstandingActualCurrentQuarter = modelDetails.SharesOutstandingActualCurrentQuarter;
            strategicForecastForecastData.SharesOutstandingYear0 = modelDetails.SharesOutstandingActualYear0;
            strategicForecastForecastData.SharesOutstandingYear1 = modelDetails.SharesOutstandingActualYear1;
            strategicForecastForecastData.SharesOutstandingYear2 = modelDetails.SharesOutstandingActualYear2;
            strategicForecastForecastData.SharesOutstandingYear3 = modelDetails.SharesOutstandingActualYear3;
            strategicForecastForecastData.SharesOutstandingYear4 = modelDetails.SharesOutstandingActualYear4;
            strategicForecastForecastData.SharesOutstandingYear5 = modelDetails.SharesOutstandingActualYear5;



            strategicForecastForecastData.NetIncomePriorYear = dashboardConcepts.NetIncomePriorYear;
            strategicForecastForecastData.NetIncomeCurrentQuarter = dashboardConcepts.NetIncomeCurrentQuarter;
            strategicForecastForecastData.DividendsPriorYear = dashboardConcepts.DividendsPriorYear;
            strategicForecastForecastData.DividendsCurrentQuarter = dashboardConcepts.DividendsCurrentQuarter;
            strategicForecastForecastData.DividendsRatePriorYear = modelDetails.DividendsRatePriorYear * 100;
            strategicForecastForecastData.DividendsRateCurrentQuarter = modelDetails.DividendsRateCurrentQuarter * 100;
            strategicForecastForecastData.BankEquityCapitalPriorYear = dashboardConcepts.BankEquityCapitalPriorYear;
            strategicForecastForecastData.BankEquityCapitalCurrentQuarter = dashboardConcepts.BankEquityCapitalCurrentQuarter;
            //strategicForecastForecastData.NewCapitalPriorYear = dashboardConcepts.NewCapitalPriorYear;
            //strategicForecastForecastData.NewCapitalCurrentQuarter = dashboardConcepts.NewCapitalCurrentQuarter;
            strategicForecastForecastData.Cet1CapitalAdjustmentPriorYear = dashboardConcepts.Cet1CapitalAdjustmentPriorYear;
            strategicForecastForecastData.Cet1CapitalAdjustmentCurrentQuarter = dashboardConcepts.Cet1CapitalAdjustmentCurrentQuarter;
            //strategicForecastForecastData.PricePerSharePriorYear = dashboardConcepts.PricePerSharePriorYear;
            //strategicForecastForecastData.PricePerShareCurrentQuarter = dashboardConcepts.PricePerShareCurrentQuarter;
            strategicForecastForecastData.Cet1CapitalPriorYear = dashboardConcepts.Cet1CapitalPriorYear;
            strategicForecastForecastData.Cet1CapitalCurrentQuarter = dashboardConcepts.Cet1CapitalCurrentQuarter;
            strategicForecastForecastData.Tier1CapitalAdjustmentPriorYear = dashboardConcepts.Tier1CapitalAdjustmentPriorYear;
            strategicForecastForecastData.Tier1CapitalAdjustmentCurrentQuarter = dashboardConcepts.Tier1CapitalAdjustmentCurrentQuarter;
            strategicForecastForecastData.Tier1CapitalPriorYear = dashboardConcepts.Tier1CapitalPriorYear;
            strategicForecastForecastData.Tier1CapitalCurrentQuarter = dashboardConcepts.Tier1CapitalCurrentQuarter;
            strategicForecastForecastData.Tier2CapitalPriorYear = dashboardConcepts.Tier2CapitalPriorYear;
            strategicForecastForecastData.Tier2CapitalCurrentQuarter = dashboardConcepts.Tier2CapitalCurrentQuarter;
            strategicForecastForecastData.TotalRiskBasedCapitalPriorYear = dashboardConcepts.TotalRiskBasedCapitalPriorYear;
            strategicForecastForecastData.TotalRiskBasedCapitalCurrentQuarter = dashboardConcepts.TotalRiskBasedCapitalCurrentQuarter;
            strategicForecastForecastData.RiskWeightedAssetsPriorYear = dashboardConcepts.RiskWeightedAssetsPriorYear;
            strategicForecastForecastData.RiskWeightedAssetsCurrentQuarter = dashboardConcepts.RiskWeightedAssetsCurrentQuarter;
            strategicForecastForecastData.TotalAssetsForLeveragePriorYear = dashboardConcepts.TotalAssetsForLeveragePriorYear;
            strategicForecastForecastData.TotalAssetsForLeverageCurrentQuarter = dashboardConcepts.TotalAssetsForLeverageCurrentQuarter;
            strategicForecastForecastData.TotalAssetsPriorYear = dashboardConcepts.TotalAssetsPriorYear;
            strategicForecastForecastData.TotalAssetsCurrentQuarter = dashboardConcepts.TotalAssetsCurrentQuarter;
            //strategicForecastForecastData.NewAcquisitionAssetsPriorYear = dashboardConcepts.NewAcquisitionAssetsPriorYear;
            //strategicForecastForecastData.NewAcquisitionAssetsCurrentQuarter = dashboardConcepts.NewAcquisitionAssetsCurrentQuarter;
            strategicForecastForecastData.Cet1CapitalRatioPriorYear = dashboardConcepts.Cet1CapitalRatioPriorYear;
            strategicForecastForecastData.Cet1CapitalRatioCurrentQuarter = dashboardConcepts.Cet1CapitalRatioCurrentQuarter;
            strategicForecastForecastData.Tier1RBCRatioPriorYear = dashboardConcepts.Tier1RBCRatioPriorYear;
            strategicForecastForecastData.Tier1RBCRatioCurrentQuarter = dashboardConcepts.Tier1RBCRatioCurrentQuarter;
            strategicForecastForecastData.TotalRBCRatioPriorYear = dashboardConcepts.TotalRBCRatioPriorYear;
            strategicForecastForecastData.TotalRBCRatioCurrentQuarter = dashboardConcepts.TotalRBCRatioCurrentQuarter;
            strategicForecastForecastData.Tier1LeverageRatioPriorYear = dashboardConcepts.Tier1LeverageRatioPriorYear;
            strategicForecastForecastData.Tier1LeverageRatioCurrentQuarter = dashboardConcepts.Tier1LeverageRatioCurrentQuarter;
            strategicForecastForecastData.AssetGrowthRatePriorYear = dashboardConcepts.AssetGrowthRatePriorYear;
            strategicForecastForecastData.AssetGrowthRateCurrentQuarter = dashboardConcepts.AssetGrowthRateCurrentQuarter;
            strategicForecastForecastData.ReturnOnAverageAssetsPriorYear = dashboardConcepts.ReturnOnAverageAssetsPriorYear;
            strategicForecastForecastData.ReturnOnAverageAssetsCurrentQuarter = dashboardConcepts.ReturnOnAverageAssetsCurrentQuarter;
            strategicForecastForecastData.ReturnOnAverageEquityPriorYear = dashboardConcepts.ReturnOnAverageEquityPriorYear;
            strategicForecastForecastData.ReturnOnAverageEquityCurrentQuarter = dashboardConcepts.ReturnOnAverageEquityCurrentQuarter;
            //if (strategicForecastInput.UseTier1CapitalAdjustmentInput == false)
            //{
            //    strategicForecastForecastData.Tier1CapitalAdjustmentYear0 = dashboardConcepts.Tier1CapitalAdjustmentCurrentQuarter;
            //    strategicForecastForecastData.Tier1CapitalAdjustmentYear1 = dashboardConcepts.Tier1CapitalAdjustmentCurrentQuarter;
            //    strategicForecastForecastData.Tier1CapitalAdjustmentYear2 = dashboardConcepts.Tier1CapitalAdjustmentCurrentQuarter;
            //    strategicForecastForecastData.Tier1CapitalAdjustmentYear3 = dashboardConcepts.Tier1CapitalAdjustmentCurrentQuarter;
            //    strategicForecastForecastData.Tier1CapitalAdjustmentYear4 = dashboardConcepts.Tier1CapitalAdjustmentCurrentQuarter;
            //    strategicForecastForecastData.Tier1CapitalAdjustmentYear5 = dashboardConcepts.Tier1CapitalAdjustmentCurrentQuarter;
            //}

            //if (strategicForecastInput.UseCet1CapitalAdjustmentInput == false)
            //{
            //    strategicForecastForecastData.Cet1CapitalAdjustmentYear0 = dashboardConcepts.Cet1CapitalAdjustmentCurrentQuarter;
            //    strategicForecastForecastData.Cet1CapitalAdjustmentYear1 = dashboardConcepts.Cet1CapitalAdjustmentCurrentQuarter;
            //    strategicForecastForecastData.Cet1CapitalAdjustmentYear2 = dashboardConcepts.Cet1CapitalAdjustmentCurrentQuarter;
            //    strategicForecastForecastData.Cet1CapitalAdjustmentYear3 = dashboardConcepts.Cet1CapitalAdjustmentCurrentQuarter;
            //    strategicForecastForecastData.Cet1CapitalAdjustmentYear4 = dashboardConcepts.Cet1CapitalAdjustmentCurrentQuarter;
            //    strategicForecastForecastData.Cet1CapitalAdjustmentYear5 = dashboardConcepts.Cet1CapitalAdjustmentCurrentQuarter;
            //}


            dividendsRatePriorYear();
            mvEquityPriorYear();
            bookValueSharePricePriorYear();
            mvSharePricePriorYear();
            earningsPerSharePricePriorYear();
            earningsPerShare15PricePriorYear();
            earningsPerShare20PricePriorYear();
            dividendPerSharePricePriorYear();
            dividendsRateCurrentQuarterYear();
            mvEquityCurrentQuarter();
            sharesOutstandingActualCurrentQuarter();
            bookValueSharePriceCurrentQuarter();
            mvSharePriceCurrentQuarter();
            earningsPerSharePriceCurrentQuarter();
            earningsPerShare15PriceCurrentQuarter();
            earningsPerShare20PriceCurrentQuarter();
            dividendPerSharePriceCurrentQuarter();
            totalAssetsYear0();
            netIncomeYear0();
            dividendsYear0();
            dividendsRateYear0();
            bankEquityCapitalYear0();
            cet1CapitalAdjustmentYear0();
            tier1CapitalAdjustmentYear0();
            cet1CapitalYear0();
            tier1CapitalYear0();
            tier2CapitalYear0();
            totalRiskBasedCapitalYear0();
            riskWeightedAssetsYear0();
            totalAssetsForLeverageYear0();
            cet1CapitalRatioYear0();
            tier1RBCRatioYear0();
            totalRBCRatioYear0();
            tier1LeverageRatioYear0();
            returnOnAverageEquityYear0();
            returnOnAverageAssetsYear0();
            mvEquityYear0();
            bvSharePriceYear0();
            mvSharePriceYear0();
            earningsPerSharePriceYear0();
            earningsPerShare15PriceYear0();
            earningsPerShare20PriceYear0();
            dividendPerSharePriceYear0();
            totalAssetsYear1();
            netIncomeYear1();
            dividendsYear1();
            dividendsRateYear1();
            bankEquityCapitalYear1();
            cet1CapitalAdjustmentYear1();
            tier1CapitalAdjustmentYear1();
            cet1CapitalYear1();
            tier1CapitalYear1();
            tier2CapitalYear1();
            totalRiskBasedCapitalYear1();
            riskWeightedAssetsYear1();
            totalAssetsForLeverageYear1();
            cet1CapitalRatioYear1();
            tier1RBCRatioYear1();
            totalRBCRatioYear1();
            tier1LeverageRatioYear1();
            returnOnAverageEquityYear1();
            returnOnAverageAssetsYear1();
            mvEquityYear1();
            bvSharePriceYear1();
            mvSharePriceYear1();
            earningsPerSharePriceYear1();
            earningsPerShare15PriceYear1();
            earningsPerShare20PriceYear1();
            dividendPerSharePriceYear1();
            totalAssetsYear2();
            netIncomeYear2();
            dividendsYear2();
            dividendsRateYear2();
            bankEquityCapitalYear2();
            cet1CapitalAdjustmentYear2();
            tier1CapitalAdjustmentYear2();
            cet1CapitalYear2();
            tier1CapitalYear2();
            tier2CapitalYear2();
            totalRiskBasedCapitalYear2();
            riskWeightedAssetsYear2();
            totalAssetsForLeverageYear2();
            cet1CapitalRatioYear2();
            tier1RBCRatioYear2();
            totalRBCRatioYear2();
            tier1LeverageRatioYear2();
            returnOnAverageEquityYear2();
            returnOnAverageAssetsYear2();
            mvEquityYear2();
            bvSharePriceYear2();
            mvSharePriceYear2();
            earningsPerSharePriceYear2();
            earningsPerShare15PriceYear2();
            earningsPerShare20PriceYear2();
            dividendPerSharePriceYear2();
            totalAssetsYear3();
            netIncomeYear3();
            dividendsYear3();
            dividendsRateYear3();
            bankEquityCapitalYear3();
            cet1CapitalAdjustmentYear3();
            tier1CapitalAdjustmentYear3();
            cet1CapitalYear3();
            tier1CapitalYear3();
            tier2CapitalYear3();
            totalRiskBasedCapitalYear3();
            riskWeightedAssetsYear3();
            totalAssetsForLeverageYear3();
            cet1CapitalRatioYear3();
            tier1RBCRatioYear3();
            totalRBCRatioYear3();
            tier1LeverageRatioYear3();
            returnOnAverageEquityYear3();
            returnOnAverageAssetsYear3();
            mvEquityYear3();
            bvSharePriceYear3();
            mvSharePriceYear3();
            earningsPerSharePriceYear3();
            earningsPerShare15PriceYear3();
            earningsPerShare20PriceYear3();
            dividendPerSharePriceYear3();
            totalAssetsYear4();
            netIncomeYear4();
            dividendsYear4();
            dividendsRateYear4();
            bankEquityCapitalYear4();
            cet1CapitalAdjustmentYear4();
            tier1CapitalAdjustmentYear4();
            cet1CapitalYear4();
            tier1CapitalYear4();
            tier2CapitalYear4();
            totalRiskBasedCapitalYear4();
            riskWeightedAssetsYear4();
            totalAssetsForLeverageYear4();
            cet1CapitalRatioYear4();
            tier1RBCRatioYear4();
            totalRBCRatioYear4();
            tier1LeverageRatioYear4();
            returnOnAverageEquityYear4();
            returnOnAverageAssetsYear4();
            mvEquityYear4();
            bvSharePriceYear4();
            mvSharePriceYear4();
            earningsPerSharePriceYear4();
            earningsPerShare15PriceYear4();
            earningsPerShare20PriceYear4();
            dividendPerSharePriceYear4();
            totalAssetsYear5();
            netIncomeYear5();
            dividendsYear5();
            dividendsRateYear5();
            bankEquityCapitalYear5();
            cet1CapitalAdjustmentYear5();
            tier1CapitalAdjustmentYear5();
            cet1CapitalYear5();
            tier1CapitalYear5();
            tier2CapitalYear5();
            totalRiskBasedCapitalYear5();
            riskWeightedAssetsYear5();
            totalAssetsForLeverageYear5();
            cet1CapitalRatioYear5();
            tier1RBCRatioYear5();
            totalRBCRatioYear5();
            tier1LeverageRatioYear5();
            returnOnAverageEquityYear5();
            returnOnAverageAssetsYear5();
            mvEquityYear5();
            bvSharePriceYear5();
            mvSharePriceYear5();
            earningsPerSharePriceYear5();
            earningsPerShare15PriceYear5();
            earningsPerShare20PriceYear5();
            dividendPerSharePriceYear5();
            #endregion
        }

        #region //Prior Year calcualtions
        public void dividendsRatePriorYear()
        {
            strategicForecastForecastData.DividendsRatePriorYear = ((strategicForecastInput.DividendsPriorYear) / (strategicForecastInput.NetIncomePriorYear)) * 100;
        }

        public void mvEquityPriorYear()
        {
            strategicForecastForecastData.MvEquityPriorYear = Convert.ToDecimal((strategicForecastForecastData.BankEquityCapitalPriorYear) * Convert.ToDecimal(1.5));
        }

        public void bookValueSharePricePriorYear()
        {
            strategicForecastForecastData.BvSharePricePriorYear = ((strategicForecastForecastData.BankEquityCapitalPriorYear) * 1000) / (strategicForecastInput.SharesOutstandingActualPriorYear);
        }

        public void mvSharePricePriorYear()
        {
            strategicForecastForecastData.MvSharePricePriorYear = ((strategicForecastForecastData.MvEquityPriorYear) * 1000) / (strategicForecastInput.SharesOutstandingActualPriorYear);
        }

        public void earningsPerSharePricePriorYear()
        {
            strategicForecastForecastData.EarningsPerSharePricePriorYear = ((strategicForecastInput.NetIncomePriorYear) * 1000) / (strategicForecastInput.SharesOutstandingActualPriorYear);
        }

        public void earningsPerShare15PricePriorYear()
        {
            strategicForecastForecastData.EarningsPerShare15PricePriorYear = (strategicForecastForecastData.EarningsPerSharePricePriorYear) * 15;
        }

        public void earningsPerShare20PricePriorYear()
        {
            strategicForecastForecastData.EarningsPerShare20PricePriorYear = (strategicForecastForecastData.EarningsPerSharePricePriorYear) * 20;
        }

        public void dividendPerSharePricePriorYear()
        {
            strategicForecastForecastData.DividendPerSharePricePriorYear = ((strategicForecastInput.DividendsPriorYear) * (-1000)) / (strategicForecastInput.SharesOutstandingActualPriorYear);
        }
        #endregion

        #region //Current Year calcualtions
        public void dividendsRateCurrentQuarterYear()
        {
            strategicForecastForecastData.DividendsRateCurrentQuarter = ((strategicForecastInput.DividendsCurrentQuarter) / (strategicForecastInput.NetIncomeCurrentQuarter)) * 100;
        }

        public void mvEquityCurrentQuarter()
        {
            strategicForecastForecastData.MvEquityCurrentQuarter = (strategicForecastForecastData.BankEquityCapitalCurrentQuarter) * Convert.ToDecimal(1.5);
        }

        public void sharesOutstandingActualCurrentQuarter()
        {
            strategicForecastForecastData.SharesOutstandingCurrentQuarter = (strategicForecastForecastData.SharesOutstandingCurrentQuarter);
        }

        public void bookValueSharePriceCurrentQuarter()
        {
            strategicForecastForecastData.BvSharePriceCurrentQuarter = (strategicForecastForecastData.BankEquityCapitalCurrentQuarter) * 1000 / (strategicForecastInput.SharesOutstandingActualCurrentQuarter);
        }

        public void mvSharePriceCurrentQuarter()
        {
            strategicForecastForecastData.MvSharePriceCurrentQuarter = (strategicForecastForecastData.MvEquityCurrentQuarter) * 1000 / (strategicForecastInput.SharesOutstandingActualCurrentQuarter);
        }

        public void earningsPerSharePriceCurrentQuarter()
        {
            strategicForecastForecastData.EarningsPerSharePriceCurrentQuarter = (strategicForecastInput.NetIncomeCurrentQuarter) * 1000 / (strategicForecastInput.SharesOutstandingActualCurrentQuarter);
        }

        public void earningsPerShare15PriceCurrentQuarter()
        {
            strategicForecastForecastData.EarningsPerShare15PriceCurrentQuarter = (strategicForecastForecastData.EarningsPerSharePriceCurrentQuarter) * 15;
        }

        public void earningsPerShare20PriceCurrentQuarter()
        {
            strategicForecastForecastData.EarningsPerShare20PriceCurrentQuarter = (strategicForecastForecastData.EarningsPerSharePriceCurrentQuarter) * 20;
        }

        public void dividendPerSharePriceCurrentQuarter()
        {
            strategicForecastForecastData.DividendPerSharePriceCurrentQuarter = (strategicForecastInput.DividendsCurrentQuarter) * (-1000) / (strategicForecastInput.SharesOutstandingActualCurrentQuarter);
        }
        #endregion

        #region //Year 0 Calculations
        public void totalAssetsYear0()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear0 == null)
                strategicForecastInput.NewAcquisitionAssetsYear0 = 0;

            strategicForecastForecastData.TotalAssetsYear0 = (strategicForecastForecastData.TotalAssetsPriorYear) * (1 + ((strategicForecastInput.AssetGrowthRateYear0) / 100)) + (strategicForecastInput.NewAcquisitionAssetsYear0);
        }

        public void netIncomeYear0()
        {
            if (strategicForecastInput.NetIncomeYear0 == null)
            {
                strategicForecastForecastData.NetIncomeYear0 = (((strategicForecastForecastData.TotalAssetsPriorYear) + (strategicForecastForecastData.TotalAssetsYear0)) / 2) * ((strategicForecastInput.ReturnOnAverageAssetsYear0) / 100);
            }
            else
            {
                strategicForecastForecastData.NetIncomeYear0 = strategicForecastInput.NetIncomeYear0;
            }
        }

        public void dividendsYear0()
        {
            if (strategicForecastInput.DividendsYear0 == null || strategicForecastInput.DividendsYear0 == 0)
                strategicForecastForecastData.DividendsYear0 = (strategicForecastForecastData.NetIncomeYear0) * ((strategicForecastInput.DividendsRateYear0) / 100);
            else
                strategicForecastForecastData.DividendsYear0 = strategicForecastInput.DividendsYear0;
        }

        public void dividendsRateYear0()
        {
            if ((strategicForecastForecastData.NetIncomeYear0 != null && strategicForecastForecastData.NetIncomeYear0 > 0) && (strategicForecastForecastData.DividendsYear0 != null && strategicForecastForecastData.DividendsYear0 != 0))
            {
                strategicForecastForecastData.DividendsRateYear0 = (strategicForecastForecastData.DividendsYear0 / strategicForecastForecastData.NetIncomeYear0) * 100;
            }
        }

        public void bankEquityCapitalYear0()
        {
            if (strategicForecastInput.NewCapitalYear0 != null)
                strategicForecastForecastData.BankEquityCapitalYear0 = (strategicForecastForecastData.BankEquityCapitalPriorYear) + (strategicForecastForecastData.NetIncomeYear0) - (strategicForecastForecastData.DividendsYear0.GetValueOrDefault()) + (strategicForecastInput.NewCapitalYear0.GetValueOrDefault());
            else
                strategicForecastForecastData.BankEquityCapitalYear0 = (strategicForecastForecastData.BankEquityCapitalPriorYear) + (strategicForecastForecastData.NetIncomeYear0) - (strategicForecastForecastData.DividendsYear0.GetValueOrDefault());
        }

        public void cet1CapitalAdjustmentYear0()
        {
            if (strategicForecastInput.UseCet1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Cet1CapitalAdjustmentYear0 = (strategicForecastForecastData.Cet1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Cet1CapitalAdjustmentYear0 = strategicForecastInput.Cet1CapitalAdjustmentYear0;
        }

        public void tier1CapitalAdjustmentYear0()
        {
            if (strategicForecastInput.UseTier1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Tier1CapitalAdjustmentYear0 = (strategicForecastForecastData.Tier1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Tier1CapitalAdjustmentYear0 = strategicForecastInput.Tier1CapitalAdjustmentYear0;
        }

        public void cet1CapitalYear0()
        {
            decimal bankEqCapital = 0;
            decimal cet1CapAdjustment = 0;
            decimal tier1CapAdjustment = 0;

            if (strategicForecastForecastData.Cet1CapitalAdjustmentYear0 != null)
                cet1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Cet1CapitalAdjustmentYear0);
            if (strategicForecastForecastData.BankEquityCapitalYear0 != null)
                bankEqCapital = Convert.ToDecimal(strategicForecastForecastData.BankEquityCapitalYear0);
            if (strategicForecastForecastData.Tier1CapitalAdjustmentYear0 != null)
                tier1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Tier1CapitalAdjustmentYear0);
            strategicForecastForecastData.Cet1CapitalYear0 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
        }

        public void tier1CapitalYear0()
        {
            strategicForecastForecastData.Tier1CapitalYear0 = (strategicForecastForecastData.BankEquityCapitalYear0) + (strategicForecastForecastData.Tier1CapitalAdjustmentYear0.HasValue ? strategicForecastForecastData.Tier1CapitalAdjustmentYear0 : 0);
        }

        public void tier2CapitalYear0()
        {
            if (strategicForecastInput.UseTier2CapitalInput == false)
            {
                strategicForecastForecastData.Tier2CapitalYear0 = ((strategicForecastForecastData.Tier2CapitalPriorYear) / (strategicForecastForecastData.Tier1CapitalPriorYear)) * (strategicForecastForecastData.Tier1CapitalYear0);
            }
            else
            {
                strategicForecastForecastData.Tier2CapitalYear0 = strategicForecastInput.Tier2CapitalYear0;
            }
        }

        public void totalRiskBasedCapitalYear0()
        {
            strategicForecastForecastData.TotalRiskBasedCapitalYear0 = (strategicForecastForecastData.Tier1CapitalYear0) + (strategicForecastForecastData.Tier2CapitalYear0.HasValue ? strategicForecastForecastData.Tier2CapitalYear0 : 0);
        }

        public void riskWeightedAssetsYear0()
        {
            if (strategicForecastInput.UseRiskWeightedAssetsInput == false)
            {
                strategicForecastForecastData.RiskWeightedAssetsYear0 = ((strategicForecastForecastData.RiskWeightedAssetsPriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear0);
            }
            else
            {
                strategicForecastForecastData.RiskWeightedAssetsYear0 = strategicForecastInput.RiskWeightedAssetsYear0;
            }
        }

        public void totalAssetsForLeverageYear0()
        {
            if (strategicForecastInput.UseTotalAssetsForLeverageInput == false)
            {
                strategicForecastInput.TotalAssetsLeverageYear0 = ((strategicForecastForecastData.TotalAssetsForLeveragePriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear0);
            }
        }

        public void cet1CapitalRatioYear0()
        {
            strategicForecastForecastData.Cet1CapitalRatioYear0 = ((strategicForecastForecastData.Cet1CapitalYear0) / (strategicForecastForecastData.RiskWeightedAssetsYear0)) * 100;
        }

        public void tier1RBCRatioYear0()
        {
            strategicForecastForecastData.Tier1RBCRatioYear0 = ((strategicForecastForecastData.Tier1CapitalYear0) / (strategicForecastForecastData.RiskWeightedAssetsYear0)) * 100;
        }

        public void totalRBCRatioYear0()
        {
            strategicForecastForecastData.TotalRBCRatioYear0 = ((strategicForecastForecastData.TotalRiskBasedCapitalYear0) / (strategicForecastForecastData.RiskWeightedAssetsYear0)) * 100;
        }

        public void tier1LeverageRatioYear0()
        {
            strategicForecastForecastData.Tier1LeverageRatioYear0 = ((strategicForecastForecastData.Tier1CapitalYear0) / (strategicForecastInput.TotalAssetsLeverageYear0)) * 100;
        }

        public void returnOnAverageEquityYear0()
        {
            strategicForecastForecastData.ReturnOnAverageEquityYear0 = ((strategicForecastForecastData.NetIncomeYear0) / (((strategicForecastForecastData.BankEquityCapitalYear0) + (strategicForecastForecastData.BankEquityCapitalPriorYear)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear0()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear0 = (((strategicForecastInput.NetIncomeYear0) / (((strategicForecastForecastData.TotalAssetsPriorYear) + (strategicForecastForecastData.TotalAssetsYear0)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear0 = strategicForecastInput.ReturnOnAverageAssetsYear0;
            }
        }

        public void mvEquityYear0()
        {
            strategicForecastForecastData.MvEquityYear0 = (strategicForecastForecastData.BankEquityCapitalYear0) * Convert.ToDecimal(1.5);
        }

        public void bvSharePriceYear0()
        {
            strategicForecastForecastData.BvSharePriceYear0 = (strategicForecastForecastData.BankEquityCapitalYear0) * 1000 / (strategicForecastForecastData.SharesOutstandingYear0);
        }

        public void mvSharePriceYear0()
        {
            strategicForecastForecastData.MvSharePriceYear0 = (strategicForecastForecastData.MvEquityYear0) * 1000 / (strategicForecastForecastData.SharesOutstandingYear0);
        }

        public void earningsPerSharePriceYear0()
        {
            strategicForecastForecastData.EarningsPerSharePriceYear0 = (strategicForecastForecastData.NetIncomeYear0) * 1000 / (strategicForecastForecastData.SharesOutstandingYear0);
        }

        public void earningsPerShare15PriceYear0()
        {
            strategicForecastForecastData.EarningsPerShare15PriceYear0 = (strategicForecastForecastData.EarningsPerSharePriceYear0) * 15;
        }

        public void earningsPerShare20PriceYear0()
        {
            strategicForecastForecastData.EarningsPerShare20PriceYear0 = (strategicForecastForecastData.EarningsPerSharePriceYear0) * 20;
        }

        public void dividendPerSharePriceYear0()
        {
            strategicForecastForecastData.DividendPerSharePriceYear0 = ((strategicForecastForecastData.DividendsYear0) * (-1000)) / (strategicForecastForecastData.SharesOutstandingYear0);
        }
        #endregion

        #region //Year 1 Calculations
        public void totalAssetsYear1()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear1 == null)
                strategicForecastInput.NewAcquisitionAssetsYear1 = 0;

            strategicForecastForecastData.TotalAssetsYear1 = ((strategicForecastForecastData.TotalAssetsYear0) * (1 + ((strategicForecastInput.AssetGrowthRateYear1) / 100))) + (strategicForecastInput.NewAcquisitionAssetsYear1);
        }

        public void netIncomeYear1()
        {
            if (strategicForecastInput.NetIncomeYear1 == null)
            {
                strategicForecastForecastData.NetIncomeYear1 = (((strategicForecastForecastData.TotalAssetsYear0) + (strategicForecastForecastData.TotalAssetsYear1)) / 2) * ((strategicForecastInput.ReturnOnAverageAssetsYear1) / 100);
            }
            else
            {
                strategicForecastForecastData.NetIncomeYear1 = strategicForecastInput.NetIncomeYear1;
            }
        }

        public void dividendsYear1()
        {
            if (strategicForecastInput.DividendsYear1 == null || strategicForecastInput.DividendsYear1 == 0)
                strategicForecastForecastData.DividendsYear1 = (strategicForecastForecastData.NetIncomeYear1) * ((strategicForecastInput.DividendsRateYear1) / 100);
            else
                strategicForecastForecastData.DividendsYear1 = strategicForecastInput.DividendsYear1;
        }

        public void dividendsRateYear1()
        {
            if ((strategicForecastForecastData.NetIncomeYear1 != null && strategicForecastForecastData.NetIncomeYear1 > 0) && (strategicForecastForecastData.DividendsYear1 != null && strategicForecastForecastData.DividendsYear1 != 0))
            {
                strategicForecastForecastData.DividendsRateYear1 = (strategicForecastForecastData.DividendsYear1 / strategicForecastForecastData.NetIncomeYear1) * 100;
            }
        }

        public void bankEquityCapitalYear1()
        {
            if (strategicForecastInput.NewCapitalYear1 != null)
                strategicForecastForecastData.BankEquityCapitalYear1 = (strategicForecastForecastData.BankEquityCapitalYear0) + (strategicForecastForecastData.NetIncomeYear1) - (strategicForecastForecastData.DividendsYear1) + (strategicForecastInput.NewCapitalYear1);
            else
                strategicForecastForecastData.BankEquityCapitalYear1 = (strategicForecastForecastData.BankEquityCapitalYear0) + (strategicForecastForecastData.NetIncomeYear1) - (strategicForecastForecastData.DividendsYear1);
        }

        public void cet1CapitalAdjustmentYear1()
        {
            if (strategicForecastInput.UseCet1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Cet1CapitalAdjustmentYear1 = (strategicForecastForecastData.Cet1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Cet1CapitalAdjustmentYear1 = strategicForecastInput.Cet1CapitalAdjustmentYear1;
        }

        public void tier1CapitalAdjustmentYear1()
        {
            if (strategicForecastInput.UseTier1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Tier1CapitalAdjustmentYear1 = (strategicForecastForecastData.Tier1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Tier1CapitalAdjustmentYear1 = strategicForecastInput.Tier1CapitalAdjustmentYear1;
        }

        public void cet1CapitalYear1()
        {
            decimal bankEqCapital = 0;
            decimal cet1CapAdjustment = 0;
            decimal tier1CapAdjustment = 0;

            if (strategicForecastForecastData.Cet1CapitalAdjustmentYear1 != null)
                cet1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Cet1CapitalAdjustmentYear1);
            if (strategicForecastForecastData.BankEquityCapitalYear1 != null)
                bankEqCapital = Convert.ToDecimal(strategicForecastForecastData.BankEquityCapitalYear1);
            if (strategicForecastForecastData.Tier1CapitalAdjustmentYear1 != null)
                tier1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Tier1CapitalAdjustmentYear1);

            strategicForecastForecastData.Cet1CapitalYear1 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
        }

        public void tier1CapitalYear1()
        {
            strategicForecastForecastData.Tier1CapitalYear1 = (strategicForecastForecastData.BankEquityCapitalYear1) + (strategicForecastForecastData.Tier1CapitalAdjustmentYear1.HasValue ? strategicForecastForecastData.Tier1CapitalAdjustmentYear1 : 0);
        }

        public void tier2CapitalYear1()
        {
            if (strategicForecastInput.UseTier2CapitalInput == false)
            {
                strategicForecastForecastData.Tier2CapitalYear1 = ((strategicForecastForecastData.Tier2CapitalPriorYear) / (strategicForecastForecastData.Tier1CapitalPriorYear)) * (strategicForecastForecastData.Tier1CapitalYear1);
            }
            else
            {
                strategicForecastForecastData.Tier2CapitalYear1 = strategicForecastInput.Tier2CapitalYear1;
            }
        }

        public void totalRiskBasedCapitalYear1()
        {
            strategicForecastForecastData.TotalRiskBasedCapitalYear1 = (strategicForecastForecastData.Tier1CapitalYear1) + (strategicForecastForecastData.Tier2CapitalYear1.HasValue ? strategicForecastForecastData.Tier2CapitalYear1 : 0);
        }

        public void riskWeightedAssetsYear1()
        {
            if (strategicForecastInput.UseRiskWeightedAssetsInput == false)
            {
                strategicForecastForecastData.RiskWeightedAssetsYear1 = ((strategicForecastForecastData.RiskWeightedAssetsPriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear1);
            }
            else
            {
                strategicForecastForecastData.RiskWeightedAssetsYear1 = strategicForecastInput.RiskWeightedAssetsYear1;
            }
        }

        public void totalAssetsForLeverageYear1()
        {
            if (strategicForecastInput.UseTotalAssetsForLeverageInput == false)
            {
                strategicForecastInput.TotalAssetsLeverageYear1 = ((strategicForecastForecastData.TotalAssetsForLeveragePriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear1);
            }
        }

        public void cet1CapitalRatioYear1()
        {
            strategicForecastForecastData.Cet1CapitalRatioYear1 = ((strategicForecastForecastData.Cet1CapitalYear1) / (strategicForecastForecastData.RiskWeightedAssetsYear1)) * 100;
        }

        public void tier1RBCRatioYear1()
        {
            strategicForecastForecastData.Tier1RBCRatioYear1 = ((strategicForecastForecastData.Tier1CapitalYear1) / (strategicForecastForecastData.RiskWeightedAssetsYear1)) * 100;
        }

        public void totalRBCRatioYear1()
        {
            strategicForecastForecastData.TotalRBCRatioYear1 = ((strategicForecastForecastData.TotalRiskBasedCapitalYear1) / (strategicForecastForecastData.RiskWeightedAssetsYear1)) * 100;
        }

        public void tier1LeverageRatioYear1()
        {
            strategicForecastForecastData.Tier1LeverageRatioYear1 = ((strategicForecastForecastData.Tier1CapitalYear1) / (strategicForecastInput.TotalAssetsLeverageYear1)) * 100;
        }

        public void returnOnAverageEquityYear1()
        {
            strategicForecastForecastData.ReturnOnAverageEquityYear1 = ((strategicForecastForecastData.NetIncomeYear1) / (((strategicForecastForecastData.BankEquityCapitalYear1) + (strategicForecastForecastData.BankEquityCapitalYear0)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear1()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear1 = (((strategicForecastInput.NetIncomeYear1) / (((strategicForecastForecastData.TotalAssetsYear0) + (strategicForecastForecastData.TotalAssetsYear1)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear1 = strategicForecastInput.ReturnOnAverageAssetsYear1;
            }
        }

        public void mvEquityYear1()
        {
            strategicForecastForecastData.MvEquityYear1 = (strategicForecastForecastData.BankEquityCapitalYear1) * Convert.ToDecimal(1.5);
        }

        public void bvSharePriceYear1()
        {
            strategicForecastForecastData.BvSharePriceYear1 = ((strategicForecastForecastData.BankEquityCapitalYear1) * 1000) / (strategicForecastForecastData.SharesOutstandingYear1);
        }

        public void mvSharePriceYear1()
        {
            strategicForecastForecastData.MvSharePriceYear1 = ((strategicForecastForecastData.MvEquityYear1) * 1000) / (strategicForecastForecastData.SharesOutstandingYear1);
        }

        public void earningsPerSharePriceYear1()
        {
            strategicForecastForecastData.EarningsPerSharePriceYear1 = ((strategicForecastForecastData.NetIncomeYear1) * 1000) / (strategicForecastForecastData.SharesOutstandingYear1);
        }

        public void earningsPerShare15PriceYear1()
        {
            strategicForecastForecastData.EarningsPerShare15PriceYear1 = (strategicForecastForecastData.EarningsPerSharePriceYear1) * 15;
        }

        public void earningsPerShare20PriceYear1()
        {
            strategicForecastForecastData.EarningsPerShare20PriceYear1 = (strategicForecastForecastData.EarningsPerSharePriceYear1) * 20;
        }

        public void dividendPerSharePriceYear1()
        {
            strategicForecastForecastData.DividendPerSharePriceYear1 = ((strategicForecastForecastData.DividendsYear1) * (-1000)) / (strategicForecastForecastData.SharesOutstandingYear1);
        }
        #endregion

        #region //Year 2 Calculations

        public void totalAssetsYear2()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear2 == null)
                strategicForecastInput.NewAcquisitionAssetsYear2 = 0;

            strategicForecastForecastData.TotalAssetsYear2 = ((strategicForecastForecastData.TotalAssetsYear1) * (1 + ((strategicForecastInput.AssetGrowthRateYear2) / 100))) + (strategicForecastInput.NewAcquisitionAssetsYear2);
        }

        public void netIncomeYear2()
        {
            if (strategicForecastInput.NetIncomeYear2 == null)
            {
                strategicForecastForecastData.NetIncomeYear2 = (((strategicForecastForecastData.TotalAssetsYear1) + (strategicForecastForecastData.TotalAssetsYear2)) / 2) * ((strategicForecastInput.ReturnOnAverageAssetsYear2) / 100);
            }
            else
            {
                strategicForecastForecastData.NetIncomeYear2 = strategicForecastInput.NetIncomeYear2;
            }
        }

        public void dividendsYear2()
        {
            if (strategicForecastInput.DividendsYear2 == null || strategicForecastInput.DividendsYear2 == 0)
                strategicForecastForecastData.DividendsYear2 = (strategicForecastForecastData.NetIncomeYear2) * ((strategicForecastInput.DividendsRateYear2) / 100);
            else
                strategicForecastForecastData.DividendsYear2 = strategicForecastInput.DividendsYear2;
        }

        public void dividendsRateYear2()
        {
            if ((strategicForecastForecastData.NetIncomeYear2 != null && strategicForecastForecastData.NetIncomeYear2 > 0) && (strategicForecastForecastData.DividendsYear2 != null && strategicForecastForecastData.DividendsYear2 != 0))
            {
                strategicForecastForecastData.DividendsRateYear2 = (strategicForecastForecastData.DividendsYear2 / strategicForecastForecastData.NetIncomeYear2) * 100;
            }
        }

        public void bankEquityCapitalYear2()
        {
            if (strategicForecastInput.NewCapitalYear2 != null)
                strategicForecastForecastData.BankEquityCapitalYear2 = (strategicForecastForecastData.BankEquityCapitalYear1) + (strategicForecastForecastData.NetIncomeYear2) - (strategicForecastForecastData.DividendsYear2) + (strategicForecastInput.NewCapitalYear2);
            else
                strategicForecastForecastData.BankEquityCapitalYear2 = (strategicForecastForecastData.BankEquityCapitalYear1) + (strategicForecastForecastData.NetIncomeYear2) - (strategicForecastForecastData.DividendsYear2);
        }

        public void cet1CapitalAdjustmentYear2()
        {
            if (strategicForecastInput.UseCet1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Cet1CapitalAdjustmentYear2 = (strategicForecastForecastData.Cet1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Cet1CapitalAdjustmentYear2 = strategicForecastInput.Cet1CapitalAdjustmentYear2;
        }

        public void tier1CapitalAdjustmentYear2()
        {
            if (strategicForecastInput.UseTier1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Tier1CapitalAdjustmentYear2 = (strategicForecastForecastData.Tier1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Tier1CapitalAdjustmentYear2 = strategicForecastInput.Tier1CapitalAdjustmentYear2;
        }

        public void cet1CapitalYear2()
        {
            decimal bankEqCapital = 0;
            decimal cet1CapAdjustment = 0;
            decimal tier1CapAdjustment = 0;

            if (strategicForecastForecastData.Cet1CapitalAdjustmentYear2 != null)
                cet1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Cet1CapitalAdjustmentYear2);
            if (strategicForecastForecastData.BankEquityCapitalYear2 != null)
                bankEqCapital = Convert.ToDecimal(strategicForecastForecastData.BankEquityCapitalYear2);
            if (strategicForecastForecastData.Tier1CapitalAdjustmentYear2 != null)
                tier1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Tier1CapitalAdjustmentYear2);

            strategicForecastForecastData.Cet1CapitalYear2 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
        }

        public void tier1CapitalYear2()
        {
            strategicForecastForecastData.Tier1CapitalYear2 = (strategicForecastForecastData.BankEquityCapitalYear2) + (strategicForecastForecastData.Tier1CapitalAdjustmentYear2.HasValue ? strategicForecastForecastData.Tier1CapitalAdjustmentYear2 : 0);
        }

        public void tier2CapitalYear2()
        {
            if (strategicForecastInput.UseTier2CapitalInput == false)
            {
                strategicForecastForecastData.Tier2CapitalYear2 = ((strategicForecastForecastData.Tier2CapitalPriorYear) / (strategicForecastForecastData.Tier1CapitalPriorYear)) * (strategicForecastForecastData.Tier1CapitalYear2);
            }
            else
            {
                strategicForecastForecastData.Tier2CapitalYear2 = strategicForecastInput.Tier2CapitalYear2;
            }
        }

        public void totalRiskBasedCapitalYear2()
        {
            strategicForecastForecastData.TotalRiskBasedCapitalYear2 = (strategicForecastForecastData.Tier1CapitalYear2) + (strategicForecastForecastData.Tier2CapitalYear2.HasValue ? strategicForecastForecastData.Tier2CapitalYear2 : 0);
        }

        public void riskWeightedAssetsYear2()
        {
            if (strategicForecastInput.UseRiskWeightedAssetsInput == false)
            {
                strategicForecastForecastData.RiskWeightedAssetsYear2 = ((strategicForecastForecastData.RiskWeightedAssetsPriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear2);
            }
            else
            {
                strategicForecastForecastData.RiskWeightedAssetsYear2 = strategicForecastInput.RiskWeightedAssetsYear2;
            }
        }

        public void totalAssetsForLeverageYear2()
        {
            if (strategicForecastInput.UseTotalAssetsForLeverageInput == false)
            {
                strategicForecastInput.TotalAssetsLeverageYear2 = ((strategicForecastForecastData.TotalAssetsForLeveragePriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear2);
            }
        }

        public void cet1CapitalRatioYear2()
        {
            strategicForecastForecastData.Cet1CapitalRatioYear2 = ((strategicForecastForecastData.Cet1CapitalYear2) / (strategicForecastForecastData.RiskWeightedAssetsYear2)) * 100;
        }

        public void tier1RBCRatioYear2()
        {
            strategicForecastForecastData.Tier1RBCRatioYear2 = ((strategicForecastForecastData.Tier1CapitalYear2) / (strategicForecastForecastData.RiskWeightedAssetsYear2)) * 100;
        }

        public void totalRBCRatioYear2()
        {
            strategicForecastForecastData.TotalRBCRatioYear2 = ((strategicForecastForecastData.TotalRiskBasedCapitalYear2) / (strategicForecastForecastData.RiskWeightedAssetsYear2)) * 100;
        }

        public void tier1LeverageRatioYear2()
        {
            strategicForecastForecastData.Tier1LeverageRatioYear2 = ((strategicForecastForecastData.Tier1CapitalYear2) / (strategicForecastInput.TotalAssetsLeverageYear2)) * 100;
        }

        public void returnOnAverageEquityYear2()
        {
            strategicForecastForecastData.ReturnOnAverageEquityYear2 = ((strategicForecastForecastData.NetIncomeYear2) / (((strategicForecastForecastData.BankEquityCapitalYear1) + (strategicForecastForecastData.BankEquityCapitalYear2)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear2()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear2 = (((strategicForecastInput.NetIncomeYear2) / (((strategicForecastForecastData.TotalAssetsYear1) + (strategicForecastForecastData.TotalAssetsYear2)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear2 = strategicForecastInput.ReturnOnAverageAssetsYear2;
            }
        }

        public void mvEquityYear2()
        {
            strategicForecastForecastData.MvEquityYear2 = (strategicForecastForecastData.BankEquityCapitalYear2) * Convert.ToDecimal(1.5);
        }

        public void bvSharePriceYear2()
        {
            strategicForecastForecastData.BvSharePriceYear2 = (strategicForecastForecastData.BankEquityCapitalYear2) * 1000 / (strategicForecastForecastData.SharesOutstandingYear2);
        }

        public void mvSharePriceYear2()
        {
            strategicForecastForecastData.MvSharePriceYear2 = (strategicForecastForecastData.MvEquityYear2) * 1000 / (strategicForecastForecastData.SharesOutstandingYear2);
        }

        public void earningsPerSharePriceYear2()
        {
            strategicForecastForecastData.EarningsPerSharePriceYear2 = (strategicForecastForecastData.NetIncomeYear2) * 1000 / (strategicForecastForecastData.SharesOutstandingYear2);
        }

        public void earningsPerShare15PriceYear2()
        {
            strategicForecastForecastData.EarningsPerShare15PriceYear2 = (strategicForecastForecastData.EarningsPerSharePriceYear2) * 15;
        }

        public void earningsPerShare20PriceYear2()
        {
            strategicForecastForecastData.EarningsPerShare20PriceYear2 = (strategicForecastForecastData.EarningsPerSharePriceYear2) * 20;
        }

        public void dividendPerSharePriceYear2()
        {
            strategicForecastForecastData.DividendPerSharePriceYear2 = (strategicForecastForecastData.DividendsYear2) * (-1000) / (strategicForecastForecastData.SharesOutstandingYear2);
        }
        #endregion

        #region //Year 3 Calculations

        public void totalAssetsYear3()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear3 == null)
                strategicForecastInput.NewAcquisitionAssetsYear3 = 0;

            strategicForecastForecastData.TotalAssetsYear3 = ((strategicForecastForecastData.TotalAssetsYear2) * (1 + ((strategicForecastInput.AssetGrowthRateYear3) / 100))) + (strategicForecastInput.NewAcquisitionAssetsYear3);
        }

        public void netIncomeYear3()
        {
            if (strategicForecastInput.NetIncomeYear3 == null)
            {
                strategicForecastForecastData.NetIncomeYear3 = (((strategicForecastForecastData.TotalAssetsYear2) + (strategicForecastForecastData.TotalAssetsYear3)) / 2) * ((strategicForecastInput.ReturnOnAverageAssetsYear3) / 100);
            }
            else
            {
                strategicForecastForecastData.NetIncomeYear3 = strategicForecastInput.NetIncomeYear3;
            }
        }

        public void dividendsYear3()
        {
            if (strategicForecastInput.DividendsYear3 == null || strategicForecastInput.DividendsYear3 == 0)
                strategicForecastForecastData.DividendsYear3 = (strategicForecastForecastData.NetIncomeYear3) * ((strategicForecastInput.DividendsRateYear3) / 100);
            else
                strategicForecastForecastData.DividendsYear3 = strategicForecastInput.DividendsYear3;
        }

        public void dividendsRateYear3()
        {
            if ((strategicForecastForecastData.NetIncomeYear3 != null && strategicForecastForecastData.NetIncomeYear3 > 0) && (strategicForecastForecastData.DividendsYear3 != null && strategicForecastForecastData.DividendsYear3 != 0))
            {
                strategicForecastForecastData.DividendsRateYear3 = (strategicForecastForecastData.DividendsYear3 / strategicForecastForecastData.NetIncomeYear3) * 100;
            }
        }

        public void bankEquityCapitalYear3()
        {
            if (strategicForecastInput.NewCapitalYear3 != null)
                strategicForecastForecastData.BankEquityCapitalYear3 = (strategicForecastForecastData.BankEquityCapitalYear2) + (strategicForecastForecastData.NetIncomeYear3) - (strategicForecastForecastData.DividendsYear3) + (strategicForecastInput.NewCapitalYear3);
            else
                strategicForecastForecastData.BankEquityCapitalYear3 = (strategicForecastForecastData.BankEquityCapitalYear2) + (strategicForecastForecastData.NetIncomeYear3) - (strategicForecastForecastData.DividendsYear3);
        }

        public void cet1CapitalAdjustmentYear3()
        {
            if (strategicForecastInput.UseCet1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Cet1CapitalAdjustmentYear3 = (strategicForecastForecastData.Cet1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Cet1CapitalAdjustmentYear3 = strategicForecastInput.Cet1CapitalAdjustmentYear3;
        }

        public void tier1CapitalAdjustmentYear3()
        {
            if (strategicForecastInput.UseTier1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Tier1CapitalAdjustmentYear3 = (strategicForecastForecastData.Tier1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Tier1CapitalAdjustmentYear3 = strategicForecastInput.Tier1CapitalAdjustmentYear3;
        }

        public void cet1CapitalYear3()
        {
            decimal bankEqCapital = 0;
            decimal cet1CapAdjustment = 0;
            decimal tier1CapAdjustment = 0;

            if (strategicForecastForecastData.Cet1CapitalAdjustmentYear3 != null)
                cet1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Cet1CapitalAdjustmentYear3);
            if (strategicForecastForecastData.BankEquityCapitalYear3 != null)
                bankEqCapital = Convert.ToDecimal(strategicForecastForecastData.BankEquityCapitalYear3);
            if (strategicForecastForecastData.Tier1CapitalAdjustmentYear3 != null)
                tier1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Tier1CapitalAdjustmentYear3);

            strategicForecastForecastData.Cet1CapitalYear3 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
        }

        public void tier1CapitalYear3()
        {
            strategicForecastForecastData.Tier1CapitalYear3 = (strategicForecastForecastData.BankEquityCapitalYear3) + (strategicForecastForecastData.Tier1CapitalAdjustmentYear3.HasValue ? strategicForecastForecastData.Tier1CapitalAdjustmentYear3 : 0);
        }

        public void tier2CapitalYear3()
        {
            if (strategicForecastInput.UseTier2CapitalInput == false)
            {
                strategicForecastForecastData.Tier2CapitalYear3 = ((strategicForecastForecastData.Tier2CapitalPriorYear) / (strategicForecastForecastData.Tier1CapitalPriorYear)) * (strategicForecastForecastData.Tier1CapitalYear3);
            }
            else
            {
                strategicForecastForecastData.Tier2CapitalYear3 = strategicForecastInput.Tier2CapitalYear3;
            }
        }

        public void totalRiskBasedCapitalYear3()
        {
            strategicForecastForecastData.TotalRiskBasedCapitalYear3 = (strategicForecastForecastData.Tier1CapitalYear3) + (strategicForecastForecastData.Tier2CapitalYear3.HasValue ? strategicForecastForecastData.Tier2CapitalYear3 : 0);
        }

        public void riskWeightedAssetsYear3()
        {
            if (strategicForecastInput.UseRiskWeightedAssetsInput == false)
            {
                strategicForecastForecastData.RiskWeightedAssetsYear3 = ((strategicForecastForecastData.RiskWeightedAssetsPriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear3);
            }
            else
            {
                strategicForecastForecastData.RiskWeightedAssetsYear3 = strategicForecastInput.RiskWeightedAssetsYear3;
            }
        }

        public void totalAssetsForLeverageYear3()
        {
            if (strategicForecastInput.UseTotalAssetsForLeverageInput == false)
            {
                strategicForecastInput.TotalAssetsLeverageYear3 = ((strategicForecastForecastData.TotalAssetsForLeveragePriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear3);
            }
        }

        public void cet1CapitalRatioYear3()
        {
            strategicForecastForecastData.Cet1CapitalRatioYear3 = ((strategicForecastForecastData.Cet1CapitalYear3) / (strategicForecastForecastData.RiskWeightedAssetsYear3)) * 100;
        }

        public void tier1RBCRatioYear3()
        {
            strategicForecastForecastData.Tier1RBCRatioYear3 = ((strategicForecastForecastData.Tier1CapitalYear3) / (strategicForecastForecastData.RiskWeightedAssetsYear3)) * 100;
        }

        public void totalRBCRatioYear3()
        {
            strategicForecastForecastData.TotalRBCRatioYear3 = ((strategicForecastForecastData.TotalRiskBasedCapitalYear3) / (strategicForecastForecastData.RiskWeightedAssetsYear3)) * 100;
        }

        public void tier1LeverageRatioYear3()
        {
            strategicForecastForecastData.Tier1LeverageRatioYear3 = ((strategicForecastForecastData.Tier1CapitalYear3) / (strategicForecastInput.TotalAssetsLeverageYear3)) * 100;
        }

        public void returnOnAverageEquityYear3()
        {
            strategicForecastForecastData.ReturnOnAverageEquityYear3 = ((strategicForecastForecastData.NetIncomeYear3) / (((strategicForecastForecastData.BankEquityCapitalYear2) + (strategicForecastForecastData.BankEquityCapitalYear3)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear3()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear3 = (((strategicForecastInput.NetIncomeYear3) / (((strategicForecastForecastData.TotalAssetsYear2) + (strategicForecastForecastData.TotalAssetsYear3)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear3 = strategicForecastInput.ReturnOnAverageAssetsYear3;
            }
        }

        public void mvEquityYear3()
        {
            strategicForecastForecastData.MvEquityYear3 = (strategicForecastForecastData.BankEquityCapitalYear3) * Convert.ToDecimal(1.5);
        }

        public void bvSharePriceYear3()
        {
            if(strategicForecastForecastData.SharesOutstandingYear3 > 0)
                strategicForecastForecastData.BvSharePriceYear3 = (strategicForecastForecastData.BankEquityCapitalYear3) * 1000 / (strategicForecastForecastData.SharesOutstandingYear3);
        }

        public void mvSharePriceYear3()
        {
            if (strategicForecastForecastData.SharesOutstandingYear3 > 0)
                strategicForecastForecastData.MvSharePriceYear3 = (strategicForecastForecastData.MvEquityYear3) * 1000 / (strategicForecastForecastData.SharesOutstandingYear3);
        }

        public void earningsPerSharePriceYear3()
        {
            if (strategicForecastForecastData.SharesOutstandingYear3 > 0)
                strategicForecastForecastData.EarningsPerSharePriceYear3 = (strategicForecastForecastData.NetIncomeYear3) * 1000 / (strategicForecastForecastData.SharesOutstandingYear3);
        }

        public void earningsPerShare15PriceYear3()
        {
            strategicForecastForecastData.EarningsPerShare15PriceYear3 = (strategicForecastForecastData.EarningsPerSharePriceYear3) * 15;
        }

        public void earningsPerShare20PriceYear3()
        {
            strategicForecastForecastData.EarningsPerShare20PriceYear3 = (strategicForecastForecastData.EarningsPerSharePriceYear3) * 20;
        }

        public void dividendPerSharePriceYear3()
        {
            if (strategicForecastForecastData.SharesOutstandingYear3 > 0)
                strategicForecastForecastData.DividendPerSharePriceYear3 = (strategicForecastForecastData.DividendsYear3) * (-1000) / (strategicForecastForecastData.SharesOutstandingYear3);
        }
        #endregion

        #region //Year 4 Calculations

        public void totalAssetsYear4()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear4 == null)
                strategicForecastInput.NewAcquisitionAssetsYear4 = 0;

            strategicForecastForecastData.TotalAssetsYear4 = ((strategicForecastForecastData.TotalAssetsYear3) * (1 + ((strategicForecastInput.AssetGrowthRateYear4) / 100))) + (strategicForecastInput.NewAcquisitionAssetsYear4);
        }

        public void netIncomeYear4()
        {
            if (strategicForecastInput.NetIncomeYear4 == null)
            {
                strategicForecastForecastData.NetIncomeYear4 = ((strategicForecastForecastData.TotalAssetsYear3) + (strategicForecastForecastData.TotalAssetsYear4)) / 2 * ((strategicForecastInput.ReturnOnAverageAssetsYear4) / 100);
            }
            else
            {
                strategicForecastForecastData.NetIncomeYear4 = strategicForecastInput.NetIncomeYear4;
            }
        }

        public void dividendsYear4()
        {
            if (strategicForecastInput.DividendsYear4 == null || strategicForecastInput.DividendsYear4 == 0)
                strategicForecastForecastData.DividendsYear4 = (strategicForecastForecastData.NetIncomeYear4) * ((strategicForecastInput.DividendsRateYear4) / 100);
            else
                strategicForecastForecastData.DividendsYear4 = strategicForecastInput.DividendsYear4;
        }

        public void dividendsRateYear4()
        {
            if ((strategicForecastForecastData.NetIncomeYear4 != null && strategicForecastForecastData.NetIncomeYear4 > 0) && (strategicForecastForecastData.DividendsYear4 != null && strategicForecastForecastData.DividendsYear4 != 0))
            {
                strategicForecastForecastData.DividendsRateYear4 = (strategicForecastForecastData.DividendsYear4 / strategicForecastForecastData.NetIncomeYear4) * 100;
            }
        }

        public void bankEquityCapitalYear4()
        {
            if (strategicForecastInput.NewCapitalYear4 != null)
                strategicForecastForecastData.BankEquityCapitalYear4 = (strategicForecastForecastData.BankEquityCapitalYear3) + (strategicForecastForecastData.NetIncomeYear4) - (strategicForecastForecastData.DividendsYear4) + (strategicForecastInput.NewCapitalYear4);
            else
                strategicForecastForecastData.BankEquityCapitalYear4 = (strategicForecastForecastData.BankEquityCapitalYear3) + (strategicForecastForecastData.NetIncomeYear4) - (strategicForecastForecastData.DividendsYear4);
        }

        public void cet1CapitalAdjustmentYear4()
        {
            if (strategicForecastInput.UseCet1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Cet1CapitalAdjustmentYear4 = (strategicForecastForecastData.Cet1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Cet1CapitalAdjustmentYear4 = strategicForecastInput.Cet1CapitalAdjustmentYear4;
        }

        public void tier1CapitalAdjustmentYear4()
        {
            if (strategicForecastInput.UseTier1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Tier1CapitalAdjustmentYear4 = (strategicForecastForecastData.Tier1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Tier1CapitalAdjustmentYear4 = strategicForecastInput.Tier1CapitalAdjustmentYear4;
        }

        public void cet1CapitalYear4()
        {
            decimal bankEqCapital = 0;
            decimal cet1CapAdjustment = 0;
            decimal tier1CapAdjustment = 0;

            if (strategicForecastForecastData.Cet1CapitalAdjustmentYear4 != null)
                cet1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Cet1CapitalAdjustmentYear4);
            if (strategicForecastForecastData.BankEquityCapitalYear4 != null)
                bankEqCapital = Convert.ToDecimal(strategicForecastForecastData.BankEquityCapitalYear4);
            if (strategicForecastForecastData.Tier1CapitalAdjustmentYear4 != null)
                tier1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Tier1CapitalAdjustmentYear4);

            strategicForecastForecastData.Cet1CapitalYear4 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
        }

        public void tier1CapitalYear4()
        {
            strategicForecastForecastData.Tier1CapitalYear4 = (strategicForecastForecastData.BankEquityCapitalYear4) + (strategicForecastForecastData.Tier1CapitalAdjustmentYear4.HasValue ? strategicForecastForecastData.Tier1CapitalAdjustmentYear4 : 0);
        }

        public void tier2CapitalYear4()
        {
            if (strategicForecastInput.UseTier2CapitalInput == false)
            {
                strategicForecastForecastData.Tier2CapitalYear4 = ((strategicForecastInput.Tier2CapitalPriorYear) / (strategicForecastForecastData.Tier1CapitalPriorYear)) * (strategicForecastForecastData.Tier1CapitalYear4);
            }
            else
            {
                strategicForecastForecastData.Tier2CapitalYear4 = strategicForecastInput.Tier2CapitalYear4;
            }
        }

        public void totalRiskBasedCapitalYear4()
        {
            strategicForecastForecastData.TotalRiskBasedCapitalYear4 = (strategicForecastForecastData.Tier1CapitalYear4) + (strategicForecastForecastData.Tier2CapitalYear4.HasValue ? strategicForecastForecastData.Tier2CapitalYear4 : 0);
        }

        public void riskWeightedAssetsYear4()
        {
            if (strategicForecastInput.UseRiskWeightedAssetsInput == false)
            {
                strategicForecastForecastData.RiskWeightedAssetsYear4 = ((strategicForecastForecastData.RiskWeightedAssetsPriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear4);
            }
            else
            {
                strategicForecastForecastData.RiskWeightedAssetsYear4 = strategicForecastInput.RiskWeightedAssetsYear4;
            }
        }

        public void totalAssetsForLeverageYear4()
        {
            if (strategicForecastInput.UseTotalAssetsForLeverageInput == false)
            {
                strategicForecastInput.TotalAssetsLeverageYear4 = ((strategicForecastForecastData.TotalAssetsForLeveragePriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear4);
            }
        }

        public void cet1CapitalRatioYear4()
        {
            strategicForecastForecastData.Cet1CapitalRatioYear4 = ((strategicForecastForecastData.Cet1CapitalYear4) / (strategicForecastForecastData.RiskWeightedAssetsYear4)) * 100;
        }

        public void tier1RBCRatioYear4()
        {
            strategicForecastForecastData.Tier1RBCRatioYear4 = ((strategicForecastForecastData.Tier1CapitalYear4) / (strategicForecastForecastData.RiskWeightedAssetsYear4)) * 100;
        }

        public void totalRBCRatioYear4()
        {
            strategicForecastForecastData.TotalRBCRatioYear4 = ((strategicForecastForecastData.TotalRiskBasedCapitalYear4) / (strategicForecastForecastData.RiskWeightedAssetsYear4)) * 100;
        }

        public void tier1LeverageRatioYear4()
        {
            strategicForecastForecastData.Tier1LeverageRatioYear4 = ((strategicForecastForecastData.Tier1CapitalYear4) / (strategicForecastInput.TotalAssetsLeverageYear4)) * 100;
        }

        public void returnOnAverageEquityYear4()
        {
            strategicForecastForecastData.ReturnOnAverageEquityYear4 = ((strategicForecastForecastData.NetIncomeYear4) / (((strategicForecastForecastData.BankEquityCapitalYear3) + (strategicForecastForecastData.BankEquityCapitalYear4)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear4()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear4 = (((strategicForecastInput.NetIncomeYear4) / (((strategicForecastForecastData.TotalAssetsYear3) + (strategicForecastForecastData.TotalAssetsYear4)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear4 = strategicForecastInput.ReturnOnAverageAssetsYear4;
            }
        }

        public void mvEquityYear4()
        {
            strategicForecastForecastData.MvEquityYear4 = (strategicForecastForecastData.BankEquityCapitalYear4) * Convert.ToDecimal(1.5);
        }

        public void bvSharePriceYear4()
        {
            if(strategicForecastForecastData.SharesOutstandingYear4 > 0)
                strategicForecastForecastData.BvSharePriceYear4 = (strategicForecastForecastData.BankEquityCapitalYear4) * 1000 / (strategicForecastForecastData.SharesOutstandingYear4);
        }

        public void mvSharePriceYear4()
        {
            if (strategicForecastForecastData.SharesOutstandingYear4 > 0)
                strategicForecastForecastData.MvSharePriceYear4 = (strategicForecastForecastData.MvEquityYear4) * 1000 / (strategicForecastForecastData.SharesOutstandingYear4);
        }

        public void earningsPerSharePriceYear4()
        {
            if (strategicForecastForecastData.SharesOutstandingYear4 > 0)
                strategicForecastForecastData.EarningsPerSharePriceYear4 = (strategicForecastForecastData.NetIncomeYear4) * 1000 / (strategicForecastForecastData.SharesOutstandingYear4);
        }

        public void earningsPerShare15PriceYear4()
        {
            strategicForecastForecastData.EarningsPerShare15PriceYear4 = (strategicForecastForecastData.EarningsPerSharePriceYear4) * 15;
        }

        public void earningsPerShare20PriceYear4()
        {
            strategicForecastForecastData.EarningsPerShare20PriceYear4 = (strategicForecastForecastData.EarningsPerSharePriceYear4) * 20;
        }

        public void dividendPerSharePriceYear4()
        {
            if (strategicForecastForecastData.SharesOutstandingYear4 > 0)
                strategicForecastForecastData.DividendPerSharePriceYear4 = (strategicForecastForecastData.DividendsYear4) * (-1000) / (strategicForecastForecastData.SharesOutstandingYear4);
        }
        #endregion

        #region //Year 5 Calculations

        public void totalAssetsYear5()
        {
            if (strategicForecastInput.NewAcquisitionAssetsYear5 == null)
                strategicForecastInput.NewAcquisitionAssetsYear5 = 0;

            strategicForecastForecastData.TotalAssetsYear5 = ((strategicForecastForecastData.TotalAssetsYear4) * (1 + ((strategicForecastInput.AssetGrowthRateYear5) / 100))) + (strategicForecastInput.NewAcquisitionAssetsYear5);
        }

        public void netIncomeYear5()
        {
            if (strategicForecastInput.NetIncomeYear5 == null)
            {
                strategicForecastForecastData.NetIncomeYear5 = ((strategicForecastForecastData.TotalAssetsYear4) + (strategicForecastForecastData.TotalAssetsYear5)) / 2 * ((strategicForecastInput.ReturnOnAverageAssetsYear5) / 100);
            }
            else
            {
                strategicForecastForecastData.NetIncomeYear5 = strategicForecastInput.NetIncomeYear5;
            }
        }

        public void dividendsYear5()
        {
            if (strategicForecastInput.DividendsYear5 == null || strategicForecastInput.DividendsYear5 == 0)
                strategicForecastForecastData.DividendsYear5 = (strategicForecastForecastData.NetIncomeYear5) * ((strategicForecastInput.DividendsRateYear5) / 100);
            else
                strategicForecastForecastData.DividendsYear5 = strategicForecastInput.DividendsYear5;
        }

        public void dividendsRateYear5()
        {
            if (strategicForecastForecastData.NetIncomeYear5 != null && (strategicForecastForecastData.NetIncomeYear5 > 0) && (strategicForecastForecastData.DividendsYear5 != null && strategicForecastForecastData.DividendsYear5 != 0))
            {
                strategicForecastForecastData.DividendsRateYear5 = (strategicForecastForecastData.DividendsYear5 / strategicForecastForecastData.NetIncomeYear5) * 100;
            }
        }

        public void bankEquityCapitalYear5()
        {
            if (strategicForecastInput.NewCapitalYear5 != null)
                strategicForecastForecastData.BankEquityCapitalYear5 = (strategicForecastForecastData.BankEquityCapitalYear4) + (strategicForecastForecastData.NetIncomeYear5) - (strategicForecastForecastData.DividendsYear5) + (strategicForecastInput.NewCapitalYear5);
            else
                strategicForecastForecastData.BankEquityCapitalYear5 = (strategicForecastForecastData.BankEquityCapitalYear4) + (strategicForecastForecastData.NetIncomeYear5) - (strategicForecastForecastData.DividendsYear5);
        }

        public void cet1CapitalAdjustmentYear5()
        {
            if (strategicForecastInput.UseCet1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Cet1CapitalAdjustmentYear5 = (strategicForecastForecastData.Cet1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Cet1CapitalAdjustmentYear5 = strategicForecastInput.Cet1CapitalAdjustmentYear5;
        }

        public void tier1CapitalAdjustmentYear5()
        {
            if (strategicForecastInput.UseTier1CapitalAdjustmentInput == false)
                strategicForecastForecastData.Tier1CapitalAdjustmentYear5 = (strategicForecastForecastData.Tier1CapitalAdjustmentPriorYear);
            else
                strategicForecastForecastData.Tier1CapitalAdjustmentYear5 = strategicForecastInput.Tier1CapitalAdjustmentYear5;
        }

        public void cet1CapitalYear5()
        {
            decimal bankEqCapital = 0;
            decimal cet1CapAdjustment = 0;
            decimal tier1CapAdjustment = 0;

            if (strategicForecastForecastData.Cet1CapitalAdjustmentYear5 != null)
                cet1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Cet1CapitalAdjustmentYear5);
            if (strategicForecastForecastData.BankEquityCapitalYear5 != null)
                bankEqCapital = Convert.ToDecimal(strategicForecastForecastData.BankEquityCapitalYear5);
            if (strategicForecastForecastData.Tier1CapitalAdjustmentYear5 != null)
                tier1CapAdjustment = Convert.ToDecimal(strategicForecastForecastData.Tier1CapitalAdjustmentYear5);

            strategicForecastForecastData.Cet1CapitalYear5 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
        }

        public void tier1CapitalYear5()
        {
            strategicForecastForecastData.Tier1CapitalYear5 = (strategicForecastForecastData.BankEquityCapitalYear5) + (strategicForecastForecastData.Tier1CapitalAdjustmentYear5.HasValue ? strategicForecastForecastData.Tier1CapitalAdjustmentYear5 : 0);
        }

        public void tier2CapitalYear5()
        {
            if (strategicForecastInput.UseTier2CapitalInput == false)
            {
                strategicForecastForecastData.Tier2CapitalYear5 = ((strategicForecastForecastData.Tier2CapitalPriorYear) / (strategicForecastForecastData.Tier1CapitalPriorYear)) * (strategicForecastForecastData.Tier1CapitalYear5);
            }
            else
            {
                strategicForecastForecastData.Tier2CapitalYear5 = strategicForecastInput.Tier2CapitalYear5;
            }
        }

        public void totalRiskBasedCapitalYear5()
        {
            strategicForecastForecastData.TotalRiskBasedCapitalYear5 = (strategicForecastForecastData.Tier1CapitalYear5) + (strategicForecastForecastData.Tier2CapitalYear5.HasValue ? strategicForecastForecastData.Tier2CapitalYear5 : 0);
        }

        public void riskWeightedAssetsYear5()
        {
            if (strategicForecastInput.UseRiskWeightedAssetsInput == false)
            {
                strategicForecastForecastData.RiskWeightedAssetsYear5 = ((strategicForecastForecastData.RiskWeightedAssetsPriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear5);
            }
            else
            {
                strategicForecastForecastData.RiskWeightedAssetsYear5 = strategicForecastInput.RiskWeightedAssetsYear5;
            }
        }

        public void totalAssetsForLeverageYear5()
        {
            if (strategicForecastInput.UseTotalAssetsForLeverageInput == false)
            {
                strategicForecastInput.TotalAssetsLeverageYear5 = ((strategicForecastForecastData.TotalAssetsForLeveragePriorYear) / (strategicForecastForecastData.TotalAssetsPriorYear)) * (strategicForecastForecastData.TotalAssetsYear5);
            }
        }

        public void cet1CapitalRatioYear5()
        {
            strategicForecastForecastData.Cet1CapitalRatioYear5 = ((strategicForecastForecastData.Cet1CapitalYear5) / (strategicForecastForecastData.RiskWeightedAssetsYear5)) * 100;
        }

        public void tier1RBCRatioYear5()
        {
            strategicForecastForecastData.Tier1RBCRatioYear5 = ((strategicForecastForecastData.Tier1CapitalYear5) / (strategicForecastForecastData.RiskWeightedAssetsYear5)) * 100;
        }

        public void totalRBCRatioYear5()
        {
            strategicForecastForecastData.TotalRBCRatioYear5 = ((strategicForecastForecastData.TotalRiskBasedCapitalYear5) / (strategicForecastForecastData.RiskWeightedAssetsYear5)) * 100;
        }

        public void tier1LeverageRatioYear5()
        {
            strategicForecastForecastData.Tier1LeverageRatioYear5 = ((strategicForecastForecastData.Tier1CapitalYear5) / (strategicForecastInput.TotalAssetsLeverageYear5)) * 100;
        }

        public void returnOnAverageEquityYear5()
        {
            strategicForecastForecastData.ReturnOnAverageEquityYear5 = ((strategicForecastForecastData.NetIncomeYear5) / (((strategicForecastForecastData.BankEquityCapitalYear4) + (strategicForecastForecastData.BankEquityCapitalYear5)) / 2)) * 100;
        }

        public void returnOnAverageAssetsYear5()
        {
            if (strategicForecastInput.UseNetIncomeInput == true)
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear5 = (((strategicForecastInput.NetIncomeYear5) / (((strategicForecastForecastData.TotalAssetsYear4) + (strategicForecastForecastData.TotalAssetsYear5)) / 2))) * 100;
            }
            else
            {
                strategicForecastForecastData.ReturnOnAverageAssetsYear5 = strategicForecastInput.ReturnOnAverageAssetsYear5;
            }
        }

        public void mvEquityYear5()
        {
            strategicForecastForecastData.MvEquityYear5 = (strategicForecastForecastData.BankEquityCapitalYear5) * Convert.ToDecimal(1.5);
        }

        public void bvSharePriceYear5()
        {
            if(strategicForecastForecastData.SharesOutstandingYear5 > 0)
                strategicForecastForecastData.BvSharePriceYear5 = (strategicForecastForecastData.BankEquityCapitalYear5) * 1000 / (strategicForecastForecastData.SharesOutstandingYear5);
        }

        public void mvSharePriceYear5()
        {
            if (strategicForecastForecastData.SharesOutstandingYear5 > 0)
                strategicForecastForecastData.MvSharePriceYear5 = (strategicForecastForecastData.MvEquityYear5) * 1000 / (strategicForecastForecastData.SharesOutstandingYear5);
        }

        public void earningsPerSharePriceYear5()
        {
            if (strategicForecastForecastData.SharesOutstandingYear5 > 0)
                strategicForecastForecastData.EarningsPerSharePriceYear5 = (strategicForecastForecastData.NetIncomeYear5) * 1000 / (strategicForecastForecastData.SharesOutstandingYear5);
        }

        public void earningsPerShare15PriceYear5()
        {
            strategicForecastForecastData.EarningsPerShare15PriceYear5 = (strategicForecastForecastData.EarningsPerSharePriceYear5) * 15;
        }

        public void earningsPerShare20PriceYear5()
        {
            strategicForecastForecastData.EarningsPerShare20PriceYear5 = (strategicForecastForecastData.EarningsPerSharePriceYear5) * 20;
        }

        public void dividendPerSharePriceYear5()
        {
            if (strategicForecastForecastData.SharesOutstandingYear5 > 0)
                strategicForecastForecastData.DividendPerSharePriceYear5 = (strategicForecastForecastData.DividendsYear5) * (-1000) / (strategicForecastForecastData.SharesOutstandingYear5);
        }
        #endregion
    }
}

