using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class LoggedInUserDetails
    {
        public int InstitutionKey { get; set; }
        public string InstitutionName { get; set; }
        public string UserName { get; set; }
    }
}