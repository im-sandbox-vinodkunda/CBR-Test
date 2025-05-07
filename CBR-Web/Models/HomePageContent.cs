using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class HomePageContent
    {
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Url { get; set; }
        public string PostedBy { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedOn { get; set; }
    }
}
