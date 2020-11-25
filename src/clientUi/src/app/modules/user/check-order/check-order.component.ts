import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatLabel } from '@angular/material/form-field';
//service
import { OrderService } from "src/app/services/order.service";

@Component({
    selector: "app-check-order",
    templateUrl: "./check-order.component.html",
    styleUrls: ["./check-order.component.scss"],
})
export class CheckOrderComponent implements OnInit {
    queryOrder = new FormControl("",Validators.required);

    constructor(private orderSerivce: OrderService) {}

    ngOnInit() {}

    checkOrder(query: string) {
        this.orderSerivce.getById(this.queryOrder.value);
    }
}
