using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class B2BParameters
    {
        
        public int Period { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("TabName")]
        public string TabName { get; set; }
       
        public int DefaultBankKey { get; set; }
        
        public int Bank1Key { get; set; }
        
        public int Bank2Key { get; set; }
      
        public int Bank3Key { get; set; }
        
        public int Bank4Key { get; set; }
       
        public int Bank5Key { get; set; }

        [PropertyInclusion(Include = true)]
        [CBRDescription("Period")]
        public string PeriodType { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("DefaultBank Name")]
        public string DefaultBankName { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank1")]
        public string Bank1Name { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank2")]
        public string Bank2Name { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank3")]
        public string Bank3Name { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank4")]
        public string Bank4Name { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Bank5")]
        public string Bank5Name { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Combined Banks")]
        public string CombinedBanks { get; set; }
        [PropertyInclusion(Include = true)]
        [CBRDescription("Selected Bank")]
        public string SelectedSecondBank { get; set; }
        public string SelectedSecondBankName { get; set; }
        
        public string TableName { get; set; }

    }
}
