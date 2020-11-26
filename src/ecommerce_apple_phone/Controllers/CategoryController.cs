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
        public ActionResult UpdateImageSEO ([FromServices] IWebHostEnvironment environment, IFormFile image) {
            if (image != null) {
                //Check folder
                string urlRes = "image_seo";
                string folderPath = Path.Combine (environment.WebRootPath, urlRes);
                if (!Directory.Exists (folderPath))
                    Directory.CreateDirectory (folderPath);
                //Save file
                string filePath = Path.Combine (folderPath, image.FileName);
                using (var fileStream = new FileStream (filePath, FileMode.OpenOrCreate)) {
                    image.CopyTo (fileStream);
                }
                return Ok ();
            }
            return BadRequest ();
        }

    }
}