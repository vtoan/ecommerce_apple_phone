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
  ],
  entryComponents:[
    MessageComponent,
    NotifySnackBarComponent
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
  ]
})
export class ShareModule { }
