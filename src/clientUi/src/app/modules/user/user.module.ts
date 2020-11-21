import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//sub-module
import { UserRoutingModule } from './user-routing.module';
import {ShareModule} from '../share/share.module';
//component
import { UserMainComponent } from './user-main/user-main.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [UserMainComponent, ErrorComponent, HomeComponent, ListProductComponent, CartComponent, ProductComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule
  ],
  providers:[
  ]

})
export class UserModule { }
