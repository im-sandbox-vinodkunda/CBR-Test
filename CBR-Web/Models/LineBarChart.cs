using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    [Serializable]
    public class LineBarChart
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

    [Serializable]
    public class ChartCategoryAndSeriesData
    {
        private List<DataSetDataItem> dataSetList;
        private CategoryList categories;

        public ChartCategoryAndSeriesData()
        {
            this.dataSetList = new List<DataSetDataItem>();
            this.categories = new CategoryList();
        }

        public CategoryList Categories { get; set; }

        public List<DataSetDataItem> DataSetList
        {
            get
            {
                return this.dataSetList;
            }
            set
            {
                this.dataSetList = value;
            }
        }
    }

    [Serializable]
    public class DataSetDataItem
    {
        public string SeriesName { get; set; }

        public string ShowValues { get; set; }

        public string RenderAs { get; set; }

        public string Visible { get; set; }

        public List<DataValue> Data { get; set; }
    }

    [Serializable]
    public class CategoryList
    {
        public Category Category { get; set; }
    }

    [Serializable]
    public class Category
    {
        private List<CategoryLabel> categoryLabels;

        public Category()
        {
            categoryLabels = new List<CategoryLabel>();
        }

        public List<CategoryLabel> CategoryLabels
        {
            get
            {
                return this.categoryLabels;
            }

            set
            {
                this.categoryLabels = value;
            }
        }
    }

    [Serializable]
    public class CategoryLabel
    {
        public string Label { get; set; }
    }

    [Serializable]
    public class DataValue
    {
        public string Value { get; set; }
    }

    [Serializable]
    public class KRIWithChartData
    {
        public string Name { get; set; }

        public string GroupName { get; set; }
        public LineBarChart LineBarChartData { get; set; }       
    }

}