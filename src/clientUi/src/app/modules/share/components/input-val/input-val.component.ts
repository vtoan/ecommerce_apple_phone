import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, } from "@angular/forms";

@Component({
    selector: "input-val",
    templateUrl: "./input-val.component.html",
    styleUrls: ["./input-val.component.scss"],
})
export class InputValComponent implements OnInit {
    isValid:boolean = true;
    @Input() fmGroup: FormGroup;
    @Input() fmControlName: string;
    @Input() inputError: string = "This field is required";
    @Input() inputType: string="text";
    @Input() inputHint: string ="Enter something...";
    @Input() classNames: string="w-60";
    @Input() isRead:boolean= false;
    @Input() isRequired:boolean = false;
    constructor() {}

    ngOnInit() {
        if(!this.fmGroup || !this.fmControlName){
            this.isValid = false;
        }
    }
}
