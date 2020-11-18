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
            services.AddScoped<ICategoryModel, CategoryModel> ();
            services.AddScoped<IInfoModel, InfoModel> ();
            services.AddScoped<IProductModel, ProductModel> ();
            services.AddScoped<IPostModel, PostModel> ();
            services.AddScoped<IFeedbackModel, FeedbackModel> ();
            services.AddScoped<IOrderModel, OrderModel> ();
            services.AddScoped<IImportProductModel, ImportModel> ();
            services.AddScoped<IMethodPayModel, MethodPayModel> ();
            services.AddScoped<IPromotionModel, PromotionModel> ();
            services.AddScoped<IUserModel, UserModel> ();
            return services;
        }
    }
}