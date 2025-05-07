using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CBR.Web.Models
{
    public class UserRoleProfile
    {
        public int RoleValue { get; set; }
        public string RoleName { get; set; }
        public bool IsAccessible { get; set; }
    }
}