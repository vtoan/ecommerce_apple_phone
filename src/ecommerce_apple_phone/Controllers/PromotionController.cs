using System.Collections.Generic;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace ecommerce_apple_phone.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PromotionController : ControllerBase
    {

        private IPromotionModel _promModel;

        public PromotionController(IPromotionModel promotionModel)
        {
            _promModel = promotionModel;
        }

        [HttpGet]
        public ActionResult<List<PromotionDTO>> Get()
        {
            var re = _promModel.GetListDTOs();
            if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet("bill")]
        public ActionResult<List<PromBillDTO>> GetPromBill()
        {
            var re = _promModel.GetListDTOsPromBill();
            if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet("point")]
        public ActionResult<List<PromPointDTO>> GetPromPoint()
        {
            var re = _promModel.GetListDTOsPromPoint();
            if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet("product")]
        public ActionResult<List<PromProductDTO>> GetPromProduct()
        {
            var re = _promModel.GetListDTOsPromProduct();
            if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet("{id}")]
        public ActionResult<PromotionDTO> Get(int id)
        {
            if (id <= 0) return BadRequest(new { message = "ID is invalid" });
            var re = _promModel.GetDTO(id);
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            var detail = _promModel.GetDetail(re.Id, (int)re.Type);
            if(detail == null) return Problem(statusCode: 500, detail: "Data not exist");
            re.ItemDetail = DataHelper.ParserObjToJson(detail);
            return re;
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PromotionDTO promotionDTO)
        {
            if (id <= 0 ||!ModelState.IsValid) return BadRequest(new { message = "ID is invalid" });
            if (!_promModel.UpdateDTO(id, promotionDTO, promotionDTO.ItemDetail)) return Problem(statusCode: 500, detail: "Can't update data");
            return Ok();
        }

        [HttpPost("{type}")]
        public ActionResult<PromotionDTO> Add(int type, PromotionDTO promotionDTO)
        {
            if (!ModelState.IsValid || type <= 0) return BadRequest();
            object detail = null;
            promotionDTO.Type = (byte?)type;
            switch (type)
            {
                case 1:
                    detail = DataHelper.ParserJsonTo<PromProductDTO>(promotionDTO.ItemDetail);
                    break;
                case 2:
                    detail = DataHelper.ParserJsonTo<PromBillDTO>(promotionDTO.ItemDetail);
                    break;
                default:
                    return BadRequest();
            }
            if(detail==null) return BadRequest();
            var re = _promModel.AddDTO(promotionDTO, detail);
            if (re == null) return Problem(statusCode: 500, detail: "Can't add data");
            return re;
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            if (id <= 0) return NotFound();
            if (!_promModel.RemoveDTO(id)) return Problem(statusCode: 500, detail: "Can't remove data");
            return Ok();
        }

        [HttpPut("change/{promOld}/{promNew}")]
        public IActionResult ChangeProm(int promOld, int promNew, int productId)
        {
            if (productId <= 0 || promOld <= 0 || promNew <= 0 || promOld == promNew) return BadRequest(new { message = "ID is invalid" });
            if (!_promModel.ChangePromotion(promOld, promNew, productId)) return Problem(statusCode: 500, detail: "Can't update data");
            return Ok();
        }

    }
}