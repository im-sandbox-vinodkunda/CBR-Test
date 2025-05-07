using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class ActiveInstitution
    {
        public int InstitutionKey { get; set; }
        public string InstitutionName { get; set; }
    }
}
