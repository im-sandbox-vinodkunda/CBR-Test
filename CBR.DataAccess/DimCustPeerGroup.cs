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
    
    public partial class DimCustPeerGroup
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DimCustPeerGroup()
        {
            this.FactCustPGUBPRDatas = new HashSet<FactCustPGUBPRData>();
            this.DimCustPeerGroupDetails = new HashSet<DimCustPeerGroupDetail>();
        }
    
        public int CustPeerGroupKey { get; set; }
        public string CustPeerGroupName { get; set; }
        public long TenantKey { get; set; }
        public long UserKey { get; set; }
        public bool IsActive { get; set; }
        public bool IsDefault { get; set; }
        public System.DateTime AuditInsertedDateTime { get; set; }
        public Nullable<int> AuditInsertedPackageKey { get; set; }
        public Nullable<System.DateTime> AuditUpdatedDateTime { get; set; }
        public Nullable<int> AuditUpdatedPackageKey { get; set; }
        public byte[] AuditHashMD5 { get; set; }
        public string StatusReason { get; set; }
    
        public virtual AppUser AppUser { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FactCustPGUBPRData> FactCustPGUBPRDatas { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DimCustPeerGroupDetail> DimCustPeerGroupDetails { get; set; }
        public virtual AppTenant AppTenant { get; set; }
    }
}
