using CBR.Common;
using CBR.Web.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CBR.Web.Controllers.Api
{
    public class PerformanceIndexApiController : ApiController
    {
        [HttpPost]
        public List<Column2DChartDataValue> GetPerformanceIndexChartData(PerformanceIndexChartParams performanceIndexChartParams)
        {
            List<Column2DChartDataValue> column2DChartDataValues = null;
            try
            {
                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("InstitutionKey", SqlDbType.VarChar);
                institutionKey.Value = performanceIndexChartParams.InstitutionKey;
                SqlParameter tabName = new SqlParameter("TabName", SqlDbType.VarChar);
                tabName.Value = performanceIndexChartParams.TabType;
                SqlParameter displayDataType = new SqlParameter("DisplayDataType", SqlDbType.VarChar);
                displayDataType.Value = performanceIndexChartParams.DataType;
                var result = ent.Database.SqlQuery<PerformanceIndexChartData>("dbo.uspRptCBRPerfIndexChart @InstitutionKey, @TabName, @DisplayDataType", institutionKey, tabName, displayDataType).ToList();
                if (result != null && result.Count > 0)
                {
                    column2DChartDataValues = new List<Column2DChartDataValue>();
                    foreach (PerformanceIndexChartData perfIndex in result)
                    {
                        Column2DChartDataValue column2DChartDataValue = new Column2DChartDataValue();
                        column2DChartDataValue.label = perfIndex.Quarter;
                        if(performanceIndexChartParams.DataType == "Ratios")
                            column2DChartDataValue.value = perfIndex.DataValue;
                        else
                            column2DChartDataValue.value = perfIndex.Rank;

                        column2DChartDataValues.Add(column2DChartDataValue);
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return column2DChartDataValues;
        }

        [HttpPost]
        public List<PerformanceIndexDetails> GetPerformanceIndexDetails(PerformanceIndexDetailParams performanceIndexDetailParams)
        {
            List<PerformanceIndexDetails> performanceIndexDetails = null;
            try
            {
                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                SqlParameter tabName = new SqlParameter("TabName", SqlDbType.VarChar);
                tabName.Value = performanceIndexDetailParams.TabName;
                SqlParameter whereClauseParameter = new SqlParameter("WhereClauseParameter", SqlDbType.VarChar);
                whereClauseParameter.Value = performanceIndexDetailParams.WhereClauseParameter;
                performanceIndexDetails = ent.Database.SqlQuery<PerformanceIndexDetails>("dbo.uspRptCBRPerfIndexViewDetails @TabName, @WhereClauseParameter", tabName, whereClauseParameter).ToList();
            }
            catch(Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return performanceIndexDetails;
        }

        [HttpPost]
        public InstitutionDetails GetInstitutionDetails(InstitutionDetailParams institutionDetailParams)
        {
            InstitutionDetails institutionDetails = null;

            try
            {
                CBR.DataAccess.CBRDataWareHouseEntities ent = new DataAccess.CBRDataWareHouseEntities();
                SqlParameter institutionKey = new SqlParameter("InstitutionKey", SqlDbType.VarChar);
                institutionKey.Value = institutionDetailParams.InstitutionKey;
                institutionDetails = ent.Database.SqlQuery<InstitutionDetails>("dbo.uspRptCBRPerfIndexBankInfo @InstitutionKey", institutionKey).FirstOrDefault();
            }
            catch(Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionDetails;
        }
    }
}
