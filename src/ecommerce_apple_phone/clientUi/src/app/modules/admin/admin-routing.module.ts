import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
//Commponent
import { FeeComponent } from "./components/fee/fee.component";
import { MainComponent } from "./main.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CategoryComponent } from "./components/category/category.component";
import { InfoComponent } from "./components/info/info.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderDetailAdminComponent } from "./components/order-detail-admin/order-detail-admin.component";
import { ProductComponent } from "./components/product/product.component";
import { PromotionComponent } from "./components/promotion/promotion.component";
import { PromotionDetailComponent } from "./components/promotion-detail/promotion-detail.component";
import { ProductTabComponent } from "./components/product-tab/product-tab.component";
import { ListUserComponent } from "./components/list-user/list-user.component";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { ImportComponent } from "./components/import/import.component";
import { ImportDetailComponent } from "./components/import-detail/import-detail.component";
import { ImportDetailViewComponent } from "./components/import-detail-view/import-detail-view.component";
//
import { AdminAuthService } from "./services/admin-auth.service";
import { SaleAuthService } from "./services/sale-auth.service";
import { StockAuthService } from "./services/stock-auth.service";
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
                path: "import",
                component: ImportComponent,
            },
            {
                path: "import-detail",
                component: ImportDetailComponent,
            },
            {
                path: "import-detail-view/:id",
                component: ImportDetailViewComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[SaleAuthService,StockAuthService]
})
export class AdminRoutingModule {}
