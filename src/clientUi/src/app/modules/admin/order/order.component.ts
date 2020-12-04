import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { concat, of } from "rxjs";
import * as dayjs from "dayjs";

// model
import { MethodPay, Order } from "src/app/models/IModels";
// service
import { OrderService } from "src/app/services/order.service";
import { MethodPayService } from "src/app/services/method-pay.service";
import { finalize } from "rxjs/operators";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    //
    isLoaded: boolean = false;
    //

    dateRange = {
        begin: new Date(),
        end: dayjs().subtract(30, "day").toDate(),
    };
    //
    listPay: MethodPay[];
    listOrder: Order[];
    listStatus: string[] = [
        "Chua xac nhan",
        "Da xac nhan",
        "Dang giao",
        "Hoan thanh",
    ];
    //
    tableData = new MatTableDataSource();
    constructor(
        private orderService: OrderService,
        private payService: MethodPayService
    ) {}

    ngOnInit() {
        concat(
            of(this.getDataMethodPay()),
            of(this.getDataOrder(this.dateRange.begin, this.dateRange.end))
        )
            .pipe(finalize(() => (this.isLoaded = true)))
            .subscribe();
    }

    ngAfterViewInit(): void {
        this.tableData.paginator = this.paginator;
    }

    onChangeStaus(index, item: Order) {
        let idx = this.listStatus[index];
        if (!idx) return;
        this.changeStatus(item.id, index + 1);
    }

    onChangeDate() {
        this.isLoaded = false;
        of(this.getDataOrder(this.dateRange.begin, this.dateRange.end)).pipe(
            finalize(() => (this.isLoaded = true))
        ).subscribe();
    }

    getStatus(item: Order) {
        let itemStt = item.status;
        if (!itemStt) return "KHong xac dinh";
        return this.listStatus[itemStt - 1];
    }

    getMethodPay(item: Order) {
        let payId = item.methodPayId;
        if (!payId) return "KHong xac dinh";
        let pay = this.listPay.find((s) => s.id == payId);
        return pay ? pay.name : "Khong xac dinh";
    }

    getUser(item: Order) {
        let userId = item.userId;
        if (!userId) return "KHong xac dinh";
        return userId == -1 ? "Khach le" : "KHTT";
    }

    // ======== Use full =========

    private getDataOrder(start, end) {
        this.orderService.getList(start, end).subscribe((val) => {
            this.listOrder = val;
            this.tableData.data = this.listOrder;
            this.tableData._updateChangeSubscription();
        });
    }

    private getDataMethodPay() {
        this.payService.getList().subscribe((val) => (this.listPay = val));
    }

    private changeStatus(id: number, status: number) {
        this.orderService.updateStatus(id, status).subscribe();
    }
}
