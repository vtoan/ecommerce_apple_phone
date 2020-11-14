using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;

namespace ecommerce_apple_phone.Helper {
    public class MapperConfig : Profile {
        public MapperConfig () {
            //Fees
            CreateMap<Fee, FeeDTO> ();
            CreateMap<FeeDTO, Fee> ();
        }

    }
}