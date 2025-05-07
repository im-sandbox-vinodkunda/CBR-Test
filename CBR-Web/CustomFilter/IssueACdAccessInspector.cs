using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;
using System.Web.Mvc.Filters;

namespace CBR.Web.CustomFilter
{
    public class IssueACdAccessInspector : ActionFilterAttribute
    {
        List<string> whiteListedUsers = new List<string>();

        public IssueACdAccessInspector()
        {
            string[] arrUsers = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("NonBankUsersHavingCDAccess"))
                ? Environment.GetEnvironmentVariable("NonBankUsersHavingCDAccess").Split(",".ToCharArray())
                : null;

            if (arrUsers != null)
            {
                foreach (string user in arrUsers)
                {
                    whiteListedUsers.Add(user);
                }
            }
        }

        public override void OnActionExecuting(ActionExecutingContext actionContext)
        {
            if (!string.IsNullOrEmpty(actionContext.RequestContext.HttpContext.User.Identity.Name))
            {
                int institutionKey = UtilityFunctions.GetInstitutionKeyOnly(actionContext.RequestContext.HttpContext.User.Identity.Name);
                if (institutionKey == -1)
                {
                    if (!whiteListedUsers.Contains(actionContext.RequestContext.HttpContext.User.Identity.Name))
                    {
                        actionContext.Result = new RedirectResult("/");
                    }
                }
            }
        }
    }
}