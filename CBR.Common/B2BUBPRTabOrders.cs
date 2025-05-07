using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Common
{
    public static class B2BUBPRTabOrders
    {
        public static Dictionary<string, int> TabOrderMapping = new Dictionary<string, int>();

        static B2BUBPRTabOrders()
        {
            try
            {
                //Balance $$$
                TabOrderMapping.Add("CALC0083", 0);
                TabOrderMapping.Add("RCFD0081", 1);
                TabOrderMapping.Add("RCFD0071", 1);
                TabOrderMapping.Add("CALC0084", 0);
                TabOrderMapping.Add("RCFD1754", 1);
                TabOrderMapping.Add("RCFD1773", 1);
                TabOrderMapping.Add("CALC0085", 0);
                TabOrderMapping.Add("RCONB987", 1);
                TabOrderMapping.Add("RCFDB989", 1);
                TabOrderMapping.Add("CALC0086", 0);
                TabOrderMapping.Add("RCFD5369", 1);
                TabOrderMapping.Add("RCFDB529", 1);
                TabOrderMapping.Add("RCFD3123", 0);
                TabOrderMapping.Add("RCFD2123", 0);
                TabOrderMapping.Add("RCFD2122", 0);
                TabOrderMapping.Add("CALC0174", 1);
                TabOrderMapping.Add("CALC0142", 2);
                TabOrderMapping.Add("RCFD1420", 2);
                TabOrderMapping.Add("CALC0143", 2);
                TabOrderMapping.Add("RCFD1460", 2);
                TabOrderMapping.Add("CALC0144", 2);
                TabOrderMapping.Add("CALC0145", 1);
                TabOrderMapping.Add("RCFD1590", 1);
                TabOrderMapping.Add("CALC0146", 1);
                TabOrderMapping.Add("CALC0147", 1);
                TabOrderMapping.Add("RCFD2081", 1);
                TabOrderMapping.Add("RCFD2107", 1);
                TabOrderMapping.Add("CALC0175", 1);
                TabOrderMapping.Add("CALC0148", 1);
                TabOrderMapping.Add("RCFD3545", 0);
                TabOrderMapping.Add("RCFD2145", 0);
                TabOrderMapping.Add("RCFD2150", 0);
                TabOrderMapping.Add("RCFD2130", 0);
                TabOrderMapping.Add("CALC0087", 0);
                TabOrderMapping.Add("RCFD3163", 1);
                TabOrderMapping.Add("RCFD0426", 1);
                TabOrderMapping.Add("RCFD2160", 0);
                TabOrderMapping.Add("RCFD2170", 0);
                TabOrderMapping.Add("UBPRK434", 0);
                TabOrderMapping.Add("RCON2210", 2);
                TabOrderMapping.Add("CALC0149", 2);
                TabOrderMapping.Add("RCON6810", 2);
                TabOrderMapping.Add("RCON0352", 2);
                TabOrderMapping.Add("UBPRK426", 2);
                TabOrderMapping.Add("UBPR2366", 2);                
                TabOrderMapping.Add("UBPRK437", 1);
                TabOrderMapping.Add("RCFN2200", 1);
                TabOrderMapping.Add("CALC0088", 0);
                TabOrderMapping.Add("CALC0140", 1);
                TabOrderMapping.Add("CALC0141", 1);
                TabOrderMapping.Add("RCONB993", 1);
                TabOrderMapping.Add("RCFDB995", 1);
                TabOrderMapping.Add("RCFDG105", 0);
                TabOrderMapping.Add("RCFDB530", 0);
                TabOrderMapping.Add("RCFD3632", 0);
                TabOrderMapping.Add("RCFD3839", 0);
                TabOrderMapping.Add("RCFD3230", 0);
                TabOrderMapping.Add("RCFD3838", 0);
                TabOrderMapping.Add("RCFD2948", 0);
                TabOrderMapping.Add("RCFD2930", 0);
                TabOrderMapping.Add("RCFD3548", 0);
                TabOrderMapping.Add("RCFD3190", 0);
                TabOrderMapping.Add("RCFD3200", 0);
                TabOrderMapping.Add("RCFD3210", 1);
                TabOrderMapping.Add("RCFD3000", 1);
                TabOrderMapping.Add("RCFD3300", 0);
                //Income $$$
                TabOrderMapping.Add("RIAD4107", 0);
                TabOrderMapping.Add("RIAD4010", 1);
                TabOrderMapping.Add("CALC0017", 2);
                TabOrderMapping.Add("RIAD4059", 2);
                TabOrderMapping.Add("RIAD4065", 1);
                TabOrderMapping.Add("RIAD4115", 1);
                TabOrderMapping.Add("CALC0018", 1);
                TabOrderMapping.Add("RIAD4069", 1);
                TabOrderMapping.Add("RIAD4020", 1);
                TabOrderMapping.Add("RIAD4518", 1);
                TabOrderMapping.Add("RIAD4073", 0);
                TabOrderMapping.Add("CALC0019", 1);
                TabOrderMapping.Add("CALC0020", 2);
                TabOrderMapping.Add("RIAD4172", 2);
                TabOrderMapping.Add("RIAD4180", 1);
                TabOrderMapping.Add("RIAD4185", 1);
                TabOrderMapping.Add("RIAD4200", 1);
                TabOrderMapping.Add("RIAD4074", 0);
                TabOrderMapping.Add("RIAD4230", 0);
                TabOrderMapping.Add("RIAD4079", 0);
                TabOrderMapping.Add("RIAD4070", 1);
                TabOrderMapping.Add("RIAD4080", 1);
                TabOrderMapping.Add("RIADA220", 1);
                //TabOrderMapping.Add("RIADC886", 1);
                //TabOrderMapping.Add("RIADC888", 1);
                //TabOrderMapping.Add("RIADC887", 1);
                //TabOrderMapping.Add("RIADC386", 1);
                //TabOrderMapping.Add("RIADC387", 1);
                TabOrderMapping.Add("RIADB491", 1);
                TabOrderMapping.Add("RIADB492", 1);
                TabOrderMapping.Add("RIADB493", 1);
                TabOrderMapping.Add("RIAD5416", 1);
                TabOrderMapping.Add("RIAD5415", 1);
                TabOrderMapping.Add("RIADB496", 1);
                TabOrderMapping.Add("RIADB497", 1);
                TabOrderMapping.Add("CALC0021", 0);
                TabOrderMapping.Add("RIAD3521", 1);
                TabOrderMapping.Add("RIAD3196", 1);
                TabOrderMapping.Add("RIAD4093", 0);
                TabOrderMapping.Add("RIAD4135", 1);
                TabOrderMapping.Add("RIAD4217", 1);
                TabOrderMapping.Add("CALC0022", 1);
                TabOrderMapping.Add("RIADC216", 2);
                TabOrderMapping.Add("RIADC232", 2);
                TabOrderMapping.Add("RIAD4092", 1);
                TabOrderMapping.Add("RIAD4301", 0);
                TabOrderMapping.Add("RIAD4302", 0);
                TabOrderMapping.Add("RIAD4300", 0);
                TabOrderMapping.Add("RIAD4320", 0);
                TabOrderMapping.Add("RIADG104", 0);
                TabOrderMapping.Add("RIADG103", 0);
                TabOrderMapping.Add("RIAD4340", 0);
                TabOrderMapping.Add("RIAD4635", 0);
                TabOrderMapping.Add("RIAD4605", 0);
                TabOrderMapping.Add("CALC0023", 0);
                TabOrderMapping.Add("CALC0024", 0);
                TabOrderMapping.Add("RIAD4470", 1);
                TabOrderMapping.Add("RIAD4460", 1);
                TabOrderMapping.Add("CALC0516", 1);
                TabOrderMapping.Add("RIADC886", 2);
                TabOrderMapping.Add("RIADC888", 2);
                TabOrderMapping.Add("RIADC887", 2);
                TabOrderMapping.Add("CALC0517", 1);
                TabOrderMapping.Add("RIADC386", 2);
                TabOrderMapping.Add("RIADC387", 2);
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

        }
    }
}
