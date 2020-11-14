using System.Threading.Tasks;

namespace ecommerce_apple_phone.Interfaces {
    public interface IMailSenderService {
        Task SendMail (string des, string subjectMail, string bodyMail);
    }
}