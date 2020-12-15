import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
    textError: string = "";
    returnUrl: string = "/login";
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.returnUrl = params["returnUrl"];
        });
    }

    onRegister(name, email, password, rePassword) {
        if (!name|| !email || !password || !rePassword) {
            this.textError = "Email or password not null";
            return;
        }
        if (password != rePassword) {
            this.textError = "Password anhd Re Password not correct";
            return;
        }
        this.accountService.add(name, email, password).subscribe(
            (val) => {
                if (!this.returnUrl) this.returnUrl = "/";
                this.accountService.obs.next(val);
                this.router.navigate([this.returnUrl]);
            },
            (er) => this.accountService.obs.error("Can't register")
        );
    }
}
