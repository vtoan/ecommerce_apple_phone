using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Helper;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_apple_phone.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {

        private IOrderModel _orderModel;
        private IPromotionModel _promModel;

        public OrderController(IOrderModel orderModel, IPromotionModel promotionModel)
        {
            _orderModel = orderModel;
            _promModel = promotionModel;
        }

        [HttpPost("confirm")]
        public ActionResult<OrderDTO> Confirm(
            [FromServices] IFeeModel feeModel,
            OrderDTO orderDTO)
        {
            if (DataHelper.IsEmptyString(orderDTO.OrderItems)) return BadRequest();
            //Parse list order Item
            var orderDetailDTOs = DataHelper.ParserJsonTo<List<OrderDetailDTO>>(orderDTO.OrderItems);
            var pramOrder = _orderModel.GetPramOrder(orderDetailDTOs);
            //
            double promBill = 0;
            double promMethod = 0;
            double promPoint = 0;
            int point = 0;
            //bills
            var bills = _promModel.GetListDTOsPromBill();
            if (bills != null || bills?.Count > 0)
                promBill = _orderModel.FindPromBill(pramOrder.Item2, pramOrder.Item1, bills);
            //point
            var points = _promModel.GetListDTOsPromPoint();
            if (points != null || points?.Count > 0)
            {
                if (orderDTO.PointUse != 0)
                    promPoint = _orderModel.FindPromPoint((int)orderDTO.PointUse, points);
                point = _orderModel.GetdPoint(pramOrder.Item2, points);
            }
            //Get point
            var fees = feeModel.GetListDTOs();
            if (fees != null || fees.Count > 0)
                orderDTO.Fees = DataHelper.ParserObjToJson(fees);
            orderDTO.Point = point;
            orderDTO.Promotion = DataHelper.ParserObjToJson(new
            {
                bill = promBill,
                methodPay = promMethod,
                promPoint = promPoint
            });
            return orderDTO;
        }

        [HttpPost("{payId}")]
        public async System.Threading.Tasks.Task<IActionResult> AddAsync(
            [FromServices] IProductModel productModel,
            [FromServices] IPaymentService payment,
            OrderDTO orderDTO, int payId)
        {
            if (orderDTO.OrderItems == null || orderDTO.OrderItems == "" || payId <= 0) return BadRequest();
            //Parse list order Item
            List<OrderDetailDTO> orderDetailDTOs = DataHelper.ParserJsonTo<List<OrderDetailDTO>>(orderDTO.OrderItems);
            if (orderDetailDTOs.Count < 0) return Problem(statusCode: 500, detail: "Data invalid");
            orderDTO.MethodPayId = payId;
            //Payment
            if (payId == 2)
            {
                var re = await payment.OnPayment((int)orderDTO.MethodPayId, orderDTO);
                if (re == false) return Problem();
            }
            var od = _orderModel.AddDTO(orderDTO, orderDetailDTOs);
            if (od == null) Problem(statusCode: 500, detail: "Can't add data");
            productModel.UpdateForOrder(orderDetailDTOs);
            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult<OrderDTO> Get(int id)
        {
            if (id <= 0) return BadRequest(new { message = "ID is invalid" });
            var re = _orderModel.GetDTO(id);
            if (re == null) return NotFound();
            var ordDetials = _orderModel.GetOrderDetailDTOs(id);
            re.OrderItems = DataHelper.ParserObjToJson(ordDetials);
            if (re == null) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet("search")]
        public ActionResult<List<OrderDTO>> FindOrder(string query)
        {
            if (DataHelper.IsEmptyString(query)) return BadRequest();
            //
            var re = _orderModel.Find(query);
            if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpGet("report/{start}/{end}")]
        public ActionResult<List<OrderDTO>> GetReport(string start, string end)
        {
            if (DataHelper.IsEmptyString(start) || DataHelper.IsEmptyString(end)) return BadRequest(new { message = "Date is requried" });
            try
            {
                DateTime startDate = DateTime.Parse(start);
                DateTime endDate = DateTime.Parse(end);
                var re = _orderModel.GetListDTOs(startDate, endDate);
                if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
                return re;
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("customer/orders")]
        public ActionResult<List<OrderDTO>> GetForCustomer(int userId)
        {
            if (userId == 0) return BadRequest(new { message = "Date is requried" });
            //
            var re = _orderModel.GetListDTOsByCustomer(userId);
            if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }

        [HttpPut("{id}")]
        public ActionResult UpdateStatus(int id, UpdateOrderDTO input)
        {
            if (!ModelState.IsValid || id<=0) return BadRequest();
            var re = _orderModel.UpdateStatus(id,(byte)(input.status));
            if (!re) return Problem(statusCode: 500, detail: "Can't update status data");
            return Ok();
        }

        [HttpGet("items/{id}")]
        public ActionResult<List<OrderDetailDTO>> GetItem(int id)
        {
            if (id <= 0) return BadRequest(new { message = "ID is invalid" });
            var re = _orderModel.GetOrderDetailDTOs(id);
            if (re == null || re.Count == 0) return Problem(statusCode: 500, detail: "Data not exist");
            return re;
        }
    }
    public class UpdateOrderDTO{
        public int orderID { get; set; }
        [Required]
        public byte? status { get; set; }
    }
}