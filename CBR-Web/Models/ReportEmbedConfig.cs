using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.PowerBI.Api.Models;

namespace CBR.Web.Models
{
    public class ReportEmbedConfig
    {
        // Report to be embedded
        public List<EmbedReport> EmbedReports { get; set; }

        // Embed Token for the Power BI report
        public EmbedToken EmbedToken { get; set; }

    }
}