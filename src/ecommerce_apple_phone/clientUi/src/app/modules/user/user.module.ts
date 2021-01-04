import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
//sub-module
import { UserRoutingModule } from "./user-routing.module";
import { ShareModule } from "../share/share.module";
import { MaterialModule } from "../material.module";

//components
import { BannerComponent } from "./components/banner/banner.component";
import { ListProductComponent } from "./components/list-product/list-product.component";
import { ProductComponent } from "./components/product/product.component";
//page-component
import { UserMainComponent } from "./user-main.component";
import { ErrorComponent } from "./pages/error/error.component";
import { HomeComponent } from "./pages/home/home.component";
import { CartComponent } from "./pages/cart/cart.component";
import { DiscountComponent } from "./pages/discount/discount.component";
import { PhoneComponent } from "./pages/phone/phone.component";
import { OtherComponent } from "./pages/other/other.component";
import { CheckOrderComponent } from "./pages/check-order/check-order.component";
import { WatchComponent } from "./pages/watch/watch.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { SearchProductComponent } from "./pages/search-product/search-product.component";

//services
import { ErrorService } from "./services/error.service";
import { CartService } from "./services/cart.service";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { ProductsRelateComponent } from './components/products-relate/products-relate.component';
import { ProductPostComponent } from './components/product-post/product-post.component';
import { ProductPromotionComponent } from './components/product-promotion/product-promotion.component';

@NgModule({
    declarations: [
        UserMainComponent,
        ErrorComponent,
        HomeComponent,
        ListProductComponent,
        CartComponent,
        ProductComponent,
        DiscountComponent,
        PhoneComponent,
        OtherComponent,
        CheckOrderComponent,
        WatchComponent,
        ProductDetailComponent,
        SearchProductComponent,
        BannerComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        ProductsRelateComponent,
        ProductPostComponent,
        ProductPromotionComponent,
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ShareModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [CartService, ErrorService],
})
export class UserModule {}
