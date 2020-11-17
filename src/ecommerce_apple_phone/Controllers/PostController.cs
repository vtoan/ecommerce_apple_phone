using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace ecommerce_apple_phone.Controllers {
    [ApiController]
    [Route ("product/[controller]")]
    public class PostController : ControllerBase {

        private IPostModel _postModel;

        public PostController () { }

        [HttpGet ("{id}")]
        public ActionResult<PostDTO> Get (int id) {
            if (id <= 0) return BadRequest (new { message = "ID is invalid" });
            var re = _postModel.GetDTO (id);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPut ("{id}")]
        public IActionResult Update (int id, PostDTO postDTO) {
            if (id <= 0 || id != postDTO.Id) return BadRequest (new { message = "ID is invalid" });
            var modified = new PropModified<PostDTO> (postDTO);
            if (!modified.isChanged) return BadRequest ();
            if (!_postModel.UpdateDTO (id, postDTO)) return Problem (statusCode: 500, detail: "Can't update data");
            return Ok ();
        }

        [HttpPost]
        public IActionResult Add ([FromServices] IProductModel productModel, PostDTO postDTO) {
            if (postDTO.Id <= 0 || productModel.GetDetailDTO (postDTO.Id) == null) return BadRequest (new { message = "Add method is invalid, field 'ID' not require" });
            var re = _postModel.AddDTO (postDTO);
            if (re == null) return Problem (statusCode: 500, detail: "Can't add data");
            return Ok ();
        }

        [HttpDelete ("{id}")]
        public IActionResult Remove (int id) {
            if (id <= 0) return NotFound ();
            if (!_postModel.RemoveDTO (id)) return Problem (statusCode: 500, detail: "Can't remove data");
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

    }
}