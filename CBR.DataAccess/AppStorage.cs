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
    
    public partial class AppStorage
    {
        public int FileId { get; set; }
        public string FileName { get; set; }
        public string FileDisplayName { get; set; }
        public string DocumentType { get; set; }
        public string ProjectType { get; set; }
        public string AuthorName { get; set; }
        public string FileSize { get; set; }
        public Nullable<long> ActualFileSizeInBytes { get; set; }
        public string DisplayDate { get; set; }
        public System.DateTime AuditInsertedDatetime { get; set; }
        public string AuditInsertedBy { get; set; }
        public System.DateTime AuditLastUpdatedDatetime { get; set; }
        public string AuditLastUpdatedBy { get; set; }
        public Nullable<long> TenantKey { get; set; }
    }
}
