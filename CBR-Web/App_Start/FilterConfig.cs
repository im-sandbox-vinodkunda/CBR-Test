using CBR.Web.CustomFilter;
using System.Web;
using System.Web.Mvc;

namespace CBR.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new AiExceptionFilterAttribute());
            filters.Add(new System.Web.Mvc.RequireHttpsAttribute());
        }
    }
}
