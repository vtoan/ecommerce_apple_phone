import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { User } from "src/app/models/IModels";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: "app-user-action",
    templateUrl: "./user-action.component.html",
    styleUrls: ["./user-action.component.scss"],
})
export class UserActionComponent implements OnInit {
    @Input() urlDetail: string;
    isSignIned: boolean = false;
    returnUrl: string = "/";
    user: User;
    //
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        console.log("object");
        this.user = this.accountService.user;
        if (this.user) this.isSignIned = true;
        this.accountService.obs.subscribe(
            (val) => {
                this.isSignIned = true;
                this.user = val;
            },
            (er) => {
                this.isSignIned = false;
                this.user = null;
            }
        );
    }

    onSignIn() {
        this.returnUrl = this.router.url;
        this.router.navigate(["login", this.returnUrl]);
    }

    onLogout() {
        this.accountService.logout().subscribe(
            (val) => {
                this.user = null;
                this.router.navigate([""]);
            },
            (er) => this.accountService.obs.error("Can't login")
        );
    }
    onShowDetail() {
        this.router.navigate([this.urlDetail]);
        // location.assign(this.urlDetail+"/"+this.user.id);
    }
}
