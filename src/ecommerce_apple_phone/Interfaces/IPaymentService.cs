using ecommerce_apple_phone.DTO;

namespace ecommerce_apple_phone.Interfaces
{
    public interface IPaymentService
    {
        bool OnPayment(int item, OrderDTO orderDTO);
    }
}