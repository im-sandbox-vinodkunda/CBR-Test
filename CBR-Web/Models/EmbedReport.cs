﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class EmbedReport
    {
        // Id of Power BI report to be embedded
        public Guid ReportId { get; set; }

        // Name of the report
        public string ReportName { get; set; }

        // Embed URL for the Power BI report
        public string EmbedUrl { get; set; }
    }
}