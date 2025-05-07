using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Identity.Models
{
    class UserTokenProviderProvider
    {
        private static UserTokenProviderProvider _instance;
        private static DataProtectorTokenProvider<AuthUser, long> _dataProtectorTokenProvider;
        // Constructor is 'protected'
        
        public DataProtectorTokenProvider<AuthUser, long> DataProtectorTokenProvider
        {
            get {
                return _dataProtectorTokenProvider;
            }
        }

        protected UserTokenProviderProvider()
        {
        }

        public static UserTokenProviderProvider Instance(IDataProtectionProvider dataProtectionProvider)
        {
            // Uses lazy initialization.

            // Note: this is not thread safe.

            if (_instance == null)
            {
                _instance = new UserTokenProviderProvider();
                _dataProtectorTokenProvider = new DataProtectorTokenProvider<AuthUser, long>(dataProtectionProvider.Create("ASP.NET Identity")) { TokenLifespan = TimeSpan.FromDays(1) };
            }

            return _instance;
        }
    }
}
