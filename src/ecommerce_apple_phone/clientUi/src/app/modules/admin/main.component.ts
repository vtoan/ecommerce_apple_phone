import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
    isShowMenuAdmin: boolean = false;
    constructor(
        public dialog: MatDialog,
        public router: Router
    ) {
        this.router.navigate(["admin/dashboard"]);
    }
    ngOnInit() {}
}
