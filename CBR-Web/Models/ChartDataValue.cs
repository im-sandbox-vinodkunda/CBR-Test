﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class ChartDataValue
    {
        public Decimal? Value { get; set; }
        public string ToolText { get; set; }
    }
}
