import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/models/IModels';
import { AccountService } from 'src/app/services/account.service';
import { DialogChangePassComponent } from '../dialog-change-pass/dialog-change-pass.component';

@Component({
    selector: "app-user-action",
    templateUrl: "./user-action.component.html",
    styleUrls: ["./user-action.component.scss"],
})
export class UserActionComponent implements OnInit {

    @Output()onUserDetail =  new EventEmitter<User>();

    isSignIned:boolean =false;
    returnUrl:string="/";
    user:User;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.accountService.obs.subscribe(val =>{
            this.isSignIned = true;
            this.user = val;
        },
        er => {
            this.isSignIned = false;
            this.user = null;
        })
    }

    onSignIn(){
        this.returnUrl = this.router.url;
        this.router.navigate(["login",this.returnUrl]);
    }

    onChangePass() {
        const dialogRef = this.dialog.open(DialogChangePassComponent, {
            width: "350px",
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result) this.accountService.changePassword(this.user.id, result.password,result.newPassword);
        });
    }

    onLogout() {
        this.accountService.logout(this.user.id).subscribe(val =>{
            if(val) this.router.navigate([""]);
        })
    }

    onShowDetail(){
        this.onUserDetail.emit(this.user);
    }


}
