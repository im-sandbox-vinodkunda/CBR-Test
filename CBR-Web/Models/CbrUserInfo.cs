using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class CbrUserInfo
    {
        public long UserKey { get; set; }
        public string UserName { get; set; }
    }
}
