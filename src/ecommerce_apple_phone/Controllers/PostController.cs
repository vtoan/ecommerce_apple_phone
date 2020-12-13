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

        public PostController (IPostModel postModel) {
            _postModel = postModel;
        }

        [HttpGet ("{id}")]
        public ActionResult<PostDTO> Get(string id) {
            if (DataHelper.IsEmptyString(id)) return BadRequest (new { message = "ID is invalid" });
            var itemId = DataHelper.GetDetailId(id);
            if (itemId == 0) return BadRequest();
            var re = _postModel.GetDTO (itemId);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPut ("{id}")]
        public IActionResult Update (string id, PostDTO postDTO) {
            if (DataHelper.IsEmptyString(id)) return BadRequest (new { message = "ID is invalid" });
            var itemId = DataHelper.GetDetailId(id);           
            var modified = new PropModified<PostDTO> (postDTO);
            if (!modified.isChanged) return BadRequest ();
            if (!_postModel.UpdateDTO (itemId, postDTO)) return Problem (statusCode: 500, detail: "Can't update data");
            return Ok ();
        }

        [HttpPost]
        public IActionResult Add ([FromServices] IProductModel productModel,[FromForm] PostDTO postDTO) {
            if (postDTO.Id <= 0 || productModel.GetDetailDTO (postDTO.Id) == null) return BadRequest (new { message = "Add method is invalid, field 'ID' not require" });
            var re = _postModel.AddDTO (postDTO);
            if (re == null) return Problem (statusCode: 500, detail: "Can't add data");
            return Ok ();
        }

        [HttpDelete ("{id}")]
        public IActionResult Remove (string id) {
            if (DataHelper.IsEmptyString(id)) return BadRequest (new { message = "ID is invalid" });
            var itemId = DataHelper.GetDetailId(id);     
            if (itemId == 0) return BadRequest ();
            if (!_postModel.RemoveDTO (itemId)) return Problem (statusCode: 500, detail: "Can't remove data");
            return Ok ();
        }

        [HttpPost ("image-seo")]
        public ActionResult UpdateImageSEO ([FromServices]  IUploadService upload, IFormFile file) {
            if(file==null) return BadRequest();
            if(!upload.UploadFile(file,"image_seo")) return  Problem (statusCode: 500, detail: "Can't upload file");
            return Ok();
        }

    }
}