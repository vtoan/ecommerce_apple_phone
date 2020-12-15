import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
//component
import { UserMainComponent } from "./user-main.component";
import { ErrorComponent } from "./pages/error/error.component";
import { HomeComponent } from "./pages/home/home.component";
import { DiscountComponent } from "./pages/discount/discount.component";
import { PhoneComponent } from "./pages/phone/phone.component";
import { OtherComponent } from "./pages/other/other.component";
import { WatchComponent } from "./pages/watch/watch.component";
import { CheckOrderComponent } from "./pages/check-order/check-order.component";
import { CartComponent } from "./pages/cart/cart.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { SearchProductComponent } from "./pages/search-product/search-product.component";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent }  from './pages/user/user.component';
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
            { path: "login",component:LoginComponent},
            { path: "login/:returnUrl",component:LoginComponent},
            { path: "register",component:RegisterComponent},
            { path: "user",component:UserComponent},
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
