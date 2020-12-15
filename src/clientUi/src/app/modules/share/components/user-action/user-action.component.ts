import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { User } from "src/app/models/IModels";
import { AccountService } from "src/app/services/account.service";
import { CookieService } from "ngx-cookie";


@Component({
    selector: "app-user-action",
    templateUrl: "./user-action.component.html",
    styleUrls: ["./user-action.component.scss"],
})
export class UserActionComponent implements OnInit {
    @Input() urlDetail: string;
    // @Output() onUserDetail = new EventEmitter<User>();
    isSignIned: boolean = false;
    returnUrl: string = "/";
    user: User;
    //
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private accountService: AccountService,
        private cookie :CookieService
    ) {}

    ngOnInit() {
        this.accountService.obs.subscribe(
            (val) => {
                this.isSignIned = true;
                this.user = val;
                console.log(val);
            },
            (er) => {
                this.isSignIned = false;
                this.user = null;
            }
        );
        let s = this.accountService.user;
    }

    onSignIn() {
        this.returnUrl = this.router.url;
        this.router.navigate(["login", this.returnUrl]);
    }

    onLogout() {
        this.accountService.logout().subscribe((val) => {
            if (val) this.router.navigate([""]);
        },er => this.accountService.obs.error("Can't login"));
    }
    onShowDetail() {
        this.router.navigate([this.urlDetail]);
    }
}
