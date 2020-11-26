import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, Validators } from "@angular/forms";
//module
import {
    Fee,
    Order,
    OrderDetail,
    PromBill,
    PromPoint,
} from "src/app/models/IModels";
//service
import { PromotionService } from "src/app/services/promotion.service";
import { CartService } from "src/app/modules/user/services/cart.service";
import { FeeService } from "src/app/services/fee.service";
import { OrderService } from "src/app/services/order.service";
import { ErrorService } from '../../services/error.service';

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
    isLoaded: boolean = false;
    isLoadOrder: boolean = false;
    titlePage: string = "CART SHOPPING";
    //
    listPromBill: PromBill[];
    listPromPoint: PromPoint[];
    listFees: Fee[];
    listItem: OrderDetail[];
    order: Order;
    //
    quantityVal: number = 0;
    totalAmountVal: number = 0;
    totalPayVal: number = 0;
    promtionVal: number = 0;
    listProvince: any[] = ["HCM", "SDAS", "SDASD"];
    listdDistrict: any[] = ["asdas", "asdas", "sadasd"];
    //forom
    questForm = this.fb.group({
        questName: ["", Validators.required],
        questPhone: ["", Validators.required],
        questProvince: ["", Validators.required],
        questDistrict: ["", Validators.required],
        questEmail: [
            "",
            Validators.compose([Validators.required, Validators.email]),
        ],
        questAddress: ["", Validators.required],
        note: [""],
    });
    // ========= ctor =========
    constructor(
        private promService: PromotionService,
        private cartService: CartService,
        private feeService: FeeService,
        private orderService: OrderService,
        private location: Location,
        private fb: FormBuilder,
        private errService: ErrorService
    ) {}
    // ========= event =========
    ngOnInit() {
        //get prom bill
        this.promService.getListOfBill().subscribe(
            (val) => {
                this.listPromBill = val;
            },
            (err) => this.errService.redirectError("Can't get bill promotions")
        );
        //get prom point
        this.promService.getListOfPoint().subscribe(
            (val) => {
                this.listPromPoint = val;
            },
            (err) => this.errService.redirectError("Can't get point promotions")
        );
        //get fees
        this.feeService.getList().subscribe(
            (val) => {
                this.listFees = val;
            },
            (err) => this.errService.redirectError("Can't get fees")
        );
        //get province
        this.orderService.getListProvice().subscribe(
            (val) => {
                this.listProvince = val;
            },
            (err) => this.errService.redirectError("Can't get list province")
        );
        //get ods
        this.listItem = this.cartService.getCart();
        if (this.listItem || this.listItem.length == 0) this.isLoaded = true;
        this.quantityVal = this.cartService.getQuantity();
        //exec
        this.cartService.subject.subscribe((val) => {
            this.quantityVal = val.reduce(
                (accur, val) => (accur += val.quantity),
                0
            );
            console.log(val);
            this.calAmount(val);
        });
        this.calAmount(this.listItem);
        //init form
    }

    onSubmit() {
        if (this.questForm.invalid) return;
        this.isLoadOrder = true;
        window.scroll({ top: 0, behavior: "smooth" });
        let order: Order = this.questForm.getRawValue();
        order.orderItems = JSON.stringify(this.cartService.getCart());
        this.orderService.confirmOrder(order).subscribe(
            (val) => {
                this.titlePage = "CONFIRM ORDER";
                this.order = order;
            },
            (err) => this.errService.redirectError("Order invalid !")
        );
    }

    onProvinceChange(id) {
        this.orderService.getListDistrict(id).subscribe(
            (val) => {
                this.listdDistrict = val;
            },
            (err) => this.errService.redirectError("Can't get district")
        );
    }

    onBackToCart() {
        this.titlePage = "CART SHOPPING";
        this.order = null;
        this.isLoadOrder = false;
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
        this.calProm();
        this.calPay();
    }

    private calProm() {
        if (this.listPromBill.length == 0) {
            this.promtionVal = 0;
            return;
        }
        const quantity = this.cartService.getQuantity();
        for (const prom of this.listPromBill) {
            if (prom.conditionAmount >= 0 && prom.conditionAmount <= quantity) {
                this.promtionVal = prom.discount;
                break;
            }
            if (
                prom.conditionAmount >= 0 &&
                prom.conditionAmount <= this.totalAmountVal
            ) {
                this.promtionVal = prom.discount;
                break;
            }
        }
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
}
