using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    [Serializable]
    public class RiskRadarDetailsViewModel
    {

        
    }

    [Serializable]
    public class RiskRadarDataHeaderBottomSection
    {
        public Score ScoreInfo { get; set; }
        public RiskLevel RiskLevleInfo { get; set; }
        public SelectedBankValue SelectedBankValueInfo { get; set; }
        public SelectedBankSizeValue SelectedBankSizeValueInfo { get; set; }
    }

    [Serializable]
    public class Score
    {
        public int Minus4Data { get; set; }
        public int Minus3Data { get; set; }
        public int Minus2Data { get; set; }
        public int Minus1Data { get; set; }
        public int CurrentData { get; set; }
    }

    [Serializable]
    public class RiskLevel
    {
        public string Minus4Data { get; set; }
        public string Minus3Data { get; set; }
        public string Minus2Data { get; set; }
        public string Minus1Data { get; set; }
        public string CurrentData { get; set; }
    }

    [Serializable]
    public class SelectedBankValue
    {
        public string Minus4Data { get; set; }
        public string Minus3Data { get; set; }
        public string Minus2Data { get; set; }
        public string Minus1Data { get; set; }
        public string CurrentData { get; set; }
    }

    [Serializable]
    public class SelectedBankSizeValue
    {
        public string Minus4Data { get; set; }
        public string Minus3Data { get; set; }
        public string Minus2Data { get; set; }
        public string Minus1Data { get; set; }
        public string CurrentData { get; set; }
    }


    
}