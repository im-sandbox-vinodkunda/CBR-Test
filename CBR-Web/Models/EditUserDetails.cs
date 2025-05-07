using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class EditUserDetails
    {
        public long UserKey { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public string Title { get; set; }

        public string Department { get; set; }

        public string Email { get; set; }
    }
}
