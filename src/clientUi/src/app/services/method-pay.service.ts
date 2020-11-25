import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
//models
import { MethodPay } from "src/app/models/IModels";

@Injectable({
    providedIn: "root",
})
export class MethodPayService {
    constructor() {}

    getList(): Observable<MethodPay[]> {
        return of([
            {
                id: 1,
                name: "Paypal",
            },
            {
                id: 2,
                name: "Cash",
            },
        ]);
    }
}
