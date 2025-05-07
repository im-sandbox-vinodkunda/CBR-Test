using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CBR.DataAccess;
using System.Web.Mvc;

namespace CBR.Web.Models
{
    public partial class ProjectsViewModel
    {
        public List<vwProjectNewDocCount> DocsTypes { get; set; }
        public string SelectedYear { get; set; }
        public ICollection<SelectListItem> YearList { get; set; }
        public ProjectsViewModel()
        {
            DocsTypes = new List<vwProjectNewDocCount>();
            YearList = new List<SelectListItem>();
        }
    }
}