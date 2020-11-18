interface Fee{
    Id:number;
    Name:string;
    Cost:number;
}


interface Category {
    Id:number;
    Name:string;
    //SEO
    SeoImage:string;
    SeoTitle:string;
    SeoDescription:string;
}

interface Info {
    NameStore:string
    Logo:string;
    Email:string;
    Facebook:string;
    Messenger:string;
    Instargram :string;
    Phone:string;
    Address:string;
    WorkTime:string;
   //SEO
    SeoImage:string;
    SeoTitle:string;
    SeoDescription:string;
}

interface Product {
    Id:number;
    Name:string;
    ROM:string;
    Images:string;
    CategoryId:number;
    Price:number;
    SaleCount:number;
    Discount:number;
}

interface ProductAttr {
    Id:number;
    Color:string;
    SaleCount:number;
    Price:number;
    Images:string;
    Quantity:number;
}

interface ProductDetail {
    Screen:string;
    FontCamera:string;
    RearCamera:string;
    OperationSystem:string;
    Chipset:string;
    ROM:string;
    RAM:string;
    Connector:string;
    Parameter:string;
    Weight:string;
    Battery:string;
    FunctionOther:string;
}

interface Post {
    Id:number;
    PostContent:string;
    //SEO
    SeoImage:string;
    SeoTitle:string;
    SeoDescription:string;
}

interface Feedback {
    ProductId:number;
    UserId:number;
    FeedbackContent:string;
}

interface MethodPay {
    Id:number;
    Name:string;
}

interface Order {
    Id:number;
    DateCreated:Date
    QuestName:string;
    QuestPhone:string;
    QuestProvince:string;
    QuestEmail:string;
    QuestAddress:string;
    Note:string;
    Promotion:string;
    Fees:string;
    Status:number;
    UserId:number;
    MethodPayId:number;
    PointUse:number;
    Point:number;
    OrderItems:string;
}

interface OrderDetail {
    OrderId:number;
    ProductId:number;
    Quantity:number;
    Price:number;
    Discount:number;
}

interface ImportProduct {
    Id:number;
    DateCreated:Date;
    ImportItems:string;
}

interface ImportDetail {
    ImportId:number;
    ProductId:number;
    Quantity:number;
    Price:number;
}

interface Promotion {
    Id:number;
    Name:string;
    FromDate:Date;
    ToDate:Date;
    Status:boolean
    Type:number;
    ItemDetail:string;
}

interface PromBill {
    Id:number;
    Discount:number;
    ConditionItem:number;
    ConditionAmount:number;
}

interface PromProduct {
    Id:number;
    Discount:number;
    ProductInProms:string;
    CategoryId:number;
    BandId:number;
}

interface PromPoint{
    Id:number;
    DiscountIn:number;
    DiscountOut:number;
}

interface PromMethodPay {
    Id:number;
    Discount:number;
    MethodPayId:number;
}

export {
    Fee,
    Category,
    Info,
    Product,
    ProductAttr,
    ProductDetail,
    Post,
    Feedback,
    MethodPay,
    Order,
    OrderDetail,
    Promotion,
    PromPoint,
    PromBill,
    PromMethodPay,
    PromProduct,
    ImportProduct,
    ImportDetail
} 