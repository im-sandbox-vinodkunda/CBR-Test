using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using CBR.Web.Models;
using CBR.Identity;
using CBR.DataAccess;

namespace CBR.Web
{
    // Configure the application sign-in manager which is used in this application.
    public class ApplicationSignInManager : SignInManager<AuthUser, long>
    {
        public ApplicationSignInManager(AuthUserManager userManager, IAuthenticationManager authenticationManager)
            : base(userManager, authenticationManager)
        {
        }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(AuthUser user)
        {
            return user.GenerateUserIdentityAsync((AuthUserManager)UserManager);
        }

        public override Task<SignInStatus> PasswordSignInAsync(string userName, string password, bool isPersistent, bool shouldLockout)
        {
            Task<SignInStatus> checkUserStatus = Task.Factory.StartNew<SignInStatus>(() => {
                Task<SignInStatus> status = base.PasswordSignInAsync(userName, password, isPersistent, shouldLockout);
                status.Wait();
                SignInStatus finalStatus = SignInStatus.Failure;
                if (status.Result == SignInStatus.Success)
                {
                    CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();
                    var user = ent.AppUsers.FirstOrDefault(obj => obj.EMail == userName && obj.IsDeleted == false && obj.IsActive == true && obj.IsLocked == false);
                    if (user == null)
                        finalStatus = SignInStatus.Failure;
                    else
                        finalStatus = SignInStatus.Success;
                }

                return finalStatus;
            });

            checkUserStatus.Wait();

            return checkUserStatus;
        }
        
        public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<AuthUserManager>(), context.Authentication);
        }
    }
}
