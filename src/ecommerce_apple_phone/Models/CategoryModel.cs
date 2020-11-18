using AutoMapper;
using ecommerce_apple_phone.DTO;
using ecommerce_apple_phone.EF;
using ecommerce_apple_phone.Interfaces;

namespace ecommerce_apple_phone.Models {
    public class CategoryModel : BaseModel<CategoryDTO, Category>, ICategoryModel {
        public CategoryModel (PhoneContext context, IMapper mapper) : base (context, mapper) { }
    }
}