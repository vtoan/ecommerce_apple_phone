using System.Threading.Tasks;
using ecommerce_apple_phone.EF;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ecommerce_apple_phone.Services
{
    public static class IdentityServices
    {
        public static IServiceCollection AddIdenityServices(
            this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentity<AppUser, IdentityRole>(options =>
                        {
                            options.Password.RequireDigit = false; // Không bắt phải có số
                            options.Password.RequireLowercase = false; // Không bắt phải có chữ thường
                            options.Password.RequireNonAlphanumeric = false; // Không bắt ký tự đặc biệt
                            options.Password.RequireUppercase = false; // Không bắt buộc chữ in
                            options.Password.RequiredLength = 3; // Số ký tự tối thiểu của password
                            options.Password.RequiredUniqueChars = 0; // Số ký tự riêng biệt
                            //
                            options.User.RequireUniqueEmail = true;
                            options.SignIn.RequireConfirmedAccount = false;

                        })
                            .AddEntityFrameworkStores<PhoneContext>()
                            .AddDefaultTokenProviders();


            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie()
                .AddGoogle(googleOptions =>
                {
                    IConfigurationSection googleAuthNSection = config.GetSection("Authentication:Google");
                    googleOptions.ClientId = googleAuthNSection["ClientId"];
                    googleOptions.ClientSecret = googleAuthNSection["ClientSecret"];

                });

            services.ConfigureApplicationCookie(opt =>
            {
                opt.Cookie.Name = "auth_cookie";
                opt.LoginPath = PathString.Empty;
                opt.AccessDeniedPath = PathString.Empty;
                opt.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = (ctx) =>
                    {
                        ctx.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    },
                    OnRedirectToAccessDenied = (ctx) =>
                    {
                        ctx.Response.StatusCode = 403;
                        return Task.CompletedTask;
                    }
                };
            });
            return services;

        }
    }
}