﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CBR.Web.CustomFilter
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class FileDownloadAttribute : ActionFilterAttribute
    {
        public FileDownloadAttribute(string cookieName = "fileDownload", string cookiePath = "/")
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
        private void CheckAndHandleFileResult(ActionExecutedContext filterContext)
        {
            var httpContext = filterContext.HttpContext;
            var response = httpContext.Response;

            if (filterContext.Result is FileResult)
                //jquery.fileDownload uses this cookie to determine that a file download has completed successfully 
                response.AppendCookie(new HttpCookie(CookieName, "true") { Path = CookiePath });
            else
                //ensure that the cookie is removed in case someone did a file download without using jquery.fileDownload 
                if (httpContext.Request.Cookies[CookieName] != null)
            {
                response.AppendCookie(new HttpCookie(CookieName, "true") { Expires = DateTime.Now.AddYears(-1), Path = CookiePath });
            }
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            CheckAndHandleFileResult(filterContext);
            base.OnActionExecuted(filterContext);
        }
    }
}
