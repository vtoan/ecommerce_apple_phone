using System.Threading.Tasks;
using ecommerce_apple_phone.DTO;

namespace ecommerce_apple_phone.Interfaces
{
    public interface IPaymentService
    {
        Task<bool> OnPayment(int item, OrderDTO orderDTO);
    }
}