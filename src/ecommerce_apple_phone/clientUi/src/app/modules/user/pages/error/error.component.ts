import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router"
//service

@Component({
    selector: "app-error",
    templateUrl: "./error.component.html",
    styleUrls: ["./error.component.scss"],
})
export class ErrorComponent implements OnInit {
    title: string = "";
    message: string = "";
    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
       this.route.params.subscribe(params => {
            this.title =params["title"];
            this.message = params["message"];
       })
    }
}
