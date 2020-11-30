using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using ecommerce_apple_phone.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ecommerce_apple_phone.Services
{
    public static class SubServices
    {
        public static IServiceCollection AddSubServices(
            this IServiceCollection services, IConfiguration config){ //
            services.AddSingleton<ICacheHelper, CacheHelper>();
            services.AddScoped<IUploadService, Upload>();
            services.AddScoped<IMailSenderService, EmailSender>();
            services.AddScoped<IPaymentService, Payment>();
            return services;
        }
    }
}