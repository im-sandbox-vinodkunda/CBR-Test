using CBR.Web.CustomFilter;
using DocumentFormat.OpenXml.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Routing;


namespace CBR.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // TODO: Add any additional configuration code.
            EnableCorsAttribute cors = new EnableCorsAttribute("*", "*", "GET,POST");

            config.EnableCors(cors);
            // Web API routes
            config.MapHttpAttributeRoutes();

            // GET /api/{resource}/{action}
            config.Routes.MapHttpRoute(
                name: "Web API RPC",
                routeTemplate: "api/{controller}/{action}",
                defaults: new { },
                constraints: new { action = @"[A-Za-z]+", httpMethod = new HttpMethodConstraint(HttpMethod.Get) }
                );

            // GET|PUT|DELETE /api/{resource}/{id}/{code}
            config.Routes.MapHttpRoute(
                name: "Web API Resource",
                routeTemplate: "api/{controller}/{id}/{code}",
                defaults: new { code = RouteParameter.Optional },
                constraints: new { id = @"\d+" }
                );

            // GET /api/{resource}
            config.Routes.MapHttpRoute(
                name: "Web API Get All",
                routeTemplate: "api/{controller}",
                defaults: new { action = "Get" },
                constraints: new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) }
                );

            // PUT /api/{resource}
            config.Routes.MapHttpRoute(
                name: "Web API Update",
                routeTemplate: "api/{controller}",
                defaults: new { action = "Put" },
                constraints: new { httpMethod = new HttpMethodConstraint(HttpMethod.Put) }
                );

            // POST /api/{resource}
            config.Routes.MapHttpRoute(
                name: "Web API Post",
                routeTemplate: "api/{controller}",
                defaults: new { action = "Post" },
                constraints: new { httpMethod = new HttpMethodConstraint(HttpMethod.Post) }
                );

            // POST /api/{resource}/{action}
            config.Routes.MapHttpRoute(
                name: "Web API RPC Post",
                routeTemplate: "api/{controller}/{action}",
                defaults: new { },
                constraints: new { action = @"[A-Za-z]+", httpMethod = new HttpMethodConstraint(HttpMethod.Post) }
                );

            // WebAPI when dealing with JSON & JavaScript!
            // Setup json serialization to serialize classes to camel (std. Json format)           

            var formatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            formatter.SerializerSettings.ContractResolver =
                new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();

            //Below lines are used to return json instead of xml
            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);

            config.Filters.Add(new AiExceptionFilterAttributeWebApi());
            config.Filters.Add(new RequireHttpsAttribute());
        }
    }
}
