using System.Collections.Generic;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace ecommerce_apple_phone.Controllers
{
    [ApiController]
    [Route ("[controller]")]
    public class CategoryController : ControllerBase {

        private ICategoryModel _cateModel;
        public CategoryController (ICategoryModel categoryModel) {
            _cateModel = categoryModel;
        }

        [HttpGet]
        public ActionResult<List<CategoryDTO>> Get () {
            var re = _cateModel.GetListDTOs ();
            if (re == null || re.Count == 0) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet ("{id}")]
        public ActionResult<CategoryDTO> Get (int id) {
            if (id <= 0) return BadRequest (new { message = "ID is invalid" });
            var re = _cateModel.GetDTO (id);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPut ("{id}")]
        public IActionResult Update (int id, CategoryDTO categoryDTO) {
            if (id <= 0 || id != categoryDTO.Id) return BadRequest (new { message = "ID is invalid" });
            if (!_cateModel.UpdateDTO (id, categoryDTO)) return Problem (statusCode: 500, detail: "Can't update data");
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