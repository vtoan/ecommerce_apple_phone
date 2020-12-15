using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using ecommerce_apple_phone.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ecommerce_apple_phone
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public void ConfigureServices(IServiceCollection services)
        {

            //======== Mail ========
            services.AddOptions();
            var mailSettings = Configuration.GetSection("MailSettings");
            services.Configure<MailSettings>(mailSettings);
            //======== DbContext  ========
            services.AddDbContext<PhoneContext>(
                options => options.UseSqlServer(Configuration.GetConnectionString("Default")));
            //======== Identity  ========
            services.AddIdenityServices(this.Configuration);
            //======== SPA  ========
            // services.AddSpaStaticFiles (configuration => {
            //     configuration.RootPath = "clientUi/dist";
            // });
            // services.AddControllersWithViews ();

            // ======== CORS  ========
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder
                            .WithOrigins("http://localhost:4200")
                            .AllowAnyHeader()
                            .AllowAnyMethod(); ;
                    });
            });

            //======== Models  ========
            services.AddModels(this.Configuration);
            //======== Sub Serivce  ========
            services.AddSubServices(this.Configuration);
            //======== Other  ========
            services.AddMemoryCache();
            services.AddAutoMapper(typeof(MapperConfig).Assembly);
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // app.UseSpa (spa => {
            //     // To learn more about options for serving an Angular SPA from ASP.NET Core,
            //     // see https://go.microsoft.com/fwlink/?linkid=864501

            //     spa.Options.SourcePath = "clientUi";

            //     if (env.IsDevelopment ()) {
            //         spa.UseAngularCliServer (npmScript: "start");
            //         // spa.UseProxyToSpaDevelopmentServer ("http://localhost:4200");
            //     }
            // });
        }
    }
}