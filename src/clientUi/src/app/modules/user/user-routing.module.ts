import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
//component
import { UserMainComponent } from "./user-main.component";
import { ErrorComponent } from "./page-components/error/error.component";
import { HomeComponent } from "./page-components/home/home.component";
import { DiscountComponent } from "./page-components/discount/discount.component";
import { PhoneComponent } from "./page-components/phone/phone.component";
import { OtherComponent } from "./page-components/other/other.component";
import { WatchComponent } from "./page-components/watch/watch.component";
import { CheckOrderComponent } from "./page-components/check-order/check-order.component";
import { CartComponent } from "./page-components/cart/cart.component";
import { ProductDetailComponent } from "./page-components/product-detail/product-detail.component";
import { SearchProductComponent } from "./page-components/search-product/search-product.component";
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
            { path: "cart", component: CartComponent },
            { path: "product-detail/:id", component: ProductDetailComponent },
            { path: "search/:query", component: SearchProductComponent },
            { path: "error/:title/:message", component: ErrorComponent },
            { path: "error/:title", component: ErrorComponent },
            { path: "error", component: ErrorComponent },
            { path: "**", redirectTo: "/error", pathMatch: "full" },
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
