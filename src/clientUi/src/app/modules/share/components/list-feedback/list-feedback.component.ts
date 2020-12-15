import { Container } from "src/app/models/container";
import { Component, Input, OnInit } from "@angular/core";
import { Feedback } from "src/app/models/IModels";
import { FeedbackService } from "src/app/services/feedback.service";
import { MatDialog } from "@angular/material";
import { DialogFeedbackComponent } from "../dialog-feedback/dialog-feedback.component";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: "app-list-feedback",
    templateUrl: "./list-feedback.component.html",
    styleUrls: ["./list-feedback.component.scss"],
})
export class ListFeedbackComponent implements OnInit {
    @Input() productId: string;
    @Input() editable: boolean =false;

    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "No feedback",
    };
    listFeedback: Feedback[];

    constructor(
        private accountSer: AccountService,
        private feedbackSer: FeedbackService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        if (!this.productId) {
            this.container.isDataEmpty = true;
            this.container.isLoaded = true;
            return;
        }
        this.feedbackSer.getList(this.productId).subscribe(
            (val) => {
                console.log(val);
                this.listFeedback = val;
                this.container.isDataEmpty = false;
                this.container.isLoaded = true;
            },
            (er) => {
                this.listFeedback = null;
                this.container.isDataEmpty = true;
                this.container.isLoaded = true;
            }
        );
    }

    onAdd() {
        const dialogRef = this.dialog.open(DialogFeedbackComponent, {
            width: "350px",
        });
        dialogRef.afterClosed().subscribe((result) => {
            let user = this.accountSer.getUserCurrent();
            let fback = {
                productId: this.productId,
                userId: user.id,
                userName: user.name,
                feedbackContent: result,
            };
            if (result) this.feedbackSer.add(fback).subscribe(val =>{
                console.log(val);
                this.listFeedback.push(val);
                this.container.isDataEmpty = false;
            });
        });
    }

    onDelete(fbackId){
        this.feedbackSer.delete(fbackId).subscribe(()=>{
           let idxFback =  this.listFeedback.findIndex(item => item.id==fbackId)
           this.listFeedback.splice(idxFback,1);
           if(this.listFeedback.length==0) this.container.isDataEmpty =true;
        })
    }
}
