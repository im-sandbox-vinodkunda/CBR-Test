namespace CBR.Identity
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Validation;
    using System.Linq;

    /// <summary>
    /// A basic implementation for an application database context compatible with ASP.NET Identity 2 using
    /// <see cref="long"/> as the key-column-type for all entities.
    /// </summary>
    /// <remarks>
    /// This type depends on some other types out of this assembly.
    /// </remarks>
    public class ApplicationDbContext : IdentityDbContext<AuthUser, AuthRole, long, AuthLogin, AuthUserRole, AuthClaim>
    {
        #region constructors and destructors

        public ApplicationDbContext()
            : base("DefaultConnection")
        {
        }

        #endregion

        #region methods

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Map Entities to their tables.
            modelBuilder.Entity<AuthUser>().ToTable("AppUser");
            modelBuilder.Entity<AuthRole>().ToTable("AppRole");
            modelBuilder.Entity<AuthClaim>().ToTable("AppUserClaim");
            modelBuilder.Entity<AuthLogin>().ToTable("AppUserLogin");
            modelBuilder.Entity<AuthUserRole>().ToTable("AppUserRole");
            // Set AutoIncrement-Properties
            modelBuilder.Entity<AuthUser>().Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<AuthClaim>().Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<AuthRole>().Property(r => r.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            // Override some column mappings that do not match our default
            modelBuilder.Entity<AuthUser>().Property(r => r.UserName).HasColumnName("Login");
            modelBuilder.Entity<AuthUser>().Property(r => r.PasswordHash).HasColumnName("Password");
            modelBuilder.Entity<AuthUser>().Property(r => r.Id).HasColumnName("UserKey");
            modelBuilder.Entity<AuthRole>().Property(r => r.Id).HasColumnName("RoleKey");
            modelBuilder.Entity<AuthClaim>().Property(r => r.Id).HasColumnName("UserClaimKey");
            modelBuilder.Entity<AuthClaim>().Property(r => r.UserId).HasColumnName("UserKey");
            modelBuilder.Entity<AuthUserRole>().Property(r => r.UserId).HasColumnName("UserKey");
            modelBuilder.Entity<AuthUserRole>().Property(r => r.RoleId).HasColumnName("RoleKey");
            modelBuilder.Entity<AuthLogin>().Property(r => r.UserId).HasColumnName("UserKey");
            //modelBuilder.Entity<AuthUser>().Property(r => r.Tenant).HasColumnName("Tenant");
            //modelBuilder.Entity<AuthUser>().Property(r => r.Role).HasColumnName("Role");

            var user = modelBuilder.Entity<AuthUser>();


            user.Property(u => u.UserName)
                .IsRequired()
                .HasMaxLength(256)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("UserNameIndex") { IsUnique = true, Order = 1 }));


            user.Property(u => u.TenantKey)
                .IsRequired()
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("UserNameIndex") { IsUnique = true, Order = 2 }));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityEntry"></param>
        /// <param name="items"></param>
        /// <returns></returns>
        protected override DbEntityValidationResult ValidateEntity(DbEntityEntry entityEntry, IDictionary<object, object> items)
        {
            if (entityEntry != null && entityEntry.State == EntityState.Added)
            {
                var errors = new List<DbValidationError>();
                var user = entityEntry.Entity as AuthUser;


                if (user != null)
                {
                    if (this.Users.Any(u => string.Equals(u.UserName, user.UserName) && u.TenantKey == user.TenantKey))
                    {
                        errors.Add(
                            new DbValidationError("User", string.Format("Username {0} is already taken for tenant {1}", user.UserName, user.TenantKey)));
                    }


                    if (this.RequireUniqueEmail && this.Users.Any(u => string.Equals(u.Email, user.Email) && u.TenantKey == user.TenantKey))
                    {
                        errors.Add(
                            new DbValidationError(
                                "User",
                                string.Format("Email Address {0} is already taken for tenant {1}", user.UserName, user.TenantKey)));
                    }
                }
                else
                {
                    var role = entityEntry.Entity as AuthRole;


                    if (role != null && this.Roles.Any(r => string.Equals(r.Name, role.Name)))
                    {
                        errors.Add(new DbValidationError("Role", string.Format("Role {0} already exists", role.Name)));
                    }
                }


                if (errors.Any())
                {
                    return new DbEntityValidationResult(entityEntry, errors);
                }
            }


            return new DbEntityValidationResult(entityEntry, new List<DbValidationError>());
        }

        #endregion
    }
}