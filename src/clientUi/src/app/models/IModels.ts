interface Fee{
    id:number;
    name:string;
    cost:number;
}


interface Category {
    id:number;
    name:string;
    //SEO
    seoImage:string;
    seoTitle:string;
    seoDescription:string;
}

interface Info {
    nameStore:string
    logo:string;
    email:string;
    facebook:string;
    messenger:string;
    instargram :string;
    phone:string;
    address:string;
    workTime:string;
   //SEO
    seoImage:string;
    seoTitle:string;
    seoDescription:string;
}

interface Product {
    id:number;
    name:string;
    rOM:string;
    images:string;
    categoryId:number;
    price:number;
    saleCount:number;
    discount:number;
    color:string;
    quantity:number;
}

interface ProductAttr {
    // id:number;
    color:string;
    // saleCount:number;
    // price:number;
    // images:string;
    quantity:number;
}

interface ProductDetail {
    screen:string;
    fontCamera:string;
    rearCamera:string;
    operationSystem:string;
    chipset:string;
    rOM:string;
    rAM:string;
    connector:string;
    parameter:string;
    ưeight:string;
    battery:string;
    functionOther:string;
}

interface Post {
    id:number;
    postContent:string;
    //SEO
    seoImage:string;
    seoTitle:string;
    seoDescription:string;
}

interface Feedback {
    productId:number;
    userId:number;
    feedbackContent:string;
}

interface MethodPay {
    id:number;
    name:string;
}

interface Order {
    id:number;
    dateCreated:Date
    questName:string;
    questPhone:string;
    questProvince:string;
    questDistrict:string;
    questEmail:string;
    questAddress:string;
    note:string;
    promotion:string;
    fees:string;
    status:number;
    userId:number;
    methodPayId:number;
    pointUse:number;
    point:number;
    orderItems:string;
}

interface OrderDetail {
    orderId:number;
    productId:number;
    quantity:number;
    price:number;
    discount:number;
}

interface ImportProduct {
    id:number;
    dateCreated:Date;
    importItems:string;
}

interface ImportDetail {
    importId:number;
    productId:number;
    quantity:number;
    price:number;
}

interface Promotion {
    id:number;
    name:string;
    fromDate:Date;
    toDate:Date;
    status:boolean
    type:number;
    itemDetail:string;
}

interface PromBill {
    id:number;
    discount:number;
    conditionItem:number;
    conditionAmount:number;
}

interface PromProduct {
    id:number;
    discount:number;
    productInProms:string;
    categoryId:number;
    bandId:number;
}

interface PromPoint{
    id:number;
    discountIn:number;
    discountOut:number;
}

interface PromMethodPay {
    id:number;
    discount:number;
    methodPayId:number;
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