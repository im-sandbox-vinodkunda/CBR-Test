using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class ProjectDocument
    {
        public long FileId { get; set; }
        public string FileName { get; set; }
        public string DocumentType { get; set; }
        public string ProjectType { get; set; }
        public string AuthorName { get; set; }
        public string FileSize { get; set; }
        public System.DateTime AuditInsertedDatetime { get; set; }
        public string AuditInsertedBy { get; set; }
        public System.DateTime AuditLastUpdatedDatetime { get; set; }
        public string AuditLastUpdatedBy { get; set; }
        public string FileDisplayName { get; set; }
        public long? ActualFileSizeInBytes { get; set; }
        public string DisplayDate { get; set; }
        public long? TenantKey { get; set; }
        public int TotalDocuments { get; set; }
    }
}