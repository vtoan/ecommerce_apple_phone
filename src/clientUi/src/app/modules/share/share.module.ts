import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
//component
import { LoaderComponent  } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { NotifySnackBarComponent } from './components/notify-snack-bar/notify-snack-bar.component';
import { SliderComponent } from './components/slider/slider.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PageinatorComponent } from './components/pageinator/pageinator.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CartItemComponent }  from './components/cart-item/cart-item.component';
import { OrderDetailComponent }  from './components/order-detail/order-detail.component';
//directive
import { PaserValueComponent } from './components/paser-value/paser-value.component';
import { InputImageComponent } from './components/input-image/input-image.component';
import { ContainerComponent } from './components/container/container.component';
import { InputValComponent } from './components/input-val/input-val.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { DialogChangepassComponent } from './components/dialog-changepass/dialog-changepass.component';

@NgModule({
  declarations: [
    LoaderComponent,
    MessageComponent,
    NotifySnackBarComponent, 
    SliderComponent,
    DropdownComponent,
    PageinatorComponent,
    BreadcrumbComponent,
    PaserValueComponent,
    InputImageComponent,
    CartItemComponent,
    OrderDetailComponent,
    ContainerComponent,
    InputValComponent,
    DialogComponent,
    UserInfoComponent,
    DialogChangepassComponent,
  ],
  entryComponents:[
    MessageComponent,
    NotifySnackBarComponent,
    DialogComponent,
    DialogChangepassComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    LoaderComponent,
    MessageComponent,
    NotifySnackBarComponent,
    SliderComponent,
    DropdownComponent,
    PageinatorComponent,
    BreadcrumbComponent,
    PaserValueComponent,
    InputImageComponent,
    CartItemComponent,
    OrderDetailComponent,
    ContainerComponent,
    InputValComponent,
    UserInfoComponent,
    DialogChangepassComponent,

  ]
})
export class ShareModule { }
