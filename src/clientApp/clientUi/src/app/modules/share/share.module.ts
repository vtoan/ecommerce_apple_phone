import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { LoaderComponent  } from './loader/loader.component';
import { MessageComponent } from './message/message.component';
import { NotifySnackBarComponent } from './notify-snack-bar/notify-snack-bar.component';

@NgModule({
  declarations: [
    LoaderComponent,
    MessageComponent,
    NotifySnackBarComponent
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
    NotifySnackBarComponent
  ]
})
export class ShareModule { }
