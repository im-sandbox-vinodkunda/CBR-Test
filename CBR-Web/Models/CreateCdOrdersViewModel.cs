using System;

namespace CBR.Web.Models
{
    public class CreateCdOrdersViewModel
    {
        public int OrderKey { get; set; }
        public DateTime OrderDate { get; set; }
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
    }
}