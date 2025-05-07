namespace CBR.Identity
{
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;

    public class AuthUser : IdentityUser<long, AuthLogin, AuthUserRole, AuthClaim>
    {
        #region properties
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Title { get; set; }

        public string Department { get; set; }

        public string ActivationToken { get; set; }

        public string PasswordAnswer { get; set; }

        public string PasswordQuestion { get; set; }

        public long TenantKey { get; set; }

        #endregion

        #region methods

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(AuthUserManager userManager)
        {
            var userIdentity = await userManager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }

        #endregion
    }
}
