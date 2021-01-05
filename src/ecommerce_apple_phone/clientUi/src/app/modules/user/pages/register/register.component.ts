import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent  {
    textError: string = "";
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    onRegister(name, email, password, rePassword) {
        if (!name || !email || !password || !rePassword) {
            this.textError = "Email or password not null";
            return;
        }
        if (password != rePassword) {
            this.textError = "Password anhd Re Password not correct";
            return;
        }
        this.accountService
            .add(name, email, password)
            .subscribe((val) => this.router.navigate(["login"]));
    }
}
