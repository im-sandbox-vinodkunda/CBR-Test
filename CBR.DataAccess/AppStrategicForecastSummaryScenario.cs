//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CBR.DataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class AppStrategicForecastSummaryScenario
    {
        public int SummaryScenarioKey { get; set; }
        public int SummaryKey { get; set; }
        public int ScenarioKey { get; set; }
        public long UserKey { get; set; }
        public long TenantKey { get; set; }
        public Nullable<System.DateTime> AuditInsertedDate { get; set; }
    
        public virtual AppStrategicForecastScenario AppStrategicForecastScenario { get; set; }
        public virtual AppStrategicForecastSummary AppStrategicForecastSummary { get; set; }
        public virtual AppUser AppUser { get; set; }
        public virtual AppTenant AppTenant { get; set; }
    }
}
