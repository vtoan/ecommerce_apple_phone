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

namespace ecommerce_apple_phone {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddControllersWithViews ();

            //======== Mail ========
            services.AddOptions ();
            var mailSettings = Configuration.GetSection ("MailSettings");
            services.Configure<MailSettings> (mailSettings);
            //======== DbContext  ========
            services.AddDbContext<PhoneContext> (
                options => options.UseSqlServer (Configuration.GetConnectionString ("Default")));
            //======== Models  ========
            services.AddModels (this.Configuration);
            //======== SPA  ========
            services.AddSpaStaticFiles (configuration => {
                configuration.RootPath = "clientUi/dist";
            });
            //======== Other  ========

            services.AddAutoMapper (typeof (MapperConfig).Assembly);
            services.AddControllers ();
            services.AddSingleton<IMailSenderService, EmailSender> ();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            app.UseHttpsRedirection ();

            app.UseStaticFiles ();
            if (!env.IsDevelopment ()) {
                app.UseSpaStaticFiles ();
            }

            app.UseRouting ();

            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
            });

            app.UseSpa (spa => {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "clientUi";

                if (env.IsDevelopment ()) {
                    // spa.UseAngularCliServer (npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer ("http://localhost:4200");
                }
            });
        }
    }
}