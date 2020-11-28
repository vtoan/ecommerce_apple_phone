using System.Runtime.CompilerServices;
using System.Collections.Generic;
using System.Linq;
using ecommerce_apple_phone.EF;
using Microsoft.EntityFrameworkCore;
using ecommerce_apple_phone.Helper;

namespace ecommerce_apple_phone.DAO
{
    public class ProductDAO : EntityDAO<ProductDetail>
    {
        public ProductDAO(PhoneContext context) : base(context)
        {
        }

        public override ProductDetail Get(int id)
        {
            return _context.ProductDetails.Where(item => item.Id == id && item.isDel == false).Include(item => item.Product).First();
        }

        public override List<ProductDetail> GetList()
        {
            return _context.ProductDetails
                .Where(item => item.isDel == false)
                .Include(item => item.Product)
                .ToList();
        }
        
        public  List<ProductDetail> GetListUser(int id)
        {
            return _context.ProductDetails
                .Where(item => item.ProductId==id && item.isDel == false && item.isShow == true)
                .Include(item => item.Product)
                .ToList();
        }

        public List<ProductDetail> GetListUser()
        {
            var prod = _context.Products.Where(item => item.isDel == false && item.isShow == true).Include(item => item.ProductDetails).ToList();
            List<ProductDetail> pds = new List<ProductDetail>();
            foreach (var item in prod)
            {
                if(item.ProductDetails.Count >0)
                pds.Add(item.ProductDetails.First());
            }
            return pds;
        }

        public  List<ProductDetail> GetListAdmin(int id)
        {
            return _context.ProductDetails
                .Where(item => item.ProductId==id && item.isDel == false)
                .Include(item => item.Product)
                .ToList();
        }

        public List<ProductDetail> GetListAdmin()
        {
            var prod = _context.Products.Where(item => item.isDel == false).Include(item => item.ProductDetails).ToList();
            List<ProductDetail> pds = new List<ProductDetail>();
            foreach (var item in prod)
            {
                if(item.ProductDetails.Count >0)
                pds.Add(item.ProductDetails.First());
            }
            return pds;
        }
    }
}