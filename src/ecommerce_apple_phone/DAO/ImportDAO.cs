using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerce_apple_phone.EF;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_apple_phone.DAO
{
    public class ImportDAO : EntityDAO<ImportProduct>
    {
        public ImportDAO(PhoneContext context) : base(context)
        {
        }

        public new ImportProduct Add(ImportProduct newObj)
        {
            if (!CheckConnection() || newObj.ImportDetails.Count == 0) return null;
            _context.Add<ImportProduct>(newObj);
            // _context.SaveChangesAsync().Wait();
            //       
            var lsImp = newObj.ImportDetails;
            foreach (var item in lsImp)
            {
                var obj = _context.Find<Product>(item.ProductId);
                if (obj != null && item?.Quantity > 0) obj.Quantity += (int)item.Quantity;
            }
            _context.SaveChangesAsync().Wait();
            return newObj;
        }


        public ImportProduct Get(int id)
        {
            if (!CheckConnection()) return null;
            var obj = _context.ImportProducts
                    .Where(item => item.Id == id)
                    .Include(item => item.ImportDetails)
                    .FirstOrDefault();
            return obj == null ? null : obj;
        }

        public List<ImportProduct> GetList(DateTime start, DateTime end)
        {
            if (!CheckConnection()) return null;
            return _context.ImportProducts
                    .Where(item => item.DateCreated >= start && item.DateCreated <= end)
                    .ToList();
        }
    }
}