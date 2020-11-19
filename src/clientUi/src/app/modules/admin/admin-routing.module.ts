import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//Commponent
import { FeeComponent } from './fee/fee.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { InfoComponent } from './info/info.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { PromotionComponent } from './promotion/promotion.component';
//
const routes: Routes = [
  { 
    path:"admin", component: MainComponent,
    children: [
      { path:"dashboard", component:DashboardComponent },
      { path:"fee", component:FeeComponent },
      { path:"category", component:CategoryComponent },
      { path:"info", component:InfoComponent },
      { path:"order", component:OrderComponent },
      { path:"product", component:ProductComponent },
      { path:"promotion", component:PromotionComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
