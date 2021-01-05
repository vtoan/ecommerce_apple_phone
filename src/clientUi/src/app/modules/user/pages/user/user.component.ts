import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
    constructor(public accountService: AccountService) {}
    ngOnInit() {}
}
