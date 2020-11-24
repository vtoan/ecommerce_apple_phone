import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { LoaderComponent  } from './loader/loader.component';
import { MessageComponent } from './message/message.component';
import { NotifySnackBarComponent } from './notify-snack-bar/notify-snack-bar.component';
import { SliderComponent } from './slider/slider.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { PageinatorComponent } from './pageinator/pageinator.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    LoaderComponent,
    MessageComponent,
    NotifySnackBarComponent,
    SliderComponent,
    DropdownComponent,
    PageinatorComponent,
    BreadcrumbComponent
  ],
  entryComponents:[
    MessageComponent,
    NotifySnackBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoaderComponent,
    MessageComponent,
    NotifySnackBarComponent,
    SliderComponent,
    DropdownComponent,
    PageinatorComponent,
    BreadcrumbComponent
  ]
})
export class ShareModule { }
