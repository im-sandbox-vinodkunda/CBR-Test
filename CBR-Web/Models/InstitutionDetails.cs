using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class InstitutionDetails
    {
        public string PeerGroup { get; set; }
        public int PeerGroupKey { get; set; }
        public string State { get; set; }
        public string Region { get; set; }
        public Int64 AssetSize { get; set; }
    }
}