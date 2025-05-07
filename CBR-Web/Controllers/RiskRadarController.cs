using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CBR.Web.Controllers
{
    public class RiskRadarController : Controller
    {
        // GET: RiskRadar
        public ActionResult Index()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }
    }
}