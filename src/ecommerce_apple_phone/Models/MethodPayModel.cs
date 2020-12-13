using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public class MethodPayModel : BaseModel<MethodPayDTO, MethodPay>, IMethodPayModel {
        public MethodPayModel (PhoneContext context, IMapper mapper) : base (context, mapper) { }
    }
}