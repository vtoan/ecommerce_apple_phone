using System.Reflection.Metadata;
using System.Runtime.CompilerServices;
using System.Collections.Generic;
using System.Linq;
using ecommerce_apple_phone.EF;
using Microsoft.EntityFrameworkCore;
using ecommerce_apple_phone.Helper;

namespace ecommerce_apple_phone.DAO
{
    public class ProductDAO : EntityDAO<Product>
    {
        public ProductDAO(PhoneContext context) : base(context) { }

        public Product Get(string id, bool isAdmin = false)
        {
            if (!CheckConnection()) return null;
            //
            var query = _context.Products.Where(item => item.Id == id && item.isDel == false);
            if (!isAdmin) query = query.Where(item => item.isShow == true);
            //
            return query.Include(item => item.ProductDetail).FirstOrDefault();
        }

        public List<Product> GetListAttributes(int id, bool isAdmin = false) // get all attribute of product
        {
            if (!CheckConnection()) return null;
            //
            var query = _context.Products.Where(item => item.ProductDetailId == id && item.isDel == false);
            if (!isAdmin) query = query.Where(item => item.isShow == true);
            //
            var lsProduct = query.Include(item => item.ProductDetail).ToList();
            return lsProduct;
        }

        public List<Product> GetList(bool isAdmin = false) // product take first attribute
        {
            if (!CheckConnection()) return null;
            //
            var query = _context.ProductDetails.Where(item => item.isDel == false);
            if (!isAdmin) query = query.Where(item => item.isShow == true);
            //
            var lsProduct = query.Include(item => item.Products).ToList();
            List<Product> pds = new List<Product>();
            foreach (var item in lsProduct)
                if (item.Products.Count > 0)
                {
                    var queryAttr = item.Products.Where(attr => attr.isDel == false);
                    if (!isAdmin) queryAttr = queryAttr.Where(attr => attr.isShow == true);
                    Product attr = queryAttr.FirstOrDefault();
                    attr.isShow = item.isShow;
                    if (attr != null) pds.Add(attr);
                }
            return pds;
        }
    }
}