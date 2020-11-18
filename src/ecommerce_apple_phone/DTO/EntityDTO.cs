using System;

namespace ecommerce_apple_phone.DTO {

    public class FeeDTO {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? Cost { get; set; }
    }

    public class CategoryDTO {
        public int Id { get; set; }
        public string Name { get; set; }
        //SEO
        public string SeoImage { get; set; }
        public string SeoTitle { get; set; }
        public string SeoDescription { get; set; }
    }

    public class InfoDTO {
        public string NameStore { get; set; }
        public string Logo { get; set; }
        public string Email { get; set; }
        public string Facebook { get; set; }
        public string Messenger { get; set; }
        public string Instargram { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string WorkTime { get; set; }
        //SEO
        public string SeoImage { get; set; }
        public string SeoTitle { get; set; }
        public string SeoDescription { get; set; }
    }

    public class ProductDTO {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ROM { get; set; }
        public string Images { get; set; }
        public int? CategoryId { get; set; }
        public double? Price { get; set; }
        public int? SaleCount { get; set; }
        public double? Discount { get; set; }
    }

    public class ProductAttrDTO {
        public int Id { get; set; }
        public string Color { get; set; }
        public int? SaleCount { get; set; }
        public double? Price { get; set; }
        public string Images { get; set; }
        public int? Quantity { get; set; }
    }

    public class ProductDetailDTO {
        public string Screen { get; set; }
        public string FontCamera { get; set; }
        public string RearCamera { get; set; }
        public string OperationSystem { get; set; }
        public string Chipset { get; set; }
        public string ROM { get; set; }
        public string RAM { get; set; }
        public string Connector { get; set; }
        public string Parameter { get; set; }
        public string Weight { get; set; }
        public string Battery { get; set; }
        public string FunctionOther { get; set; }
    }

    public class PostDTO {
        public int Id { get; set; }
        public string PostContent { get; set; }
        //SEO
        public string SeoImage { get; set; }
        public string SeoTitle { get; set; }
        public string SeoDescription { get; set; }
    }

    public class FeedbackDTO {
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public string FeedbackContent { get; set; }
    }

    public class MethodPayDTO {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class OrderDTO {
        public int Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public string QuestName { get; set; }
        public string QuestPhone { get; set; }
        public string QuestProvince { get; set; }
        public string QuestEmail { get; set; }
        public string QuestAddress { get; set; }
        public string Note { get; set; }
        public string Promotion { get; set; }
        public string Fees { get; set; }
        public byte? Status { get; set; }
        public int? UserId { get; set; }
        public int? MethodPayId { get; set; }
        public int? PointUse { get; set; }
        public int? Point { get; set; }
        public string OrderItems { get; set; }
    }

    public class OrderDetailDTO {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public byte? Quantity { get; set; }
        public int? Price { get; set; }
        public double? Discount { get; set; }
    }

    public class ImportProductDTO {
        public int Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public string ImportItems { get; set; }
    }

    public class ImportDetailDTO {
        public int ImportId { get; set; }
        public int ProductId { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
    }

    public class PromotionDTO {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public bool? Status { get; set; }
        public byte? Type { get; set; }
        public string ItemDetail { get; set; }
    }

    public class PromBillDTO {
        public int Id { get; set; }
        public double? Discount { get; set; }
        public byte? ConditionItem { get; set; }
        public int? ConditionAmount { get; set; }
    }

    public class PromProductDTO {
        public int Id { get; set; }
        public double? Discount { get; set; }
        public string ProductInProms { get; set; }
        public int? CategoryId { get; set; }
        public int? BandId { get; set; }
    }

    public class PromPointDTO {
        public int Id { get; set; }
        public double? DiscountIn { get; set; }
        public double? DiscountOut { get; set; }
    }

    public class PromMethodPayDTO {
        public int Id { get; set; }
        public double? Discount { get; set; }
        public int? MethodPayId { get; set; }
    }

}