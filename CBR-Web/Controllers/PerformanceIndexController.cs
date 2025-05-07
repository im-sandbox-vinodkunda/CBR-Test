using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CBR.Web.Controllers
{
    public class PerformanceIndexController : Controller
    {
        public ActionResult Index()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        // GET: PerformanceIndex
        public ActionResult NewsMedia()
        {
            ViewData["pgkey"] = Request.QueryString["pgkey"];
            ViewData["state"] = Request.QueryString["state"];
            ViewData["region"] = Request.QueryString["region"];
            ViewData["ticker"] = Request.QueryString["ticker"];
            if (string.IsNullOrEmpty(Request.QueryString["ticker"]) && !string.IsNullOrEmpty(Request.QueryString["qm_symbol"]))
            {
                ViewData["ticker"] = Request.QueryString["qm_symbol"];
            }
            return View();
        }

        // GET: PerformanceIndex/Details/5
        public ActionResult MarketIndices()
        {
            ViewData["pgkey"] = Request.QueryString["pgkey"];
            ViewData["state"] = Request.QueryString["state"];
            ViewData["region"] = Request.QueryString["region"];
            ViewData["ticker"] = Request.QueryString["ticker"];
            if (string.IsNullOrEmpty(Request.QueryString["ticker"]) && !string.IsNullOrEmpty(Request.QueryString["qm_symbol"]))
            {
                ViewData["ticker"] = Request.QueryString["qm_symbol"];
            }
            return View();
        }

        // GET: PerformanceIndex/Create
        public ActionResult MarketSummary()
        {
            ViewData["pgkey"] = Request.QueryString["pgkey"];
            ViewData["state"] = Request.QueryString["state"];
            ViewData["region"] = Request.QueryString["region"];
            ViewData["ticker"] = Request.QueryString["ticker"];
            if (string.IsNullOrEmpty(Request.QueryString["ticker"]) && !string.IsNullOrEmpty(Request.QueryString["qm_symbol"]))
            {
                ViewData["ticker"] = Request.QueryString["qm_symbol"];
            }
            return View();
        }

        public ActionResult Filings()
        {
            ViewData["pgkey"] = Request.QueryString["pgkey"];
            ViewData["state"] = Request.QueryString["state"];
            ViewData["region"] = Request.QueryString["region"];
            ViewData["ticker"] = Request.QueryString["ticker"];
            if (string.IsNullOrEmpty(Request.QueryString["ticker"]) && !string.IsNullOrEmpty(Request.QueryString["qm_symbol"]))
            {
                ViewData["ticker"] = Request.QueryString["qm_symbol"];
            }
            return View();
        }

        // GET: PerformanceIndex/Edit/5
        public ActionResult KeyRatios()
        {
            ViewData["pgkey"] = Request.QueryString["pgkey"];
            ViewData["state"] = Request.QueryString["state"];
            ViewData["region"] = Request.QueryString["region"];
            ViewData["ticker"] = Request.QueryString["ticker"];
            if (string.IsNullOrEmpty(Request.QueryString["ticker"]) && !string.IsNullOrEmpty(Request.QueryString["qm_symbol"]))
            {
                ViewData["ticker"] = Request.QueryString["qm_symbol"];
            }
            return View();
        }

        public ActionResult ShareInformation()
        {
            ViewData["pgkey"] = Request.QueryString["pgkey"];
            ViewData["state"] = Request.QueryString["state"];
            ViewData["region"] = Request.QueryString["region"];
            ViewData["ticker"] = Request.QueryString["ticker"];
            if (string.IsNullOrEmpty(Request.QueryString["ticker"]) && !string.IsNullOrEmpty(Request.QueryString["qm_symbol"]))
            {
                ViewData["ticker"] = Request.QueryString["qm_symbol"];
            }
            return View();
        }

        // GET: PerformanceIndex/Delete/5
        public ActionResult Financials()
        {
            ViewData["pgkey"] = Request.QueryString["pgkey"];
            ViewData["state"] = Request.QueryString["state"];
            ViewData["region"] = Request.QueryString["region"];
            ViewData["ticker"] = Request.QueryString["ticker"];

            if (string.IsNullOrEmpty(Request.QueryString["ticker"]) && !string.IsNullOrEmpty(Request.QueryString["qm_symbol"]))
            {
                ViewData["ticker"] = Request.QueryString["qm_symbol"];
            }

            return View();
        }

        // POST: PerformanceIndex/Delete/5
        public ActionResult CompanyProfile()
        {
            ViewData["pgkey"] = Request.QueryString["pgkey"];
            ViewData["state"] = Request.QueryString["state"];
            ViewData["region"] = Request.QueryString["region"];
            ViewData["ticker"] = Request.QueryString["ticker"];

            if (string.IsNullOrEmpty(Request.QueryString["ticker"]) && !string.IsNullOrEmpty(Request.QueryString["qm_symbol"]))
            {
                ViewData["ticker"] = Request.QueryString["qm_symbol"];
            }

            return View();
        }

        // POST: PerformanceIndex/Delete/5
        public ActionResult DetailedQuote()
        {
            ViewData["pgkey"] = Request.QueryString["pgkey"];
            ViewData["state"] = Request.QueryString["state"];
            ViewData["region"] = Request.QueryString["region"];
            ViewData["ticker"] = Request.QueryString["ticker"];

            if (string.IsNullOrEmpty(Request.QueryString["ticker"]) && !string.IsNullOrEmpty(Request.QueryString["qm_symbol"]))
            {
                ViewData["ticker"] = Request.QueryString["qm_symbol"];
            }

            return View();
        }
    }
}
