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
    public class MethodPayController : ControllerBase {

        private IMethodPayModel _methodPayModel;

        public MethodPayController (IMethodPayModel methodPayModel) {
            _methodPayModel = methodPayModel;
        }

        [HttpGet]
        public ActionResult<List<MethodPayDTO>> Get () {
            var re = _methodPayModel.GetListDTOs ();
            if (re == null || re.Count == 0) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet ("{id}")]
        public ActionResult<MethodPayDTO> Get (int id) {
            if (id <= 0) return BadRequest (new { message = "ID is invalid" });
            var re = _methodPayModel.GetDTO (id);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPut ("{id}")]
        public IActionResult Update (int id, MethodPayDTO methodPayDTO) {
            if (id <= 0 || id != methodPayDTO.Id) return BadRequest (new { message = "ID is invalid" });
            if (!_methodPayModel.UpdateDTO (id, methodPayDTO)) return Problem (statusCode: 500, detail: "Can't update data");
            return Ok ();
        }

        [HttpPost]
        public IActionResult Add (MethodPayDTO methodPayDTO) {
            if (methodPayDTO.Id != 0) return BadRequest (new { message = "Add method is invalid, field 'ID' not require" });
            var re = _methodPayModel.AddDTO (methodPayDTO);
            if (re == null) return Problem (statusCode: 500, detail: "Can't add data");
            return Ok ();
        }

        [HttpDelete ("{id}")]
        public IActionResult Remove (int id) {
            if (id <= 0) return NotFound ();
            if (!_methodPayModel.RemoveDTO (id)) return Problem (statusCode: 500, detail: "Can't remove data");
            return Ok ();
        }

    }
}