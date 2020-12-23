import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { concat, of, Subject } from "rxjs";
import * as dayjs from "dayjs";

// model
import { MethodPay, Order } from "src/app/models/IModels";
// service
import { OrderService } from "src/app/services/order.service";
import { finalize } from "rxjs/operators";
import { Container } from "src/app/models/container";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "Data is't found",
    };
    //
    dateRange = {
        begin:  dayjs().subtract(30, "day").toDate(),
        end: new Date(),
    };
    //
    listPay: MethodPay[];
    listOrder: Order[];
    listStatus: string[] = this.orderService.getListStatus();
    //
    tableData = new MatTableDataSource();
    constructor(private orderService: OrderService) {}

    ngOnInit() {
        this.getDataMethodPay();
        this.getDataOrder(this.dateRange.begin, this.dateRange.end)
            .pipe(
                finalize(() => {
                    this.container.isLoaded = true;
                })
            )
            .subscribe();
    }

    ngAfterViewInit(): void {
        this.tableData.paginator = this.paginator;
    }

    onChangeStaus(index, item: Order) {
        let idx = this.listStatus[index];
        if (!idx) return;
        this.orderService.updateStatus(item.id, index).subscribe();
    }

    onChangeDate() {
        this.container.isLoaded = false;
        of(this.getDataOrder(this.dateRange.begin, this.dateRange.end))
            .pipe(finalize(() => (this.container.isLoaded = true)))
            .subscribe();
    }

    getStatus(item: Order) {
        let itemStt = item.status;
        if (itemStt<0) return "Unknown";
        return this.listStatus[itemStt];
    }

    getMethodPay(item: Order) {
        let payId = item.methodPayId;
        let pay = this.listPay.find((s) => s.id == payId);
        return pay ? pay.name : "Unknown";
    }

    getUser(item: Order) {
        let userId = item.userId;
        return !userId ? "Quest" : "Member";
    }

    getProvince(item: Order){
        let provin = item.questProvince.split(',');
        return provin.length > 2 ? provin[1] : "Unknown";
    }

    // ======== Use full =========

    private getDataOrder(start, end) {
        let obs = new Subject();
        this.orderService.getList(start, end).subscribe(
            (val) => {
                this.listOrder = val;
                this.tableData.data = this.listOrder;
                this.tableData._updateChangeSubscription();
                obs.complete();
            },
            (er) => {
                this.container.isDataEmpty = true;
                obs.complete();
            }
        );
        return obs;
    }

    private getDataMethodPay() {
        this.orderService
            .getListMethodPay()
            .subscribe((val) => (this.listPay = val));
    }
}
