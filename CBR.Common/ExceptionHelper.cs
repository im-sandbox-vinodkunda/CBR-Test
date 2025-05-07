using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights;

namespace CBR.Common
{
    public static class ExceptionHelper
    {
        public static void TrackException(Exception ex)
        {
            TelemetryClient telemetry = new TelemetryClient();
            telemetry.TrackException(ex);
        }
    }
}
