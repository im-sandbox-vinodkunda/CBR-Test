using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Web.WebCommons
{
    [System.AttributeUsage(System.AttributeTargets.Property)]
    public class CBRDescription : System.Attribute
    {
        public string Description;

        public CBRDescription(string description)
        {
            Description = description;
        }
    }
}
