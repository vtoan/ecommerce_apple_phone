interface Fee {
    id: number;
    name: string;
    cost: number;
}

interface Category {
    id: number;
    name: string;
    //SEO
    seoImage: string;
    seoTitle: string;
    seoDescription: string;
}

interface Info {
    nameStore: string;
    logo: string;
    email: string;
    facebook: string;
    messenger: string;
    instargram: string;
    phone: string;
    address: string;
    workTime: string;
    //SEO
    seoImage: string;
    seoTitle: string;
    seoDescription: string;
}

interface Product {
    id: string;
    name: string;
    rom: string;
    images: string;
    categoryId: number;
    price: number;
    saleCount: number;
    discount: number;
    color: string;
    quantity: number;
    isShow: boolean;
    promId: number;
}

interface ProductDetail {
    name: string;
    screen: string;
    fontCamera: string;
    rearCamera: string;
    operationSystem: string;
    chipset: string;
    rom: string;
    ram: string;
    connector: string;
    parameter: string;
    weight: string;
    battery: string;
    functionOther: string;
    categoryId: number;
}

interface Post {
    id: number;
    postContent: string;
    //SEO
    seoImage: string;
    seoTitle: string;
    seoDescription: string;
}

interface Feedback {
    id?: number;
    productId: string;
    userId: string;
    userName: string;
    feedbackContent: string;
}

interface MethodPay {
    id: number;
    name: string;
}

interface Order {
    id: number;
    dateCreated: string;
    questName: string;
    questPhone: string;
    questProvince: string;
    questDistrict: string;
    questEmail: string;
    questAddress: string;
    note: string;
    promotion: string;
    fees: string;
    status: number;
    userId: string;
    methodPayId: number;
    pointUse: number;
    point: number;
    orderItems: string;
}

interface OrderDetail {
    orderId: number;
    productId: string;
    quantity: number;
    price: number;
    discount: number;
}

interface ImportProduct {
    id: number;
    dateCreated: Date;
    importItems: string;
}

interface ImportDetail {
    importId: number;
    productId: string;
    quantity: number;
    price: number;
}

interface Promotion {
    id: number;
    name: string;
    fromDate: Date;
    toDate: Date;
    status: boolean;
    typeProm: number;
    itemDetail: string;
}

interface PromBill {
    id: number;
    name: string;
    discount: number;
    conditionItem: number;
    conditionAmount: number;
}

interface PromProduct {
    id: number;
    name: string;
    discount: number;
    productInProms: string;
    categoryId: number;
}

interface PromPoint {
    id: number;
    name: string;
    discountIn: number;
    discountOut: number;
}

interface User {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    email: string;
    roleName: string;
    dateCreated: Date;
}

export {
    Fee,
    Category,
    Info,
    Product,
    ProductDetail,
    Post,
    Feedback,
    MethodPay,
    Order,
    OrderDetail,
    Promotion,
    PromPoint,
    PromBill,
    PromProduct,
    ImportProduct,
    ImportDetail,
    User,
};
