using System;
using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public class OrderModel : BaseModel<OrderDTO, Order>, IOrderModel {
        public OrderModel (PhoneContext context, IMapper mapper) : base (context, mapper) { }

        public OrderDTO AddDTO (OrderDTO orderDTO, List<OrderDetailDTO> orderDetailDTOs) {
            throw new NotImplementedException ();
        }

        public List<OrderDTO> Find (string query) {
            throw new NotImplementedException ();
        }

        public double FindPromBill (double totalAmout, int totalItem, List<PromBillDTO> promBillDTOs) {
            throw new NotImplementedException ();
        }

        public double FindPromPoint (int pointUse, List<PromPointDTO> promPointDTOs) {
            throw new NotImplementedException ();
        }

        public int GetdPoint (double totalAmout, List<PromPointDTO> promPointDTOs) {
            throw new NotImplementedException ();
        }

        public List<OrderDTO> GetListDTOs (DateTime start, DateTime end) {
            throw new NotImplementedException ();
        }

        public List<OrderDTO> GetListDTOsByCustomer (int idCustomer) {
            throw new NotImplementedException ();
        }

        public List<OrderDetailDTO> GetOrderDetailDTOs (int id) {
            throw new NotImplementedException ();
        }

        public Tuple<int, double> GetPramOrder (List<OrderDetailDTO> orderDetailDTOs) {
            throw new NotImplementedException ();
        }

        public bool Payment (OrderDTO orderDTO) {
            throw new NotImplementedException ();
        }

        public bool UpdateStatus (int id, int status) {
            throw new NotImplementedException ();
        }
    }
}