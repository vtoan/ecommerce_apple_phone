using System;
using System.Threading.Tasks;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Services
{
    public class Payment : IPaymentService
    {
        public async Task<bool> OnPayment(int item, OrderDTO orderDTO)
        {
            return false;
        }
    }
}