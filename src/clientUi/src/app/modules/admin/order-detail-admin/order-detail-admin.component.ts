import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { concat, Subject } from "rxjs";
import { finalize } from "rxjs/operators";
import { Container } from "src/app/models/container";
//
import { Order } from "src/app/models/IModels";
import { OrderService } from "src/app/services/order.service";

@Component({
    selector: "app-order-detail-admin",
    templateUrl: "./order-detail-admin.component.html",
    styleUrls: ["./order-detail-admin.component.scss"],
})
export class OrderDetailAdminComponent implements OnInit {
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
    };
    //
    listStatus: string[] = this.orderService.getListStatus();
    order: Order;
    itemId: number;
    //
    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        concat(
            of(
                this.route.params.subscribe((params) => {
                    this.itemId = Number(params["id"]);
                })
            ),
            this.getOrderData()
        )
            .pipe(finalize(() => (this.container.isLoaded = true)))
            .subscribe();

    }

    onChangeStatus(index) {
        let idx = this.listStatus[index];
        if (!idx) return;
        this.orderService.updateStatus(this.order.id, index).subscribe(val=>{
            this.order.status = index;
        });
    }

    getStatus(): string {
        let stt = this.order ? this.order.status : null;
        return stt !=null ? this.listStatus[stt] : "Unknown";
    }

    //=========  help full =========
    getOrderData() {
        let obs = new Subject();
        if (!this.itemId) obs.complete();
        this.orderService.get(this.itemId).subscribe(
            (val) => {
                if (val) this.order = null;
                this.order = val;
                obs.complete();
            },
            (er) => {
                this.container.isDataEmpty = true;
                obs.complete();
            }
        );
        return obs;
    }
}
