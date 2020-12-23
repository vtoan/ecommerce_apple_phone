import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//sub - module
import { AdminRoutingModule } from "./admin-routing.module";
import { ShareModule } from "../share/share.module";
import { MaterialModule } from "../material.module";
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
//
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainComponent } from "./main/main.component";
import { FeeComponent } from "./fee/fee.component";
import { CategoryComponent } from "./category/category.component";
import { InfoComponent } from "./info/info.component";
import { OrderComponent } from "./order/order.component";
import { ProductComponent } from "./product/product.component";
import { PromotionComponent } from "./promotion/promotion.component";
import { PostComponent } from "./post/post.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductTabComponent } from "./product-tab/product-tab.component";
import { OrderDetailAdminComponent } from './order-detail-admin/order-detail-admin.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ProductAttributeComponent } from './product-attribute/product-attribute.component';
import { ImportComponent } from './import/import.component';
import { ImportService } from './services/import.service';
import { ImportItemComponent } from './import-item/import-item.component';

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
