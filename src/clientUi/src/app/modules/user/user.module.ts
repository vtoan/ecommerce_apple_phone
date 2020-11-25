import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [UserMainComponent, ErrorComponent, HomeComponent, ListProductComponent, CartComponent, ProductComponent, DiscountComponent, PhoneComponent, OtherComponent, CheckOrderComponent, WatchComponent, ProductDetailComponent, SearchProductComponent, CartItemComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
  ]

})
export class UserModule { }
