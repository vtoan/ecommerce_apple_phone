import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
    isShowMenuAdmin: boolean = false;
    private userId:string="ASdasd";
    constructor(
        public dialog: MatDialog,
        private accoutnService: AccountService,
        public router: Router) {
        // this.router.navigate(["admin/dashboard"]);
    }

    ngOnInit() {}

    // onChangePass(){
    //     const dialogRef = this.dialog.open(DialogChangepassComponent, {
    //         width: "350px",
    //     });
    //     dialogRef.afterClosed().subscribe((result) => {
    //         console.log(result);
    //         if (result) this.accoutnService.changePassword(this.userId, result.password,result.newPassword);
    //     });
    // }

    // onLogout(){
    //     this.accoutnService.logout(this.userId).subscribe(val =>{
    //         if(val) this.router.navigate([""]);
    //     })
    // }
}
