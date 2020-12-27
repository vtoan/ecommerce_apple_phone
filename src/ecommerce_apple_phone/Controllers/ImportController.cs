using System;
using System.Collections.Generic;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace ecommerce_apple_phone.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImportController : ControllerBase
    {

        private IImportProductModel _importModel;

        public ImportController(IImportProductModel importProductModel)
        {
            _importModel = importProductModel;
        }

        [HttpGet("{id}")]
        public ActionResult<List<ImportDetailDTO>> Get(int id)
        {
            var re = _importModel.GetListDetailDTOs(id);
            if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet("report/{start}/{end}")]
        public ActionResult<List<ImportProductDTO>> Get(string start, string end)
        {
            if (DataHelper.IsEmptyString(start) || DataHelper.IsEmptyString(end)) return BadRequest(new { message = "Date is requried" });
            DateTime startDate;
            if (!DateTime.TryParse(start, out startDate)) return BadRequest(new { message = "Start date is requried" });
            DateTime endDate;
            if (!DateTime.TryParse(end, out endDate)) return BadRequest(new { message = "End date is requried" });
            var re = _importModel.GetListDTOs(startDate, endDate);
            if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPost]
        public ActionResult<ImportProductDTO> Add([FromServices] IProductModel productModel, ImportProductDTO importProductDTO)
        {
            if (importProductDTO.ImportItems == null || importProductDTO.ImportItems == "") return BadRequest();
            //Parse list order Item
            List<ImportDetailDTO> importDetailDTOs = DataHelper.ParserJsonTo<List<ImportDetailDTO>>(importProductDTO.ImportItems);
            //
            if (importDetailDTOs.Count == 0) return BadRequest(new { message = "Add method is invalid, field 'ID' not require" });
            var re = _importModel.AddDTO(importProductDTO, importDetailDTOs);
            if (re == null) return Problem(statusCode: 500, detail: "Can't add data");
            return re;
        }


    }
}