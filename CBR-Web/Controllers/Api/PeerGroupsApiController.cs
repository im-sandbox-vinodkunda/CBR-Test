namespace CBR.Web.Controllers.Api
{
    using CBR.DataAccess;
    using CBR.Web.Models;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Web.Http;
    using CBR.Web.WebCommons;
    using System.Net.Http;
    using System.Web;
    using System.Linq;
    using System;
    using Common;
    using CBR.Web.ExportToExcel;
    using CBR.Web.CustomFilter;

    public class PeerGroupsApiController : ApiController
    {
        // GET api/<controller>
        public List<CustomPeerGroupData> Get()
        {
            List<CustomPeerGroupData> peerGroupsForUser = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                var usersCustomPgs = ent.DimCustPeerGroups.SqlQuery("select * from DimCustPeerGroup WHERE UserKey = " + userKey.ToString()).ToList<DimCustPeerGroup>();
                if (usersCustomPgs != null && usersCustomPgs.Count > 0)
                {
                    peerGroupsForUser = new List<CustomPeerGroupData>();

                    foreach (DimCustPeerGroup pg in usersCustomPgs)
                    {
                        CustomPeerGroupData peerGroupData = new CustomPeerGroupData();
                        peerGroupData.Name = pg.CustPeerGroupName;
                        peerGroupData.Key = pg.CustPeerGroupKey;
                        peerGroupData.Created = pg.AuditInsertedDateTime;
                        int customPeerGroups = ent.DimCustPeerGroupDetails.Count(obje => obje.CustPeerGroupKey == pg.CustPeerGroupKey);
                        peerGroupData.NumberOfPeers = customPeerGroups;
                        peerGroupsForUser.Add(peerGroupData);
                    }

                    peerGroupsForUser = peerGroupsForUser.OrderBy(obj => obj.Name).ToList();
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return peerGroupsForUser;
        }

        // GET api/<controller>/5
        [HttpPost]
        public CustomPeerGroupData GetPeerGroupBasics(GetPeerGroupDetailsParam peerGroupParam)
        {
            CustomPeerGroupData customPeerGroup = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var usersCustomPgs = ent.DimCustPeerGroups.SqlQuery("select * from DimCustPeerGroup WHERE CustPeerGroupKey = " + peerGroupParam.CustPeerGroupKey.ToString()).ToList<DimCustPeerGroup>();
                if (usersCustomPgs != null && usersCustomPgs.Count > 0)
                {
                    customPeerGroup = new CustomPeerGroupData();
                    customPeerGroup.Name = usersCustomPgs[0].CustPeerGroupName;
                    customPeerGroup.IsDefault = usersCustomPgs[0].IsDefault;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return customPeerGroup;
        }

        [HttpPost]
        public List<CustomPeerGroupMemberData> GetPeerGroupMembers(GetPeerGroupDetailsParam peerGroupParam)
        { 
            List<CustomPeerGroupMemberData> result = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter instKey = new SqlParameter("@CustPeerGroupKey", SqlDbType.Int);
                instKey.Value = peerGroupParam.CustPeerGroupKey;
                result = ent.Database.SqlQuery<CustomPeerGroupMemberData>("exec dbo.uspRptEditPeerGroup @CustPeerGroupKey", instKey).ToList();
                if (result != null && result.Count > 0)
                {
                    foreach (CustomPeerGroupMemberData member in result)
                    {
                        member.IsSelected = true;
                    }

                    result = result.OrderBy(obj => obj.InstitutionName).ToList();
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        // POST api/<controller>
        public int Post([FromBody]CreatePeerGroupViewModel []peerGroupCreationData)
        {
            int result = int.MinValue;
            try
            {
                DataTable createPeerGroupParams = new DataTable();
                createPeerGroupParams.Columns.Add("CustPeerGroupName", typeof(string));
                createPeerGroupParams.Columns.Add("RSSD", typeof(int));
                createPeerGroupParams.Columns.Add("TenantName", typeof(string));
                createPeerGroupParams.Columns.Add("Login", typeof(string));
                createPeerGroupParams.Columns.Add("IsDefault", typeof(bool));

                foreach (CreatePeerGroupViewModel createPgData in peerGroupCreationData)
                {
                    createPeerGroupParams.Rows.Add(createPgData.CustPeerGroupName, createPgData.RSSD, UtilityFunctions.GetTenantName(User.Identity.Name), User.Identity.Name, createPgData.IsDefault);
                }

                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter createPgParam = new SqlParameter("@CustPeerGroup", SqlDbType.Structured);
                createPgParam.Value = createPeerGroupParams;
                createPgParam.TypeName = "dbo.CustPeerGroupDetailType";
                ent.Database.CommandTimeout = 600;
                result = ent.Database.SqlQuery<int>("exec dbo.uspDimCustPeerGroupDetail @CustPeerGroup", createPgParam).First();
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        public List<BankSearchResultData> SearchBanks(BankFindSearchCriteria searchCriteria)
        {
            List<BankSearchResultData> result = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter bankName = new SqlParameter("@bankName", SqlDbType.VarChar);
                SqlParameter location = new SqlParameter("@Location", SqlDbType.VarChar);
                SqlParameter assetMinSize = new SqlParameter("@AssetMinSize", SqlDbType.VarChar);
                SqlParameter assetMaxSize = new SqlParameter("@AssetMaxSize", SqlDbType.VarChar);
                SqlParameter corpType = new SqlParameter("@CorpType", SqlDbType.VarChar);
                SqlParameter certNumber = new SqlParameter("@CertNumber", SqlDbType.Int);
                if (string.IsNullOrEmpty(searchCriteria.BankName))
                    bankName.Value = string.Empty;
                else
                    bankName.Value = searchCriteria.BankName;

                if (string.IsNullOrEmpty(searchCriteria.Location))
                    location.Value = string.Empty;
                else
                    location.Value = searchCriteria.Location;

                if (string.IsNullOrEmpty(searchCriteria.AssetMinSize))
                    assetMinSize.Value = string.Empty;
                else
                    assetMinSize.Value = searchCriteria.AssetMinSize;


                if (string.IsNullOrEmpty(searchCriteria.AssetMaxSize))
                    assetMaxSize.Value = string.Empty;
                else
                    assetMaxSize.Value = searchCriteria.AssetMaxSize;

                if (string.IsNullOrEmpty(searchCriteria.CorporationType))
                    corpType.Value = string.Empty;
                else
                    corpType.Value = searchCriteria.CorporationType;

                if (string.IsNullOrEmpty(searchCriteria.CertNumber))
                    certNumber.Value = -1;
                else
                    certNumber.Value = Convert.ToInt32(searchCriteria.CertNumber);

                result = ent.Database.SqlQuery<BankSearchResultData>("exec dbo.uspRptFindBank @bankName, @Location, @CertNumber, @AssetMinSize,@AssetMaxSize, @CorpType", bankName, location, certNumber, assetMinSize, assetMaxSize, corpType).ToList<BankSearchResultData>();
                int totalCount = result.Count;
                int pageSizeToReturn = -1;

                if (searchCriteria.PageSize == -1)
                    pageSizeToReturn = result.Count;
                else
                    pageSizeToReturn = searchCriteria.PageSize;

                result = result.OrderBy(obj => obj.InstitutionName).ToList();

                if (result.Count > pageSizeToReturn)
                    result = result.Skip(pageSizeToReturn * (searchCriteria.PageNumber - 1)).Take(pageSizeToReturn).ToList<BankSearchResultData>();

                foreach (BankSearchResultData resultData in result)
                {
                    resultData.IsSelected = false;
                    resultData.TotalResults = totalCount;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        public byte[] ExportToExcel(BankFindSearchCriteria searchCriteria, string fileName)
        {
            List<BankSearchResultDataToExport> result = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter bankName = new SqlParameter("@bankName", SqlDbType.VarChar);
                SqlParameter location = new SqlParameter("@Location", SqlDbType.VarChar);
                SqlParameter assetMinSize = new SqlParameter("@AssetMinSize", SqlDbType.VarChar);
                SqlParameter assetMaxSize = new SqlParameter("@AssetMaxSize", SqlDbType.VarChar);
                SqlParameter corpType = new SqlParameter("@CorpType", SqlDbType.VarChar);
                SqlParameter certNumber = new SqlParameter("@CertNumber", SqlDbType.Int);
                if (string.IsNullOrEmpty(searchCriteria.BankName))
                    bankName.Value = string.Empty;
                else
                    bankName.Value = searchCriteria.BankName;

                if (string.IsNullOrEmpty(searchCriteria.Location))
                    location.Value = string.Empty;
                else
                    location.Value = searchCriteria.Location;

                if (string.IsNullOrEmpty(searchCriteria.AssetMinSize))
                    assetMinSize.Value = string.Empty;
                else
                    assetMinSize.Value = searchCriteria.AssetMinSize;

                if (string.IsNullOrEmpty(searchCriteria.AssetMaxSize))
                    assetMaxSize.Value = string.Empty;
                else
                    assetMaxSize.Value = searchCriteria.AssetMaxSize;

                if (string.IsNullOrEmpty(searchCriteria.CorporationType))
                    corpType.Value = string.Empty;
                else
                    corpType.Value = searchCriteria.CorporationType;

                if (string.IsNullOrEmpty(searchCriteria.CertNumber))
                    certNumber.Value = -1;
                else
                    certNumber.Value = Convert.ToInt32(searchCriteria.CertNumber);

                result = ent.Database.SqlQuery<BankSearchResultDataToExport>("exec dbo.uspRptSearchBankForPeerGroup @bankName, @Location, @AssetMinSize, @AssetMaxSize, @CorpType, @CertNumber", bankName, location, assetMinSize, assetMaxSize, corpType, certNumber).ToList<BankSearchResultDataToExport>();
                int totalCount = result.Count;
                int pageSizeToReturn = -1;

                if (searchCriteria.PageSize == -1)
                    pageSizeToReturn = result.Count;
                else
                    pageSizeToReturn = searchCriteria.PageSize;

                if (result.Count > pageSizeToReturn)
                    result = result.Skip(pageSizeToReturn * (searchCriteria.PageNumber - 1)).Take(pageSizeToReturn).ToList<BankSearchResultDataToExport>();

            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            byte[] stream = null;
            try
            {
                stream = CreateExcelFile.CreateExcelDocument(result, fileName);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return stream;

        }

        public List<BankSearchResultData> FindBanks(BankFindSearchCriteria searchCriteria)
        {
            List<BankSearchResultData> result = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter bankName = new SqlParameter("@bankName", SqlDbType.VarChar);
                SqlParameter location = new SqlParameter("@Location", SqlDbType.VarChar);
                SqlParameter certNumber = new SqlParameter("@CertNumber", SqlDbType.Int);
                SqlParameter assetSize = new SqlParameter("@AssetSize", SqlDbType.VarChar);
                SqlParameter corpType = new SqlParameter("@CorpType", SqlDbType.VarChar);

                if (string.IsNullOrEmpty(searchCriteria.BankName))
                    bankName.Value = string.Empty;
                else
                    bankName.Value = searchCriteria.BankName;

                if (string.IsNullOrEmpty(searchCriteria.Location) || string.Compare(searchCriteria.Location, "-- Location --") == 0)
                    location.Value = string.Empty;
                else
                    location.Value = searchCriteria.Location;

                if (string.IsNullOrEmpty(searchCriteria.CertNumber))
                    certNumber.Value = -1;
                else
                    certNumber.Value = Convert.ToInt32(searchCriteria.CertNumber);

                if (string.IsNullOrEmpty(searchCriteria.AssetMinSize) || string.Compare(searchCriteria.AssetMinSize, "-- Asset Size --") == 0)
                    assetSize.Value = string.Empty;
                else
                    assetSize.Value = searchCriteria.AssetMinSize;

                if (string.IsNullOrEmpty(searchCriteria.CorporationType) || string.Compare(searchCriteria.CorporationType, "-- Corporation Type --") == 0)
                    corpType.Value = string.Empty;
                else
                    corpType.Value = searchCriteria.CorporationType;

                result = ent.Database.SqlQuery<BankSearchResultData>("exec dbo.uspRptFindBank @bankName, @Location, @CertNumber, @AssetSize, @CorpType", bankName, location, certNumber, assetSize, corpType).ToList<BankSearchResultData>();
                int totalCount = result.Count;
                int pageSizeToReturn = -1;

                if (searchCriteria.PageSize == -1)
                    pageSizeToReturn = result.Count;
                else
                    pageSizeToReturn = searchCriteria.PageSize;

                result = result.OrderBy(obj => obj.InstitutionName).ToList();

                if (result.Count > pageSizeToReturn)
                    result = result.Skip(pageSizeToReturn * (searchCriteria.PageNumber - 1)).Take(pageSizeToReturn).ToList<BankSearchResultData>();

                foreach (BankSearchResultData bankData in result)
                {
                    bankData.EstablishedDate = bankData.EstablishedDate.Value;
                    bankData.TotalResults = totalCount;
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return result;
        }

        public string AddBankToFavoriteBanks(AddToFavoriteParams bankDataToAddToFavorite)
        {
            string success = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                var result = ent.AppFavoriteBanks.FirstOrDefault(obj => obj.UserKey == userKey && obj.InstitutionKey == bankDataToAddToFavorite.InstitutionKey);
                if (result == null)
                {
                    long tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name);
                    SqlParameter userKeyParam = new SqlParameter("UserKey", SqlDbType.Int);
                    userKeyParam.Value = Convert.ToInt32(userKey);
                    SqlParameter institutionKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                    institutionKey.Value = bankDataToAddToFavorite.InstitutionKey;
                    SqlParameter tenantKeyParam = new SqlParameter("TenantKey", SqlDbType.Int);
                    tenantKeyParam.Value = Convert.ToInt32(tenantKey);
                    var result1 = ent.Database.SqlQuery<string>("dbo.uspRptAddtoFavoritebanks @UserKey, @Institutionkey, @TenantKey", userKeyParam, institutionKey, tenantKeyParam).First<string>();
                    if (string.Compare(result1, "True") == 0)
                    {
                        success = "The bank has been added to your list of favorite banks.";
                    }
                    else
                    {
                        success = "An error occurred while trying to add the bank as your favorite bank. Please send an e-mail to admin@cb-resource.com.";
                    }
                }
                else
                {
                    if (result.InstitutionKey == bankDataToAddToFavorite.InstitutionKey)
                        success = "This bank is already your favorite bank.";
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return success;
        }

        public string RemoveBankFromFavoriteList(AddToFavoriteParams bankDataToAddToFavorite)
        {
            string success = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                long tenantKey = UtilityFunctions.GetTenantKey(User.Identity.Name);
                SqlParameter userKeyParam = new SqlParameter("UserKey", SqlDbType.Int);
                userKeyParam.Value = Convert.ToInt32(userKey);
                SqlParameter institutionKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                institutionKey.Value = bankDataToAddToFavorite.InstitutionKey;
                SqlParameter tenantKeyParam = new SqlParameter("TenantKey", SqlDbType.Int);
                tenantKeyParam.Value = Convert.ToInt32(tenantKey);
                SqlParameter isDefault = new SqlParameter("IsDefault", SqlDbType.Int);
                isDefault.Value = bankDataToAddToFavorite.IsDefault;
                var result = ent.Database.SqlQuery<string>("dbo.uspRptDeleteFavoriteBank @Institutionkey, @TenantKey, @UserKey, @IsDefault ", institutionKey, tenantKeyParam, userKeyParam, isDefault).First<string>();
                if (string.Compare(result, "True") == 0)
                {
                    success = "This bank has been removed from your list of favorite banks.";
                }
                else
                {
                    success = "An error occurred while trying to remove the bank from your favorite bank. Please send an e-mail to admin@cb-resource.com.";
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return success;
        }

        public List<FavoriteBank> GetFavoriteBanksForCurrentUser()
        {
            List<FavoriteBank> favoriteBanks = null;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                if (userKey == long.MinValue)
                {
                    userKey = -1;
                }

                SqlParameter userId = new SqlParameter("@UserKey", SqlDbType.Int);
                userId.Value = Convert.ToInt32(userKey);
                favoriteBanks = ent.Database.SqlQuery<FavoriteBank>("exec dbo.uspRptGetFavoriteBanksForUser @UserKey", userId).ToList();
            }          
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            if (favoriteBanks != null && favoriteBanks.Any())
            {
                favoriteBanks = favoriteBanks.OrderBy(obj => obj.InstitutionName).ToList();
            }
            return favoriteBanks;
        }


        [HttpPost]
        public bool IsCalculationProcessComplete(PollPeerGroupParam pollParam)
        {
            bool processStatus = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                var result = ent.Database.SqlQuery<int>("select count(*) from ProcessStatus where ProcessKey = {0} and IsComplete = 0 and IsLatest = 1", pollParam.PeerGroupKey.ToString()).First();
                if (result == 0)
                    processStatus = true;
                else
                    processStatus = false;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return processStatus;
        }

        [HttpGet]
        public List<CustomPeerGroupData> GetLastFivePeerGroups()
        {
            List<CustomPeerGroupData> peerGroupsForUser = null;

            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                long userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
                var usersCustomPgs = ent.DimCustPeerGroups.SqlQuery("select top 5 * from DimCustPeerGroup WHERE UserKey = {0} order by AuditInsertedDateTime desc", userKey.ToString()).ToList<DimCustPeerGroup>();
                if (usersCustomPgs != null && usersCustomPgs.Count > 0)
                {
                    peerGroupsForUser = new List<CustomPeerGroupData>();

                    foreach (DimCustPeerGroup pg in usersCustomPgs)
                    {
                        CustomPeerGroupData peerGroupData = new CustomPeerGroupData();
                        peerGroupData.Name = pg.CustPeerGroupName;
                        peerGroupData.Key = pg.CustPeerGroupKey;
                        peerGroupData.Created = pg.AuditInsertedDateTime;
                        peerGroupData.NumberOfPeers = 0;
                        peerGroupsForUser.Add(peerGroupData);
                    }

                    peerGroupsForUser = peerGroupsForUser.OrderBy(obj => obj.Name).ToList();
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return peerGroupsForUser;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpPost]
        public string Delete(GetPeerGroupDetailsParam peerGroupParam)
        {
            string operationResultMessage = string.Empty;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter instKey = new SqlParameter("@CustomPeerGroupKey", SqlDbType.Int);
                instKey.Value = peerGroupParam.CustPeerGroupKey;
                var result = ent.Database.SqlQuery<string>("exec dbo.uspRptDeleteCustomPeerGroup @CustomPeerGroupKey", instKey).First();
                if (string.Compare(result, "True") == 0)
                {
                    operationResultMessage = "Successfully deleted the peer group.";
                }
                else
                {
                    operationResultMessage = "An error occurred while trying to delete the peer group. Please contact the system administrator.";
                }
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return operationResultMessage;
        }

        [HttpPost]
        public bool MakeDefault(AddToFavoriteParams bankToMakeDefault)
        {
            bool operationResult = false;
            try
            {
                CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.Int);
                userKey.Value = Convert.ToInt32(UtilityFunctions.GetUserKey(User.Identity.Name));
                SqlParameter instKey = new SqlParameter("@InstitutionKey", SqlDbType.Int);
                instKey.Value = bankToMakeDefault.InstitutionKey;
                var result = ent.Database.SqlQuery<string>("exec dbo.uspRptSetDefaultBankForUser @UserKey, @InstitutionKey", userKey, instKey).First();
                if (string.Compare(result, "True") == 0)
                    operationResult = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return operationResult;
        }
    }
}