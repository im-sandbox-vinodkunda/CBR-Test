using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class CdRate
    {
        public int TermKey { get; set; }
        public string Term { get; set; }
        public string FixedRate { get; set; }
        public string Callable { get; set; }
        public string LastUpdatedDate { get; set; }
    }
}