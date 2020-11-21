import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { LoaderComponent  } from './loader/loader.component';
import { MessageComponent } from './message/message.component';
import { NotifySnackBarComponent } from './notify-snack-bar/notify-snack-bar.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    LoaderComponent,
    MessageComponent,
    NotifySnackBarComponent,
    SliderComponent
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
    SliderComponent
  ]
})
export class ShareModule { }
