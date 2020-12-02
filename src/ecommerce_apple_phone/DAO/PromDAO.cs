using System.Globalization;
using System;
using System.Collections.Generic;
using System.Linq;
using ecommerce_apple_phone.EF;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace ecommerce_apple_phone.DAO
{
    public class PromDAO : EntityDAO<Promotion>
    {
        public PromDAO(PhoneContext context) : base(context)
        {
        }

        public List<Promotion> GetListBill()
        {
            if (!CheckConnection()) return null;
            DateTime date = DateTime.Now;
            return _context.Promotions.Where(item => item.Type == 2
                                    && date >= (DateTime)item.FromDate 
                                    && date <= (DateTime)item.ToDate)
                                .Include(item => item.PromBill).ToList();
        }

        public List<Promotion> GetListProduct()
        {
            if (!CheckConnection()) return null;
            DateTime date = DateTime.Now;
            return _context.Promotions.Where(item => item.Type == 1
                                    && date >= (DateTime)item.FromDate 
                                    && date <= (DateTime)item.ToDate)
                                .Include(item => item.PromProduct).ToList();
        }

        public List<Promotion> GetListPoint()
        {
            if (!CheckConnection()) return null;
            DateTime date = DateTime.Now;
            return _context.Promotions.Where(item => item.Type == 3
                                    && date >= (DateTime)item.FromDate 
                                    && date <= (DateTime)item.ToDate)
                                .Include(item => item.PromPoint).ToList();
        }

        public bool ChangePromProduct(int PromOld, int PromNew, int ProdId){
            if (!CheckConnection()) return false;
            var OldObj = _context.PromProducts.Find(PromOld);
            var NewObj = _context.PromProducts.Find(PromNew);
            if(OldObj == null || NewObj == null) return false;
            var arOld = JsonSerializer.Deserialize<List<int>>(OldObj.ProductInProms);
            var arNew =JsonSerializer.Deserialize<List<int>>(NewObj.ProductInProms);
            if(!arOld.Remove(ProdId)) return false;
            if(!arNew.Contains(ProdId)) arNew.Add(ProdId);
            OldObj.ProductInProms = JsonSerializer.Serialize(arOld);          
            NewObj.ProductInProms = JsonSerializer.Serialize(arNew);          
            return true;
        }
    }
}