using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    public class ChartMetadata
    {
        public long UserKey { get; set; }
        public string ChartType { get; set; }
        public Guid ChartImageGuid { get; set; }
    }

    public class AppUserRegistration
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public long TenantKey { get; set; }
        public long RoleId { get; set; }
    }
}
