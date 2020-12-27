using System;
using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using System.Linq;
using ecommerce_apple_phone.DAO;

namespace ecommerce_apple_phone.Models
{
    public class ProductModel : DataModel, IProductModel
    {
        private PhoneContext _context;

        public ProductModel(PhoneContext context, IMapper mapper) : base(mapper)
        {
            _context = context;
        }

        // ============= Modified Data =============
        //Product Attribute
        public ProductDTO AddAttrDTOs(string productId, ProductDTO productDTO)
        {
            Product prod = ObjectMapperTo<ProductDTO, Product>(productDTO);
            if (prod == null) return null;
            var detailId =DataHelper.GetDetailId(productId);
            prod.ProductDetailId = detailId;
            prod.Id=detailId +"A"+DateTime.Now.ToOADate();
            using (ProductDAO db = new ProductDAO(_context))
                return ObjectMapperTo<Product, ProductDTO>(db.Add(prod));
        }

        public List<ProductDTO> GetListAttrDTOs(string productId, bool isAdmin = false) //Customer/Admin
        {
            int detailId = DataHelper.GetDetailId(productId);
            using (ProductDAO db = new ProductDAO(_context))
                return LsObjectMapperTo<Product, ProductDTO>(db.GetListAttributes(detailId, isAdmin));
        }

        public List<ProductDTO> GetListDTOs(bool isAdmin = false) //For customer/admin
        {
            using (ProductDAO db = new ProductDAO(_context))
                return LsObjectMapperTo<Product, ProductDTO>(db.GetList(isAdmin));
        }

        public ProductDTO GetAttrDTO(string productId, bool isAdmin = false) //For customer/admin
        {
            using (ProductDAO db = new ProductDAO(_context))
                return ObjectMapperTo<Product, ProductDTO>(db.Get(productId, isAdmin));
        }

        public bool UpdateStatusAttrDTO(string productId, bool status)
        {
            if (DataHelper.IsEmptyString(productId)) return false;
            PropModified<Product> modified = new PropModified<Product>(new { isShow = status });
            using (ProductDAO db = new ProductDAO(_context))
                return db.Update(productId, modified);
        }

        public bool UpdateAttrDTO(string productId, ProductDTO productDTO)
        {
            if (DataHelper.IsEmptyString(productId)) return false;
            string[] ignore = { "productId", "isShow" };
            PropModified<Product> modified = new PropModified<Product>(productDTO, ignore);
            using (ProductDAO db = new ProductDAO(_context))
                return db.Update(productId, modified);
        }

        public bool RemoveAttrDTO(string productId)
        {
            if (DataHelper.IsEmptyString(productId)) return false;
            PropModified<Product> modified = new PropModified<Product>(new { isDel = true });
            using (ProductDAO db = new ProductDAO(_context))
                return db.Update(productId, modified);
        }

        // public bool UpdateForOrder(List<OrderDetailDTO> orderDetailDTOs)
        // {
        //     using (ProductDAO db = new ProductDAO(_context))
        //     {
        //         foreach (var item in orderDetailDTOs)
        //         {
        //             int itemId = DataHelper.GetAttrlId(item.ProductId);
        //             db.SubTractQuanity(itemId, (int)item.Quantity);
        //         }
        //     }
        //     return true;
        // }


        //Product Detail
        public ProductDetailDTO AddDTOs(int cateId, ProductDetailDTO productDetailDTO)
        {
            if (cateId <= 0) return null;
            var prod = ObjectMapperTo<ProductDetailDTO, ProductDetail>(productDetailDTO);
            prod.CategoryId = cateId;
            using (EntityDAO<ProductDetail> db = new EntityDAO<ProductDetail>(_context))
                return ObjectMapperTo<ProductDetail, ProductDetailDTO>(db.Add(prod));
        }

        public ProductDetailDTO GetDetailDTO(string productId)
        {
            if (DataHelper.IsEmptyString(productId)) return null;
            var detailId = DataHelper.GetDetailId(productId);
            using (EntityDAO<ProductDetail> db = new EntityDAO<ProductDetail>(_context))
                return ObjectMapperTo<ProductDetail, ProductDetailDTO>(db.Get(detailId));
        }

        public bool UpdateDTO(string productId, ProductDetailDTO productDetailDTO)
        {
            if (DataHelper.IsEmptyString(productId)) return false;
            var detailId = DataHelper.GetDetailId(productId);
            var prod = ObjectMapperTo<ProductDetailDTO, ProductDetail>(productDetailDTO);
            PropModified<ProductDetail> modified = new PropModified<ProductDetail>(prod);
            using (EntityDAO<ProductDetail> db = new EntityDAO<ProductDetail>(_context))
                return db.Update(detailId, modified);
        }

        public bool UpdateStatusDTO(string productId, bool status)
        {
            if (DataHelper.IsEmptyString(productId)) return false;
            var detailId = DataHelper.GetDetailId(productId);
            PropModified<ProductDetail> modified = new PropModified<ProductDetail>(new { isShow = status });
            using (EntityDAO<ProductDetail> db = new EntityDAO<ProductDetail>(_context))
                return db.Update(detailId, modified);
        }

        public bool RemoveDTO(string productId)
        {
            if (DataHelper.IsEmptyString(productId)) return false;
            var detailId = DataHelper.GetDetailId(productId);
            PropModified<ProductDetail> modified = new PropModified<ProductDetail>(new { isDel = true });
            using (EntityDAO<ProductDetail> db = new EntityDAO<ProductDetail>(_context))
                return db.Update(detailId, modified);
        }

        // ============== Useful ===============

        public void AttachDiscount(ref List<ProductDTO> productDTOs, List<PromProductDTO> promProductDTOs)
        {
            if (promProductDTOs.Count == 0) return;
            Dictionary<int, double> LsProd = new Dictionary<int, double>();
            Dictionary<int, double> LsCate = new Dictionary<int, double>();
            foreach (var prom in promProductDTOs)
            {
                if (prom.Discount == null) continue;
                double discount = (double)prom.Discount;
                if (prom.CategoryId != null && prom.CategoryId != 0)
                {
                    byte cateId = (byte)prom.CategoryId;
                    if (LsCate.ContainsKey(cateId)) LsCate[cateId] = discount;
                    else LsCate.Add(cateId, discount);
                }
                if (prom.ProductInProms != null && prom.ProductInProms != "")
                {
                    int[] arIds = DataHelper.ParserJsonTo<int[]>(prom.ProductInProms);
                    foreach (var id in arIds)
                    {
                        if (LsProd.ContainsKey(id)) LsProd[id] = discount;
                        else LsProd.Add(id, discount);
                    }
                }
            }
            //Add to product;
            productDTOs.ForEach(item =>
            {
                if (LsCate.Count > 0)
                {
                    int cateID = (int)item.CategoryId;
                    if (LsCate.ContainsKey(cateID)) item.Discount = LsCate[cateID];
                }
                if (LsProd.Count > 0)
                {
                    int prodId = DataHelper.GetDetailId(item.Id);
                    if (LsProd.ContainsKey(prodId)) item.Discount = LsProd[prodId];
                }
            });
        }

        public List<ProductDTO> FindBestSeller(List<ProductDTO> productDTOs)
        {
            var re = productDTOs.OrderBy(item => item.SaleCount).Take(4).ToList();
            return re;
        }

        public List<ProductDTO> FindByCate(List<ProductDTO> productDTOs, int cateId)
        {
            return productDTOs.Where(item => item.CategoryId == cateId).ToList();

        }

        public List<ProductDTO> FindByIds(List<ProductDTO> productDTOs, string[] arIds)
        {
            List<ProductDTO> re = new List<ProductDTO>();
            foreach (var item in arIds)
            {
                // int itemId = Int32.Parse(item.Split("-")[0]);
                var product = GetListAttrDTOs(item);
                var productAttr = product.Where(p => p.Id == item).FirstOrDefault();
                if (productAttr != null) re.Add(productAttr);
            }
            return re;
        }

        public List<ProductDTO> FindByString(List<ProductDTO> productDTOs, string query)
        {
            return productDTOs.Where(item => item.Name.ToLower().Contains(query)).ToList();
        }

        public List<ProductDTO> FindPromotion(List<ProductDTO> productDTOs)
        {
            return productDTOs.Where(item => item.Discount != 0).ToList();
        }
    }
}