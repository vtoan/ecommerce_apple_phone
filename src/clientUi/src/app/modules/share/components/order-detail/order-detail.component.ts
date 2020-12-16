import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
//module
import { Fee, MethodPay, Order, OrderDetail } from "src/app/models/IModels";
//service
import { OrderService } from "src/app/services/order.service";
import { ErrorService } from "src/app/modules/user/services/error.service";
import { Router } from "@angular/router";
import { CartService } from "src/app/modules/user/services/cart.service";

@Component({
    selector: "app-order-detail",
    templateUrl: "./order-detail.component.html",
    styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
    @Input() order: Order;
    @Input() isShowDetail:boolean = false;
    //
    isLoaded: boolean = true;
    isRequest: boolean = false;
    // isShowDetail: boolean = false;
    message: string="Order not found";
    //
    listFees: Fee[];
    listMethodPays: MethodPay[] = [];
    listItem: OrderDetail[];
    //
    quantityVal: number = 0;
    totalAmountVal: number = 0;
    totalPayVal: number = 0;
    promtionVal: number = 0;
    //
    methodPay = new FormControl(1, Validators.required);

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private errService: ErrorService,
        private router:Router
    ) {}
    // ========= event =========
    ngOnInit() {
        if(!this.order) return;
        //get prom point
        this.orderService.getListMethodPay().subscribe(
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
        this.methodPay.setValue(this.order.methodPayId);
        this.promtionVal = Number(this.order.promotion) || 0;
        if(!this.listItem) this.showFail("Item of Order is empty")
        else this.calOrder(this.listItem);
    }

    onSubmit() {
        this.isRequest = true;
        const paymentId = this.methodPay.value;
        this.orderService.payment(this.order, paymentId).subscribe(
            (val) => {
                this.cartService.clear();
                this.isShowDetail = true;
                this.isRequest = false;
                this.router.navigate(["home"]);
            },
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
        let totalFee = this.orderService.calFee(
            this.totalPayVal,
            this.listFees
        );
        this.totalPayVal += totalFee;
    }

    private showFail(msg: string){
        this.message=msg;
            this.order =null;
    }
}
