import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
//Commponent
import { FeeComponent } from "./fee/fee.component";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CategoryComponent } from "./category/category.component";
import { InfoComponent } from "./info/info.component";
import { OrderComponent } from "./order/order.component";
import { OrderDetailAdminComponent } from "./order-detail-admin/order-detail-admin.component";
import { ProductComponent } from "./product/product.component";
import { PromotionComponent } from "./promotion/promotion.component";
import { PromotionDetailComponent } from "./promotion-detail/promotion-detail.component";
import { ProductTabComponent } from "./product-tab/product-tab.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { ImportComponent } from './import/import.component';
//
const routes: Routes = [
    {
        path: "admin",
        component: MainComponent,
        children: [
            { path: "dashboard", component: DashboardComponent },
            { path: "fee", component: FeeComponent },
            { path: "category", component: CategoryComponent },
            { path: "info", component: InfoComponent },
            { path: "order", component: OrderComponent },
            { path: "order-detail/:id", component: OrderDetailAdminComponent },
            { path: "product", component: ProductComponent },
            { path: "product-detail/:id", component: ProductTabComponent },
            { path: "product-detail", component: ProductTabComponent },
            { path: "promotion", component: PromotionComponent },
            {
                path: "promotion-detail/:type/:id",
                component: PromotionDetailComponent,
            },
            {
                path: "promotion-detail/:type",
                component: PromotionDetailComponent,
            },
            { path: "user", component: ListUserComponent },
            {
                path: "user-detail/:id",
                component: UserDetailComponent,
            },
            {
                path:"import",
                component:ImportComponent
            }
        ],
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
