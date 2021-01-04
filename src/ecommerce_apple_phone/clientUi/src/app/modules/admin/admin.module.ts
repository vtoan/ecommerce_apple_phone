import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//sub - module
import { AdminRoutingModule } from "./admin-routing.module";
import { ShareModule } from "../share/share.module";
import { MaterialModule } from "../material.module";
import { SatDatepickerModule, SatNativeDateModule } from "saturn-datepicker";
//
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MainComponent } from "./main.component";
import { FeeComponent } from "./components/fee/fee.component";
import { CategoryComponent } from "./components/category/category.component";
import { InfoComponent } from "./components/info/info.component";
import { OrderComponent } from "./components/order/order.component";
import { ProductComponent } from "./components/product/product.component";
import { PromotionComponent } from "./components/promotion/promotion.component";
import { PostComponent } from "./components/post/post.component";
import { FeedbackComponent } from "./components/feedback/feedback.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { ProductTabComponent } from "./components/product-tab/product-tab.component";
import { OrderDetailAdminComponent } from "./components/order-detail-admin/order-detail-admin.component";
import { PromotionDetailComponent } from "./components/promotion-detail/promotion-detail.component";
import { ListUserComponent } from "./components/list-user/list-user.component";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { ProductAttributeComponent } from "./components/product-attribute/product-attribute.component";
import { ImportComponent } from "./components/import/import.component";
import { ImportService } from "./services/import.service";
import { ImportItemComponent } from "./components/import-item/import-item.component";
import { ImportDetailComponent } from "./components/import-detail/import-detail.component";
import { ImportDetailViewComponent } from "./components/import-detail-view/import-detail-view.component";

@NgModule({
    declarations: [
        MainComponent,
        FeeComponent,
        DashboardComponent,
        CategoryComponent,
        InfoComponent,
        OrderComponent,
        ProductComponent,
        PromotionComponent,
        PostComponent,
        FeedbackComponent,
        ProductDetailComponent,
        ProductTabComponent,
        OrderDetailAdminComponent,
        PromotionDetailComponent,
        ListUserComponent,
        UserDetailComponent,
        ProductAttributeComponent,
        ImportComponent,
        ImportItemComponent,
        ImportDetailComponent,
        ImportDetailViewComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ShareModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        SatDatepickerModule,
        SatNativeDateModule,
        BrowserAnimationsModule,
        // NgxChartsModule,
    ],
    providers: [ImportService],
})
export class AdminModule {}
