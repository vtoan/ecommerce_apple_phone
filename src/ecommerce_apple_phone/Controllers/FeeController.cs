using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace ecommerce_apple_phone.Controllers {
    [ApiController]
    [Route ("[controller]")]
    public class FeeController : ControllerBase {

        private IFeeModel _feeModel;

        private ICacheHelper _cache;

        public FeeController (IFeeModel feeModel, ICacheHelper cache) {
            _feeModel = feeModel;
            _cache = cache;
        }

        [HttpGet]
        public ActionResult<List<FeeDTO>> Get () {
            //Get in cache
            var re = _cache.Get<List<FeeDTO>> (CacheKey.FEE);
            if (re == null || re.Count == 0) re = _feeModel.GetListDTOs ();
            //Get in db
            if (re == null || re.Count == 0) return Problem (statusCode: 500, detail: "Data not exist");
            _cache.Set (re, CacheKey.FEE);
            return re;
        }
        
        // =============  No use ============= 
        [HttpGet ("{id}")]
        public ActionResult<FeeDTO> Get (int id) {
            if (id <= 0) return BadRequest (new { message = "ID is invalid" });
            var re = _feeModel.GetDTO (id);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }
        // ========================== 

        [HttpPut ("{id}")]
        public ActionResult Update (int id,[FromBody] FeeDTO fee) {
            
            if (id <= 0 || !ModelState.IsValid || id != fee.Id) return BadRequest (new { message = "ID is invalid" });
            if (!_feeModel.UpdateDTO (id, fee)) return Problem (statusCode: 500, detail: "Can't update data");
            _cache.DataUpdated(CacheKey.FEE);
            return Ok ();
        }

        [HttpPost]
        public ActionResult<FeeDTO> Add ([FromBody] FeeDTO fee) {
            if (fee.Id != 0 || !ModelState.IsValid) return BadRequest (new { message = "Add method is invalid, field 'ID' not require" });
            var re = _feeModel.AddDTO (fee);
            if (re == null) return Problem (statusCode: 500, detail: "Can't add data");
            _cache.DataUpdated(CacheKey.FEE);
            return re;
        }

        [HttpDelete ("{id}")]
        public IActionResult Remove (int id) {
            if (id <= 0) return NotFound ();
            if (!_feeModel.RemoveDTO (id)) return Problem (statusCode: 500, detail: "Can't remove data");
            _cache.DataUpdated(CacheKey.FEE);
            return Ok ();
        }

    }
}