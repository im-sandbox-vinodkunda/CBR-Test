using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CBR.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Projects",
                url: "projects/{*catchall}",
                defaults: new { controller = "Home", action = "Projects" });

            routes.MapRoute(
                name: "RiskAssessments",
                url: "riskassessments/{*catchall}",
                defaults: new { controller = "Home", action = "RiskAssessments" });

            routes.MapRoute(
                name: "PeerAnalysis",
                url: "peeranalysis/{*catchall}",
                defaults: new { controller = "Home", action = "PeerAnalysis" });

            routes.MapRoute(
                name: "BankAnalytics",
                url: "bankanalytics/{*catchall}",
                defaults: new { controller = "Home", action = "BankAnalytics" });

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
