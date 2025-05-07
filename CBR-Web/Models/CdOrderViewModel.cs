using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class CdOrderViewModel
    {
        public int OrderKey { get; set; }
        public string OrderDate { get; set; }
        public int InstitutionKey { get; set; }
        public string InstitutionName { get; set; }
        public string OrderedBy { get; set; }
        public string ContactPhone { get; set; }
        public string Term { get; set; }
        public string Callable { get; set; }
        public string CallFrequency { get; set; }
        public string Rate { get; set; }
        public string Amount { get; set; }
        public string SettleDate { get; set; }
        public string InterestPaymentFrequency { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
        public int TotalOrders { get; set; }
    }
}