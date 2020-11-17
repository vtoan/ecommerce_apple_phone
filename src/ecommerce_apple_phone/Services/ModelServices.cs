using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;
using ecommerce_apple_phone.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ecommerce_apple_phone.Services {
    public static class ModelServices {
        public static IServiceCollection AddModels (
            this IServiceCollection services, IConfiguration config) { //
            services.AddScoped<IFeeModel, FeeModel> ();
            return services;
        }
    }
}