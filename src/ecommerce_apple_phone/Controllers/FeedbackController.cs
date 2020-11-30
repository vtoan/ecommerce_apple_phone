using System.Collections.Generic;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace ecommerce_apple_phone.Controllers
{
    [ApiController]
    [Route("product/[controller]")]
    public class FeedbackController : ControllerBase
    {

        private IFeedbackModel _fbModel;
        public FeedbackController(IFeedbackModel feedbackModel)
        {
            _fbModel = feedbackModel;
        }

        [HttpGet("{id}")]
        public ActionResult<List<FeedbackDTO>> Get(string id)
        {
            if (DataHelper.IsEmptyString(id)) return BadRequest(new { message = "ID is invalid" });
            var itemId = DataHelper.GetDetailId(id);
            if (itemId == 0) return BadRequest();
            var re = _fbModel.GetListDTOs(itemId);
            if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPost]
        public IActionResult Add(
            [FromServices] ICacheHelper cache, [FromServices] IProductModel productModel, [FromServices] IUserModel userModel,
            [FromForm] FeedbackDTO feedbackDTO)
        {
            if(!ModelState.IsValid) return BadRequest();
            if (feedbackDTO.ProductDetailId <= 0 || productModel.GetDetailDTO(feedbackDTO.ProductDetailId) == null)
                return BadRequest(new { message = "Product not exist" });
            if (feedbackDTO.UserId <= 0 || userModel.GetDTO((int)feedbackDTO.UserId) == null)
                return BadRequest(new { message = "User not exist" });
            if (feedbackDTO.FeedbackContent == null || feedbackDTO.FeedbackContent == "")
                return BadRequest(new { message = "Content is empty" });
            var re = _fbModel.AddDTO(feedbackDTO);
            if (re == null) return Problem(statusCode: 500, detail: "Can't add data");
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(string id)
        {
            if (DataHelper.IsEmptyString(id)) return BadRequest(new { message = "ID is invalid" });
            var itemId = DataHelper.GetDetailId(id);
            if (itemId == 0) return BadRequest();
            if (!_fbModel.RemoveDTO(itemId)) return Problem(statusCode: 500, detail: "Can't remove data");
            return Ok();
        }

    }
}