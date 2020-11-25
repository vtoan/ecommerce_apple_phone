import { Injectable } from "@angular/core";
import { Observable, of, Subject, throwError } from "rxjs";
import { Order } from '../models/IModels';

@Injectable({
    providedIn: "root",
})
export class OrderService {
    constructor() {}

    getById(id: string) {
        console.log(id);
    }

    getListProvice(): Observable<any> {
        return of(["sdad", "sadsa", "asdsa"]);
    }

    getListDistrict(id: number): Observable<any> {
        return of(["sdad", "sadsa", "asdsa"]);
    }

    confirmOrder(order:Order):Observable<Order>{
        let sub = new Subject<Order>();
        setTimeout(() => {
            sub.next(order)
        }, 2000);
        return sub;
    }

    payment(order:Order, paymentId:number):Observable<boolean>{
        let sub = new Subject<boolean>();
        setTimeout(() => {
            sub.next(true)
        }, 2000);
        return sub;
    }
}
