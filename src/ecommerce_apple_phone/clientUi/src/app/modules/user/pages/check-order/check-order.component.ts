import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { fakeAsync } from "@angular/core/testing";
import { FormControl, Validators } from "@angular/forms";
import { Order } from "src/app/models/IModels";
import { AccountService } from "src/app/services/account.service";
//service
import { OrderService } from "src/app/services/order.service";
import { ErrorService } from "../../services/error.service";

@Component({
    selector: "app-check-order",
    templateUrl: "./check-order.component.html",
    styleUrls: ["./check-order.component.scss"],
})
export class CheckOrderComponent implements OnInit {
    @ViewChild("image", { static: true }) img: ElementRef;
    //
    isRequest: boolean = false;
    isRequesed: boolean = false;
    isCancel: boolean = false;
    //
    order: Order;
    queryOrder = new FormControl("", Validators.required);

    constructor(private orderService: OrderService, private accSer:AccountService) {}

    ngOnInit() {}

    checkOrder(query: string) {
        this.img.nativeElement.style = "display:none;";
        this.isRequest = true;
        this.orderService.get(this.queryOrder.value).subscribe(
            (val) => {
                this.order = val;
                console.log(val);
                this.isCancel =( val.status == 1  && (this.accSer.user.id == val.userId)) ? true :false;
                console.log(this.isCancel);
                this.isRequest = false;
                this.isRequesed =true;
            },
            (err) => {
                this.order = null;
                this.isRequest = false;
                this.isRequesed =true;
            }
        );
    }
}
