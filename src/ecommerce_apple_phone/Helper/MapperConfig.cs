using System;
using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;

namespace ecommerce_apple_phone.Helper {
    public class MapperConfig : Profile {
        public MapperConfig () {
            //Fees
            CreateMap<Fee, FeeDTO> ();
            CreateMap<FeeDTO, Fee> ();
            //Category
            CreateMap<Category, CategoryDTO> ();
            CreateMap<CategoryDTO, Category> ();
            //Info
            CreateMap<InfoDTO, Info> ();
            CreateMap<Info, InfoDTO> ();
            //MethodPay
            CreateMap<MethodPay, MethodPayDTO>();
            CreateMap<MethodPayDTO, MethodPay>();
            //Product
            CreateMap<ProductDetail, ProductDTO>()
                .ForMember(des => des.Name, act => act.MapFrom(src => src.Product.Name))
                .ForMember(des => des.ROM, act => act.MapFrom(src => src.Product.ROM))
                .ForMember(des => des.Id, act => act.MapFrom(src => src.ProductId +"-"+ src.Id))
                .ForMember(des => des.CategoryId, act => act.MapFrom(src => src.Product.CategoryId));
            CreateMap<ProductDTO, ProductDetail>()
                .ForMember(des => des.Id, act => act.MapFrom(src => getPropID(src.Id,1)))
                .ForMember(des => des.ProductId, act => act.MapFrom(src => getPropID(src.Id,0)));
            
            CreateMap<Product, ProductDetailDTO>();
            CreateMap<ProductDetailDTO, Product>();
            //
        }

        private int getPropID(string idstring, int idx)
        {
            return Int32.Parse(idstring.Split("-")[idx]);
        }
    }
}


    