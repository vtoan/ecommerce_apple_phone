using System.Collections.Generic;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public class UserModel : BaseModel<User, User>, IUserModel {
        public UserModel (PhoneContext context, IMapper mapper) : base (context, mapper) { }

        public bool UpdatePoint (int id, int point) {
            throw new System.NotImplementedException ();
        }
    }
}