import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//sub-module
import { UserRoutingModule } from './user-routing.module';
import { ShareModule } from '../share/share.module';
import { MaterialModule } from '../material.module';
//component
import { UserMainComponent } from './user-main/user-main.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { DiscountComponent } from './discount/discount.component';
import { PhoneComponent } from './phone/phone.component';
import { OtherComponent } from './other/other.component';
import { CheckOrderComponent } from './check-order/check-order.component';
import { WatchComponent } from './watch/watch.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchProductComponent } from './search-product/search-product.component';

@NgModule({
  declarations: [UserMainComponent, ErrorComponent, HomeComponent, ListProductComponent, CartComponent, ProductComponent, DiscountComponent, PhoneComponent, OtherComponent, CheckOrderComponent, WatchComponent, ProductDetailComponent, SearchProductComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule,
    MaterialModule
  ],
  providers:[
  ]

})
export class UserModule { }
