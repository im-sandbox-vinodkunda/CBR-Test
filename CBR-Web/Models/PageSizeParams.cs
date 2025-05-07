using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    [Serializable]
    public class PageSizeParams
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}