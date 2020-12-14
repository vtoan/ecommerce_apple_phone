import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Order } from "src/app/models/IModels";
//service
import { OrderService } from "src/app/services/order.service";
import { ErrorService } from '../../services/error.service';

@Component({
    selector: "app-check-order",
    templateUrl: "./check-order.component.html",
    styleUrls: ["./check-order.component.scss"],
})
export class CheckOrderComponent implements OnInit {
    @ViewChild('image',{static:true})img:ElementRef;
    //
    title = "Check Order";
    isRequest: boolean = false;
    isRequesed:boolean = false;
    //
    order: Order;
    queryOrder = new FormControl("", Validators.required);

    constructor(
        private orderService: OrderService,
        ) {}

    ngOnInit() {}

    checkOrder(query: string) {
        this.img.nativeElement.style="display:none;";
        this.isRequest = true;
        this.orderService.get(this.queryOrder.value).subscribe(
            (val) => {
                this.order = val;
            },
            (err) => (this.order = null),
            () => (this.isRequest =  this.isRequesed = false)
        );
    }
}
