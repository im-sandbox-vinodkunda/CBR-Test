using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class ProjectFileDownloadParameters
    {
        public int FileId { get; set; }
        public string FileName { get; set; }
        public long? TenantKey { get; set; }
    }
}