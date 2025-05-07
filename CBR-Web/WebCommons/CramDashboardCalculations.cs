using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.WebCommons
{
    public static partial class CramCalculations
    {
        private static CramRiskRatingsParams riskRating = null;
        private static CramDefaultRatings defaultRiskRating = null;
        private static CramAdjustBankDataParams adjustBankData = null;
        private static CramRiskCategoriesParams riskCategoriesAndWeights = null;
        private static CramDashboardConcepts cramDashboardConcepts = null;

        public static CramAdjustBankDataParams AdjustBankData
        {
            get
            {                
                return adjustBankData;
            }
            set
            {                
                CramCalculations.adjustBankData = value;
            }
        }
        public static CramRiskCategoriesParams RiskCategoriesAndWeights
        {
            get
            {
                return riskCategoriesAndWeights;
            }
            set
            {
                CramCalculations.riskCategoriesAndWeights = value;
            }
        }
        public static CramRiskRatingsParams RiskRating
        {
            get
            {
                return riskRating;
            }
            set
            {
                CramCalculations.riskRating = value;
            }
        }
        public static CramDefaultRatings DefaultRatings
        {
            get
            {
                return defaultRiskRating;
            }
            set
            {
                CramCalculations.defaultRiskRating = value;
            }
        }
        public static CramDashboardConcepts SelectedBankVitals
        {
            get
            {
                return cramDashboardConcepts;
            }
            set
            {
                CramCalculations.cramDashboardConcepts = value;
            }
        }
        public static Decimal? LeverBanksMinimumPolicy()
        {
            return (CramCalculations.AdjustBankData.Tier1LeverageRatio == null) ? 8 : AdjustBankData.Tier1LeverageRatio;
        }
        public static Decimal? CETBanksMinimumPolicy()
        {
            return (AdjustBankData.CET1CapitalRatio == null) ? 8 : AdjustBankData.CET1CapitalRatio;
        }
        public static Decimal? Tier1BanksMinimumPolicy()
        {
            return (AdjustBankData.Tier1CapitalRatio == null) ? 9 : AdjustBankData.Tier1CapitalRatio;
        }
        public static Decimal? TotalBanksMinimumPolicy()
        {
            return (AdjustBankData.TotalCapitalRatio == null) ? 11 : AdjustBankData.TotalCapitalRatio;
        }

        public static int Countblank()
        {
            var count = 0;
            if (RiskCategoriesAndWeights.CreditRiskWeight == null)
                count++;

            if (RiskCategoriesAndWeights.CreditRiskWeight == null)
                count++;

            if (RiskCategoriesAndWeights.InterestRateRiskWeight == null)
                count++;

            if (RiskCategoriesAndWeights.LiquidityRiskWeight == null)
                count++;

            if (RiskCategoriesAndWeights.OperationalRiskWeight == null)
                count++;

            if (RiskCategoriesAndWeights.ComplianceRiskWeight == null)
                count++;

            if (RiskCategoriesAndWeights.StrategicRiskWeight == null)
                count++;

            if (RiskCategoriesAndWeights.ReputationRiskWeight == null)
                count++;

            return count;
        }

        public static Decimal? CompositeRiskScoreCreditRisk()
        {
            if (RiskCategoriesAndWeights.CreditRisk == null)
                return 0;
            else
                return RiskCategoriesAndWeights.CreditRisk;
        }

        public static Decimal? CompositeRiskScoreInterestRateRisk()
        {
            if (RiskCategoriesAndWeights.InterestRateRisk == null)
                return 0;
            else
                return RiskCategoriesAndWeights.InterestRateRisk;
        }

        public static Decimal? CompositeRiskScoreLiquidityRisk()
        {
            if (RiskCategoriesAndWeights.LiquidityRisk == null)
                return 0;
            else
                return RiskCategoriesAndWeights.LiquidityRisk;
        }

        public static Decimal? CompositeRiskScoreOperationalRisk()
        {
            if (RiskCategoriesAndWeights.OperationalRisk == null)
                return 0;
            else
                return RiskCategoriesAndWeights.OperationalRisk;
        }

        public static Decimal? CompositeRiskScoreComplianceRisk()
        {
            if (RiskCategoriesAndWeights.ComplianceRisk == null)
                return 0;
            else
                return RiskCategoriesAndWeights.ComplianceRisk;
        }

        public static Decimal? CompositeRiskScoreStrategicRisk()
        {
            if (RiskCategoriesAndWeights.StrategicRisk == null)
                return 0;
            else
                return RiskCategoriesAndWeights.StrategicRisk;
        }

        public static Decimal? CompositeRiskScoreReputationRisk()
        {
            if (RiskCategoriesAndWeights.ReputationRisk == null)
                return 0;
            else
                return RiskCategoriesAndWeights.ReputationRisk;
        }

        //public static string GetRatingColorClass(rating)
        //{
        //    var ratingclass = "";

        //    if (rating == "Low")
        //        ratingclass = "green-color";
        //    else if (rating == "Low-Moderate")
        //        ratingclass = "light-green-color";
        //    else if (rating == "Moderate")
        //        ratingclass = "yellow-color";
        //    else if (rating == "Moderate-High")
        //        ratingclass = "orange-color";
        //    else if (rating == "High")
        //        ratingclass = "red-color";
        //    else
        //        ratingclass = "grey-color";

        //    return ratingclass;
        //}

        public static string RiskRatingCreditRisk()
        {
            var rating = "";

            if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 1)
                rating = "Low";
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 2)
                rating = "Low-Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 3)
                rating = "Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 4)
                rating = "Moderate-High";
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 5)
                rating = "High";
            else
                rating = "N/A";

            return rating;
        }

        public static string RiskRatingInterestRateRisk()
        {
            var rating = "";

            if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 1)
                rating = "Low";
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 2)
                rating = "Low-Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 3)
                rating = "Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 4)
                rating = "Moderate-High";
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 5)
                rating = "High";
            else
                rating = "N/A";

            return rating;
        }

        public static string RiskRatingLiquidityRisk()
        {
            var rating = "";

            if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 1)
                rating = "Low";
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 2)
                rating = "Low-Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 3)
                rating = "Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 4)
                rating = "Moderate-High";
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 5)
                rating = "High";
            else
                rating = "N/A";

            return rating;
        }

        public static string RiskRatingOperationalRisk()
        {
            var rating = "";

            if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 1)
                rating = "Low";
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 2)
                rating = "Low-Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 3)
                rating = "Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 4)
                rating = "Moderate-High";
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 5)
                rating = "High";
            else
                rating = "N/A";

            return rating;
        }

        public static string RiskRatingComplianceRisk()
        {
            var rating = "";

            if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 1)
                rating = "Low";
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 2)
                rating = "Low-Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 3)
                rating = "Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 4)
                rating = "Moderate-High";
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 5)
                rating = "High";
            else
                rating = "N/A";

            return rating;
        }

        public static string RiskRatingStrategicRisk()
        {
            var rating = "";

            if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 1)
                rating = "Low";
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 2)
                rating = "Low-Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 3)
                rating = "Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 4)
                rating = "Moderate-High";
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 5)
                rating = "High";
            else
                rating = "N/A";

            return rating;
        }

        public static string RiskRatingReputationRisk()
        {
            var rating = "";

            if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 1)
                rating = "Low";
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 2)
                rating = "Low-Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 3)
                rating = "Moderate";
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 4)
                rating = "Moderate-High";
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 5)
                rating = "High";
            else
                rating = "N/A";

            return rating;
        }

        public static Decimal? RiskWeightingCreditRisk()
        {
            Decimal? riskWeight = 0;
            riskWeight = RiskCategoriesAndWeights.CreditRiskWeight == null ? 0 : RiskCategoriesAndWeights.CreditRiskWeight;
            return riskWeight;
        }

        public static Decimal? RiskWeightingInterestRateRisk()
        {
            Decimal? riskWeight = 0;
            riskWeight = RiskCategoriesAndWeights.InterestRateRiskWeight == null ? 0 : RiskCategoriesAndWeights.InterestRateRiskWeight;
            return riskWeight;
        }

        public static Decimal? RiskWeightingLiquidityRisk()
        {
            Decimal? riskWeight = 0;
            riskWeight = RiskCategoriesAndWeights.LiquidityRiskWeight == null ? 0 : RiskCategoriesAndWeights.LiquidityRiskWeight;
            return riskWeight;
        }

        public static Decimal? RiskWeightingOperationalRisk()
        {
            Decimal? riskWeight = 0;
            riskWeight = RiskCategoriesAndWeights.OperationalRiskWeight == null ? 0 : RiskCategoriesAndWeights.OperationalRiskWeight;
            return riskWeight;
        }

        public static Decimal? RiskWeightingComplianceRisk()
        {
            Decimal? riskWeight = 0;
            riskWeight = RiskCategoriesAndWeights.ComplianceRiskWeight == null ? 0 : RiskCategoriesAndWeights.ComplianceRiskWeight;
            return riskWeight;
        }

        public static Decimal? RiskWeightingStrategicRisk()
        {
            Decimal? riskWeight = 0;
            riskWeight = RiskCategoriesAndWeights.StrategicRiskWeight == null ? 0 : RiskCategoriesAndWeights.StrategicRiskWeight;
            return riskWeight;
        }

        public static Decimal? RiskWeightingReputationRisk()
        {
            Decimal? riskWeight = 0;
            riskWeight = RiskCategoriesAndWeights.ReputationRiskWeight == null ? 0 : RiskCategoriesAndWeights.ReputationRiskWeight;
            return riskWeight;
        }

        public static Decimal? CapitalRiskBufferCreditRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Low);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Low);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.LowModerate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.LowModerate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Moderate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Moderate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.ModerateHigh);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.High);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.High);
                }
            }

            return riskBuffer;
        }

        public static Decimal? CapitalRiskBufferInterestRateRisk()
        {
            Decimal riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Low);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Low);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.LowModerate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.LowModerate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Moderate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Moderate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh); ;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.High);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.High);
                }
            }

            return riskBuffer;
        }

        public static Decimal? CapitalRiskBufferLiquidityRisk()
        {
            Decimal riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Low);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Low);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.LowModerate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.LowModerate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Moderate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Moderate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh); ;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.High);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.High);
                }
            }

            return riskBuffer;
        }

        public static Decimal? CapitalRiskBufferOperationalRisk()
        {
            Decimal riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Low);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Low);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.LowModerate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.LowModerate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Moderate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Moderate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh); ;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.High);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.High);
                }
            }
            return riskBuffer;

        }

        public static Decimal? CapitalRiskBufferComplianceRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Low);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Low);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.LowModerate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.LowModerate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Moderate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Moderate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.ModerateHigh); ;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.High);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.High);
                }
            }

            return riskBuffer;
        }

        public static Decimal? CapitalRiskBufferStrategicRisk()
        {
            Decimal riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Low);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Low);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.LowModerate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.LowModerate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Moderate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Moderate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh); ;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.High);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.High);
                }
            }

            return riskBuffer;
        }

        public static Decimal? CapitalRiskBufferReputationRisk()
        {
            Decimal riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Low);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Low);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.LowModerate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.LowModerate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.Moderate);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.Moderate);
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.ModerateHigh); ;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = Convert.ToDecimal(RiskRating.High);
                }
                else
                {
                    riskBuffer = Convert.ToDecimal(DefaultRatings.High);
                }
            }

            return riskBuffer;
        }

        public static Decimal? WeightedRiskBufferCreditRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingCreditRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferCreditRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingCreditRisk()) * Convert.ToDecimal(CapitalRiskBufferCreditRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? WeightedRiskBufferInterestRateRisk()
        {
            Decimal riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingInterestRateRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferInterestRateRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingInterestRateRisk()) * Convert.ToDecimal(CapitalRiskBufferInterestRateRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? WeightedRiskBufferLiquidityRisk()
        {
            Decimal riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingLiquidityRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferLiquidityRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingLiquidityRisk()) * Convert.ToDecimal(CapitalRiskBufferLiquidityRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? WeightedRiskBufferOperationalRisk()
        {
            Decimal riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingOperationalRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferOperationalRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingOperationalRisk()) * Convert.ToDecimal(CapitalRiskBufferOperationalRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? WeightedRiskBufferComplianceRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingComplianceRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferComplianceRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingComplianceRisk()) * Convert.ToDecimal(CapitalRiskBufferComplianceRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? WeightedRiskBufferStrategicRisk()
        {
            Decimal riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingStrategicRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferStrategicRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingStrategicRisk()) * Convert.ToDecimal(CapitalRiskBufferStrategicRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? WeightedRiskBufferReputationRisk()
        {
            Decimal riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingReputationRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferReputationRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingReputationRisk()) * Convert.ToDecimal(CapitalRiskBufferReputationRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? TotalCompositeRiskScore()
        {
            Decimal totalCompositeScore = 0;
            try
            {
                var mul1 = Convert.ToDecimal(CompositeRiskScoreCreditRisk()) * Convert.ToDecimal(RiskWeightingCreditRisk());
                var mul2 = Convert.ToDecimal(CompositeRiskScoreInterestRateRisk()) * Convert.ToDecimal(RiskWeightingInterestRateRisk());
                var mul3 = Convert.ToDecimal(CompositeRiskScoreLiquidityRisk()) * Convert.ToDecimal(RiskWeightingLiquidityRisk());
                var mul4 = Convert.ToDecimal(CompositeRiskScoreOperationalRisk()) * Convert.ToDecimal(RiskWeightingOperationalRisk());
                var mul5 = Convert.ToDecimal(CompositeRiskScoreComplianceRisk()) * Convert.ToDecimal(RiskWeightingComplianceRisk());
                var mul6 = Convert.ToDecimal(CompositeRiskScoreStrategicRisk()) * Convert.ToDecimal(RiskWeightingStrategicRisk());
                var mul7 = Convert.ToDecimal(CompositeRiskScoreReputationRisk()) * Convert.ToDecimal(RiskWeightingReputationRisk());
                var sum = mul1 + mul2 + mul3 + mul4 + mul5 + mul6 + mul7;
                totalCompositeScore = Convert.ToDecimal(sum / TotalRiskWeighting());
            }
            catch (Exception ex)
            {
                var sum = Convert.ToInt32(CompositeRiskScoreCreditRisk()) +
                          Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) +
                          Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) +
                          Convert.ToInt32(CompositeRiskScoreOperationalRisk()) +
                          Convert.ToInt32(CompositeRiskScoreComplianceRisk()) +
                          Convert.ToInt32(CompositeRiskScoreStrategicRisk()) +
                          Convert.ToInt32(CompositeRiskScoreReputationRisk());
                totalCompositeScore = sum / 7;
            }

            return totalCompositeScore;
        }

        public static Decimal? TotalRiskWeighting()
        {
            var total = Convert.ToDecimal(RiskWeightingCreditRisk()) +
                        Convert.ToDecimal(RiskWeightingInterestRateRisk()) +
                        Convert.ToDecimal(RiskWeightingLiquidityRisk()) +
                        Convert.ToDecimal(RiskWeightingOperationalRisk()) +
                        Convert.ToDecimal(RiskWeightingComplianceRisk()) +
                        Convert.ToDecimal(RiskWeightingStrategicRisk()) +
                        Convert.ToDecimal(RiskWeightingReputationRisk());

            return total;
        }

        public static Decimal? TotalWeightedRiskBuffer()
        {
            var total = Convert.ToDecimal(WeightedRiskBufferCreditRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferInterestRateRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferLiquidityRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferOperationalRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferComplianceRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferStrategicRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferReputationRisk());

            return total;
        }

        public static Decimal? Tier1LeverageCapitalInterestRateRisk()
        {
            Decimal tier1capital = 0;
            if (WeightedRiskBufferInterestRateRisk() == null || WeightedRiskBufferInterestRateRisk() == 0)
            {
                tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalAssetsLeveragePurposes == null)
                {
                    tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferInterestRateRisk() / 100));
                }
                else
                {
                    tier1capital = Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferInterestRateRisk() / 100));
                }
            }

            return tier1capital;
        }

        public static Decimal? Tier1LeverageCapitalLiquidityRisk()
        {
            Decimal tier1capital = 0;
            if (WeightedRiskBufferLiquidityRisk() == null || WeightedRiskBufferLiquidityRisk() == 0)
            {
                tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalAssetsLeveragePurposes == null)
                {
                    tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferLiquidityRisk() / 100));
                }
                else
                {
                    tier1capital = Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferLiquidityRisk() / 100));
                }
            }

            return tier1capital;
        }

        public static Decimal? Tier1LeverageCapitalOperationalRisk()
        {
            Decimal tier1capital = 0;
            if (WeightedRiskBufferOperationalRisk() == null || WeightedRiskBufferOperationalRisk() == 0)
            {
                tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalAssetsLeveragePurposes == null)
                {
                    tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferOperationalRisk() / 100));
                }
                else
                {
                    tier1capital = Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferOperationalRisk() / 100));
                }
            }

            return tier1capital;
        }

        public static Decimal? Tier1LeverageCapitalComplianceRisk()
        {
            Decimal tier1capital = 0;
            if (WeightedRiskBufferComplianceRisk() == null || WeightedRiskBufferComplianceRisk() == 0)
            {
                tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalAssetsLeveragePurposes == null)
                {
                    tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferComplianceRisk() / 100));
                }
                else
                {
                    tier1capital = Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferComplianceRisk() / 100));
                }
            }

            return tier1capital;
        }

        public static Decimal? Tier1LeverageCapitalStrategicRisk()
        {
            Decimal tier1capital = 0;
            if (WeightedRiskBufferStrategicRisk() == null || WeightedRiskBufferStrategicRisk() == 0)
            {
                tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalAssetsLeveragePurposes == null)
                {
                    tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferStrategicRisk() / 100));
                }
                else
                {
                    tier1capital = Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferStrategicRisk() / 100));
                }
            }

            return tier1capital;
        }

        public static Decimal? Tier1LeverageCapitalReputationRisk()
        {
            Decimal tier1capital = 0;
            if (WeightedRiskBufferReputationRisk() == null || WeightedRiskBufferReputationRisk() == 0)
            {
                tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalAssetsLeveragePurposes == null)
                {
                    tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferReputationRisk() / 100));
                }
                else
                {
                    tier1capital = Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal((WeightedRiskBufferReputationRisk() / 100));
                }
            }

            return tier1capital;
        }

        public static Decimal? TotalTier1LeverageCapital()
        {
            Decimal totalTier1capital = 0;
            if (AdjustBankData.TotalAssetsLeveragePurposes == null)
            {
                totalTier1capital = Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal(TotalWeightedRiskBuffer() / 100);
            }
            else
            {
                totalTier1capital = Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal(TotalWeightedRiskBuffer() / 100);
            }

            return totalTier1capital;
        }

        public static Decimal? Cet1CapitalCreditRisk()
        {
            Decimal Cet1capital = 0;
            if (WeightedRiskBufferCreditRisk() == null || WeightedRiskBufferCreditRisk() == 0)
            {
                Cet1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Cet1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferCreditRisk() / 100));
                }
                else
                {
                    Cet1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferCreditRisk() / 100));
                }
            }

            return Cet1capital;
        }

        public static Decimal? Cet1CapitalInterestRateRisk()
        {
            Decimal Cet1capital = 0;
            if (WeightedRiskBufferInterestRateRisk() == null || WeightedRiskBufferInterestRateRisk() == 0)
            {
                Cet1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Cet1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferInterestRateRisk() / 100));
                }
                else
                {
                    Cet1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferInterestRateRisk() / 100));
                }
            }

            return Cet1capital;
        }

        public static Decimal? Cet1CapitalLiquidityRisk()
        {
            Decimal Cet1capital = 0;
            if (WeightedRiskBufferLiquidityRisk() == null || WeightedRiskBufferLiquidityRisk() == 0)
            {
                Cet1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Cet1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferLiquidityRisk() / 100));
                }
                else
                {
                    Cet1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferLiquidityRisk() / 100));
                }
            }

            return Cet1capital;
        }

        public static Decimal? Cet1CapitalOperationalRisk()
        {
            Decimal Cet1capital = 0;
            if (WeightedRiskBufferOperationalRisk() == null || WeightedRiskBufferOperationalRisk() == 0)
            {
                Cet1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Cet1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferOperationalRisk() / 100));
                }
                else
                {
                    Cet1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferOperationalRisk() / 100));
                }
            }

            return Cet1capital;
        }

        public static Decimal? Cet1CapitalComplianceRisk()
        {
            Decimal Cet1capital = 0;
            if (WeightedRiskBufferComplianceRisk() == null || WeightedRiskBufferComplianceRisk() == 0)
            {
                Cet1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Cet1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferComplianceRisk() / 100));
                }
                else
                {
                    Cet1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferComplianceRisk() / 100));
                }
            }

            return Cet1capital;
        }

        public static Decimal? Cet1CapitalStrategicRisk()
        {
            Decimal Cet1capital = 0;
            if (WeightedRiskBufferStrategicRisk() == null || WeightedRiskBufferStrategicRisk() == 0)
            {
                Cet1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Cet1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferStrategicRisk() / 100));
                }
                else
                {
                    Cet1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferStrategicRisk() / 100));
                }
            }

            return Cet1capital;
        }

        public static Decimal? Cet1CapitalReputationRisk()
        {
            Decimal Cet1capital = 0;
            if (WeightedRiskBufferReputationRisk() == null || WeightedRiskBufferReputationRisk() == 0)
            {
                Cet1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Cet1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferReputationRisk() / 100));
                }
                else
                {
                    Cet1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferReputationRisk() / 100));
                }
            }

            return Cet1capital;
        }

        public static Decimal? TotalCet1Capital()
        {
            Decimal totalTier1capital = 0;
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                totalTier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalWeightedRiskBuffer() / 100);
            }
            else
            {
                totalTier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalWeightedRiskBuffer() / 100);
            }

            return totalTier1capital;
        }

        public static Decimal? Tier1CapitalCreditRisk()
        {
            Decimal Tier1capital = 0;
            if (WeightedRiskBufferCreditRisk() == null || WeightedRiskBufferCreditRisk() == 0)
            {
                Tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferCreditRisk() / 100));
                }
                else
                {
                    Tier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferCreditRisk() / 100));
                }
            }

            return Tier1capital;
        }

        public static Decimal? Tier1CapitalInterestRateRisk()
        {
            Decimal Tier1capital = 0;
            if (WeightedRiskBufferInterestRateRisk() == null || WeightedRiskBufferInterestRateRisk() == 0)
            {
                Tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferInterestRateRisk() / 100));
                }
                else
                {
                    Tier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferInterestRateRisk() / 100));
                }
            }

            return Tier1capital;
        }

        public static Decimal? Tier1CapitalLiquidityRisk()
        {
            Decimal Tier1capital = 0;
            if (WeightedRiskBufferLiquidityRisk() == null || WeightedRiskBufferLiquidityRisk() == 0)
            {
                Tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferLiquidityRisk() / 100));
                }
                else
                {
                    Tier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferLiquidityRisk() / 100));
                }
            }

            return Tier1capital;
        }

        public static Decimal? Tier1CapitalOperationalRisk()
        {
            Decimal Tier1capital = 0;
            if (WeightedRiskBufferOperationalRisk() == null || WeightedRiskBufferOperationalRisk() == 0)
            {
                Tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferOperationalRisk() / 100));
                }
                else
                {
                    Tier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferOperationalRisk() / 100));
                }
            }

            return Tier1capital;
        }

        public static Decimal? Tier1CapitalComplianceRisk()
        {
            Decimal Tier1capital = 0;
            if (WeightedRiskBufferComplianceRisk() == null || WeightedRiskBufferComplianceRisk() == 0)
            {
                Tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferComplianceRisk() / 100));
                }
                else
                {
                    Tier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferComplianceRisk() / 100));
                }
            }

            return Tier1capital;
        }

        public static Decimal? Tier1CapitalStrategicRisk()
        {
            Decimal Tier1capital = 0;
            if (WeightedRiskBufferStrategicRisk() == null || WeightedRiskBufferStrategicRisk() == 0)
            {
                Tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferStrategicRisk() / 100));
                }
                else
                {
                    Tier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferStrategicRisk() / 100));
                }
            }

            return Tier1capital;
        }

        public static Decimal? Tier1CapitalReputationRisk()
        {
            Decimal Tier1capital = 0;
            if (WeightedRiskBufferReputationRisk() == null || WeightedRiskBufferReputationRisk() == 0)
            {
                Tier1capital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Tier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferReputationRisk() / 100));
                }
                else
                {
                    Tier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferReputationRisk() / 100));
                }
            }

            return Tier1capital;
        }

        public static Decimal? TotalTier1Capital()
        {
            Decimal totalTier1capital = 0;
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                totalTier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalWeightedRiskBuffer() / 100);
            }
            else
            {
                totalTier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalWeightedRiskBuffer() / 100);
            }

            return totalTier1capital;
        }

        public static Decimal? TotalCapitalCreditRisk()
        {
            Decimal Totalcapital = 0;
            if (WeightedRiskBufferCreditRisk() == null || WeightedRiskBufferCreditRisk() == 0)
            {
                Totalcapital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Totalcapital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferCreditRisk() / 100));
                }
                else
                {
                    Totalcapital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferCreditRisk() / 100));
                }
            }

            return Totalcapital;
        }

        public static Decimal? TotalCapitalInterestRateRisk()
        {
            Decimal Totalcapital = 0;
            if (WeightedRiskBufferInterestRateRisk() == null || WeightedRiskBufferInterestRateRisk() == 0)
            {
                Totalcapital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Totalcapital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferInterestRateRisk() / 100));
                }
                else
                {
                    Totalcapital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferInterestRateRisk() / 100));
                }
            }

            return Totalcapital;
        }

        public static Decimal? TotalCapitalLiquidityRisk()
        {
            Decimal Totalcapital = 0;
            if (WeightedRiskBufferLiquidityRisk() == null || WeightedRiskBufferLiquidityRisk() == 0)
            {
                Totalcapital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Totalcapital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferLiquidityRisk() / 100));
                }
                else
                {
                    Totalcapital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferLiquidityRisk() / 100));
                }
            }

            return Totalcapital;
        }

        public static Decimal? TotalCapitalOperationalRisk()
        {
            Decimal Totalcapital = 0;
            if (WeightedRiskBufferOperationalRisk() == null || WeightedRiskBufferOperationalRisk() == 0)
            {
                Totalcapital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Totalcapital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferOperationalRisk() / 100));
                }
                else
                {
                    Totalcapital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferOperationalRisk() / 100));
                }
            }

            return Totalcapital;
        }

        public static Decimal? TotalCapitalComplianceRisk()
        {
            Decimal Totalcapital = 0;
            if (WeightedRiskBufferComplianceRisk() == null || WeightedRiskBufferComplianceRisk() == 0)
            {
                Totalcapital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Totalcapital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferComplianceRisk() / 100));
                }
                else
                {
                    Totalcapital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferComplianceRisk() / 100));
                }
            }

            return Totalcapital;
        }

        public static Decimal? TotalCapitalStrategicRisk()
        {
            Decimal Totalcapital = 0;
            if (WeightedRiskBufferStrategicRisk() == null || WeightedRiskBufferStrategicRisk() == 0)
            {
                Totalcapital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Totalcapital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferStrategicRisk() / 100));
                }
                else
                {
                    Totalcapital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferStrategicRisk() / 100));
                }
            }

            return Totalcapital;
        }

        public static Decimal? TotalCapitalReputationRisk()
        {
            Decimal Totalcapital = 0;
            if (WeightedRiskBufferReputationRisk() == null || WeightedRiskBufferReputationRisk() == 0)
            {
                Totalcapital = 0;
            }
            else
            {
                if (AdjustBankData.TotalRiskWeightedAssets == null)
                {
                    Totalcapital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferReputationRisk() / 100));
                }
                else
                {
                    Totalcapital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal((WeightedRiskBufferReputationRisk() / 100));
                }
            }

            return Totalcapital;
        }

        public static Decimal? TotalTotalCapital()
        {
            Decimal TotalTier1capital = 0;
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                TotalTier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalWeightedRiskBuffer() / 100);
            }
            else
            {
                TotalTier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalWeightedRiskBuffer() / 100);
            }

            return TotalTier1capital;
        }

        public static Decimal? LeverRegulatoryMinimumWeightedRiskBuffer()
        {
            return 5;
        }

        public static Decimal? LeverImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(TotalWeightedRiskBuffer()) + LeverRegulatoryMinimumWeightedRiskBuffer();
        }

        public static Decimal? LeverBanksMinimumWeightedRiskBuffer()
        {
            if (AdjustBankData.Tier1LeverageRatio == null)
                return LeverBanksMinimumPolicy();
            else
                return AdjustBankData.Tier1LeverageRatio;
        }

        public static Decimal? LeverBanksMinimumLessImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(LeverBanksMinimumWeightedRiskBuffer()) - Convert.ToDecimal(LeverImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? LeverBanksTier1LeverageRatioWeightedRiskBuffer()
        {
            if (SelectedBankVitals.Tier1Capital == null)
                return SelectedBankVitals.Tier1LeverageRatio;
            else
                return (Convert.ToDecimal(SelectedBankVitals.Tier1Capital) / Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes)) * 100;
        }

        public static Decimal? LeverRiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer()
        {
            return Convert.ToDecimal(LeverBanksTier1LeverageRatioWeightedRiskBuffer()) - Convert.ToDecimal(LeverImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? LeverBufferImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(LeverImpliedMinimumWeightedRiskBuffer()) - LeverRegulatoryMinimumWeightedRiskBuffer();
        }

        public static Decimal? LeverBufferBanksMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(LeverBanksMinimumWeightedRiskBuffer()) - Convert.ToDecimal(LeverImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? LeverTier1LeverageLessBanksMinimumWeightedRiskBuffer()
        {
            return LeverBanksTier1LeverageRatioWeightedRiskBuffer() - LeverBanksMinimumWeightedRiskBuffer();
        }

        public static Decimal? LeverActualTier1LeverageRatioWeightedRiskBuffer()
        {
            return Convert.ToDecimal(LeverRegulatoryMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(LeverBufferImpliedMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(LeverBufferBanksMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(LeverTier1LeverageLessBanksMinimumWeightedRiskBuffer());
        }

        public static Decimal? LeverRegulatoryMinimumCapital()
        {
            if (AdjustBankData.TotalAssetsLeveragePurposes == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverRegulatoryMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverRegulatoryMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? LeverImpliedMinimumCapital()
        {
            if (AdjustBankData.TotalAssetsLeveragePurposes == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverImpliedMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverImpliedMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? LeverBanksMinimumCapital()
        {
            if (AdjustBankData.TotalAssetsLeveragePurposes == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverBanksMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverBanksMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? LeverBanksMinimumLessImpliedMinimumCapital()
        {
            if (AdjustBankData.TotalAssetsLeveragePurposes == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverBanksMinimumLessImpliedMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverBanksMinimumLessImpliedMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? LeverBanksTier1LeverageRatioCapital()
        {
            if (AdjustBankData.TotalAssetsLeveragePurposes == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverBanksTier1LeverageRatioWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverBanksTier1LeverageRatioWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? LeverRiskAssessBufferTier1LeverageLessImpliedMinCapital()
        {
            if (AdjustBankData.TotalAssetsLeveragePurposes == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverRiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalAssetsLeveragePurposes) * Convert.ToDecimal(LeverRiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? LeverBufferImpliedMinimumCapital()
        {
            return Convert.ToDecimal(LeverImpliedMinimumCapital()) - LeverRegulatoryMinimumCapital();
        }

        public static Decimal? LeverBufferBanksMinimumCapital()
        {
            return Convert.ToDecimal(LeverBanksMinimumCapital()) - Convert.ToDecimal(LeverImpliedMinimumCapital());
        }

        public static Decimal? LeverTier1LeverageLessBanksMinimumCapital()
        {
            return LeverBanksTier1LeverageRatioCapital() - LeverBanksMinimumCapital();
        }

        public static Decimal? LeverActualTier1LeverageRatioCapital()
        {
            return Convert.ToDecimal(LeverRegulatoryMinimumCapital()) +
                Convert.ToDecimal(LeverBufferImpliedMinimumCapital()) +
                Convert.ToDecimal(LeverBufferBanksMinimumCapital()) +
                Convert.ToDecimal(LeverTier1LeverageLessBanksMinimumCapital());
        }

        public static Decimal? CETRegulatoryMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(6.5);
        }

        public static Decimal? CETImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(TotalWeightedRiskBuffer()) + CETRegulatoryMinimumWeightedRiskBuffer();
        }

        public static Decimal? CETBanksMinimumWeightedRiskBuffer()
        {
            if (AdjustBankData.CET1CapitalRatio == null)
                return CETBanksMinimumPolicy();
            else
                return AdjustBankData.CET1CapitalRatio;
        }

        public static Decimal? CETBanksMinimumLessImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(CETBanksMinimumWeightedRiskBuffer()) - Convert.ToDecimal(CETImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? CETBanksCet1CapitalRatioWeightedRiskBuffer()
        {
            if (SelectedBankVitals.Tier1Capital == null)
                return SelectedBankVitals.CET1CapitalRatio;
            else
                return (Convert.ToDecimal(SelectedBankVitals.CommonEquityTier1Capital) / Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets)) * 100;
        }

        public static Decimal? CETRiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer()
        {
            return Convert.ToDecimal(CETBanksCet1CapitalRatioWeightedRiskBuffer()) - Convert.ToDecimal(CETImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? CETBufferImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(CETImpliedMinimumWeightedRiskBuffer()) - CETRegulatoryMinimumWeightedRiskBuffer();
        }

        public static Decimal? CETBufferBanksMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(CETBanksMinimumWeightedRiskBuffer()) - Convert.ToDecimal(CETImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? CETCet1CapitalLessBanksMinimumWeightedRiskBuffer()
        {
            return CETBanksCet1CapitalRatioWeightedRiskBuffer() - CETBanksMinimumWeightedRiskBuffer();
        }

        public static Decimal? CETActualCet1CapitalRatioWeightedRiskBuffer()
        {
            return Convert.ToDecimal(CETRegulatoryMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(CETBufferImpliedMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(CETBufferBanksMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(CETCet1CapitalLessBanksMinimumWeightedRiskBuffer());
        }

        public static Decimal? CETRegulatoryMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null || AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(CETRegulatoryMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(CETRegulatoryMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? CETImpliedMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(CETImpliedMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(CETImpliedMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? CETBanksMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(CETBanksMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(CETBanksMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? CETBanksMinimumLessImpliedMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(CETBanksMinimumLessImpliedMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(CETBanksMinimumLessImpliedMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? CETBanksCet1CapitalRatioCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(CETBanksCet1CapitalRatioWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(CETBanksCet1CapitalRatioWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? CETRiskAssessBufferCet1CapitalLessImpliedMinCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(CETRiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(CETRiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? CETBufferImpliedMinimumCapital()
        {
            return Convert.ToDecimal(CETImpliedMinimumCapital()) - CETRegulatoryMinimumCapital();
        }

        public static Decimal? CETBufferBanksMinimumCapital()
        {
            return Convert.ToDecimal(CETBanksMinimumCapital()) - Convert.ToDecimal(CETImpliedMinimumCapital());
        }

        public static Decimal? CETCet1CapitalLessBanksMinimumCapital()
        {
            return CETBanksCet1CapitalRatioCapital() - CETBanksMinimumCapital();
        }

        public static Decimal? CETActualCet1CapitalRatioCapital()
        {
            return Convert.ToDecimal(CETRegulatoryMinimumCapital()) +
                Convert.ToDecimal(CETBufferImpliedMinimumCapital()) +
                Convert.ToDecimal(CETBufferBanksMinimumCapital()) +
                Convert.ToDecimal(CETCet1CapitalLessBanksMinimumCapital());
        }

        public static Decimal? Tier1RegulatoryMinimumWeightedRiskBuffer()
        {
            return 8;
        }

        public static Decimal? Tier1ImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(TotalWeightedRiskBuffer()) + Tier1RegulatoryMinimumWeightedRiskBuffer();
        }

        public static Decimal? Tier1BanksMinimumWeightedRiskBuffer()
        {
            if (AdjustBankData.Tier1CapitalRatio == null)
                return Tier1BanksMinimumPolicy();
            else
                return AdjustBankData.Tier1CapitalRatio;
        }

        public static Decimal? Tier1BanksMinimumLessImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(Tier1BanksMinimumWeightedRiskBuffer()) - Convert.ToDecimal(Tier1ImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? Tier1BanksTier1CapitalRatioWeightedRiskBuffer()
        {
            if (SelectedBankVitals.Tier1Capital == null)
                return SelectedBankVitals.Tier1CapitalRatio;
            else
                return (Convert.ToDecimal(SelectedBankVitals.Tier1Capital) / Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets)) * 100;
        }

        public static Decimal? Tier1RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer()
        {
            return Tier1BanksTier1CapitalRatioWeightedRiskBuffer() - Tier1ImpliedMinimumWeightedRiskBuffer();
        }

        public static Decimal? Tier1BufferImpliedMinimumWeightedRiskBuffer()
        {
            return Tier1ImpliedMinimumWeightedRiskBuffer() - Tier1RegulatoryMinimumWeightedRiskBuffer();
        }

        public static Decimal? Tier1BufferBanksMinimumWeightedRiskBuffer()
        {
            return Tier1BanksMinimumWeightedRiskBuffer() - Tier1ImpliedMinimumWeightedRiskBuffer();
        }

        public static Decimal? Tier1Tier1CapitalLessBanksMinimumWeightedRiskBuffer()
        {
            return Tier1BanksTier1CapitalRatioWeightedRiskBuffer() - Tier1BanksMinimumWeightedRiskBuffer();
        }

        public static Decimal? Tier1ActualTier1CapitalRatio()
        {
            return Convert.ToDecimal(Tier1RegulatoryMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(Tier1BufferImpliedMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(Tier1BufferBanksMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(Tier1Tier1CapitalLessBanksMinimumWeightedRiskBuffer());
        }

        public static Decimal? Tier1RegulatoryMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1RegulatoryMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1RegulatoryMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? Tier1ImpliedMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1ImpliedMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1ImpliedMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? Tier1BanksMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1BanksMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1BanksMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? Tier1BanksMinimumLessImpliedMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1BanksMinimumLessImpliedMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1BanksMinimumLessImpliedMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? Tier1BanksTier1CapitalRatioCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1BanksTier1CapitalRatioWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1BanksTier1CapitalRatioWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? Tier1RiskAssessBufferTier1CapitalLessImpliedMinCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(Tier1RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? Tier1BufferImpliedMinimumCapital()
        {
            return Convert.ToDecimal(Tier1ImpliedMinimumCapital()) - Tier1RegulatoryMinimumCapital();
        }

        public static Decimal? Tier1BufferBanksMinimumCapital()
        {
            return Convert.ToDecimal(Tier1BanksMinimumCapital()) - Convert.ToDecimal(Tier1ImpliedMinimumCapital());
        }

        public static Decimal? Tier1Tier1CapitalLessBanksMinimumCapital()
        {
            return Tier1BanksTier1CapitalRatioCapital() - Tier1BanksMinimumCapital();
        }

        public static Decimal? Tier1ActualTier1CapitalRatioCapital()
        {
            return Convert.ToDecimal(Tier1RegulatoryMinimumCapital()) +
                Convert.ToDecimal(Tier1BufferImpliedMinimumCapital()) +
                Convert.ToDecimal(Tier1BufferBanksMinimumCapital()) +
                Convert.ToDecimal(Tier1Tier1CapitalLessBanksMinimumCapital());
        }

        public static Decimal? TotalRegulatoryMinimumWeightedRiskBuffer()
        {
            return 10;
        }

        public static Decimal? TotalImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(TotalWeightedRiskBuffer()) + TotalRegulatoryMinimumWeightedRiskBuffer();
        }

        public static Decimal? TotalBanksMinimumWeightedRiskBuffer()
        {
            if (AdjustBankData.TotalCapitalRatio == null || AdjustBankData.TotalCapitalRatio == null)
                return Convert.ToDecimal(TotalBanksMinimumPolicy());
            else
                return AdjustBankData.TotalCapitalRatio;
        }

        public static Decimal? TotalBanksMinimumLessImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(TotalBanksMinimumWeightedRiskBuffer()) - Convert.ToDecimal(TotalImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? TotalBanksTotalCapitalRatioWeightedRiskBuffer()
        {
            if (SelectedBankVitals.TotalCapital == null)
                return SelectedBankVitals.TotalCapitalRatio;
            else
                return (Convert.ToDecimal(SelectedBankVitals.TotalCapital) / Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets)) * 100;
        }

        public static Decimal? TotalRiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer()
        {
            return Convert.ToDecimal(TotalBanksTotalCapitalRatioWeightedRiskBuffer()) - Convert.ToDecimal(TotalImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? TotalBufferImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(TotalImpliedMinimumWeightedRiskBuffer()) - TotalRegulatoryMinimumWeightedRiskBuffer();
        }

        public static Decimal? TotalBufferBanksMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(TotalBanksMinimumWeightedRiskBuffer()) - Convert.ToDecimal(TotalImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? TotalTotalCapitalLessBanksMinimumWeightedRiskBuffer()
        {
            return TotalBanksTotalCapitalRatioWeightedRiskBuffer() - TotalBanksMinimumWeightedRiskBuffer();
        }

        public static Decimal? TotalActualTotalCapitalRatioWeightedRiskBuffer()
        {
            return Convert.ToDecimal(TotalRegulatoryMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(TotalBufferImpliedMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(TotalBufferBanksMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(TotalTotalCapitalLessBanksMinimumWeightedRiskBuffer());
        }

        public static Decimal? TotalRegulatoryMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalRegulatoryMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalRegulatoryMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? TotalImpliedMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalImpliedMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalImpliedMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? TotalBanksMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalBanksMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalBanksMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? TotalBanksMinimumLessImpliedMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalBanksMinimumLessImpliedMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalBanksMinimumLessImpliedMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? TotalBanksTotalCapitalRatioCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalBanksTotalCapitalRatioWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalBanksTotalCapitalRatioWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? TotalRiskAssessBufferTotalCapitalLessImpliedMinCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalRiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalRiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? TotalBufferImpliedMinimumCapital()
        {
            return Convert.ToDecimal(TotalImpliedMinimumCapital()) - TotalRegulatoryMinimumCapital();
        }

        public static Decimal? TotalBufferBanksMinimumCapital()
        {
            return Convert.ToDecimal(TotalBanksMinimumCapital()) - Convert.ToDecimal(TotalImpliedMinimumCapital());
        }

        public static Decimal? TotalTotalCapitalLessBanksMinimumCapital()
        {
            return TotalBanksTotalCapitalRatioCapital() - TotalBanksMinimumCapital();
        }

        public static Decimal? TotalActualTotalCapitalRatioCapital()
        {
            return Convert.ToDecimal(TotalRegulatoryMinimumCapital()) +
                Convert.ToDecimal(TotalBufferImpliedMinimumCapital()) +
                Convert.ToDecimal(TotalBufferBanksMinimumCapital()) +
                Convert.ToDecimal(TotalTotalCapitalLessBanksMinimumCapital());
        }

    }
}
