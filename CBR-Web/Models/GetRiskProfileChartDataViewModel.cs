using System;

namespace CBR.Web.Models
{
    [Serializable]
    public class GetRiskProfileChartDataViewModel
    {
        public string UBPRConceptCode { get; set; }

        public int InstitutionKey { get; set; }

        public string CustPeerGroupName { get; set; }

        public int CustPeerGroupKey { get; set; }

        public string StdPeerGroupName { get; set; }

        public string Login { get; set; }

        public string RptName { get; set; }
    }
}
