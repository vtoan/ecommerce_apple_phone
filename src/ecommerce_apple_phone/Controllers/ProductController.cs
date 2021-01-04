using System;
using System.Collections.Generic;
using System.Linq;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
            List<ProductDTO> re = new List<ProductDTO>();
            
             re = GetListProducts();
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet("admin")]
        [Authorize]
        public ActionResult<List<ProductDTO>> GetListProductAdmin()
        {
            List<ProductDTO> re = new List<ProductDTO>();
            re = GetListProducts(true);
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

        [HttpGet("promotions/{items}")]
        [HttpGet("promotions")]
        public ActionResult<List<ProductDTO>> FindPromotion(int items)
        {
            //Get in cache
            var re = _cache.Get<List<ProductDTO>>(CacheKey.DISCOUNT_PRODUCT);
            if (re == null || re?.Count == 0)
            {
                //Get in db
                var products = GetListProducts();
                if (products == null) return Problem(statusCode: 500, detail: "Data not exist");
                re = _productModel.FindPromotion(products);
                if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
                _cache.Set(re, CacheKey.DISCOUNT_PRODUCT);
            }
            return items <= 0 ? re : re.Take(items).ToList();
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
            var re = _productModel.GetListAttrDTOs(id);
            var product = GetListProducts().Find(item => item.Id == id);
            if (product != null && product.Discount != 0)
            {
                double disc = product.Discount;
                re.ForEach(item => item.Discount = disc);

            }
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
            var re = _productModel.GetDetailDTO(id);
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPost("{cateId}")]
        public ActionResult AddProductDetail(int cateId, ProductDetailDTO productDetailDTO)
        {
            if (!ModelState.IsValid) return BadRequest();
            //
            var modified = new PropModified<ProductDetailDTO>(productDetailDTO);
            if (!modified.isChanged || cateId <= 0) return BadRequest();
            var re = _productModel.AddDTOs(cateId, productDetailDTO);
            if (re == null) return Problem(statusCode: 500, detail: "Can't add data");
            _cache.DataUpdated(CacheKey.PRODUCT);
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult UpdateProductDetail(string id, ProductDetailDTO productDetailDTO)
        {
            if (!ModelState.IsValid || DataHelper.IsEmptyString(id)) return BadRequest();
            //
            var re = _productModel.UpdateDTO(id, productDetailDTO);
            if (!re) return Problem(statusCode: 500, detail: "Can't update data");
            _cache.DataUpdated(CacheKey.PRODUCT);
            return Ok();
        }

        [HttpPut("{id}/{status}")]
        public ActionResult UpdateStatusDetail(string id, bool? status)
        {
            if (DataHelper.IsEmptyString(id) || status == null) return BadRequest();
            //
            var re = _productModel.UpdateStatusDTO(id, (bool)status);
            if (!re) return Problem(statusCode: 500, detail: "Can't update status data");
            _cache.DataUpdated(CacheKey.PRODUCT);
            _cache.DataUpdated(CacheKey.DISCOUNT_PRODUCT);
            _cache.DataUpdated(CacheKey.SELLER_PRODUCT);
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult RemoveProductDetail(string id)
        {
            if (DataHelper.IsEmptyString(id)) return BadRequest();
            //
            var re = _productModel.RemoveDTO(id);
            if (!re) return Problem(statusCode: 500, detail: "Can't remove data");
            _cache.DataUpdated(CacheKey.PRODUCT);
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
            var re = _productModel.GetAttrDTO(id);
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            var productDetail = GetListProducts().Find(item => item.Id == id);
            if (productDetail != null)
                re.Discount = productDetail.Discount;
            return re;
        }

        [HttpPost("attrs/{detailId}")]
        public ActionResult<ProductDTO> AddAttr(string detailId, ProductDTO ProductAttrDTO)
        {
            if (DataHelper.IsEmptyString(detailId) || !ModelState.IsValid) return BadRequest();
            //
            var re = _productModel.AddAttrDTOs(detailId, ProductAttrDTO);
            if (re == null) return Problem(statusCode: 500, detail: "Can't add data");
            _cache.DataUpdated(CacheKey.PRODUCT);
            return re;
        }

        [HttpPut("attrs/{id}")]
        public ActionResult UpdateAttr(string id, ProductDTO productAttrDTO)
        {
            if (DataHelper.IsEmptyString(id) || !ModelState.IsValid) return BadRequest();
            //
            var re = _productModel.UpdateAttrDTO(id, productAttrDTO);
            if (!re) return Problem(statusCode: 500, detail: "Can't update data");
            _cache.DataUpdated(CacheKey.PRODUCT);
            return Ok();
        }

        [HttpPut("attrs/{id}/{status}")]
        public ActionResult UpdateStatusAttr(string id, bool? status)
        {
            if (DataHelper.IsEmptyString(id) || status == null) return BadRequest();
            //
            var re = _productModel.UpdateStatusAttrDTO(id, (bool)status);
            if (!re) return Problem(statusCode: 500, detail: "Can't update status data");
            _cache.DataUpdated(CacheKey.PRODUCT);
            return Ok();
        }

        [HttpDelete("attrs/{id}")]
        public ActionResult RemoveAttr(string id)
        {
            if (DataHelper.IsEmptyString(id)) return BadRequest();
            //
            var re = _productModel.RemoveAttrDTO(id);
            if (!re) return Problem(statusCode: 500, detail: "Can't remove data");
            _cache.DataUpdated(CacheKey.PRODUCT);
            return Ok();
        }
        #endregion
        // =============== Upload ===============
        [HttpPost("image")]
        public ActionResult UpdateImageSEO([FromServices] IUploadService upload, IFormFile file)
        {
            if (file == null) return BadRequest();
            if (!upload.UploadFile(file, "product")) return Problem(statusCode: 500, detail: "Can't upload file");
            _cache.DataUpdated(CacheKey.PRODUCT);
            return Ok();
        }

        [NonAction]
        private List<ProductDTO> GetListProducts(bool isAdmin = false)
        {
            var re = _cache.Get<List<ProductDTO>>(CacheKey.PRODUCT);
            if (re == null || re?.Count == 0 || isAdmin == true)
            {
                re = _productModel.GetListDTOs(isAdmin);
                if (re != null && re?.Count > 0)
                {
                    List<PromProductDTO> proms = _promotionModel.GetListDTOsPromProduct();
                    if (proms != null || proms?.Count > 0)
                        _productModel.AttachDiscount(ref re, proms);
                    _cache.Set(re, CacheKey.PRODUCT);
                }
            }
            return re;
            // return isAdmin ? re : re.Where(item => item.isShow == true).ToList();
        }
    }
}