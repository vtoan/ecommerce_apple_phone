import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { User } from "src/app/models/IModels";
import { AccountService } from "src/app/services/account.service";
import { Container } from "../../../share/components/container/container.component";

@Component({
    selector: "app-user-detail",
    templateUrl: "./user-detail.component.html",
    styleUrls: ["./user-detail.component.scss"],
})
export class UserDetailComponent implements OnInit {
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
    };
    //
    itemId: string;

    constructor(
        private route: ActivatedRoute,
        private accountService: AccountService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe((parmas) => {
            this.itemId = parmas["id"];
            if (!this.itemId)
                this.container.displayText = "Can't get user ID !";
            this.container.isLoaded = true;
        });
    }

    redirectToBack() {
        this.router.navigate(["admin/user"]);
    }

    // ======== method =========
    
}
