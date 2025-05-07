using System;
using System.Collections.Generic;

namespace CBR.Web.Models
{
    [Serializable]
    public class BankProfilePieChartData
    {
        private List<StackedChartSeriesData> loadCompositionStackChartDataQtd;
        private List<StackedChartSeriesData> loadCompositionStackChartDataYtd;
        private List<StackedChartSeriesData> depositCompositionStackChartDataQtd;
        private List<StackedChartSeriesData> depositCompositionStackChartDataYtd;
        private CategoryList categoriesQtd;
        private CategoryList categoriesYtd;

        public BankProfilePieChartData()
        {
            this.loadCompositionStackChartDataQtd = new List<StackedChartSeriesData>();
            this.depositCompositionStackChartDataQtd = new List<StackedChartSeriesData>();
            this.loadCompositionStackChartDataYtd = new List<StackedChartSeriesData>();
            this.depositCompositionStackChartDataYtd = new List<StackedChartSeriesData>();
            this.categoriesQtd = new CategoryList();
            this.categoriesYtd = new CategoryList();
        }

        public List<StackedChartSeriesData> LoadCompositionStackChartDataQtd
        {
            get
            {
                return this.loadCompositionStackChartDataQtd;
            }

            set
            {
                this.loadCompositionStackChartDataQtd = value;
            }
        }

        public List<StackedChartSeriesData> DepositCompositionStackChartDataQtd
        {
            get
            {
                return this.depositCompositionStackChartDataQtd;
            }

            set
            {
                this.depositCompositionStackChartDataQtd = value;
            }
        }

        public List<StackedChartSeriesData> LoadCompositionStackChartDataYtd
        {
            get
            {
                return this.loadCompositionStackChartDataYtd;
            }

            set
            {
                this.loadCompositionStackChartDataYtd = value;
            }
        }

        public List<StackedChartSeriesData> DepositCompositionStackChartDataYtd
        {
            get
            {
                return this.depositCompositionStackChartDataYtd;
            }

            set
            {
                this.depositCompositionStackChartDataYtd = value;
            }
        }

        public CategoryList CategoriesQtd
        {
            get
            {
                return this.categoriesQtd;
            }

            set
            {
                this.categoriesQtd = value;
            }
        }

        public CategoryList CategoriesYtd
        {
            get
            {
                return this.categoriesYtd;
            }

            set
            {
                this.categoriesYtd = value;
            }
        }
    }
}
