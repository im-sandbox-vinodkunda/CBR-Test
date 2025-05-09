﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CBR.Web.CustomFilter
{
    public class AuthLogAttribute : AuthorizeAttribute
    {
        public AuthLogAttribute()
        {
            View = "AuthorizationFailed";
        }

        public string View { get; set; }

        /// <summary>
        /// Check for Authorization
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
            IsUserAuthorized(filterContext);
        }

        /// <summary>
        /// Method to check if the user is Authorized or not
        /// if yes continue to perform the action else redirect to error page
        /// </summary>
        /// <param name="filterContext"></param>
        private void IsUserAuthorized(AuthorizationContext filterContext)
        {
            // If the Result returns null then the user is Authorized 
            if (filterContext.Result == null)
                return;

            //If the user is Un-Authorized then Navigate to Auth Failed View 
            if (filterContext.HttpContext.User.Identity.IsAuthenticated)
            {

                // var result = new ViewResult { ViewName = View };
                var vr = new ViewResult();
                vr.ViewName = View;

                ViewDataDictionary dict = new ViewDataDictionary();
                dict.Add("Message", "Sorry you are not Authorized to Perform this Action");

                vr.ViewData = dict;

                var result = vr;

                filterContext.Result = result;
            }
        }
    }


    public class AuthorizeRoleAttribute : AuthorizeAttribute
    {
        /// <summary>
        /// Method to check if the user is Authorized or not
        /// if yes continue to perform the action else redirect to error page
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            //If the user is Un-Authorized then Navigate to Auth Failed View 
            if (filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                filterContext.Result = new RedirectToRouteResult(
                    new System.Web.Routing.RouteValueDictionary(new { Controller = "Account", Action = "LogOff" , FormMethod ="POST" })
                );
            }
            else
            {
                base.HandleUnauthorizedRequest(filterContext);
            }
        }
    }
}
