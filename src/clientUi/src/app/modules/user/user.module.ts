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
import { CartItemComponent } from "./components/cart-item/cart-item.component";
import { OrderDetailComponent } from "./components/order-detail/order-detail.component";
import { ProductComponent } from "./components/product/product.component";
//page-component
import { UserMainComponent } from "./user-main.component";
import { ErrorComponent } from "./page-components/error/error.component";
import { HomeComponent } from "./page-components/home/home.component";
import { CartComponent } from "./page-components/cart/cart.component";
import { DiscountComponent } from "./page-components/discount/discount.component";
import { PhoneComponent } from "./page-components/phone/phone.component";
import { OtherComponent } from "./page-components/other/other.component";
import { CheckOrderComponent } from "./page-components/check-order/check-order.component";
import { WatchComponent } from "./page-components/watch/watch.component";
import { ProductDetailComponent } from "./page-components/product-detail/product-detail.component";
import { SearchProductComponent } from "./page-components/search-product/search-product.component";

//services
import { ErrorService } from './services/error.service';

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
        CartItemComponent,
        OrderDetailComponent,
        BannerComponent,
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ShareModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [ ErrorService ],
})
export class UserModule {}
