import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
//
import { Order } from "src/app/models/IModels";
import { OrderService } from "src/app/services/order.service";

@Component({
    selector: "app-order-detail-admin",
    templateUrl: "./order-detail-admin.component.html",
    styleUrls: ["./order-detail-admin.component.scss"],
})
export class OrderDetailAdminComponent implements OnInit {
    isLoaded: boolean = true;
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
        this.route.params.subscribe((params) => this.itemId == params["id"]);
        if (this.itemId)
            this.orderService.get(this.itemId).subscribe((val) => {
                if (val) this.order = null;
                this.order = val;
            });
        this.isLoaded = true;
    }



    onChangeStatus(index) {
        let idx = this.listStatus[index];
        if (!idx) return;
        this.orderService.updateStatus(this.order.id, index + 1).subscribe();

    }

    getStatus():string{
        let stt = this.order ? this.order.status : null;
        return stt ? this.listStatus[stt-1] : "Khong xac dinh";
    }

    //=========  help full =========
}
