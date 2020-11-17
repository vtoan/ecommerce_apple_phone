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
    [Route ("[controller]")]
    public class ImportController : ControllerBase {

        private IImportProductModel _importModel;

        public ImportController () { }

        [HttpGet ("report")]
        public ActionResult<List<ImportProductDTO>> Get (string start, string end) {
            if (start == null || end == null) return BadRequest (new { message = "Date is requried" });
            DateTime startDate;
            if (!DateTime.TryParse (start, out startDate)) return BadRequest (new { message = "Start date is requried" });
            DateTime endDate;
            if (!DateTime.TryParse (end, out endDate)) return BadRequest (new { message = "End date is requried" });
            var re = _importModel.GetListDTOs (startDate, endDate);
            if (re == null || re.Count == 0) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPost]
        public IActionResult Add ([FromServices] IProductModel productModel, ImportProductDTO importProductDTO, List<ImportDetailDTO> importDetailDTOs) {
            if (importDetailDTOs.Count == 0) return BadRequest (new { message = "Add method is invalid, field 'ID' not require" });
            var re = _importModel.AddDTO (importProductDTO, importDetailDTOs);
            if (re == null) return Problem (statusCode: 500, detail: "Can't add data");
            var pro = productModel.UpdateForImport (importDetailDTOs);
            if (!pro) return Problem (statusCode: 500, detail: "Can't update data");
            return Ok ();
        }

        [HttpGet ("item/{id}")]
        public ActionResult<List<ImportDetailDTO>> Get (int id) {
            var re = _importModel.GetListDetailDTOs (id);
            if (re == null || re.Count == 0) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

    }
}