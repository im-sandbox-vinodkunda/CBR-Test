using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace CBR.Web.CustomFilter
{
    public class SessionTimeoutInspector : ActionFilterAttribute
    {
        public SessionTimeoutInspector()
        {
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (string.IsNullOrEmpty(actionContext.RequestContext.Principal.Identity.Name))
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.OK);
                actionContext.Response.Content = new StringContent("/Account/Login");
            }
        }
    }
}