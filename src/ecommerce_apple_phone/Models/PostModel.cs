using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public class PostModel : BaseModel<PostDTO, Post>, IPostModel {
        public PostModel (PhoneContext context, IMapper mapper) : base (context, mapper) { }
    }
}