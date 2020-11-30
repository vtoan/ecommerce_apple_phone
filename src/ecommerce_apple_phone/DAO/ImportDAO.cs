using System;
using System.Collections.Generic;
using System.Linq;
using ecommerce_apple_phone.EF;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_apple_phone.DAO
{
    public class ImportDAO : EntityDAO<ImportProduct>
    {
        public ImportDAO(PhoneContext context) : base(context)
        {
        }

        public List<ImportDetail> GetList(int id){
            if(!CheckConnection()) return null;
            var obj = _context.ImportProducts
                    .Where(item => item.Id == id)
                    .Include(item => item)
                    .FirstOrDefault();
            //
            if(obj == null ) return null;
            return obj.ImportDetails;
        }

        public List<ImportProduct> GetList(DateTime start, DateTime end){
            if(!CheckConnection()) return null;
            return _context.ImportProducts
                    .Where(item => item.DateCreated >= start && item.DateCreated <=end)
                    .ToList();
        }
    }
}