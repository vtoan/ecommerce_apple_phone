using System;
using AutoMapper;
using ecommerce_apple_phone.Controllers;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;

namespace ecommerce_apple_phone.Helper
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            //Fees
            CreateMap<Fee, FeeDTO>();
            CreateMap<FeeDTO, Fee>();
            //Category
            CreateMap<Category, CategoryDTO>();
            CreateMap<CategoryDTO, Category>();
            //Info
            CreateMap<InfoDTO, Info>();
            CreateMap<Info, InfoDTO>();
            //MethodPay
            CreateMap<MethodPay, MethodPayDTO>();
            CreateMap<MethodPayDTO, MethodPay>();
            //Product
            CreateMap<Product, ProductDTO>()
                .ForMember(des => des.Name, act => act.MapFrom(src => src.ProductDetail.Name))
                .ForMember(des => des.ROM, act => act.MapFrom(src => src.ProductDetail.ROM))
                .ForMember(des => des.Id, act => act.MapFrom(src => src.ProductDetailId + "-" + src.Id))
                .ForMember(des => des.CategoryId, act => act.MapFrom(src => src.ProductDetail.CategoryId));
            CreateMap<ProductDTO, Product>()
                .ForMember(des => des.Id, act => act.MapFrom(src => getPropID(src.Id, 1)))
                .ForMember(des => des.ProductDetailId, act => act.MapFrom(src => getPropID(src.Id, 0)));

            CreateMap<ProductDetail, ProductDetailDTO>();
            CreateMap<ProductDetailDTO, ProductDetail>();
            //
            CreateMap<ProductDetailDTO, ProductDetail>();
            CreateMap<ProductDetailDTO, ProductDetail>();
            //Post
            CreateMap<Post, PostDTO>();
            CreateMap<PostDTO, Post>();
            //Feedback
            CreateMap<Feedback, FeedbackDTO>()
                .ForMember(src => src.ProductId, act => act.MapFrom(des => des.ProductDetailId.ToString()));
            CreateMap<FeedbackDTO, Feedback>()
                .ForMember(src => src.ProductDetailId, act => act.MapFrom(des => getPropID(des.ProductId, 0)));
            //Import
            CreateMap<ImportDetail, ImportDetailDTO>();
            CreateMap<ImportDetailDTO, ImportDetail>();
            CreateMap<ImportProduct, ImportProductDTO>();
            CreateMap<ImportProductDTO, ImportProduct>();
            //Order
            CreateMap<Order, OrderDTO>();
            CreateMap<OrderDTO, Order>();
            CreateMap<OrderDetail, OrderDetailDTO>()
                .ForMember(src => src.ProductId, act => act.MapFrom(des => des.ProductId.ToString()));
            CreateMap<OrderDetailDTO, OrderDetail>()
                .ForMember(src => src.ProductId, act => act.MapFrom(des => getPropID(des.ProductId, 1)));
            //Prom
            CreateMap<PromotionDTO, Promotion>()
                .ForMember(src => src.Type, act => act.MapFrom(des => des.TypeProm));
            CreateMap<Promotion, PromotionDTO>()
                .ForMember(src => src.TypeProm, act => act.MapFrom(des => des.Type));
            CreateMap<Promotion, PromBillDTO>()
                .ForMember(src => src.Discount, act => act.MapFrom(des => des.PromBill.Discount))
                .ForMember(src => src.ConditionItem, act => act.MapFrom(des => des.PromBill.ConditionItem))
                .ForMember(src => src.ConditionAmount, act => act.MapFrom(des => des.PromBill.ConditionItem));
            CreateMap<Promotion, PromProductDTO>()
                .ForMember(src => src.Discount, act => act.MapFrom(des => des.PromProduct.Discount))
                .ForMember(src => src.ProductInProms, act => act.MapFrom(des => des.PromProduct.ProductInProms))
                .ForMember(src => src.CategoryId, act => act.MapFrom(des => des.PromProduct.CategoryId));
            //
            CreateMap<Promotion, PromPointDTO>()
                .ForMember(src => src.DiscountIn, act => act.MapFrom(des => des.PromPoint.DiscountIn))
                .ForMember(src => src.DiscountOut, act => act.MapFrom(des => des.PromPoint.DiscountOut));
            //

            CreateMap<PromBillDTO, PromBill>();
            CreateMap<PromBill, PromBillDTO>();
            //
            //
            CreateMap<PromProductDTO, PromProduct>();
            CreateMap<PromProduct, PromProductDTO>();
            //
            CreateMap<AppUser, InfoModel>()
                .ForMember(src => src.Phone, act => act.MapFrom(des => des.PhoneNumber));
        }

        private int getPropID(string idstring, int idx)
        {
            return Int32.Parse(idstring.Split("-")[idx]);
        }
    }
}


