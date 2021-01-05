import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: "app-dialog-change-pass",
    templateUrl: "./dialog-change-pass.component.html",
    styleUrls: ["./dialog-change-pass.component.scss"],
})
export class DialogChangePassComponent implements OnInit {
    textError: string = "";
    constructor(
        public dialogRef: MatDialogRef<DialogChangePassComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}
    ngOnInit(): void {
        this.data = {
            password: "",
            newPassword: "",
            rePassword: "",
        };
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        console.log(this.data);
        if (this.data.newPassword != this.data.rePassword) {
            return;
        }
        this.dialogRef.close({
            password: this.data.password,
            newPassword: this.data.newPassword,
        });
    }
}
