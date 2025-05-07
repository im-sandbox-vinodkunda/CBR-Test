using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.WebCommons
{
    public class CramCalculationsTier1
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
                CramCalculationsTier1.adjustBankData = value;
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
                CramCalculationsTier1.riskCategoriesAndWeights = value;
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
                CramCalculationsTier1.riskRating = value;
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
                CramCalculationsTier1.defaultRiskRating = value;
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
                CramCalculationsTier1.cramDashboardConcepts = value;
            }
        }
        public static Decimal? BanksMinimumPolicy()
        {
            if (AdjustBankData.Tier1CapitalRatio == null)
                return 9;
            else
                return AdjustBankData.Tier1CapitalRatio;
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

        //public static Decimal? GetRatingColorClass (rating)
        //    {
        //        Decimal? ratingclass = "";

        //        if (rating == "Low")
        //            ratingclass = "green-color";
        //        else if (rating == "Low-Moderate")
        //            ratingclass = "light-green-color";
        //        else if (rating == "Moderate")
        //            ratingclass = "yellow-color";
        //        else if (rating == "Moderate-High")
        //            ratingclass = "orange-color";
        //        else if (rating == "High")
        //            ratingclass = "red-color";
        //        else
        //            ratingclass = "grey-color";

        //        return ratingclass;
        //    }
        public static Decimal? countblank()
        {
            Decimal count = 0;
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
        public static string RiskRatingCreditRisk()
        {
            string rating = "";

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
            string rating = "";

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
            string rating = "";

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
            string rating = "";

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
            string rating = "";

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
            string rating = "";

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
            string rating = "";

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
                    riskBuffer = RiskRating.Low;
                }
                else
                {
                    riskBuffer = DefaultRatings.Low;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = RiskRating.LowModerate;
                }
                else
                {
                    riskBuffer = DefaultRatings.LowModerate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = RiskRating.Moderate;
                }
                else
                {
                    riskBuffer = DefaultRatings.Moderate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = RiskRating.ModerateHigh;
                }
                else
                {
                    riskBuffer = DefaultRatings.ModerateHigh;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreCreditRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = RiskRating.High;
                }
                else
                {
                    riskBuffer = DefaultRatings.High;
                }
            }

            return riskBuffer;
        }

        public static Decimal? CapitalRiskBufferInterestRateRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = RiskRating.Low;
                }
                else
                {
                    riskBuffer = DefaultRatings.Low;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = RiskRating.LowModerate;
                }
                else
                {
                    riskBuffer = DefaultRatings.LowModerate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = RiskRating.Moderate;
                }
                else
                {
                    riskBuffer = DefaultRatings.Moderate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = RiskRating.ModerateHigh;
                }
                else
                {
                    riskBuffer = DefaultRatings.ModerateHigh;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreInterestRateRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = RiskRating.High;
                }
                else
                {
                    riskBuffer = DefaultRatings.High;
                }
            }

            return riskBuffer;
        }

        public static Decimal? CapitalRiskBufferLiquidityRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = RiskRating.Low;
                }
                else
                {
                    riskBuffer = DefaultRatings.Low;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = RiskRating.LowModerate;
                }
                else
                {
                    riskBuffer = DefaultRatings.LowModerate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = RiskRating.Moderate;
                }
                else
                {
                    riskBuffer = DefaultRatings.Moderate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = RiskRating.ModerateHigh;
                }
                else
                {
                    riskBuffer = DefaultRatings.ModerateHigh;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreLiquidityRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = RiskRating.High;
                }
                else
                {
                    riskBuffer = DefaultRatings.High;
                }
            }

            return riskBuffer;
        }

        public static Decimal? CapitalRiskBufferOperationalRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = RiskRating.Low;
                }
                else
                {
                    riskBuffer = DefaultRatings.Low;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = RiskRating.LowModerate;
                }
                else
                {
                    riskBuffer = DefaultRatings.LowModerate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = RiskRating.Moderate;
                }
                else
                {
                    riskBuffer = DefaultRatings.Moderate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = RiskRating.ModerateHigh;
                }
                else
                {
                    riskBuffer = DefaultRatings.ModerateHigh;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreOperationalRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = RiskRating.High;
                }
                else
                {
                    riskBuffer = DefaultRatings.High;
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
                    riskBuffer = RiskRating.Low;
                }
                else
                {
                    riskBuffer = DefaultRatings.Low;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = RiskRating.LowModerate;
                }
                else
                {
                    riskBuffer = DefaultRatings.LowModerate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = RiskRating.Moderate;
                }
                else
                {
                    riskBuffer = DefaultRatings.Moderate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = RiskRating.ModerateHigh;
                }
                else
                {
                    riskBuffer = DefaultRatings.ModerateHigh;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreComplianceRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = RiskRating.High;
                }
                else
                {
                    riskBuffer = DefaultRatings.High;
                }
            }

            return riskBuffer;
        }

        public static Decimal? CapitalRiskBufferStrategicRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = RiskRating.Low;
                }
                else
                {
                    riskBuffer = DefaultRatings.Low;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = RiskRating.LowModerate;
                }
                else
                {
                    riskBuffer = DefaultRatings.LowModerate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = RiskRating.Moderate;
                }
                else
                {
                    riskBuffer = DefaultRatings.Moderate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = RiskRating.ModerateHigh;
                }
                else
                {
                    riskBuffer = DefaultRatings.ModerateHigh;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreStrategicRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = RiskRating.High;
                }
                else
                {
                    riskBuffer = DefaultRatings.High;
                }
            }

            return riskBuffer;
        }

        public static Decimal? CapitalRiskBufferReputationRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 1)
            {
                if (RiskRating.Low != null)
                {
                    riskBuffer = RiskRating.Low;
                }
                else
                {
                    riskBuffer = DefaultRatings.Low;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 2)
            {
                if (RiskRating.LowModerate != null)
                {
                    riskBuffer = RiskRating.LowModerate;
                }
                else
                {
                    riskBuffer = DefaultRatings.LowModerate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 3)
            {
                if (RiskRating.Moderate != null)
                {
                    riskBuffer = RiskRating.Moderate;
                }
                else
                {
                    riskBuffer = DefaultRatings.Moderate;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 4)
            {
                if (RiskRating.ModerateHigh != null)
                {
                    riskBuffer = RiskRating.ModerateHigh;
                }
                else
                {
                    riskBuffer = DefaultRatings.ModerateHigh;
                }
            }
            else if (Convert.ToInt32(CompositeRiskScoreReputationRisk()) == 5)
            {
                if (RiskRating.High != null)
                {
                    riskBuffer = RiskRating.High;
                }
                else
                {
                    riskBuffer = DefaultRatings.High;
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
            Decimal? riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingInterestRateRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferInterestRateRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingInterestRateRisk()) * Convert.ToDecimal(CapitalRiskBufferInterestRateRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? WeightedRiskBufferLiquidityRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingLiquidityRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferLiquidityRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingLiquidityRisk()) * Convert.ToDecimal(CapitalRiskBufferLiquidityRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? WeightedRiskBufferOperationalRisk()
        {
            Decimal? riskBuffer = 0;

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
            Decimal? riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingStrategicRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferStrategicRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingStrategicRisk()) * Convert.ToDecimal(CapitalRiskBufferStrategicRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? WeightedRiskBufferReputationRisk()
        {
            Decimal? riskBuffer = 0;

            if (Convert.ToDecimal(RiskWeightingReputationRisk()) > 0 && Convert.ToDecimal(CapitalRiskBufferReputationRisk()) > 0)
            {
                riskBuffer = Convert.ToDecimal(RiskWeightingReputationRisk()) * Convert.ToDecimal(CapitalRiskBufferReputationRisk());
                riskBuffer = riskBuffer / 100;
            }

            return riskBuffer;
        }

        public static Decimal? Tier1CapitalCreditRisk()
        {
            Decimal? Tier1capital = 0;
            if (WeightedRiskBufferCreditRisk() == 0)
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
            Decimal? Tier1capital = 0;
            if (WeightedRiskBufferInterestRateRisk() == 0)
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
            Decimal? Tier1capital = 0;
            if (WeightedRiskBufferLiquidityRisk() == 0)
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
            Decimal? Tier1capital = 0;
            if (WeightedRiskBufferOperationalRisk() == 0)
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
            Decimal? Tier1capital = 0;
            if (WeightedRiskBufferComplianceRisk() == 0)
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
            Decimal? Tier1capital = 0;
            if (WeightedRiskBufferStrategicRisk() == 0)
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
            Decimal? Tier1capital = 0;
            if (WeightedRiskBufferReputationRisk() == 0)
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

        public static Decimal? TotalCompositeRiskScore()
        {
            Decimal? totalCompositeScore = 0;
            try
            {
                Decimal? mul1 = Convert.ToDecimal(CompositeRiskScoreCreditRisk()) * Convert.ToDecimal(RiskWeightingCreditRisk());
                Decimal? mul2 = Convert.ToDecimal(CompositeRiskScoreInterestRateRisk()) * Convert.ToDecimal(RiskWeightingInterestRateRisk());
                Decimal? mul3 = Convert.ToDecimal(CompositeRiskScoreLiquidityRisk()) * Convert.ToDecimal(RiskWeightingLiquidityRisk());
                Decimal? mul4 = Convert.ToDecimal(CompositeRiskScoreOperationalRisk()) * Convert.ToDecimal(RiskWeightingOperationalRisk());
                Decimal? mul5 = Convert.ToDecimal(CompositeRiskScoreComplianceRisk()) * Convert.ToDecimal(RiskWeightingComplianceRisk());
                Decimal? mul6 = Convert.ToDecimal(CompositeRiskScoreStrategicRisk()) * Convert.ToDecimal(RiskWeightingStrategicRisk());
                Decimal? mul7 = Convert.ToDecimal(CompositeRiskScoreReputationRisk()) * Convert.ToDecimal(RiskWeightingReputationRisk());
                Decimal? sum = mul1 + mul2 + mul3 + mul4 + mul5 + mul6 + mul7;
                totalCompositeScore = sum / TotalRiskWeighting();
            }
            catch (Exception ex)
            {
                Decimal? sum = Convert.ToInt32(CompositeRiskScoreCreditRisk()) +
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
            Decimal? total = Convert.ToDecimal(RiskWeightingCreditRisk()) +
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
            Decimal? total = Convert.ToDecimal(WeightedRiskBufferCreditRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferInterestRateRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferLiquidityRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferOperationalRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferComplianceRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferStrategicRisk()) +
                        Convert.ToDecimal(WeightedRiskBufferReputationRisk());

            return total;
        }

        public static Decimal? TotalTier1Capital()
        {
            Decimal? totaltier1capital = 0;
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                totaltier1capital = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalWeightedRiskBuffer() / 100);
            }
            else
            {
                totaltier1capital = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(TotalWeightedRiskBuffer() / 100);
            }

            return totaltier1capital;
        }

        public static Decimal? LowCreditRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingCreditRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingCreditRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }

            return risk;
        }

        public static Decimal? LowInterestRateRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingInterestRateRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingInterestRateRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }

            return risk;
        }

        public static Decimal? LowLiquidityRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingLiquidityRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingLiquidityRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }

            return risk;
        }

        public static Decimal? LowOperationalRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingOperationalRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingOperationalRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }

            return risk;
        }

        public static Decimal? LowComplianceRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingComplianceRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingComplianceRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }

            return risk;
        }

        public static Decimal? LowStrategicRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingStrategicRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingStrategicRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }

            return risk;
        }

        public static Decimal? LowReputationRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingReputationRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingReputationRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }

            return risk;
        }

        public static Decimal? LowModerateCreditRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingCreditRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingCreditRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }

            return risk;
        }

        public static Decimal? LowModerateInterestRateRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingInterestRateRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingInterestRateRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }

            return risk;
        }

        public static Decimal? LowModerateLiquidityRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingLiquidityRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingLiquidityRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }

            return risk;
        }

        public static Decimal? LowModerateOperationalRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingOperationalRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingOperationalRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }

            return risk;
        }

        public static Decimal? LowModerateComplianceRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingComplianceRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingComplianceRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }

            return risk;
        }

        public static Decimal? LowModerateStrategicRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingStrategicRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingStrategicRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }

            return risk;
        }

        public static Decimal? LowModerateReputationRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingReputationRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingReputationRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateCreditRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingCreditRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingCreditRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateInterestRateRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingInterestRateRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingInterestRateRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateLiquidityRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingLiquidityRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingLiquidityRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateOperationalRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingOperationalRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingOperationalRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateComplianceRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingComplianceRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingComplianceRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateStrategicRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingStrategicRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingStrategicRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateReputationRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingReputationRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingReputationRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateHighCreditRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingCreditRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingCreditRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateHighInterestRateRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingInterestRateRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingInterestRateRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateHighLiquidityRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingLiquidityRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingLiquidityRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateHighOperationalRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingOperationalRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingOperationalRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateHighComplianceRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingComplianceRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingComplianceRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateHighStrategicRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingStrategicRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingStrategicRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateHighReputationRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingReputationRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingReputationRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }

            return risk;
        }

        public static Decimal? HighCreditRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingCreditRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingCreditRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }

            return risk;
        }

        public static Decimal? HighInterestRateRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingInterestRateRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingInterestRateRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }

            return risk;
        }

        public static Decimal? HighLiquidityRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingLiquidityRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingLiquidityRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }

            return risk;
        }

        public static Decimal? HighOperationalRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingOperationalRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingOperationalRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }

            return risk;
        }

        public static Decimal? HighComplianceRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingComplianceRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingComplianceRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }

            return risk;
        }

        public static Decimal? HighStrategicRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingStrategicRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingStrategicRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }

            return risk;
        }

        public static Decimal? HighReputationRisk()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingReputationRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(RiskWeightingReputationRisk()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }

            return risk;
        }

        public static Decimal? LowTotal()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(TotalRiskWeighting()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(TotalRiskWeighting()) / 100) * (Convert.ToDecimal(DefaultRatings.Low) / 100));
            }

            return risk;
        }

        public static Decimal? LowModerateTotal()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(TotalRiskWeighting()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(TotalRiskWeighting()) / 100) * (Convert.ToDecimal(DefaultRatings.LowModerate) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateTotal()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(TotalRiskWeighting()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(TotalRiskWeighting()) / 100) * (Convert.ToDecimal(DefaultRatings.Moderate) / 100));
            }

            return risk;
        }

        public static Decimal? ModerateHighTotal()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(TotalRiskWeighting()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(TotalRiskWeighting()) / 100) * (Convert.ToDecimal(DefaultRatings.ModerateHigh) / 100));
            }

            return risk;
        }

        public static Decimal? HighTotal()
        {
            Decimal? risk = 0;

            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                risk = Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * ((Convert.ToDecimal(TotalRiskWeighting()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }
            else
            {
                risk = Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * ((Convert.ToDecimal(TotalRiskWeighting()) / 100) * (Convert.ToDecimal(DefaultRatings.High) / 100));
            }

            return risk;
        }

        public static Decimal? RegulatoryMinimumWeightedRiskBuffer()
        {
            return 8;
        }

        public static Decimal? ImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(TotalWeightedRiskBuffer()) + RegulatoryMinimumWeightedRiskBuffer();
        }

        public static Decimal? BanksMinimumWeightedRiskBuffer()
        {
            if (AdjustBankData.Tier1CapitalRatio == null)
                return BanksMinimumPolicy();
            else
                return AdjustBankData.Tier1CapitalRatio;
        }

        public static Decimal? BanksMinimumLessImpliedMinimumWeightedRiskBuffer()
        {
            return Convert.ToDecimal(BanksMinimumWeightedRiskBuffer()) - Convert.ToDecimal(ImpliedMinimumWeightedRiskBuffer());
        }

        public static Decimal? BanksTier1CapitalRatioWeightedRiskBuffer()
        {
            if (SelectedBankVitals.Tier1Capital == null)
                return SelectedBankVitals.Tier1CapitalRatio;
            else
                return (Convert.ToDecimal(SelectedBankVitals.Tier1Capital) / Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets)) * 100;
        }

        public static Decimal? RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer()
        {
            return BanksTier1CapitalRatioWeightedRiskBuffer() - ImpliedMinimumWeightedRiskBuffer();
        }

        public static Decimal? BufferImpliedMinimumWeightedRiskBuffer()
        {
            return ImpliedMinimumWeightedRiskBuffer() - RegulatoryMinimumWeightedRiskBuffer();
        }

        public static Decimal? BufferBanksMinimumWeightedRiskBuffer()
        {
            return BanksMinimumWeightedRiskBuffer() - ImpliedMinimumWeightedRiskBuffer();
        }

        public static Decimal? Tier1CapitalLessBanksMinimumWeightedRiskBuffer()
        {
            return BanksTier1CapitalRatioWeightedRiskBuffer() - BanksMinimumWeightedRiskBuffer();
        }

        public static Decimal? ActualTier1CapitalRatio()
        {
            return Convert.ToDecimal(RegulatoryMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(BufferImpliedMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(BufferBanksMinimumWeightedRiskBuffer()) +
                Convert.ToDecimal(Tier1CapitalLessBanksMinimumWeightedRiskBuffer());
        }

        public static Decimal? RegulatoryMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(RegulatoryMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(RegulatoryMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? ImpliedMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(ImpliedMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(ImpliedMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? BanksMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(BanksMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(BanksMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? BanksMinimumLessImpliedMinimumCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(BanksMinimumLessImpliedMinimumWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(BanksMinimumLessImpliedMinimumWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? BanksTier1CapitalRatioCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(BanksTier1CapitalRatioWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(BanksTier1CapitalRatioWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? RiskAssessBufferTier1CapitalLessImpliedMinCapital()
        {
            if (AdjustBankData.TotalRiskWeightedAssets == null)
            {
                return Convert.ToDecimal(SelectedBankVitals.TotalRiskWeightedAssets) * Convert.ToDecimal(RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer() / 100);
            }
            else
            {
                return Convert.ToDecimal(AdjustBankData.TotalRiskWeightedAssets) * Convert.ToDecimal(RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer() / 100);
            }
        }

        public static Decimal? BufferImpliedMinimumCapital()
        {
            return Convert.ToDecimal(ImpliedMinimumCapital()) - RegulatoryMinimumCapital();
        }

        public static Decimal? BufferBanksMinimumCapital()
        {
            return Convert.ToDecimal(BanksMinimumCapital()) - Convert.ToDecimal(ImpliedMinimumCapital());
        }

        public static Decimal? Tier1CapitalLessBanksMinimumCapital()
        {
            return BanksTier1CapitalRatioCapital() - BanksMinimumCapital();
        }

        public static Decimal? ActualTier1CapitalRatioCapital()
        {
            Decimal? sum = 0;
            sum = Convert.ToDecimal(RegulatoryMinimumCapital()) +
                Convert.ToDecimal(BufferImpliedMinimumCapital()) +
                Convert.ToDecimal(BufferBanksMinimumCapital()) +
                Convert.ToDecimal(Tier1CapitalLessBanksMinimumCapital());

            return sum;
        }
    }
}
