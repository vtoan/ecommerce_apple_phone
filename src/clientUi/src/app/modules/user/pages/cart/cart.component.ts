import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { concat, Observable, of, Subject } from "rxjs";
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
import { ErrorService } from "../../services/error.service";
import { finalize } from "rxjs/operators";
import { AccountService } from "src/app/services/account.service";

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
    // listPromPoint: PromPoint[];
    listFees: Fee[];
    listItem: OrderDetail[];
    order: Order;
    //
    quantityVal: number = 0;
    totalAmountVal: number = 0;
    promtionVal: number = 0;
    totalPayVal: number = 0;
    listProvince: any[];
    listdDistrict: any[];
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
        private accountService: AccountService,
        private fb: FormBuilder,
        private errService: ErrorService
    ) {}
    // ========= event =========
    ngOnInit() {
        concat(
            this.getDataFee(),
            this.getDataPromBill(),
            // this.getDataPromPoint(),
            this.getDataCart(),
            this.getDataProvince()
        )
            .pipe(
                finalize(() => {
                    this.calOrder(this.listItem);
                    this.isLoaded = true;
                    this.getDataUser();
                })
            )
            .subscribe();
    }

    onSubmit() {
        if (this.questForm.invalid|| this.quantityVal <=0) return;
        this.isLoadOrder = true;
        window.scroll({ top: 0, behavior: "smooth" });
        let order: Order = this.questForm.getRawValue();
        order.orderItems = JSON.stringify(this.cartService.getCart());
        this.orderService.confirmOrder(order).subscribe((val) => {
            if (!val) this.errService.redirectError("Order invalid !");
            this.titlePage = "CONFIRM ORDER";
            this.order = val;
            this.isLoadOrder = false;
        });
    }

    onProvinceChange(province:string) {
        let arId = province.split(',');
        this.orderService.getListDistrict(Number(arId[0])).subscribe((val) => {
            if (!val) this.errService.redirectError("Can't get district");
            else this.listdDistrict = Object.values(val);
        });
    }

    onBackToCart() {
        this.titlePage = "CART SHOPPING";
        this.order = null;
        this.isLoadOrder = false;
    }

    onRemoveItem(id: string) {
        this.cartService.remove(id);
    }

    // ========= usefull =========
    //#region Get Data
    private getDataPromBill(): Observable<any> {
        let obs = new Subject();
        this.promService.getListOfBill().subscribe((val) => {         
            this.listPromBill = val;
            obs.complete();
        },er =>{
            this.errService.redirectError("Can't get bill promotions");
            obs.complete();
        });
        return obs;
    }

    private getDataFee(): Observable<any> {
        let obs = new Subject();
        this.feeService.getList().subscribe((val) => {
            this.listFees = val;
            obs.complete();
        }, er =>{
            this.errService.redirectError("Can't get fees");
            obs.complete();
        });
        return obs;
    }

    private getDataProvince(): Observable<any> {
        let obs = new Subject();
        this.orderService.getListProvice().subscribe((val) => {
            this.listProvince = Object.values(val);
            obs.complete();
        }, er=>{
            this.errService.redirectError("Can't get list province");
            obs.complete();
        });
        return obs;
    }

    private getDataCart(): Observable<any> {
        let obs = new Subject();
        //get ods
        this.listItem = this.cartService.getCart();
        console.log(this.listItem);
        // if (this.listItem || this.listItem.length == 0) return;
        this.quantityVal = this.cartService.getQuantity();
        //exec
        this.cartService.subject.subscribe((val) => {
            this.quantityVal = val.reduce(
                (accur, val) => (accur += val.quantity),
                0
            );
            this.calOrder(val);
        });
        obs.complete();
        return obs;
    }
    //#endregion

    private calOrder(listItem: OrderDetail[]) {
        //cat total order;
        let re = this.orderService.calTotalOrder(listItem);
        this.quantityVal = re[0];
        this.totalAmountVal = re[1];
        //
        this.promtionVal = this.orderService.calProm(
            this.totalAmountVal,
            this.quantityVal,
            this.listPromBill
        );
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

    private getDataUser(){
        let user = this.accountService.user
        if(!user) return;
        this.questForm.patchValue({
            "questName":user.name,
            "questPhone":user.phone,
            "questAddress":user.address,
            "questEmail":user.email,
        })
    }

}
