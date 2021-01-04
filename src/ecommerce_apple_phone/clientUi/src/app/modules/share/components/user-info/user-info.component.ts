import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { User } from "src/app/models/IModels";
import { AccountService } from "src/app/services/account.service";
import { DialogChangePassComponent } from "../dialog-change-pass/dialog-change-pass.component";

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
        phoneNumber: ["", Validators.required],
        address: [""],
    });
    constructor(
        public dialog: MatDialog,
        private accountService: AccountService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.accountService.get(this.userId).subscribe((val) => {
            this.userDetail = val;
            this.formValidate.patchValue(val);
        }, er => this.userDetail = null );
    }

    onSave(e) {
        if (this.formValidate.invalid) return;
        e.preventDefault();
        let user: User = this.formValidate.value;
        this.accountService.update(this.userId, user).subscribe((val) => {
            if (val) this.onSaved.emit();
        });
    }

    onChangePass() {
        const dialogRef = this.dialog.open(DialogChangePassComponent, {
            width: "350px",
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result)
                this.accountService
                    .changePassword(
                        this.userDetail.id,
                        result.password,
                        result.newPassword
                    )
                    .subscribe();
        });
    }

    onReset() {
        this.formValidate.patchValue(this.userDetail);
    }
}
