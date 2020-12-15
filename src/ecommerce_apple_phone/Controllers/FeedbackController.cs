using System;
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

        [HttpPost()]
        public ActionResult<FeedbackDTO> Add(
            [FromServices] ICacheHelper cache, [FromServices] IProductModel productModel,
        FeedbackDTO feedbackDTO)
        {
            if (!ModelState.IsValid) return BadRequest();
            var re = _fbModel.AddDTO(feedbackDTO);
            if (re == null) return Problem(statusCode: 500, detail: "Can't add data");
            return re;
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