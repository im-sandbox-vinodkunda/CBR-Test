using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class StrategicForecastModel
    {
        public string ModelName { get; set; }
        public long? ModelKey { get; set; }
        public long? UserKey { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public bool IsSelected { get; set; }
        public string ModelOwner { get; set; }
    }
}
