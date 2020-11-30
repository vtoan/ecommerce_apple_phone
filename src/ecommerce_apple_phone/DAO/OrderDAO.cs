using System;
using System.Collections.Generic;
using System.Linq;
using ecommerce_apple_phone.EF;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_apple_phone.DAO
{
    public class OrderDAO : EntityDAO<Order>
    {
        public OrderDAO(PhoneContext context) : base(context)
        {
        }

        public List<Order> GetList(DateTime start, DateTime end){
            if(!CheckConnection()) return null;
            return  _context.Orders
                    .Where(item => item.DateCreated >=  start && item.DateCreated <= end)
                    .ToList();
        }

        public List<Order> GetList(int userId){
            if(!CheckConnection()) return null;
            return  _context.Orders
                    .Where(item => item.UserId == userId)
                    .ToList();
        }

        public List<OrderDetail> GetListDetail(int id){
            if(!CheckConnection()) return null;
            var obj =  _context.Orders
                    .Where(item => item.Id==id)
                    .Include(item => item.OrderDetails).FirstOrDefault();
            return obj?.OrderDetails;
        }

        public List<Order> Find(string phone){
            if(!CheckConnection()) return null;
            return  _context.Orders
                    .Where(item => item.QuestPhone.Contains(phone))
                    .ToList();
        }
    }
}