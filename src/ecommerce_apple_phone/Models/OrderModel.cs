using System.Data.Common;
using System;
using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DAO;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;
using ecommerce_apple_phone.Helper;

namespace ecommerce_apple_phone.Models {
    public class OrderModel : BaseModel<OrderDTO, Order>, IOrderModel {

        public OrderModel (PhoneContext context, IMapper mapper) : base (context, mapper) { 
        }

        public OrderDTO AddDTO (OrderDTO orderDTO, List<OrderDetailDTO> orderDetailDTOs) {
            Order ord = ObjectMapperTo<OrderDTO, Order>(orderDTO);
            if(ord==null) return null;
            List<OrderDetail> ordDetial = LsObjectMapperTo<OrderDetailDTO, OrderDetail>(orderDetailDTOs);
            if(ordDetial==null) return null;
            ord.OrderDetails=ordDetial;
            ord.DateCreated = DateTime.Now;
            using (var db = new OrderDAO(_context)){
                return ObjectMapperTo<Order, OrderDTO>(db.Add(ord));
            }
        }

        public List<OrderDTO> Find (string query) {
            using(var db = new OrderDAO(_context))
                return LsObjectMapperTo<Order, OrderDTO>(db.Find(query));
        }

        public List<OrderDTO> GetListDTOs (DateTime start, DateTime end) {
            using(var db  =  new OrderDAO(_context))
                return LsObjectMapperTo<Order, OrderDTO>( db.GetList(start, end));
        }

        public List<OrderDTO> GetListDTOsByCustomer (int idCustomer) {
             using(var db  =  new OrderDAO(_context))
                return LsObjectMapperTo<Order, OrderDTO>( db.GetList(idCustomer));
        }

        public List<OrderDetailDTO> GetOrderDetailDTOs (int id) {
            using(var db  =  new OrderDAO(_context))
                return LsObjectMapperTo<OrderDetail, OrderDetailDTO>( db.GetListDetail(id));
        }

        public bool UpdateStatus (int id, byte status) {
            PropModified<Order> modified = new PropModified<Order>(new {Status = (status)});
            using(var db = new OrderDAO(_context))
                return db.Update(id, modified);
        }

        // ============== Usefull ===============
        public double FindPromBill (double totalAmout, int totalItem, List<PromBillDTO> promBillDTOs) {
            if(promBillDTOs.Count ==0) return 0;
            foreach (var item in promBillDTOs)
            {
                if(item.ConditionItem!=null && item.ConditionItem <= totalItem){
                    return (double)item.Discount;
                }
                if(item.ConditionAmount!=null && item.ConditionAmount <= totalItem){
                    return (double)item.Discount;
                }
            }
            return 0;
        }

        public double FindPromPoint (int pointUse, List<PromPointDTO> promPointDTOs) {
            if(promPointDTOs.Count == 0) return 0;
            int discount = 0;
            double prom = (double)promPointDTOs[0].DiscountOut;
            if(prom == 0) return 0;
            discount = (int)(pointUse * prom);
            if(discount>=1) return discount;
            return 0;
        }

        public int GetdPoint (double totalAmout, List<PromPointDTO> promPointDTOs) {
            if(promPointDTOs.Count == 0) return 0;
            int point = 0;
            double condition = (double)promPointDTOs[0].DiscountIn;
            if(condition == 0) return 0;
            point = (int)(totalAmout / condition);
            if(point>=1) return point;
            return 0;
        }

        public Tuple<int, double> GetPramOrder (List<OrderDetailDTO> orderDetailDTOs) {
            
            double totalAmout = 0;
            int totalItem =0;
            foreach (var item in orderDetailDTOs)
            {
                totalItem += (int) item.Quantity;
                double price = ((double)(item.Price * ((item.Discount == null) ? 1 : (item.Price * item.Discount))));
                totalAmout += (double) (item.Quantity * price);
            }
            return new Tuple<int, double>(totalItem, totalAmout);
        }


        
    }
}