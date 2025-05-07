using System;
using System.Collections.Generic;

namespace CBR.Web.Models
{
    [Serializable]
    public class RiskProfileDataViewModel
    {
        private Dictionary<string, List<RiskProfileDataSection>> riskProfileDataSections;

        public RiskProfileDataViewModel()
        {
            this.riskProfileDataSections = new Dictionary<string, List<RiskProfileDataSection>>();
        }

        public Dictionary<string, List<RiskProfileDataSection>> RiskProfileSections
        {
            get
            {
                return this.riskProfileDataSections;
            }

            set
            {
                this.riskProfileDataSections = value;
            }
        }
    }

    [Serializable]
    public class RiskProfileDataSection
    {
        public string UBPRConceptDesc { get; set; }
        public string UBPRConceptCode { get; set; }
        public string SortOrder { get; set; }
        public Decimal? Bank { get; set; }
        public Decimal? Peer1 { get; set; }
        public Decimal? Peer2 { get; set; }
        public Decimal? Benchmark { get; set; }
    }

    [Serializable]
    public class RiskProfileDataViewModelOne
    {
        private Dictionary<string, List<RiskProfileDataSectionOne>> riskProfileDataSections;

        public RiskProfileDataViewModelOne()
        {
            this.riskProfileDataSections = new Dictionary<string, List<RiskProfileDataSectionOne>>();
        }

        public Dictionary<string, List<RiskProfileDataSectionOne>> RiskProfileSections
        {
            get
            {
                return this.riskProfileDataSections;
            }

            set
            {
                this.riskProfileDataSections = value;
            }
        }
    }

    [Serializable]
    public class RiskProfileDataSectionOne
    {
        public string UBPRConceptDesc { get; set; }
        public string UBPRConceptCode { get; set; }
        public string SortOrder { get; set; }
        public string Bank { get; set; }
        public string Peer1 { get; set; }
        public string Peer2 { get; set; }
        public Decimal? Benchmark { get; set; }
    }
}
