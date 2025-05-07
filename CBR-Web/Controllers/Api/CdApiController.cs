using CBR.Common;
using CBR.DataAccess;
using CBR.Web.CustomFilter;
using CBR.Web.Models;
using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using DocumentFormat.OpenXml.Math;

namespace CBR.Web.Controllers.Api
{
    public class CdApiController : ApiController
    {
        [HttpPost]
        public async Task<int> CreateOrders([FromBody]CreateCdOrdersViewModel[] cdOrderData)
        {
            int result = int.MinValue;
            try
            {
                DataTable createCdOrderParams = new DataTable();
                createCdOrderParams.Columns.Add("OrderKey", typeof(int));
                createCdOrderParams.Columns.Add("OrderDate", typeof(string));
                createCdOrderParams.Columns.Add("InstitutionKey", typeof(int));
                createCdOrderParams.Columns.Add("OrderedBy", typeof(string));
                createCdOrderParams.Columns.Add("ContactPhone", typeof(string));
                createCdOrderParams.Columns.Add("Term", typeof(string));
                createCdOrderParams.Columns.Add("Callable", typeof(string));
                createCdOrderParams.Columns.Add("CallFrequency", typeof(string));
                createCdOrderParams.Columns.Add("Rate", typeof(string));
                createCdOrderParams.Columns.Add("Amount", typeof(string));
                createCdOrderParams.Columns.Add("SettleDate", typeof(string));
                createCdOrderParams.Columns.Add("InterestPaymentFrequency", typeof(string));
                createCdOrderParams.Columns.Add("Status", typeof(string));
                createCdOrderParams.Columns.Add("Notes", typeof(string));

                foreach (CreateCdOrdersViewModel createCdOrderData in cdOrderData)
                {
                    string orderDate = string.Format("{0}/{1}/{2}", createCdOrderData.OrderDate.Month, createCdOrderData.OrderDate.Day, createCdOrderData.OrderDate.Year);
                    createCdOrderParams.Rows.Add(createCdOrderData.OrderKey,
                                                 orderDate,
                                                 createCdOrderData.InstitutionKey,
                                                 createCdOrderData.OrderedBy,
                                                 createCdOrderData.ContactPhone,
                                                 createCdOrderData.Term,
                                                 createCdOrderData.Callable,
                                                 createCdOrderData.CallFrequency,
                                                 createCdOrderData.Rate,
                                                 createCdOrderData.Amount,
                                                 createCdOrderData.SettleDate,
                                                 createCdOrderData.InterestPaymentFrequency,
                                                 createCdOrderData.Status,
                                                 createCdOrderData.Notes);
                }

                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter createOrderParam = new SqlParameter("@OrderDetail", SqlDbType.Structured);
                createOrderParam.Value = createCdOrderParams;
                createOrderParam.TypeName = "dbo.AppCDOrderDetailType";
                ent.Database.CommandTimeout = 600;
                result = ent.Database.SqlQuery<int>("exec dbo.uspRptAppInsertUpdateCDOrders @OrderDetail", createOrderParam).First();

                if (result > 0)
                {
                   await this.SendCdOrderEmail(cdOrderData);
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpPost]
        public int EditOrder([FromBody]CreateCdOrdersViewModel[] cdOrderData)
        {
            int result = int.MinValue;
            try
            {
                DataTable createCdOrderParams = new DataTable();
                createCdOrderParams.Columns.Add("OrderKey", typeof(int));
                createCdOrderParams.Columns.Add("OrderDate", typeof(string));
                createCdOrderParams.Columns.Add("InstitutionKey", typeof(int));
                createCdOrderParams.Columns.Add("OrderedBy", typeof(string));
                createCdOrderParams.Columns.Add("ContactPhone", typeof(string));
                createCdOrderParams.Columns.Add("Term", typeof(string));
                createCdOrderParams.Columns.Add("Callable", typeof(string));
                createCdOrderParams.Columns.Add("CallFrequency", typeof(string));
                createCdOrderParams.Columns.Add("Rate", typeof(string));
                createCdOrderParams.Columns.Add("Amount", typeof(string));
                createCdOrderParams.Columns.Add("SettleDate", typeof(string));
                createCdOrderParams.Columns.Add("InterestPaymentFrequency", typeof(string));
                createCdOrderParams.Columns.Add("Status", typeof(string));
                createCdOrderParams.Columns.Add("Notes", typeof(string));

                foreach (CreateCdOrdersViewModel createCdOrderData in cdOrderData)
                {
                    string orderDate = string.Format("{0}/{1}/{2}", createCdOrderData.OrderDate.Month, createCdOrderData.OrderDate.Day, createCdOrderData.OrderDate.Year);
                    createCdOrderParams.Rows.Add(createCdOrderData.OrderKey,
                                                 orderDate,
                                                 createCdOrderData.InstitutionKey,
                                                 createCdOrderData.OrderedBy,
                                                 createCdOrderData.ContactPhone,
                                                 createCdOrderData.Term,
                                                 createCdOrderData.Callable,
                                                 createCdOrderData.CallFrequency,
                                                 createCdOrderData.Rate,
                                                 createCdOrderData.Amount,
                                                 createCdOrderData.SettleDate,
                                                 createCdOrderData.InterestPaymentFrequency,
                                                 createCdOrderData.Status,
                                                 createCdOrderData.Notes);
                }

                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter createOrderParam = new SqlParameter("@OrderDetail", SqlDbType.Structured);
                createOrderParam.Value = createCdOrderParams;
                createOrderParam.TypeName = "dbo.AppCDOrderDetailType";
                ent.Database.CommandTimeout = 600;
                result = ent.Database.SqlQuery<int>("exec dbo.uspRptAppInsertUpdateCDOrders @OrderDetail", createOrderParam).First();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        [HttpGet]
        
        public LoggedInUserDetails GetLoggedInUserDetails()
        {
            LoggedInUserDetails loggedInUserDetails = null;

            try
            {
                loggedInUserDetails = new LoggedInUserDetails();
                long tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name);
                loggedInUserDetails.InstitutionKey = UtilityFunctions.GetInstitutionKey(tenantKey);
                loggedInUserDetails.InstitutionName = UtilityFunctions.GetInstitutionName(tenantKey);
                loggedInUserDetails.UserName = UtilityFunctions.GetUserName(User.Identity.Name);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return loggedInUserDetails;
        }

        [HttpGet]
        public List<CdRate> GetCdRates()
        {
            List<CdRate> cdRates = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                cdRates = ent.Database.SqlQuery<CdRate>("exec uspRptAppGetCDRates").ToList<CdRate>();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return cdRates;
        }

        [HttpPost]
        public List<CdOrderViewModel> GetOrders(PageSizeParams pageSizeParams)
        {
            List<CdOrderViewModel> cdOrders = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                int instiKey = UtilityFunctions.GetInstitutionKey(User.Identity.Name);
                SqlParameter instKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                instKey.Value = instiKey;
                cdOrders = ent.Database.SqlQuery<CdOrderViewModel>("exec uspRptAppGetCDOrders @InstitutionKey", instKey).ToList<CdOrderViewModel>();

                int pageSizeToReturn = -1;

                int totalCount = cdOrders.Count;
                if (pageSizeParams.PageSize == -1)
                    pageSizeToReturn = cdOrders.Count;
                else
                    pageSizeToReturn = pageSizeParams.PageSize;

                if (cdOrders.Count > pageSizeToReturn)
                    cdOrders = cdOrders.Skip(pageSizeToReturn * (pageSizeParams.PageNumber - 1)).Take(pageSizeToReturn).ToList<CdOrderViewModel>();
                if (cdOrders.Count>0)
                cdOrders[0].TotalOrders = totalCount;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return cdOrders;
        }

        [HttpGet]
        public string GetDateRatesLastUpdates()
        {
            string retVal = string.Empty;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var lastUpdatedItem = ent.AppManageCDRates.OrderByDescending(obj => obj.AuditUpdatedDateTime).FirstOrDefault();
                var zone = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");
                retVal = TimeZoneInfo.ConvertTimeFromUtc(lastUpdatedItem.AuditUpdatedDateTime, zone).ToShortDateString();
            }
            catch(Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }

        [HttpPost]
        public int UpdateOrder(CdOrderViewModel updatedOrder)
        {
            int rowsUpdated = -1;

            try
            {

            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return rowsUpdated;
        }

        [HttpGet]
        public bool SecurityTrimIssueACdLink()
        {
            bool result = true;
            List<string> whiteListedUsers = new List<string>();

            //string[] arrUsers = Environment.GetEnvironmentVariable("NonBankUsersHavingCDAccess").Split(",".ToCharArray());

            string[] arrUsers = null;

            arrUsers = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("NonBankUsersHavingCDAccess")) 
                ? Environment.GetEnvironmentVariable("NonBankUsersHavingCDAccess").Split(",".ToCharArray()) 
                : null;
           
            if(arrUsers !=null && arrUsers.Length > 0)
            {
                foreach (string user in arrUsers)
                {
                    whiteListedUsers.Add(user);
                }

            }


            try
            {
                if (!string.IsNullOrEmpty(User.Identity.Name))
                {
                    int institutionKey = UtilityFunctions.GetInstitutionKeyOnly(User.Identity.Name);
                    if (institutionKey == -1)
                    {
                        if (!whiteListedUsers.Contains(User.Identity.Name))
                        {
                            result = false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        private async Task<string> SendCdOrderEmail(CreateCdOrdersViewModel[] cdOrderData)
        {
            string formattedEmail = string.Empty;
            int count = 1;
            StringBuilder orderRows = new StringBuilder();
            try
            {
                foreach (CreateCdOrdersViewModel orderItem in cdOrderData)
                {
                    string orderSeq = string.Format(EmailTemplates.CDOrderDetailLine, count.ToString());
                    string term = string.Format(EmailTemplates.CDOrderDetailLine, orderItem.Term);
                    string callable = string.Format(EmailTemplates.CDOrderDetailLine, orderItem.Callable);
                    string callfrequency = string.Format(EmailTemplates.CDOrderDetailLine, orderItem.CallFrequency == ""? "-" : orderItem.CallFrequency);
                    string rate = string.Format(EmailTemplates.CDOrderDetailLine, orderItem.Rate);
                    string amount = string.Format(EmailTemplates.CDOrderDetailLine, Convert.ToDouble(orderItem.Amount).ToString("C0", CultureInfo.CurrentCulture));
                    string settleDate = string.Format(EmailTemplates.CDOrderDetailLine, orderItem.SettleDate);
                    string frequency = string.Format(EmailTemplates.CDOrderDetailLine, orderItem.InterestPaymentFrequency);
                    string notes = string.Format(EmailTemplates.CDOrderDetailNotesLine, orderItem.Notes);
                    string orderrow = string.Format(EmailTemplates.HtmlRow, orderSeq + term + callable + callfrequency + rate + amount + settleDate + frequency + notes);
                    orderRows.Append(orderrow);
                    count++;
                }

                string institutionName = UtilityFunctions.GetInstitutionNameFromInstitutionKey(cdOrderData[0].InstitutionKey);
                formattedEmail = string.Format(EmailTemplates.CDOrderEmailTemplate, institutionName, cdOrderData[0].OrderDate.ToShortDateString(), orderRows.ToString());
                string toEmail = ConfigurationManager.AppSettings["CDOrderToEmail"];
                await CommonFunctions.SendMail(string.Empty, formattedEmail, toEmail, "New CD Order");
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            

            return formattedEmail;
        }
    }
}
