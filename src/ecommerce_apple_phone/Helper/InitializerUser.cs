using System.Threading.Tasks;
using ecommerce_apple_phone.EF;
using Microsoft.AspNetCore.Identity;

namespace ecommerce_apple_phone.Helper
{
    public class InitializerUser
    {
        public static async Task Initialize(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var user = await userManager.FindByEmailAsync("admin@gmail.com");
            if (user != null) return;
            await roleManager.CreateAsync(new IdentityRole() { Name = "Admin" });
            await roleManager.CreateAsync(new IdentityRole() { Name = "Sale" });
            await roleManager.CreateAsync(new IdentityRole() { Name = "Warehouse" });
            await roleManager.CreateAsync(new IdentityRole() { Name = "User" });
            var admin = await userManager.CreateAsync(new AppUser() { UserName = "admin@gmail.com", Name = "Admin", Email = "admin@gmail.com" }, "123");
            var ad = await userManager.FindByEmailAsync("admin@gmail.com");
            await userManager.AddToRoleAsync(ad, "admin");
            // await userManager.AddToRoleAsync(sale, "sale");
            // await _userManager.AddToRoleAsync(stock, "stock");
        }
    }
}