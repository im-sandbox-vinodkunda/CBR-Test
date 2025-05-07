using CBR.Common;
using CBR.DataAccess;
using CBR.Web.CustomFilter;
using CBR.Web.Models;
using CBR.Web.WebCommons;
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
    public class DashboardApiController : ApiController
    {
        [HttpGet]
        public DefaultBankDetails GetDefaultBankDetails()
        {
            DefaultBankDetails defaultBankDetails = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                int defaultInstitutionId = WebCommons.UtilityFunctions.GetInstitutionKey(User.Identity.Name);
                if (defaultInstitutionId != int.MinValue)
                {
                    SqlParameter institutionKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                    institutionKey.Value = defaultInstitutionId;
                    var result = ent.Database.SqlQuery<DefaultBankDetails>("dbo.uspRptGetBankDetails @InstitutionKey", institutionKey).FirstOrDefault();
                    result.InstitutionKey = defaultInstitutionId;
                    defaultBankDetails = result;
                }
            }
            catch(Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return defaultBankDetails;
        }

        [HttpGet]
        public List<Institution> GetInstitutionsForUser()
        {
            List<Institution> institutionList = null;
            try
            {
                institutionList = UtilityFunctions.GetInstitutionListForUserTenantBank(User.Identity.Name);
                institutionList = institutionList.OrderBy(obj => obj.InstitutionName).ToList();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return institutionList;
        }

    }
}
