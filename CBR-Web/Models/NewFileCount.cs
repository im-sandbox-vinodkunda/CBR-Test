using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class NewFileCount
    {
        public string ProjectType { get; set; }
        public int NewCount { get; set; }
    }
}
