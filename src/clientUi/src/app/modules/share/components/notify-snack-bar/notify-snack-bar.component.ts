import { Component, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
//
import {Message} from 'src/app/models/message';

@Component({
  selector: 'app-notify-snack-bar',
  templateUrl: './notify-snack-bar.component.html',
  styleUrls: ['./notify-snack-bar.component.scss'],
})
export class NotifySnackBarComponent  {

  constructor( 
    @Inject(MAT_SNACK_BAR_DATA) public data: Message
  ) { }

  

}
