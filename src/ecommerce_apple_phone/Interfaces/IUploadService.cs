using Microsoft.AspNetCore.Http;

namespace ecommerce_apple_phone.Interfaces
{
    public interface IUploadService
    {
        bool UploadFile(IFormFile file, string storePath);
    }
}