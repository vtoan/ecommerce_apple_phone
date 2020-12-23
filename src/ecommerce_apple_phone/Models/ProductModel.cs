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
        public ProductDTO AddAttrDTOs(int productDetailId, ProductDTO productDTO)
        {
            Product prod = ObjectMapperTo<ProductDTO, Product>(productDTO);
            if (prod == null) return null;
            prod.ProductDetailId = productDetailId;
            using (ProductDAO db = new ProductDAO(_context))
                return ObjectMapperTo<Product, ProductDTO>(db.Add(prod));
        }

        public List<ProductDTO> GetListAttrDTOs(int productId) //Customer/Admin
        {
            if (productId <= 0) return null;
            using (ProductDAO db = new ProductDAO(_context))
            {
                return LsObjectMapperTo<Product, ProductDTO>(db.GetList(productId));
            }
        }

        public List<ProductDTO> GetListDTOs() //For customer/admin
        {
            using (ProductDAO db = new ProductDAO(_context))
            {
                return LsObjectMapperTo<Product, ProductDTO>(db.GetListUnique());

            }
        }

        public ProductDTO GetAttrDTO(int attrId) //For customer/admin
        {
            using (ProductDAO db = new ProductDAO(_context))
            {
                return ObjectMapperTo<Product, ProductDTO>(db.Get(attrId));
            }
        }

        public bool UpdateStatusAttrDTO(int attrId, bool status)
        {
            if (attrId <= 0) return false;
            PropModified<Product> modified = new PropModified<Product>(new { isShow = status });
            using (ProductDAO db = new ProductDAO(_context))
                return db.Update(attrId, modified);
        }

        public bool UpdateAttrDTO(int attrId, ProductDTO productDTO)
        {
            string[] ignore = { "productId", "isShow" };
            if (attrId <= 0) return false;
            PropModified<Product> modified = new PropModified<Product>(productDTO, ignore);
            using (ProductDAO db = new ProductDAO(_context))
                return db.Update(attrId, modified);
        }

        public bool RemoveAttrDTO(int attrId)
        {
            if (attrId <= 0) return false;
            PropModified<Product> modified = new PropModified<Product>(new { isDel = true });
            using (ProductDAO db = new ProductDAO(_context))
                return db.Update(attrId, modified);
        }

        public bool UpdateForOrder(List<OrderDetailDTO> orderDetailDTOs)
        {
            using (ProductDAO db = new ProductDAO(_context))
            {
                foreach (var item in orderDetailDTOs)
                {
                    int itemId = DataHelper.GetAttrlId(item.ProductId);
                    db.SubTractQuanity(itemId, (int)item.Quantity);
                }
            }
            return true;
        }

        public bool UpdateForImport(List<ImportDetailDTO> importDetailDTOs)
        {
            using (ProductDAO db = new ProductDAO(_context))
            {
                foreach (var item in importDetailDTOs)
                {
                    PropModified<Product> modified = new PropModified<Product>(
                        new
                        {
                            Quantity = item.Quantity,
                            Price = item.Price
                        });
                    db.Update(item.ProductId, modified);
                }
            }
            return true;
        }


        //Product Detail
        public ProductDetailDTO AddDTOs(int cateId, ProductDetailDTO productDetailDTO)
        {
            if (cateId <= 0) return null;
            var prod = ObjectMapperTo<ProductDetailDTO, ProductDetail>(productDetailDTO);
            prod.CategoryId = cateId;
            using (EntityDAO<ProductDetail> db = new EntityDAO<ProductDetail>(_context))
                return ObjectMapperTo<ProductDetail, ProductDetailDTO>(db.Add(prod));
        }

        public ProductDetailDTO GetDetailDTO(int id)
        {
            if (id <= 0) return null;
            using (EntityDAO<ProductDetail> db = new EntityDAO<ProductDetail>(_context))
                return ObjectMapperTo<ProductDetail, ProductDetailDTO>(db.Get(id));
        }

        public bool UpdateDTO(int productId, ProductDetailDTO productDetailDTO)
        {
            if (productId <= 0) return false;
            var prod = ObjectMapperTo<ProductDetailDTO, ProductDetail>(productDetailDTO);
            PropModified<ProductDetail> modified = new PropModified<ProductDetail>(prod);
            using (EntityDAO<ProductDetail> db = new EntityDAO<ProductDetail>(_context))
                return db.Update(productId, modified);
        }

        public bool UpdateStatusDTO(int productId, bool status)
        {
            if (productId <= 0) return false;
            PropModified<ProductDetail> modified = new PropModified<ProductDetail>(new { isShow = status });
            using (EntityDAO<ProductDetail> db = new EntityDAO<ProductDetail>(_context))
                return db.Update(productId, modified);
        }

        public bool RemoveDTO(int id)
        {
            if (id <= 0) return false;
            PropModified<ProductDetail> modified = new PropModified<ProductDetail>(new { isDel = true });
            using (EntityDAO<ProductDetail> db = new EntityDAO<ProductDetail>(_context))
                return db.Update(id, modified);
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
                if (prom.CategoryId != null && prom.CategoryId!=0)
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
                    int prodId = Int32.Parse(item.Id.Split("-")[0]);
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
                int itemId = Int32.Parse(item.Split("-")[0]);
                var product = GetListAttrDTOs(itemId);
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