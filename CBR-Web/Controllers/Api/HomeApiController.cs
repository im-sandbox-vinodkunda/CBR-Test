using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CBR.DataAccess;
using CBR.Common;
using CBR.Web.WebCommons;
using CBR.Web.Models;
using System.Data;
using System.Data.SqlClient;
using CBR.Web.CustomFilter;

namespace CBR.Web.Controllers.Api
{
    public class HomeApiController : ApiController
    {
        public Dictionary<string,List<HomeScreenData>> GetHomeScreenData()
        {
            Dictionary<string, List<HomeScreenData>> homeScreenData = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                DataTable homeScreenDataParam = new DataTable();
                homeScreenDataParam.Columns.Add("InstitutionKey",typeof(int));
                int instKey = UtilityFunctions.GetDefaultInstitutionKey(User.Identity.Name);
                homeScreenDataParam.Rows.Add(instKey);
                SqlParameter homeScreenParam = new SqlParameter("@InstitutionTable", SqlDbType.Structured);
                homeScreenParam.Value = homeScreenDataParam;
                homeScreenParam.TypeName = "dbo.InstitutionType";
                var result = ent.Database.SqlQuery<HomeScreenData>("exec dbo.uspRptHomePageData @InstitutionTable", homeScreenParam).ToList();
                if(result != null && result.Count > 0)
                {
                    homeScreenData = new Dictionary<string, List<HomeScreenData>>();
                    homeScreenData.Add("CALC0001", result.Where(obj => obj.UBPRConceptCode == "CALC0001").ToList());
                    homeScreenData.Add("UBPR7414", result.Where(obj => obj.UBPRConceptCode == "UBPR7414").ToList());
                    homeScreenData.Add("UBPRE013", result.Where(obj => obj.UBPRConceptCode == "UBPRE013").ToList());
                    homeScreenData.Add("UBPRE630", result.Where(obj => obj.UBPRConceptCode == "UBPRE630").ToList());
                    homeScreenData.Add("CALC0007", result.Where(obj => obj.UBPRConceptCode == "CALC0007").ToList());
                    homeScreenData.Add("CALC0008", result.Where(obj => obj.UBPRConceptCode == "CALC0008").ToList());
                    homeScreenData.Add("UBPRE091", result.Where(obj => obj.UBPRConceptCode == "UBPRE091").ToList());
                    homeScreenData.Add("UBPRE115", result.Where(obj => obj.UBPRConceptCode == "UBPRE115").ToList());
                }
            }
            catch(Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return homeScreenData;
        }

        public Dictionary<string, ChartCategoryAndSeriesData> GetHomeScreenChartData()
        {
            Dictionary<string, ChartCategoryAndSeriesData> chartData = new Dictionary<string, ChartCategoryAndSeriesData>();
            ChartCategoryAndSeriesData categoryAndSeries = null;
            CategoryList cate = null;
            Category cg = null;
            CategoryLabel label = null;
            DataValue institutionDataValue = null;
            DataSetDataItem institutionDataSet = null;

            try
            {
                Dictionary<string, List<HomeScreenData>> homeScreenData = this.GetHomeScreenData();

                foreach(string key in homeScreenData.Keys)
                {
                    categoryAndSeries = new ChartCategoryAndSeriesData();
                    cate = new CategoryList();
                    cg = new Category();

                    string lastQuarterString = CommonFunctions.GetLastQuarterString();
                    string month = lastQuarterString.Substring(4, 2);
                    string year = lastQuarterString.Substring(0, 4);
                    string day = lastQuarterString.Substring(6, 2);
                    DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));

                    for (int i = (latestQuarterDate.Year - 4); i < (latestQuarterDate.Year + 1); i++)
                    {
                        label = new CategoryLabel();
                        label.Label = i.ToString() + "Y";
                        cg.CategoryLabels.Add(label);
                    }

                    cate.Category = cg;
                    categoryAndSeries.Categories = cate;

                    List<HomeScreenData> allBankUbpr = homeScreenData[key];
                    foreach(HomeScreenData distinctBank in allBankUbpr)
                    {
                        institutionDataSet = new DataSetDataItem();
                        institutionDataSet.Data = new List<DataValue>();
                        institutionDataSet.SeriesName = distinctBank.InstitutionName;

                        institutionDataValue = new DataValue();
                        institutionDataValue.Value = distinctBank.Minus4Data.ToString();
                        institutionDataSet.Data.Add(institutionDataValue);

                        institutionDataValue = new DataValue();
                        institutionDataValue.Value = distinctBank.Minus3Data.ToString();
                        institutionDataSet.Data.Add(institutionDataValue);

                        institutionDataValue = new DataValue();
                        institutionDataValue.Value = distinctBank.Minus2Data.ToString();
                        institutionDataSet.Data.Add(institutionDataValue);

                        institutionDataValue = new DataValue();
                        institutionDataValue.Value = distinctBank.Minus1Data.ToString();
                        institutionDataSet.Data.Add(institutionDataValue);

                        institutionDataValue = new DataValue();
                        institutionDataValue.Value = distinctBank.CurrentData.ToString();
                        institutionDataSet.Data.Add(institutionDataValue);
                        categoryAndSeries.DataSetList.Add(institutionDataSet);
                    }

                    chartData.Add(key, categoryAndSeries);
                }
            }
            catch(Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return chartData;
        }

        public List<BankProfileSectionHeader> GetYtdHeaders()
        {
            List<BankProfileSectionHeader> headers = new List<BankProfileSectionHeader>();
            headers.Add(new BankProfileSectionHeader() { Label = "Bank Name" });
            string lastQuarterString = CommonFunctions.GetLastQuarterString();
            string month = lastQuarterString.Substring(4, 2);
            string year = lastQuarterString.Substring(0, 4);
            string day = lastQuarterString.Substring(6, 2);
            DateTime latestQuarterDate = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(day));

            for (int i = (latestQuarterDate.Year - 4); i < (latestQuarterDate.Year + 1); i++)
            {
                headers.Add(new BankProfileSectionHeader() { Label = i.ToString() + "Y" });
            }

            return headers;
        }

        [HttpGet]
        public List<NewFileCount> GetNewFileCounts()
        {
            List<NewFileCount> newFileCounts = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);
                SqlParameter tenantKey = new SqlParameter("@TenantKey", SqlDbType.BigInt);
                tenantKey.Value = UtilityFunctions.GetTenantKey(User.Identity.Name);
                newFileCounts = ent.Database.SqlQuery<NewFileCount>("exec dbo.uspRptGetFileCount @UserKey, @TenantKey", userKey, tenantKey).ToList();
            }
            catch(Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return newFileCounts; 
        }

        [HttpGet]
        public List<UserRoleProfile> GetLoggedInUserRoleProfile()
        {
            List<UserRoleProfile> userRoles = null;

            try
            {
                int userKey = Convert.ToInt32(UtilityFunctions.GetUserKey(User.Identity.Name));
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter userKeyParam = new SqlParameter("UserKey", SqlDbType.Int);
                userKeyParam.Value = userKey;
                userRoles = ent.Database.SqlQuery<UserRoleProfile>("dbo.uspRptAppGetUserProfile @UserKey", userKeyParam).ToList<UserRoleProfile>();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return userRoles;
        }

        [HttpGet]
        public string GetLoggedInUserEmail()
        {
            try
            {
                return User.Identity.Name;
            }
            catch (Exception ex)
            { 
                ExceptionHelper.TrackException(ex);
                return "";
            }            
        }

        [HttpGet]
        public List<AccountAccess> GetAccountsModuleAccessState()
        {
            List<AccountAccess> accountAccesses = null;

            try
            {
                long tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name);
               
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter accountKey = new SqlParameter("TenantKey", SqlDbType.Int);
                accountKey.Value = Convert.ToInt32(tenantKey);

                SqlParameter moduleType = new SqlParameter("ModuleType", SqlDbType.VarChar);
                moduleType.Value = "Solutions";

                SqlParameter moduleName = new SqlParameter("ModuleName", SqlDbType.VarChar);
                moduleName.Value = "";

                SqlParameter isAccessible = new SqlParameter("IsAccessible", SqlDbType.Bit);
                isAccessible.Value = DBNull.Value;

                SqlParameter queryType = new SqlParameter("QueryType", SqlDbType.VarChar);
                queryType.Value = "Get";

                accountAccesses = ent.Database.SqlQuery<AccountAccess>("dbo.uspRptGetorUpdateTenantModuleAccess_test @TenantKey, @ModuleType, @ModuleName, @IsAccessible, @QueryType", accountKey, moduleType, moduleName, isAccessible, queryType).ToList<AccountAccess>();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return accountAccesses;
        }
    }
}
