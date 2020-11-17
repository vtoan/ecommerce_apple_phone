using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace ecommerce_apple_phone.Controllers {
    [ApiController]
    [Route ("[controller]")]
    public class InfoController : ControllerBase {

        private IInfoModel _infoModel;

        public InfoController () { }

        [HttpGet ("{id}")]
        public ActionResult<InfoDTO> Get (int id) {
            if (id <= 0) return BadRequest (new { message = "ID is invalid" });
            var re = _infoModel.GetDTO (id);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPut ("{id}")]
        public IActionResult Update (int id, InfoDTO infoDTO) {
            if (id <= 0) return BadRequest (new { message = "ID is invalid" });
            if (!_infoModel.UpdateDTO (id, infoDTO)) return Problem (statusCode: 500, detail: "Can't update data");
            return Ok ();
        }

        [HttpPost ("image-seo")]
        public ActionResult UpdateImageSEO ([FromServices] IWebHostEnvironment environment, IFormFile file) {
            if (file != null) {
                string urlRes = "/image_seo";
                string filePath = Path.Combine (Path.Combine (environment.WebRootPath, urlRes), file.Name);
                using (var fileStream = new FileStream (filePath, FileMode.Create)) {
                    file.CopyTo (fileStream);
                }
                return Ok ();
            }
            return BadRequest ();
        }

        [HttpPost ("logo")]
        public ActionResult UpdateLogo ([FromServices] IWebHostEnvironment environment, IFormFile file) {
            if (file != null) {
                string urlRes = "/logo";
                string filePath = Path.Combine (Path.Combine (environment.WebRootPath, urlRes), file.Name);
                using (var fileStream = new FileStream (filePath, FileMode.Create)) {
                    file.CopyTo (fileStream);
                }
                return Ok ();
            }
            return BadRequest ();
        }

    }
}