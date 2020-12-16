import { Component, OnInit } from "@angular/core";
import { concat, Subject } from "rxjs";
import { finalize } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
//model
import { User } from "src/app/models/IModels";
import { Container } from "src/app/modules/share/components/container/container.component";
//sevices
import { AccountService } from "src/app/services/account.service";
import { MessageService } from "src/app/services/message.service";
import { MatDialog } from "@angular/material";
import { DialogCreateUserComponent } from "../../share/components/dialog-create-user/dialog-create-user.component";

@Component({
    selector: "app-list-user",
    templateUrl: "./list-user.component.html",
    styleUrls: ["./list-user.component.scss"],
})
export class ListUserComponent implements OnInit {
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
    };
    //asset
    listUser: User[];
    listRole: string[];
    tableData = new MatTableDataSource();

    constructor(
        private accountService: AccountService,
        private messService: MessageService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        concat(this.getRoleData(), this.getUserData())
            .pipe(finalize(() => (this.container.isLoaded = true)))
            .subscribe();
    }

    onChangeRole(roleIndex: number, userId: string) {
        if (userId) this.changeRole(userId, this.listRole[0]);
        else this.messService.showFail("Data Incorrect");
    }

    onCreate(): void {
        const dialogRef = this.dialog.open(DialogCreateUserComponent, {
            width: "350px",
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result)
                this.addUser(result.name, result.email, result.password);
        });
    }

    onRemove(itemId: string) {
        this.container.isLoaded = false;
        this.accountService.remove(itemId).subscribe((val) => {
            this.container.isLoaded = true;
            if (val) location.reload();
        });
    }

    //======= method =======
    getUserData() {
        let obs = new Subject();
        this.accountService.getList().subscribe((val: User[]) => {
                this.listUser = val;
                this.tableData.data = this.listUser;
                this.tableData._updateChangeSubscription();
            obs.complete();
        }, er=> {
            this.container.isDataEmpty = true;
            obs.complete();
        });
        return obs;
    }

    getRoleData() {
        let obs = new Subject();
        this.accountService.getListRoles().subscribe((val) => {
            this.listRole = val;
            obs.complete();
        }, er =>{
            this.container.isDataEmpty = true;
            obs.complete();
        });
        return obs;
    }

    changeRole(userId: string, roleName: string) {
        let obs = new Subject();
        this.accountService.changeRole(userId, roleName).subscribe(() => {
            obs.complete();
        });
        return obs;
    }

    addUser(name: string, email: string, password: string) {
        this.accountService.add(name, email, password).subscribe((val) => {
            if (val) {
                this.tableData.data.unshift(val);
                this.tableData._updateChangeSubscription();
            }
        });
    }
}
