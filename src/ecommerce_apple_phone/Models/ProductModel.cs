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
    public class ProductModel : BaseModel<ProductDTO, ProductDetail>, IProductModel
    {
        public ProductModel(PhoneContext context, IMapper mapper) : base(context, mapper)
        {
        }

        // ============= Modified Data =============
        //Product Attribute
        public ProductDTO AddAttrDTOs(int attrId, ProductDTO productDTO)
        {
            return base.AddDTO(productDTO);
        }
 
        public List<ProductDTO> GetListAttrDTOs(int productId, bool admin =false) //For customer/admin
        {
            if (productId <= 0) return null;
            using (ProductDAO db = new ProductDAO (_context))
            {
                if(!admin)
                    return LsObjectMapperTo<ProductDetail, ProductDTO>(db.GetListUser(productId));
                else
                    return LsObjectMapperTo<ProductDetail, ProductDTO>(db.GetListAdmin(productId));    
            }
        }
        
        public List<ProductDTO> GetListDTOs( bool admin =false) //For customer/admin
        {
            using(ProductDAO db = new ProductDAO(_context)){

                if(!admin)
                    return LsObjectMapperTo<ProductDetail, ProductDTO>(db.GetListUser());
                else
                    return LsObjectMapperTo<ProductDetail, ProductDTO>(db.GetListAdmin());
            }                
        }

        public ProductDTO GetAttrDTO(int attrId)
        {
            return base.GetDTO(attrId);
        }

        public bool UpdateStatusAttrDTO(int attrId, bool status)
        {
            if(attrId <=0 ) return false;
            PropModified<ProductDetail> modified = new PropModified<ProductDetail>(new { isShow = status });
            using (ProductDAO db = new ProductDAO(_context))
                return db.Update(attrId, modified);
        }

        public bool UpdateAttrDTO(int attrId, ProductDTO productDTO)
        {
            string[] ignore = { "productId" };
            return base.UpdateDTO(attrId, productDTO, ignore);
        }

        public bool RemoveAttrDTO(int attrId)
        {
             if(attrId <=0 ) return false;
            PropModified<ProductDetail> modified = new PropModified<ProductDetail>(new { isDel = true });
            using (ProductDAO db = new ProductDAO(_context))
                return db.Update(attrId, modified);
        }

        public bool UpdateForOrder(List<OrderDetailDTO> orderDetailDTOs)
        {
            using (ProductDAO db = new ProductDAO(_context))
            {
                foreach (var item in orderDetailDTOs)
                {
                    PropModified<ProductDetail> modified = new PropModified<ProductDetail>(new { Quantity = item.Quantity });
                    db.Update(item.ProductId, modified);
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
                    PropModified<ProductDetail> modified = new PropModified<ProductDetail>(
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


        //Product 
        public ProductDetailDTO AddDTOs(int cateId, ProductDetailDTO productDetailDTO)
        {
            if(cateId <=0) return null;
            var prod = ObjectMapperTo<ProductDetailDTO, Product>(productDetailDTO);
            prod.CategoryId =cateId;
            using(EntityDAO<Product> db = new EntityDAO<Product>(_context))
                return ObjectMapperTo<Product, ProductDetailDTO>(db.Add(prod));
        }

        public ProductDetailDTO GetDetailDTO(int id)
        {
            if(id<=0) return null;
            using(EntityDAO<Product> db = new EntityDAO<Product>(_context))
                return ObjectMapperTo<Product, ProductDetailDTO>(db.Get(id));
        }

        public bool UpdateDTO(int productId, ProductDetailDTO productDetailDTO)
        {
            if(productId <=0) return false;
            var prod = ObjectMapperTo<ProductDetailDTO, Product>(productDetailDTO);
            PropModified<Product> modified = new PropModified<Product>(prod);
            using(EntityDAO<Product> db = new EntityDAO<Product>(_context))
                return db.Update(productId, modified);
        }

        public bool UpdateStatusDTO(int productId, bool status)
        {
            if(productId <=0) return false;
            PropModified<Product> modified = new PropModified<Product>(new { isShow= status });
            using(EntityDAO<Product> db = new EntityDAO<Product>(_context))
                return db.Update(productId, modified);
        }

        public new bool RemoveDTO(int id)
        {
            if(id <=0) return false;
            PropModified<Product> modified = new PropModified<Product>(new {isDel= true});
            using(EntityDAO<Product> db = new EntityDAO<Product>(_context))
                return db.Update(id, modified);
        }

        // ============== Useful ===============

        public void AttachDiscount(ref List<ProductDTO> productDTOs, List<PromProductDTO> promProductDTOs)
        {
            Dictionary<int, double> LsProd = new Dictionary<int, double>();
            Dictionary<int, double> LsCate = new Dictionary<int, double>();
            foreach (var prom in promProductDTOs)
            {
                if (prom.Discount == null) continue;
                double discount = (double)prom.Discount;
                if (prom.CategoryId != null)
                {
                    byte cateId = (byte)prom.CategoryId;
                    if (LsCate.ContainsKey(cateId)) LsCate[cateId] = discount;
                    else LsCate.Add(cateId, discount);
                }
                if (prom.ProductInProms != null || prom.ProductInProms != "")
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
                    int prodId = Int32.Parse(item.Id.Split("-")[1]);
                    if (LsProd.ContainsKey(prodId)) item.Discount = LsProd[prodId];
                }
            });
        }

        public List<ProductDTO> FindBestSeller(List<ProductDTO> productDTOs)
        {
            return productDTOs.OrderBy(item => item.SaleCount).Take(4).ToList();
        }

        public List<ProductDTO> FindByCate(List<ProductDTO> productDTOs, int cateId)
        {
            return productDTOs.Where(item => item.CategoryId == cateId).ToList();

        }

        public List<ProductDTO> FindByIds(List<ProductDTO> productDTOs, string[] arIds)
        {
            return productDTOs.Where(item => arIds.Contains(item.Id)).ToList();
        }

        public List<ProductDTO> FindByString(List<ProductDTO> productDTOs, string query)
        {
            return productDTOs.Where(item => item.Name.Contains(query)).ToList();
        }

        public List<ProductDTO> FindPromotion(List<ProductDTO> productDTOs)
        {
            return productDTOs.Where(item => item.Discount != 0).ToList();
        }


    }
}