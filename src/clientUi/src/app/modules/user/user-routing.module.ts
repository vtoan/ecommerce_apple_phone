import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
//component
import { UserMainComponent } from "./user-main/user-main.component";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { DiscountComponent } from "./discount/discount.component";
import { PhoneComponent } from "./phone/phone.component";
import { OtherComponent } from "./other/other.component";
import { WatchComponent } from "./watch/watch.component";
import { CheckOrderComponent } from "./check-order/check-order.component";
import { CartComponent } from "./cart/cart.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { SearchProductComponent } from "./search-product/search-product.component";
import { OrderDetailComponent } from './order-detail/order-detail.component';
//
const routes: Routes = [
    {
        path: "",
        component: UserMainComponent,
        children: [
            { path: "home", component: HomeComponent },
            { path: "discount", component: DiscountComponent },
            { path: "phone", component: PhoneComponent },
            { path: "other", component: OtherComponent },
            { path: "watch", component: WatchComponent },
            { path: "check-order", component: CheckOrderComponent },
            { path: "order-detail", component: OrderDetailComponent },
            { path: "cart", component: CartComponent },
            { path: "product-detail/:id", component: ProductDetailComponent },
            { path: "search/:query", component: SearchProductComponent },
            { path: "**", component:ErrorComponent},
        ],
    },
    { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
