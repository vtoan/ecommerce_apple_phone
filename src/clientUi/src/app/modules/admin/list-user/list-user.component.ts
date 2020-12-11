import { Component, OnInit } from "@angular/core";
import { concat, Subject } from "rxjs";
import { finalize } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
//model
import { User } from "src/app/models/IModels";
import { Container } from "src/app/modules/share/components/container/container.component";
//sevices
import { AccountService } from "src/app/services/account.service";
import { RoleService } from "src/app/services/role.service";
import { MessageService } from "src/app/services/message.service";

@Component({
    selector: "app-list-user",
    templateUrl: "./list-user.component.html",
    styleUrls: ["./list-user.component.scss"],
})
export class ListUserComponent implements OnInit {
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "",
    };
    //asset
    listUser: User[];
    listRole: string[];
    tableData = new MatTableDataSource();

    constructor(
        private accountService: AccountService,
        private roleService: RoleService,
        private messService: MessageService
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
    //======= method =======
    getUserData() {
        let obs = new Subject();
        this.accountService.getList().subscribe((val:User[]) => {
            console.log(val);
            if (val ? val.length > 0: false) {
                this.listUser = val;
                this.tableData.data = this.listUser;
                this.tableData._updateChangeSubscription();
            } else this.container.isDataEmpty = true;
            obs.complete();
        });
        return obs;
    }

    getRoleData() {
        let obs = new Subject();
        this.roleService.getList().subscribe((val) => {
            if (val ? val.length > 0: false) this.listRole = val;
            else this.container.isDataEmpty = true;
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
}
