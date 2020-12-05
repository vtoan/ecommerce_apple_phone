import { Component, OnInit } from "@angular/core";
import { FacebookService, InitParams } from "ngx-facebook";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    title = "clientUi";

    
    constructor(private facebookService: FacebookService) {}
    ngOnInit(): void {
        this.initFacebookService();
    }
    // ========= use full ======
    private initFacebookService(): void {
        const initParams: InitParams = { xfbml: true, version: "v9.0" };
        this.facebookService.init(initParams);
    }
}
