using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class StackedChartSeriesData
    {
        private List<ChartDataValue> chartDataList = null;

        public string seriesname { get; set; }
        public string color { get; set; }
        public List<ChartDataValue> data
        {
            get
            {
                return this.chartDataList;
            }

            set
            {
                this.chartDataList = value;
            }
        }
    }
}
