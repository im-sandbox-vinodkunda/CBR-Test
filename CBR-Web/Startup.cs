using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CBR.Web.Startup))]
namespace CBR.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
