import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
//Service
import {MessageService} from 'src/app/services/message.service';
//Component
import {NotifySnackBarComponent} from '../notify-snack-bar/notify-snack-bar.component';
//Models
import {Message} from 'src/app/models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit  {
	horizontalPosition: MatSnackBarHorizontalPosition = 'end';
	verticalPosition: MatSnackBarVerticalPosition = 'bottom';

	constructor(
		public message: MessageService,
		private _snackBar: MatSnackBar){}

	//Method
	ngOnInit(): void {
		this.message.obs.subscribe(val =>{
			this.openSnackBar(val);
		});
	}

	private openSnackBar(mes:Message) {
		this._snackBar.openFromComponent(NotifySnackBarComponent, {
			data:mes,
			duration: 500,
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}

}

