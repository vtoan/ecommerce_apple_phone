import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: "app-dialog-feedback",
    templateUrl: "./dialog-feedback.component.html",
    styleUrls: ["./dialog-feedback.component.scss"],
})
export class DialogFeedbackComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DialogFeedbackComponent>,
        @Inject(MAT_DIALOG_DATA) public userName
    ) {}

    ngOnInit() {
        if (!this.userName) this.userName = "Unknown";
    }

    onSubmit(content) {
        this.dialogRef.close(content);
    }

    onNoClick() {
        this.dialogRef.close();
    }
}
