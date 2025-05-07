using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CBR.Web.Controllers.Api;
using System.Web.Script.Serialization;
using System.Threading.Tasks;

using CBR.Web.Service;

namespace CBR.Web.Controllers
{
    [Authorize]
    public class liquidityIRRController : Controller
    {
        // GET: liquidityIRR
        public async Task<ActionResult> scorecard()
        {
            var embedResult = await EmbedService.GetEmbedParams(User.Identity.Name);
            return View(embedResult);
        }
    }
}