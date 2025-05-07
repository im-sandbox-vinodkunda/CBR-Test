using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class RiskRadarData
    {
        public DefaultBankDetails SelectedBankDetails { get; set; }
        public RiskRadarChartData QuarterlyData { get; set; }
        public RiskRadarChartData YearlyData { get; set; }
    }


    public class RiskRadarViewDetails
    {
        public RiskRadarData RiskRadarData { get; set; }
        public List<KRIWithChartData> QuarterlyData { get; set; }
        public List<KRIWithChartData> YearlyData { get; set; }
    }

    public class RiskRadarChartData
    {
       // public string PeerGroup { get; set; }
        public string Rank { get; set; }
        public string Quarter { get; set; }
        public string DataValue { get; set; }
        public string AssetSize { get; set; }       
        public RRScoreInformation[] ScoreInformation { get; set; }
        public List<RRHeaderScoreInformation> HeaderScoreInformation { get; set; }
        public List<RRHeaderScoreInformation> RowScoreInformation { get; set; }
        public List<KRIValues> KRIValues { get; set; }  
        public Category TimePeriodHeaderLabels { get; set; }
        
    }

    public class RRHeaderScoreInformation
    {
        public int? ScoreValue { get; set; }
        public string BackGroundColor { get; set; }
        public string RiskLevel { get; set; }
        public string FontColor { get; set; }
    }

    public class RRHeaderScoreBgrdcolor
    {
        public string CurrentMinus4Bgrd { get; set; }
        public string CurrentMinus3Bgrd { get; set; }
        public string CurrentMinus2Bgrd { get; set; }
        public string CurrentMinus1Bgrd { get; set; }
        public string CurrentBgrd { get; set; }      
    } 

    public class RRScoreInformation
    {
        public int? CurrentMinus4ScoreValue { get; set; }
        public int? CurrentMinus3ScoreValue { get; set; }
        public int? CurrentMinus2ScoreValue { get; set; }
        public int? CurrentMinus1ScoreValue { get; set; }
        public int? CurrentScoreValue { get; set; }
        public string KRIGroupName { get; set; }
        public string MetricName { get; set; }
     
    }

    public class KRIValues
    {
        public KRIValueData CurrentMinus4KRIValue { get; set; }
        public KRIValueData CurrentMinus3KRIValue { get; set; }
        public KRIValueData CurrentMinus2KRIValue { get; set; }
        public KRIValueData CurrentMinus1KRIValue { get; set; }
        public KRIValueData CurrentKRIValue { get; set; }
        public int? KRIMetricId { get; set; }
        public string KRIMetricName { get; set; }
        public string KRIMetricDescription { get; set; }
        public bool isHighScoreGood { get; set; }
        public PeerGroupAverageValue peerGroupAverageValue { get; set; }
        public TrendValues TrendValue { get; set; }
        public string TrendImage { get; set; }
        public string PeerGroup { get; set; }
        public string InstitutionName { get; set; }

    }

    public class PeerGroupAverageValue
    {
        public decimal? CurrentMinus4PeerGroupAvgValue { get; set; }
        public decimal? CurrentMinus3PeerGroupAvgValue { get; set; }
        public decimal? CurrentMinus2PeerGroupAvgValue { get; set; }
        public decimal? CurrentMinus1PeerGroupAvgValue { get; set; }
        public decimal? CurrentPeerGroupAvgValue { get; set; }        
    }
    public class KRIValueData
    {
        public decimal? CurrentPeerGroupAvgValue { get; set; }
        public decimal? CurrentDataValue { get; set; }
        public int? CurrentScoreValue { get; set; }
        public string BackGroundColor { get; set; }
        public string RiskLevel { get; set; }
        public string FontColor { get; set; } = "#000000";
    }

    public enum TrendValues
    {
        EqualValue = 1,
        UpArrowGreen = 2,        
        DownArrowGreen = 3,
        UpArrowRed = 4,
        DownArrowRed = 5,
    }
}