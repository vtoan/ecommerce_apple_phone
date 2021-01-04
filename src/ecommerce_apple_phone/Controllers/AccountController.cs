using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ecommerce_apple_phone.EF;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;

namespace ecommerce_apple_phone.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [HttpGet("check-login")]
        public async Task<ActionResult<object>> IsLogined(
            [FromServices] IMapper mapper
        )
        {
            if (User == null) return NotFound();
            var name = User.FindFirst(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(name.Value);
            if(user == null) return Problem();
            return mapper.Map<InfoModel>(user); 

        }

        public class InputRole{
            public string RoleName { get; set; }
        }
        
        [HttpPost("check-role")]
        public async Task<ActionResult> IsRole(
            InputRole input
        )
        {
            if(!ModelState.IsValid | User == null) return BadRequest();
            var arRoles = input.RoleName.Split(",");
            var user = await _userManager.GetUserAsync(User);
            if(user == null) return NotFound();
            foreach (var item in arRoles)
            {
                var  re = await _userManager.IsInRoleAsync(user, input.RoleName);
                if(!re) return Forbid();
            }
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<object>> LoginAsync(
            [FromServices] IMapper mapper,
            InputModel input)
        {
            if (!ModelState.IsValid) return BadRequest();
            if (_signInManager.IsSignedIn(User)) return Ok();
            IdentityUser user = await _userManager.FindByEmailAsync(input.Email);
            if (user == null) return NotFound();
            var re = await _signInManager.PasswordSignInAsync(input.Email, input.Password, false, false);
            if (re.Succeeded) return mapper.Map<InfoModel>(user);
            return BadRequest();
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> RegisterAsync(
            InputModel input)
        {
            if (!ModelState.IsValid) return BadRequest();
            var user = new AppUser { Name = input.Name, UserName = input.Email, Email = input.Email,};
            var re = await _userManager.CreateAsync(user, input.Password);
            if (re.Succeeded)
            {
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                code = GetTokenEncode(code);
                SendMail(user.Email, "Xác nhận địa chỉ email",
                        $"Hãy xác nhận địa chỉ email bằng cách <a href='./'>Bấm vào đây</a>.");
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok();
            }
            return Problem();
        }

        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmailAsync(ConfirmEmailModel input)
        {
            if (!ModelState.IsValid) return BadRequest();
            var user = await _userManager.FindByIdAsync(input.UserId);
            if (user == null) return NotFound();
            var re = await _userManager.ConfirmEmailAsync(user, input.Code);
            if (!re.Succeeded) return Problem();
            return Ok();
        }


        [HttpPost("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            if (!_signInManager.IsSignedIn(User)) return NotFound();
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassAsync(ChangePasswordModel input)
        {
            if (!ModelState.IsValid) return BadRequest();
            var user = await _userManager.FindByIdAsync(input.UserId);
            if (user == null) return NotFound();
            var re = await _userManager.ChangePasswordAsync(user, input.CurrentPassword, input.NewPassword);
            if (!re.Succeeded) return Problem();
            return Ok();
        }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassAsync([FromForm] string email)
        {
            if (String.IsNullOrEmpty(email)) return BadRequest();
            var user = await _userManager.FindByEmailAsync(email);
            //Check user
            if (user == null) return NotFound();
            // if (!user.EmailConfirmed) return Problem();
            // ====== Gen code ======
            user.TwoFactorEnabled = true;
            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            code = GetTokenEncode(code);
            SendMail(user.Email, "Forgot pass",
                       $"Hãy xác nhận địa chỉ email bằng cách <a href='./'>Bấm vào đây</a>.");
            // return Ok();
            return Content(code);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassAsync(ResetPasswordModel input)
        {
            if (!ModelState.IsValid) return BadRequest();
            var user = await _userManager.FindByEmailAsync(input.Email);
            //Check user
            if (user == null) return NotFound();
            // if (!user.EmailConfirmed) return Problem();
            var code = GetTokenDecode(input.Code);
            var re = await _userManager.ResetPasswordAsync(user, code, input.NewPassword);
            if (!re.Succeeded) return Problem();
            return Ok();
        }

        [Route("login/{provider?}")]
        public async Task<IActionResult> ExternalLoginAsync(string provider)
        {
            if (String.IsNullOrEmpty(provider)) return BadRequest();
            var lsProvider = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            var provider_process = lsProvider.Find(item => item.Name == provider);
            if (provider_process == null) return BadRequest();
            var redirectUrl = "https://localhost:5001/account/external-callback";
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider_process.Name, redirectUrl);
            return new ChallengeResult(provider, properties);
        }

        [Route("external-callback")]
        public async Task<ActionResult<InfoModel>> ExternalLoginCallbackAsync(
            [FromServices] IMapper mapper,
            string remoteError = null)
        {
            if (remoteError != null) return Problem(remoteError);
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null) return Problem("Can't get info in External Login");
            var re = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, false);
            if (re.Succeeded) return Ok();
            //Create new user with info external
            string email = info.Principal.FindFirstValue(ClaimTypes.Email);
            string name = info.Principal.FindFirstValue(ClaimTypes.Name);
            if (email == null || name == null) return Problem("Can't login with External Login");
            var user = new AppUser { Name = name, UserName = email, Email = email, EmailConfirmed = true };
            var createResult = await _userManager.CreateAsync(user);
            if (!createResult.Succeeded) return Problem("Can't create user with External Login");
            var addLoginResult = await _userManager.AddLoginAsync(user, info);
            if (!addLoginResult.Succeeded) return Problem("Can't add login with Externak Login");
            await _signInManager.SignInAsync(user, false);
            return mapper.Map<InfoModel>(user);
        }

        [HttpGet]
        public List<InfoModel> GetAccount([FromServices] IMapper mapper)
        {
            List<InfoModel> result = new List<InfoModel>();
            var listUser = _userManager.Users.ToList();
            if (listUser == null || listUser.Count == 0) return result;
            foreach (var item in listUser)
                result.Add(mapper.Map<InfoModel>(item));
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InfoModel>> GetAccountAsync(
            [FromServices] IMapper mapper,
            string id)
        {
            if (String.IsNullOrEmpty(id)) return BadRequest();
            var re = await _userManager.FindByIdAsync(id);
            if (re == null) return NotFound();
            return mapper.Map<InfoModel>(re);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> ChangeInfoAsync(string id, InfoModel input)
        {
            if (!ModelState.IsValid) return BadRequest();
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();
            user.Address = input.Address;
            user.Name = input.Name;
            user.PhoneNumber = input.PhoneNumber;
            var re = await _userManager.UpdateAsync(user);
            if (re.Succeeded) return Ok();
            return BadRequest();
        }

        [HttpDelete("{UserId}")]
        [Authorize]
        public async Task<IActionResult> DeleteAccount(string UserId)
        {
            if (String.IsNullOrEmpty(UserId)) return BadRequest();
            var user = await _userManager.FindByIdAsync(UserId);
            if (user == null) return NotFound();
            var re = await _userManager.DeleteAsync(user);
            if (re.Succeeded) return Ok();
            return BadRequest();
        }


        [HttpGet("authorize/{UserID}")]
        [Authorize]
        public async Task<ActionResult<List<String>>> GetRoleUser(string UserId)
        {
            if (String.IsNullOrEmpty(UserId)) return BadRequest();
            var user = await _userManager.FindByIdAsync(UserId);
            if (user == null) return NotFound();
            //
            var re = await _userManager.GetRolesAsync(user);
            if (re == null) return NotFound();
            return re.ToList();
        }


        [HttpPost("authorize")]
        [Authorize]
        public async Task<IActionResult> AddRoleUser(ChangeRoleModel input)
        {
            if (!ModelState.IsValid) return BadRequest();
            var user = await _userManager.FindByIdAsync(input.UserId);
            if (user == null) return NotFound();
            //
            var re = await _userManager.AddToRoleAsync(user, input.RoleName);
            if (re.Succeeded) return Ok();
            return Problem();
        }

        [HttpDelete("authorize")]
        [Authorize]
        public async Task<IActionResult> RemoveRoleUser(ChangeRoleModel input)
        {
            if (!ModelState.IsValid) return BadRequest();
            var user = await _userManager.FindByIdAsync(input.UserId);
            if (user == null) return NotFound();
            //
            var re = await _userManager.RemoveFromRoleAsync(user, input.RoleName);
            if (re.Succeeded) return Ok();
            return Problem();
        }

        [HttpGet("roles")]
        public ActionResult<IEnumerable<String>> GetList()
        {
            return _roleManager.Roles.Select(item => item.Name).ToArray();
        }

        [HttpPost("init-user")]
        public async Task<ActionResult> InitRolesAsync()
        {
            var user = await _userManager.FindByEmailAsync("admin@gmail.com");
            if (user != null) return Problem();
            await _roleManager.CreateAsync(new IdentityRole() { Name = "Admin" });
            await _roleManager.CreateAsync(new IdentityRole() { Name = "Sale" });
            await _roleManager.CreateAsync(new IdentityRole() { Name = "Warehouse" });
            await _roleManager.CreateAsync(new IdentityRole() { Name = "User" });
            var admin = await _userManager.CreateAsync(new AppUser() {UserName="admin@gmail.com" , Name = "Admin", Email = "admin@gmail.com" }, "123");
            var ad= await _userManager.FindByEmailAsync("admin@gmail.com");
            await  _userManager.AddToRoleAsync(ad,"admin");
            // await _userManager.AddToRoleAsync(sale, "sale");
            // await _userManager.AddToRoleAsync(stock, "stock");
            return Ok();
        }

        // =============== NON ACTION ===============
        [NonAction]
        private string GetTokenEncode(string code)
        {
            return WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
        }

        [NonAction]

        private string GetTokenDecode(string code)
        {
            return Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
        }

        [NonAction]
        private void SendMail(string email, string title, string content)
        {

        }
    }
    public class InputModel
    {
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class ConfirmEmailModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Code { get; set; }
    }

    public class ChangePasswordModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }

    public class ResetPasswordModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Code { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }

    public class InfoModel
    {
        // [Required]
        public string Id { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string RoleName { get; set; }
        public string DateCreated { get; set; }
    }

    public class ChangeRoleModel
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string RoleName { get; set; }
    }
}