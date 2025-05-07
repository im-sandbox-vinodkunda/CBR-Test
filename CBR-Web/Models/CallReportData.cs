using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class CallReportData
    {
        private List<CallReportData> _children = null;

        public int? Id { get; set; }  
        public string Label { get; set; }
        public string Date0 { get; set; }
        public string Date1 { get; set; }
        public string Date2 { get; set; }
        public string Date3 { get; set; }
        public string Date4 { get; set; }
        public bool Opened { get; set; }
        public bool? NoClicked { get; set; }
        public bool Bold { get; set; }
        public List<CallReportData> Children
        {
            get
            {
                return this._children;
            }

            set
            {
                this._children = value;
            }
        }

        public CallReportData()
        {
            this._children = new List<Models.CallReportData>();
        }
    }
}
