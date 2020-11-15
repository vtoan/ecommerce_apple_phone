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
    public class FeeController : ControllerBase {

        private IFeeModel _feeModel;

        public FeeController (IFeeModel feeModel) {
            _feeModel = feeModel;
        }

        [HttpGet]
        public ActionResult<List<FeeDTO>> Get () {
            return _feeModel.GetListDTOs ();
        }

        [HttpGet ("{id}")]
        public ActionResult<FeeDTO> Get (int id) {
            if (id <= 0) return BadRequest ();
            var re = _feeModel.GetDTO (id);
            if (re == null) return NotFound ();
            return re;
        }

        [HttpPut ("{id}")]
        public IActionResult Update (int id, FeeDTO fee) {
            if (id <= 0 || id != fee.Id) return NotFound ();
            if (!_feeModel.UpdateDTO (id, fee)) return null;
            return Ok ();
        }

        [HttpPost]
        public IActionResult Add (FeeDTO fee) {
            if (fee.Id != 0) return BadRequest ();
            var re = _feeModel.AddDTO (fee);
            return Ok ();
        }

        [HttpDelete]
        public IActionResult Remove (int id) {
            if (id <= 0) return NotFound ();
            if (!_feeModel.RemoveDTO (id)) return null;
            return Ok ();
        }

    }
}