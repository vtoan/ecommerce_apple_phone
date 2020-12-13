import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-dialog",
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
    textError:string="";
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogPass
    ) {}
    ngOnInit(): void {
     
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit():void{
        if(this.data.password!=this.data.rePassword){
            this.textError="Password incorrect";
            return;
        }
        this.dialogRef.close({
            email:this.data.email,
            password: this.data.password
        });
    }
}

export interface DialogPass {
    title:string;
    email:string;
    password:string;
    rePassword:string;
    noEmail?:boolean
}
