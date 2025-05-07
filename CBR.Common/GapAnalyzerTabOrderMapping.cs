using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Common
{
    public static class GapAnalyzerTabOrderMapping
    {
        public static Dictionary<string, int> TabOrderMapping = new Dictionary<string, int>();
        static GapAnalyzerTabOrderMapping()
        {
            try
            {
                TabOrderMapping.Add("UBPRE420", 0);
                TabOrderMapping.Add("UBPRE414", 1);
                TabOrderMapping.Add("UBPRE393", 2);
                TabOrderMapping.Add("UBPRE394", 2);
                TabOrderMapping.Add("UBPRE417", 1);
                TabOrderMapping.Add("UBPRE415", 1);
                TabOrderMapping.Add("UBPRE416", 2);
                TabOrderMapping.Add("UBPRFB71", 2);
                TabOrderMapping.Add("UBPRFB72", 2);
                TabOrderMapping.Add("UBPRE418", 1);
                TabOrderMapping.Add("UBPRE419", 1);
                TabOrderMapping.Add("UBPRE396", 2);
                TabOrderMapping.Add("UBPRE389", 2);
                TabOrderMapping.Add("UBPRFB74", 0);
                TabOrderMapping.Add("UBPRE421", 0);
                TabOrderMapping.Add("UBPRE422", 0);
                TabOrderMapping.Add("UBPRE423", 0);
                TabOrderMapping.Add("UBPRE424", 0);
                TabOrderMapping.Add("UBPRE425", 1);
                TabOrderMapping.Add("UBPRFB75", 1);
                TabOrderMapping.Add("UBPRE426", 0);
                TabOrderMapping.Add("UBPRE429", 0);
                TabOrderMapping.Add("UBPRE431", 0);
                TabOrderMapping.Add("UBPRE430", 0);
                TabOrderMapping.Add("UBPRFB76", 1);
                TabOrderMapping.Add("UBPRFB77", 1);
            }
            catch(Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
        }
    }
}
