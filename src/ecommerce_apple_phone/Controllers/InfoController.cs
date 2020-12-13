using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace ecommerce_apple_phone.Controllers
{
    [ApiController]
    [Route ("[controller]")]
    public class InfoController : ControllerBase {

        private IInfoModel _infoModel;
        private ICacheHelper _cache;

        public InfoController (IInfoModel infoModel, ICacheHelper cache) {
            _cache = cache;
            _infoModel = infoModel;
        }

        [HttpGet ()]
        public ActionResult<InfoDTO> Get () {
            var re = _cache.Get<InfoDTO> (Helper.CacheKey.INFO);
            if (re == null) re = _infoModel.GetDTO (1);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            _cache.Set (re, Helper.CacheKey.INFO);
            return re;
        }

        [HttpPut()]
        public IActionResult Update (InfoDTO infoDTO) {
            if (!_infoModel.UpdateDTO (1, infoDTO)) return Problem (statusCode: 500, detail: "Can't update data");
            _cache.DataUpdated(Helper.CacheKey.INFO);
            return Ok ();
        }

        [HttpPost ("image_seo")]
        public ActionResult UpdateImageSEO ([FromServices] IUploadService upload, IFormFile file) {
            if (file == null)  return BadRequest ();
            if(!upload.UploadFile(file, "image_seo")) return Problem (statusCode: 500, detail: "Can't upload file");   
             return Ok();   
           
        }

        [HttpPost ("logo")]
        public ActionResult UpdateLogo ([FromServices]  IUploadService upload, IFormFile file) {
              if (file == null)  return BadRequest ();
            if(!upload.UploadFile(file, "logo")) return Problem (statusCode: 500, detail: "Can't upload file");   
             return Ok(); 
        }

    }
}