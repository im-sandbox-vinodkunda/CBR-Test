using CBR.Web.CustomFilter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CBR.Web.Controllers
{
    public class CdController : Controller
    {
        // GET: Cd
        [Authorize]
        [IssueACdAccessInspector]
        public ActionResult Index()
        {
            if (Session["User"] == null)
            {
                // Redirect to login page if session does not exist
                return RedirectToAction("Login", "Account");
            }
            return View();
        }

        // GET: Cd/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Cd/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Cd/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Cd/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Cd/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Cd/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Cd/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
