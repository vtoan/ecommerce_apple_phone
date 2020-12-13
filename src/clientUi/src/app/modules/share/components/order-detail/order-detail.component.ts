import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
//module
import { Fee, MethodPay, Order, OrderDetail } from "src/app/models/IModels";
//service
import { MethodPayService } from "src/app/services/method-pay.service";
import { OrderService } from "src/app/services/order.service";
import { ErrorService } from "src/app/modules/user/services/error.service";

@Component({
    selector: "app-order-detail",
    templateUrl: "./order-detail.component.html",
    styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
    @Input() order: Order;
    //
    isLoaded: boolean = true;
    isRequest: boolean = false;
    isShowDetail: boolean = false;
    message: string="Order not found";
    //
    listFees: Fee[];
    listMethodPays: MethodPay[] = [];
    listItem: OrderDetail[];
    //
    quantityVal: number = 110;
    totalAmountVal: number = 110;
    totalPayVal: number = 0;
    promtionVal: number = 0;
    //
    methodPay = new FormControl(1, Validators.required);

    constructor(
        private methodService: MethodPayService,
        private orderService: OrderService,
        private errService: ErrorService,
    ) {}
    // ========= event =========
    ngOnInit() {
        //get prom point
        this.methodService.getList().subscribe(
            (val) => {
                if (!val) this.errService.redirectError("Can't get method pay");
                this.listMethodPays = val;
            }
        );
        //get fees
        if(!this.order.fees){
            this.showFail("Can't read Fee of Order")
            return;
        }
        this.listFees = JSON.parse(this.order.fees);
        //get ods data
        if(!this.order.orderItems){
            this.showFail("Can't read Item of Order")
            return;
        }
        this.listItem = JSON.parse(this.order.orderItems);
        this.promtionVal = Number(this.order.promotion) || 0;
        if(!this.listItem) this.showFail("Item of Order is empty")
        else this.calOrder(this.listItem);
    }

    onSubmit() {
        this.isRequest = true;
        const paymentId = this.methodPay.value;
        this.orderService.payment(this.order, paymentId).subscribe(
            (val) => {
                this.isShowDetail = true;
                this.isRequest = false;
                this.onSuccesOrder();
            },
            (err) => console.log(err)
        );
    }

    // ========= method =========

    private calOrder(listItem: OrderDetail[]) {
        //cat total order;
        let re = this.orderService.calTotalOrder(listItem);
        this.quantityVal = re[0];
        this.totalAmountVal = re[1];
        //
        this.totalPayVal =
            this.totalAmountVal -
            (this.promtionVal % 1 == 0
                ? this.promtionVal
                : this.totalAmountVal * this.promtionVal);

        // let totalFee = this.orderService.calFee(
        //     this.totalAmountVal - this.promtionVal,
        //     this.listFees
        // );
        this.totalPayVal += 0;
    }
    private onSuccesOrder() {}

    private showFail(msg: string){
        this.message=msg;
            this.order =null;
    }
}
