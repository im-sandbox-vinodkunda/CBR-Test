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
    
    public partial class AppTenant
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AppTenant()
        {
            this.AppStrategicForecastScenarios = new HashSet<AppStrategicForecastScenario>();
            this.AppStrategicForecastSummaries = new HashSet<AppStrategicForecastSummary>();
            this.AppStrategicForecastSummaryScenarios = new HashSet<AppStrategicForecastSummaryScenario>();
            this.AppStrategicForecastInputDatas = new HashSet<AppStrategicForecastInputData>();
            this.AppUsers = new HashSet<AppUser>();
            this.DimCustPeerGroups = new HashSet<DimCustPeerGroup>();
            this.FactUBPRBenchmarks = new HashSet<FactUBPRBenchmark>();
            this.FactUBPRBenchmarkThresholds = new HashSet<FactUBPRBenchmarkThreshold>();
            this.AppAccessControls = new HashSet<AppAccessControl>();
        }
    
        public long TenantKey { get; set; }
        public int InstitutionKey { get; set; }
        public string TenantName { get; set; }
        public string TenantDomain { get; set; }
        public bool IsActive { get; set; }
        public Nullable<System.DateTime> InsertedDateTime { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public string TenantType { get; set; }
        public Nullable<int> ReferredBy { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AppStrategicForecastScenario> AppStrategicForecastScenarios { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AppStrategicForecastSummary> AppStrategicForecastSummaries { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AppStrategicForecastSummaryScenario> AppStrategicForecastSummaryScenarios { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AppStrategicForecastInputData> AppStrategicForecastInputDatas { get; set; }
        public virtual DimInstitution DimInstitution { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AppUser> AppUsers { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DimCustPeerGroup> DimCustPeerGroups { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FactUBPRBenchmark> FactUBPRBenchmarks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FactUBPRBenchmarkThreshold> FactUBPRBenchmarkThresholds { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AppAccessControl> AppAccessControls { get; set; }
    }
}
