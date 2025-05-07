using System;
using System.Collections.Generic;

namespace CBR.Web.Models
{
    [Serializable]
    public class UbprChartData
    {
        private ChartCategoryAndSeriesData _yearlyChartData;
        private ChartCategoryAndSeriesData _quarterlyChartData;
        public ChartCategoryAndSeriesData YearlyChartData
        {
            get
            {
                return this._yearlyChartData;
            }

            set
            {
                this._yearlyChartData = value;
            }
        }

        public ChartCategoryAndSeriesData QuarterlyChartData
        {
            get
            {
                return this._quarterlyChartData;
            }

            set
            {
                this._quarterlyChartData = value;
            }
        }
    }

}
