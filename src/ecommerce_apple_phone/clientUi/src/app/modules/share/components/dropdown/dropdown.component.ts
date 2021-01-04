import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-dropdown",
    templateUrl: "./dropdown.component.html",
    styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent implements OnInit {
    @Input() listItem: string[];
    @Input() defName: string = "- Select- ";
    @Output() choose = new EventEmitter<number>();

    isShow: boolean = false;
    defaultName: string = "";

    constructor() {}

    ngOnInit() {
        this.defaultName = this.defName;
    }
}
