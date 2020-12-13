import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-dialog-changepass",
    templateUrl: "./dialog-changepass.component.html",
    styleUrls: ["./dialog-changepass.component.scss"],
})
export class DialogChangepassComponent implements OnInit {
    textError: string = "";
    constructor(
        public dialogRef: MatDialogRef<DialogChangepassComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}
    ngOnInit(): void {
        this.data ={
            password:"",
            newPassword:"",
            rePassword:""
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.data.newPassword != this.data.rePassword) {
            return;
        }
        this.dialogRef.close({
            password: this.data.password,
            newPassword: this.data.newPassword,
        });
    }
}
