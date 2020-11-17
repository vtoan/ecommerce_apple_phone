using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace ecommerce_apple_phone.Controllers {
    [ApiController]
    [Route ("[controller]")]
    public class OrderController : ControllerBase {

        private IOrderModel _orderModel;
        private IPromotionModel _promModel;

        public OrderController () { }

        [HttpPost ("confirm")]
        public ActionResult<OrderDTO> Confirm ([FromServices] IFeeModel feeModel, OrderDTO orderDTO, List<OrderDetailDTO> orderDetailDTOs) {
            var pramOrder = _orderModel.GetPramOrder (orderDetailDTOs);
            //
            double promBill = 0;
            double promMethod = 0;
            double promPoint = 0;
            int point = 0;
            //bills
            var bills = _promModel.GetListDTOsPromBill ();
            if (bills != null || bills.Count > 0)
                promBill = _orderModel.FindPromBill (pramOrder.Item2, pramOrder.Item1, bills);
            //method
            var methods = _promModel.GetListDTOsPromMethodPay ();
            if (methods != null || methods.Count > 0 || orderDTO.MethodPayId != 0)
                promMethod = _orderModel.FindPromMethodPay ((int) orderDTO.MethodPayId, methods);
            //point
            var points = _promModel.GetListDTOsPromPoint ();
            if (points != null || points.Count > 0) {
                if (orderDTO.PointUse != 0)
                    promPoint = _orderModel.FindPromPoint ((int) orderDTO.PointUse, points);
                point = _orderModel.GetdPoint (pramOrder.Item2, points);
            }
            //Get point
            var fees = feeModel.GetListDTOs ();
            if (fees != null || fees.Count > 0)
                orderDTO.Fees = ParserObjToJson (fees);
            orderDTO.Point = point;
            orderDTO.Promotion = ParserObjToJson (new {
                bill = promBill,
                    methodPay = promMethod,
                    promPoint = promPoint
            });
            //
            return orderDTO;
        }

        [HttpPost]
        public IActionResult Add ([FromServices] IProductModel productModel, OrderDTO orderDTO, List<OrderDetailDTO> orderDetailDTOs) {
            if (orderDetailDTOs.Count < 0) return Problem (statusCode: 500, detail: "Data invalid");
            var payment = _orderModel.Payment (orderDTO);
            if (!payment) return Problem (statusCode: 500, detail: "Order is unpaid");
            var od = _orderModel.AddDTO (orderDTO, orderDetailDTOs);
            if (od == null) Problem (statusCode: 500, detail: "Can't add data");
            productModel.UpdateForOrder (orderDetailDTOs);
            return Ok ();
        }

        [HttpGet ("{id}")]
        public ActionResult<OrderDTO> Get (int id) {
            if (id <= 0) return BadRequest (new { message = "ID is invalid" });
            var re = _orderModel.GetDTO (id);
            if (re == null) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet ("/search")]
        public ActionResult<List<OrderDTO>> FindOrder (string query) {
            if (query == null || query == "") return BadRequest ();
            //
            var re = _orderModel.Find (query);
            if (re == null || re.Count == 0) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet ("/report")]
        public ActionResult<List<OrderDTO>> GetReport (string start, string end) {
            if (start == null || end == null) return BadRequest (new { message = "Date is requried" });
            DateTime startDate;
            if (!DateTime.TryParse (start, out startDate)) return BadRequest (new { message = "Start date is requried" });
            DateTime endDate;
            if (!DateTime.TryParse (end, out endDate)) return BadRequest (new { message = "End date is requried" });
            //
            var re = _orderModel.GetListDTOs (startDate, endDate);
            if (re == null || re.Count == 0) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet ("customer/orders")]
        public ActionResult<List<OrderDTO>> GetForCustomer (int userId) {
            if (userId == 0) return BadRequest (new { message = "Date is requried" });
            //
            var re = _orderModel.GetListDTOsByCustomer (userId);
            if (re == null || re.Count == 0) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPut ("{id}")]
        public ActionResult UpdateStatus (int id, int status) {
            if (status <= 0 || id <= 0) return BadRequest ();
            var re = _orderModel.UpdateStatus (id, status);
            if (!re) return Problem (statusCode: 500, detail: "Can't update status data");
            return Ok ();
        }

        [HttpGet ("items/{id}")]
        public ActionResult<List<OrderDetailDTO>> GetItem (int id) {
            if (id <= 0) return BadRequest (new { message = "ID is invalid" });
            var re = _orderModel.GetOrderDetailDTOs (id);
            if (re == null || re.Count == 0) return Problem (statusCode: 500, detail: "Data not exist");
            return re;
        }

        public T ParserJsonTo<T> (string target) {
            return JsonSerializer.Deserialize<T> (target, new JsonSerializerOptions {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
        }

        public string ParserObjToJson (object target) {
            return JsonSerializer.Serialize (target, new JsonSerializerOptions {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
        }

    }
}