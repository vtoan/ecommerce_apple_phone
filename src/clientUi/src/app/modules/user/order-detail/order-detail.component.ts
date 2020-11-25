import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormControl, Validators } from "@angular/forms";

//module
import { Fee, MethodPay, Order, OrderDetail } from "src/app/models/IModels";
//service
import { CartService } from "src/app/services/cart.service";
import { MethodPayService } from "src/app/services/method-pay.service";
import { FeeService } from "src/app/services/fee.service";
import { OrderService } from "src/app/services/order.service";

@Component({
    selector: "app-order-detail",
    templateUrl: "./order-detail.component.html",
    styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
    @Input() order: Order;
    isLoaded: boolean = true;
    isRequest: boolean = false;
    isShowDetail: boolean = false;
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
        private cartService: CartService,
        private methodService: MethodPayService,
        private feeService: FeeService,
        private orderService: OrderService,
        private location: Location
    ) {}

    ngOnInit() {
        // this.order=this.item;
        //get prom point
        this.methodService.getList().subscribe(
            (val) => {
                this.listMethodPays = val;
            },
            (err) => this.redictToError()
        );
        //get fees
        this.feeService.getList().subscribe(
            (val) => {
                this.listFees = val;
            },
            (err) => this.redictToError()
        );
        //get ods data
        this.listItem = this.cartService.getCart();
        if (this.listItem || this.listItem.length == 0) this.isLoaded = true;
        this.quantityVal = this.cartService.getQuantity();
        this.listItem = this.order ? JSON.parse(this.order.orderItems) : [];
        this.calAmount(this.listItem);
    }

    onSubmit() {
        this.isRequest = true;
        const paymentId = this.methodPay.value;
        this.orderService.payment(this.order, paymentId).subscribe(
            (val) => {
                this.isShowDetail = true;
                this.isRequest = false;
            },
            (err) => console.log(err)
        );
    }

    // ========= method =========
    private calAmount(lsItems: OrderDetail[]) {
        this.totalAmountVal = lsItems.reduce(
            (accur, val) =>
                (accur +=
                    val.quantity *
                    (val.price -
                        (val.discount % 1 == 0
                            ? val.discount
                            : val.price * val.discount))),
            0
        );
        this.calPay();
    }

    private calPay() {
        this.totalPayVal =
            this.totalAmountVal -
            (this.promtionVal % 1 == 0
                ? this.promtionVal
                : this.totalAmountVal * this.promtionVal);
        let totalFee = this.listFees.reduce(
            (accur, val) =>
                (accur +=
                    val.cost % 1 == 0
                        ? val.cost
                        : this.totalAmountVal * val.cost),
            0
        );
        this.totalPayVal += totalFee;
    }

    private redictToError() {
        this.location.go("./error");
    }
}
