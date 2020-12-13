using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public class InfoModel : BaseModel<InfoDTO, Info>, IInfoModel {
        public InfoModel (PhoneContext context, IMapper mapper) : base (context, mapper) { }
    }
}