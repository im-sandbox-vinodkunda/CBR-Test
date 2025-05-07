using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using System.Net.Http;
using System.Net.Http.Headers;

namespace CBR.Web.CustomFilter
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class FileDownloadWebApiAttribute : ActionFilterAttribute
    {
        public FileDownloadWebApiAttribute(string cookieName = "fileDownload", string cookiePath = "/")
        {
            CookieName = cookieName;
            CookiePath = cookiePath;
        }

        public string CookieName { get; set; }
        public string CookiePath { get; set; }

        /// <summary> 
        /// If the current response is a FileResult (an MVC base class for files) then write a        /// cookie to inform jquery.fileDownload that a successful
        /// </summary> 
        /// <param name="filterContext"></param> 
        private void CheckAndHandleFileResult(HttpActionExecutedContext filterContext)
        {
            var httpContext = filterContext.ActionContext;
            var response = httpContext.Response;
            if (response.Content.Headers.ContentLength > 0)
            {
                CookieHeaderValue cookie = new CookieHeaderValue("fileDownload", "true");
                cookie.Domain = httpContext.Request.RequestUri.Host;
                cookie.Path = "/";
                response.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            }
            else if (httpContext.Request.Headers.GetCookies("fileDownload").Count > 0)
            {
                CookieHeaderValue cookie = new CookieHeaderValue("fileDownload", "true");
                cookie.Expires = DateTime.Now.AddYears(-1);
                cookie.Domain = httpContext.Request.RequestUri.Host;
                cookie.Path = "/";
                response.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            }
        }
         
        public override void OnActionExecuted(HttpActionExecutedContext filterContext)
        {
            CheckAndHandleFileResult(filterContext);
            base.OnActionExecuted(filterContext);
        }
    }
}
