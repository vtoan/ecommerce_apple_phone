import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    textError:string ="";
    returnUrl:string ="/";
    constructor(
        private route: ActivatedRoute,
        private router:Router ,
        private accountService: AccountService
        ) {}

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this.returnUrl = params["returnUrl"];
        });
    }

    onLogin(email, password) {
        if(!email || !password){
            this.textError ="Email or password not null"
        }
        else{
            this.accountService.login(email,password).subscribe(val => {
                if(!this.returnUrl) this.returnUrl="/";
                this.router.navigate([this.returnUrl]);
            } )
        }

    }
}
