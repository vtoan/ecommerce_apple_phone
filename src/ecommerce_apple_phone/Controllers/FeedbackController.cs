using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace ecommerce_apple_phone.Controllers {
    [ApiController]
    [Route ("product/[controller]")]
    public class FeedbackController : ControllerBase {

        private IFeedbackModel _fbModel;
        public FeedbackController () { }

        [HttpGet ("{id}")]
        public ActionResult<List<FeedbackDTO>> Get (int id) {
            if (id <= 0) return BadRequest ();
            var re = _fbModel.GetListDTOs (id);
            if (re == null || re.Count == 0) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPost]
        public IActionResult Add (
            [FromServices] ICacheHelper cache, [FromServices] IProductModel productModel, [FromServices] IUserModel userModel,
            FeedbackDTO feedbackDTO) {
            if (feedbackDTO.ProductId <= 0 || productModel.GetDetailDTO (feedbackDTO.ProductId) == null)
                return BadRequest (new { message = "Product not exist" });
            if (feedbackDTO.UserId <= 0 || userModel.GetDTO ((int) feedbackDTO.UserId) == null)
                return BadRequest (new { message = "User not exist" });
            if (feedbackDTO.FeedbackContent == null || feedbackDTO.FeedbackContent == "")
                return BadRequest (new { message = "Content is empty" });
            var re = _fbModel.AddDTO (feedbackDTO);
            if (re == null) return Problem (statusCode: 500, detail: "Can't add data");
            return Ok ();
        }

        [HttpDelete ("{id}")]
        public IActionResult Remove (int id) {
            if (id <= 0) return NotFound ();
            if (!_fbModel.RemoveDTO (id)) return Problem (statusCode: 500, detail: "Can't remove data");
            return Ok ();
        }

    }
}