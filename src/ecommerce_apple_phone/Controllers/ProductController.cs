using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace ecommerce_apple_phone.Controllers {
    [ApiController]
    [Route ("[controller]")]
    public class ProductController : ControllerBase {

        public IProductModel _productModel;
        public ICacheHelper _cache;
        public IPromotionModel _promotionModel;
        public ProductController () { }
        #region Client
        [HttpGet]
        public ActionResult<List<ProductDTO>> GetListProduct () {
            var re = GetListProducts ();
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet ("[action]/{stringId}")]
        public ActionResult<List<ProductDTO>> FindByIds (string stringId) {
            if (stringId == null || stringId.Length <= 0) return BadRequest ();
            int[] arIds = stringId.Split (",")
                .Where (item => item != "")
                .Select (item => Int32
                    .Parse (item)).ToArray ();
            //
            var re = GetListProducts ();
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return _productModel.FindByIds (re, arIds);
        }

        [HttpGet ("[action]")]
        public ActionResult<List<ProductDTO>> FindBestSeller () {
            //Get in cache
            var re = _cache.Get<List<ProductDTO>> (CacheKey.SELLER_PRODUCT);
            if (re != null || re.Count > 0) return re;
            //Get in db
            var products = GetListProducts ();
            if (products == null) return Problem (statusCode: 500, detail: "Data not exist");
            re = _productModel.FindBestSeller (products);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            _cache.Set (re, CacheKey.SELLER_PRODUCT);
            return re;
        }

        [HttpGet ("[action]/{cateId}")]
        public ActionResult<List<ProductDTO>> FindByCate (int cataId) {
            if (cataId <= 0) return BadRequest ();
            //
            var re = GetListProducts ();
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return _productModel.FindByCate (re, cataId);
        }

        [HttpGet ("[action]")]
        public ActionResult<List<ProductDTO>> FindPromotion () { //
            var re = GetListProducts ();
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return _productModel.FindPromotion (re);
        }

        [HttpGet ("search")]
        public ActionResult<List<ProductDTO>> FindProduct (string query) {
            if (query == null || query == "") return BadRequest ();
            //
            var re = GetListProducts ();
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return _productModel.FindByString (re, query);
        }

        #endregion
        // =============== detail product ===============
        #region Product
        [HttpGet ("{id}")]
        public ActionResult<ProductDetailDTO> GetDetail (int id) {
            if (id <= 0) return BadRequest ();
            var re = _productModel.GetDetailDTO (id);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPost]
        public ActionResult AddProduct (int cateId, ProductDetailDTO productDetailDTO) {
            var modified = new PropModified<ProductDetailDTO> (productDetailDTO);
            if (!modified.isChanged || cateId <= 0) return BadRequest ();
            var re = _productModel.AddDTOs (cateId, productDetailDTO);
            if (re == null) return Problem (statusCode: 500, detail: "Can't add data");
            return Ok ();
        }

        [HttpPut ("{id}")]
        public ActionResult UpdateProduct (int id, ProductDetailDTO productDetailDTO) {
            var modified = new PropModified<ProductDetailDTO> (productDetailDTO);
            if (!modified.isChanged || id <= 0) return BadRequest ();
            var re = _productModel.UpdateDTO (id, productDetailDTO);
            if (!re) return Problem (statusCode: 500, detail: "Can't update data");
            return Ok ();
        }

        [HttpPut ("status/{id}")]
        public ActionResult UpdateStatus (int id, int status) {
            if (status <= 0 || id <= 0) return BadRequest ();
            var re = _productModel.UpdateStatusAttrDTO (id, status);
            if (!re) return Problem (statusCode: 500, detail: "Can't update status data");
            return Ok ();
        }

        [HttpDelete ("{id}")]
        public ActionResult RemoveProduct (int id) {
            if (id <= 0) return BadRequest ();
            var re = _productModel.RemoveDTO (id);
            if (!re) return Problem (statusCode: 500, detail: "Can't remove data");
            return Ok ();
        }
        #endregion
        // =============== Sub attibute product ===============
        #region Attribute Product
        [HttpGet ("attr/{id}")]
        public ActionResult<List<ProductAttrDTO>> GetListAttr (int id) {
            if (id <= 0) return BadRequest ();
            var re = _productModel.GetListAttrDTOs (id);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPost ("attr/{id}")]
        public ActionResult AddProductAttr (int id, ProductAttrDTO ProductAttrDTO) {
            var modified = new PropModified<ProductAttrDTO> (ProductAttrDTO);
            if (!modified.isChanged || id <= 0) return BadRequest ();
            var re = _productModel.AddAttrDTOs (id, ProductAttrDTO);
            if (re == null) return Problem (statusCode: 500, detail: "Can't add data");
            return Ok ();
        }

        [HttpPut ("attr/{id}")]
        public ActionResult UpdateProductAttr (int id, ProductAttrDTO productAttrDTO) {
            var modified = new PropModified<ProductAttrDTO> (productAttrDTO);
            if (!modified.isChanged || id <= 0) return BadRequest ();
            var re = _productModel.UpdateAttrDTO (id, productAttrDTO);
            if (!re) return Problem (statusCode: 500, detail: "Can't update data");
            return Ok ();
        }

        [HttpPut ("attr/status/{id}")]
        public ActionResult UpdateStatusAttr (int id, int status) {
            if (status <= 0 || id <= 0) return BadRequest ();
            var re = _productModel.UpdateStatusAttrDTO (id, status);
            if (!re) return Problem (statusCode: 500, detail: "Can't update status data");
            return Ok ();
        }

        [HttpDelete ("attr/{id}")]
        public ActionResult RemoveProductAttr (int id) {
            if (id <= 0) return BadRequest ();
            var re = _productModel.RemoveAttrDTO (id);
            if (!re) return Problem (statusCode: 500, detail: "Can't remove data");
            return Ok ();
        }
        #endregion
        // ===============  ===============
        [HttpPost ("image")]
        public ActionResult UpdateImageSEO ([FromServices] IWebHostEnvironment environment, IFormFile file) {
            if (file != null) {
                string urlRes = "/products";
                string filePath = Path.Combine (Path.Combine (environment.WebRootPath, urlRes), file.Name);
                using (var fileStream = new FileStream (filePath, FileMode.Create)) {
                    file.CopyTo (fileStream);
                }
                return Ok ();
            }
            return BadRequest ();
        }

        [NonAction]
        private List<ProductDTO> GetListProducts () {
            var re = _cache.Get<List<ProductDTO>> (CacheKey.PRODUCT);
            if (re == null || re.Count == 0) re = _productModel.GetListDTOs ();
            if (re != null && re.Count > 0) {
                List<PromProductDTO> proms = _promotionModel.GetListDTOsPromProduct ();
                if (proms != null || proms.Count > 0)
                    _productModel.AttachDiscount (ref re, proms);
                _cache.Set (re, CacheKey.PRODUCT);
            }
            return re;
        }

    }
}