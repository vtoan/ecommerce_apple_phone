using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace ecommerce_apple_phone.Controllers {
    [ApiController]
    [Route ("[controller]")]
    public class ProductController : ControllerBase {

        public IMailSenderService _mailSender;
        public ProductController (IMailSenderService mailSender) {
            _mailSender = mailSender;
        }

        [HttpGet]
        public IActionResult Send () {
            // _mailSender.SendMail ("dtoan2805@gmail.com", "Dm", "Test");
            return Content ("Sended");
        }
    }
}