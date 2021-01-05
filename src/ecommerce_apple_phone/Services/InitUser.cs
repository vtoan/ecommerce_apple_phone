using ecommerce_apple_phone.EF;
using Microsoft.AspNetCore.Identity;

namespace ecommerce_apple_phone.Services
{
    public class InitUser
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public InitUser(UserManager<AppUser> _userManager, RoleManager<IdentityRole> _roleManager)
        {
            this._userManager = _userManager;
            this._roleManager =_roleManager;
        }
        public async void InitData()
        {
            var user = await _userManager.FindByEmailAsync("admin@gmail.com");
            if (user != null) return;
            await _roleManager.CreateAsync(new IdentityRole() { Name = "Admin" });
            await _roleManager.CreateAsync(new IdentityRole() { Name = "Sale" });
            await _roleManager.CreateAsync(new IdentityRole() { Name = "Warehouse" });
            await _roleManager.CreateAsync(new IdentityRole() { Name = "User" });
            await _userManager.CreateAsync(new AppUser() { Name = "Admin", Email = "admin@gmail.com" }, "123");
            await _userManager.CreateAsync(new AppUser() { Name = "Stock", Email = "stock@gmail.com" }, "123");
            await _userManager.CreateAsync(new AppUser() { Name = "Sale", Email = "sale@gmail.com" }, "123");
            var admin = await _userManager.FindByEmailAsync("admin@gmail.com");
            await _userManager.AddPasswordAsync(admin, "123");
            await _userManager.AddToRoleAsync(admin, "admin");
            var sale = await _userManager.FindByEmailAsync("sale@gmail.com");
            await _userManager.AddPasswordAsync(admin, "123");
            await _userManager.AddToRoleAsync(admin, "sale");
            var stock = await _userManager.FindByEmailAsync("stock@gmail.com");
            await _userManager.AddPasswordAsync(admin, "123");
            await _userManager.AddToRoleAsync(admin, "stock");
        }


    }
}