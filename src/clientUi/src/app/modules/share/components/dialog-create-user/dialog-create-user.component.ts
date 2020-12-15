import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: "app-dialog-create-user",
    templateUrl: "./dialog-create-user.component.html",
    styleUrls: ["./dialog-create-user.component.scss"],
})
export class DialogCreateUserComponent implements OnInit {
    textError: string = "";
    constructor(
        public dialogRef: MatDialogRef<DialogCreateUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}
    ngOnInit(): void {
        this.data = {
            name:"",
            email: "",
            password: "",
            rePassword: "",
        };
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.data.password != this.data.rePassword) {
            this.textError = "Password incorrect";
            return;
        }
        this.dialogRef.close({
            name:this.data.name,
            email: this.data.email,
            password: this.data.password,
        });
    }
}
