import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-container",
    templateUrl: "./container.component.html",
    styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
    @Input() config: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "Not found data !",
    };

    constructor() {}

    ngOnInit() {
        // if(this.config.displayText!=null) this.config.isDataEmpty = true;
        // console.log(this.config);
    }
}

export interface Container {
    isLoaded: boolean;
    isDataEmpty: boolean;
    displayText?: string;
}
