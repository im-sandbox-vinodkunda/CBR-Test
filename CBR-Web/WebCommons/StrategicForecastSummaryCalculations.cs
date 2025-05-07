using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.WebCommons
{
    public class StrategicForecastSummaryCalculations
    {
        StrategicForecastModelReq dsahboardParams = new StrategicForecastModelReq();
        public StrategicForecastInput strategicForecastInput = new StrategicForecastInput();
        StrategicForecastDashboardConcepts dashboardConcepts = new StrategicForecastDashboardConcepts();
        public StrategicForecastSummaryData strategicForecastSummaryData = new StrategicForecastSummaryData();

        #region //Constructor
        public StrategicForecastSummaryCalculations(List<StrategicForecastInput> modelDetails, StrategicForecastDashboardConcepts dashboardConceptsp, StrategicForecastModelReq dashboardParam)
        {
            dashboardConcepts = dashboardConceptsp;
            dsahboardParams = dashboardParam;
            if (modelDetails.Count > 0)
            {
                if (dashboardParam.SelectedSFScenario1ModelKey > 0)
                {
                    if (modelDetails[0] != null)
                        this.calculateColumn1Values(modelDetails[0]);
                }
                if (dashboardParam.SelectedSFScenario2ModelKey > 0)
                {
                    if (modelDetails[1] != null)
                        this.calculateColumn2Values(modelDetails[1]);
                }
                if (dashboardParam.SelectedSFScenario3ModelKey > 0)
                {
                    if (modelDetails[2] != null)
                        this.calculateColumn3Values(modelDetails[2]);
                }
                if (dashboardParam.SelectedSFScenario4ModelKey > 0)
                {
                    if (modelDetails[3] != null)
                        this.calculateColumn4Values(modelDetails[3]);
                }
                if (dashboardParam.SelectedSFScenario5ModelKey > 0)
                {
                    if (modelDetails[4] != null)
                        this.calculateColumn5Values(modelDetails[4]);
                }
                if (dashboardParam.SelectedSFScenario6ModelKey > 0)
                {
                    if (modelDetails[5] != null)
                        this.calculateColumn6Values(modelDetails[5]);
                }
                if (dashboardParam.SelectedSFScenario7ModelKey > 0)
                {
                    if (modelDetails[6] != null)
                        this.calculateColumn7Values(modelDetails[6]);
                }
                if (dashboardParam.SelectedSFScenario8ModelKey > 0)
                {
                    if (modelDetails[7] != null)
                        this.calculateColumn8Values(modelDetails[7]);
                }
            }

        }
        #endregion
        public void newCapital1()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 == null)
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 = 0;

                    strategicForecastSummaryData.NewCapital1 = (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 == null)
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 = 0;

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 = 0;
                    }

                    strategicForecastSummaryData.NewCapital1 = (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1);
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 == null)
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 = 0;

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2 = 0;
                    }

                    strategicForecastSummaryData.NewCapital1 = (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2);
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 == null)
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 = 0;

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3 = 0;
                    }

                    strategicForecastSummaryData.NewCapital1 = (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3);
                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 == null)
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 = 0;

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear4 = 0;
                    }

                    strategicForecastSummaryData.NewCapital1 = (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear4);

                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 == null)
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 = 0;

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear4 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear5 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario1.NewCapitalYear5 = 0;
                    }

                    strategicForecastSummaryData.NewCapital1 = (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear4) + (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear5);

                    break;
                default:
                    strategicForecastSummaryData.NewCapital1 = null;
                    break;
            }
        }

        public void newCapital2()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 = 0;
                    }

                    strategicForecastSummaryData.NewCapital2 = (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 = 0;
                    }

                    strategicForecastSummaryData.NewCapital2 = (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1);
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2 = 0;
                    }

                    strategicForecastSummaryData.NewCapital2 = (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2);
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3 = 0;
                    }

                    strategicForecastSummaryData.NewCapital2 = (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3);
                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear4 = 0;
                    }

                    strategicForecastSummaryData.NewCapital2 = (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear4);
                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear4 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear5 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario2.NewCapitalYear5 = 0;
                    }

                    strategicForecastSummaryData.NewCapital2 = (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear4) + (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear5);
                    break;
                default:
                    strategicForecastSummaryData.NewCapital2 = null;
                    break;
            }
        }

        public void newCapital3()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 = 0;
                    }

                    strategicForecastSummaryData.NewCapital3 = (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 = 0;
                    }

                    strategicForecastSummaryData.NewCapital3 = (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1);
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2 = 0;
                    }

                    strategicForecastSummaryData.NewCapital3 = (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2);
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3 = 0;
                    }

                    strategicForecastSummaryData.NewCapital3 = (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3);
                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear4 = 0;
                    }

                    strategicForecastSummaryData.NewCapital3 = (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear4);
                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear4 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear5 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario3.NewCapitalYear5 = 0;
                    }

                    strategicForecastSummaryData.NewCapital3 = (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear4) + (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear5);
                    break;
                default:
                    strategicForecastSummaryData.NewCapital3 = null;
                    break;
            }
        }

        public void newCapital4()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 = 0;
                    }

                    strategicForecastSummaryData.NewCapital4 = (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 = 0;
                    }

                    strategicForecastSummaryData.NewCapital4 = (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1);
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2 = 0;
                    }

                    strategicForecastSummaryData.NewCapital4 = (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2);
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3 = 0;
                    }

                    strategicForecastSummaryData.NewCapital4 = (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3);
                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear4 = 0;
                    }

                    strategicForecastSummaryData.NewCapital4 = (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear4);
                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear4 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear5 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario4.NewCapitalYear5 = 0;
                    }

                    strategicForecastSummaryData.NewCapital4 = (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear4) + (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear5);
                    break;
                default:
                    strategicForecastSummaryData.NewCapital4 = null;
                    break;
            }
        }

        public void newCapital5()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 = 0;
                    }

                    strategicForecastSummaryData.NewCapital5 = (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 = 0;
                    }

                    strategicForecastSummaryData.NewCapital5 = (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1);
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2 = 0;
                    }

                    strategicForecastSummaryData.NewCapital5 = (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2);
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3 = 0;
                    }

                    strategicForecastSummaryData.NewCapital5 = (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3);
                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear4 = 0;
                    }

                    strategicForecastSummaryData.NewCapital5 = (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear4);
                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear4 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear5 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario5.NewCapitalYear5 = 0;
                    }

                    strategicForecastSummaryData.NewCapital5 = (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear4) + (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear5);
                    break;
                default:
                    strategicForecastSummaryData.NewCapital5 = 0;
                    break;
            }
        }

        public void newCapital6()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 = 0;
                    }

                    strategicForecastSummaryData.NewCapital6 = (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 = 0;
                    }

                    strategicForecastSummaryData.NewCapital6 = (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1);
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2 = 0;
                    }

                    strategicForecastSummaryData.NewCapital6 = (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2);
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3 = 0;
                    }

                    strategicForecastSummaryData.NewCapital6 = (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3);
                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear4 = 0;
                    }

                    strategicForecastSummaryData.NewCapital6 = (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear4);
                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear4 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear5 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario6.NewCapitalYear5 = 0;
                    }

                    strategicForecastSummaryData.NewCapital6 = (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear4) + (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear5);
                    break;
                default:
                    strategicForecastSummaryData.NewCapital6 = null;
                    break;
            }
        }

        public void newCapital7()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 = 0;
                    }

                    strategicForecastSummaryData.NewCapital7 = (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 = 0;
                    }

                    strategicForecastSummaryData.NewCapital7 = (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1);
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2 = 0;
                    }

                    strategicForecastSummaryData.NewCapital7 = (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2);
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3 = 0;
                    }

                    strategicForecastSummaryData.NewCapital7 = (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3);
                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear4 = 0;
                    }

                    strategicForecastSummaryData.NewCapital7 = (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear4);
                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear4 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear5 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario7.NewCapitalYear5 = 0;
                    }

                    strategicForecastSummaryData.NewCapital7 = (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear4) + (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear5);
                    break;
                default:
                    strategicForecastSummaryData.NewCapital7 = null;
                    break;
            }
        }

        public void newCapital8()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 = 0;
                    }

                    strategicForecastSummaryData.NewCapital8 = (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 = 0;
                    }

                    strategicForecastSummaryData.NewCapital8 = (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1);
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2 = 0;
                    }

                    strategicForecastSummaryData.NewCapital8 = (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2);
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3 = 0;
                    }

                    strategicForecastSummaryData.NewCapital8 = (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3);
                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3 = 0;
                    }

                    strategicForecastSummaryData.NewCapital8 = (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear4);
                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear4 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3 = 0;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear5 == null)
                    {
                        strategicForecastSummaryData.SelectedScenario8.NewCapitalYear5 = 0;
                    }

                    strategicForecastSummaryData.NewCapital8 = (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear4) + (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear5);
                    break;
                default:
                    strategicForecastSummaryData.NewCapital8 = null;
                    break;
            }
        }

        public long countPricePerShareValue1(long horizon)
        {
            var count = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear5 != null && strategicForecastSummaryData.SelectedScenario1.PricePerShareYear5 > 0)
                    {
                        count++;
                    }

                    break;
            }

            return count;
        }

        public long countPricePerShareValue2(long horizon)
        {
            var count = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear5 != null && strategicForecastSummaryData.SelectedScenario2.PricePerShareYear5 > 0)
                    {
                        count++;
                    }

                    break;
            }

            return count;
        }

        public long countPricePerShareValue3(long horizon)
        {
            var count = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear5 != null && strategicForecastSummaryData.SelectedScenario3.PricePerShareYear5 > 0)
                    {
                        count++;
                    }

                    break;
            }

            return count;
        }

        public long countPricePerShareValue4(long horizon)
        {
            var count = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear5 != null && strategicForecastSummaryData.SelectedScenario4.PricePerShareYear5 > 0)
                    {
                        count++;
                    }

                    break;
            }

            return count;
        }

        public long countPricePerShareValue5(long horizon)
        {
            var count = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear5 != null && strategicForecastSummaryData.SelectedScenario5.PricePerShareYear5 > 0)
                    {
                        count++;
                    }

                    break;
            }

            return count;
        }

        public long countPricePerShareValue6(long horizon)
        {
            var count = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear5 != null && strategicForecastSummaryData.SelectedScenario6.PricePerShareYear5 > 0)
                    {
                        count++;
                    }

                    break;
            }

            return count;
        }

        public long countPricePerShareValue7(long horizon)
        {
            var count = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear5 != null && strategicForecastSummaryData.SelectedScenario7.PricePerShareYear5 > 0)
                    {
                        count++;
                    }

                    break;
            }

            return count;
        }

        public long countPricePerShareValue8(long horizon)
        {
            var count = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    break;
                case 5:
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    break;
                case 6:
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear4 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear4 > 0)
                    {
                        count++;
                    }

                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear5 != null && strategicForecastSummaryData.SelectedScenario8.PricePerShareYear5 > 0)
                    {
                        count++;
                    }

                    break;
            }

            return count;
        }

        public void priceConversion1()
        {
            decimal? year0 = 0;
            decimal? year1 = 0;
            decimal? year2 = 0;
            decimal? year3 = 0;
            decimal? year4 = 0;
            decimal? year5 = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    year0 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 == null)
                        year0 = 0;
                    if(countPricePerShareValue1(1)!=0)
                    strategicForecastSummaryData.PriceConversion1 = ((year0)) / countPricePerShareValue1(1);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1;
                        if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 == null)
                            year1 = 0;
                        if (countPricePerShareValue1(2) != 0)
                            strategicForecastSummaryData.PriceConversion1 = ((year0) + (year1)) / countPricePerShareValue1(2);
                    }
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2;
                        if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 == null)
                            year2 = 0;
                        if (countPricePerShareValue1(3) != 0)
                            strategicForecastSummaryData.PriceConversion1 = ((year0) + (year1) + (year2)) / countPricePerShareValue1(3);
                    }
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2;
                        year3 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3;
                        if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 == null)
                            year2 = 0;
                        if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3 == null)
                            year3 = 0;
                        if (countPricePerShareValue1(4) != 0)
                            strategicForecastSummaryData.PriceConversion1 = ((year0) + (year1) + (year2) + (year3)) / countPricePerShareValue1(4);
                    }
                    break;
                case 5:
                    year0 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear4;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear4 == null)
                        year4 = 0;
                    if (countPricePerShareValue1(5) != 0)
                        strategicForecastSummaryData.PriceConversion1 = ((year0) + (year1) + (year2) + (year3) + (year4)) / countPricePerShareValue1(5);
                    break;
                case 6:
                    year0 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear4;
                    year5 = strategicForecastSummaryData.SelectedScenario1.PricePerShareYear5;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear4 == null)
                        year4 = 0;
                    if (strategicForecastSummaryData.SelectedScenario1.PricePerShareYear5 == null)
                        year5 = 0;
                    if (countPricePerShareValue1(5) != 0)
                        strategicForecastSummaryData.PriceConversion1 = ((year0) + (year1) + (year2) + (year3) + (year4) + (year5)) / countPricePerShareValue1(5);
                    break;
                default:
                    strategicForecastSummaryData.PriceConversion1 = null;
                    break;
            }

        }

        public void priceConversion2()
        {
            decimal? year0 = 0;
            decimal? year1 = 0;
            decimal? year2 = 0;
            decimal? year3 = 0;
            decimal? year4 = 0;
            decimal? year5 = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    year0 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 == null)
                        year0 = 0;
                    if (countPricePerShareValue2(1) != 0)
                        strategicForecastSummaryData.PriceConversion2 = ((year0)) / countPricePerShareValue2(1);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1;
                        if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 == null)
                            year1 = 0;
                        if (countPricePerShareValue2(2) != 0)
                            strategicForecastSummaryData.PriceConversion2 = ((year0) + (year1)) / countPricePerShareValue2(2);
                    }
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2;
                        if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 == null)
                            year2 = 0;
                        if (countPricePerShareValue2(3) != 0)
                            strategicForecastSummaryData.PriceConversion2 = ((year0) + (year1) + (year2)) / countPricePerShareValue2(3);
                    }
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2;
                        year3 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3;
                        if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 == null)
                            year2 = 0;
                        if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3 == null)
                            year3 = 0;
                        if (countPricePerShareValue2(4) != 0)
                            strategicForecastSummaryData.PriceConversion2 = ((year0) + (year1) + (year2) + (year3)) / countPricePerShareValue2(4);
                    }
                    break;
                case 5:
                    year0 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear4;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear4 == null)
                        year4 = 0;
                    if (countPricePerShareValue2(5) != 0)
                        strategicForecastSummaryData.PriceConversion2 = ((year0) + (year1) + (year2) + (year3) + (year4)) / countPricePerShareValue2(5);
                    break;
                case 6:
                    year0 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear4;
                    year5 = strategicForecastSummaryData.SelectedScenario2.PricePerShareYear5;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear4 == null)
                        year4 = 0;
                    if (strategicForecastSummaryData.SelectedScenario2.PricePerShareYear5 == null)
                        year5 = 0;
                    if (countPricePerShareValue2(5) != 0)
                        strategicForecastSummaryData.PriceConversion2 = ((year0) + (year1) + (year2) + (year3) + (year4) + (year5)) / countPricePerShareValue2(5);
                    break;
                default:
                    strategicForecastSummaryData.PriceConversion2 = null;
                    break;
            }

        }

        public void priceConversion3()
        {
            decimal? year0 = 0;
            decimal? year1 = 0;
            decimal? year2 = 0;
            decimal? year3 = 0;
            decimal? year4 = 0;
            decimal? year5 = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    year0 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 == null)
                        year0 = 0;
                    if (countPricePerShareValue3(1) != 0)
                        strategicForecastSummaryData.PriceConversion3 = ((year0)) / countPricePerShareValue3(1);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1;
                        if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 == null)
                            year1 = 0;
                        if (countPricePerShareValue3(2) != 0)
                            strategicForecastSummaryData.PriceConversion3 = ((year0) + (year1)) / countPricePerShareValue3(2);
                    }
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2;
                        if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 == null)
                            year2 = 0;
                        if (countPricePerShareValue3(3) != 0)
                            strategicForecastSummaryData.PriceConversion3 = ((year0) + (year1) + (year2)) / countPricePerShareValue3(3);
                    }
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2;
                        year3 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3;
                        if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 == null)
                            year2 = 0;
                        if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3 == null)
                            year3 = 0;
                        if (countPricePerShareValue3(4) != 0)
                            strategicForecastSummaryData.PriceConversion3 = ((year0) + (year1) + (year2) + (year3)) / countPricePerShareValue3(4);
                    }
                    break;
                case 5:
                    year0 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear4;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear4 == null)
                        year4 = 0;
                    if (countPricePerShareValue3(5) != 0)
                        strategicForecastSummaryData.PriceConversion3 = ((year0) + (year1) + (year2) + (year3) + (year4)) / countPricePerShareValue3(5);
                    break;
                case 6:
                    year0 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear4;
                    year5 = strategicForecastSummaryData.SelectedScenario3.PricePerShareYear5;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear4 == null)
                        year4 = 0;
                    if (strategicForecastSummaryData.SelectedScenario3.PricePerShareYear5 == null)
                        year5 = 0;
                    if (countPricePerShareValue3(5) != 0)
                        strategicForecastSummaryData.PriceConversion3 = ((year0) + (year1) + (year2) + (year3) + (year4) + (year5)) / countPricePerShareValue3(5);
                    break;
                default:
                    strategicForecastSummaryData.PriceConversion3 = null;
                    break;
            }

        }

        public void priceConversion4()
        {
            decimal? year0 = 0;
            decimal? year1 = 0;
            decimal? year2 = 0;
            decimal? year3 = 0;
            decimal? year4 = 0;
            decimal? year5 = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    year0 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 == null)
                        year0 = 0;
                    if (countPricePerShareValue4(1) != 0)
                        strategicForecastSummaryData.PriceConversion4 = ((year0)) / countPricePerShareValue4(1);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1;
                        if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 == null)
                            year1 = 0;
                        if (countPricePerShareValue4(2) != 0)
                            strategicForecastSummaryData.PriceConversion4 = ((year0) + (year1)) / countPricePerShareValue4(2);
                    }
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2;
                        if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 == null)
                            year2 = 0;
                        if (countPricePerShareValue4(3) != 0)
                            strategicForecastSummaryData.PriceConversion4 = ((year0) + (year1) + (year2)) / countPricePerShareValue4(3);
                    }
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2;
                        year3 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3;
                        if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 == null)
                            year2 = 0;
                        if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3 == null)
                            year3 = 0;
                        if (countPricePerShareValue4(4) != 0)
                            strategicForecastSummaryData.PriceConversion4 = ((year0) + (year1) + (year2) + (year3)) / countPricePerShareValue4(4);
                    }
                    break;
                case 5:
                    year0 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear4;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear4 == null)
                        year4 = 0;
                    if (countPricePerShareValue4(5) != 0)
                        strategicForecastSummaryData.PriceConversion4 = ((year0) + (year1) + (year2) + (year3) + (year4)) / countPricePerShareValue4(5);
                    break;
                case 6:
                    year0 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear4;
                    year5 = strategicForecastSummaryData.SelectedScenario4.PricePerShareYear5;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear4 == null)
                        year4 = 0;
                    if (strategicForecastSummaryData.SelectedScenario4.PricePerShareYear5 == null)
                        year5 = 0;
                    if (countPricePerShareValue4(5) != 0)
                        strategicForecastSummaryData.PriceConversion4 = ((year0) + (year1) + (year2) + (year3) + (year4) + (year5)) / countPricePerShareValue4(5);
                    break;
                default:
                    strategicForecastSummaryData.PriceConversion4 = null;
                    break;
            }

        }

        public void priceConversion5()
        {
            decimal? year0 = 0;
            decimal? year1 = 0;
            decimal? year2 = 0;
            decimal? year3 = 0;
            decimal? year4 = 0;
            decimal? year5 = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    year0 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 == null)
                        year0 = 0;
                    if (countPricePerShareValue5(1) != 0)
                        strategicForecastSummaryData.PriceConversion5 = ((year0)) / countPricePerShareValue5(1);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1;
                        if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 == null)
                            year1 = 0;
                        if (countPricePerShareValue5(2) != 0)
                            strategicForecastSummaryData.PriceConversion5 = ((year0) + (year1)) / countPricePerShareValue5(2);
                    }
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2;
                        if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 == null)
                            year2 = 0;
                        if (countPricePerShareValue5(3) != 0)
                            strategicForecastSummaryData.PriceConversion5 = ((year0) + (year1) + (year2)) / countPricePerShareValue5(3);
                    }
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2;
                        year3 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3;
                        if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 == null)
                            year2 = 0;
                        if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3 == null)
                            year3 = 0;
                        if (countPricePerShareValue5(4) != 0)
                            strategicForecastSummaryData.PriceConversion5 = ((year0) + (year1) + (year2) + (year3)) / countPricePerShareValue5(4);
                    }
                    break;
                case 5:
                    year0 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear4;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear4 == null)
                        year4 = 0;
                    if (countPricePerShareValue5(5) != 0)
                        strategicForecastSummaryData.PriceConversion5 = ((year0) + (year1) + (year2) + (year3) + (year4)) / countPricePerShareValue5(5);
                    break;
                case 6:
                    year0 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear4;
                    year5 = strategicForecastSummaryData.SelectedScenario5.PricePerShareYear5;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear4 == null)
                        year4 = 0;
                    if (strategicForecastSummaryData.SelectedScenario5.PricePerShareYear5 == null)
                        year5 = 0;
                    if (countPricePerShareValue5(5) != 0)
                        strategicForecastSummaryData.PriceConversion5 = ((year0) + (year1) + (year2) + (year3) + (year4) + (year5)) / countPricePerShareValue5(5);
                    break;
                default:
                    strategicForecastSummaryData.PriceConversion5 = null;
                    break;
            }

        }

        public void priceConversion6()
        {
            decimal? year0 = 0;
            decimal? year1 = 0;
            decimal? year2 = 0;
            decimal? year3 = 0;
            decimal? year4 = 0;
            decimal? year5 = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    year0 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 == null)
                        year0 = 0;
                    if (countPricePerShareValue6(1) != 0)
                        strategicForecastSummaryData.PriceConversion6 = ((year0)) / countPricePerShareValue6(1);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1;
                        if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 == null)
                            year1 = 0;
                        if (countPricePerShareValue6(2) != 0)
                            strategicForecastSummaryData.PriceConversion6 = ((year0) + (year1)) / countPricePerShareValue6(2);
                    }
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2;
                        if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 == null)
                            year2 = 0;
                        if (countPricePerShareValue6(3) != 0)
                            strategicForecastSummaryData.PriceConversion6 = ((year0) + (year1) + (year2)) / countPricePerShareValue6(3);
                    }
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2;
                        year3 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3;
                        if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 == null)
                            year2 = 0;
                        if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3 == null)
                            year3 = 0;
                        if (countPricePerShareValue6(4) != 0)
                            strategicForecastSummaryData.PriceConversion6 = ((year0) + (year1) + (year2) + (year3)) / countPricePerShareValue6(4);
                    }
                    break;
                case 5:
                    year0 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear4;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear4 == null)
                        year4 = 0;
                    if (countPricePerShareValue6(5) != 0)
                        strategicForecastSummaryData.PriceConversion6 = ((year0) + (year1) + (year2) + (year3) + (year4)) / countPricePerShareValue6(5);
                    break;
                case 6:
                    year0 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear4;
                    year5 = strategicForecastSummaryData.SelectedScenario6.PricePerShareYear5;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear4 == null)
                        year4 = 0;
                    if (strategicForecastSummaryData.SelectedScenario6.PricePerShareYear5 == null)
                        year5 = 0;
                    if (countPricePerShareValue6(5) != 0)
                        strategicForecastSummaryData.PriceConversion6 = ((year0) + (year1) + (year2) + (year3) + (year4) + (year5)) / countPricePerShareValue6(5);
                    break;
                default:
                    strategicForecastSummaryData.PriceConversion6 = null;
                    break;
            }

        }

        public void priceConversion7()
        {
            decimal? year0 = 0;
            decimal? year1 = 0;
            decimal? year2 = 0;
            decimal? year3 = 0;
            decimal? year4 = 0;
            decimal? year5 = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    year0 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 == null)
                        year0 = 0;
                    if (countPricePerShareValue7(1) != 0)
                        strategicForecastSummaryData.PriceConversion7 = ((year0)) / countPricePerShareValue7(1);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1;
                        if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 == null)
                            year1 = 0;
                        if (countPricePerShareValue7(2) != 0)
                            strategicForecastSummaryData.PriceConversion7 = ((year0) + (year1)) / countPricePerShareValue7(2);
                    }
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2;
                        if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 == null)
                            year2 = 0;
                        if (countPricePerShareValue7(3) != 0)
                            strategicForecastSummaryData.PriceConversion7 = ((year0) + (year1) + (year2)) / countPricePerShareValue7(3);
                    }
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2;
                        year3 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3;
                        if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 == null)
                            year2 = 0;
                        if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3 == null)
                            year3 = 0;
                        if (countPricePerShareValue7(4) != 0)
                            strategicForecastSummaryData.PriceConversion7 = ((year0) + (year1) + (year2) + (year3)) / countPricePerShareValue7(4);
                    }
                    break;
                case 5:
                    year0 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear4;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear4 == null)
                        year4 = 0;
                    if (countPricePerShareValue7(5) != 0)
                        strategicForecastSummaryData.PriceConversion7 = ((year0) + (year1) + (year2) + (year3) + (year4)) / countPricePerShareValue7(5);
                    break;
                case 6:
                    year0 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear4;
                    year5 = strategicForecastSummaryData.SelectedScenario7.PricePerShareYear5;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear4 == null)
                        year4 = 0;
                    if (strategicForecastSummaryData.SelectedScenario7.PricePerShareYear5 == null)
                        year5 = 0;
                    if (countPricePerShareValue7(5) != 0)
                        strategicForecastSummaryData.PriceConversion7 = ((year0) + (year1) + (year2) + (year3) + (year4) + (year5)) / countPricePerShareValue7(5);
                    break;
                default:
                    strategicForecastSummaryData.PriceConversion7 = null;
                    break;
            }
        }

        public void priceConversion8()
        {
            decimal? year0 = 0;
            decimal? year1 = 0;
            decimal? year2 = 0;
            decimal? year3 = 0;
            decimal? year4 = 0;
            decimal? year5 = 0;
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    year0 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 == null)
                        year0 = 0;
                    if (countPricePerShareValue8(1) != 0)
                        strategicForecastSummaryData.PriceConversion8 = ((year0)) / countPricePerShareValue8(1);
                    break;
                case 2:
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1;
                        if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 == null)
                            year1 = 0;
                        if (countPricePerShareValue8(2) != 0)
                            strategicForecastSummaryData.PriceConversion8 = ((year0) + (year1)) / countPricePerShareValue8(2);
                    }
                    break;
                case 3:
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2;
                        if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 == null)
                            year2 = 0;
                        if (countPricePerShareValue8(3) != 0)
                            strategicForecastSummaryData.PriceConversion8 = ((year0) + (year1) + (year2)) / countPricePerShareValue8(3);
                    }
                    break;
                case 4:
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3 != null)
                    {
                        year0 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0;
                        year1 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1;
                        year2 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2;
                        year3 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3;
                        if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 == null)
                            year0 = 0;
                        if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 == null)
                            year1 = 0;
                        if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 == null)
                            year2 = 0;
                        if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3 == null)
                            year3 = 0;
                        if (countPricePerShareValue8(4) != 0)
                            strategicForecastSummaryData.PriceConversion8 = ((year0) + (year1) + (year2) + (year3)) / countPricePerShareValue8(4);
                    }
                    break;
                case 5:
                    year0 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear4;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear4 == null)
                        year4 = 0;
                    if (countPricePerShareValue8(5) != 0)
                        strategicForecastSummaryData.PriceConversion8 = ((year0) + (year1) + (year2) + (year3) + (year4)) / countPricePerShareValue8(5);
                    break;
                case 6:
                    year0 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0;
                    year1 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1;
                    year2 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2;
                    year3 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3;
                    year4 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear4;
                    year5 = strategicForecastSummaryData.SelectedScenario8.PricePerShareYear5;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear0 == null)
                        year0 = 0;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear1 == null)
                        year1 = 0;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear2 == null)
                        year2 = 0;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear3 == null)
                        year3 = 0;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear4 == null)
                        year4 = 0;
                    if (strategicForecastSummaryData.SelectedScenario8.PricePerShareYear5 == null)
                        year5 = 0;
                    if (countPricePerShareValue8(5) != 0)
                        strategicForecastSummaryData.PriceConversion8 = ((year0) + (year1) + (year2) + (year3) + (year4) + (year5)) / countPricePerShareValue8(5);
                    break;
                default:
                    strategicForecastSummaryData.PriceConversion8 = null;
                    break;
            }

        }

        #region // Year 0 Calculations for Column 1
        public decimal? assetGrowthRateYear10()
        {
            return (strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear0 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear0);
        }

        public decimal? newAcquisitionAssetsYear10()
        {
            if (strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear0 != null)
                return (strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear0);
            else
                return 0;
        }

        public decimal? totalAssetsYear10()
        {
            return ((dashboardConcepts.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear10() / 100))) + newAcquisitionAssetsYear10();
        }

        public decimal? returnOnAverageAssetsYear10()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
            {
                return ((netIncomeYear10() / ((dashboardConcepts.TotalAssetsPriorYear + totalAssetsYear10()) / 2))) * 100;
            }
            else
                return (strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear0 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear0);
        }

        public decimal? netIncomeYear10()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario1.NetIncomeYear0;
            else
                return (((dashboardConcepts.TotalAssetsPriorYear) + totalAssetsYear10()) / 2) * (returnOnAverageAssetsYear10() / 100);
        }

        public decimal? dividendsRateYear10()
        {
            return (strategicForecastSummaryData.SelectedScenario1.DividendsRateYear0 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.DividendsRateYear0);
        }

        public decimal? dividendsYear10()
        {
            var netInc = netIncomeYear10();
            var divRate = dividendsRateYear10();

            if (netInc == null)
                netInc = 0;

            if (divRate == null)
                divRate = 0;

            if (strategicForecastSummaryData.SelectedScenario1.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario1.DividendsYear0;
            else
                return netInc * (divRate / 100);
        }

        public decimal? NewCapitalYear10()
        {
            if (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 == null)
                return strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0 = 0;
            else
                return strategicForecastSummaryData.SelectedScenario1.NewCapitalYear0;
        }

        public decimal? bankEquityCapitalYear10()
        {
            decimal? netInc = 0;
            decimal? divYear10 = 0;
            decimal? newCap = 0;

            if (netIncomeYear10() != null)
                netInc = netIncomeYear10();

            return (dashboardConcepts.BankEquityCapitalPriorYear) + netIncomeYear10() - dividendsYear10() + NewCapitalYear10();
        }

        public decimal? cet1CapitalAdjustmentYear10()
        {
            return (dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear10()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier1CapitalAdjustmentYear0;
            else
                return (dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear10()
        {
            return bankEquityCapitalYear10() + cet1CapitalAdjustmentYear10() + tier1CapitalAdjustmentYear10();
        }

        public decimal? tier1CapitalYear10()
        {
            return bankEquityCapitalYear10() + tier1CapitalAdjustmentYear10();
        }

        public decimal? tier2CapitalYear10()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier2CapitalYear0;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / dashboardConcepts.Tier1CapitalPriorYear) * tier1CapitalYear10();
        }

        public decimal? totalRiskBasedCapitalYear10()
        {
            return tier1CapitalYear10() + tier2CapitalYear10();
        }

        public decimal? riskWeightedAssetsYear10()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario1.RiskWeightedAssetsYear0;
            }
            else
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear10();
        }

        public decimal? totalAssetsForLeverageYear10()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear10();
        }

        public decimal? cet1CapitalRatioYear10()
        {
            return riskWeightedAssetsYear10() == 0 ? null : cet1CapitalYear10() / riskWeightedAssetsYear10();
        }

        public decimal? tier1RBCRatioYear10()
        {
            return (tier1CapitalYear10() / totalAssetsForLeverageYear10());
        }

        public decimal? totalCapitalRatioYear10()
        {
            return (totalRiskBasedCapitalYear10() / riskWeightedAssetsYear10()) * 100;
        }

        public decimal? tier1LeverageRatioYear10()
        {
            return totalAssetsForLeverageYear10() == 0 ? null : (tier1CapitalYear10() / totalAssetsForLeverageYear10()) * 100;
        }

        public decimal? returnOnAverageEquityYear10()
        {
            return (netIncomeYear10() / ((bankEquityCapitalYear10() + (dashboardConcepts.BankEquityCapitalPriorYear)) / 2)) * 100;
        }

        public decimal? mvEquityYear10()
        {
            return bankEquityCapitalYear10() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear10()
        {
            return (strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear0);
        }

        public decimal? bvSharePriceYear10()
        {
            return sharesOutstandingYear10() == 0 ? null : bankEquityCapitalYear10() * 1000 / sharesOutstandingYear10();
        }

        public decimal? mvSharePriceYear10()
        {
            return sharesOutstandingYear10() == 0 ? null : mvEquityYear10() * 1000 / sharesOutstandingYear10();
        }

        public decimal? earningsPerSharePriceYear10()
        {
            return sharesOutstandingYear10() == 0 ? null : netIncomeYear10() * 1000 / sharesOutstandingYear10();
        }

        public decimal? earningsPerShare15PriceYear10()
        {
            return earningsPerSharePriceYear10() * 15;
        }

        public decimal? earningsPerShare20PriceYear10()
        {
            return earningsPerSharePriceYear10() * 20;
        }

        public decimal? dividendPerSharePriceYear10()
        {
            return sharesOutstandingYear10() == 0 ? null : dividendsYear10() * (-1000) / sharesOutstandingYear10();
        }
        #endregion
        #region // Year 1 Calculations for Column 1
        public decimal? assetGrowthRateYear11()
        {
            return (strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear1 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear1);
        }

        public decimal? newAcquisitionAssetsYear11()
        {
            return (strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear1 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear1);
        }

        public decimal? totalAssetsYear11()
        {
            return (((totalAssetsYear10() * (1 + (assetGrowthRateYear11() / 100))) + newAcquisitionAssetsYear11()));
        }

        public decimal? returnOnAverageAssetsYear11()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
            {
                return ((netIncomeYear11() / ((totalAssetsYear10() + totalAssetsYear11()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear1;
        }

        public decimal? netIncomeYear11()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario1.NetIncomeYear1;
            else
                return ((totalAssetsYear10() + totalAssetsYear11()) / 2) * (returnOnAverageAssetsYear11() / 100);
        }

        public decimal? dividendsRateYear11()
        {
            return (strategicForecastSummaryData.SelectedScenario1.DividendsRateYear1 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.DividendsRateYear1);
        }

        public decimal? dividendsYear11()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario1.DividendsYear1;
            else
                return netIncomeYear11() * (dividendsRateYear11() / 100);
        }

        public decimal? NewCapitalYear11()
        {
            return (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.NewCapitalYear1);
        }

        public decimal? bankEquityCapitalYear11()
        {
            var bec = bankEquityCapitalYear10();
            var netInc = netIncomeYear11();
            var dividends = dividendsYear11();
            var newcap = NewCapitalYear11();

            if (bankEquityCapitalYear10() == null)
                bec = 0;

            if (netIncomeYear11() == null)
                netInc = 0;

            if (dividendsYear11() == null)
                dividends = 0;

            if (NewCapitalYear11() == null)
                newcap = NewCapitalYear11();

            return bec + netInc - dividends + newcap;
        }

        public decimal? cet1CapitalAdjustmentYear11()
        {
            return (dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear11()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier1CapitalAdjustmentYear1;
            else
                return (dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear11()
        {
            return bankEquityCapitalYear11() + cet1CapitalAdjustmentYear11() + tier1CapitalAdjustmentYear11();
        }

        public decimal? tier1CapitalYear11()
        {
            return bankEquityCapitalYear11() + tier1CapitalAdjustmentYear11();
        }

        public decimal? tier2CapitalYear11()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier2CapitalYear1;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear11();
        }

        public decimal? totalRiskBasedCapitalYear11()
        {
            return tier1CapitalYear11() + tier2CapitalYear11();
        }

        public decimal? riskWeightedAssetsYear11()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario1.RiskWeightedAssetsYear1;
            }
            else
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear11();
        }

        public decimal? totalAssetsForLeverageYear11()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear11();
        }

        public decimal? cet1CapitalRatioYear11()
        {
            return cet1CapitalYear11() / riskWeightedAssetsYear11();
        }

        public decimal? tier1RBCRatioYear11()
        {
            return (tier1CapitalYear11() / riskWeightedAssetsYear11()) * 100;
        }

        public decimal? totalCapitalRatioYear11()
        {
            return (totalRiskBasedCapitalYear11() / riskWeightedAssetsYear11()) * 100;
        }

        public decimal? tier1LeverageRatioYear11()
        {
            return (tier1CapitalYear11() / totalAssetsForLeverageYear11()) * 100;
        }

        public decimal? returnOnAverageEquityYear11()
        {
            decimal? netInc = 0;
            decimal? bankEq = 0;
            decimal? bankEqCap = 0;

            if (netIncomeYear11() != null)
                netInc = netIncomeYear11();



            return (netIncomeYear11() / ((bankEquityCapitalYear11() + bankEquityCapitalYear10()) / 2)) * 100;
        }

        public decimal? mvEquityYear11()
        {
            return bankEquityCapitalYear11() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear11()
        {
            return (strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear1 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear1);
        }

        public decimal? bvSharePriceYear11()
        {
            return bankEquityCapitalYear11() * 1000 / sharesOutstandingYear11();
        }

        public decimal? mvSharePriceYear11()
        {
            return mvEquityYear11() * 1000 / sharesOutstandingYear11();
        }

        public decimal? earningsPerSharePriceYear11()
        {
            return netIncomeYear11() * 1000 / sharesOutstandingYear11();
        }

        public decimal? earningsPerShare15PriceYear11()
        {
            return earningsPerSharePriceYear11() * 15;
        }

        public decimal? earningsPerShare20PriceYear11()
        {
            return earningsPerSharePriceYear11() * 20;
        }

        public decimal? dividendPerSharePriceYear11()
        {
            return dividendsYear11() * (-1000) / sharesOutstandingYear11();
        }
        #endregion
        #region // Year 2 Calculations for Column 1
        public decimal? assetGrowthRateYear12()
        {
            return (strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear2 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear2);
        }

        public decimal? newAcquisitionAssetsYear12()
        {
            return (strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear2 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear2);
        }

        public decimal? totalAssetsYear12()
        {
            return ((totalAssetsYear11() * (1 + (assetGrowthRateYear12() / 100))) + newAcquisitionAssetsYear12());
        }

        public decimal? returnOnAverageAssetsYear12()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
            {
                return ((netIncomeYear12() / ((totalAssetsYear11() + totalAssetsYear12()) / 2))) * 100;
            }
            else
                return (strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear2 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear2);
        }

        public decimal? netIncomeYear12()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario1.NetIncomeYear2;
            else
                return ((totalAssetsYear11() + totalAssetsYear12()) / 2) * (returnOnAverageAssetsYear12() / 100);
        }

        public decimal? dividendsRateYear12()
        {
            if (strategicForecastSummaryData.SelectedScenario1.DividendsRateYear2 == null)
                strategicForecastSummaryData.SelectedScenario1.DividendsRateYear2 = 0;

            return (strategicForecastSummaryData.SelectedScenario1.DividendsRateYear2);
        }

        public decimal? dividendsYear12()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario1.DividendsYear2;
            else
                return netIncomeYear12() * (dividendsRateYear12() / 100);
        }

        public decimal? NewCapitalYear12()
        {
            return (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.NewCapitalYear2);
        }

        public decimal? bankEquityCapitalYear12()
        {
            return bankEquityCapitalYear11() + netIncomeYear12() - dividendsYear12() + NewCapitalYear12();
        }

        public decimal? cet1CapitalAdjustmentYear12()
        {
            return (dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear12()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier1CapitalAdjustmentYear2;
            else
                return (dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear12()
        {
            return bankEquityCapitalYear12() + cet1CapitalAdjustmentYear12() + tier1CapitalAdjustmentYear12();
        }

        public decimal? tier1CapitalYear12()
        {
            return bankEquityCapitalYear12() + tier1CapitalAdjustmentYear12();
        }

        public decimal? tier2CapitalYear12()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier2CapitalYear2;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear12();
        }

        public decimal? totalRiskBasedCapitalYear12()
        {
            return tier1CapitalYear12() + tier2CapitalYear12();
        }

        public decimal? riskWeightedAssetsYear12()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario1.RiskWeightedAssetsYear2;
            }
            else
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear12();
        }

        public decimal? totalAssetsForLeverageYear12()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear12();
        }

        public decimal? cet1CapitalRatioYear12()
        {
            return riskWeightedAssetsYear12() == 0 ? null : cet1CapitalYear12() / riskWeightedAssetsYear12();
        }

        public decimal? tier1RBCRatioYear12()
        {
            return (tier1CapitalYear12() / riskWeightedAssetsYear12()) * 100;
        }

        public decimal? totalCapitalRatioYear12()
        {
            return (totalRiskBasedCapitalYear12() / riskWeightedAssetsYear12()) * 100;
        }

        public decimal? tier1LeverageRatioYear12()
        {
            return totalAssetsForLeverageYear12() == 0 ? null : (tier1CapitalYear12() / totalAssetsForLeverageYear12()) * 100;
        }

        public decimal? returnOnAverageEquityYear12()
        {
            return (netIncomeYear12() / ((bankEquityCapitalYear12() + bankEquityCapitalYear11()) / 2)) * 100;
        }

        public decimal? mvEquityYear12()
        {
            return bankEquityCapitalYear12() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear12()
        {
            return (strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear2 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear2);
        }

        public decimal? bvSharePriceYear12()
        {
            return sharesOutstandingYear12() == 0 ? null : bankEquityCapitalYear12() * 1000 / sharesOutstandingYear12();
        }

        public decimal? mvSharePriceYear12()
        {
            return sharesOutstandingYear12() == 0 ? null : mvEquityYear12() * 1000 / sharesOutstandingYear12();
        }

        public decimal? earningsPerSharePriceYear12()
        {
            return sharesOutstandingYear12() == 0 ? null : netIncomeYear12() * 1000 / sharesOutstandingYear12();
        }

        public decimal? earningsPerShare15PriceYear12()
        {
            return earningsPerSharePriceYear12() * 15;
        }

        public decimal? earningsPerShare20PriceYear12()
        {
            return earningsPerSharePriceYear12() * 20;
        }

        public decimal? dividendPerSharePriceYear12()
        {
            return sharesOutstandingYear12() == 0 ? null : dividendsYear12() * (-1000) / sharesOutstandingYear12();
        }
        #endregion
        #region // Year 3 Calculations for Column 1
        public decimal? assetGrowthRateYear13()
        {
            return (strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear3 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear3);
        }

        public decimal? newAcquisitionAssetsYear13()
        {
            return (strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear3 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear3);
        }

        public decimal? totalAssetsYear13()
        {
            return ((totalAssetsYear12() * (1 + (assetGrowthRateYear13() / 100))) + newAcquisitionAssetsYear13());
        }

        public decimal? returnOnAverageAssetsYear13()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
            {
                return (netIncomeYear13() / ((totalAssetsYear12() + totalAssetsYear13()) / 2)) * 100;
            }
            else
                return (strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear3 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear3);
        }

        public decimal? netIncomeYear13()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario1.NetIncomeYear3;
            else
                return ((totalAssetsYear12() + totalAssetsYear13()) / 2) * (returnOnAverageAssetsYear13() / 100);
        }

        public decimal? dividendsRateYear13()
        {
            return (strategicForecastSummaryData.SelectedScenario1.DividendsRateYear3 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.DividendsRateYear3);
        }

        public decimal? dividendsYear13()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario1.DividendsYear3;
            else
                return netIncomeYear13() * (dividendsRateYear13() / 100);
        }

        public decimal? NewCapitalYear13()
        {
            return (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.NewCapitalYear3);
        }

        public decimal? bankEquityCapitalYear13()
        {
            var bec = bankEquityCapitalYear12();
            var netInc = netIncomeYear13();
            var div = dividendsYear13();
            var newCap = NewCapitalYear13();

            if (bankEquityCapitalYear12() == null)
                bec = 0;

            if (netIncomeYear13() == null)
                netInc = 0;

            if (dividendsYear13() == null)
                div = 0;

            if (NewCapitalYear13() == null)
                newCap = 0;

            return bec + netInc - div + newCap;
        }

        public decimal? cet1CapitalAdjustmentYear13()
        {
            return (dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear13()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier1CapitalAdjustmentYear3;
            else
                return (dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear13()
        {
            return bankEquityCapitalYear13() + cet1CapitalAdjustmentYear13() + tier1CapitalAdjustmentYear13();
        }

        public decimal? tier1CapitalYear13()
        {
            return bankEquityCapitalYear13() + tier1CapitalAdjustmentYear13();
        }

        public decimal? tier2CapitalYear13()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier2CapitalYear3;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear13();
        }

        public decimal? totalRiskBasedCapitalYear13()
        {
            return tier1CapitalYear13() + tier2CapitalYear13();
        }

        public decimal? riskWeightedAssetsYear13()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario1.RiskWeightedAssetsYear3;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear13();
            }
        }

        public decimal? totalAssetsForLeverageYear13()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear13();
        }

        public decimal? cet1CapitalRatioYear13()
        {
            return riskWeightedAssetsYear13() == 0 ? null : cet1CapitalYear13() / riskWeightedAssetsYear13();
        }

        public decimal? tier1RBCRatioYear13()
        {
            return (tier1CapitalYear13() / riskWeightedAssetsYear13()) * 100;
        }

        public decimal? totalCapitalRatioYear13()
        {
            return (totalRiskBasedCapitalYear13() / riskWeightedAssetsYear13()) * 100;
        }

        public decimal? tier1LeverageRatioYear13()
        {
            return totalAssetsForLeverageYear13() == 0 ? null : (tier1CapitalYear13() / totalAssetsForLeverageYear13()) * 100;
        }

        public decimal? returnOnAverageEquityYear13()
        {
            return (netIncomeYear13() / ((bankEquityCapitalYear12() + bankEquityCapitalYear13()) / 2)) * 100;
        }

        public decimal? mvEquityYear13()
        {
            return bankEquityCapitalYear13() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear13()
        {
            return (strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear3 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear3);
        }

        public decimal? bvSharePriceYear13()
        {
            return sharesOutstandingYear13() == 0 ? null : bankEquityCapitalYear13() * 1000 / sharesOutstandingYear13();
        }

        public decimal? mvSharePriceYear13()
        {
            return sharesOutstandingYear13() == 0 ? null : mvEquityYear13() * 1000 / sharesOutstandingYear13();
        }

        public decimal? earningsPerSharePriceYear13()
        {
            return sharesOutstandingYear13() == 0 ? null : netIncomeYear13() * 1000 / sharesOutstandingYear13();
        }

        public decimal? earningsPerShare15PriceYear13()
        {
            return earningsPerSharePriceYear13() * 15;
        }

        public decimal? earningsPerShare20PriceYear13()
        {
            return earningsPerSharePriceYear13() * 20;
        }

        public decimal? dividendPerSharePriceYear13()
        {
            return sharesOutstandingYear13() == 0 ? null : dividendsYear13() * (-1000) / sharesOutstandingYear13();
        }
        #endregion
        #region   // Year 4 Calculations for Column 1
        public decimal? assetGrowthRateYear14()
        {
            return (strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear4 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear4);
        }

        public decimal? newAcquisitionAssetsYear14()
        {
            return (strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear4 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear4);
        }

        public decimal? totalAssetsYear14()
        {
            return ((totalAssetsYear13() * (1 + (assetGrowthRateYear14() / 100))) + newAcquisitionAssetsYear14());
        }

        public decimal? returnOnAverageAssetsYear14()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
            {
                return ((netIncomeYear14() / ((totalAssetsYear13() + totalAssetsYear14()) / 2))) * 100;
            }
            else
                return (strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear4 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear4);
        }

        public decimal? netIncomeYear14()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario1.NetIncomeYear4;
            else
                return ((totalAssetsYear13() + totalAssetsYear14()) / 2) * (returnOnAverageAssetsYear14() / 100);
        }

        public decimal? dividendsRateYear14()
        {
            return (strategicForecastSummaryData.SelectedScenario1.DividendsRateYear4 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.DividendsRateYear4);
        }

        public decimal? dividendsYear14()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario1.DividendsYear4;
            else
                return netIncomeYear14() * (dividendsRateYear14() / 100);
        }

        public decimal? NewCapitalYear14()
        {
            return (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear4 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.NewCapitalYear4);
        }

        public decimal? bankEquityCapitalYear14()
        {
            return bankEquityCapitalYear13() + netIncomeYear14() - dividendsYear14() + NewCapitalYear14();
        }

        public decimal? cet1CapitalAdjustmentYear14()
        {
            return (dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear14()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier1CapitalAdjustmentYear4;
            else
                return (dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear14()
        {
            return bankEquityCapitalYear14() + cet1CapitalAdjustmentYear14() + tier1CapitalAdjustmentYear14();
        }

        public decimal? tier1CapitalYear14()
        {
            return bankEquityCapitalYear14() + tier1CapitalAdjustmentYear14();
        }

        public decimal? tier2CapitalYear14()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier2CapitalYear4;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear14();
        }

        public decimal? totalRiskBasedCapitalYear14()
        {
            return tier1CapitalYear14() + tier2CapitalYear14();
        }

        public decimal? riskWeightedAssetsYear14()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario1.RiskWeightedAssetsYear4;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear14();
            }
        }

        public decimal? totalAssetsForLeverageYear14()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear14();
        }

        public decimal? cet1CapitalRatioYear14()
        {
            return riskWeightedAssetsYear14() == 0 ? null : cet1CapitalYear14() / riskWeightedAssetsYear14();
        }

        public decimal? tier1RBCRatioYear14()
        {
            return (tier1CapitalYear14() / riskWeightedAssetsYear14()) * 100;
        }

        public decimal? totalCapitalRatioYear14()
        {
            return (totalRiskBasedCapitalYear14() / riskWeightedAssetsYear14()) * 100;
        }

        public decimal? tier1LeverageRatioYear14()
        {
            return totalAssetsForLeverageYear14() == 0 ? null : (tier1CapitalYear14() / totalAssetsForLeverageYear14()) * 100;
        }

        public decimal? returnOnAverageEquityYear14()
        {
            return (netIncomeYear14() / ((bankEquityCapitalYear14() + bankEquityCapitalYear13()) / 2)) * 100;
        }

        public decimal? mvEquityYear14()
        {
            return bankEquityCapitalYear14() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear14()
        {
            return (strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear4 == null ? 0 : strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear4);
        }

        public decimal? bvSharePriceYear14()
        {
            return sharesOutstandingYear14() == 0 ? null : bankEquityCapitalYear14() * 1000 / sharesOutstandingYear14();
        }

        public decimal? mvSharePriceYear14()
        {
            return sharesOutstandingYear14() == 0 ? null : mvEquityYear14() * 1000 / sharesOutstandingYear14();
        }

        public decimal? earningsPerSharePriceYear14()
        {
            return sharesOutstandingYear14() == 0 ? null : netIncomeYear14() * 1000 / sharesOutstandingYear14();
        }

        public decimal? earningsPerShare15PriceYear14()
        {
            return earningsPerSharePriceYear14() * 15;
        }

        public decimal? earningsPerShare20PriceYear14()
        {
            return earningsPerSharePriceYear14() * 20;
        }

        public decimal? dividendPerSharePriceYear14()
        {
            return sharesOutstandingYear14() == 0 ? null : dividendsYear14() * (-1000) / sharesOutstandingYear14();
        }
        #endregion
        #region // Year 5 Calculations for Column 1
        public decimal? assetGrowthRateYear15()
        {
            return strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario1.AssetGrowthRateYear5);
        }

        public decimal? newAcquisitionAssetsYear15()
        {
            return strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario1.NewAcquisitionAssetsYear5);
        }

        public decimal? totalAssetsYear15()
        {
            return ((totalAssetsYear14() * (1 + (assetGrowthRateYear15() / 100))) + newAcquisitionAssetsYear15());
        }

        public decimal? returnOnAverageAssetsYear15()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
            {
                return ((netIncomeYear15() / ((totalAssetsYear14() + totalAssetsYear15()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario1.ReturnOnAverageAssetsYear5);
        }

        public decimal? netIncomeYear15()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario1.NetIncomeYear5;
            else
                return ((totalAssetsYear14() + totalAssetsYear15()) / 2) * (returnOnAverageAssetsYear15() / 100);
        }

        public decimal? dividendsRateYear15()
        {
            return strategicForecastSummaryData.SelectedScenario1.DividendsRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario1.DividendsRateYear5);
        }

        public decimal? dividendsYear15()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario1.DividendsYear5;
            else
                return netIncomeYear15() * (dividendsRateYear15() / 100);
        }

        public decimal? NewCapitalYear15()
        {
            return strategicForecastSummaryData.SelectedScenario1.NewCapitalYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario1.NewCapitalYear5);
        }

        public decimal? bankEquityCapitalYear15()
        {
            return bankEquityCapitalYear14() + netIncomeYear15() - dividendsYear15() + NewCapitalYear15();
        }

        public decimal? cet1CapitalAdjustmentYear15()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear15()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier1CapitalAdjustmentYear5;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear15()
        {
            return bankEquityCapitalYear15() + cet1CapitalAdjustmentYear15() + tier1CapitalAdjustmentYear15();
        }

        public decimal? tier1CapitalYear15()
        {
            return bankEquityCapitalYear15() + tier1CapitalAdjustmentYear15();
        }

        public decimal? tier2CapitalYear15()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario1.Tier2CapitalYear5;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear15();
        }

        public decimal? totalRiskBasedCapitalYear15()
        {
            return tier1CapitalYear15() + tier2CapitalYear15();
        }

        public decimal? riskWeightedAssetsYear15()
        {
            if (strategicForecastSummaryData.SelectedScenario1.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario1.RiskWeightedAssetsYear5;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear15();
            }
        }

        public decimal? totalAssetsForLeverageYear15()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear15();
        }

        public decimal? cet1CapitalRatioYear15()
        {
            return riskWeightedAssetsYear15() == 0 ? null : cet1CapitalYear15() / riskWeightedAssetsYear15();
        }

        public decimal? tier1RBCRatioYear15()
        {
            return (tier1CapitalYear15() / riskWeightedAssetsYear15()) * 100;
        }

        public decimal? totalCapitalRatioYear15()
        {
            return (totalRiskBasedCapitalYear15() / riskWeightedAssetsYear15()) * 100;
        }

        public decimal? tier1LeverageRatioYear15()
        {
            return totalAssetsForLeverageYear15() == 0 ? null : (tier1CapitalYear15() / totalAssetsForLeverageYear15()) * 100;
        }

        public decimal? returnOnAverageEquityYear15()
        {
            return (netIncomeYear15() / ((bankEquityCapitalYear15() + bankEquityCapitalYear14()) / 2)) * 100;
        }

        public decimal? mvEquityYear15()
        {
            return bankEquityCapitalYear15() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear15()
        {
            return strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario1.SharesOutstandingActualYear5);
        }

        public decimal? bvSharePriceYear15()
        {
            return sharesOutstandingYear15() == 0 ? null : bankEquityCapitalYear15() * 1000 / sharesOutstandingYear15();
        }

        public decimal? mvSharePriceYear15()
        {
            return sharesOutstandingYear15() == 0 ? null : mvEquityYear15() * 1000 / sharesOutstandingYear15();
        }

        public decimal? earningsPerSharePriceYear15()
        {
            return sharesOutstandingYear15() == 0 ? null : netIncomeYear15() * 1000 / sharesOutstandingYear15();
        }

        public decimal? earningsPerShare15PriceYear15()
        {
            return earningsPerSharePriceYear15() * 15;
        }

        public decimal? earningsPerShare20PriceYear15()
        {
            return earningsPerSharePriceYear15() * 20;
        }

        public decimal? dividendPerSharePriceYear15()
        {
            return sharesOutstandingYear15() == 0 ? null : dividendsYear15() * (-1000) / sharesOutstandingYear15();
        }
        #endregion

        #region // Year 0 Calculations for Column 2
        public decimal? assetGrowthRateYear20()
        {
            return strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear0);
        }

        public decimal? newAcquisitionAssetsYear20()
        {
            if (strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear0 != null)
                return (strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear0);
            else
                return 0;
        }

        public decimal? totalAssetsYear20()
        {
            return ((dashboardConcepts.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear20() / 100))) + newAcquisitionAssetsYear20();
        }

        public decimal? returnOnAverageAssetsYear20()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true)
            {
                return ((netIncomeYear20() / ((dashboardConcepts.TotalAssetsPriorYear + totalAssetsYear20()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear0);
        }

        public decimal? netIncomeYear20()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
                return strategicForecastSummaryData.SelectedScenario2.NetIncomeYear0;
            else
                return (((dashboardConcepts.TotalAssetsPriorYear) + totalAssetsYear20()) / 2) * (returnOnAverageAssetsYear20() / 100);
        }

        public decimal? dividendsRateYear20()
        {
            return strategicForecastSummaryData.SelectedScenario2.DividendsRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.DividendsRateYear0);
        }

        public decimal? dividendsYear20()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario2.DividendsYear0;
            else
                return netIncomeYear20() * (dividendsRateYear20() / 100);
        }

        public decimal? NewCapitalYear20()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear0);
        }

        public decimal? bankEquityCapitalYear20()
        {
            decimal? netInc = netIncomeYear20();
            decimal? div = dividendsYear20();
            decimal? newCap = NewCapitalYear20();
            if (netInc == null)
                netInc = 0;

            if (div == null)
                div = 0;

            if (newCap == null)
                newCap = 0;

            return (dashboardConcepts.BankEquityCapitalPriorYear) + netInc - div + newCap;
        }

        public decimal? cet1CapitalAdjustmentYear20()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear20()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier1CapitalAdjustmentYear0;
            else
                return strategicForecastSummaryData.Tier1CapitalAdjustmentPriorYear == null ? 0 : (strategicForecastSummaryData.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear20()
        {
            return bankEquityCapitalYear20() + cet1CapitalAdjustmentYear20() + tier1CapitalAdjustmentYear20();
        }

        public decimal? tier1CapitalYear20()
        {
            return bankEquityCapitalYear20() + tier1CapitalAdjustmentYear20();
        }

        public decimal? tier2CapitalYear20()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier2CapitalYear0;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear20();
        }

        public decimal? totalRiskBasedCapitalYear20()
        {
            return tier1CapitalYear20() + tier2CapitalYear20();
        }

        public decimal? riskWeightedAssetsYear20()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario2.RiskWeightedAssetsYear0;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear20();
            }
        }

        public decimal? totalAssetsForLeverageYear20()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear20();
        }

        public decimal? cet1CapitalRatioYear20()
        {
            return riskWeightedAssetsYear20() == 0 ? null : cet1CapitalYear20() / riskWeightedAssetsYear20();
        }

        public decimal? tier1RBCRatioYear20()
        {
            return (tier1CapitalYear20() / riskWeightedAssetsYear20()) * 100;
        }

        public decimal? totalCapitalRatioYear20()
        {
            return (totalRiskBasedCapitalYear20() / riskWeightedAssetsYear20()) * 100;
        }

        public decimal? tier1LeverageRatioYear20()
        {
            return totalAssetsForLeverageYear20() == 0 ? null : (tier1CapitalYear20() / totalAssetsForLeverageYear20()) * 100;
        }

        public decimal? returnOnAverageEquityYear20()
        {
            return (netIncomeYear20() / ((bankEquityCapitalYear20() + (dashboardConcepts.BankEquityCapitalPriorYear)) / 2)) * 100;
        }

        public decimal? mvEquityYear20()
        {
            return bankEquityCapitalYear20() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear20()
        {
            return strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear0);
        }

        public decimal? bvSharePriceYear20()
        {
            return sharesOutstandingYear20() == 0 ? null : bankEquityCapitalYear20() * 1000 / sharesOutstandingYear20();
        }

        public decimal? mvSharePriceYear20()
        {
            return sharesOutstandingYear20() == 0 ? null : mvEquityYear20() * 1000 / sharesOutstandingYear20();
        }

        public decimal? earningsPerSharePriceYear20()
        {
            return sharesOutstandingYear20() == 0 ? null : netIncomeYear20() * 1000 / sharesOutstandingYear20();
        }

        public decimal? earningsPerShare15PriceYear20()
        {
            return earningsPerSharePriceYear20() * 15;
        }

        public decimal? earningsPerShare20PriceYear20()
        {
            return earningsPerSharePriceYear20() * 20;
        }

        public decimal? dividendPerSharePriceYear20()
        {
            return sharesOutstandingYear20() == 0 ? null : dividendsYear20() * (-1000) / sharesOutstandingYear20();
        }
        #endregion
        #region// Year 1 Calculations for Column 2
        public decimal? assetGrowthRateYear21()
        {
            return strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear1);
        }

        public decimal? newAcquisitionAssetsYear21()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear1);
        }

        public decimal? totalAssetsYear21()
        {
            return (totalAssetsYear20() * (1 + (assetGrowthRateYear21() / 100))) + newAcquisitionAssetsYear21();
        }

        public decimal? returnOnAverageAssetsYear21()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
            {
                return ((netIncomeYear21() / ((totalAssetsYear20() + totalAssetsYear21()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear1);
        }

        public decimal? netIncomeYear21()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
                return strategicForecastSummaryData.SelectedScenario2.NetIncomeYear1;
            else
                return ((totalAssetsYear20() + totalAssetsYear21()) / 2) * (returnOnAverageAssetsYear21() / 100);
        }

        public decimal? dividendsRateYear21()
        {
            return strategicForecastSummaryData.SelectedScenario2.DividendsRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.DividendsRateYear1);
        }

        public decimal? dividendsYear21()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario2.DividendsYear1;
            else
                return netIncomeYear21() * (dividendsRateYear21() / 100);
        }

        public decimal? NewCapitalYear21()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear1);
        }

        public decimal? bankEquityCapitalYear21()
        {
            return bankEquityCapitalYear20() + netIncomeYear21() - dividendsYear21() + NewCapitalYear21();
        }

        public decimal? cet1CapitalAdjustmentYear21()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear21()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier1CapitalAdjustmentYear1;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear21()
        {
            return bankEquityCapitalYear21() + cet1CapitalAdjustmentYear21() + tier1CapitalAdjustmentYear21();
        }

        public decimal? tier1CapitalYear21()
        {
            return bankEquityCapitalYear21() + tier1CapitalAdjustmentYear21();
        }

        public decimal? tier2CapitalYear21()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier2CapitalYear1;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear21();
        }

        public decimal? totalRiskBasedCapitalYear21()
        {
            return tier1CapitalYear21() + tier2CapitalYear21();
        }

        public decimal? riskWeightedAssetsYear21()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario2.RiskWeightedAssetsYear1;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear21();
            }
        }

        public decimal? totalAssetsForLeverageYear21()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear21();
        }

        public decimal? cet1CapitalRatioYear21()
        {
            return riskWeightedAssetsYear21() == 0 ? null : cet1CapitalYear21() / riskWeightedAssetsYear21();
        }

        public decimal? tier1RBCRatioYear21()
        {
            return (tier1CapitalYear21() / riskWeightedAssetsYear21()) * 100;
        }

        public decimal? totalCapitalRatioYear21()
        {
            return (totalRiskBasedCapitalYear21() / riskWeightedAssetsYear21()) * 100;
        }

        public decimal? tier1LeverageRatioYear21()
        {
            return totalAssetsForLeverageYear21() == 0 ? null : (tier1CapitalYear21() / totalAssetsForLeverageYear21()) * 100;
        }

        public decimal? returnOnAverageEquityYear21()
        {
            return (netIncomeYear21() / ((bankEquityCapitalYear21() + bankEquityCapitalYear20()) / 2)) * 100;
        }

        public decimal? mvEquityYear21()
        {
            return bankEquityCapitalYear21() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear21()
        {
            return strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear1);
        }

        public decimal? bvSharePriceYear21()
        {
            return sharesOutstandingYear21() == 0 ? null : bankEquityCapitalYear21() * 1000 / sharesOutstandingYear21();
        }

        public decimal? mvSharePriceYear21()
        {
            return sharesOutstandingYear21() == 0 ? null : mvEquityYear21() * 1000 / sharesOutstandingYear21();
        }

        public decimal? earningsPerSharePriceYear21()
        {
            return sharesOutstandingYear21() == 0 ? null : netIncomeYear21() * 1000 / sharesOutstandingYear21();
        }

        public decimal? earningsPerShare15PriceYear21()
        {
            return earningsPerSharePriceYear21() * 15;
        }

        public decimal? earningsPerShare20PriceYear21()
        {
            return earningsPerSharePriceYear21() * 20;
        }

        public decimal? dividendPerSharePriceYear21()
        {
            return sharesOutstandingYear21() == 0 ? null : dividendsYear21() * (-1000) / sharesOutstandingYear21();
        }
        #endregion
        #region  // Year 2 Calculations for Column 2
        public decimal? assetGrowthRateYear22()
        {
            return strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear2);
        }

        public decimal? newAcquisitionAssetsYear22()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear2);
        }

        public decimal? totalAssetsYear22()
        {
            return (totalAssetsYear21() * (1 + (assetGrowthRateYear22() / 100))) + newAcquisitionAssetsYear22();
        }

        public decimal? returnOnAverageAssetsYear22()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
            {
                return ((netIncomeYear22() / ((totalAssetsYear21() + totalAssetsYear22()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear2);
        }

        public decimal? netIncomeYear22()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
                return strategicForecastSummaryData.SelectedScenario2.NetIncomeYear2;
            else
                return ((totalAssetsYear21() + totalAssetsYear22()) / 2) * (returnOnAverageAssetsYear22() / 100);
        }

        public decimal? dividendsRateYear22()
        {
            return strategicForecastSummaryData.SelectedScenario2.DividendsRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.DividendsRateYear2);
        }

        public decimal? dividendsYear22()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario2.DividendsYear2;
            else
                return netIncomeYear22() * (dividendsRateYear22() / 100);
        }

        public decimal? NewCapitalYear22()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear2);
        }

        public decimal? bankEquityCapitalYear22()
        {
            return bankEquityCapitalYear21() + netIncomeYear22() - dividendsYear22() + NewCapitalYear22();
        }

        public decimal? cet1CapitalAdjustmentYear22()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear22()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier1CapitalAdjustmentYear2;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear22()
        {
            return bankEquityCapitalYear22() + cet1CapitalAdjustmentYear22() + tier1CapitalAdjustmentYear22();
        }

        public decimal? tier1CapitalYear22()
        {
            return bankEquityCapitalYear22() + tier1CapitalAdjustmentYear22();
        }

        public decimal? tier2CapitalYear22()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier2CapitalYear2;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear22();
        }

        public decimal? totalRiskBasedCapitalYear22()
        {
            return tier1CapitalYear22() + tier2CapitalYear22();
        }

        public decimal? riskWeightedAssetsYear22()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario2.RiskWeightedAssetsYear2;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear22();
            }
        }

        public decimal? totalAssetsForLeverageYear22()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear22();
        }

        public decimal? cet1CapitalRatioYear22()
        {
            return riskWeightedAssetsYear22() == 0 ? null : cet1CapitalYear22() / riskWeightedAssetsYear22();
        }

        public decimal? tier1RBCRatioYear22()
        {
            return (tier1CapitalYear22() / riskWeightedAssetsYear22()) * 100;
        }

        public decimal? totalCapitalRatioYear22()
        {
            return (totalRiskBasedCapitalYear22() / riskWeightedAssetsYear22()) * 100;
        }

        public decimal? tier1LeverageRatioYear22()
        {
            return totalAssetsForLeverageYear22() == 0 ? null : (tier1CapitalYear22() / totalAssetsForLeverageYear22()) * 100;
        }

        public decimal? returnOnAverageEquityYear22()
        {
            return (netIncomeYear22() / ((bankEquityCapitalYear22() + bankEquityCapitalYear21()) / 2)) * 100;
        }

        public decimal? mvEquityYear22()
        {
            return bankEquityCapitalYear22() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear22()
        {
            return strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear2);
        }

        public decimal? bvSharePriceYear22()
        {
            return sharesOutstandingYear22() == 0 ? null : bankEquityCapitalYear22() * 1000 / sharesOutstandingYear22();
        }

        public decimal? mvSharePriceYear22()
        {
            return sharesOutstandingYear22() == 0 ? null : mvEquityYear22() * 1000 / sharesOutstandingYear22();
        }

        public decimal? earningsPerSharePriceYear22()
        {
            return sharesOutstandingYear22() == 0 ? null : netIncomeYear22() * 1000 / sharesOutstandingYear22();
        }

        public decimal? earningsPerShare15PriceYear22()
        {
            return earningsPerSharePriceYear22() * 15;
        }

        public decimal? earningsPerShare20PriceYear22()
        {
            return earningsPerSharePriceYear22() * 20;
        }

        public decimal? dividendPerSharePriceYear22()
        {
            return sharesOutstandingYear22() == 0 ? null : dividendsYear22() * (-1000) / sharesOutstandingYear22();
        }
        #endregion
        #region  // Year 3 Calculations for Column 2
        public decimal? assetGrowthRateYear23()
        {
            return strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear3);
        }

        public decimal? newAcquisitionAssetsYear23()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear3);
        }

        public decimal? totalAssetsYear23()
        {
            return (totalAssetsYear22() * (1 + (assetGrowthRateYear23() / 100))) + newAcquisitionAssetsYear23();
        }

        public decimal? returnOnAverageAssetsYear23()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
            {
                return (netIncomeYear23() / ((totalAssetsYear22() + totalAssetsYear23()) / 2)) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear3);
        }

        public decimal? netIncomeYear23()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
                return strategicForecastSummaryData.SelectedScenario2.NetIncomeYear3;
            else
                return ((totalAssetsYear22() + totalAssetsYear23()) / 2) * (returnOnAverageAssetsYear23() / 100);
        }

        public decimal? dividendsRateYear23()
        {
            return strategicForecastSummaryData.SelectedScenario2.DividendsRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.DividendsRateYear3);
        }

        public decimal? dividendsYear23()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario2.DividendsYear3;
            else
                return netIncomeYear23() * (dividendsRateYear23() / 100);
        }

        public decimal? NewCapitalYear23()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear3);
        }

        public decimal? bankEquityCapitalYear23()
        {
            decimal? bec = bankEquityCapitalYear22();
            decimal? netInc = netIncomeYear23();
            decimal? div = dividendsYear23();
            decimal? newCap = NewCapitalYear23();
            if (bec == null)
                bec = 0;

            if (netInc == null)
                netInc = 0;

            if (div == null)
                div = 0;

            if (newCap == null)
                newCap = 0;

            return bec + netInc - div + newCap;
        }

        public decimal? cet1CapitalAdjustmentYear23()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear23()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier1CapitalAdjustmentYear3;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear23()
        {
            return bankEquityCapitalYear23() + cet1CapitalAdjustmentYear23() + tier1CapitalAdjustmentYear23();
        }

        public decimal? tier1CapitalYear23()
        {
            return bankEquityCapitalYear23() + tier1CapitalAdjustmentYear23();
        }

        public decimal? tier2CapitalYear23()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier2CapitalYear3;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear23();
        }

        public decimal? totalRiskBasedCapitalYear23()
        {
            return tier1CapitalYear23() + tier2CapitalYear23();
        }

        public decimal? riskWeightedAssetsYear23()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario2.RiskWeightedAssetsYear3;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear23();
            }
        }

        public decimal? totalAssetsForLeverageYear23()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear23();
        }

        public decimal? cet1CapitalRatioYear23()
        {
            return riskWeightedAssetsYear23() == 0 ? null : cet1CapitalYear23() / riskWeightedAssetsYear23();
        }

        public decimal? tier1RBCRatioYear23()
        {
            return (tier1CapitalYear23() / riskWeightedAssetsYear23()) * 100;
        }

        public decimal? totalCapitalRatioYear23()
        {
            return (totalRiskBasedCapitalYear23() / riskWeightedAssetsYear23()) * 100;
        }

        public decimal? tier1LeverageRatioYear23()
        {
            return totalAssetsForLeverageYear23() == 0 ? null : (tier1CapitalYear23() / totalAssetsForLeverageYear23()) * 100;
        }

        public decimal? returnOnAverageEquityYear23()
        {
            return (netIncomeYear23() / ((bankEquityCapitalYear22() + bankEquityCapitalYear23()) / 2)) * 100;
        }

        public decimal? mvEquityYear23()
        {
            return bankEquityCapitalYear23() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear23()
        {
            return strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear3);
        }

        public decimal? bvSharePriceYear23()
        {
            return sharesOutstandingYear23() == 0 ? null : bankEquityCapitalYear23() * 1000 / sharesOutstandingYear23();
        }

        public decimal? mvSharePriceYear23()
        {
            return sharesOutstandingYear23() == 0 ? null : mvEquityYear23() * 1000 / sharesOutstandingYear23();
        }

        public decimal? earningsPerSharePriceYear23()
        {
            return sharesOutstandingYear23() == 0 ? null : netIncomeYear23() * 1000 / sharesOutstandingYear23();
        }

        public decimal? earningsPerShare15PriceYear23()
        {
            return earningsPerSharePriceYear23() * 15;
        }

        public decimal? earningsPerShare20PriceYear23()
        {
            return earningsPerSharePriceYear23() * 20;
        }

        public decimal? dividendPerSharePriceYear23()
        {
            return sharesOutstandingYear23() == 0 ? null : dividendsYear23() * (-1000) / sharesOutstandingYear23();
        }
        #endregion
        #region // Year 4 Calculations for Column 2
        public decimal? assetGrowthRateYear24()
        {
            return strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear4);
        }

        public decimal? newAcquisitionAssetsYear24()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear4);
        }

        public decimal? totalAssetsYear24()
        {
            return (totalAssetsYear23() * (1 + (assetGrowthRateYear24() / 100))) + newAcquisitionAssetsYear24();
        }

        public decimal? returnOnAverageAssetsYear24()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
            {
                return ((netIncomeYear24() / ((totalAssetsYear23() + totalAssetsYear24()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear4);
        }

        public decimal? netIncomeYear24()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
                return strategicForecastSummaryData.SelectedScenario2.NetIncomeYear4;
            else
                return ((totalAssetsYear23() + totalAssetsYear24()) / 2) * (returnOnAverageAssetsYear24() / 100);
        }

        public decimal? dividendsRateYear24()
        {
            return strategicForecastSummaryData.SelectedScenario2.DividendsRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.DividendsRateYear4);
        }

        public decimal? dividendsYear24()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario2.DividendsYear4;
            else
                return netIncomeYear24() * (dividendsRateYear24() / 100);
        }

        public decimal? NewCapitalYear24()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewCapitalYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear4);
        }

        public decimal? bankEquityCapitalYear24()
        {
            return bankEquityCapitalYear23() + netIncomeYear24() - dividendsYear24() + NewCapitalYear24();
        }

        public decimal? cet1CapitalAdjustmentYear24()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear24()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier1CapitalAdjustmentYear4;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear24()
        {
            return bankEquityCapitalYear24() + cet1CapitalAdjustmentYear24() + tier1CapitalAdjustmentYear24();
        }

        public decimal? tier1CapitalYear24()
        {
            return bankEquityCapitalYear24() + tier1CapitalAdjustmentYear24();
        }

        public decimal? tier2CapitalYear24()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier2CapitalYear4;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear24();
        }

        public decimal? totalRiskBasedCapitalYear24()
        {
            return tier1CapitalYear24() + tier2CapitalYear24();
        }

        public decimal? riskWeightedAssetsYear24()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario2.RiskWeightedAssetsYear4;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear24();
            }
        }

        public decimal? totalAssetsForLeverageYear24()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear24();
        }

        public decimal? cet1CapitalRatioYear24()
        {
            return riskWeightedAssetsYear24() == 0 ? null : cet1CapitalYear24() / riskWeightedAssetsYear24();
        }

        public decimal? tier1RBCRatioYear24()
        {
            return (tier1CapitalYear24() / riskWeightedAssetsYear24()) * 100;
        }

        public decimal? totalCapitalRatioYear24()
        {
            return (totalRiskBasedCapitalYear24() / riskWeightedAssetsYear24()) * 100;
        }

        public decimal? tier1LeverageRatioYear24()
        {
            return totalAssetsForLeverageYear24() == 0 ? null : (tier1CapitalYear24() / totalAssetsForLeverageYear24()) *100;
        }

        public decimal? returnOnAverageEquityYear24()
        {
            return (netIncomeYear24() / ((bankEquityCapitalYear23() + bankEquityCapitalYear24()) / 2)) * 100;
        }

        public decimal? mvEquityYear24()
        {
            return bankEquityCapitalYear24() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear24()
        {
            return strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear4);
        }

        public decimal? bvSharePriceYear24()
        {
            return sharesOutstandingYear24() == 0 ? null : bankEquityCapitalYear24() * 1000 / sharesOutstandingYear24();
        }

        public decimal? mvSharePriceYear24()
        {
            return sharesOutstandingYear24() == 0 ? null : mvEquityYear24() * 1000 / sharesOutstandingYear24();
        }

        public decimal? earningsPerSharePriceYear24()
        {
            return sharesOutstandingYear24() == 0 ? null : netIncomeYear24() * 1000 / sharesOutstandingYear24();
        }

        public decimal? earningsPerShare15PriceYear24()
        {
            return earningsPerSharePriceYear24() * 15;
        }

        public decimal? earningsPerShare20PriceYear24()
        {
            return earningsPerSharePriceYear24() * 20;
        }

        public decimal? dividendPerSharePriceYear24()
        {
            return sharesOutstandingYear24() == 0 ? null : dividendsYear24() * (-1000) / sharesOutstandingYear24();
        }
        #endregion
        #region  // Year 5 Calculations for Column 2
        public decimal? assetGrowthRateYear25()
        {
            return strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.AssetGrowthRateYear5);
        }

        public decimal? newAcquisitionAssetsYear25()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewAcquisitionAssetsYear5);
        }

        public decimal? totalAssetsYear25()
        {
            return (totalAssetsYear24() * (1 + (assetGrowthRateYear25() / 100))) + newAcquisitionAssetsYear25();
        }

        public decimal? returnOnAverageAssetsYear25()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
            {
                return ((netIncomeYear25() / ((totalAssetsYear24() + totalAssetsYear25()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.ReturnOnAverageAssetsYear5);
        }

        public decimal? netIncomeYear25()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput == true == true)
                return strategicForecastSummaryData.SelectedScenario2.NetIncomeYear5;
            else
                return ((totalAssetsYear24() + totalAssetsYear25()) / 2) * (returnOnAverageAssetsYear25() / 100);
        }

        public decimal? dividendsRateYear25()
        {
            return strategicForecastSummaryData.SelectedScenario2.DividendsRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.DividendsRateYear5);
        }

        public decimal? dividendsYear25()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario2.DividendsYear5;
            else
                return netIncomeYear25() * (dividendsRateYear25() / 100);
        }

        public decimal? NewCapitalYear25()
        {
            return strategicForecastSummaryData.SelectedScenario2.NewCapitalYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.NewCapitalYear5);
        }

        public decimal? bankEquityCapitalYear25()
        {
            return bankEquityCapitalYear24() + netIncomeYear25() - dividendsYear25() + NewCapitalYear25();
        }

        public decimal? cet1CapitalAdjustmentYear25()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear25()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier1CapitalAdjustmentYear5;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear25()
        {
            return bankEquityCapitalYear25() + cet1CapitalAdjustmentYear25() + tier1CapitalAdjustmentYear25();
        }

        public decimal? tier1CapitalYear25()
        {
            return bankEquityCapitalYear25() + tier1CapitalAdjustmentYear25();
        }

        public decimal? tier2CapitalYear25()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario2.Tier2CapitalYear5;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear25();
        }

        public decimal? totalRiskBasedCapitalYear25()
        {
            return tier1CapitalYear25() + tier2CapitalYear25();
        }

        public decimal? riskWeightedAssetsYear25()
        {
            if (strategicForecastSummaryData.SelectedScenario2.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario2.RiskWeightedAssetsYear5;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear25();
            }
        }

        public decimal? totalAssetsForLeverageYear25()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear25();
        }

        public decimal? cet1CapitalRatioYear25()
        {
            return riskWeightedAssetsYear25() == 0 ? null : cet1CapitalYear25() / riskWeightedAssetsYear25();
        }

        public decimal? tier1RBCRatioYear25()
        {
            return (tier1CapitalYear25() / riskWeightedAssetsYear25()) * 100;
        }

        public decimal? totalCapitalRatioYear25()
        {
            return (totalRiskBasedCapitalYear25() / riskWeightedAssetsYear25()) * 100;
        }

        public decimal? tier1LeverageRatioYear25()
        {
            return totalAssetsForLeverageYear25() == 0 ? null : (tier1CapitalYear25() / totalAssetsForLeverageYear25()) *100;
        }

        public decimal? returnOnAverageEquityYear25()
        {
            return (netIncomeYear25() / ((bankEquityCapitalYear24() + bankEquityCapitalYear25()) / 2)) * 100;
        }

        public decimal? mvEquityYear25()
        {
            return bankEquityCapitalYear25() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear25()
        {
            return strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario2.SharesOutstandingActualYear5);
        }

        public decimal? bvSharePriceYear25()
        {
            return sharesOutstandingYear25() == 0 ? null : bankEquityCapitalYear25() * 1000 / sharesOutstandingYear25();
        }

        public decimal? mvSharePriceYear25()
        {
            return sharesOutstandingYear25() == 0 ? null : mvEquityYear25() * 1000 / sharesOutstandingYear25();
        }

        public decimal? earningsPerSharePriceYear25()
        {
            return sharesOutstandingYear25() == 0 ? null : netIncomeYear25() * 1000 / sharesOutstandingYear25();
        }

        public decimal? earningsPerShare15PriceYear25()
        {
            return earningsPerSharePriceYear25() * 15;
        }

        public decimal? earningsPerShare20PriceYear25()
        {
            return earningsPerSharePriceYear25() * 20;
        }

        public decimal? dividendPerSharePriceYear25()
        {
            return sharesOutstandingYear25() == 0 ? null : dividendsYear25() * (-1000) / sharesOutstandingYear25();
        }
        #endregion

        #region  // Year 0 Calculations for Column 3
        public decimal? assetGrowthRateYear30()
        {
            return strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear0);
        }

        public decimal? newAcquisitionAssetsYear30()
        {
            if (strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear0 != null)
                return (strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear0);
            else
                return 0;
        }

        public decimal? totalAssetsYear30()
        {
            return (dashboardConcepts.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear30() / 100)) + newAcquisitionAssetsYear30();
        }

        public decimal? returnOnAverageAssetsYear30()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
            {
                return ((netIncomeYear30() / ((dashboardConcepts.TotalAssetsPriorYear + totalAssetsYear30()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear0);
        }

        public decimal? netIncomeYear30()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario3.NetIncomeYear0;
            else
                return (((dashboardConcepts.TotalAssetsPriorYear) + totalAssetsYear30()) / 2) * (returnOnAverageAssetsYear30() / 100);
        }

        public decimal? dividendsRateYear30()
        {
            return strategicForecastSummaryData.SelectedScenario3.DividendsRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.DividendsRateYear0);
        }

        public decimal? dividendsYear30()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario3.DividendsYear0;
            else
                return netIncomeYear30() * (dividendsRateYear30() / 100);
        }

        public decimal? NewCapitalYear30()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear0);
        }

        public decimal? bankEquityCapitalYear30()
        {
            return (dashboardConcepts.BankEquityCapitalPriorYear) + netIncomeYear30() - dividendsYear30() + NewCapitalYear30();
        }

        public decimal? cet1CapitalAdjustmentYear30()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear30()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier1CapitalAdjustmentYear0;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear30()
        {
            return bankEquityCapitalYear30() + cet1CapitalAdjustmentYear30() + tier1CapitalAdjustmentYear30();
        }

        public decimal? tier1CapitalYear30()
        {
            return bankEquityCapitalYear30() + tier1CapitalAdjustmentYear30();
        }

        public decimal? tier2CapitalYear30()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier2CapitalYear0;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear30();
        }

        public decimal? totalRiskBasedCapitalYear30()
        {
            return tier1CapitalYear30() + tier2CapitalYear30();
        }

        public decimal? riskWeightedAssetsYear30()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario3.RiskWeightedAssetsYear0;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear30();
            }
        }

        public decimal? totalAssetsForLeverageYear30()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear30();
        }

        public decimal? cet1CapitalRatioYear30()
        {
            return riskWeightedAssetsYear30() == 0 ? null : cet1CapitalYear30() / riskWeightedAssetsYear30();
        }

        public decimal? tier1RBCRatioYear30()
        {
            return (tier1CapitalYear30() / riskWeightedAssetsYear30()) * 100;
        }

        public decimal? totalCapitalRatioYear30()
        {
            return (totalRiskBasedCapitalYear30() / riskWeightedAssetsYear30()) * 100;
        }

        public decimal? tier1LeverageRatioYear30()
        {
            return totalAssetsForLeverageYear30() == 0 ? null : (tier1CapitalYear30() / totalAssetsForLeverageYear30()) *100;
        }

        public decimal? returnOnAverageEquityYear30()
        {
            return (netIncomeYear30() / ((bankEquityCapitalYear30() + (dashboardConcepts.BankEquityCapitalPriorYear)) / 2)) * 100;
        }

        public decimal? mvEquityYear30()
        {
            return bankEquityCapitalYear30() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear30()
        {
            return strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear0);
        }

        public decimal? bvSharePriceYear30()
        {
            return sharesOutstandingYear30() == 0 ? null : bankEquityCapitalYear30() * 1000 / sharesOutstandingYear30();
        }

        public decimal? mvSharePriceYear30()
        {
            return sharesOutstandingYear30() == 0 ? null : mvEquityYear30() * 1000 / sharesOutstandingYear30();
        }

        public decimal? earningsPerSharePriceYear30()
        {
            return sharesOutstandingYear30() == 0 ? null : netIncomeYear30() * 1000 / sharesOutstandingYear30();
        }

        public decimal? earningsPerShare15PriceYear30()
        {
            return earningsPerSharePriceYear30() * 15;
        }

        public decimal? earningsPerShare20PriceYear30()
        {
            return earningsPerSharePriceYear30() * 20;
        }

        public decimal? dividendPerSharePriceYear30()
        {
            return sharesOutstandingYear30() == 0 ? null : dividendsYear30() * (-1000) / sharesOutstandingYear30();
        }
        #endregion
        #region // Year 1 Calculations for Column 3
        public decimal? assetGrowthRateYear31()
        {
            return strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear1);
        }

        public decimal? newAcquisitionAssetsYear31()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear1);
        }

        public decimal? totalAssetsYear31()
        {
            return (totalAssetsYear30() * (1 + (assetGrowthRateYear31() / 100))) + newAcquisitionAssetsYear31();
        }

        public decimal? returnOnAverageAssetsYear31()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
            {
                return ((netIncomeYear31() / ((totalAssetsYear30() + totalAssetsYear31()) / 2))) * 100;
            }
            else
                return (strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear1);
        }

        public decimal? netIncomeYear31()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario3.NetIncomeYear1;
            else
                return ((totalAssetsYear30() + totalAssetsYear31()) / 2) * (returnOnAverageAssetsYear31() / 100);
        }

        public decimal? dividendsRateYear31()
        {
            return strategicForecastSummaryData.SelectedScenario3.DividendsRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.DividendsRateYear1);
        }

        public decimal? dividendsYear31()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario3.DividendsYear1;
            else
                return netIncomeYear31() * (dividendsRateYear31() / 100);
        }

        public decimal? NewCapitalYear31()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear1);
        }

        public decimal? bankEquityCapitalYear31()
        {
            return bankEquityCapitalYear30() + netIncomeYear31() - dividendsYear31() + NewCapitalYear31();
        }

        public decimal? cet1CapitalAdjustmentYear31()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear31()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier1CapitalAdjustmentYear1;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear31()
        {
            return bankEquityCapitalYear31() + cet1CapitalAdjustmentYear31() + tier1CapitalAdjustmentYear31();
        }

        public decimal? tier1CapitalYear31()
        {
            return bankEquityCapitalYear31() + tier1CapitalAdjustmentYear31();
        }

        public decimal? tier2CapitalYear31()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier2CapitalYear1;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear31();
        }

        public decimal? totalRiskBasedCapitalYear31()
        {
            return tier1CapitalYear31() + tier2CapitalYear31();
        }

        public decimal? riskWeightedAssetsYear31()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario3.RiskWeightedAssetsYear1;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear31();
            }
        }

        public decimal? totalAssetsForLeverageYear31()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear31();
        }

        public decimal? cet1CapitalRatioYear31()
        {
            return riskWeightedAssetsYear31() == 0 ? null : cet1CapitalYear31() / riskWeightedAssetsYear31();
        }

        public decimal? tier1RBCRatioYear31()
        {
            return (tier1CapitalYear31() / riskWeightedAssetsYear31()) * 100;
        }

        public decimal? totalCapitalRatioYear31()
        {
            return (totalRiskBasedCapitalYear31() / riskWeightedAssetsYear31()) * 100;
        }

        public decimal? tier1LeverageRatioYear31()
        {
            return totalAssetsForLeverageYear31() == 0 ? null : (tier1CapitalYear31() / totalAssetsForLeverageYear31()) * 100;
        }

        public decimal? returnOnAverageEquityYear31()
        {
            return (netIncomeYear31() / ((bankEquityCapitalYear31() + bankEquityCapitalYear30()) / 2) * 100);
        }

        public decimal? mvEquityYear31()
        {
            return bankEquityCapitalYear31() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear31()
        {
            return strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear1);
        }

        public decimal? bvSharePriceYear31()
        {
            return sharesOutstandingYear31() == 0 ? null : bankEquityCapitalYear31() * 1000 / sharesOutstandingYear31();
        }

        public decimal? mvSharePriceYear31()
        {
            return sharesOutstandingYear31() == 0 ? null : mvEquityYear31() * 1000 / sharesOutstandingYear31();
        }

        public decimal? earningsPerSharePriceYear31()
        {
            return sharesOutstandingYear31() == 0 ? null : netIncomeYear31() * 1000 / sharesOutstandingYear31();
        }

        public decimal? earningsPerShare15PriceYear31()
        {
            return earningsPerSharePriceYear31() * 15;
        }

        public decimal? earningsPerShare20PriceYear31()
        {
            return earningsPerSharePriceYear31() * 20;
        }

        public decimal? dividendPerSharePriceYear31()
        {
            return sharesOutstandingYear31() == 0 ? null : dividendsYear31() * (-1000) / sharesOutstandingYear31();
        }
        #endregion
        #region // Year 2 Calculations for Column 3
        public decimal? assetGrowthRateYear32()
        {
            return strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear2);
        }

        public decimal? newAcquisitionAssetsYear32()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear2);
        }

        public decimal? totalAssetsYear32()
        {
            return (totalAssetsYear31() * (1 + (assetGrowthRateYear32() / 100))) + newAcquisitionAssetsYear32();
        }

        public decimal? returnOnAverageAssetsYear32()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
            {
                return ((netIncomeYear32() / ((totalAssetsYear31() + totalAssetsYear32()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear2);
        }

        public decimal? netIncomeYear32()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario3.NetIncomeYear2;
            else
                return ((totalAssetsYear31() + totalAssetsYear32()) / 2) * (returnOnAverageAssetsYear32() / 100);
        }

        public decimal? dividendsRateYear32()
        {
            return strategicForecastSummaryData.SelectedScenario3.DividendsRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.DividendsRateYear2);
        }

        public decimal? dividendsYear32()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario3.DividendsYear2;
            else
                return netIncomeYear32() * (dividendsRateYear32() / 100);
        }

        public decimal? NewCapitalYear32()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear2);
        }

        public decimal? bankEquityCapitalYear32()
        {
            return bankEquityCapitalYear31() + netIncomeYear32() - dividendsYear32() + NewCapitalYear32();
        }

        public decimal? cet1CapitalAdjustmentYear32()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear32()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier1CapitalAdjustmentYear2;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear32()
        {
            return bankEquityCapitalYear32() + cet1CapitalAdjustmentYear32() + tier1CapitalAdjustmentYear32();
        }

        public decimal? tier1CapitalYear32()
        {
            return bankEquityCapitalYear32() + tier1CapitalAdjustmentYear32();
        }

        public decimal? tier2CapitalYear32()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier2CapitalYear2;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear32();
        }

        public decimal? totalRiskBasedCapitalYear32()
        {
            return tier1CapitalYear32() + tier2CapitalYear32();
        }

        public decimal? riskWeightedAssetsYear32()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario3.RiskWeightedAssetsYear2;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear32();
            }
        }

        public decimal? totalAssetsForLeverageYear32()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear32();
        }

        public decimal? cet1CapitalRatioYear32()
        {
            return riskWeightedAssetsYear32() == 0 ? null : cet1CapitalYear32() / riskWeightedAssetsYear32();
        }

        public decimal? tier1RBCRatioYear32()
        {
            return (tier1CapitalYear32() / riskWeightedAssetsYear32()) * 100;
        }

        public decimal? totalCapitalRatioYear32()
        {
            return (totalRiskBasedCapitalYear32() / riskWeightedAssetsYear32()) * 100;
        }

        public decimal? tier1LeverageRatioYear32()
        {
            return totalAssetsForLeverageYear32() == 0 ? null : (tier1CapitalYear32() / totalAssetsForLeverageYear32()) * 100;
        }

        public decimal? returnOnAverageEquityYear32()
        {
            return (netIncomeYear32() / ((bankEquityCapitalYear32() + bankEquityCapitalYear31()) / 2)) * 100;
        }

        public decimal? mvEquityYear32()
        {
            return bankEquityCapitalYear32() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear32()
        {
            return strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear2);
        }

        public decimal? bvSharePriceYear32()
        {
            return sharesOutstandingYear32() == 0 ? null : bankEquityCapitalYear32() * 1000 / sharesOutstandingYear32();
        }

        public decimal? mvSharePriceYear32()
        {
            return sharesOutstandingYear32() == 0 ? null : mvEquityYear32() * 1000 / sharesOutstandingYear32();
        }

        public decimal? earningsPerSharePriceYear32()
        {
            return sharesOutstandingYear32() == 0 ? null : netIncomeYear32() * 1000 / sharesOutstandingYear32();
        }

        public decimal? earningsPerShare15PriceYear32()
        {
            return earningsPerSharePriceYear32() * 15;
        }

        public decimal? earningsPerShare20PriceYear32()
        {
            return earningsPerSharePriceYear32() * 20;
        }

        public decimal? dividendPerSharePriceYear32()
        {
            return sharesOutstandingYear32() == 0 ? null : dividendsYear32() * (-1000) / sharesOutstandingYear32();
        }

        #endregion
        #region // Year 3 Calculations for Column 3
        public decimal? assetGrowthRateYear33()
        {
            return strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear3);
        }

        public decimal? newAcquisitionAssetsYear33()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear3);
        }

        public decimal? totalAssetsYear33()
        {
            return (totalAssetsYear32() * (1 + (assetGrowthRateYear33() / 100))) + newAcquisitionAssetsYear33();
        }

        public decimal? returnOnAverageAssetsYear33()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
            {
                return (netIncomeYear33() / ((totalAssetsYear32() + totalAssetsYear33()) / 2)) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear3);
        }

        public decimal? netIncomeYear33()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario3.NetIncomeYear3;
            else
                return ((totalAssetsYear32() + totalAssetsYear33()) / 2) * (returnOnAverageAssetsYear33() / 100);
        }

        public decimal? dividendsRateYear33()
        {
            return (strategicForecastSummaryData.SelectedScenario3.DividendsRateYear3);
        }

        public decimal? dividendsYear33()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario3.DividendsYear3;
            else
                return netIncomeYear33() * (dividendsRateYear33() / 100);
        }

        public decimal? NewCapitalYear33()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear3);
        }

        public decimal? bankEquityCapitalYear33()
        {
            return bankEquityCapitalYear32() + netIncomeYear33() - dividendsYear33() + NewCapitalYear33();
        }

        public decimal? cet1CapitalAdjustmentYear33()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear33()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier1CapitalAdjustmentYear3;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear33()
        {
            return bankEquityCapitalYear33() + cet1CapitalAdjustmentYear33() + tier1CapitalAdjustmentYear33();
        }

        public decimal? tier1CapitalYear33()
        {
            return bankEquityCapitalYear33() + tier1CapitalAdjustmentYear33();
        }

        public decimal? tier2CapitalYear33()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier2CapitalYear3;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear33();
        }

        public decimal? totalRiskBasedCapitalYear33()
        {
            return tier1CapitalYear33() + tier2CapitalYear33();
        }

        public decimal? riskWeightedAssetsYear33()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario3.RiskWeightedAssetsYear3;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear33();
            }
        }

        public decimal? totalAssetsForLeverageYear33()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear33();
        }

        public decimal? cet1CapitalRatioYear33()
        {
            return riskWeightedAssetsYear33() == 0 ? null : cet1CapitalYear33() / riskWeightedAssetsYear33();
        }

        public decimal? tier1RBCRatioYear33()
        {
            return (tier1CapitalYear33() / riskWeightedAssetsYear33()) * 100;
        }

        public decimal? totalCapitalRatioYear33()
        {
            return (totalRiskBasedCapitalYear33() / riskWeightedAssetsYear33()) * 100;
        }

        public decimal? tier1LeverageRatioYear33()
        {
            return totalAssetsForLeverageYear33() == 0 ? null : (tier1CapitalYear33() / totalAssetsForLeverageYear33()) * 100;
        }

        public decimal? returnOnAverageEquityYear33()
        {
            return (netIncomeYear33() / ((bankEquityCapitalYear32() + bankEquityCapitalYear33()) / 2)) * 100;
        }

        public decimal? mvEquityYear33()
        {
            return bankEquityCapitalYear33() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear33()
        {
            return strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear3);
        }

        public decimal? bvSharePriceYear33()
        {
            return sharesOutstandingYear33() == 0 ? null : bankEquityCapitalYear33() * 1000 / sharesOutstandingYear33();
        }

        public decimal? mvSharePriceYear33()
        {
            return sharesOutstandingYear33() == 0 ? null : mvEquityYear33() * 1000 / sharesOutstandingYear33();
        }

        public decimal? earningsPerSharePriceYear33()
        {
            return sharesOutstandingYear33() == 0 ? null : netIncomeYear33() * 1000 / sharesOutstandingYear33();
        }

        public decimal? earningsPerShare15PriceYear33()
        {
            return earningsPerSharePriceYear33() * 15;
        }

        public decimal? earningsPerShare20PriceYear33()
        {
            return earningsPerSharePriceYear33() * 20;
        }

        public decimal? dividendPerSharePriceYear33()
        {
            return sharesOutstandingYear33() == 0 ? null : dividendsYear33() * (-1000) / sharesOutstandingYear33();
        }
        #endregion
        #region // Year 4 Calculations for Column 3
        public decimal? assetGrowthRateYear34()
        {
            return strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear4);
        }

        public decimal? newAcquisitionAssetsYear34()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear4);
        }

        public decimal? totalAssetsYear34()
        {
            return (totalAssetsYear33() * (1 + (assetGrowthRateYear34() / 100))) + newAcquisitionAssetsYear34();
        }

        public decimal? returnOnAverageAssetsYear34()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
            {
                return ((netIncomeYear34() / ((totalAssetsYear33() + totalAssetsYear34()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear4);
        }

        public decimal? netIncomeYear34()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario3.NetIncomeYear4;
            else
                return ((totalAssetsYear33() + totalAssetsYear34()) / 2) * (returnOnAverageAssetsYear34() / 100);
        }

        public decimal? dividendsRateYear34()
        {
            return strategicForecastSummaryData.SelectedScenario3.DividendsRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.DividendsRateYear4);
        }

        public decimal? dividendsYear34()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario3.DividendsYear4;
            else
                return netIncomeYear34() * (dividendsRateYear34() / 100);
        }

        public decimal? NewCapitalYear34()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewCapitalYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear4);
        }

        public decimal? bankEquityCapitalYear34()
        {
            return bankEquityCapitalYear33() + netIncomeYear34() - dividendsYear34() + NewCapitalYear34();
        }

        public decimal? cet1CapitalAdjustmentYear34()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear34()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier1CapitalAdjustmentYear4;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear34()
        {
            return bankEquityCapitalYear34() + cet1CapitalAdjustmentYear34() + tier1CapitalAdjustmentYear34();
        }

        public decimal? tier1CapitalYear34()
        {
            return bankEquityCapitalYear34() + tier1CapitalAdjustmentYear34();
        }

        public decimal? tier2CapitalYear34()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier2CapitalYear4;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear34();
        }

        public decimal? totalRiskBasedCapitalYear34()
        {
            return tier1CapitalYear34() + tier2CapitalYear34();
        }

        public decimal? riskWeightedAssetsYear34()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario3.RiskWeightedAssetsYear4;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear34();
            }
        }

        public decimal? totalAssetsForLeverageYear34()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear34();
        }

        public decimal? cet1CapitalRatioYear34()
        {
            return riskWeightedAssetsYear34() == 0 ? null : cet1CapitalYear34() / riskWeightedAssetsYear34();
        }

        public decimal? tier1RBCRatioYear34()
        {
            return (tier1CapitalYear34() / riskWeightedAssetsYear34()) * 100;
        }

        public decimal? totalCapitalRatioYear34()
        {
            return (totalRiskBasedCapitalYear34() / riskWeightedAssetsYear34()) * 100;
        }

        public decimal? tier1LeverageRatioYear34()
        {
            return totalAssetsForLeverageYear34() == 0 ? null : (tier1CapitalYear34() / totalAssetsForLeverageYear34()) * 100;
        }

        public decimal? returnOnAverageEquityYear34()
        {
            return (netIncomeYear34() / ((bankEquityCapitalYear34() + bankEquityCapitalYear33()) / 2)) * 100;
        }

        public decimal? mvEquityYear34()
        {
            return bankEquityCapitalYear34() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear34()
        {
            return strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear4);
        }

        public decimal? bvSharePriceYear34()
        {
            return sharesOutstandingYear34() == 0 ? null : bankEquityCapitalYear34() * 1000 / sharesOutstandingYear34();
        }

        public decimal? mvSharePriceYear34()
        {
            return sharesOutstandingYear34() == 0 ? null : mvEquityYear34() * 1000 / sharesOutstandingYear34();
        }

        public decimal? earningsPerSharePriceYear34()
        {
            return sharesOutstandingYear34() == 0 ? null : netIncomeYear34() * 1000 / sharesOutstandingYear34();
        }

        public decimal? earningsPerShare15PriceYear34()
        {
            return earningsPerSharePriceYear34() * 15;
        }

        public decimal? earningsPerShare20PriceYear34()
        {
            return earningsPerSharePriceYear34() * 20;
        }

        public decimal? dividendPerSharePriceYear34()
        {
            return sharesOutstandingYear34() == 0 ? null : dividendsYear34() * (-1000) / sharesOutstandingYear34();
        }
        #endregion
        #region // Year 5 Calculations for Column 3
        public decimal? assetGrowthRateYear35()
        {
            return strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.AssetGrowthRateYear5);
        }

        public decimal? newAcquisitionAssetsYear35()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewAcquisitionAssetsYear5);
        }

        public decimal? totalAssetsYear35()
        {
            return (totalAssetsYear34() * (1 + (assetGrowthRateYear35() / 100))) + newAcquisitionAssetsYear35();
        }

        public decimal? returnOnAverageAssetsYear35()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
            {
                return ((netIncomeYear35() / ((totalAssetsYear34() + totalAssetsYear35()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.ReturnOnAverageAssetsYear5);
        }

        public decimal? netIncomeYear35()
        {            
            if (strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario3.NetIncomeYear5;
            else
                return ((totalAssetsYear34() + totalAssetsYear35()) / 2) * (returnOnAverageAssetsYear35() / 100);
        }

        public decimal? dividendsRateYear35()
        {
            return strategicForecastSummaryData.SelectedScenario3.DividendsRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.DividendsRateYear5);
        }

        public decimal? dividendsYear35()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario3.DividendsYear5;
            else
                return netIncomeYear35() * (dividendsRateYear35() / 100);
        }

        public decimal? NewCapitalYear35()
        {
            return strategicForecastSummaryData.SelectedScenario3.NewCapitalYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.NewCapitalYear5);
        }

        public decimal? bankEquityCapitalYear35()
        {
            return bankEquityCapitalYear34() + netIncomeYear35() - dividendsYear35() + NewCapitalYear35();
        }

        public decimal? cet1CapitalAdjustmentYear35()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear35()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier1CapitalAdjustmentYear5;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear35()
        {
            return bankEquityCapitalYear35() + cet1CapitalAdjustmentYear35() + tier1CapitalAdjustmentYear35();
        }

        public decimal? tier1CapitalYear35()
        {
            return bankEquityCapitalYear35() + tier1CapitalAdjustmentYear35();
        }

        public decimal? tier2CapitalYear35()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario3.Tier2CapitalYear5;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear35();
        }

        public decimal? totalRiskBasedCapitalYear35()
        {
            return tier1CapitalYear35() + tier2CapitalYear35();
        }

        public decimal? riskWeightedAssetsYear35()
        {
            if (strategicForecastSummaryData.SelectedScenario3.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario3.RiskWeightedAssetsYear5;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear35();
            }
        }

        public decimal? totalAssetsForLeverageYear35()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear35();
        }

        public decimal? cet1CapitalRatioYear35()
        {
            return riskWeightedAssetsYear35() == 0 ? null : cet1CapitalYear35() / riskWeightedAssetsYear35();
        }

        public decimal? tier1RBCRatioYear35()
        {
            return (tier1CapitalYear35() / riskWeightedAssetsYear35()) * 100;
        }

        public decimal? totalCapitalRatioYear35()
        {
            return (totalRiskBasedCapitalYear35() / riskWeightedAssetsYear35()) * 100;
        }

        public decimal? tier1LeverageRatioYear35()
        {
            return totalAssetsForLeverageYear35() == 0 ? null : (tier1CapitalYear35() / totalAssetsForLeverageYear35()) * 100;
        }

        public decimal? returnOnAverageEquityYear35()
        {
            return (netIncomeYear35() / ((bankEquityCapitalYear35() + bankEquityCapitalYear34()) / 2)) * 100;
        }

        public decimal? mvEquityYear35()
        {
            return bankEquityCapitalYear35() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear35()
        {
            return strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario3.SharesOutstandingActualYear5);
        }

        public decimal? bvSharePriceYear35()
        {
            return sharesOutstandingYear35() == 0 ? null : bankEquityCapitalYear35() * 1000 / sharesOutstandingYear35();
        }

        public decimal? mvSharePriceYear35()
        {
            return sharesOutstandingYear35() == 0 ? null : mvEquityYear35() * 1000 / sharesOutstandingYear35();
        }

        public decimal? earningsPerSharePriceYear35()
        {
            return sharesOutstandingYear35() == 0 ? null : netIncomeYear35() * 1000 / sharesOutstandingYear35();
        }

        public decimal? earningsPerShare15PriceYear35()
        {
            return earningsPerSharePriceYear35() * 15;
        }

        public decimal? earningsPerShare20PriceYear35()
        {
            return earningsPerSharePriceYear35() * 20;
        }

        public decimal? dividendPerSharePriceYear35()
        {
            return sharesOutstandingYear35() == 0 ? null : dividendsYear35() * (-1000) / sharesOutstandingYear35();
        }
        #endregion

        #region  // Year 0 Calculations for Column 4
        public decimal? assetGrowthRateYear40()
        {
            return strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear0);
        }

        public decimal? newAcquisitionAssetsYear40()
        {
            if (strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear0 != null)
                return (strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear0);
            else
                return 0;
        }

        public decimal? totalAssetsYear40()
        {
            return ((dashboardConcepts.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear40() / 100))) + newAcquisitionAssetsYear40();
        }

        public decimal? returnOnAverageAssetsYear40()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
            {
                return ((netIncomeYear40() / ((dashboardConcepts.TotalAssetsPriorYear + totalAssetsYear40()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear0);
        }

        public decimal? netIncomeYear40()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario4.NetIncomeYear0;
            else
                return (((dashboardConcepts.TotalAssetsPriorYear) + totalAssetsYear40()) / 2) * (returnOnAverageAssetsYear40() / 100);
        }

        public decimal? dividendsRateYear40()
        {
            return strategicForecastSummaryData.SelectedScenario4.DividendsRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.DividendsRateYear0);
        }

        public decimal? dividendsYear40()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario4.DividendsYear0;
            else
                return netIncomeYear40() * (dividendsRateYear40() / 100);
        }

        public decimal? NewCapitalYear40()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear0);
        }

        public decimal? bankEquityCapitalYear40()
        {
            return (dashboardConcepts.BankEquityCapitalPriorYear) + netIncomeYear40() - dividendsYear40() + NewCapitalYear40();
        }

        public decimal? cet1CapitalAdjustmentYear40()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear40()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier1CapitalAdjustmentYear0;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear40()
        {
            return bankEquityCapitalYear40() + cet1CapitalAdjustmentYear40() + tier1CapitalAdjustmentYear40();
        }

        public decimal? tier1CapitalYear40()
        {
            return bankEquityCapitalYear40() + tier1CapitalAdjustmentYear40();
        }

        public decimal? tier2CapitalYear40()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier2CapitalYear0;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear40();
        }

        public decimal? totalRiskBasedCapitalYear40()
        {
            return tier1CapitalYear40() + tier2CapitalYear40();
        }

        public decimal? riskWeightedAssetsYear40()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario4.RiskWeightedAssetsYear0;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear40();
            }
        }

        public decimal? totalAssetsForLeverageYear40()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear40();
        }

        public decimal? cet1CapitalRatioYear40()
        {
            return riskWeightedAssetsYear40() == 0 ? null : cet1CapitalYear40() / riskWeightedAssetsYear40();
        }

        public decimal? tier1RBCRatioYear40()
        {
            return (tier1CapitalYear40() / riskWeightedAssetsYear40()) * 100;
        }

        public decimal? totalCapitalRatioYear40()
        {
            return (totalRiskBasedCapitalYear40() / riskWeightedAssetsYear40()) * 100;
        }

        public decimal? tier1LeverageRatioYear40()
        {
            return totalAssetsForLeverageYear40() == 0 ? null : (tier1CapitalYear40() / totalAssetsForLeverageYear40()) * 100;
        }

        public decimal? returnOnAverageEquityYear40()
        {
            return (netIncomeYear40() / ((bankEquityCapitalYear40() + (dashboardConcepts.BankEquityCapitalPriorYear)) / 2)) * 100;
        }

        public decimal? mvEquityYear40()
        {
            return bankEquityCapitalYear40() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear40()
        {
            return strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear0);
        }

        public decimal? bvSharePriceYear40()
        {
            return sharesOutstandingYear40() == 0 ? null : bankEquityCapitalYear40() * 1000 / sharesOutstandingYear40();
        }

        public decimal? mvSharePriceYear40()
        {
            return sharesOutstandingYear40() == 0 ? null : mvEquityYear40() * 1000 / sharesOutstandingYear40();
        }

        public decimal? earningsPerSharePriceYear40()
        {
            return sharesOutstandingYear40() == 0 ? null : netIncomeYear40() * 1000 / sharesOutstandingYear40();
        }

        public decimal? earningsPerShare15PriceYear40()
        {
            return earningsPerSharePriceYear40() * 15;
        }

        public decimal? earningsPerShare20PriceYear40()
        {
            return earningsPerSharePriceYear40() * 20;
        }

        public decimal? dividendPerSharePriceYear40()
        {
            return sharesOutstandingYear40() == 0 ? null : dividendsYear40() * (-1000) / sharesOutstandingYear40();
        }
        #endregion
        #region // Year 1 Calculations for Column 4
        public decimal? assetGrowthRateYear41()
        {
            return strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear1);
        }

        public decimal? newAcquisitionAssetsYear41()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear1);
        }

        public decimal? totalAssetsYear41()
        {
            return (totalAssetsYear40() * (1 + (assetGrowthRateYear41() / 100))) + newAcquisitionAssetsYear41();
        }

        public decimal? returnOnAverageAssetsYear41()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
            {
                return ((netIncomeYear41() / ((totalAssetsYear40() + totalAssetsYear41()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear1);
        }

        public decimal? netIncomeYear41()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario4.NetIncomeYear1;
            else
                return ((totalAssetsYear40() + totalAssetsYear41()) / 2) * (returnOnAverageAssetsYear41() / 100);
        }

        public decimal? dividendsRateYear41()
        {
            return strategicForecastSummaryData.SelectedScenario4.DividendsRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.DividendsRateYear1);
        }

        public decimal? dividendsYear41()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario4.DividendsYear1;
            else
                return netIncomeYear41() * (dividendsRateYear41() / 100);
        }

        public decimal? NewCapitalYear41()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear1);
        }

        public decimal? bankEquityCapitalYear41()
        {
            return bankEquityCapitalYear40() + netIncomeYear41() - dividendsYear41() + NewCapitalYear41();
        }

        public decimal? cet1CapitalAdjustmentYear41()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear41()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier1CapitalAdjustmentYear1;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear41()
        {
            return bankEquityCapitalYear41() + cet1CapitalAdjustmentYear41() + tier1CapitalAdjustmentYear41();
        }

        public decimal? tier1CapitalYear41()
        {
            return bankEquityCapitalYear41() + tier1CapitalAdjustmentYear41();
        }

        public decimal? tier2CapitalYear41()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier2CapitalYear1;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear41();
        }

        public decimal? totalRiskBasedCapitalYear41()
        {
            return tier1CapitalYear41() + tier2CapitalYear41();
        }

        public decimal? riskWeightedAssetsYear41()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario4.RiskWeightedAssetsYear1;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear41();
            }
        }

        public decimal? totalAssetsForLeverageYear41()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear41();
        }

        public decimal? cet1CapitalRatioYear41()
        {
            return riskWeightedAssetsYear41() == 0 ? null : cet1CapitalYear41() / riskWeightedAssetsYear41();
        }

        public decimal? tier1RBCRatioYear41()
        {
            return (tier1CapitalYear41() / riskWeightedAssetsYear41()) * 100;
        }

        public decimal? totalCapitalRatioYear41()
        {
            return (totalRiskBasedCapitalYear41() / riskWeightedAssetsYear41()) * 100;
        }

        public decimal? tier1LeverageRatioYear41()
        {
            return totalAssetsForLeverageYear41() == 0 ? null : (tier1CapitalYear41() / totalAssetsForLeverageYear41()) * 100;
        }

        public decimal? returnOnAverageEquityYear41()
        {
            return (netIncomeYear41() / ((bankEquityCapitalYear41() + bankEquityCapitalYear40()) / 2)) * 100;
        }

        public decimal? mvEquityYear41()
        {
            return bankEquityCapitalYear41() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear41()
        {
            return strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear1);
        }

        public decimal? bvSharePriceYear41()
        {
            return sharesOutstandingYear41() == 0 ? null : bankEquityCapitalYear41() * 1000 / sharesOutstandingYear41();
        }

        public decimal? mvSharePriceYear41()
        {
            return sharesOutstandingYear41() == 0 ? null : mvEquityYear41() * 1000 / sharesOutstandingYear41();
        }

        public decimal? earningsPerSharePriceYear41()
        {
            return sharesOutstandingYear41() == 0 ? null : netIncomeYear41() * 1000 / sharesOutstandingYear41();
        }

        public decimal? earningsPerShare15PriceYear41()
        {
            return earningsPerSharePriceYear41() * 15;
        }

        public decimal? earningsPerShare20PriceYear41()
        {
            return earningsPerSharePriceYear41() * 20;
        }

        public decimal? dividendPerSharePriceYear41()
        {
            return sharesOutstandingYear41() == 0 ? null : dividendsYear41() * (-1000) / sharesOutstandingYear41();
        }
        #endregion
        #region // Year 2 Calculations for Column 4
        public decimal? assetGrowthRateYear42()
        {
            return strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear2);
        }

        public decimal? newAcquisitionAssetsYear42()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear2);
        }

        public decimal? totalAssetsYear42()
        {
            return (totalAssetsYear41() * (1 + (assetGrowthRateYear42() / 100))) + newAcquisitionAssetsYear42();
        }

        public decimal? returnOnAverageAssetsYear42()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
            {
                return ((netIncomeYear42() / ((totalAssetsYear41() + totalAssetsYear42()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear2);
        }

        public decimal? netIncomeYear42()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario4.NetIncomeYear2;
            else
                return ((totalAssetsYear41() + totalAssetsYear42()) / 2) * (returnOnAverageAssetsYear42() / 100);
        }

        public decimal? dividendsRateYear42()
        {
            return strategicForecastSummaryData.SelectedScenario4.DividendsRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.DividendsRateYear2);
        }

        public decimal? dividendsYear42()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario4.DividendsYear2;
            else
                return netIncomeYear42() * (dividendsRateYear42() / 100);
        }

        public decimal? NewCapitalYear42()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear2);
        }

        public decimal? bankEquityCapitalYear42()
        {
            return bankEquityCapitalYear41() + netIncomeYear42() - dividendsYear42() + NewCapitalYear42();
        }

        public decimal? cet1CapitalAdjustmentYear42()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear42()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier1CapitalAdjustmentYear2;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear42()
        {
            return bankEquityCapitalYear42() + cet1CapitalAdjustmentYear42() + tier1CapitalAdjustmentYear42();
        }

        public decimal? tier1CapitalYear42()
        {
            return bankEquityCapitalYear42() + tier1CapitalAdjustmentYear42();
        }

        public decimal? tier2CapitalYear42()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier2CapitalYear2;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear42();
        }

        public decimal? totalRiskBasedCapitalYear42()
        {
            return tier1CapitalYear42() + tier2CapitalYear42();
        }

        public decimal? riskWeightedAssetsYear42()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario4.RiskWeightedAssetsYear2;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear42();
            }
        }

        public decimal? totalAssetsForLeverageYear42()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear42();
        }

        public decimal? cet1CapitalRatioYear42()
        {
            return riskWeightedAssetsYear42() == 0 ? null : cet1CapitalYear42() / riskWeightedAssetsYear42();
        }

        public decimal? tier1RBCRatioYear42()
        {
            return (tier1CapitalYear42() / riskWeightedAssetsYear42()) * 100;
        }

        public decimal? totalCapitalRatioYear42()
        {
            return (totalRiskBasedCapitalYear42() / riskWeightedAssetsYear42()) * 100;
        }

        public decimal? tier1LeverageRatioYear42()
        {
            return totalAssetsForLeverageYear42() == 0 ? null : (tier1CapitalYear42() / totalAssetsForLeverageYear42()) * 100;
        }

        public decimal? returnOnAverageEquityYear42()
        {
            return (netIncomeYear42() / ((bankEquityCapitalYear42() + bankEquityCapitalYear41()) / 2)) * 100;
        }

        public decimal? mvEquityYear42()
        {
            return bankEquityCapitalYear42() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear42()
        {
            return strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear2);
        }

        public decimal? bvSharePriceYear42()
        {
            return sharesOutstandingYear42() == 0 ? null : bankEquityCapitalYear42() * 1000 / sharesOutstandingYear42();
        }

        public decimal? mvSharePriceYear42()
        {
            return sharesOutstandingYear42() == 0 ? null : mvEquityYear42() * 1000 / sharesOutstandingYear42();
        }

        public decimal? earningsPerSharePriceYear42()
        {
            return sharesOutstandingYear42() == 0 ? null : netIncomeYear42() * 1000 / sharesOutstandingYear42();
        }

        public decimal? earningsPerShare15PriceYear42()
        {
            return earningsPerSharePriceYear42() * 15;
        }

        public decimal? earningsPerShare20PriceYear42()
        {
            return earningsPerSharePriceYear42() * 20;
        }

        public decimal? dividendPerSharePriceYear42()
        {
            return sharesOutstandingYear42() == 0 ? null : dividendsYear42() * (-1000) / sharesOutstandingYear42();
        }
        #endregion
        #region // Year 3 Calculations for Column 4
        public decimal? assetGrowthRateYear43()
        {
            return strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear3);
        }

        public decimal? newAcquisitionAssetsYear43()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear3);
        }

        public decimal? totalAssetsYear43()
        {
            return (totalAssetsYear42() * (1 + (assetGrowthRateYear43() / 100))) + newAcquisitionAssetsYear43();
        }

        public decimal? returnOnAverageAssetsYear43()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
            {
                return (netIncomeYear43() / ((totalAssetsYear42() + totalAssetsYear43()) / 2)) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear3);
        }

        public decimal? netIncomeYear43()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario4.NetIncomeYear3;
            else
                return ((totalAssetsYear42() + totalAssetsYear43()) / 2) * (returnOnAverageAssetsYear43() / 100);
        }

        public decimal? dividendsRateYear43()
        {
            return strategicForecastSummaryData.SelectedScenario4.DividendsRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.DividendsRateYear3);
        }

        public decimal? dividendsYear43()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario4.DividendsYear3;
            else
                return netIncomeYear43() * (dividendsRateYear43() / 100);
        }

        public decimal? NewCapitalYear43()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear3);
        }

        public decimal? bankEquityCapitalYear43()
        {
            return bankEquityCapitalYear42() + netIncomeYear43() - dividendsYear43() + NewCapitalYear43();
        }

        public decimal? cet1CapitalAdjustmentYear43()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear43()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier1CapitalAdjustmentYear3;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear43()
        {
            return bankEquityCapitalYear43() + cet1CapitalAdjustmentYear43() + tier1CapitalAdjustmentYear43();
        }

        public decimal? tier1CapitalYear43()
        {
            return bankEquityCapitalYear43() + tier1CapitalAdjustmentYear43();
        }

        public decimal? tier2CapitalYear43()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier2CapitalYear3;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear43();
        }

        public decimal? totalRiskBasedCapitalYear43()
        {
            return tier1CapitalYear43() + tier2CapitalYear43();
        }

        public decimal? riskWeightedAssetsYear43()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario4.RiskWeightedAssetsYear3;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear43();
            }
        }

        public decimal? totalAssetsForLeverageYear43()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear43();
        }

        public decimal? cet1CapitalRatioYear43()
        {
            return riskWeightedAssetsYear43() == 0 ? null : cet1CapitalYear43() / riskWeightedAssetsYear43();
        }

        public decimal? tier1RBCRatioYear43()
        {
            return (tier1CapitalYear43() / riskWeightedAssetsYear43()) * 100;
        }

        public decimal? totalCapitalRatioYear43()
        {
            return (totalRiskBasedCapitalYear43() / riskWeightedAssetsYear43()) * 100;
        }

        public decimal? tier1LeverageRatioYear43()
        {
            return totalAssetsForLeverageYear43() == 0 ? null : (tier1CapitalYear43() / totalAssetsForLeverageYear43()) * 100;
        }

        public decimal? returnOnAverageEquityYear43()
        {
            return (netIncomeYear43() / ((bankEquityCapitalYear43() + bankEquityCapitalYear42()) / 2)) * 100;
        }

        public decimal? mvEquityYear43()
        {
            return bankEquityCapitalYear43() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear43()
        {
            return strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear3);
        }

        public decimal? bvSharePriceYear43()
        {
            return sharesOutstandingYear43() == 0 ? null : bankEquityCapitalYear43() * 1000 / sharesOutstandingYear43();
        }

        public decimal? mvSharePriceYear43()
        {
            return sharesOutstandingYear43() == 0 ? null : mvEquityYear43() * 1000 / sharesOutstandingYear43();
        }

        public decimal? earningsPerSharePriceYear43()
        {
            return sharesOutstandingYear43() == 0 ? null : netIncomeYear43() * 1000 / sharesOutstandingYear43();
        }

        public decimal? earningsPerShare15PriceYear43()
        {
            return earningsPerSharePriceYear43() * 15;
        }

        public decimal? earningsPerShare20PriceYear43()
        {
            return earningsPerSharePriceYear43() * 20;
        }

        public decimal? dividendPerSharePriceYear43()
        {
            return sharesOutstandingYear43() == 0 ? null : dividendsYear43() * (-1000) / sharesOutstandingYear43();
        }

        #endregion
        #region// Year 4 Calculations for Column 4
        public decimal? assetGrowthRateYear44()
        {
            return strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear4);
        }

        public decimal? newAcquisitionAssetsYear44()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear4);
        }

        public decimal? totalAssetsYear44()
        {
            return (totalAssetsYear43() * (1 + (assetGrowthRateYear44() / 100))) + newAcquisitionAssetsYear44();
        }

        public decimal? returnOnAverageAssetsYear44()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
            {
                return ((netIncomeYear44() / ((totalAssetsYear43() + totalAssetsYear44()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear4);
        }

        public decimal? netIncomeYear44()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario4.NetIncomeYear4;
            else
                return ((totalAssetsYear43() + totalAssetsYear44()) / 2) * (returnOnAverageAssetsYear44() / 100);
        }

        public decimal? dividendsRateYear44()
        {
            return strategicForecastSummaryData.SelectedScenario4.DividendsRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.DividendsRateYear4);
        }

        public decimal? dividendsYear44()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario4.DividendsYear4;
            else
                return netIncomeYear44() * (dividendsRateYear44() / 100);
        }

        public decimal? NewCapitalYear44()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewCapitalYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear4);
        }

        public decimal? bankEquityCapitalYear44()
        {
            return bankEquityCapitalYear43() + netIncomeYear44() - dividendsYear44() + NewCapitalYear44();
        }

        public decimal? cet1CapitalAdjustmentYear44()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear44()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier1CapitalAdjustmentYear4;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear44()
        {
            return bankEquityCapitalYear44() + cet1CapitalAdjustmentYear44() + tier1CapitalAdjustmentYear44();
        }

        public decimal? tier1CapitalYear44()
        {
            return bankEquityCapitalYear44() + tier1CapitalAdjustmentYear44();
        }

        public decimal? tier2CapitalYear44()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier2CapitalYear4;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear44();
        }

        public decimal? totalRiskBasedCapitalYear44()
        {
            return tier1CapitalYear44() + tier2CapitalYear44();
        }

        public decimal? riskWeightedAssetsYear44()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario4.RiskWeightedAssetsYear4;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear44();
            }
        }

        public decimal? totalAssetsForLeverageYear44()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear44();
        }

        public decimal? cet1CapitalRatioYear44()
        {
            return riskWeightedAssetsYear44() == 0 ? null : cet1CapitalYear44() / riskWeightedAssetsYear44();
        }

        public decimal? tier1RBCRatioYear44()
        {
            return (tier1CapitalYear44() / riskWeightedAssetsYear44()) * 100;
        }

        public decimal? totalCapitalRatioYear44()
        {
            return (totalRiskBasedCapitalYear44() / riskWeightedAssetsYear44()) * 100;
        }

        public decimal? tier1LeverageRatioYear44()
        {
            return totalAssetsForLeverageYear44() == 0 ? null : (tier1CapitalYear44() / totalAssetsForLeverageYear44()) * 100;
        }

        public decimal? returnOnAverageEquityYear44()
        {
            return (netIncomeYear44() / ((bankEquityCapitalYear44() + bankEquityCapitalYear43()) / 2)) * 100;
        }

        public decimal? mvEquityYear44()
        {
            return bankEquityCapitalYear44() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear44()
        {
            return strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear4);
        }

        public decimal? bvSharePriceYear44()
        {
            return sharesOutstandingYear44() == 0 ? null : bankEquityCapitalYear44() * 1000 / sharesOutstandingYear44();
        }

        public decimal? mvSharePriceYear44()
        {
            return sharesOutstandingYear44() == 0 ? null : mvEquityYear44() * 1000 / sharesOutstandingYear44();
        }

        public decimal? earningsPerSharePriceYear44()
        {
            return sharesOutstandingYear44() == 0 ? null : netIncomeYear44() * 1000 / sharesOutstandingYear44();
        }

        public decimal? earningsPerShare15PriceYear44()
        {
            return earningsPerSharePriceYear44() * 15;
        }

        public decimal? earningsPerShare20PriceYear44()
        {
            return earningsPerSharePriceYear44() * 20;
        }

        public decimal? dividendPerSharePriceYear44()
        {
            return sharesOutstandingYear44() == 0 ? null : dividendsYear44() * (-1000) / sharesOutstandingYear44();
        }
        #endregion
        #region // Year 5 Calculations for Column 4
        public decimal? assetGrowthRateYear45()
        {
            return strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.AssetGrowthRateYear5);
        }

        public decimal? newAcquisitionAssetsYear45()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewAcquisitionAssetsYear5);
        }

        public decimal? totalAssetsYear45()
        {
            return (totalAssetsYear44() * (1 + (assetGrowthRateYear45() / 100))) + newAcquisitionAssetsYear45();
        }

        public decimal? returnOnAverageAssetsYear45()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
            {
                return ((netIncomeYear45() / ((totalAssetsYear44() + totalAssetsYear45()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.ReturnOnAverageAssetsYear5);
        }

        public decimal? netIncomeYear45()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario4.NetIncomeYear5;
            else
                return ((totalAssetsYear44() + totalAssetsYear45()) / 2) * (returnOnAverageAssetsYear45() / 100);
        }

        public decimal? dividendsRateYear45()
        {
            return strategicForecastSummaryData.SelectedScenario4.DividendsRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.DividendsRateYear5);
        }

        public decimal? dividendsYear45()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario4.DividendsYear5;
            else
                return netIncomeYear45() * (dividendsRateYear45() / 100);
        }

        public decimal? NewCapitalYear45()
        {
            return strategicForecastSummaryData.SelectedScenario4.NewCapitalYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.NewCapitalYear5);
        }

        public decimal? bankEquityCapitalYear45()
        {
            return bankEquityCapitalYear44() + netIncomeYear45() - dividendsYear45() + NewCapitalYear45();
        }

        public decimal? cet1CapitalAdjustmentYear45()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear45()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier1CapitalAdjustmentYear5;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear45()
        {
            return bankEquityCapitalYear45() + cet1CapitalAdjustmentYear45() + tier1CapitalAdjustmentYear45();
        }

        public decimal? tier1CapitalYear45()
        {
            return bankEquityCapitalYear45() + tier1CapitalAdjustmentYear45();
        }

        public decimal? tier2CapitalYear45()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario4.Tier2CapitalYear5;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear45();
        }

        public decimal? totalRiskBasedCapitalYear45()
        {
            return tier1CapitalYear45() + tier2CapitalYear45();
        }

        public decimal? riskWeightedAssetsYear45()
        {
            if (strategicForecastSummaryData.SelectedScenario4.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario4.RiskWeightedAssetsYear5;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear45();
            }
        }

        public decimal? totalAssetsForLeverageYear45()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear45();
        }

        public decimal? cet1CapitalRatioYear45()
        {
            return riskWeightedAssetsYear45() == 0 ? null : cet1CapitalYear45() / riskWeightedAssetsYear45();
        }

        public decimal? tier1RBCRatioYear45()
        {
            return (tier1CapitalYear45() / riskWeightedAssetsYear45()) * 100;
        }

        public decimal? totalCapitalRatioYear45()
        {
            return (totalRiskBasedCapitalYear45() / riskWeightedAssetsYear45()) * 100;
        }

        public decimal? tier1LeverageRatioYear45()
        {
            return totalAssetsForLeverageYear45() == 0 ? null : (tier1CapitalYear45() / totalAssetsForLeverageYear45()) * 100;
        }

        public decimal? returnOnAverageEquityYear45()
        {
            return (netIncomeYear45() / ((bankEquityCapitalYear45() + bankEquityCapitalYear44()) / 2)) * 100;
        }

        public decimal? mvEquityYear45()
        {
            return bankEquityCapitalYear45() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear45()
        {
            return strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario4.SharesOutstandingActualYear5);
        }

        public decimal? bvSharePriceYear45()
        {
            return sharesOutstandingYear45() == 0 ? null : bankEquityCapitalYear45() * 1000 / sharesOutstandingYear45();
        }

        public decimal? mvSharePriceYear45()
        {
            return sharesOutstandingYear45() == 0 ? null : mvEquityYear45() * 1000 / sharesOutstandingYear45();
        }

        public decimal? earningsPerSharePriceYear45()
        {
            return sharesOutstandingYear45() == 0 ? null : netIncomeYear45() * 1000 / sharesOutstandingYear45();
        }

        public decimal? earningsPerShare15PriceYear45()
        {
            return earningsPerSharePriceYear45() * 15;
        }

        public decimal? earningsPerShare20PriceYear45()
        {
            return earningsPerSharePriceYear45() * 20;
        }

        public decimal? dividendPerSharePriceYear45()
        {
            return sharesOutstandingYear45() == 0 ? null : dividendsYear45() * (-1000) / sharesOutstandingYear45();
        }
        #endregion

        #region // Year 0 Calculations for Column 5
        public decimal? assetGrowthRateYear50()
        {
            return strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear0);
        }

        public decimal? newAcquisitionAssetsYear50()
        {
            if (strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear0 != null)
                return (strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear0);
            else
                return 0;
        }

        public decimal? totalAssetsYear50()
        {
            return ((dashboardConcepts.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear50() / 100))) + newAcquisitionAssetsYear50();
        }

        public decimal? returnOnAverageAssetsYear50()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
            {
                return ((netIncomeYear50() / ((dashboardConcepts.TotalAssetsPriorYear + totalAssetsYear50()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear0);
        }

        public decimal? netIncomeYear50()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario5.NetIncomeYear0;
            else
                return (((dashboardConcepts.TotalAssetsPriorYear) + totalAssetsYear50()) / 2) * (returnOnAverageAssetsYear50() / 100);
        }

        public decimal? dividendsRateYear50()
        {
            return strategicForecastSummaryData.SelectedScenario5.DividendsRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.DividendsRateYear0);
        }

        public decimal? dividendsYear50()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario5.DividendsYear0;
            else
                return netIncomeYear50() * (dividendsRateYear50() / 100);
        }

        public decimal? NewCapitalYear50()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear0);
        }

        public decimal? bankEquityCapitalYear50()
        {
            return (dashboardConcepts.BankEquityCapitalPriorYear) + netIncomeYear50() - dividendsYear50() + NewCapitalYear50();
        }

        public decimal? cet1CapitalAdjustmentYear50()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear50()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier1CapitalAdjustmentYear0;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear50()
        {
            return bankEquityCapitalYear50() + cet1CapitalAdjustmentYear50() + tier1CapitalAdjustmentYear50();
        }

        public decimal? tier1CapitalYear50()
        {
            return bankEquityCapitalYear50() + tier1CapitalAdjustmentYear50();
        }

        public decimal? tier2CapitalYear50()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier2CapitalYear0;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear50();
        }

        public decimal? totalRiskBasedCapitalYear50()
        {
            return tier1CapitalYear50() + tier2CapitalYear50();
        }

        public decimal? riskWeightedAssetsYear50()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario5.RiskWeightedAssetsYear0;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear50();
            }
        }

        public decimal? totalAssetsForLeverageYear50()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear50();
        }

        public decimal? cet1CapitalRatioYear50()
        {
            return riskWeightedAssetsYear50() == 0 ? null : cet1CapitalYear50() / riskWeightedAssetsYear50();
        }

        public decimal? tier1RBCRatioYear50()
        {
            return (tier1CapitalYear50() / riskWeightedAssetsYear50()) * 100;
        }

        public decimal? totalCapitalRatioYear50()
        {
            return (totalRiskBasedCapitalYear50() / riskWeightedAssetsYear50()) * 100;
        }

        public decimal? tier1LeverageRatioYear50()
        {
            return totalAssetsForLeverageYear50() == 0 ? null : (tier1CapitalYear50() / totalAssetsForLeverageYear50()) * 100;
        }

        public decimal? returnOnAverageEquityYear50()
        {
            return (netIncomeYear50() / ((bankEquityCapitalYear50() + (dashboardConcepts.BankEquityCapitalPriorYear)) / 2)) * 100;
        }

        public decimal? mvEquityYear50()
        {
            return bankEquityCapitalYear50() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear50()
        {
            return strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear0);
        }

        public decimal? bvSharePriceYear50()
        {
            return sharesOutstandingYear50() == 0 ? null : bankEquityCapitalYear50() * 1000 / sharesOutstandingYear50();
        }

        public decimal? mvSharePriceYear50()
        {
            return sharesOutstandingYear50() == 0 ? null : mvEquityYear50() * 1000 / sharesOutstandingYear50();
        }

        public decimal? earningsPerSharePriceYear50()
        {
            return sharesOutstandingYear50() == 0 ? null : netIncomeYear50() * 1000 / sharesOutstandingYear50();
        }

        public decimal? earningsPerShare15PriceYear50()
        {
            return earningsPerSharePriceYear50() * 15;
        }

        public decimal? earningsPerShare20PriceYear50()
        {
            return earningsPerSharePriceYear50() * 20;
        }

        public decimal? dividendPerSharePriceYear50()
        {
            return sharesOutstandingYear50() == 0 ? null : dividendsYear50() * (-1000) / sharesOutstandingYear50();
        }
        #endregion
        #region // Year 1 Calculations for Column 5
        public decimal? assetGrowthRateYear51()
        {
            return strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear1);
        }

        public decimal? newAcquisitionAssetsYear51()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear1);
        }

        public decimal? totalAssetsYear51()
        {
            return (totalAssetsYear50() * (1 + (assetGrowthRateYear51() / 100))) + newAcquisitionAssetsYear51();
        }

        public decimal? returnOnAverageAssetsYear51()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
            {
                return ((netIncomeYear51() / ((totalAssetsYear50() + totalAssetsYear51()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear1);
        }

        public decimal? netIncomeYear51()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario5.NetIncomeYear1;
            else
                return ((totalAssetsYear50() + totalAssetsYear51()) / 2) * (returnOnAverageAssetsYear51() / 100);
        }

        public decimal? dividendsRateYear51()
        {
            return strategicForecastSummaryData.SelectedScenario5.DividendsRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.DividendsRateYear1);
        }

        public decimal? dividendsYear51()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario5.DividendsYear1;
            else
                return netIncomeYear51() * (dividendsRateYear51() / 100);
        }

        public decimal? NewCapitalYear51()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear1);
        }

        public decimal? bankEquityCapitalYear51()
        {
            return bankEquityCapitalYear50() + netIncomeYear51() - dividendsYear51() + NewCapitalYear51();
        }

        public decimal? cet1CapitalAdjustmentYear51()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear51()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier1CapitalAdjustmentYear1;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear51()
        {
            return bankEquityCapitalYear51() + cet1CapitalAdjustmentYear51() + tier1CapitalAdjustmentYear51();
        }

        public decimal? tier1CapitalYear51()
        {
            return bankEquityCapitalYear51() + tier1CapitalAdjustmentYear51();
        }

        public decimal? tier2CapitalYear51()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier2CapitalYear1;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear51();
        }

        public decimal? totalRiskBasedCapitalYear51()
        {
            return tier1CapitalYear51() + tier2CapitalYear51();
        }

        public decimal? riskWeightedAssetsYear51()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario5.RiskWeightedAssetsYear1;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear51();
            }
        }

        public decimal? totalAssetsForLeverageYear51()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear51();
        }

        public decimal? cet1CapitalRatioYear51()
        {
            return riskWeightedAssetsYear51() == 0 ? null : cet1CapitalYear51() / riskWeightedAssetsYear51();
        }

        public decimal? tier1RBCRatioYear51()
        {
            return (tier1CapitalYear51() / riskWeightedAssetsYear51()) * 100;
        }

        public decimal? totalCapitalRatioYear51()
        {
            return (totalRiskBasedCapitalYear51() / riskWeightedAssetsYear51()) * 100;
        }

        public decimal? tier1LeverageRatioYear51()
        {
            return totalAssetsForLeverageYear51() == 0 ? null : (tier1CapitalYear51() / totalAssetsForLeverageYear51()) * 100;
        }

        public decimal? returnOnAverageEquityYear51()
        {
            return (netIncomeYear51() / ((bankEquityCapitalYear51() + bankEquityCapitalYear50()) / 2)) * 100;
        }

        public decimal? mvEquityYear51()
        {
            return bankEquityCapitalYear51() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear51()
        {
            return strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear1);
        }

        public decimal? bvSharePriceYear51()
        {
            return sharesOutstandingYear51() == 0 ? null : bankEquityCapitalYear51() * 1000 / sharesOutstandingYear51();
        }

        public decimal? mvSharePriceYear51()
        {
            return sharesOutstandingYear51() == 0 ? null : mvEquityYear51() * 1000 / sharesOutstandingYear51();
        }

        public decimal? earningsPerSharePriceYear51()
        {
            return sharesOutstandingYear51() == 0 ? null : netIncomeYear51() * 1000 / sharesOutstandingYear51();
        }

        public decimal? earningsPerShare15PriceYear51()
        {
            return earningsPerSharePriceYear51() * 15;
        }

        public decimal? earningsPerShare20PriceYear51()
        {
            return earningsPerSharePriceYear51() * 20;
        }

        public decimal? dividendPerSharePriceYear51()
        {
            return sharesOutstandingYear51() == 0 ? null : dividendsYear51() * (-1000) / sharesOutstandingYear51();
        }
        #endregion
        #region    // Year 2 Calculations for Column 5
        public decimal? assetGrowthRateYear52()
        {
            return strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear2);
        }

        public decimal? newAcquisitionAssetsYear52()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear2);
        }

        public decimal? totalAssetsYear52()
        {
            return (totalAssetsYear51() * (1 + (assetGrowthRateYear52() / 100))) + newAcquisitionAssetsYear52();
        }

        public decimal? returnOnAverageAssetsYear52()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
            {
                return ((netIncomeYear52() / ((totalAssetsYear51() + totalAssetsYear52()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear2);
        }

        public decimal? netIncomeYear52()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario5.NetIncomeYear2;
            else
                return ((totalAssetsYear51() + totalAssetsYear52()) / 2) * (returnOnAverageAssetsYear52() / 100);
        }

        public decimal? dividendsRateYear52()
        {
            return strategicForecastSummaryData.SelectedScenario5.DividendsRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.DividendsRateYear2);
        }

        public decimal? dividendsYear52()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario5.DividendsYear2;
            else
                return netIncomeYear52() * (dividendsRateYear52() / 100);
        }

        public decimal? NewCapitalYear52()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear2);
        }

        public decimal? bankEquityCapitalYear52()
        {
            return bankEquityCapitalYear51() + netIncomeYear52() - dividendsYear52() + NewCapitalYear52();
        }

        public decimal? cet1CapitalAdjustmentYear52()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear52()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier1CapitalAdjustmentYear2;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear52()
        {
            return bankEquityCapitalYear52() + cet1CapitalAdjustmentYear52() + tier1CapitalAdjustmentYear52();
        }

        public decimal? tier1CapitalYear52()
        {
            return bankEquityCapitalYear52() + tier1CapitalAdjustmentYear52();
        }

        public decimal? tier2CapitalYear52()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier2CapitalYear2;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear52();
        }

        public decimal? totalRiskBasedCapitalYear52()
        {
            return tier1CapitalYear52() + tier2CapitalYear52();
        }

        public decimal? riskWeightedAssetsYear52()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario5.RiskWeightedAssetsYear2;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear52();
            }
        }

        public decimal? totalAssetsForLeverageYear52()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear52();
        }

        public decimal? cet1CapitalRatioYear52()
        {
            return riskWeightedAssetsYear52() == 0 ? null : cet1CapitalYear52() / riskWeightedAssetsYear52();
        }

        public decimal? tier1RBCRatioYear52()
        {
            return (tier1CapitalYear52() / riskWeightedAssetsYear52()) * 100;
        }

        public decimal? totalCapitalRatioYear52()
        {
            return (totalRiskBasedCapitalYear52() / riskWeightedAssetsYear52()) * 100;
        }

        public decimal? tier1LeverageRatioYear52()
        {
            return totalAssetsForLeverageYear52() == 0 ? null : (tier1CapitalYear52() / totalAssetsForLeverageYear52()) * 100;
        }

        public decimal? returnOnAverageEquityYear52()
        {
            return (netIncomeYear52() / ((bankEquityCapitalYear52() + bankEquityCapitalYear51()) / 2)) * 100;
        }

        public decimal? mvEquityYear52()
        {
            return bankEquityCapitalYear52() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear52()
        {
            return strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear2);
        }

        public decimal? bvSharePriceYear52()
        {
            return sharesOutstandingYear52() == 0 ? null : bankEquityCapitalYear52() * 1000 / sharesOutstandingYear52();
        }

        public decimal? mvSharePriceYear52()
        {
            return sharesOutstandingYear52() == 0 ? null : mvEquityYear52() * 1000 / sharesOutstandingYear52();
        }

        public decimal? earningsPerSharePriceYear52()
        {
            return sharesOutstandingYear52() == 0 ? null : netIncomeYear52() * 1000 / sharesOutstandingYear52();
        }

        public decimal? earningsPerShare15PriceYear52()
        {
            return earningsPerSharePriceYear52() * 15;
        }

        public decimal? earningsPerShare20PriceYear52()
        {
            return earningsPerSharePriceYear52() * 20;
        }

        public decimal? dividendPerSharePriceYear52()
        {
            return sharesOutstandingYear52() == 0 ? null : dividendsYear52() * (-1000) / sharesOutstandingYear52();
        }
        #endregion
        #region  // Year 3 Calculations for Column 5
        public decimal? assetGrowthRateYear53()
        {
            return strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear3);
        }

        public decimal? newAcquisitionAssetsYear53()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear3);
        }

        public decimal? totalAssetsYear53()
        {
            return (totalAssetsYear52() * (1 + (assetGrowthRateYear53() / 100))) + newAcquisitionAssetsYear53();
        }

        public decimal? returnOnAverageAssetsYear53()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
            {
                return (netIncomeYear53() / ((totalAssetsYear52() + totalAssetsYear53()) / 2)) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear3);
        }

        public decimal? netIncomeYear53()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario5.NetIncomeYear3;
            else
                return ((totalAssetsYear52() + totalAssetsYear53()) / 2) * (returnOnAverageAssetsYear53() / 100);
        }

        public decimal? dividendsRateYear53()
        {
            return strategicForecastSummaryData.SelectedScenario5.DividendsRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.DividendsRateYear3);
        }

        public decimal? dividendsYear53()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario5.DividendsYear3;
            else
                return netIncomeYear53() * (dividendsRateYear53() / 100);
        }

        public decimal? NewCapitalYear53()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear3);
        }

        public decimal? bankEquityCapitalYear53()
        {
            return bankEquityCapitalYear52() + netIncomeYear53() - dividendsYear53() + NewCapitalYear53();
        }

        public decimal? cet1CapitalAdjustmentYear53()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear53()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier1CapitalAdjustmentYear3;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear53()
        {
            return bankEquityCapitalYear53() + cet1CapitalAdjustmentYear53() + tier1CapitalAdjustmentYear53();
        }

        public decimal? tier1CapitalYear53()
        {
            return bankEquityCapitalYear53() + tier1CapitalAdjustmentYear53();
        }

        public decimal? tier2CapitalYear53()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier2CapitalYear3;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear53();
        }

        public decimal? totalRiskBasedCapitalYear53()
        {
            return tier1CapitalYear53() + tier2CapitalYear53();
        }

        public decimal? riskWeightedAssetsYear53()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario5.RiskWeightedAssetsYear3;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear53();
            }
        }

        public decimal? totalAssetsForLeverageYear53()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear53();
        }

        public decimal? cet1CapitalRatioYear53()
        {
            return riskWeightedAssetsYear53() == 0 ? null : cet1CapitalYear53() / riskWeightedAssetsYear53();
        }

        public decimal? tier1RBCRatioYear53()
        {
            return (tier1CapitalYear53() / riskWeightedAssetsYear53()) * 100;
        }

        public decimal? totalCapitalRatioYear53()
        {
            return (totalRiskBasedCapitalYear53() / riskWeightedAssetsYear53()) * 100;
        }

        public decimal? tier1LeverageRatioYear53()
        {
            return totalAssetsForLeverageYear53() == 0 ? null : (tier1CapitalYear53() / totalAssetsForLeverageYear53()) * 100;
        }

        public decimal? returnOnAverageEquityYear53()
        {
            return (netIncomeYear53() / ((bankEquityCapitalYear53() + bankEquityCapitalYear52()) / 2)) * 100;
        }

        public decimal? mvEquityYear53()
        {
            return bankEquityCapitalYear53() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear53()
        {
            return strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear3);
        }

        public decimal? bvSharePriceYear53()
        {
            return sharesOutstandingYear53() == 0 ? null : bankEquityCapitalYear53() * 1000 / sharesOutstandingYear53();
        }

        public decimal? mvSharePriceYear53()
        {
            return sharesOutstandingYear53() == 0 ? null : mvEquityYear53() * 1000 / sharesOutstandingYear53();
        }

        public decimal? earningsPerSharePriceYear53()
        {
            return sharesOutstandingYear53() == 0 ? null : netIncomeYear53() * 1000 / sharesOutstandingYear53();
        }

        public decimal? earningsPerShare15PriceYear53()
        {
            return earningsPerSharePriceYear53() * 15;
        }

        public decimal? earningsPerShare20PriceYear53()
        {
            return earningsPerSharePriceYear53() * 20;
        }

        public decimal? dividendPerSharePriceYear53()
        {
            return sharesOutstandingYear53() == 0 ? null : dividendsYear53() * (-1000) / sharesOutstandingYear53();
        }
        #endregion
        #region  // Year 4 Calculations for Column 5
        public decimal? assetGrowthRateYear54()
        {
            return strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear4);
        }

        public decimal? newAcquisitionAssetsYear54()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear4);
        }

        public decimal? totalAssetsYear54()
        {
            return (totalAssetsYear53() * (1 + (assetGrowthRateYear54() / 100))) + newAcquisitionAssetsYear54();
        }

        public decimal? returnOnAverageAssetsYear54()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
            {
                return ((netIncomeYear54() / ((totalAssetsYear53() + totalAssetsYear54()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear4);
        }

        public decimal? netIncomeYear54()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario5.NetIncomeYear4;
            else
                return ((totalAssetsYear53() + totalAssetsYear54()) / 2) * (returnOnAverageAssetsYear54() / 100);
        }

        public decimal? dividendsRateYear54()
        {
            return strategicForecastSummaryData.SelectedScenario5.DividendsRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.DividendsRateYear4);
        }

        public decimal? dividendsYear54()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario5.DividendsYear4;
            else
                return netIncomeYear54() * (dividendsRateYear54() / 100);
        }

        public decimal? NewCapitalYear54()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewCapitalYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear4);
        }

        public decimal? bankEquityCapitalYear54()
        {
            return bankEquityCapitalYear53() + netIncomeYear54() - dividendsYear54() + NewCapitalYear54();
        }

        public decimal? cet1CapitalAdjustmentYear54()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear54()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier1CapitalAdjustmentYear4;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear54()
        {
            return bankEquityCapitalYear54() + cet1CapitalAdjustmentYear54() + tier1CapitalAdjustmentYear54();
        }

        public decimal? tier1CapitalYear54()
        {
            return bankEquityCapitalYear54() + tier1CapitalAdjustmentYear54();
        }

        public decimal? tier2CapitalYear54()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier2CapitalYear4;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear54();
        }

        public decimal? totalRiskBasedCapitalYear54()
        {
            return tier1CapitalYear54() + tier2CapitalYear54();
        }

        public decimal? riskWeightedAssetsYear54()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario5.RiskWeightedAssetsYear4;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear54();
            }
        }

        public decimal? totalAssetsForLeverageYear54()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear54();
        }

        public decimal? cet1CapitalRatioYear54()
        {
            return riskWeightedAssetsYear54() == 0 ? null : cet1CapitalYear54() / riskWeightedAssetsYear54();
        }

        public decimal? tier1RBCRatioYear54()
        {
            return (tier1CapitalYear54() / riskWeightedAssetsYear54()) * 100;
        }

        public decimal? totalCapitalRatioYear54()
        {
            return (totalRiskBasedCapitalYear54() / riskWeightedAssetsYear54()) * 100;
        }

        public decimal? tier1LeverageRatioYear54()
        {
            return totalAssetsForLeverageYear54() == 0 ? null : (tier1CapitalYear54() / totalAssetsForLeverageYear54()) * 100;
        }

        public decimal? returnOnAverageEquityYear54()
        {
            return (netIncomeYear54() / ((bankEquityCapitalYear54() + bankEquityCapitalYear53()) / 2)) * 100;
        }

        public decimal? mvEquityYear54()
        {
            return bankEquityCapitalYear54() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear54()
        {
            return strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear4);
        }

        public decimal? bvSharePriceYear54()
        {
            return sharesOutstandingYear54() == 0 ? null : bankEquityCapitalYear54() * 1000 / sharesOutstandingYear54();
        }

        public decimal? mvSharePriceYear54()
        {
            return sharesOutstandingYear54() == 0 ? null : mvEquityYear54() * 1000 / sharesOutstandingYear54();
        }

        public decimal? earningsPerSharePriceYear54()
        {
            return sharesOutstandingYear54() == 0 ? null : netIncomeYear54() * 1000 / sharesOutstandingYear54();
        }

        public decimal? earningsPerShare15PriceYear54()
        {
            return earningsPerSharePriceYear54() * 15;
        }

        public decimal? earningsPerShare20PriceYear54()
        {
            return earningsPerSharePriceYear54() * 20;
        }

        public decimal? dividendPerSharePriceYear54()
        {
            return sharesOutstandingYear54() == 0 ? null : dividendsYear54() * (-1000) / sharesOutstandingYear54();
        }
        #endregion
        #region   // Year 5 Calculations for Column 5
        public decimal? assetGrowthRateYear55()
        {
            return strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.AssetGrowthRateYear5);
        }

        public decimal? newAcquisitionAssetsYear55()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewAcquisitionAssetsYear5);
        }

        public decimal? totalAssetsYear55()
        {
            return (totalAssetsYear54() * (1 + (assetGrowthRateYear55() / 100))) + newAcquisitionAssetsYear55();
        }

        public decimal? returnOnAverageAssetsYear55()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
            {
                return ((netIncomeYear55() / ((totalAssetsYear54() + totalAssetsYear55()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.ReturnOnAverageAssetsYear5);
        }

        public decimal? netIncomeYear55()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario5.NetIncomeYear5;
            else
                return ((totalAssetsYear54() + totalAssetsYear55()) / 2) * (returnOnAverageAssetsYear55() / 100);
        }

        public decimal? dividendsRateYear55()
        {
            return strategicForecastSummaryData.SelectedScenario5.DividendsRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.DividendsRateYear5);
        }

        public decimal? dividendsYear55()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario5.DividendsYear5;
            else
                return netIncomeYear55() * (dividendsRateYear55() / 100);
        }

        public decimal? NewCapitalYear55()
        {
            return strategicForecastSummaryData.SelectedScenario5.NewCapitalYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.NewCapitalYear5);
        }

        public decimal? bankEquityCapitalYear55()
        {
            return bankEquityCapitalYear54() + netIncomeYear55() - dividendsYear55() + NewCapitalYear55();
        }

        public decimal? cet1CapitalAdjustmentYear55()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear55()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier1CapitalAdjustmentYear5;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear55()
        {
            return bankEquityCapitalYear55() + cet1CapitalAdjustmentYear55() + tier1CapitalAdjustmentYear55();
        }

        public decimal? tier1CapitalYear55()
        {
            return bankEquityCapitalYear55() + tier1CapitalAdjustmentYear55();
        }

        public decimal? tier2CapitalYear55()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario5.Tier2CapitalYear5;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear55();
        }

        public decimal? totalRiskBasedCapitalYear55()
        {
            return tier1CapitalYear55() + tier2CapitalYear55();
        }

        public decimal? riskWeightedAssetsYear55()
        {
            if (strategicForecastSummaryData.SelectedScenario5.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario5.RiskWeightedAssetsYear5;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear55();
            }
        }

        public decimal? totalAssetsForLeverageYear55()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear55();
        }

        public decimal? cet1CapitalRatioYear55()
        {
            return riskWeightedAssetsYear55() == 0 ? null : cet1CapitalYear55() / riskWeightedAssetsYear55();
        }

        public decimal? tier1RBCRatioYear55()
        {
            return (tier1CapitalYear55() / riskWeightedAssetsYear55()) * 100;
        }

        public decimal? totalCapitalRatioYear55()
        {
            return (totalRiskBasedCapitalYear55() / riskWeightedAssetsYear55()) * 100;
        }

        public decimal? tier1LeverageRatioYear55()
        {
            return totalAssetsForLeverageYear55() == 0 ? null : (tier1CapitalYear55() / totalAssetsForLeverageYear55()) * 100;
        }

        public decimal? returnOnAverageEquityYear55()
        {
            return (netIncomeYear55() / ((bankEquityCapitalYear55() + bankEquityCapitalYear54()) / 2)) * 100;
        }

        public decimal? mvEquityYear55()
        {
            return bankEquityCapitalYear55() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear55()
        {
            return strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario5.SharesOutstandingActualYear5);
        }

        public decimal? bvSharePriceYear55()
        {
            return sharesOutstandingYear55() == 0 ? null : bankEquityCapitalYear55() * 1000 / sharesOutstandingYear55();
        }

        public decimal? mvSharePriceYear55()
        {
            return sharesOutstandingYear55() == 0 ? null : mvEquityYear55() * 1000 / sharesOutstandingYear55();
        }

        public decimal? earningsPerSharePriceYear55()
        {
            return sharesOutstandingYear55() == 0 ? null : netIncomeYear55() * 1000 / sharesOutstandingYear55();
        }

        public decimal? earningsPerShare15PriceYear55()
        {
            return earningsPerSharePriceYear55() * 15;
        }

        public decimal? earningsPerShare20PriceYear55()
        {
            return earningsPerSharePriceYear55() * 20;
        }

        public decimal? dividendPerSharePriceYear55()
        {
            return sharesOutstandingYear55() == 0 ? null : dividendsYear55() * (-1000) / sharesOutstandingYear55();
        }
        #endregion

        #region  // Year 0 Calculations for Column 6
        public decimal? assetGrowthRateYear60()
        {
            return strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear0);
        }

        public decimal? newAcquisitionAssetsYear60()
        {
            if (strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear0 != null)
                return (strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear0);
            else
                return 0;
        }

        public decimal? totalAssetsYear60()
        {
            return ((dashboardConcepts.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear60() / 100))) + newAcquisitionAssetsYear60();
        }

        public decimal? returnOnAverageAssetsYear60()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
            {
                return ((netIncomeYear60() / ((dashboardConcepts.TotalAssetsPriorYear + totalAssetsYear60()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear0);
        }

        public decimal? netIncomeYear60()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario6.NetIncomeYear0;
            else
                return (((dashboardConcepts.TotalAssetsPriorYear) + totalAssetsYear60()) / 2) * (returnOnAverageAssetsYear60() / 100);
        }

        public decimal? dividendsRateYear60()
        {
            return strategicForecastSummaryData.SelectedScenario6.DividendsRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.DividendsRateYear0);
        }

        public decimal? dividendsYear60()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario6.DividendsYear0;
            else
                return netIncomeYear60() * (dividendsRateYear60() / 100);
        }

        public decimal? newCapitalYear60()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear0);
        }

        public decimal? bankEquityCapitalYear60()
        {
            return (dashboardConcepts.BankEquityCapitalPriorYear) + netIncomeYear60() - dividendsYear60() + newCapitalYear60();
        }

        public decimal? cet1CapitalAdjustmentYear60()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear60()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier1CapitalAdjustmentYear0;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear60()
        {
            return bankEquityCapitalYear60() + cet1CapitalAdjustmentYear60() + tier1CapitalAdjustmentYear60();
        }

        public decimal? tier1CapitalYear60()
        {
            return bankEquityCapitalYear60() + tier1CapitalAdjustmentYear60();
        }

        public decimal? tier2CapitalYear60()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier2CapitalYear0;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear60();
        }

        public decimal? totalRiskBasedCapitalYear60()
        {
            return tier1CapitalYear60() + tier2CapitalYear60();
        }

        public decimal? riskWeightedAssetsYear60()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario6.RiskWeightedAssetsYear0;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear60();
            }
        }

        public decimal? totalAssetsForLeverageYear60()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear60();
        }

        public decimal? cet1CapitalRatioYear60()
        {
            return riskWeightedAssetsYear60() == 0 ? null : cet1CapitalYear60() / riskWeightedAssetsYear60();
        }

        public decimal? tier1RBCRatioYear60()
        {
            return (tier1CapitalYear60() / riskWeightedAssetsYear60()) * 100;
        }

        public decimal? totalCapitalRatioYear60()
        {
            return (totalRiskBasedCapitalYear60() / riskWeightedAssetsYear60()) * 100;
        }

        public decimal? tier1LeverageRatioYear60()
        {
            return totalAssetsForLeverageYear60() == 0 ? null : (tier1CapitalYear60() / totalAssetsForLeverageYear60()) * 100;
        }

        public decimal? returnOnAverageEquityYear60()
        {
            return (netIncomeYear60() / ((bankEquityCapitalYear60() + (dashboardConcepts.BankEquityCapitalPriorYear)) / 2)) * 100;
        }

        public decimal? mvEquityYear60()
        {
            return bankEquityCapitalYear60() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear60()
        {
            return strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear0);
        }

        public decimal? bvSharePriceYear60()
        {
            return sharesOutstandingYear60() == 0 ? null : bankEquityCapitalYear60() * 1000 / sharesOutstandingYear60();
        }

        public decimal? mvSharePriceYear60()
        {
            return sharesOutstandingYear60() == 0 ? null : mvEquityYear60() * 1000 / sharesOutstandingYear60();
        }

        public decimal? earningsPerSharePriceYear60()
        {
            return sharesOutstandingYear60() == 0 ? null : netIncomeYear60() * 1000 / sharesOutstandingYear60();
        }

        public decimal? earningsPerShare15PriceYear60()
        {
            return earningsPerSharePriceYear60() * 15;
        }

        public decimal? earningsPerShare20PriceYear60()
        {
            return earningsPerSharePriceYear60() * 20;
        }

        public decimal? dividendPerSharePriceYear60()
        {
            return sharesOutstandingYear60() == 0 ? null : dividendsYear60() * (-1000) / sharesOutstandingYear60();
        }
        #endregion
        #region // Year 1 Calculations for Column 6
        public decimal? assetGrowthRateYear61()
        {
            return strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear1);
        }

        public decimal? newAcquisitionAssetsYear61()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear1);
        }

        public decimal? totalAssetsYear61()
        {
            return (totalAssetsYear60() * (1 + (assetGrowthRateYear61() / 100))) + newAcquisitionAssetsYear61();
        }

        public decimal? returnOnAverageAssetsYear61()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
            {
                return ((netIncomeYear61() / ((totalAssetsYear60() + totalAssetsYear61()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear1);
        }

        public decimal? netIncomeYear61()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario6.NetIncomeYear1;
            else
                return ((totalAssetsYear60() + totalAssetsYear61()) / 2) * (returnOnAverageAssetsYear61() / 100);
        }

        public decimal? dividendsRateYear61()
        {
            return strategicForecastSummaryData.SelectedScenario6.DividendsRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.DividendsRateYear1);
        }

        public decimal? dividendsYear61()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario6.DividendsYear1;
            else
                return netIncomeYear61() * (dividendsRateYear61() / 100);
        }

        public decimal? newCapitalYear61()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear1);
        }

        public decimal? bankEquityCapitalYear61()
        {
            return bankEquityCapitalYear60() + netIncomeYear61() - dividendsYear61() + newCapitalYear61();
        }

        public decimal? cet1CapitalAdjustmentYear61()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear61()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier1CapitalAdjustmentYear1;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear61()
        {
            return bankEquityCapitalYear61() + cet1CapitalAdjustmentYear61() + tier1CapitalAdjustmentYear61();
        }

        public decimal? tier1CapitalYear61()
        {
            return bankEquityCapitalYear61() + tier1CapitalAdjustmentYear61();
        }

        public decimal? tier2CapitalYear61()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier2CapitalYear1;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear61();
        }

        public decimal? totalRiskBasedCapitalYear61()
        {
            return tier1CapitalYear61() + tier2CapitalYear61();
        }

        public decimal? riskWeightedAssetsYear61()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario6.RiskWeightedAssetsYear1;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear61();
            }
        }

        public decimal? totalAssetsForLeverageYear61()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear61();
        }

        public decimal? cet1CapitalRatioYear61()
        {
            return riskWeightedAssetsYear61() == 0 ? null : cet1CapitalYear61() / riskWeightedAssetsYear61();
        }

        public decimal? tier1RBCRatioYear61()
        {
            return (tier1CapitalYear61() / riskWeightedAssetsYear61()) * 100;
        }

        public decimal? totalCapitalRatioYear61()
        {
            return (totalRiskBasedCapitalYear61() / riskWeightedAssetsYear61()) * 100;
        }

        public decimal? tier1LeverageRatioYear61()
        {
            return totalAssetsForLeverageYear61() == 0 ? null : (tier1CapitalYear61() / totalAssetsForLeverageYear61()) * 100;
        }

        public decimal? returnOnAverageEquityYear61()
        {
            return (netIncomeYear61() / ((bankEquityCapitalYear61() + bankEquityCapitalYear60()) / 2)) * 100;
        }

        public decimal? mvEquityYear61()
        {
            return bankEquityCapitalYear61() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear61()
        {
            return strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear1);
        }

        public decimal? bvSharePriceYear61()
        {
            return sharesOutstandingYear61() == 0 ? null : bankEquityCapitalYear61() * 1000 / sharesOutstandingYear61();
        }

        public decimal? mvSharePriceYear61()
        {
            return sharesOutstandingYear61() == 0 ? null : mvEquityYear61() * 1000 / sharesOutstandingYear61();
        }

        public decimal? earningsPerSharePriceYear61()
        {
            return sharesOutstandingYear61() == 0 ? null : netIncomeYear61() * 1000 / sharesOutstandingYear61();
        }

        public decimal? earningsPerShare15PriceYear61()
        {
            return earningsPerSharePriceYear61() * 15;
        }

        public decimal? earningsPerShare20PriceYear61()
        {
            return earningsPerSharePriceYear61() * 20;
        }

        public decimal? dividendPerSharePriceYear61()
        {
            return sharesOutstandingYear61() == 0 ? null : dividendsYear61() * (-1000) / sharesOutstandingYear61();
        }
        #endregion
        #region // Year 2 Calculations for Column 6
        public decimal? assetGrowthRateYear62()
        {
            return strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear2);
        }

        public decimal? newAcquisitionAssetsYear62()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear2);
        }

        public decimal? totalAssetsYear62()
        {
            return (totalAssetsYear61() * (1 + (assetGrowthRateYear62() / 100))) + newAcquisitionAssetsYear62();
        }

        public decimal? returnOnAverageAssetsYear62()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
            {
                return ((netIncomeYear62() / ((totalAssetsYear61() + totalAssetsYear62()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear2);
        }

        public decimal? netIncomeYear62()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario6.NetIncomeYear2;
            else
                return ((totalAssetsYear61() + totalAssetsYear62()) / 2) * (returnOnAverageAssetsYear62() / 100);
        }

        public decimal? dividendsRateYear62()
        {
            return strategicForecastSummaryData.SelectedScenario6.DividendsRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.DividendsRateYear2);
        }

        public decimal? dividendsYear62()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario6.DividendsYear2;
            else
                return netIncomeYear62() * (dividendsRateYear62() / 100);
        }

        public decimal? newCapitalYear62()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear2);
        }

        public decimal? bankEquityCapitalYear62()
        {
            return bankEquityCapitalYear61() + netIncomeYear62() - dividendsYear62() + newCapitalYear62();
        }

        public decimal? cet1CapitalAdjustmentYear62()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear62()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier1CapitalAdjustmentYear2;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear62()
        {
            return bankEquityCapitalYear62() + cet1CapitalAdjustmentYear62() + tier1CapitalAdjustmentYear62();
        }

        public decimal? tier1CapitalYear62()
        {
            return bankEquityCapitalYear62() + tier1CapitalAdjustmentYear62();
        }

        public decimal? tier2CapitalYear62()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier2CapitalYear2;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear62();
        }

        public decimal? totalRiskBasedCapitalYear62()
        {
            return tier1CapitalYear62() + tier2CapitalYear62();
        }

        public decimal? riskWeightedAssetsYear62()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario6.RiskWeightedAssetsYear2;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear62();
            }
        }

        public decimal? totalAssetsForLeverageYear62()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear62();
        }

        public decimal? cet1CapitalRatioYear62()
        {
            return riskWeightedAssetsYear62() == 0 ? null : cet1CapitalYear62() / riskWeightedAssetsYear62();
        }

        public decimal? tier1RBCRatioYear62()
        {
            return (tier1CapitalYear62() / riskWeightedAssetsYear62()) * 100;
        }

        public decimal? totalCapitalRatioYear62()
        {
            return (totalRiskBasedCapitalYear62() / riskWeightedAssetsYear62()) * 100;
        }

        public decimal? tier1LeverageRatioYear62()
        {
            return totalAssetsForLeverageYear62() == 0 ? null : (tier1CapitalYear62() / totalAssetsForLeverageYear62()) * 100;
        }

        public decimal? returnOnAverageEquityYear62()
        {
            return (netIncomeYear62() / ((bankEquityCapitalYear62() + bankEquityCapitalYear61()) / 2)) * 100;
        }

        public decimal? mvEquityYear62()
        {
            return bankEquityCapitalYear62() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear62()
        {
            return strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear2);
        }

        public decimal? bvSharePriceYear62()
        {
            return sharesOutstandingYear62() == 0 ? null : bankEquityCapitalYear62() * 1000 / sharesOutstandingYear62();
        }

        public decimal? mvSharePriceYear62()
        {
            return sharesOutstandingYear62() == 0 ? null : mvEquityYear62() * 1000 / sharesOutstandingYear62();
        }

        public decimal? earningsPerSharePriceYear62()
        {
            return sharesOutstandingYear62() == 0 ? null : netIncomeYear62() * 1000 / sharesOutstandingYear62();
        }

        public decimal? earningsPerShare15PriceYear62()
        {
            return earningsPerSharePriceYear62() * 15;
        }

        public decimal? earningsPerShare20PriceYear62()
        {
            return earningsPerSharePriceYear62() * 20;
        }

        public decimal? dividendPerSharePriceYear62()
        {
            return sharesOutstandingYear62() == 0 ? null : dividendsYear62() * (-1000) / sharesOutstandingYear62();
        }
        #endregion
        #region // Year 3 Calculations for Column 6
        public decimal? assetGrowthRateYear63()
        {
            return strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear3);
        }

        public decimal? newAcquisitionAssetsYear63()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear3);
        }

        public decimal? totalAssetsYear63()
        {
            return (totalAssetsYear62() * (1 + (assetGrowthRateYear63() / 100))) + newAcquisitionAssetsYear63();
        }

        public decimal? returnOnAverageAssetsYear63()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
            {
                return (netIncomeYear63() / ((totalAssetsYear62() + totalAssetsYear63()) / 2)) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear3);
        }

        public decimal? netIncomeYear63()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario6.NetIncomeYear3;
            else
                return ((totalAssetsYear62() + totalAssetsYear63()) / 2) * (returnOnAverageAssetsYear63() / 100);
        }

        public decimal? dividendsRateYear63()
        {
            return strategicForecastSummaryData.SelectedScenario6.DividendsRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.DividendsRateYear3);
        }

        public decimal? dividendsYear63()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario6.DividendsYear3;
            else
                return netIncomeYear63() * (dividendsRateYear63() / 100);
        }

        public decimal? newCapitalYear63()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear3);
        }

        public decimal? bankEquityCapitalYear63()
        {
            return bankEquityCapitalYear62() + netIncomeYear63() - dividendsYear63() + newCapitalYear63();
        }

        public decimal? cet1CapitalAdjustmentYear63()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear63()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier1CapitalAdjustmentYear3;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear63()
        {
            return bankEquityCapitalYear63() + cet1CapitalAdjustmentYear63() + tier1CapitalAdjustmentYear63();
        }

        public decimal? tier1CapitalYear63()
        {
            return bankEquityCapitalYear63() + tier1CapitalAdjustmentYear63();
        }

        public decimal? tier2CapitalYear63()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier2CapitalYear3;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear63();
        }

        public decimal? totalRiskBasedCapitalYear63()
        {
            return tier1CapitalYear63() + tier2CapitalYear63();
        }

        public decimal? riskWeightedAssetsYear63()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario6.RiskWeightedAssetsYear3;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear63();
            }
        }

        public decimal? totalAssetsForLeverageYear63()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear63();
        }

        public decimal? cet1CapitalRatioYear63()
        {
            return riskWeightedAssetsYear63() == 0 ? null : cet1CapitalYear63() / riskWeightedAssetsYear63();
        }

        public decimal? tier1RBCRatioYear63()
        {
            return (tier1CapitalYear63() / riskWeightedAssetsYear63()) * 100;
        }

        public decimal? totalCapitalRatioYear63()
        {
            return (totalRiskBasedCapitalYear63() / riskWeightedAssetsYear63()) * 100;
        }

        public decimal? tier1LeverageRatioYear63()
        {
            return totalAssetsForLeverageYear63() == 0 ? null : (tier1CapitalYear63() / totalAssetsForLeverageYear63()) * 100;
        }

        public decimal? returnOnAverageEquityYear63()
        {
            return (netIncomeYear63() / ((bankEquityCapitalYear63() + bankEquityCapitalYear62()) / 2)) * 100;
        }

        public decimal? mvEquityYear63()
        {
            return bankEquityCapitalYear63() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear63()
        {
            return strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear3);
        }

        public decimal? bvSharePriceYear63()
        {
            return sharesOutstandingYear63() == 0 ? null : bankEquityCapitalYear63() * 1000 / sharesOutstandingYear63();
        }

        public decimal? mvSharePriceYear63()
        {
            return sharesOutstandingYear63() == 0 ? null : mvEquityYear63() * 1000 / sharesOutstandingYear63();
        }

        public decimal? earningsPerSharePriceYear63()
        {
            return sharesOutstandingYear63() == 0 ? null : netIncomeYear63() * 1000 / sharesOutstandingYear63();
        }

        public decimal? earningsPerShare15PriceYear63()
        {
            return earningsPerSharePriceYear63() * 15;
        }

        public decimal? earningsPerShare20PriceYear63()
        {
            return earningsPerSharePriceYear63() * 20;
        }

        public decimal? dividendPerSharePriceYear63()
        {
            return sharesOutstandingYear63() == 0 ? null : dividendsYear63() * (-1000) / sharesOutstandingYear63();
        }
        #endregion
        #region   // Year 4 Calculations for Column 6
        public decimal? assetGrowthRateYear64()
        {
            return strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear4);
        }

        public decimal? newAcquisitionAssetsYear64()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear4);
        }

        public decimal? totalAssetsYear64()
        {
            return (totalAssetsYear63() * (1 + (assetGrowthRateYear64() / 100))) + newAcquisitionAssetsYear64();
        }

        public decimal? returnOnAverageAssetsYear64()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
            {
                return ((netIncomeYear64() / ((totalAssetsYear63() + totalAssetsYear64()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear4);
        }

        public decimal? netIncomeYear64()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario6.NetIncomeYear4;
            else
                return ((totalAssetsYear63() + totalAssetsYear64()) / 2) * (returnOnAverageAssetsYear64() / 100);
        }

        public decimal? dividendsRateYear64()
        {
            return strategicForecastSummaryData.SelectedScenario6.DividendsRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.DividendsRateYear4);
        }

        public decimal? dividendsYear64()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario6.DividendsYear4;
            else
                return netIncomeYear64() * (dividendsRateYear64() / 100);
        }

        public decimal? newCapitalYear64()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewCapitalYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear4);
        }

        public decimal? bankEquityCapitalYear64()
        {
            return bankEquityCapitalYear63() + netIncomeYear64() - dividendsYear64() + newCapitalYear64();
        }

        public decimal? cet1CapitalAdjustmentYear64()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear64()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier1CapitalAdjustmentYear4;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear64()
        {
            return bankEquityCapitalYear64() + cet1CapitalAdjustmentYear64() + tier1CapitalAdjustmentYear64();
        }

        public decimal? tier1CapitalYear64()
        {
            return bankEquityCapitalYear64() + tier1CapitalAdjustmentYear64();
        }

        public decimal? tier2CapitalYear64()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier2CapitalYear4;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear64();
        }

        public decimal? totalRiskBasedCapitalYear64()
        {
            return tier1CapitalYear64() + tier2CapitalYear64();
        }

        public decimal? riskWeightedAssetsYear64()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario6.RiskWeightedAssetsYear4;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear64();
            }
        }

        public decimal? totalAssetsForLeverageYear64()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear64();
        }

        public decimal? cet1CapitalRatioYear64()
        {
            return riskWeightedAssetsYear64() == 0 ? null : cet1CapitalYear64() / riskWeightedAssetsYear64();
        }

        public decimal? tier1RBCRatioYear64()
        {
            return (tier1CapitalYear64() / riskWeightedAssetsYear64()) * 100;
        }

        public decimal? totalCapitalRatioYear64()
        {
            return (totalRiskBasedCapitalYear64() / riskWeightedAssetsYear64()) * 100;
        }

        public decimal? tier1LeverageRatioYear64()
        {
            return totalAssetsForLeverageYear64() == 0 ? null : (tier1CapitalYear64() / totalAssetsForLeverageYear64()) * 100;
        }

        public decimal? returnOnAverageEquityYear64()
        {
            return (netIncomeYear64() / ((bankEquityCapitalYear64() + bankEquityCapitalYear63()) / 2)) * 100;
        }

        public decimal? mvEquityYear64()
        {
            return bankEquityCapitalYear64() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear64()
        {
            return strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear4);
        }

        public decimal? bvSharePriceYear64()
        {
            return sharesOutstandingYear64() == 0 ? null : bankEquityCapitalYear64() * 1000 / sharesOutstandingYear64();
        }

        public decimal? mvSharePriceYear64()
        {
            return sharesOutstandingYear64() == 0 ? null : mvEquityYear64() * 1000 / sharesOutstandingYear64();
        }

        public decimal? earningsPerSharePriceYear64()
        {
            return sharesOutstandingYear64() == 0 ? null : netIncomeYear64() * 1000 / sharesOutstandingYear64();
        }

        public decimal? earningsPerShare15PriceYear64()
        {
            return earningsPerSharePriceYear64() * 15;
        }

        public decimal? earningsPerShare20PriceYear64()
        {
            return earningsPerSharePriceYear64() * 20;
        }

        public decimal? dividendPerSharePriceYear64()
        {
            return sharesOutstandingYear64() == 0 ? null : dividendsYear64() * (-1000) / sharesOutstandingYear64();
        }
        #endregion
        #region  // Year 5 Calculations for Column 6
        public decimal? assetGrowthRateYear65()
        {
            return strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.AssetGrowthRateYear5);
        }

        public decimal? newAcquisitionAssetsYear65()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewAcquisitionAssetsYear5);
        }

        public decimal? totalAssetsYear65()
        {
            return (totalAssetsYear64() * (1 + (assetGrowthRateYear65() / 100))) + newAcquisitionAssetsYear65();
        }

        public decimal? returnOnAverageAssetsYear65()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
            {
                return ((netIncomeYear65() / ((totalAssetsYear64() + totalAssetsYear65()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.ReturnOnAverageAssetsYear5);
        }

        public decimal? netIncomeYear65()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario6.NetIncomeYear5;
            else
                return ((totalAssetsYear64() + totalAssetsYear65()) / 2) * (returnOnAverageAssetsYear65() / 100);
        }

        public decimal? dividendsRateYear65()
        {
            return strategicForecastSummaryData.SelectedScenario6.DividendsRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.DividendsRateYear5);
        }

        public decimal? dividendsYear65()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario6.DividendsYear5;
            else
                return netIncomeYear65() * (dividendsRateYear65() / 100);
        }

        public decimal? newCapitalYear65()
        {
            return strategicForecastSummaryData.SelectedScenario6.NewCapitalYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.NewCapitalYear5);
        }

        public decimal? bankEquityCapitalYear65()
        {
            return bankEquityCapitalYear64() + netIncomeYear65() - dividendsYear65() + newCapitalYear65();
        }

        public decimal? cet1CapitalAdjustmentYear65()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear65()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier1CapitalAdjustmentYear5;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear65()
        {
            return bankEquityCapitalYear65() + cet1CapitalAdjustmentYear65() + tier1CapitalAdjustmentYear65();
        }

        public decimal? tier1CapitalYear65()
        {
            return bankEquityCapitalYear65() + tier1CapitalAdjustmentYear65();
        }

        public decimal? tier2CapitalYear65()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario6.Tier2CapitalYear5;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear65();
        }

        public decimal? totalRiskBasedCapitalYear65()
        {
            return tier1CapitalYear65() + tier2CapitalYear65();
        }

        public decimal? riskWeightedAssetsYear65()
        {
            if (strategicForecastSummaryData.SelectedScenario6.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario6.RiskWeightedAssetsYear5;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear65();
            }
        }

        public decimal? totalAssetsForLeverageYear65()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear65();
        }

        public decimal? cet1CapitalRatioYear65()
        {
            return riskWeightedAssetsYear65() == 0 ? null : cet1CapitalYear65() / riskWeightedAssetsYear65();
        }

        public decimal? tier1RBCRatioYear65()
        {
            return (tier1CapitalYear65() / riskWeightedAssetsYear65()) * 100;
        }

        public decimal? totalCapitalRatioYear65()
        {
            return (totalRiskBasedCapitalYear65() / riskWeightedAssetsYear65()) * 100;
        }

        public decimal? tier1LeverageRatioYear65()
        {
            return totalAssetsForLeverageYear65() == 0 ? null : (tier1CapitalYear65() / totalAssetsForLeverageYear65()) * 100;
        }

        public decimal? returnOnAverageEquityYear65()
        {
            return (netIncomeYear65() / ((bankEquityCapitalYear65() + bankEquityCapitalYear64()) / 2)) * 100;
        }

        public decimal? mvEquityYear65()
        {
            return bankEquityCapitalYear65() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear65()
        {
            return strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario6.SharesOutstandingActualYear5);
        }

        public decimal? bvSharePriceYear65()
        {
            return sharesOutstandingYear65() == 0 ? null : bankEquityCapitalYear65() * 1000 / sharesOutstandingYear65();
        }

        public decimal? mvSharePriceYear65()
        {
            return sharesOutstandingYear65() == 0 ? null : mvEquityYear65() * 1000 / sharesOutstandingYear65();
        }

        public decimal? earningsPerSharePriceYear65()
        {
            return sharesOutstandingYear65() == 0 ? null : netIncomeYear65() * 1000 / sharesOutstandingYear65();
        }

        public decimal? earningsPerShare15PriceYear65()
        {
            return earningsPerSharePriceYear65() * 15;
        }

        public decimal? earningsPerShare20PriceYear65()
        {
            return earningsPerSharePriceYear65() * 20;
        }

        public decimal? dividendPerSharePriceYear65()
        {
            return sharesOutstandingYear65() == 0 ? null : dividendsYear65() * (-1000) / sharesOutstandingYear65();
        }
        #endregion

        #region  // Year 0 Calculations for Column 7
        public decimal? assetGrowthRateYear70()
        {
            return strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear0);
        }

        public decimal? newAcquisitionAssetsYear70()
        {
            if (strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear0 != null)
                return (strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear0);
            else
                return 0;
        }

        public decimal? totalAssetsYear70()
        {
            return ((dashboardConcepts.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear70() / 100))) + newAcquisitionAssetsYear70();
        }

        public decimal? returnOnAverageAssetsYear70()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
            {
                return ((netIncomeYear70() / ((dashboardConcepts.TotalAssetsPriorYear + totalAssetsYear70()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear0);
        }

        public decimal? netIncomeYear70()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario7.NetIncomeYear0;
            else
                return (((dashboardConcepts.TotalAssetsPriorYear) + totalAssetsYear70()) / 2) * (returnOnAverageAssetsYear70() / 100);
        }

        public decimal? dividendsRateYear70()
        {
            return strategicForecastSummaryData.SelectedScenario7.DividendsRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.DividendsRateYear0);
        }

        public decimal? dividendsYear70()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario7.DividendsYear0;
            else
                return netIncomeYear70() * (dividendsRateYear70() / 100);
        }

        public decimal? newCapitalYear70()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear0);
        }

        public decimal? bankEquityCapitalYear70()
        {
            return (dashboardConcepts.BankEquityCapitalPriorYear) + netIncomeYear70() - dividendsYear70() + newCapitalYear70();
        }

        public decimal? cet1CapitalAdjustmentYear70()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear70()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier1CapitalAdjustmentYear0;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear70()
        {
            return bankEquityCapitalYear70() + cet1CapitalAdjustmentYear70() + tier1CapitalAdjustmentYear70();
        }

        public decimal? tier1CapitalYear70()
        {
            return bankEquityCapitalYear70() + tier1CapitalAdjustmentYear70();
        }

        public decimal? tier2CapitalYear70()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier2CapitalYear0;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear70();
        }

        public decimal? totalRiskBasedCapitalYear70()
        {
            return tier1CapitalYear70() + tier2CapitalYear70();
        }

        public decimal? riskWeightedAssetsYear70()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario7.RiskWeightedAssetsYear0;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear70();
            }
        }

        public decimal? totalAssetsForLeverageYear70()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear70();
        }

        public decimal? cet1CapitalRatioYear70()
        {
            return riskWeightedAssetsYear70() == 0 ? null : cet1CapitalYear70() / riskWeightedAssetsYear70();
        }

        public decimal? tier1RBCRatioYear70()
        {
            return (tier1CapitalYear70() / riskWeightedAssetsYear70()) * 100;
        }

        public decimal? totalCapitalRatioYear70()
        {
            return (totalRiskBasedCapitalYear70() / riskWeightedAssetsYear70()) * 100;
        }

        public decimal? tier1LeverageRatioYear70()
        {
            return totalAssetsForLeverageYear70() == 0 ? null : (tier1CapitalYear70() / totalAssetsForLeverageYear70()) * 100;
        }

        public decimal? returnOnAverageEquityYear70()
        {
            return (netIncomeYear70() / ((bankEquityCapitalYear70() + (dashboardConcepts.BankEquityCapitalPriorYear)) / 2)) * 100;
        }

        public decimal? mvEquityYear70()
        {
            return bankEquityCapitalYear70() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear70()
        {
            return strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear0);
        }

        public decimal? bvSharePriceYear70()
        {
            return sharesOutstandingYear70() == 0 ? null : bankEquityCapitalYear70() * 1000 / sharesOutstandingYear70();
        }

        public decimal? mvSharePriceYear70()
        {
            return sharesOutstandingYear70() == 0 ? null : mvEquityYear70() * 1000 / sharesOutstandingYear70();
        }

        public decimal? earningsPerSharePriceYear70()
        {
            return sharesOutstandingYear70() == 0 ? null : netIncomeYear70() * 1000 / sharesOutstandingYear70();
        }

        public decimal? earningsPerShare15PriceYear70()
        {
            return earningsPerSharePriceYear70() * 15;
        }

        public decimal? earningsPerShare20PriceYear70()
        {
            return earningsPerSharePriceYear70() * 20;
        }

        public decimal? dividendPerSharePriceYear70()
        {
            return sharesOutstandingYear70() == 0 ? null : dividendsYear70() * (-1000) / sharesOutstandingYear70();
        }
        #endregion
        #region  // Year 1 Calculations for Column 7
        public decimal? assetGrowthRateYear71()
        {
            return strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear1);
        }

        public decimal? newAcquisitionAssetsYear71()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear1);
        }

        public decimal? totalAssetsYear71()
        {
            return (totalAssetsYear70() * (1 + (assetGrowthRateYear71() / 100))) + newAcquisitionAssetsYear71();
        }

        public decimal? returnOnAverageAssetsYear71()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
            {
                return ((netIncomeYear71() / ((totalAssetsYear70() + totalAssetsYear71()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear1);
        }

        public decimal? netIncomeYear71()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario7.NetIncomeYear1;
            else
                return ((totalAssetsYear70() + totalAssetsYear71()) / 2) * (returnOnAverageAssetsYear71() / 100);
        }

        public decimal? dividendsRateYear71()
        {
            return strategicForecastSummaryData.SelectedScenario7.DividendsRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.DividendsRateYear1);
        }

        public decimal? dividendsYear71()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario7.DividendsYear1;
            else
                return netIncomeYear71() * (dividendsRateYear71() / 100);
        }

        public decimal? newCapitalYear71()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear1);
        }

        public decimal? bankEquityCapitalYear71()
        {
            return bankEquityCapitalYear70() + netIncomeYear71() - dividendsYear71() + newCapitalYear71();
        }

        public decimal? cet1CapitalAdjustmentYear71()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear71()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier1CapitalAdjustmentYear1;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear71()
        {
            return bankEquityCapitalYear71() + cet1CapitalAdjustmentYear71() + tier1CapitalAdjustmentYear71();
        }

        public decimal? tier1CapitalYear71()
        {
            return bankEquityCapitalYear71() + tier1CapitalAdjustmentYear71();
        }

        public decimal? tier2CapitalYear71()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier2CapitalYear1;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear71();
        }

        public decimal? totalRiskBasedCapitalYear71()
        {
            return tier1CapitalYear71() + tier2CapitalYear71();
        }

        public decimal? riskWeightedAssetsYear71()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario7.RiskWeightedAssetsYear1;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear71();
            }
        }

        public decimal? totalAssetsForLeverageYear71()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear71();
        }

        public decimal? cet1CapitalRatioYear71()
        {
            return riskWeightedAssetsYear71() == 0 ? null : cet1CapitalYear71() / riskWeightedAssetsYear71();
        }

        public decimal? tier1RBCRatioYear71()
        {
            return (tier1CapitalYear71() / riskWeightedAssetsYear71()) * 100;
        }

        public decimal? totalCapitalRatioYear71()
        {
            return (totalRiskBasedCapitalYear71() / riskWeightedAssetsYear71()) * 100;
        }

        public decimal? tier1LeverageRatioYear71()
        {
            return totalAssetsForLeverageYear71() == 0 ? null : (tier1CapitalYear71() / totalAssetsForLeverageYear71()) * 100;
        }

        public decimal? returnOnAverageEquityYear71()
        {
            return (netIncomeYear71() / ((bankEquityCapitalYear71() + bankEquityCapitalYear70()) / 2)) * 100;
        }

        public decimal? mvEquityYear71()
        {
            return bankEquityCapitalYear71() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear71()
        {
            return strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear1);
        }

        public decimal? bvSharePriceYear71()
        {
            return sharesOutstandingYear71() == 0 ? null : bankEquityCapitalYear71() * 1000 / sharesOutstandingYear71();
        }

        public decimal? mvSharePriceYear71()
        {
            return sharesOutstandingYear71() == 0 ? null : mvEquityYear71() * 1000 / sharesOutstandingYear71();
        }

        public decimal? earningsPerSharePriceYear71()
        {
            return sharesOutstandingYear71() == 0 ? null : netIncomeYear71() * 1000 / sharesOutstandingYear71();
        }

        public decimal? earningsPerShare15PriceYear71()
        {
            return earningsPerSharePriceYear71() * 15;
        }

        public decimal? earningsPerShare20PriceYear71()
        {
            return earningsPerSharePriceYear71() * 20;
        }

        public decimal? dividendPerSharePriceYear71()
        {
            return sharesOutstandingYear71() == 0 ? null : dividendsYear71() * (-1000) / sharesOutstandingYear71();
        }
        #endregion
        #region  // Year 2 Calculations for Column 7
        public decimal? assetGrowthRateYear72()
        {
            return strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear2);
        }

        public decimal? newAcquisitionAssetsYear72()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear2);
        }

        public decimal? totalAssetsYear72()
        {
            return (totalAssetsYear71() * (1 + (assetGrowthRateYear72() / 100))) + newAcquisitionAssetsYear72();
        }

        public decimal? returnOnAverageAssetsYear72()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
            {
                return ((netIncomeYear72() / ((totalAssetsYear71() + totalAssetsYear72()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear2);
        }

        public decimal? netIncomeYear72()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario7.NetIncomeYear2;
            else
                return ((totalAssetsYear71() + totalAssetsYear72()) / 2) * (returnOnAverageAssetsYear72() / 100);
        }

        public decimal? dividendsRateYear72()
        {
            return strategicForecastSummaryData.SelectedScenario7.DividendsRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.DividendsRateYear2);
        }

        public decimal? dividendsYear72()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario7.DividendsYear2;
            else
                return netIncomeYear72() * (dividendsRateYear72() / 100);
        }

        public decimal? newCapitalYear72()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear2);
        }

        public decimal? bankEquityCapitalYear72()
        {
            return bankEquityCapitalYear71() + netIncomeYear72() - dividendsYear72() + newCapitalYear72();
        }

        public decimal? cet1CapitalAdjustmentYear72()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear72()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier1CapitalAdjustmentYear2;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear72()
        {
            return bankEquityCapitalYear72() + cet1CapitalAdjustmentYear72() + tier1CapitalAdjustmentYear72();
        }

        public decimal? tier1CapitalYear72()
        {
            return bankEquityCapitalYear72() + tier1CapitalAdjustmentYear72();
        }

        public decimal? tier2CapitalYear72()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier2CapitalYear2;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear72();
        }

        public decimal? totalRiskBasedCapitalYear72()
        {
            return tier1CapitalYear72() + tier2CapitalYear72();
        }

        public decimal? riskWeightedAssetsYear72()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario7.RiskWeightedAssetsYear2;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear72();
            }
        }

        public decimal? totalAssetsForLeverageYear72()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear72();
        }

        public decimal? cet1CapitalRatioYear72()
        {
            return riskWeightedAssetsYear72() == 0 ? null : cet1CapitalYear72() / riskWeightedAssetsYear72();
        }

        public decimal? tier1RBCRatioYear72()
        {
            return (tier1CapitalYear72() / riskWeightedAssetsYear72()) * 100;
        }

        public decimal? totalCapitalRatioYear72()
        {
            return (totalRiskBasedCapitalYear72() / riskWeightedAssetsYear72()) * 100;
        }

        public decimal? totalCapitalRatioYear73()
        {
            return (totalRiskBasedCapitalYear73() / riskWeightedAssetsYear73()) * 100;
        }

        public decimal? tier1LeverageRatioYear72()
        {
            return totalAssetsForLeverageYear72() == 0 ? null : (tier1CapitalYear72() / totalAssetsForLeverageYear72()) * 100;
        }

        public decimal? returnOnAverageEquityYear72()
        {
            return (netIncomeYear72() / ((bankEquityCapitalYear72() + bankEquityCapitalYear71()) / 2)) * 100;
        }

        public decimal? mvEquityYear72()
        {
            return bankEquityCapitalYear72() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear72()
        {
            return strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear2);
        }

        public decimal? bvSharePriceYear72()
        {
            return sharesOutstandingYear72() == 0 ? null : bankEquityCapitalYear72() * 1000 / sharesOutstandingYear72();
        }

        public decimal? mvSharePriceYear72()
        {
            return sharesOutstandingYear72() == 0 ? null : mvEquityYear72() * 1000 / sharesOutstandingYear72();
        }

        public decimal? earningsPerSharePriceYear72()
        {
            return sharesOutstandingYear72() == 0 ? null : netIncomeYear72() * 1000 / sharesOutstandingYear72();
        }

        public decimal? earningsPerShare15PriceYear72()
        {
            return earningsPerSharePriceYear72() * 15;
        }

        public decimal? earningsPerShare20PriceYear72()
        {
            return earningsPerSharePriceYear72() * 20;
        }

        public decimal? dividendPerSharePriceYear72()
        {
            return sharesOutstandingYear72() == 0 ? null : dividendsYear72() * (-1000) / sharesOutstandingYear72();
        }
        #endregion
        #region  // Year 3 Calculations for Column 7
        public decimal? assetGrowthRateYear73()
        {
            return strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear3);
        }

        public decimal? newAcquisitionAssetsYear73()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear3);
        }

        public decimal? totalAssetsYear73()
        {
            return (totalAssetsYear72() * (1 + (assetGrowthRateYear73() / 100))) + newAcquisitionAssetsYear73();
        }

        public decimal? returnOnAverageAssetsYear73()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
            {
                return (netIncomeYear73() / ((totalAssetsYear72() + totalAssetsYear73()) / 2)) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear3);
        }

        public decimal? netIncomeYear73()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario7.NetIncomeYear3;
            else
                return ((totalAssetsYear72() + totalAssetsYear73()) / 2) * (returnOnAverageAssetsYear73() / 100);
        }

        public decimal? dividendsRateYear73()
        {
            return strategicForecastSummaryData.SelectedScenario7.DividendsRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.DividendsRateYear3);
        }

        public decimal? dividendsYear73()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario7.DividendsYear3;
            else
                return netIncomeYear73() * (dividendsRateYear73() / 100);
        }

        public decimal? newCapitalYear73()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear3);
        }

        public decimal? bankEquityCapitalYear73()
        {
            return bankEquityCapitalYear72() + netIncomeYear73() - dividendsYear73() + newCapitalYear73();
        }

        public decimal? cet1CapitalAdjustmentYear73()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear73()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier1CapitalAdjustmentYear3;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear73()
        {
            return bankEquityCapitalYear73() + cet1CapitalAdjustmentYear73() + tier1CapitalAdjustmentYear73();
        }

        public decimal? tier1CapitalYear73()
        {
            return bankEquityCapitalYear73() + tier1CapitalAdjustmentYear73();
        }

        public decimal? tier2CapitalYear73()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier2CapitalYear3;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear73();
        }

        public decimal? totalRiskBasedCapitalYear73()
        {
            return tier1CapitalYear73() + tier2CapitalYear73();
        }

        public decimal? riskWeightedAssetsYear73()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario7.RiskWeightedAssetsYear3;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear73();
            }
        }

        public decimal? totalAssetsForLeverageYear73()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear73();
        }

        public decimal? cet1CapitalRatioYear73()
        {
            return riskWeightedAssetsYear73() == 0 ? null : cet1CapitalYear73() / riskWeightedAssetsYear73();
        }

        public decimal? tier1RBCRatioYear73()
        {
            return (tier1CapitalYear73() / riskWeightedAssetsYear73()) * 100;
        }

        public decimal? totalCapitalatioYear73()
        {
            return (totalRiskBasedCapitalYear73() / riskWeightedAssetsYear73()) * 100;
        }

        public decimal? tier1LeverageRatioYear73()
        {
            return totalAssetsForLeverageYear73() == 0 ? null : (tier1CapitalYear73() / totalAssetsForLeverageYear73()) * 100;
        }

        public decimal? returnOnAverageEquityYear73()
        {
            return (netIncomeYear73() / ((bankEquityCapitalYear73() + bankEquityCapitalYear72()) / 2)) * 100;
        }

        public decimal? mvEquityYear73()
        {
            return bankEquityCapitalYear73() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear73()
        {
            return strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear3);
        }

        public decimal? bvSharePriceYear73()
        {
            return sharesOutstandingYear73() == 0 ? null : bankEquityCapitalYear73() * 1000 / sharesOutstandingYear73();
        }

        public decimal? mvSharePriceYear73()
        {
            return sharesOutstandingYear73() == 0 ? null : mvEquityYear73() * 1000 / sharesOutstandingYear73();
        }

        public decimal? earningsPerSharePriceYear73()
        {
            return sharesOutstandingYear73() == 0 ? null : netIncomeYear73() * 1000 / sharesOutstandingYear73();
        }

        public decimal? earningsPerShare15PriceYear73()
        {
            return earningsPerSharePriceYear73() * 15;
        }

        public decimal? earningsPerShare20PriceYear73()
        {
            return earningsPerSharePriceYear73() * 20;
        }

        public decimal? dividendPerSharePriceYear73()
        {
            return sharesOutstandingYear73() == 0 ? null : dividendsYear73() * (-1000) / sharesOutstandingYear73();
        }
        #endregion
        #region   // Year 4 Calculations for Column 7
        public decimal? assetGrowthRateYear74()
        {
            return strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear4);
        }

        public decimal? newAcquisitionAssetsYear74()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear4);
        }

        public decimal? totalAssetsYear74()
        {
            return (totalAssetsYear73() * (1 + (assetGrowthRateYear74() / 100))) + newAcquisitionAssetsYear74();
        }

        public decimal? returnOnAverageAssetsYear74()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
            {
                return ((netIncomeYear74() / ((totalAssetsYear73() + totalAssetsYear74()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear4);
        }

        public decimal? netIncomeYear74()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario7.NetIncomeYear4;
            else
                return ((totalAssetsYear73() + totalAssetsYear74()) / 2) * (returnOnAverageAssetsYear74() / 100);
        }

        public decimal? dividendsRateYear74()
        {
            return strategicForecastSummaryData.SelectedScenario7.DividendsRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.DividendsRateYear4);
        }

        public decimal? dividendsYear74()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario7.DividendsYear4;
            else
                return netIncomeYear74() * (dividendsRateYear74() / 100);
        }

        public decimal? newCapitalYear74()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewCapitalYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear4);
        }

        public decimal? bankEquityCapitalYear74()
        {
            return bankEquityCapitalYear73() + netIncomeYear74() - dividendsYear74() + newCapitalYear74();
        }

        public decimal? cet1CapitalAdjustmentYear74()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear74()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier1CapitalAdjustmentYear4;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear74()
        {
            return bankEquityCapitalYear74() + cet1CapitalAdjustmentYear74() + tier1CapitalAdjustmentYear74();
        }

        public decimal? tier1CapitalYear74()
        {
            return bankEquityCapitalYear74() + tier1CapitalAdjustmentYear74();
        }

        public decimal? tier2CapitalYear74()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier2CapitalYear4;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear74();
        }

        public decimal? totalRiskBasedCapitalYear74()
        {
            return tier1CapitalYear74() + tier2CapitalYear74();
        }

        public decimal? riskWeightedAssetsYear74()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario7.RiskWeightedAssetsYear4;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear74();
            }
        }

        public decimal? totalAssetsForLeverageYear74()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear74();
        }

        public decimal? cet1CapitalRatioYear74()
        {
            return riskWeightedAssetsYear74() == 0 ? null : cet1CapitalYear74() / riskWeightedAssetsYear74();
        }

        public decimal? tier1RBCRatioYear74()
        {
            return (tier1CapitalYear74() / riskWeightedAssetsYear74()) * 100;
        }

        public decimal? totalCapitalRatioYear74()
        {
            return (totalRiskBasedCapitalYear74() / riskWeightedAssetsYear74()) * 100;
        }

        public decimal? tier1LeverageRatioYear74()
        {
            return totalAssetsForLeverageYear74() == 0 ? null : (tier1CapitalYear74() / totalAssetsForLeverageYear74()) * 100;
        }

        public decimal? returnOnAverageEquityYear74()
        {
            return (netIncomeYear74() / ((bankEquityCapitalYear74() + bankEquityCapitalYear73()) / 2)) * 100;
        }

        public decimal? mvEquityYear74()
        {
            return bankEquityCapitalYear74() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear74()
        {
            return strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear4);
        }

        public decimal? bvSharePriceYear74()
        {
            return sharesOutstandingYear74() == 0 ? null : bankEquityCapitalYear74() * 1000 / sharesOutstandingYear74();
        }

        public decimal? mvSharePriceYear74()
        {
            return sharesOutstandingYear74() == 0 ? null : mvEquityYear74() * 1000 / sharesOutstandingYear74();
        }

        public decimal? earningsPerSharePriceYear74()
        {
            return sharesOutstandingYear74() == 0 ? null : netIncomeYear74() * 1000 / sharesOutstandingYear74();
        }

        public decimal? earningsPerShare15PriceYear74()
        {
            return earningsPerSharePriceYear74() * 15;
        }

        public decimal? earningsPerShare20PriceYear74()
        {
            return earningsPerSharePriceYear74() * 20;
        }

        public decimal? dividendPerSharePriceYear74()
        {
            return sharesOutstandingYear74() == 0 ? null : dividendsYear74() * (-1000) / sharesOutstandingYear74();
        }
        #endregion
        #region // Year 5 Calculations for Column 7
        public decimal? assetGrowthRateYear75()
        {
            return strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.AssetGrowthRateYear5);
        }

        public decimal? newAcquisitionAssetsYear75()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewAcquisitionAssetsYear5);
        }

        public decimal? totalAssetsYear75()
        {
            return (totalAssetsYear74() * (1 + (assetGrowthRateYear75() / 100))) + newAcquisitionAssetsYear75();
        }

        public decimal? returnOnAverageAssetsYear75()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
            {
                return ((netIncomeYear75() / ((totalAssetsYear74() + totalAssetsYear75()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.ReturnOnAverageAssetsYear5);
        }

        public decimal? netIncomeYear75()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario7.NetIncomeYear5;
            else
                return ((totalAssetsYear74() + totalAssetsYear75()) / 2) * (returnOnAverageAssetsYear75() / 100);
        }

        public decimal? dividendsRateYear75()
        {
            return strategicForecastSummaryData.SelectedScenario7.DividendsRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.DividendsRateYear5);
        }

        public decimal? dividendsYear75()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario7.DividendsYear5;
            else
                return netIncomeYear75() * (dividendsRateYear75() / 100);
        }

        public decimal? newCapitalYear75()
        {
            return strategicForecastSummaryData.SelectedScenario7.NewCapitalYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.NewCapitalYear5);
        }

        public decimal? bankEquityCapitalYear75()
        {
            return bankEquityCapitalYear74() + netIncomeYear75() - dividendsYear75() + newCapitalYear75();
        }

        public decimal? cet1CapitalAdjustmentYear75()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear75()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier1CapitalAdjustmentYear5;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear75()
        {
            return bankEquityCapitalYear75() + cet1CapitalAdjustmentYear75() + tier1CapitalAdjustmentYear75();
        }

        public decimal? tier1CapitalYear75()
        {
            return bankEquityCapitalYear75() + tier1CapitalAdjustmentYear75();
        }

        public decimal? tier2CapitalYear75()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario7.Tier2CapitalYear5;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear75();
        }

        public decimal? totalRiskBasedCapitalYear75()
        {
            return tier1CapitalYear75() + tier2CapitalYear75();
        }

        public decimal? riskWeightedAssetsYear75()
        {
            if (strategicForecastSummaryData.SelectedScenario7.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario7.RiskWeightedAssetsYear5;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear75();
            }
        }

        public decimal? totalAssetsForLeverageYear75()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear75();
        }

        public decimal? cet1CapitalRatioYear75()
        {
            return riskWeightedAssetsYear75() == 0 ? null : cet1CapitalYear75() / riskWeightedAssetsYear75();
        }

        public decimal? tier1RBCRatioYear75()
        {
            return (tier1CapitalYear75() / riskWeightedAssetsYear75()) * 100;
        }

        public decimal? totalCapitalRatioYear75()
        {
            return (totalRiskBasedCapitalYear75() / riskWeightedAssetsYear75()) * 100;
        }

        public decimal? tier1LeverageRatioYear75()
        {
            return totalAssetsForLeverageYear75() == 0 ? null : (tier1CapitalYear75() / totalAssetsForLeverageYear75()) * 100;
        }

        public decimal? returnOnAverageEquityYear75()
        {
            return (netIncomeYear75() / ((bankEquityCapitalYear75() + bankEquityCapitalYear74()) / 2)) * 100;
        }

        public decimal? mvEquityYear75()
        {
            return bankEquityCapitalYear75() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear75()
        {
            return strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario7.SharesOutstandingActualYear5);
        }

        public decimal? bvSharePriceYear75()
        {
            return sharesOutstandingYear75() == 0 ? null : bankEquityCapitalYear75() * 1000 / sharesOutstandingYear75();
        }

        public decimal? mvSharePriceYear75()
        {
            return sharesOutstandingYear75() == 0 ? null : mvEquityYear75() * 1000 / sharesOutstandingYear75();
        }

        public decimal? earningsPerSharePriceYear75()
        {
            return sharesOutstandingYear75() == 0 ? null : netIncomeYear75() * 1000 / sharesOutstandingYear75();
        }

        public decimal? earningsPerShare15PriceYear75()
        {
            return earningsPerSharePriceYear75() * 15;
        }

        public decimal? earningsPerShare20PriceYear75()
        {
            return earningsPerSharePriceYear75() * 20;
        }

        public decimal? dividendPerSharePriceYear75()
        {
            return sharesOutstandingYear75() == 0 ? null : dividendsYear75() * (-1000) / sharesOutstandingYear75();
        }
        #endregion

        #region  // Year 0 Calculations for Column 8
        public decimal? assetGrowthRateYear80()
        {
            return strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear0);
        }

        public decimal? newAcquisitionAssetsYear80()
        {
            if (strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear0 != null)
                return (strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear0);
            else
                return 0;
        }

        public decimal? totalAssetsYear80()
        {
            return ((dashboardConcepts.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear80() / 100))) + newAcquisitionAssetsYear80();
        }

        public decimal? returnOnAverageAssetsYear80()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
            {
                return ((netIncomeYear80() / ((dashboardConcepts.TotalAssetsPriorYear + totalAssetsYear80()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear0);
        }

        public decimal? netIncomeYear80()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario8.NetIncomeYear0;
            else
                return (((dashboardConcepts.TotalAssetsPriorYear) + totalAssetsYear80()) / 2) * (returnOnAverageAssetsYear80() / 100);
        }

        public decimal? dividendsRateYear80()
        {
            return strategicForecastSummaryData.SelectedScenario8.DividendsRateYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.DividendsRateYear0);
        }

        public decimal? dividendsYear80()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario8.DividendsYear0;
            else
                return netIncomeYear80() * (dividendsRateYear80() / 100);
        }

        public decimal? newCapitalYear80()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear0);
        }

        public decimal? bankEquityCapitalYear80()
        {
            return (dashboardConcepts.BankEquityCapitalPriorYear) + netIncomeYear80() - dividendsYear80() + newCapitalYear80();
        }

        public decimal? cet1CapitalAdjustmentYear80()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear80()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier1CapitalAdjustmentYear0;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear80()
        {
            return bankEquityCapitalYear80() + cet1CapitalAdjustmentYear80() + tier1CapitalAdjustmentYear80();
        }

        public decimal? tier1CapitalYear80()
        {
            return bankEquityCapitalYear80() + tier1CapitalAdjustmentYear80();
        }

        public decimal? tier2CapitalYear80()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier2CapitalYear0;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear80();
        }

        public decimal? totalRiskBasedCapitalYear80()
        {
            return tier1CapitalYear80() + tier2CapitalYear80();
        }

        public decimal? riskWeightedAssetsYear80()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario8.RiskWeightedAssetsYear0;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear80();
            }
        }

        public decimal? totalAssetsForLeverageYear80()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear80();
        }

        public decimal? cet1CapitalRatioYear80()
        {
            return riskWeightedAssetsYear80() == 0 ? null : cet1CapitalYear80() / riskWeightedAssetsYear80();
        }

        public decimal? tier1RBCRatioYear80()
        {
            return (tier1CapitalYear80() / riskWeightedAssetsYear80()) * 100;
        }

        public decimal? totalCapitalRatioYear80()
        {
            return (totalRiskBasedCapitalYear80() / riskWeightedAssetsYear80()) * 100;
        }

        public decimal? tier1LeverageRatioYear80()
        {
            return totalAssetsForLeverageYear80() == 0 ? null : (tier1CapitalYear80() / totalAssetsForLeverageYear80()) * 100;
        }

        public decimal? returnOnAverageEquityYear80()
        {
            return (netIncomeYear80() / ((bankEquityCapitalYear80() + (dashboardConcepts.BankEquityCapitalPriorYear)) / 2)) * 100;
        }

        public decimal? mvEquityYear80()
        {
            return bankEquityCapitalYear80() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear80()
        {
            return strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear0 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear0);
        }

        public decimal? bvSharePriceYear80()
        {
            return sharesOutstandingYear80() == 0 ? null : bankEquityCapitalYear80() * 1000 / sharesOutstandingYear80();
        }

        public decimal? mvSharePriceYear80()
        {
            return sharesOutstandingYear80() == 0 ? null : mvEquityYear80() * 1000 / sharesOutstandingYear80();
        }

        public decimal? earningsPerSharePriceYear80()
        {
            return sharesOutstandingYear80() == 0 ? null : netIncomeYear80() * 1000 / sharesOutstandingYear80();
        }

        public decimal? earningsPerShare15PriceYear80()
        {
            return earningsPerSharePriceYear80() * 15;
        }

        public decimal? earningsPerShare20PriceYear80()
        {
            return earningsPerSharePriceYear80() * 20;
        }

        public decimal? dividendPerSharePriceYear80()
        {
            return sharesOutstandingYear80() == 0 ? null : dividendsYear80() * (-1000) / sharesOutstandingYear80();
        }
        #endregion
        #region  // Year 1 Calculations for Column 8
        public decimal? assetGrowthRateYear81()
        {
            return strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear1);
        }

        public decimal? newAcquisitionAssetsYear81()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear1);
        }

        public decimal? totalAssetsYear81()
        {
            return (totalAssetsYear80() * (1 + (assetGrowthRateYear81() / 100))) + newAcquisitionAssetsYear81();
        }

        public decimal? returnOnAverageAssetsYear81()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
            {
                return ((netIncomeYear81() / ((totalAssetsYear80() + totalAssetsYear81()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear1);
        }

        public decimal? netIncomeYear81()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario8.NetIncomeYear1;
            else
                return ((totalAssetsYear80() + totalAssetsYear81()) / 2) * (returnOnAverageAssetsYear81() / 100);
        }

        public decimal? dividendsRateYear81()
        {
            return strategicForecastSummaryData.SelectedScenario8.DividendsRateYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.DividendsRateYear1);
        }

        public decimal? dividendsYear81()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario8.DividendsYear1;
            else
                return netIncomeYear81() * (dividendsRateYear81() / 100);
        }

        public decimal? newCapitalYear81()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear1);
        }

        public decimal? bankEquityCapitalYear81()
        {
            return bankEquityCapitalYear80() + netIncomeYear81() - dividendsYear81() + newCapitalYear81();
        }

        public decimal? cet1CapitalAdjustmentYear81()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear81()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier1CapitalAdjustmentYear1;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear81()
        {
            return bankEquityCapitalYear81() + cet1CapitalAdjustmentYear81() + tier1CapitalAdjustmentYear81();
        }

        public decimal? tier1CapitalYear81()
        {
            return bankEquityCapitalYear81() + tier1CapitalAdjustmentYear81();
        }

        public decimal? tier2CapitalYear81()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier2CapitalYear1;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear81();
        }

        public decimal? totalRiskBasedCapitalYear81()
        {
            return tier1CapitalYear81() + tier2CapitalYear81();
        }

        public decimal? riskWeightedAssetsYear81()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario8.RiskWeightedAssetsYear1;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear81();
            }
        }

        public decimal? totalAssetsForLeverageYear81()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear81();
        }

        public decimal? cet1CapitalRatioYear81()
        {
            return riskWeightedAssetsYear81() == 0 ? null : cet1CapitalYear81() / riskWeightedAssetsYear81();
        }

        public decimal? tier1RBCRatioYear81()
        {
            return (tier1CapitalYear81() / riskWeightedAssetsYear81()) * 100;
        }

        public decimal? totalCapitalRatioYear81()
        {
            return (totalRiskBasedCapitalYear81() / riskWeightedAssetsYear81()) * 100;
        }

        public decimal? tier1LeverageRatioYear81()
        {
            return totalAssetsForLeverageYear81() == 0 ? null : (tier1CapitalYear81() / totalAssetsForLeverageYear81()) * 100;
        }

        public decimal? returnOnAverageEquityYear81()
        {
            return (netIncomeYear81() / ((bankEquityCapitalYear81() + bankEquityCapitalYear80()) / 2)) * 100;
        }

        public decimal? mvEquityYear81()
        {
            return bankEquityCapitalYear81() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear81()
        {
            return strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear1 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear1);
        }

        public decimal? bvSharePriceYear81()
        {
            return sharesOutstandingYear81() == 0 ? null : bankEquityCapitalYear81() * 1000 / sharesOutstandingYear81();
        }

        public decimal? mvSharePriceYear81()
        {
            return sharesOutstandingYear81() == 0 ? null : mvEquityYear81() * 1000 / sharesOutstandingYear81();
        }

        public decimal? earningsPerSharePriceYear81()
        {
            return sharesOutstandingYear81() == 0 ? null : netIncomeYear81() * 1000 / sharesOutstandingYear81();
        }

        public decimal? earningsPerShare15PriceYear81()
        {
            return earningsPerSharePriceYear81() * 15;
        }

        public decimal? earningsPerShare20PriceYear81()
        {
            return earningsPerSharePriceYear81() * 20;
        }

        public decimal? dividendPerSharePriceYear81()
        {
            return sharesOutstandingYear81() == 0 ? null : dividendsYear81() * (-1000) / sharesOutstandingYear81();
        }
        #endregion
        #region  // Year 2 Calculations for Column 8
        public decimal? assetGrowthRateYear82()
        {
            return strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear2);
        }

        public decimal? newAcquisitionAssetsYear82()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear2);
        }

        public decimal? totalAssetsYear82()
        {
            return (totalAssetsYear81() * (1 + (assetGrowthRateYear82() / 100))) + newAcquisitionAssetsYear82();
        }

        public decimal? returnOnAverageAssetsYear82()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
            {
                return ((netIncomeYear82() / ((totalAssetsYear81() + totalAssetsYear82()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear2);
        }

        public decimal? netIncomeYear82()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario8.NetIncomeYear2;
            else
                return ((totalAssetsYear81() + totalAssetsYear82()) / 2) * (returnOnAverageAssetsYear82() / 100);
        }

        public decimal? dividendsRateYear82()
        {
            return strategicForecastSummaryData.SelectedScenario8.DividendsRateYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.DividendsRateYear2);
        }

        public decimal? dividendsYear82()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario8.DividendsYear2;
            else
                return netIncomeYear82() * (dividendsRateYear82() / 100);
        }

        public decimal? newCapitalYear82()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear2);
        }

        public decimal? bankEquityCapitalYear82()
        {
            return bankEquityCapitalYear81() + netIncomeYear82() - dividendsYear82() + newCapitalYear82();
        }

        public decimal? cet1CapitalAdjustmentYear82()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear82()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier1CapitalAdjustmentYear2;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear82()
        {
            return bankEquityCapitalYear82() + cet1CapitalAdjustmentYear82() + tier1CapitalAdjustmentYear82();
        }

        public decimal? tier1CapitalYear82()
        {
            return bankEquityCapitalYear82() + tier1CapitalAdjustmentYear82();
        }

        public decimal? tier2CapitalYear82()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier2CapitalYear2;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear82();
        }

        public decimal? totalRiskBasedCapitalYear82()
        {
            return tier1CapitalYear82() + tier2CapitalYear82();
        }

        public decimal? riskWeightedAssetsYear82()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario8.RiskWeightedAssetsYear2;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear82();
            }
        }

        public decimal? totalAssetsForLeverageYear82()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear82();
        }

        public decimal? cet1CapitalRatioYear82()
        {
            return riskWeightedAssetsYear82() == 0 ? null : cet1CapitalYear82() / riskWeightedAssetsYear82();
        }

        public decimal? tier1RBCRatioYear82()
        {
            return (tier1CapitalYear82() / riskWeightedAssetsYear82()) * 100;
        }

        public decimal? totalCapitalRatioYear82()
        {
            return (totalRiskBasedCapitalYear82() / riskWeightedAssetsYear82()) * 100;
        }

        public decimal? tier1LeverageRatioYear82()
        {
            return totalAssetsForLeverageYear82() == 0 ? null : (tier1CapitalYear82() / totalAssetsForLeverageYear82()) * 100;
        }

        public decimal? returnOnAverageEquityYear82()
        {
            return (netIncomeYear82() / ((bankEquityCapitalYear82() + bankEquityCapitalYear81()) / 2)) * 100;
        }

        public decimal? mvEquityYear82()
        {
            return bankEquityCapitalYear82() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear82()
        {
            return strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear2 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear2);
        }

        public decimal? bvSharePriceYear82()
        {
            return sharesOutstandingYear82() == 0 ? null : bankEquityCapitalYear82() * 1000 / sharesOutstandingYear82();
        }

        public decimal? mvSharePriceYear82()
        {
            return sharesOutstandingYear82() == 0 ? null : mvEquityYear82() * 1000 / sharesOutstandingYear82();
        }

        public decimal? earningsPerSharePriceYear82()
        {
            return sharesOutstandingYear82() == 0 ? null : netIncomeYear82() * 1000 / sharesOutstandingYear82();
        }

        public decimal? earningsPerShare15PriceYear82()
        {
            return earningsPerSharePriceYear82() * 15;
        }

        public decimal? earningsPerShare20PriceYear82()
        {
            return earningsPerSharePriceYear82() * 20;
        }

        public decimal? dividendPerSharePriceYear82()
        {
            return sharesOutstandingYear82() == 0 ? null : dividendsYear82() * (-1000) / sharesOutstandingYear82();
        }
        #endregion
        #region   // Year 3 Calculations for Column 8
        public decimal? assetGrowthRateYear83()
        {
            return strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear3);
        }

        public decimal? newAcquisitionAssetsYear83()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear3);
        }

        public decimal? totalAssetsYear83()
        {
            return (totalAssetsYear82() * (1 + (assetGrowthRateYear83() / 100))) + newAcquisitionAssetsYear83();
        }

        public decimal? returnOnAverageAssetsYear83()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
            {
                return (netIncomeYear83() / ((totalAssetsYear82() + totalAssetsYear83()) / 2)) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear3);
        }

        public decimal? netIncomeYear83()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario8.NetIncomeYear3;
            else
                return ((totalAssetsYear82() + totalAssetsYear83()) / 2) * (returnOnAverageAssetsYear83() / 100);
        }

        public decimal? dividendsRateYear83()
        {
            return strategicForecastSummaryData.SelectedScenario8.DividendsRateYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.DividendsRateYear3);
        }

        public decimal? dividendsYear83()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario8.DividendsYear3;
            else
                return netIncomeYear83() * (dividendsRateYear83() / 100);
        }

        public decimal? newCapitalYear83()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear3);
        }

        public decimal? bankEquityCapitalYear83()
        {
            return bankEquityCapitalYear82() + netIncomeYear83() - dividendsYear83() + newCapitalYear83();
        }

        public decimal? cet1CapitalAdjustmentYear83()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear83()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier1CapitalAdjustmentYear3;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear83()
        {
            return bankEquityCapitalYear83() + cet1CapitalAdjustmentYear83() + tier1CapitalAdjustmentYear83();
        }

        public decimal? tier1CapitalYear83()
        {
            return bankEquityCapitalYear83() + tier1CapitalAdjustmentYear83();
        }

        public decimal? tier2CapitalYear83()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier2CapitalYear3;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear83();
        }

        public decimal? totalRiskBasedCapitalYear83()
        {
            return tier1CapitalYear83() + tier2CapitalYear83();
        }

        public decimal? riskWeightedAssetsYear83()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario8.RiskWeightedAssetsYear3;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear83();
            }
        }

        public decimal? totalAssetsForLeverageYear83()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear83();
        }

        public decimal? cet1CapitalRatioYear83()
        {
            return riskWeightedAssetsYear83() == 0 ? null : cet1CapitalYear83() / riskWeightedAssetsYear83();
        }

        public decimal? tier1RBCRatioYear83()
        {
            return (tier1CapitalYear83() / riskWeightedAssetsYear83()) * 100;
        }

        public decimal? totalCapitalRatioYear83()
        {
            return (totalRiskBasedCapitalYear83() / riskWeightedAssetsYear83()) * 100;
        }

        public decimal? tier1LeverageRatioYear83()
        {
            return totalAssetsForLeverageYear83() == 0 ? null : (tier1CapitalYear83() / totalAssetsForLeverageYear83()) * 100;
        }

        public decimal? returnOnAverageEquityYear83()
        {
            return (netIncomeYear83() / ((bankEquityCapitalYear83() + bankEquityCapitalYear82()) / 2)) * 100;
        }

        public decimal? mvEquityYear83()
        {
            return bankEquityCapitalYear83() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear83()
        {
            return strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear3 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear3);
        }

        public decimal? bvSharePriceYear83()
        {
            return sharesOutstandingYear83() == 0 ? null : bankEquityCapitalYear83() * 1000 / sharesOutstandingYear83();
        }

        public decimal? mvSharePriceYear83()
        {
            return sharesOutstandingYear83() == 0 ? null : mvEquityYear83() * 1000 / sharesOutstandingYear83();
        }

        public decimal? earningsPerSharePriceYear83()
        {
            return sharesOutstandingYear83() == 0 ? null : netIncomeYear83() * 1000 / sharesOutstandingYear83();
        }

        public decimal? earningsPerShare15PriceYear83()
        {
            return earningsPerSharePriceYear83() * 15;
        }

        public decimal? earningsPerShare20PriceYear83()
        {
            return earningsPerSharePriceYear83() * 20;
        }

        public decimal? dividendPerSharePriceYear83()
        {
            return sharesOutstandingYear83() == 0 ? null : dividendsYear83() * (-1000) / sharesOutstandingYear83();
        }
        #endregion
        #region // Year 4 Calculations for Column 8
        public decimal? assetGrowthRateYear84()
        {
            return strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear4);
        }

        public decimal? newAcquisitionAssetsYear84()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear4);
        }

        public decimal? totalAssetsYear84()
        {
            return (totalAssetsYear83() * (1 + (assetGrowthRateYear84() / 100))) + newAcquisitionAssetsYear84();
        }

        public decimal? returnOnAverageAssetsYear84()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
            {
                return ((netIncomeYear84() / ((totalAssetsYear83() + totalAssetsYear84()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear4);
        }

        public decimal? netIncomeYear84()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario8.NetIncomeYear4;
            else
                return ((totalAssetsYear83() + totalAssetsYear84()) / 2) * (returnOnAverageAssetsYear84() / 100);
        }

        public decimal? dividendsRateYear84()
        {
            return strategicForecastSummaryData.SelectedScenario8.DividendsRateYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.DividendsRateYear4);
        }

        public decimal? dividendsYear84()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario8.DividendsYear4;
            else
                return netIncomeYear84() * (dividendsRateYear84() / 100);
        }

        public decimal? newCapitalYear84()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewCapitalYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear4);
        }

        public decimal? bankEquityCapitalYear84()
        {
            return bankEquityCapitalYear83() + netIncomeYear84() - dividendsYear84() + newCapitalYear84();
        }

        public decimal? cet1CapitalAdjustmentYear84()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear84()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier1CapitalAdjustmentYear4;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear84()
        {
            return bankEquityCapitalYear84() + cet1CapitalAdjustmentYear84() + tier1CapitalAdjustmentYear84();
        }

        public decimal? tier1CapitalYear84()
        {
            return bankEquityCapitalYear84() + tier1CapitalAdjustmentYear84();
        }

        public decimal? tier2CapitalYear84()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier2CapitalYear4;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear84();
        }

        public decimal? totalRiskBasedCapitalYear84()
        {
            return tier1CapitalYear84() + tier2CapitalYear84();
        }

        public decimal? riskWeightedAssetsYear84()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario8.RiskWeightedAssetsYear4;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear84();
            }
        }

        public decimal? totalAssetsForLeverageYear84()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear84();
        }

        public decimal? cet1CapitalRatioYear84()
        {
            return riskWeightedAssetsYear84() == 0 ? null : cet1CapitalYear84() / riskWeightedAssetsYear84();
        }

        public decimal? tier1RBCRatioYear84()
        {
            return (tier1CapitalYear84() / riskWeightedAssetsYear84()) * 100;
        }

        public decimal? totalCapitalRatioYear84()
        {
            return (totalRiskBasedCapitalYear84() / riskWeightedAssetsYear84()) * 100;
        }

        public decimal? tier1LeverageRatioYear84()
        {
            return totalAssetsForLeverageYear84() == 0 ? null : (tier1CapitalYear84() / totalAssetsForLeverageYear84()) * 100;
        }

        public decimal? returnOnAverageEquityYear84()
        {
            return (netIncomeYear84() / ((bankEquityCapitalYear84() + bankEquityCapitalYear83()) / 2)) * 100;
        }

        public decimal? mvEquityYear84()
        {
            return bankEquityCapitalYear84() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear84()
        {
            return strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear4 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear4);
        }

        public decimal? bvSharePriceYear84()
        {
            return sharesOutstandingYear84() == 0 ? null : bankEquityCapitalYear84() * 1000 / sharesOutstandingYear84();
        }

        public decimal? mvSharePriceYear84()
        {
            return sharesOutstandingYear84() == 0 ? null : mvEquityYear84() * 1000 / sharesOutstandingYear84();
        }

        public decimal? earningsPerSharePriceYear84()
        {
            return sharesOutstandingYear84() == 0 ? null : netIncomeYear84() * 1000 / sharesOutstandingYear84();
        }

        public decimal? earningsPerShare15PriceYear84()
        {
            return earningsPerSharePriceYear84() * 15;
        }

        public decimal? earningsPerShare20PriceYear84()
        {
            return earningsPerSharePriceYear84() * 20;
        }

        public decimal? dividendPerSharePriceYear84()
        {
            return sharesOutstandingYear84() == 0 ? null : dividendsYear84() * (-1000) / sharesOutstandingYear84();
        }
        #endregion
        #region  // Year 5 Calculations for Column 8
        public decimal? assetGrowthRateYear85()
        {
            return strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.AssetGrowthRateYear5);
        }

        public decimal? newAcquisitionAssetsYear85()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewAcquisitionAssetsYear5);
        }

        public decimal? totalAssetsYear85()
        {
            return (totalAssetsYear84() * (1 + (assetGrowthRateYear85() / 100))) + newAcquisitionAssetsYear85();
        }

        public decimal? returnOnAverageAssetsYear85()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
            {
                return ((netIncomeYear85() / ((totalAssetsYear84() + totalAssetsYear85()) / 2))) * 100;
            }
            else
                return strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.ReturnOnAverageAssetsYear5);
        }

        public decimal? netIncomeYear85()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput == true)
                return strategicForecastSummaryData.SelectedScenario8.NetIncomeYear5;
            else
                return ((totalAssetsYear84() + totalAssetsYear85()) / 2) * (returnOnAverageAssetsYear85() / 100);
        }

        public decimal? dividendsRateYear85()
        {
            return strategicForecastSummaryData.SelectedScenario8.DividendsRateYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.DividendsRateYear5);
        }

        public decimal? dividendsYear85()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseCashDividendsInput == true)
                return strategicForecastSummaryData.SelectedScenario8.DividendsYear5;
            else
                return netIncomeYear85() * (dividendsRateYear85() / 100);
        }

        public decimal? newCapitalYear85()
        {
            return strategicForecastSummaryData.SelectedScenario8.NewCapitalYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.NewCapitalYear5);
        }

        public decimal? bankEquityCapitalYear85()
        {
            return bankEquityCapitalYear84() + netIncomeYear85() - dividendsYear85() + newCapitalYear85();
        }

        public decimal? cet1CapitalAdjustmentYear85()
        {
            return dashboardConcepts.Cet1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Cet1CapitalAdjustmentPriorYear);
        }

        public decimal? tier1CapitalAdjustmentYear85()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier1CapitalAdjustmentInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier1CapitalAdjustmentYear5;
            else
                return dashboardConcepts.Tier1CapitalAdjustmentPriorYear == null ? 0 : (dashboardConcepts.Tier1CapitalAdjustmentPriorYear);
        }

        public decimal? cet1CapitalYear85()
        {
            return bankEquityCapitalYear85() + cet1CapitalAdjustmentYear85() + tier1CapitalAdjustmentYear85();
        }

        public decimal? tier1CapitalYear85()
        {
            return bankEquityCapitalYear85() + tier1CapitalAdjustmentYear85();
        }

        public decimal? tier2CapitalYear85()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseTier2CapitalInput == true)
                return strategicForecastSummaryData.SelectedScenario8.Tier2CapitalYear5;
            else
                return ((dashboardConcepts.Tier2CapitalPriorYear) / (dashboardConcepts.Tier1CapitalPriorYear)) * tier1CapitalYear85();
        }

        public decimal? totalRiskBasedCapitalYear85()
        {
            return tier1CapitalYear85() + tier2CapitalYear85();
        }

        public decimal? riskWeightedAssetsYear85()
        {
            if (strategicForecastSummaryData.SelectedScenario8.UseRiskWeightedAssetsInput == true)
            {
                return strategicForecastSummaryData.SelectedScenario8.RiskWeightedAssetsYear5;
            }
            else
            {
                return ((dashboardConcepts.RiskWeightedAssetsPriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear85();
            }
        }

        public decimal? totalAssetsForLeverageYear85()
        {
            return ((dashboardConcepts.TotalAssetsForLeveragePriorYear) / (dashboardConcepts.TotalAssetsPriorYear)) * totalAssetsYear85();
        }

        public decimal? cet1CapitalRatioYear85()
        {
            return riskWeightedAssetsYear85() == 0 ? null : cet1CapitalYear85() / riskWeightedAssetsYear85();
        }

        public decimal? tier1RBCRatioYear85()
        {
            return (tier1CapitalYear85() / riskWeightedAssetsYear85()) * 100;
        }

        public decimal? totalCapitalRatioYear85()
        {
            return (totalRiskBasedCapitalYear85() / riskWeightedAssetsYear85()) * 100;
        }

        public decimal? tier1LeverageRatioYear85()
        {
            return totalAssetsForLeverageYear85() == 0 ? null : (tier1CapitalYear85() / totalAssetsForLeverageYear85()) * 100;
        }

        public decimal? returnOnAverageEquityYear85()
        {
            return (netIncomeYear85() / ((bankEquityCapitalYear85() + bankEquityCapitalYear84()) / 2)) * 100;
        }

        public decimal? mvEquityYear85()
        {
            return bankEquityCapitalYear85() * Convert.ToDecimal(1.5);
        }

        public decimal? sharesOutstandingYear85()
        {
            return strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear5 == null ? 0 : (strategicForecastSummaryData.SelectedScenario8.SharesOutstandingActualYear5);
        }

        public decimal? bvSharePriceYear85()
        {
            return sharesOutstandingYear85() == 0 ? null : bankEquityCapitalYear85() * 1000 / sharesOutstandingYear85();
        }

        public decimal? mvSharePriceYear85()
        {
            return sharesOutstandingYear85() == 0 ? null : mvEquityYear85() * 1000 / sharesOutstandingYear85();
        }

        public decimal? earningsPerSharePriceYear85()
        {
            return sharesOutstandingYear85() == 0 ? null : netIncomeYear85() * 1000 / sharesOutstandingYear85();
        }

        public decimal? earningsPerShare15PriceYear85()
        {
            return earningsPerSharePriceYear85() * 15;
        }

        public decimal? earningsPerShare20PriceYear85()
        {
            return earningsPerSharePriceYear85() * 20;
        }

        public decimal? dividendPerSharePriceYear85()
        {
            return sharesOutstandingYear85() == 0 ? null : dividendsYear85() * (-1000) / sharesOutstandingYear85();
        }
        #endregion

        #region // Row - TotalAssets
        public void totalAssets1()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalAssets1 = totalAssetsYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalAssets1 = totalAssetsYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalAssets1 = totalAssetsYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalAssets1 = totalAssetsYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalAssets1 = totalAssetsYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalAssets1 = totalAssetsYear15();
                    break;
                default:
                    strategicForecastSummaryData.TotalAssets1 = null;
                    break;
            }
        }

        public void totalAssets2()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalAssets2 = totalAssetsYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalAssets2 = totalAssetsYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalAssets2 = totalAssetsYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalAssets2 = totalAssetsYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalAssets2 = totalAssetsYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalAssets2 = totalAssetsYear25();
                    break;
                default:
                    strategicForecastSummaryData.TotalAssets2 = null;
                    break;
            }
        }

        public void totalAssets3()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalAssets3 = totalAssetsYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalAssets3 = totalAssetsYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalAssets3 = totalAssetsYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalAssets3 = totalAssetsYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalAssets3 = totalAssetsYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalAssets3 = totalAssetsYear35();
                    break;
                default:
                    strategicForecastSummaryData.TotalAssets3 = 0;
                    break;
            }
        }

        public void totalAssets4()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalAssets4 = totalAssetsYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalAssets4 = totalAssetsYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalAssets4 = totalAssetsYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalAssets4 = totalAssetsYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalAssets4 = totalAssetsYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalAssets4 = totalAssetsYear45();
                    break;
                default:
                    strategicForecastSummaryData.TotalAssets4 = null;
                    break;
            }
        }

        public void totalAssets5()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalAssets5 = totalAssetsYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalAssets5 = totalAssetsYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalAssets5 = totalAssetsYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalAssets5 = totalAssetsYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalAssets5 = totalAssetsYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalAssets5 = totalAssetsYear55();
                    break;
                default:
                    strategicForecastSummaryData.TotalAssets5 = null;
                    break;
            }
        }

        public void totalAssets6()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalAssets6 = totalAssetsYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalAssets6 = totalAssetsYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalAssets6 = totalAssetsYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalAssets6 = totalAssetsYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalAssets6 = totalAssetsYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalAssets6 = totalAssetsYear65();
                    break;
                default:
                    strategicForecastSummaryData.TotalAssets6 = null;
                    break;
            }
        }

        public void totalAssets7()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalAssets7 = totalAssetsYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalAssets7 = totalAssetsYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalAssets7 = totalAssetsYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalAssets7 = totalAssetsYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalAssets7 = totalAssetsYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalAssets7 = totalAssetsYear75();
                    break;
                default:
                    strategicForecastSummaryData.TotalAssets7 = null;
                    break;
            }
        }

        public void totalAssets8()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalAssets8 = totalAssetsYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalAssets8 = totalAssetsYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalAssets8 = totalAssetsYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalAssets8 = totalAssetsYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalAssets8 = totalAssetsYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalAssets8 = totalAssetsYear85();
                    break;
                default:
                    strategicForecastSummaryData.TotalAssets8 = null;
                    break;
            }
        }
        #endregion
        #region // Row- AverageAnnualGrowth
        public void averageAnnualGrowth1()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.AverageAnnualGrowth1 = assetGrowthRateYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.AverageAnnualGrowth1 = (assetGrowthRateYear10() + assetGrowthRateYear11()) / 2;
                    break;
                case 3:
                    strategicForecastSummaryData.AverageAnnualGrowth1 = (assetGrowthRateYear10() + assetGrowthRateYear11() + assetGrowthRateYear12()) / 3;
                    break;
                case 4:
                    strategicForecastSummaryData.AverageAnnualGrowth1 = (assetGrowthRateYear10() + assetGrowthRateYear11() + assetGrowthRateYear12() + assetGrowthRateYear13()) / 4;
                    break;
                case 5:
                    strategicForecastSummaryData.AverageAnnualGrowth1 = (assetGrowthRateYear10() + assetGrowthRateYear11() + assetGrowthRateYear12() + assetGrowthRateYear13() + assetGrowthRateYear14()) / 5;
                    break;
                case 6:
                    strategicForecastSummaryData.AverageAnnualGrowth1 = (assetGrowthRateYear10() + assetGrowthRateYear11() + assetGrowthRateYear12() + assetGrowthRateYear13() + assetGrowthRateYear14() + assetGrowthRateYear15()) / 6;
                    break;
                default:
                    strategicForecastSummaryData.AverageAnnualGrowth1 = null;
                    break;
            }
        }

        public void averageAnnualGrowth2()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.AverageAnnualGrowth2 = (assetGrowthRateYear20());
                    break;
                case 2:
                    strategicForecastSummaryData.AverageAnnualGrowth2 = (assetGrowthRateYear20() + assetGrowthRateYear21()) / 2;
                    break;
                case 3:
                    strategicForecastSummaryData.AverageAnnualGrowth2 = (assetGrowthRateYear20() + assetGrowthRateYear21() + assetGrowthRateYear22()) / 3;
                    break;
                case 4:
                    strategicForecastSummaryData.AverageAnnualGrowth2 = (assetGrowthRateYear20() + assetGrowthRateYear21() + assetGrowthRateYear22() + assetGrowthRateYear23()) / 4;
                    break;
                case 5:
                    strategicForecastSummaryData.AverageAnnualGrowth2 = (assetGrowthRateYear20() + assetGrowthRateYear21() + assetGrowthRateYear22() + assetGrowthRateYear23() + assetGrowthRateYear24()) / 5;
                    break;
                case 6:
                    strategicForecastSummaryData.AverageAnnualGrowth2 = (assetGrowthRateYear20() + assetGrowthRateYear21() + assetGrowthRateYear22() + assetGrowthRateYear23() + assetGrowthRateYear24() + assetGrowthRateYear25()) / 6;
                    break;
                default:
                    strategicForecastSummaryData.AverageAnnualGrowth2 = null;
                    break;
            }
        }

        public void averageAnnualGrowth3()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.AverageAnnualGrowth3 = (assetGrowthRateYear30());
                    break;
                case 2:
                    strategicForecastSummaryData.AverageAnnualGrowth3 = (assetGrowthRateYear30() + assetGrowthRateYear31()) / 2;
                    break;
                case 3:
                    strategicForecastSummaryData.AverageAnnualGrowth3 = (assetGrowthRateYear30() + assetGrowthRateYear31() + assetGrowthRateYear32()) / 3;
                    break;
                case 4:
                    strategicForecastSummaryData.AverageAnnualGrowth3 = (assetGrowthRateYear30() + assetGrowthRateYear31() + assetGrowthRateYear32() + assetGrowthRateYear33()) / 4;
                    break;
                case 5:
                    strategicForecastSummaryData.AverageAnnualGrowth3 = (assetGrowthRateYear30() + assetGrowthRateYear31() + assetGrowthRateYear32() + assetGrowthRateYear33() + assetGrowthRateYear34()) / 5;
                    break;
                case 6:
                    strategicForecastSummaryData.AverageAnnualGrowth3 = (assetGrowthRateYear30() + assetGrowthRateYear31() + assetGrowthRateYear32() + assetGrowthRateYear33() + assetGrowthRateYear34() + assetGrowthRateYear35()) / 6;
                    break;
                default:
                    strategicForecastSummaryData.AverageAnnualGrowth3 = null;
                    break;
            }
        }

        public void averageAnnualGrowth4()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.AverageAnnualGrowth4 = (assetGrowthRateYear40());
                    break;
                case 2:
                    strategicForecastSummaryData.AverageAnnualGrowth4 = (assetGrowthRateYear40() + assetGrowthRateYear41()) / 2;
                    break;
                case 3:
                    strategicForecastSummaryData.AverageAnnualGrowth4 = (assetGrowthRateYear40() + assetGrowthRateYear41() + assetGrowthRateYear42()) / 3;
                    break;
                case 4:
                    strategicForecastSummaryData.AverageAnnualGrowth4 = (assetGrowthRateYear40() + assetGrowthRateYear41() + assetGrowthRateYear42() + assetGrowthRateYear43()) / 4;
                    break;
                case 5:
                    strategicForecastSummaryData.AverageAnnualGrowth4 = (assetGrowthRateYear40() + assetGrowthRateYear41() + assetGrowthRateYear42() + assetGrowthRateYear43() + assetGrowthRateYear44()) / 5;
                    break;
                case 6:
                    strategicForecastSummaryData.AverageAnnualGrowth4 = (assetGrowthRateYear40() + assetGrowthRateYear41() + assetGrowthRateYear42() + assetGrowthRateYear43() + assetGrowthRateYear44() + assetGrowthRateYear45()) / 6;
                    break;
                default:
                    strategicForecastSummaryData.AverageAnnualGrowth4 = null;
                    break;
            }
        }

        public void averageAnnualGrowth5()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.AverageAnnualGrowth5 = (assetGrowthRateYear50());
                    break;
                case 2:
                    strategicForecastSummaryData.AverageAnnualGrowth5 = (assetGrowthRateYear50() + assetGrowthRateYear51()) / 2;
                    break;
                case 3:
                    strategicForecastSummaryData.AverageAnnualGrowth5 = (assetGrowthRateYear50() + assetGrowthRateYear51() + assetGrowthRateYear52()) / 3;
                    break;
                case 4:
                    strategicForecastSummaryData.AverageAnnualGrowth5 = (assetGrowthRateYear50() + assetGrowthRateYear51() + assetGrowthRateYear52() + assetGrowthRateYear53()) / 4;
                    break;
                case 5:
                    strategicForecastSummaryData.AverageAnnualGrowth5 = (assetGrowthRateYear50() + assetGrowthRateYear51() + assetGrowthRateYear52() + assetGrowthRateYear53() + assetGrowthRateYear54()) / 5;
                    break;
                case 6:
                    strategicForecastSummaryData.AverageAnnualGrowth5 = (assetGrowthRateYear50() + assetGrowthRateYear51() + assetGrowthRateYear52() + assetGrowthRateYear53() + assetGrowthRateYear54() + assetGrowthRateYear55()) / 6;
                    break;
                default:
                    strategicForecastSummaryData.AverageAnnualGrowth5 = null;
                    break;
            }
        }

        public void averageAnnualGrowth6()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.AverageAnnualGrowth6 = (assetGrowthRateYear60());
                    break;
                case 2:
                    strategicForecastSummaryData.AverageAnnualGrowth6 = (assetGrowthRateYear60() + assetGrowthRateYear61()) / 2;
                    break;
                case 3:
                    strategicForecastSummaryData.AverageAnnualGrowth6 = (assetGrowthRateYear60() + assetGrowthRateYear61() + assetGrowthRateYear62()) / 3;
                    break;
                case 4:
                    strategicForecastSummaryData.AverageAnnualGrowth6 = (assetGrowthRateYear60() + assetGrowthRateYear61() + assetGrowthRateYear62() + assetGrowthRateYear63()) / 4;
                    break;
                case 5:
                    strategicForecastSummaryData.AverageAnnualGrowth6 = (assetGrowthRateYear60() + assetGrowthRateYear61() + assetGrowthRateYear62() + assetGrowthRateYear63() + assetGrowthRateYear64()) / 5;
                    break;
                case 6:
                    strategicForecastSummaryData.AverageAnnualGrowth6 = (assetGrowthRateYear60() + assetGrowthRateYear61() + assetGrowthRateYear62() + assetGrowthRateYear63() + assetGrowthRateYear64() + assetGrowthRateYear65()) / 6;
                    break;
                default:
                    strategicForecastSummaryData.AverageAnnualGrowth6 = null;
                    break;
            }
        }

        public void averageAnnualGrowth7()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.AverageAnnualGrowth7 = (assetGrowthRateYear70());
                    break;
                case 2:
                    strategicForecastSummaryData.AverageAnnualGrowth7 = (assetGrowthRateYear70() + assetGrowthRateYear71()) / 2;
                    break;
                case 3:
                    strategicForecastSummaryData.AverageAnnualGrowth7 = (assetGrowthRateYear70() + assetGrowthRateYear71() + assetGrowthRateYear72()) / 3;
                    break;
                case 4:
                    strategicForecastSummaryData.AverageAnnualGrowth7 = (assetGrowthRateYear70() + assetGrowthRateYear71() + assetGrowthRateYear72() + assetGrowthRateYear73()) / 4;
                    break;
                case 5:
                    strategicForecastSummaryData.AverageAnnualGrowth7 = (assetGrowthRateYear70() + assetGrowthRateYear71() + assetGrowthRateYear72() + assetGrowthRateYear73() + assetGrowthRateYear74()) / 5;
                    break;
                case 6:
                    strategicForecastSummaryData.AverageAnnualGrowth7 = (assetGrowthRateYear70() + assetGrowthRateYear71() + assetGrowthRateYear72() + assetGrowthRateYear73() + assetGrowthRateYear74() + assetGrowthRateYear75()) / 6;
                    break;
                default:
                    strategicForecastSummaryData.AverageAnnualGrowth7 = null;
                    break;
            }
        }

        public void averageAnnualGrowth8()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.AverageAnnualGrowth8 = (assetGrowthRateYear80());
                    break;
                case 2:
                    strategicForecastSummaryData.AverageAnnualGrowth8 = (assetGrowthRateYear80() + assetGrowthRateYear81()) / 2;
                    break;
                case 3:
                    strategicForecastSummaryData.AverageAnnualGrowth8 = (assetGrowthRateYear80() + assetGrowthRateYear81() + assetGrowthRateYear82()) / 3;
                    break;
                case 4:
                    strategicForecastSummaryData.AverageAnnualGrowth8 = (assetGrowthRateYear80() + assetGrowthRateYear81() + assetGrowthRateYear82() + assetGrowthRateYear83()) / 4;
                    break;
                case 5:
                    strategicForecastSummaryData.AverageAnnualGrowth8 = (assetGrowthRateYear80() + assetGrowthRateYear81() + assetGrowthRateYear82() + assetGrowthRateYear83() + assetGrowthRateYear84()) / 5;
                    break;
                case 6:
                    strategicForecastSummaryData.AverageAnnualGrowth8 = (assetGrowthRateYear80() + assetGrowthRateYear81() + assetGrowthRateYear82() + assetGrowthRateYear83() + assetGrowthRateYear84() + assetGrowthRateYear85()) / 6;
                    break;
                default:
                    strategicForecastSummaryData.AverageAnnualGrowth8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - NetIncome
        public void netIncome1()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.NetIncome1 = netIncomeYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.NetIncome1 = netIncomeYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.NetIncome1 = netIncomeYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.NetIncome1 = netIncomeYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.NetIncome1 = netIncomeYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.NetIncome1 = netIncomeYear15();
                    break;
                default:
                    strategicForecastSummaryData.NetIncome1 = null;
                    break;
            }
        }

        public void netIncome2()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.NetIncome2 = netIncomeYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.NetIncome2 = netIncomeYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.NetIncome2 = netIncomeYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.NetIncome2 = netIncomeYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.NetIncome2 = netIncomeYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.NetIncome2 = netIncomeYear25();
                    break;
                default:
                    strategicForecastSummaryData.NetIncome2 = null;
                    break;
            }
        }

        public void netIncome3()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.NetIncome3 = netIncomeYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.NetIncome3 = netIncomeYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.NetIncome3 = netIncomeYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.NetIncome3 = netIncomeYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.NetIncome3 = netIncomeYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.NetIncome3 = netIncomeYear35();
                    break;
                default:
                    strategicForecastSummaryData.NetIncome3 = null;
                    break;
            }
        }

        public void netIncome4()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.NetIncome4 = netIncomeYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.NetIncome4 = netIncomeYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.NetIncome4 = netIncomeYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.NetIncome4 = netIncomeYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.NetIncome4 = netIncomeYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.NetIncome4 = netIncomeYear45();
                    break;
                default:
                    strategicForecastSummaryData.NetIncome4 = null;
                    break;
            }
        }

        public void netIncome5()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.NetIncome5 = netIncomeYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.NetIncome5 = netIncomeYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.NetIncome5 = netIncomeYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.NetIncome5 = netIncomeYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.NetIncome5 = netIncomeYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.NetIncome5 = netIncomeYear55();
                    break;
                default:
                    strategicForecastSummaryData.NetIncome5 = null;
                    break;
            }
        }

        public void netIncome6()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.NetIncome6 = netIncomeYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.NetIncome6 = netIncomeYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.NetIncome6 = netIncomeYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.NetIncome6 = netIncomeYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.NetIncome6 = netIncomeYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.NetIncome6 = netIncomeYear65();
                    break;
                default:
                    strategicForecastSummaryData.NetIncome6 = null;
                    break;
            }
        }

        public void netIncome7()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.NetIncome7 = netIncomeYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.NetIncome7 = netIncomeYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.NetIncome7 = netIncomeYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.NetIncome7 = netIncomeYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.NetIncome7 = netIncomeYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.NetIncome7 = netIncomeYear75();
                    break;
                default:
                    strategicForecastSummaryData.NetIncome7 = null;
                    break;
            }
        }

        public void netIncome8()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.NetIncome8 = netIncomeYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.NetIncome8 = netIncomeYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.NetIncome8 = netIncomeYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.NetIncome8 = netIncomeYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.NetIncome8 = netIncomeYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.NetIncome8 = netIncomeYear85();
                    break;
                default:
                    strategicForecastSummaryData.NetIncome8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - Tier1 Leverage Ratio
        public void tier1LeverageRatio1()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Tier1LeverageRatio1 = tier1LeverageRatioYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.Tier1LeverageRatio1 = tier1LeverageRatioYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.Tier1LeverageRatio1 = tier1LeverageRatioYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.Tier1LeverageRatio1 = tier1LeverageRatioYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.Tier1LeverageRatio1 = tier1LeverageRatioYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.Tier1LeverageRatio1 = tier1LeverageRatioYear15();
                    break;
                default:
                    strategicForecastSummaryData.Tier1LeverageRatio1 = null;
                    break;
            }
        }

        public void tier1LeverageRatio2()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Tier1LeverageRatio2 = tier1LeverageRatioYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.Tier1LeverageRatio2 = tier1LeverageRatioYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.Tier1LeverageRatio2 = tier1LeverageRatioYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.Tier1LeverageRatio2 = tier1LeverageRatioYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.Tier1LeverageRatio2 = tier1LeverageRatioYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.Tier1LeverageRatio2 = tier1LeverageRatioYear25();
                    break;
                default:
                    strategicForecastSummaryData.Tier1LeverageRatio2 = null;
                    break;
            }
        }

        public void tier1LeverageRatio3()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Tier1LeverageRatio3 = tier1LeverageRatioYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.Tier1LeverageRatio3 = tier1LeverageRatioYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.Tier1LeverageRatio3 = tier1LeverageRatioYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.Tier1LeverageRatio3 = tier1LeverageRatioYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.Tier1LeverageRatio3 = tier1LeverageRatioYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.Tier1LeverageRatio3 = tier1LeverageRatioYear35();
                    break;
                default:
                    strategicForecastSummaryData.Tier1LeverageRatio3 = null;
                    break;
            }
        }

        public void tier1LeverageRatio4()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Tier1LeverageRatio4 = tier1LeverageRatioYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.Tier1LeverageRatio4 = tier1LeverageRatioYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.Tier1LeverageRatio4 = tier1LeverageRatioYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.Tier1LeverageRatio4 = tier1LeverageRatioYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.Tier1LeverageRatio4 = tier1LeverageRatioYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.Tier1LeverageRatio4 = tier1LeverageRatioYear45();
                    break;
                default:
                    strategicForecastSummaryData.Tier1LeverageRatio4 = null;
                    break;
            }
        }

        public void tier1LeverageRatio5()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Tier1LeverageRatio5 = tier1LeverageRatioYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.Tier1LeverageRatio5 = tier1LeverageRatioYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.Tier1LeverageRatio5 = tier1LeverageRatioYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.Tier1LeverageRatio5 = tier1LeverageRatioYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.Tier1LeverageRatio5 = tier1LeverageRatioYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.Tier1LeverageRatio5 = tier1LeverageRatioYear55();
                    break;
                default:
                    strategicForecastSummaryData.Tier1LeverageRatio5 = null;
                    break;
            }
        }

        public void tier1LeverageRatio6()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Tier1LeverageRatio6 = tier1LeverageRatioYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.Tier1LeverageRatio6 = tier1LeverageRatioYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.Tier1LeverageRatio6 = tier1LeverageRatioYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.Tier1LeverageRatio6 = tier1LeverageRatioYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.Tier1LeverageRatio6 = tier1LeverageRatioYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.Tier1LeverageRatio6 = tier1LeverageRatioYear65();
                    break;
                default:
                    strategicForecastSummaryData.Tier1LeverageRatio6 = null;
                    break;
            }
        }

        public void tier1LeverageRatio7()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Tier1LeverageRatio7 = tier1LeverageRatioYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.Tier1LeverageRatio7 = tier1LeverageRatioYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.Tier1LeverageRatio7 = tier1LeverageRatioYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.Tier1LeverageRatio7 = tier1LeverageRatioYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.Tier1LeverageRatio7 = tier1LeverageRatioYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.Tier1LeverageRatio7 = tier1LeverageRatioYear75();
                    break;
                default:
                    strategicForecastSummaryData.Tier1LeverageRatio7 = null;
                    break;
            }
        }

        public void tier1LeverageRatio8()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Tier1LeverageRatio8 = tier1LeverageRatioYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.Tier1LeverageRatio8 = tier1LeverageRatioYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.Tier1LeverageRatio8 = tier1LeverageRatioYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.Tier1LeverageRatio8 = tier1LeverageRatioYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.Tier1LeverageRatio8 = tier1LeverageRatioYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.Tier1LeverageRatio8 = tier1LeverageRatioYear85();
                    break;
                default:
                    strategicForecastSummaryData.Tier1LeverageRatio8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - TotalCapitalRatio
        public void totalCapitalRatio1()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalCapitalRatio1 = totalCapitalRatioYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalCapitalRatio1 = totalCapitalRatioYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalCapitalRatio1 = totalCapitalRatioYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalCapitalRatio1 = totalCapitalRatioYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalCapitalRatio1 = totalCapitalRatioYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalCapitalRatio1 = totalCapitalRatioYear15();
                    break;
                default:
                    strategicForecastSummaryData.TotalCapitalRatio1 = null;
                    break;
            }
        }

        public void totalCapitalRatio2()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalCapitalRatio2 = totalCapitalRatioYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalCapitalRatio2 = totalCapitalRatioYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalCapitalRatio2 = totalCapitalRatioYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalCapitalRatio2 = totalCapitalRatioYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalCapitalRatio2 = totalCapitalRatioYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalCapitalRatio2 = totalCapitalRatioYear25();
                    break;
                default:
                    strategicForecastSummaryData.TotalCapitalRatio2 = null;
                    break;
            }
        }

        public void totalCapitalRatio3()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalCapitalRatio3 = totalCapitalRatioYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalCapitalRatio3 = totalCapitalRatioYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalCapitalRatio3 = totalCapitalRatioYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalCapitalRatio3 = totalCapitalRatioYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalCapitalRatio3 = totalCapitalRatioYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalCapitalRatio3 = totalCapitalRatioYear35();
                    break;
                default:
                    strategicForecastSummaryData.TotalCapitalRatio3 = null;
                    break;
            }
        }

        public void totalCapitalRatio4()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalCapitalRatio4 = totalCapitalRatioYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalCapitalRatio4 = totalCapitalRatioYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalCapitalRatio4 = totalCapitalRatioYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalCapitalRatio4 = totalCapitalRatioYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalCapitalRatio4 = totalCapitalRatioYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalCapitalRatio4 = totalCapitalRatioYear45();
                    break;
                default:
                    strategicForecastSummaryData.TotalCapitalRatio4 = null;
                    break;
            }
        }

        public void totalCapitalRatio5()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalCapitalRatio5 = totalCapitalRatioYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalCapitalRatio5 = totalCapitalRatioYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalCapitalRatio5 = totalCapitalRatioYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalCapitalRatio5 = totalCapitalRatioYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalCapitalRatio5 = totalCapitalRatioYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalCapitalRatio5 = totalCapitalRatioYear55();
                    break;
                default:
                    strategicForecastSummaryData.TotalCapitalRatio5 = null;
                    break;
            }
        }

        public void totalCapitalRatio6()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalCapitalRatio6 = totalCapitalRatioYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalCapitalRatio6 = totalCapitalRatioYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalCapitalRatio6 = totalCapitalRatioYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalCapitalRatio6 = totalCapitalRatioYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalCapitalRatio6 = totalCapitalRatioYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalCapitalRatio6 = totalCapitalRatioYear65();
                    break;
                default:
                    strategicForecastSummaryData.TotalCapitalRatio6 = null;
                    break;
            }
        }

        public void totalCapitalRatio7()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalCapitalRatio7 = totalCapitalRatioYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalCapitalRatio7 = totalCapitalRatioYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalCapitalRatio7 = totalCapitalRatioYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalCapitalRatio7 = totalCapitalRatioYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalCapitalRatio7 = totalCapitalRatioYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalCapitalRatio7 = totalCapitalRatioYear75();
                    break;
                default:
                    strategicForecastSummaryData.TotalCapitalRatio7 = null;
                    break;
            }
        }

        public void totalCapitalRatio8()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.TotalCapitalRatio8 = totalCapitalRatioYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.TotalCapitalRatio8 = totalCapitalRatioYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.TotalCapitalRatio8 = totalCapitalRatioYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.TotalCapitalRatio8 = totalCapitalRatioYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.TotalCapitalRatio8 = totalCapitalRatioYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.TotalCapitalRatio8 = totalCapitalRatioYear85();
                    break;
                default:
                    strategicForecastSummaryData.TotalCapitalRatio8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - ROAA
        public void rOAA1()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAA1 = returnOnAverageAssetsYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAA1 = returnOnAverageAssetsYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAA1 = returnOnAverageAssetsYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAA1 = returnOnAverageAssetsYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAA1 = returnOnAverageAssetsYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAA1 = returnOnAverageAssetsYear15();
                    break;
                default:
                    strategicForecastSummaryData.ROAA1 = null;
                    break;
            }
        }

        public void rOAA2()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAA2 = returnOnAverageAssetsYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAA2 = returnOnAverageAssetsYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAA2 = returnOnAverageAssetsYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAA2 = returnOnAverageAssetsYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAA2 = returnOnAverageAssetsYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAA2 = returnOnAverageAssetsYear25();
                    break;
                default:
                    strategicForecastSummaryData.ROAA2 = null;
                    break;
            }
        }

        public void rOAA3()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAA3 = returnOnAverageAssetsYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAA3 = returnOnAverageAssetsYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAA3 = returnOnAverageAssetsYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAA3 = returnOnAverageAssetsYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAA3 = returnOnAverageAssetsYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAA3 = returnOnAverageAssetsYear35();
                    break;
                default:
                    strategicForecastSummaryData.ROAA3 = null;
                    break;
            }
        }

        public void rOAA4()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAA4 = returnOnAverageAssetsYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAA4 = returnOnAverageAssetsYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAA4 = returnOnAverageAssetsYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAA4 = returnOnAverageAssetsYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAA4 = returnOnAverageAssetsYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAA4 = returnOnAverageAssetsYear45();
                    break;
                default:
                    strategicForecastSummaryData.ROAA4 = null;
                    break;
            }
        }

        public void rOAA5()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAA5 = returnOnAverageAssetsYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAA5 = returnOnAverageAssetsYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAA5 = returnOnAverageAssetsYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAA5 = returnOnAverageAssetsYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAA5 = returnOnAverageAssetsYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAA5 = returnOnAverageAssetsYear55();
                    break;
                default:
                    strategicForecastSummaryData.ROAA5 = null;
                    break;
            }
        }

        public void rOAA6()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAA6 = returnOnAverageAssetsYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAA6 = returnOnAverageAssetsYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAA6 = returnOnAverageAssetsYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAA6 = returnOnAverageAssetsYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAA6 = returnOnAverageAssetsYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAA6 = returnOnAverageAssetsYear65();
                    break;
                default:
                    strategicForecastSummaryData.ROAA6 = null;
                    break;
            }
        }

        public void rOAA7()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAA7 = returnOnAverageAssetsYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAA7 = returnOnAverageAssetsYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAA7 = returnOnAverageAssetsYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAA7 = returnOnAverageAssetsYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAA7 = returnOnAverageAssetsYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAA7 = returnOnAverageAssetsYear75();
                    break;
                default:
                    strategicForecastSummaryData.ROAA7 = null;
                    break;
            }
        }

        public void rOAA8()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAA8 = returnOnAverageAssetsYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAA8 = returnOnAverageAssetsYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAA8 = returnOnAverageAssetsYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAA8 = returnOnAverageAssetsYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAA8 = returnOnAverageAssetsYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAA8 = returnOnAverageAssetsYear85();
                    break;
                default:
                    strategicForecastSummaryData.ROAA8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - ROAE
        public void rOAE1()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAE1 = returnOnAverageEquityYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAE1 = returnOnAverageEquityYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAE1 = returnOnAverageEquityYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAE1 = returnOnAverageEquityYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAE1 = returnOnAverageEquityYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAE1 = returnOnAverageEquityYear15();
                    break;
                default:
                    strategicForecastSummaryData.ROAE1 = null;
                    break;
            }
        }

        public void rOAE2()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAE2 = returnOnAverageEquityYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAE2 = returnOnAverageEquityYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAE2 = returnOnAverageEquityYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAE2 = returnOnAverageEquityYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAE2 = returnOnAverageEquityYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAE2 = returnOnAverageEquityYear25();
                    break;
                default:
                    strategicForecastSummaryData.ROAE2 = null;
                    break;
            }
        }

        public void rOAE3()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAE3 = returnOnAverageEquityYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAE3 = returnOnAverageEquityYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAE3 = returnOnAverageEquityYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAE3 = returnOnAverageEquityYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAE3 = returnOnAverageEquityYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAE3 = returnOnAverageEquityYear35();
                    break;
                default:
                    strategicForecastSummaryData.ROAE3 = null;
                    break;
            }
        }

        public void rOAE4()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAE4 = returnOnAverageEquityYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAE4 = returnOnAverageEquityYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAE4 = returnOnAverageEquityYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAE4 = returnOnAverageEquityYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAE4 = returnOnAverageEquityYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAE4 = returnOnAverageEquityYear45();
                    break;
                default:
                    strategicForecastSummaryData.ROAE4 = null;
                    break;
            }
        }

        public void rOAE5()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAE5 = returnOnAverageEquityYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAE5 = returnOnAverageEquityYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAE5 = returnOnAverageEquityYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAE5 = returnOnAverageEquityYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAE5 = returnOnAverageEquityYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAE5 = returnOnAverageEquityYear55();
                    break;
                default:
                    strategicForecastSummaryData.ROAE5 = null;
                    break;
            }
        }

        public void rOAE6()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAE6 = returnOnAverageEquityYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAE6 = returnOnAverageEquityYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAE6 = returnOnAverageEquityYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAE6 = returnOnAverageEquityYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAE6 = returnOnAverageEquityYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAE6 = returnOnAverageEquityYear65();
                    break;
                default:
                    strategicForecastSummaryData.ROAE6 = null;
                    break;
            }
        }

        public void rOAE7()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAE7 = returnOnAverageEquityYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAE7 = returnOnAverageEquityYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAE7 = returnOnAverageEquityYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAE7 = returnOnAverageEquityYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAE7 = returnOnAverageEquityYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAE7 = returnOnAverageEquityYear75();
                    break;
                default:
                    strategicForecastSummaryData.ROAE7 = null;
                    break;
            }
        }

        public void rOAE8()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ROAE8 = returnOnAverageEquityYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.ROAE8 = returnOnAverageEquityYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.ROAE8 = returnOnAverageEquityYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.ROAE8 = returnOnAverageEquityYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.ROAE8 = returnOnAverageEquityYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.ROAE8 = returnOnAverageEquityYear85();
                    break;
                default:
                    strategicForecastSummaryData.ROAE8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - BookValueEquity
        public void bookValueEquity1()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValueEquity1 = bankEquityCapitalYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValueEquity1 = bankEquityCapitalYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValueEquity1 = bankEquityCapitalYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValueEquity1 = bankEquityCapitalYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValueEquity1 = bankEquityCapitalYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValueEquity1 = bankEquityCapitalYear15();
                    break;
                default:
                    strategicForecastSummaryData.BookValueEquity1 = null;
                    break;
            }
        }

        public void bookValueEquity2()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValueEquity2 = bankEquityCapitalYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValueEquity2 = bankEquityCapitalYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValueEquity2 = bankEquityCapitalYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValueEquity2 = bankEquityCapitalYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValueEquity2 = bankEquityCapitalYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValueEquity2 = bankEquityCapitalYear25();
                    break;
                default:
                    strategicForecastSummaryData.BookValueEquity2 = null;
                    break;
            }
        }

        public void bookValueEquity3()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValueEquity3 = bankEquityCapitalYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValueEquity3 = bankEquityCapitalYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValueEquity3 = bankEquityCapitalYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValueEquity3 = bankEquityCapitalYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValueEquity3 = bankEquityCapitalYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValueEquity3 = bankEquityCapitalYear35();
                    break;
                default:
                    strategicForecastSummaryData.BookValueEquity3 = null;
                    break;
            }
        }

        public void bookValueEquity4()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValueEquity4 = bankEquityCapitalYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValueEquity4 = bankEquityCapitalYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValueEquity4 = bankEquityCapitalYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValueEquity4 = bankEquityCapitalYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValueEquity4 = bankEquityCapitalYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValueEquity4 = bankEquityCapitalYear45();
                    break;
                default:
                    strategicForecastSummaryData.BookValueEquity4 = null;
                    break;
            }
        }

        public void bookValueEquity5()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValueEquity5 = bankEquityCapitalYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValueEquity5 = bankEquityCapitalYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValueEquity5 = bankEquityCapitalYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValueEquity5 = bankEquityCapitalYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValueEquity5 = bankEquityCapitalYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValueEquity5 = bankEquityCapitalYear55();
                    break;
                default:
                    strategicForecastSummaryData.BookValueEquity5 = null;
                    break;
            }
        }

        public void bookValueEquity6()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValueEquity6 = bankEquityCapitalYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValueEquity6 = bankEquityCapitalYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValueEquity6 = bankEquityCapitalYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValueEquity6 = bankEquityCapitalYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValueEquity6 = bankEquityCapitalYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValueEquity6 = bankEquityCapitalYear65();
                    break;
                default:
                    strategicForecastSummaryData.BookValueEquity6 = null;
                    break;
            }
        }

        public void bookValueEquity7()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValueEquity7 = bankEquityCapitalYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValueEquity7 = bankEquityCapitalYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValueEquity7 = bankEquityCapitalYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValueEquity7 = bankEquityCapitalYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValueEquity7 = bankEquityCapitalYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValueEquity7 = bankEquityCapitalYear75();
                    break;
                default:
                    strategicForecastSummaryData.BookValueEquity7 = null;
                    break;
            }
        }

        public void bookValueEquity8()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValueEquity8 = bankEquityCapitalYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValueEquity8 = bankEquityCapitalYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValueEquity8 = bankEquityCapitalYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValueEquity8 = bankEquityCapitalYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValueEquity8 = bankEquityCapitalYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValueEquity8 = bankEquityCapitalYear85();
                    break;
                default:
                    strategicForecastSummaryData.BookValueEquity8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - MarketValueEquity
        public void marketValueEquity1()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.MarketValueEquity1 = mvEquityYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.MarketValueEquity1 = mvEquityYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.MarketValueEquity1 = mvEquityYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.MarketValueEquity1 = mvEquityYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.MarketValueEquity1 = mvEquityYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.MarketValueEquity1 = mvEquityYear15();
                    break;
                default:
                    strategicForecastSummaryData.MarketValueEquity1 = null;
                    break;
            }
        }

        public void marketValueEquity2()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.MarketValueEquity2 = mvEquityYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.MarketValueEquity2 = mvEquityYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.MarketValueEquity2 = mvEquityYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.MarketValueEquity2 = mvEquityYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.MarketValueEquity2 = mvEquityYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.MarketValueEquity2 = mvEquityYear25();
                    break;
                default:
                    strategicForecastSummaryData.MarketValueEquity2 = null;
                    break;
            }
        }

        public void marketValueEquity3()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.MarketValueEquity3 = mvEquityYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.MarketValueEquity3 = mvEquityYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.MarketValueEquity3 = mvEquityYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.MarketValueEquity3 = mvEquityYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.MarketValueEquity3 = mvEquityYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.MarketValueEquity3 = mvEquityYear35();
                    break;
                default:
                    strategicForecastSummaryData.MarketValueEquity3 = null;
                    break;
            }
        }

        public void marketValueEquity4()
        {
            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.MarketValueEquity4 = mvEquityYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.MarketValueEquity4 = mvEquityYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.MarketValueEquity4 = mvEquityYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.MarketValueEquity4 = mvEquityYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.MarketValueEquity4 = mvEquityYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.MarketValueEquity4 = mvEquityYear45();
                    break;
                default:
                    strategicForecastSummaryData.MarketValueEquity4 = null;
                    break;
            }
        }

        public void marketValueEquity5()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.MarketValueEquity5 = mvEquityYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.MarketValueEquity5 = mvEquityYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.MarketValueEquity5 = mvEquityYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.MarketValueEquity5 = mvEquityYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.MarketValueEquity5 = mvEquityYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.MarketValueEquity5 = mvEquityYear55();
                    break;
                default:
                    strategicForecastSummaryData.MarketValueEquity5 = null;
                    break;
            }
        }

        public void marketValueEquity6()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.MarketValueEquity6 = mvEquityYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.MarketValueEquity6 = mvEquityYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.MarketValueEquity6 = mvEquityYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.MarketValueEquity6 = mvEquityYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.MarketValueEquity6 = mvEquityYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.MarketValueEquity6 = mvEquityYear65();
                    break;
                default:
                    strategicForecastSummaryData.MarketValueEquity6 = null;
                    break;
            }
        }

        public void marketValueEquity7()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.MarketValueEquity7 = mvEquityYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.MarketValueEquity7 = mvEquityYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.MarketValueEquity7 = mvEquityYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.MarketValueEquity7 = mvEquityYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.MarketValueEquity7 = mvEquityYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.MarketValueEquity7 = mvEquityYear75();
                    break;
                default:
                    strategicForecastSummaryData.MarketValueEquity7 = null;
                    break;
            }
        }

        public void marketValueEquity8()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.MarketValueEquity8 = mvEquityYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.MarketValueEquity8 = mvEquityYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.MarketValueEquity8 = mvEquityYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.MarketValueEquity8 = mvEquityYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.MarketValueEquity8 = mvEquityYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.MarketValueEquity8 = mvEquityYear85();
                    break;
                default:
                    strategicForecastSummaryData.MarketValueEquity8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - BookValuePerShare
        public void bookValuePerShare1()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValuePerShare1 = bvSharePriceYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValuePerShare1 = bvSharePriceYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValuePerShare1 = bvSharePriceYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValuePerShare1 = bvSharePriceYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValuePerShare1 = bvSharePriceYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValuePerShare1 = bvSharePriceYear15();
                    break;
                default:
                    strategicForecastSummaryData.BookValuePerShare1 = null;
                    break;
            }
        }

        public void bookValuePerShare2()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValuePerShare2 = bvSharePriceYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValuePerShare2 = bvSharePriceYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValuePerShare2 = bvSharePriceYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValuePerShare2 = bvSharePriceYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValuePerShare2 = bvSharePriceYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValuePerShare2 = bvSharePriceYear25();
                    break;
                default:
                    strategicForecastSummaryData.BookValuePerShare2 = null;
                    break;
            }
        }

        public void bookValuePerShare3()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValuePerShare3 = bvSharePriceYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValuePerShare3 = bvSharePriceYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValuePerShare3 = bvSharePriceYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValuePerShare3 = bvSharePriceYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValuePerShare3 = bvSharePriceYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValuePerShare3 = bvSharePriceYear35();
                    break;
                default:
                    strategicForecastSummaryData.BookValuePerShare3 = null;
                    break;
            }
        }

        public void bookValuePerShare4()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValuePerShare4 = bvSharePriceYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValuePerShare4 = bvSharePriceYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValuePerShare4 = bvSharePriceYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValuePerShare4 = bvSharePriceYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValuePerShare4 = bvSharePriceYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValuePerShare4 = bvSharePriceYear45();
                    break;
                default:
                    strategicForecastSummaryData.BookValuePerShare4 = null;
                    break;
            }
        }

        public void bookValuePerShare5()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValuePerShare5 = bvSharePriceYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValuePerShare5 = bvSharePriceYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValuePerShare5 = bvSharePriceYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValuePerShare5 = bvSharePriceYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValuePerShare5 = bvSharePriceYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValuePerShare5 = bvSharePriceYear55();
                    break;
                default:
                    strategicForecastSummaryData.BookValuePerShare5 = null;
                    break;
            }
        }

        public void bookValuePerShare6()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValuePerShare6 = bvSharePriceYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValuePerShare6 = bvSharePriceYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValuePerShare6 = bvSharePriceYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValuePerShare6 = bvSharePriceYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValuePerShare6 = bvSharePriceYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValuePerShare6 = bvSharePriceYear65();
                    break;
                default:
                    strategicForecastSummaryData.BookValuePerShare6 = null;
                    break;
            }
        }

        public void bookValuePerShare7()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValuePerShare7 = bvSharePriceYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValuePerShare7 = bvSharePriceYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValuePerShare7 = bvSharePriceYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValuePerShare7 = bvSharePriceYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValuePerShare7 = bvSharePriceYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValuePerShare7 = bvSharePriceYear75();
                    break;
                default:
                    strategicForecastSummaryData.BookValuePerShare7 = null;
                    break;
            }
        }

        public void bookValuePerShare8()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.BookValuePerShare8 = bvSharePriceYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.BookValuePerShare8 = bvSharePriceYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.BookValuePerShare8 = bvSharePriceYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.BookValuePerShare8 = bvSharePriceYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.BookValuePerShare8 = bvSharePriceYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.BookValuePerShare8 = bvSharePriceYear85();
                    break;
                default:
                    strategicForecastSummaryData.BookValuePerShare8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - EPS
        public void ePS1()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.EPS1 = earningsPerSharePriceYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.EPS1 = earningsPerSharePriceYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.EPS1 = earningsPerSharePriceYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.EPS1 = earningsPerSharePriceYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.EPS1 = earningsPerSharePriceYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.EPS1 = earningsPerSharePriceYear15();
                    break;
                default:
                    strategicForecastSummaryData.EPS1 = null;
                    break;
            }
        }

        public void ePS2()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.EPS2 = earningsPerSharePriceYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.EPS2 = earningsPerSharePriceYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.EPS2 = earningsPerSharePriceYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.EPS2 = earningsPerSharePriceYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.EPS2 = earningsPerSharePriceYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.EPS2 = earningsPerSharePriceYear25();
                    break;
                default:
                    strategicForecastSummaryData.EPS2 = null;
                    break;
            }
        }

        public void ePS3()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.EPS3 = earningsPerSharePriceYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.EPS3 = earningsPerSharePriceYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.EPS3 = earningsPerSharePriceYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.EPS3 = earningsPerSharePriceYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.EPS3 = earningsPerSharePriceYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.EPS3 = earningsPerSharePriceYear35();
                    break;
                default:
                    strategicForecastSummaryData.EPS3 = null;
                    break;
            }
        }

        public void ePS4()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.EPS4 = earningsPerSharePriceYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.EPS4 = earningsPerSharePriceYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.EPS4 = earningsPerSharePriceYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.EPS4 = earningsPerSharePriceYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.EPS4 = earningsPerSharePriceYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.EPS4 = earningsPerSharePriceYear45();
                    break;
                default:
                    strategicForecastSummaryData.EPS4 = null;
                    break;
            }
        }

        public void ePS5()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.EPS5 = earningsPerSharePriceYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.EPS5 = earningsPerSharePriceYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.EPS5 = earningsPerSharePriceYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.EPS5 = earningsPerSharePriceYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.EPS5 = earningsPerSharePriceYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.EPS5 = earningsPerSharePriceYear55();
                    break;
                default:
                    strategicForecastSummaryData.EPS5 = null;
                    break;
            }
        }

        public void ePS6()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.EPS6 = earningsPerSharePriceYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.EPS6 = earningsPerSharePriceYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.EPS6 = earningsPerSharePriceYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.EPS6 = earningsPerSharePriceYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.EPS6 = earningsPerSharePriceYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.EPS6 = earningsPerSharePriceYear65();
                    break;
                default:
                    strategicForecastSummaryData.EPS6 = null;
                    break;
            }
        }

        public void ePS7()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.EPS7 = earningsPerSharePriceYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.EPS7 = earningsPerSharePriceYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.EPS7 = earningsPerSharePriceYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.EPS7 = earningsPerSharePriceYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.EPS7 = earningsPerSharePriceYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.EPS7 = earningsPerSharePriceYear75();
                    break;
                default:
                    strategicForecastSummaryData.EPS7 = null;
                    break;
            }
        }

        public void ePS8()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.EPS8 = earningsPerSharePriceYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.EPS8 = earningsPerSharePriceYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.EPS8 = earningsPerSharePriceYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.EPS8 = earningsPerSharePriceYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.EPS8 = earningsPerSharePriceYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.EPS8 = earningsPerSharePriceYear85();
                    break;
                default:
                    strategicForecastSummaryData.EPS8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - Exit15XBook
        public void exit15XBook1()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Exit15XBook1 = mvSharePriceYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.Exit15XBook1 = mvSharePriceYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.Exit15XBook1 = mvSharePriceYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.Exit15XBook1 = mvSharePriceYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.Exit15XBook1 = mvSharePriceYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.Exit15XBook1 = mvSharePriceYear15();
                    break;
                default:
                    strategicForecastSummaryData.Exit15XBook1 = null;
                    break;
            }
        }

        public void exit15XBook2()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Exit15XBook2 = mvSharePriceYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.Exit15XBook2 = mvSharePriceYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.Exit15XBook2 = mvSharePriceYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.Exit15XBook2 = mvSharePriceYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.Exit15XBook2 = mvSharePriceYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.Exit15XBook2 = mvSharePriceYear25();
                    break;
                default:
                    strategicForecastSummaryData.Exit15XBook2 = null;
                    break;
            }
        }

        public void exit15XBook3()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Exit15XBook3 = mvSharePriceYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.Exit15XBook3 = mvSharePriceYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.Exit15XBook3 = mvSharePriceYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.Exit15XBook3 = mvSharePriceYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.Exit15XBook3 = mvSharePriceYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.Exit15XBook3 = mvSharePriceYear35();
                    break;
                default:
                    strategicForecastSummaryData.Exit15XBook3 = null;
                    break;
            }
        }

        public void exit15XBook4()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Exit15XBook4 = mvSharePriceYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.Exit15XBook4 = mvSharePriceYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.Exit15XBook4 = mvSharePriceYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.Exit15XBook4 = mvSharePriceYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.Exit15XBook4 = mvSharePriceYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.Exit15XBook4 = mvSharePriceYear45();
                    break;
                default:
                    strategicForecastSummaryData.Exit15XBook4 = null;
                    break;
            }
        }

        public void exit15XBook5()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Exit15XBook5 = mvSharePriceYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.Exit15XBook5 = mvSharePriceYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.Exit15XBook5 = mvSharePriceYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.Exit15XBook5 = mvSharePriceYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.Exit15XBook5 = mvSharePriceYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.Exit15XBook5 = mvSharePriceYear55();
                    break;
                default:
                    strategicForecastSummaryData.Exit15XBook5 = null;
                    break;
            }
        }

        public void exit15XBook6()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Exit15XBook6 = mvSharePriceYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.Exit15XBook6 = mvSharePriceYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.Exit15XBook6 = mvSharePriceYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.Exit15XBook6 = mvSharePriceYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.Exit15XBook6 = mvSharePriceYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.Exit15XBook6 = mvSharePriceYear65();
                    break;
                default:
                    strategicForecastSummaryData.Exit15XBook6 = null;
                    break;
            }
        }

        public void exit15XBook7()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Exit15XBook7 = mvSharePriceYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.Exit15XBook7 = mvSharePriceYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.Exit15XBook7 = mvSharePriceYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.Exit15XBook7 = mvSharePriceYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.Exit15XBook7 = mvSharePriceYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.Exit15XBook7 = mvSharePriceYear75();
                    break;
                default:
                    strategicForecastSummaryData.Exit15XBook7 = null;
                    break;
            }
        }

        public void exit15XBook8()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.Exit15XBook8 = mvSharePriceYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.Exit15XBook8 = mvSharePriceYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.Exit15XBook8 = mvSharePriceYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.Exit15XBook8 = mvSharePriceYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.Exit15XBook8 = mvSharePriceYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.Exit15XBook8 = mvSharePriceYear85();
                    break;
                default:
                    strategicForecastSummaryData.Exit15XBook8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - ExitEPS15X
        public void exitEPS15X1()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS15X1 = earningsPerShare15PriceYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS15X1 = earningsPerShare15PriceYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS15X1 = earningsPerShare15PriceYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS15X1 = earningsPerShare15PriceYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS15X1 = earningsPerShare15PriceYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS15X1 = earningsPerShare15PriceYear15();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS15X1 = null;
                    break;
            }
        }

        public void exitEPS15X2()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS15X2 = earningsPerShare15PriceYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS15X2 = earningsPerShare15PriceYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS15X2 = earningsPerShare15PriceYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS15X2 = earningsPerShare15PriceYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS15X2 = earningsPerShare15PriceYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS15X2 = earningsPerShare15PriceYear25();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS15X2 = null;
                    break;
            }
        }

        public void exitEPS15X3()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS15X3 = earningsPerShare15PriceYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS15X3 = earningsPerShare15PriceYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS15X3 = earningsPerShare15PriceYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS15X3 = earningsPerShare15PriceYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS15X3 = earningsPerShare15PriceYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS15X3 = earningsPerShare15PriceYear35();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS15X3 = null;
                    break;
            }
        }

        public void exitEPS15X4()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS15X4 = earningsPerShare15PriceYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS15X4 = earningsPerShare15PriceYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS15X4 = earningsPerShare15PriceYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS15X4 = earningsPerShare15PriceYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS15X4 = earningsPerShare15PriceYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS15X4 = earningsPerShare15PriceYear45();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS15X4 = null;
                    break;
            }
        }

        public void exitEPS15X5()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS15X5 = earningsPerShare15PriceYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS15X5 = earningsPerShare15PriceYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS15X5 = earningsPerShare15PriceYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS15X5 = earningsPerShare15PriceYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS15X5 = earningsPerShare15PriceYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS15X5 = earningsPerShare15PriceYear55();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS15X5 = null;
                    break;
            }
        }

        public void exitEPS15X6()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS15X6 = earningsPerShare15PriceYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS15X6 = earningsPerShare15PriceYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS15X6 = earningsPerShare15PriceYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS15X6 = earningsPerShare15PriceYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS15X6 = earningsPerShare15PriceYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS15X6 = earningsPerShare15PriceYear65();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS15X6 = null;
                    break;
            }
        }

        public void exitEPS15X7()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS15X7 = earningsPerShare15PriceYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS15X7 = earningsPerShare15PriceYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS15X7 = earningsPerShare15PriceYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS15X7 = earningsPerShare15PriceYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS15X7 = earningsPerShare15PriceYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS15X7 = earningsPerShare15PriceYear75();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS15X7 = null;
                    break;
            }
        }

        public void exitEPS15X8()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS15X8 = earningsPerShare15PriceYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS15X8 = earningsPerShare15PriceYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS15X8 = earningsPerShare15PriceYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS15X8 = earningsPerShare15PriceYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS15X8 = earningsPerShare15PriceYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS15X8 = earningsPerShare15PriceYear85();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS15X8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - ExitEPS20X
        public void exitEPS20X1()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS20X1 = earningsPerShare20PriceYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS20X1 = earningsPerShare20PriceYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS20X1 = earningsPerShare20PriceYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS20X1 = earningsPerShare20PriceYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS20X1 = earningsPerShare20PriceYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS20X1 = earningsPerShare20PriceYear15();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS20X1 = null;
                    break;
            }
        }

        public void exitEPS20X2()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS20X2 = earningsPerShare20PriceYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS20X2 = earningsPerShare20PriceYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS20X2 = earningsPerShare20PriceYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS20X2 = earningsPerShare20PriceYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS20X2 = earningsPerShare20PriceYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS20X2 = earningsPerShare20PriceYear25();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS20X2 = null;
                    break;
            }
        }

        public void exitEPS20X3()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS20X3 = earningsPerShare20PriceYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS20X3 = earningsPerShare20PriceYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS20X3 = earningsPerShare20PriceYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS20X3 = earningsPerShare20PriceYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS20X3 = earningsPerShare20PriceYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS20X3 = earningsPerShare20PriceYear35();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS20X3 = null;
                    break;
            }
        }

        public void exitEPS20X4()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS20X4 = earningsPerShare20PriceYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS20X4 = earningsPerShare20PriceYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS20X4 = earningsPerShare20PriceYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS20X4 = earningsPerShare20PriceYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS20X4 = earningsPerShare20PriceYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS20X4 = earningsPerShare20PriceYear45();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS20X4 = null;
                    break;
            }
        }

        public void exitEPS20X5()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS20X5 = earningsPerShare20PriceYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS20X5 = earningsPerShare20PriceYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS20X5 = earningsPerShare20PriceYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS20X5 = earningsPerShare20PriceYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS20X5 = earningsPerShare20PriceYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS20X5 = earningsPerShare20PriceYear55();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS20X5 = null;
                    break;
            }
        }

        public void exitEPS20X6()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS20X6 = earningsPerShare20PriceYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS20X6 = earningsPerShare20PriceYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS20X6 = earningsPerShare20PriceYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS20X6 = earningsPerShare20PriceYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS20X6 = earningsPerShare20PriceYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS20X6 = earningsPerShare20PriceYear65();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS20X6 = null;
                    break;
            }
        }

        public void exitEPS20X7()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS20X7 = earningsPerShare20PriceYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS20X7 = earningsPerShare20PriceYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS20X7 = earningsPerShare20PriceYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS20X7 = earningsPerShare20PriceYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS20X7 = earningsPerShare20PriceYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS20X7 = earningsPerShare20PriceYear75();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS20X7 = null;
                    break;
            }
        }

        public void exitEPS20X8()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.ExitEPS20X8 = earningsPerShare20PriceYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.ExitEPS20X8 = earningsPerShare20PriceYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.ExitEPS20X8 = earningsPerShare20PriceYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.ExitEPS20X8 = earningsPerShare20PriceYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.ExitEPS20X8 = earningsPerShare20PriceYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.ExitEPS20X8 = earningsPerShare20PriceYear85();
                    break;
                default:
                    strategicForecastSummaryData.ExitEPS20X8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - DividendPerShare
        public void dividendPerShare1()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.DividendPerShare1 = dividendPerSharePriceYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.DividendPerShare1 = dividendPerSharePriceYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.DividendPerShare1 = dividendPerSharePriceYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.DividendPerShare1 = dividendPerSharePriceYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.DividendPerShare1 = dividendPerSharePriceYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.DividendPerShare1 = dividendPerSharePriceYear15();
                    break;
                default:
                    strategicForecastSummaryData.DividendPerShare1 = null;
                    break;
            }
        }

        public void dividendPerShare2()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.DividendPerShare2 = dividendPerSharePriceYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.DividendPerShare2 = dividendPerSharePriceYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.DividendPerShare2 = dividendPerSharePriceYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.DividendPerShare2 = dividendPerSharePriceYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.DividendPerShare2 = dividendPerSharePriceYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.DividendPerShare2 = dividendPerSharePriceYear25();
                    break;
                default:
                    strategicForecastSummaryData.DividendPerShare2 = null;
                    break;
            }
        }

        public void dividendPerShare3()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.DividendPerShare3 = dividendPerSharePriceYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.DividendPerShare3 = dividendPerSharePriceYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.DividendPerShare3 = dividendPerSharePriceYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.DividendPerShare3 = dividendPerSharePriceYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.DividendPerShare3 = dividendPerSharePriceYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.DividendPerShare3 = dividendPerSharePriceYear35();
                    break;
                default:
                    strategicForecastSummaryData.DividendPerShare3 = null;
                    break;
            }
        }

        public void dividendPerShare4()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.DividendPerShare4 = dividendPerSharePriceYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.DividendPerShare4 = dividendPerSharePriceYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.DividendPerShare4 = dividendPerSharePriceYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.DividendPerShare4 = dividendPerSharePriceYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.DividendPerShare4 = dividendPerSharePriceYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.DividendPerShare4 = dividendPerSharePriceYear45();
                    break;
                default:
                    strategicForecastSummaryData.DividendPerShare4 = null;
                    break;
            }
        }

        public void dividendPerShare5()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.DividendPerShare5 = dividendPerSharePriceYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.DividendPerShare5 = dividendPerSharePriceYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.DividendPerShare5 = dividendPerSharePriceYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.DividendPerShare5 = dividendPerSharePriceYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.DividendPerShare5 = dividendPerSharePriceYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.DividendPerShare5 = dividendPerSharePriceYear55();
                    break;
                default:
                    strategicForecastSummaryData.DividendPerShare5 = null;
                    break;
            }
        }

        public void dividendPerShare6()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.DividendPerShare6 = dividendPerSharePriceYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.DividendPerShare6 = dividendPerSharePriceYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.DividendPerShare6 = dividendPerSharePriceYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.DividendPerShare6 = dividendPerSharePriceYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.DividendPerShare6 = dividendPerSharePriceYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.DividendPerShare6 = dividendPerSharePriceYear65();
                    break;
                default:
                    strategicForecastSummaryData.DividendPerShare6 = null;
                    break;
            }
        }

        public void dividendPerShare7()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.DividendPerShare7 = dividendPerSharePriceYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.DividendPerShare7 = dividendPerSharePriceYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.DividendPerShare7 = dividendPerSharePriceYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.DividendPerShare7 = dividendPerSharePriceYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.DividendPerShare7 = dividendPerSharePriceYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.DividendPerShare7 = dividendPerSharePriceYear75();
                    break;
                default:
                    strategicForecastSummaryData.DividendPerShare7 = null;
                    break;
            }
        }

        public void dividendPerShare8()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.DividendPerShare8 = dividendPerSharePriceYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.DividendPerShare8 = dividendPerSharePriceYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.DividendPerShare8 = dividendPerSharePriceYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.DividendPerShare8 = dividendPerSharePriceYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.DividendPerShare8 = dividendPerSharePriceYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.DividendPerShare8 = dividendPerSharePriceYear85();
                    break;
                default:
                    strategicForecastSummaryData.DividendPerShare8 = null;
                    break;
            }
        }
        #endregion
        #region // Row - SharesOutstanding
        public void sharesOutstanding1()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.SharesOutstanding1 = sharesOutstandingYear10();
                    break;
                case 2:
                    strategicForecastSummaryData.SharesOutstanding1 = sharesOutstandingYear11();
                    break;
                case 3:
                    strategicForecastSummaryData.SharesOutstanding1 = sharesOutstandingYear12();
                    break;
                case 4:
                    strategicForecastSummaryData.SharesOutstanding1 = sharesOutstandingYear13();
                    break;
                case 5:
                    strategicForecastSummaryData.SharesOutstanding1 = sharesOutstandingYear14();
                    break;
                case 6:
                    strategicForecastSummaryData.SharesOutstanding1 = sharesOutstandingYear15();
                    break;
                default:
                    strategicForecastSummaryData.SharesOutstanding1 = null;
                    break;
            }
        }

        public void sharesOutstanding2()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.SharesOutstanding2 = sharesOutstandingYear20();
                    break;
                case 2:
                    strategicForecastSummaryData.SharesOutstanding2 = sharesOutstandingYear21();
                    break;
                case 3:
                    strategicForecastSummaryData.SharesOutstanding2 = sharesOutstandingYear22();
                    break;
                case 4:
                    strategicForecastSummaryData.SharesOutstanding2 = sharesOutstandingYear23();
                    break;
                case 5:
                    strategicForecastSummaryData.SharesOutstanding2 = sharesOutstandingYear24();
                    break;
                case 6:
                    strategicForecastSummaryData.SharesOutstanding2 = sharesOutstandingYear25();
                    break;
                default:
                    strategicForecastSummaryData.SharesOutstanding2 = null;
                    break;
            }
        }

        public void sharesOutstanding3()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.SharesOutstanding3 = sharesOutstandingYear30();
                    break;
                case 2:
                    strategicForecastSummaryData.SharesOutstanding3 = sharesOutstandingYear31();
                    break;
                case 3:
                    strategicForecastSummaryData.SharesOutstanding3 = sharesOutstandingYear32();
                    break;
                case 4:
                    strategicForecastSummaryData.SharesOutstanding3 = sharesOutstandingYear33();
                    break;
                case 5:
                    strategicForecastSummaryData.SharesOutstanding3 = sharesOutstandingYear34();
                    break;
                case 6:
                    strategicForecastSummaryData.SharesOutstanding3 = sharesOutstandingYear35();
                    break;
                default:
                    strategicForecastSummaryData.SharesOutstanding3 = null;
                    break;
            }
        }

        public void sharesOutstanding4()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.SharesOutstanding4 = sharesOutstandingYear40();
                    break;
                case 2:
                    strategicForecastSummaryData.SharesOutstanding4 = sharesOutstandingYear41();
                    break;
                case 3:
                    strategicForecastSummaryData.SharesOutstanding4 = sharesOutstandingYear42();
                    break;
                case 4:
                    strategicForecastSummaryData.SharesOutstanding4 = sharesOutstandingYear43();
                    break;
                case 5:
                    strategicForecastSummaryData.SharesOutstanding4 = sharesOutstandingYear44();
                    break;
                case 6:
                    strategicForecastSummaryData.SharesOutstanding4 = sharesOutstandingYear45();
                    break;
                default:
                    strategicForecastSummaryData.SharesOutstanding4 = null;
                    break;
            }
        }

        public void sharesOutstanding5()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.SharesOutstanding5 = sharesOutstandingYear50();
                    break;
                case 2:
                    strategicForecastSummaryData.SharesOutstanding5 = sharesOutstandingYear51();
                    break;
                case 3:
                    strategicForecastSummaryData.SharesOutstanding5 = sharesOutstandingYear52();
                    break;
                case 4:
                    strategicForecastSummaryData.SharesOutstanding5 = sharesOutstandingYear53();
                    break;
                case 5:
                    strategicForecastSummaryData.SharesOutstanding5 = sharesOutstandingYear54();
                    break;
                case 6:
                    strategicForecastSummaryData.SharesOutstanding5 = sharesOutstandingYear55();
                    break;
                default:
                    strategicForecastSummaryData.SharesOutstanding5 = null;
                    break;
            }
        }

        public void sharesOutstanding6()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.SharesOutstanding6 = sharesOutstandingYear60();
                    break;
                case 2:
                    strategicForecastSummaryData.SharesOutstanding6 = sharesOutstandingYear61();
                    break;
                case 3:
                    strategicForecastSummaryData.SharesOutstanding6 = sharesOutstandingYear62();
                    break;
                case 4:
                    strategicForecastSummaryData.SharesOutstanding6 = sharesOutstandingYear63();
                    break;
                case 5:
                    strategicForecastSummaryData.SharesOutstanding6 = sharesOutstandingYear64();
                    break;
                case 6:
                    strategicForecastSummaryData.SharesOutstanding6 = sharesOutstandingYear65();
                    break;
                default:
                    strategicForecastSummaryData.SharesOutstanding6 = null;
                    break;
            }
        }

        public void sharesOutstanding7()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.SharesOutstanding7 = sharesOutstandingYear70();
                    break;
                case 2:
                    strategicForecastSummaryData.SharesOutstanding7 = sharesOutstandingYear71();
                    break;
                case 3:
                    strategicForecastSummaryData.SharesOutstanding7 = sharesOutstandingYear72();
                    break;
                case 4:
                    strategicForecastSummaryData.SharesOutstanding7 = sharesOutstandingYear73();
                    break;
                case 5:
                    strategicForecastSummaryData.SharesOutstanding7 = sharesOutstandingYear74();
                    break;
                case 6:
                    strategicForecastSummaryData.SharesOutstanding7 = sharesOutstandingYear75();
                    break;
                default:
                    strategicForecastSummaryData.SharesOutstanding7 = null;
                    break;
            }
        }

        public void sharesOutstanding8()
        {

            switch (dsahboardParams.SelectedHorizon)
            {
                case 1:
                    strategicForecastSummaryData.SharesOutstanding8 = sharesOutstandingYear80();
                    break;
                case 2:
                    strategicForecastSummaryData.SharesOutstanding8 = sharesOutstandingYear81();
                    break;
                case 3:
                    strategicForecastSummaryData.SharesOutstanding8 = sharesOutstandingYear82();
                    break;
                case 4:
                    strategicForecastSummaryData.SharesOutstanding8 = sharesOutstandingYear83();
                    break;
                case 5:
                    strategicForecastSummaryData.SharesOutstanding8 = sharesOutstandingYear84();
                    break;
                case 6:
                    strategicForecastSummaryData.SharesOutstanding8 = sharesOutstandingYear85();
                    break;
                default:
                    strategicForecastSummaryData.SharesOutstanding8 = null;
                    break;
            }
        }
        #endregion

        public void calculateColumn1Values(StrategicForecastInput modelObj1)
        {
            strategicForecastSummaryData.SelectedScenario1 = modelObj1;
            strategicForecastSummaryData.SelectedScenario1.UseNetIncomeInput = modelObj1.UseNetIncomeInput;
            strategicForecastSummaryData.SelectedScenario1.UseCashDividendsInput = modelObj1.UseCashDividendsInput;
            strategicForecastSummaryData.SelectedScenario1.UseNewCapitalInput = modelObj1.UseNewCapitalInput;
            strategicForecastSummaryData.SelectedScenario1.UseCet1CapitalAdjustmentInput = modelObj1.UseCet1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario1.UseTier1CapitalAdjustmentInput = modelObj1.UseTier1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario1.UseTier2CapitalInput = modelObj1.UseTier2CapitalInput;
            strategicForecastSummaryData.SelectedScenario1.UseRiskWeightedAssetsInput = modelObj1.UseRiskWeightedAssetsInput;
            strategicForecastSummaryData.SelectedScenario1.UseTotalAssetsForLeverageInput = modelObj1.UseTotalAssetsForLeverageInput;
            strategicForecastSummaryData.SelectedScenario1.UseSharesOutstandingInput = modelObj1.UseSharesOutstandingInput;
            newCapital1();
            priceConversion1();
            totalAssets1();
            averageAnnualGrowth1();
            netIncome1();
            tier1LeverageRatio1();
            totalCapitalRatio1();
            rOAA1();
            rOAE1();
            bookValueEquity1();
            marketValueEquity1();
            bookValuePerShare1();
            ePS1();
            exit15XBook1();
            exitEPS15X1();
            exitEPS20X1();
            dividendPerShare1();
            sharesOutstanding1();
        }

        public void calculateColumn2Values(StrategicForecastInput modelObj2)
        {
            strategicForecastSummaryData.SelectedScenario2 = modelObj2;
            strategicForecastSummaryData.SelectedScenario2.UseNetIncomeInput = modelObj2.UseNetIncomeInput;
            strategicForecastSummaryData.SelectedScenario2.UseCashDividendsInput = modelObj2.UseCashDividendsInput;
            strategicForecastSummaryData.SelectedScenario2.UseNewCapitalInput = modelObj2.UseNewCapitalInput;
            strategicForecastSummaryData.SelectedScenario2.UseCet1CapitalAdjustmentInput = modelObj2.UseCet1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario2.UseTier1CapitalAdjustmentInput = modelObj2.UseTier1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario2.UseTier2CapitalInput = modelObj2.UseTier2CapitalInput;
            strategicForecastSummaryData.SelectedScenario2.UseRiskWeightedAssetsInput = modelObj2.UseRiskWeightedAssetsInput;
            strategicForecastSummaryData.SelectedScenario2.UseTotalAssetsForLeverageInput = modelObj2.UseTotalAssetsForLeverageInput;
            strategicForecastSummaryData.SelectedScenario2.UseSharesOutstandingInput = modelObj2.UseSharesOutstandingInput;
            newCapital2();
            priceConversion2();
            totalAssets2();
            averageAnnualGrowth2();
            netIncome2();
            tier1LeverageRatio2();
            totalCapitalRatio2();
            rOAA2();
            rOAE2();
            bookValueEquity2();
            marketValueEquity2();
            bookValuePerShare2();
            ePS2();
            exit15XBook2();
            exitEPS15X2();
            exitEPS20X2();
            dividendPerShare2();
            sharesOutstanding2();
        }

        public void calculateColumn3Values(StrategicForecastInput modelObj3)
        {
            strategicForecastSummaryData.SelectedScenario3 = modelObj3;
            strategicForecastSummaryData.SelectedScenario3.UseNetIncomeInput = modelObj3.UseNetIncomeInput;
            strategicForecastSummaryData.SelectedScenario3.UseCashDividendsInput = modelObj3.UseCashDividendsInput;
            strategicForecastSummaryData.SelectedScenario3.UseNewCapitalInput = modelObj3.UseNewCapitalInput;
            strategicForecastSummaryData.SelectedScenario3.UseCet1CapitalAdjustmentInput = modelObj3.UseCet1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario3.UseTier1CapitalAdjustmentInput = modelObj3.UseTier1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario3.UseTier2CapitalInput = modelObj3.UseTier2CapitalInput;
            strategicForecastSummaryData.SelectedScenario3.UseRiskWeightedAssetsInput = modelObj3.UseRiskWeightedAssetsInput;
            strategicForecastSummaryData.SelectedScenario3.UseTotalAssetsForLeverageInput = modelObj3.UseTotalAssetsForLeverageInput;
            strategicForecastSummaryData.SelectedScenario3.UseSharesOutstandingInput = modelObj3.UseSharesOutstandingInput;
            newCapital3();
            priceConversion3();
            totalAssets3();
            averageAnnualGrowth3();
            netIncome3();
            tier1LeverageRatio3();
            totalCapitalRatio3();
            rOAA3();
            rOAE3();
            bookValueEquity3();
            marketValueEquity3();
            bookValuePerShare3();
            ePS3();
            exit15XBook3();
            exitEPS15X3();
            exitEPS20X3();
            dividendPerShare3();
            sharesOutstanding3();
        }

        public void calculateColumn4Values(StrategicForecastInput modelObj4)
        {
            strategicForecastSummaryData.SelectedScenario4 = modelObj4;
            strategicForecastSummaryData.SelectedScenario4.UseNetIncomeInput = modelObj4.UseNetIncomeInput;
            strategicForecastSummaryData.SelectedScenario4.UseCashDividendsInput = modelObj4.UseCashDividendsInput;
            strategicForecastSummaryData.SelectedScenario4.UseNewCapitalInput = modelObj4.UseNewCapitalInput;
            strategicForecastSummaryData.SelectedScenario4.UseCet1CapitalAdjustmentInput = modelObj4.UseCet1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario4.UseTier1CapitalAdjustmentInput = modelObj4.UseTier1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario4.UseTier2CapitalInput = modelObj4.UseTier2CapitalInput;
            strategicForecastSummaryData.SelectedScenario4.UseRiskWeightedAssetsInput = modelObj4.UseRiskWeightedAssetsInput;
            strategicForecastSummaryData.SelectedScenario4.UseTotalAssetsForLeverageInput = modelObj4.UseTotalAssetsForLeverageInput;
            strategicForecastSummaryData.SelectedScenario4.UseSharesOutstandingInput = modelObj4.UseSharesOutstandingInput;
            newCapital4();
            priceConversion4();
            totalAssets4();
            averageAnnualGrowth4();
            netIncome4();
            tier1LeverageRatio4();
            totalCapitalRatio4();
            rOAA4();
            rOAE4();
            bookValueEquity4();
            marketValueEquity4();
            bookValuePerShare4();
            ePS4();
            exit15XBook4();
            exitEPS15X4();
            exitEPS20X4();
            dividendPerShare4();
            sharesOutstanding4();
        }

        public void calculateColumn5Values(StrategicForecastInput modelObj5)
        {
            strategicForecastSummaryData.SelectedScenario5 = modelObj5;
            strategicForecastSummaryData.SelectedScenario5.UseNetIncomeInput = modelObj5.UseNetIncomeInput;
            strategicForecastSummaryData.SelectedScenario5.UseCashDividendsInput = modelObj5.UseCashDividendsInput;
            strategicForecastSummaryData.SelectedScenario5.UseNewCapitalInput = modelObj5.UseNewCapitalInput;
            strategicForecastSummaryData.SelectedScenario5.UseCet1CapitalAdjustmentInput = modelObj5.UseCet1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario5.UseTier1CapitalAdjustmentInput = modelObj5.UseTier1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario5.UseTier2CapitalInput = modelObj5.UseTier2CapitalInput;
            strategicForecastSummaryData.SelectedScenario5.UseRiskWeightedAssetsInput = modelObj5.UseRiskWeightedAssetsInput;
            strategicForecastSummaryData.SelectedScenario5.UseTotalAssetsForLeverageInput = modelObj5.UseTotalAssetsForLeverageInput;
            strategicForecastSummaryData.SelectedScenario5.UseSharesOutstandingInput = modelObj5.UseSharesOutstandingInput;
            newCapital5();
            priceConversion5();
            totalAssets5();
            averageAnnualGrowth5();
            netIncome5();
            tier1LeverageRatio5();
            totalCapitalRatio5();
            rOAA5();
            rOAE5();
            bookValueEquity5();
            marketValueEquity5();
            bookValuePerShare5();
            ePS5();
            exit15XBook5();
            exitEPS15X5();
            exitEPS20X5();
            dividendPerShare5();
            sharesOutstanding5();
        }

        public void calculateColumn6Values(StrategicForecastInput modelObj6)
        {
            strategicForecastSummaryData.SelectedScenario6 = modelObj6;
            strategicForecastSummaryData.SelectedScenario6.UseNetIncomeInput = modelObj6.UseNetIncomeInput;
            strategicForecastSummaryData.SelectedScenario6.UseCashDividendsInput = modelObj6.UseCashDividendsInput;
            strategicForecastSummaryData.SelectedScenario6.UseNewCapitalInput = modelObj6.UseNewCapitalInput;
            strategicForecastSummaryData.SelectedScenario6.UseCet1CapitalAdjustmentInput = modelObj6.UseCet1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario6.UseTier1CapitalAdjustmentInput = modelObj6.UseTier1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario6.UseTier2CapitalInput = modelObj6.UseTier2CapitalInput;
            strategicForecastSummaryData.SelectedScenario6.UseRiskWeightedAssetsInput = modelObj6.UseRiskWeightedAssetsInput;
            strategicForecastSummaryData.SelectedScenario6.UseTotalAssetsForLeverageInput = modelObj6.UseTotalAssetsForLeverageInput;
            strategicForecastSummaryData.SelectedScenario6.UseSharesOutstandingInput = modelObj6.UseSharesOutstandingInput;
            newCapital6();
            priceConversion6();
            totalAssets6();
            averageAnnualGrowth6();
            netIncome6();
            tier1LeverageRatio6();
            totalCapitalRatio6();
            rOAA6();
            rOAE6();
            bookValueEquity6();
            marketValueEquity6();
            bookValuePerShare6();
            ePS6();
            exit15XBook6();
            exitEPS15X6();
            exitEPS20X6();
            dividendPerShare6();
            sharesOutstanding6();
        }

        public void calculateColumn7Values(StrategicForecastInput modelObj7)
        {
            strategicForecastSummaryData.SelectedScenario7 = modelObj7;
            strategicForecastSummaryData.SelectedScenario7.UseNetIncomeInput = modelObj7.UseNetIncomeInput;
            strategicForecastSummaryData.SelectedScenario7.UseCashDividendsInput = modelObj7.UseCashDividendsInput;
            strategicForecastSummaryData.SelectedScenario7.UseNewCapitalInput = modelObj7.UseNewCapitalInput;
            strategicForecastSummaryData.SelectedScenario7.UseCet1CapitalAdjustmentInput = modelObj7.UseCet1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario7.UseTier1CapitalAdjustmentInput = modelObj7.UseTier1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario7.UseTier2CapitalInput = modelObj7.UseTier2CapitalInput;
            strategicForecastSummaryData.SelectedScenario7.UseRiskWeightedAssetsInput = modelObj7.UseRiskWeightedAssetsInput;
            strategicForecastSummaryData.SelectedScenario7.UseTotalAssetsForLeverageInput = modelObj7.UseTotalAssetsForLeverageInput;
            strategicForecastSummaryData.SelectedScenario7.UseSharesOutstandingInput = modelObj7.UseSharesOutstandingInput;
            newCapital7();
            priceConversion7();
            totalAssets7();
            averageAnnualGrowth7();
            netIncome7();
            tier1LeverageRatio7();
            totalCapitalRatio7();
            rOAA7();
            rOAE7();
            bookValueEquity7();
            marketValueEquity7();
            bookValuePerShare7();
            ePS7();
            exit15XBook7();
            exitEPS15X7();
            exitEPS20X7();
            dividendPerShare7();
            sharesOutstanding7();
        }

        public void calculateColumn8Values(StrategicForecastInput modelObj8)
        {
            strategicForecastSummaryData.SelectedScenario8 = modelObj8;
            strategicForecastSummaryData.SelectedScenario8.UseNetIncomeInput = modelObj8.UseNetIncomeInput;
            strategicForecastSummaryData.SelectedScenario8.UseCashDividendsInput = modelObj8.UseCashDividendsInput;
            strategicForecastSummaryData.SelectedScenario8.UseNewCapitalInput = modelObj8.UseNewCapitalInput;
            strategicForecastSummaryData.SelectedScenario8.UseCet1CapitalAdjustmentInput = modelObj8.UseCet1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario8.UseTier1CapitalAdjustmentInput = modelObj8.UseTier1CapitalAdjustmentInput;
            strategicForecastSummaryData.SelectedScenario8.UseTier2CapitalInput = modelObj8.UseTier2CapitalInput;
            strategicForecastSummaryData.SelectedScenario8.UseRiskWeightedAssetsInput = modelObj8.UseRiskWeightedAssetsInput;
            strategicForecastSummaryData.SelectedScenario8.UseTotalAssetsForLeverageInput = modelObj8.UseTotalAssetsForLeverageInput;
            strategicForecastSummaryData.SelectedScenario8.UseSharesOutstandingInput = modelObj8.UseSharesOutstandingInput;
            newCapital8();
            priceConversion8();
            totalAssets8();
            averageAnnualGrowth8();
            netIncome8();
            tier1LeverageRatio8();
            totalCapitalRatio8();
            rOAA8();
            rOAE8();
            bookValueEquity8();
            marketValueEquity8();
            bookValuePerShare8();
            ePS8();
            exit15XBook8();
            exitEPS15X8();
            exitEPS20X8();
            dividendPerShare8();
            sharesOutstanding8();
        }

    }
}
