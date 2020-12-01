import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

//component
import { LoaderComponent  } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { NotifySnackBarComponent } from './components/notify-snack-bar/notify-snack-bar.component';
import { SliderComponent } from './components/slider/slider.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PageinatorComponent } from './components/pageinator/pageinator.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
//directive
import { PaserValueComponent } from './components/paser-value/paser-value.component';
import { InputImageComponent } from './components/input-image/input-image.component';

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
    InputImageComponent
  ],
  entryComponents:[
    MessageComponent,
    NotifySnackBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
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
    InputImageComponent
  ]
})
export class ShareModule { }
