using System;
using System.IO;
using ecommerce_apple_phone.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace ecommerce_apple_phone.Services
{
    public class Upload : IUploadService
    {
        private ILogger _logger;
        private string webRootPath="";
        public Upload(ILogger<string> logger, IWebHostEnvironment environment)
        {
            _logger = logger;
            webRootPath = environment.WebRootPath;
        }

        public bool UploadFile(IFormFile file, string storePath)
        {
            try{
                 //Check folder
                string folderPath = Path.Combine (webRootPath, storePath);
                if (!Directory.Exists (folderPath))
                    Directory.CreateDirectory (folderPath);
                //Save file
                string filePath = Path.Combine (folderPath, file.Name);
                using (var fileStream = new FileStream (filePath, FileMode.OpenOrCreate)) {
                    file.CopyTo (fileStream);
                }
                return true;
            }catch(Exception ex) {
                _logger.Log(LogLevel.Error, ex,"Upload file");
                return false;
            }
        }
    }
}