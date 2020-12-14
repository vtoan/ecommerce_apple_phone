using System;
using System.Collections.Generic;
using System.Linq;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace ecommerce_apple_phone.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        public IProductModel _productModel;
        public ICacheHelper _cache;
        public IPromotionModel _promotionModel;
        public ProductController(IProductModel productModel, ICacheHelper cache, IPromotionModel promotionModel)
        {
            _productModel = productModel;
            _cache = cache;
            _promotionModel = promotionModel;
        }

        #region Client
        [HttpGet]
        public ActionResult<List<ProductDTO>> GetListProduct()
        {
            var re = GetListProducts();
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet("stringids/{id}")]
        public ActionResult<List<ProductDTO>> FindByIds(string id)
        {
            if (DataHelper.IsEmptyString(id)) return BadRequest();
            //
            var re = GetListProducts();
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            return _productModel.FindByIds(re, id.Split(","));
        }

        [HttpGet("bests")]
        public ActionResult<List<ProductDTO>> FindBestSeller()
        {
            //Get in cache
            var re = _cache.Get<List<ProductDTO>>(CacheKey.SELLER_PRODUCT);
            if (re != null || re?.Count > 0) return re;
            //Get in db
            var products = GetListProducts();
            if (products == null) return Problem(statusCode: 500, detail: "Data not exist");
            re = _productModel.FindBestSeller(products);
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            _cache.Set(re, CacheKey.SELLER_PRODUCT);
            return re;
        }

        [HttpGet("cate/{cateId}")]
        public ActionResult<List<ProductDTO>> FindByCate(int cateId)
        {
            if (cateId <= 0) return BadRequest();
            //
            var re = GetListProducts();
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            return _productModel.FindByCate(re, cateId);
        }

        [HttpGet("promotions")]
        public ActionResult<List<ProductDTO>> FindPromotion()
        {
            //Get in cache
            var re = _cache.Get<List<ProductDTO>>(CacheKey.DISCOUNT_PRODUCT);
            if (re != null || re?.Count > 0) return re;
            //Get in db
            var products = GetListProducts();
            if (products == null) return Problem(statusCode: 500, detail: "Data not exist");
            re = _productModel.FindPromotion(products);
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            _cache.Set(re, CacheKey.DISCOUNT_PRODUCT);
            return re;
        }

        [HttpGet("search/{query}")]
        public ActionResult<List<ProductDTO>> FindProduct(string query)
        {
            if (DataHelper.IsEmptyString(query)) return BadRequest();
            //
            var re = GetListProducts();
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            return _productModel.FindByString(re, query);
        }

        [HttpGet("{id}/attrs")]
        public ActionResult<List<ProductDTO>> GetListAttr(string id)
        {
            if (DataHelper.IsEmptyString(id)) return BadRequest();
            //
            var itemId = DataHelper.GetDetailId(id);
            if (itemId == 0) return BadRequest();
            var re = _productModel.GetListAttrDTOs(itemId);
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }


        #endregion
        // =============== detail product ===============
        #region Product
        [HttpGet("{id}")]
        public ActionResult<ProductDetailDTO> GetDetail(string id)
        {
            if (DataHelper.IsEmptyString(id)) return BadRequest();
            //
            var itemId = DataHelper.GetDetailId(id);
            if (itemId == 0) return BadRequest();
            var re = _productModel.GetDetailDTO(itemId);
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPost("{cateId}")]
        public ActionResult AddProductDetail(int cateId,[FromForm] ProductDetailDTO productDetailDTO)
        {
            if (!ModelState.IsValid) return BadRequest();
            //
            var modified = new PropModified<ProductDetailDTO>(productDetailDTO);
            if (!modified.isChanged || cateId <= 0) return BadRequest();
            var re = _productModel.AddDTOs(cateId, productDetailDTO);
            if (re == null) return Problem(statusCode: 500, detail: "Can't add data");
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult UpdateProductDetail(int id,[FromForm] ProductDetailDTO productDetailDTO)
        {
            if (!ModelState.IsValid) return BadRequest();
            //
            var modified = new PropModified<ProductDetailDTO>(productDetailDTO);
            if (!modified.isChanged || id <= 0) return BadRequest();
            var re = _productModel.UpdateDTO(id, productDetailDTO);
            if (!re) return Problem(statusCode: 500, detail: "Can't update data");
            return Ok();
        }

        [HttpPut("{id}/status")]
        public ActionResult UpdateStatusDetail(string id,[FromForm(Name="status")] bool? status)
        {
            if (DataHelper.IsEmptyString(id) || status == null) return BadRequest();
            //
            var itemId = DataHelper.GetDetailId(id);
            if (itemId == 0) return BadRequest();
            var re = _productModel.UpdateStatusDTO(itemId,(bool)status);
            if (!re) return Problem(statusCode: 500, detail: "Can't update status data");
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult RemoveProductDetail(string id)
        {
            if (DataHelper.IsEmptyString(id)) return BadRequest();
            //
            var itemId = DataHelper.GetDetailId(id);
            if (itemId == 0) return BadRequest();
            var re = _productModel.RemoveDTO(itemId);
            if (!re) return Problem(statusCode: 500, detail: "Can't remove data");
            return Ok();
        }
        #endregion
        // =============== Sub attibute product ===============
        #region Attribute Product
        [HttpGet("attrs/{id}")]
        public ActionResult<ProductDTO> GetAttr(string id)
        {
            if (DataHelper.IsEmptyString(id)) return BadRequest();
            //
            var itemId = DataHelper.GetAttrlId(id);
            if (itemId == 0) return BadRequest();
            var re = _productModel.GetAttrDTO(itemId);
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPost("attrs/{id}")]
        public ActionResult AddAttr(int productDetailId,[FromForm] ProductDTO ProductAttrDTO)
        {
            if (productDetailId <= 0 || !ModelState.IsValid) return BadRequest();
            //
            var modified = new PropModified<ProductDTO>(ProductAttrDTO);
            if (!modified.isChanged || productDetailId <= 0) return BadRequest();
            var re = _productModel.AddAttrDTOs(productDetailId, ProductAttrDTO);
            if (re == null) return Problem(statusCode: 500, detail: "Can't add data");
            return Ok();
        }

        [HttpPut("attrs/{id}")]
        public ActionResult UpdateAttr(string id,[FromForm] ProductDTO productAttrDTO)
        {
            if (DataHelper.IsEmptyString(id) || !ModelState.IsValid) return BadRequest();
            //
            var itemId = DataHelper.GetAttrlId(id);
            if (itemId == 0) return BadRequest();
            var modified = new PropModified<ProductDTO>(productAttrDTO);
            if (!modified.isChanged) return BadRequest();
            var re = _productModel.UpdateAttrDTO(itemId, productAttrDTO);
            if (!re) return Problem(statusCode: 500, detail: "Can't update data");
            return Ok();
        }

        [HttpPut("attrs/{id}/status")]
        public ActionResult UpdateStatusAttr(string id,[FromForm(Name="status")] bool? status)
        {
            if (DataHelper.IsEmptyString(id)||status==null) return BadRequest();
            //
            var itemId = DataHelper.GetDetailId(id);
            if (itemId == 0) return BadRequest();
            var re = _productModel.UpdateStatusAttrDTO(itemId,(bool) status);
            if (!re) return Problem(statusCode: 500, detail: "Can't update status data");
            return Ok();
        }

        [HttpDelete("attrs/{id}")]
        public ActionResult RemoveAttr(string id)
        {
            if (DataHelper.IsEmptyString(id)) return BadRequest();
            //
            var itemId = DataHelper.GetDetailId(id);
            if (itemId == 0) return BadRequest();
            var re = _productModel.RemoveAttrDTO(itemId);
            if (!re) return Problem(statusCode: 500, detail: "Can't remove data");
            return Ok();
        }
        #endregion
        // =============== Upload ===============
        [HttpPost("image")]
        public ActionResult UpdateImageSEO([FromServices] IUploadService upload, IFormFile file)
        {
            if (file == null) return BadRequest();
            if (!upload.UploadFile(file, "products")) return Problem(statusCode: 500, detail: "Can't upload file");
            return Ok();
        }

        [NonAction]
        private List<ProductDTO> GetListProducts()
        {
            var re = _cache.Get<List<ProductDTO>>(CacheKey.PRODUCT);
            if (re != null || re?.Count > 0) return re;
            re = _productModel.GetListDTOs();
            if (re != null && re?.Count > 0)
            {
                List<PromProductDTO> proms = _promotionModel.GetListDTOsPromProduct();
                if (proms != null || proms?.Count > 0)
                    _productModel.AttachDiscount(ref re, proms);
                _cache.Set(re, CacheKey.PRODUCT);
            }
            return re;
        }
    }
}