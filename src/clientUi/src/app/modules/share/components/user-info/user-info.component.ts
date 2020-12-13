import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { User } from "src/app/models/IModels";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: "app-user-info",
    templateUrl: "./user-info.component.html",
    styleUrls: ["./user-info.component.scss"],
})
export class UserInfoComponent implements OnInit {
    @Input() userId: string;
    @Output() onSaved = new EventEmitter();
    //
    userDetail: User;
    //
    formValidate = this.fb.group({
        name: ["", Validators.required],
        phone: ["", Validators.required],
        address: [""],
        email: ["", Validators.required],
    });
    constructor(
        private accountService: AccountService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.getUserData();
    }

    onSave(e){
        if (this.formValidate.invalid) return;
        e.preventDefault();
        let user:User =  this.formValidate.value;
        this.updateUserData(user);
    }   

    onReset(){
        this.formValidate.patchValue(this.userDetail);
    }

    // ======== method =========
    getUserData() {
        this.accountService.get(this.userId).subscribe((val) => {
            if (val) {
                this.userDetail = val;
                this.formValidate.patchValue(val);
            }
        });
    }

    updateUserData(user) {
        this.accountService.update(this.userId, user).subscribe((val) => {
            if (val) this.onSaved.emit();
        });
    }
}
