using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class FavoriteSearchParams
    {
        public string Location { get; set; }

        public string AssetSize { get; set; }

        public string AssetMinSize { get; set; }

        public string AssetMaxSize { get; set; }

        public string Percentile { get; set; }
    }
}
