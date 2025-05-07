using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.Models
{
    [Serializable]
    public class AddToFavoriteParams
    {
        public int InstitutionKey { get; set; }
        public bool IsDefault { get; set; }
    }
}
