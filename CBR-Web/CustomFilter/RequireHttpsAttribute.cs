using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace CBR.Web.CustomFilter
{
    public class RequireHttpsAttribute : IAuthenticationFilter
    {
        public bool AllowMultiple
        {
            get { return true; }
        }

        public Task AuthenticateAsync(HttpAuthenticationContext context,
                                            CancellationToken cancellationToken)
        {
            if (context.Request.RequestUri.Scheme != Uri.UriSchemeHttps)
            {
                context.ActionContext.Response = new HttpResponseMessage(
                                        System.Net.HttpStatusCode.Forbidden);

            }
            return Task.FromResult<object>(null);
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context,
                                            CancellationToken cancellationToken)
        {
            return Task.FromResult<object>(null);
        }
    }

}
