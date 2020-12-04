import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Order } from "../models/IModels";
import { HttpInterceptorService } from "./http-interceptor.service";

@Injectable({
    providedIn: "root",
})
export class OrderService {
    private apiUrl = "api/order";
    private options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    constructor(
        private http: HttpClient,
        private interceptor: HttpInterceptorService
    ) {}

    get(id: string): Observable<Order> {
        if (!id)
            return this.interceptor.clientError("Get data", "Id is null", null);
        return this.http
            .get<Order>(this.apiUrl + "/" + id)
            .pipe(
                retry(3),
                catchError(
                    this.interceptor.handleError<Order>("Get data", null)
                )
            );
    }

    getList(start: Date, end: Date): Observable<Order[]> {
        let sDate:string = start.toLocaleDateString();
        let eDate:string = end.toLocaleDateString();
        let data = [
            {
                id: 1,
                dateCreated: "asew",
                questName: "abc",
                questPhone: "abc",
                questProvince: "abc",
                questDistrict: "abc",
                questEmail: "abc",
                questAddress: "abc",
                note: "abc",
                promotion: "abc",
                fees: "abc",
                status: 1,
                userId: 1,
                methodPayId: 1,
                pointUse: 1,
                point: 1,
                orderItems: "",
            },
            {
                id: 1,
                dateCreated: "asew",
                questName: "abc",
                questPhone: "abc",
                questProvince: "abc",
                questDistrict: "abc",
                questEmail: "abc",
                questAddress: "abc",
                note: "abc",
                promotion: "abc",
                fees: "abc",
                status: 1,
                userId: 1,
                methodPayId: 1,
                pointUse: 1,
                point: 1,
                orderItems: "",
            },
        ];
        return of(data);

        // if (!start|| !end)
        //     return this.interceptor.clientError("Get data", "Id is null", []);
        // return this.http
        //     .get<Order[]>(this.apiUrl + "/" )
        //     .pipe(
        //         retry(3),
        //         catchError(
        //             this.interceptor.handleError<Order[]>("Get data", [])
        //         )
        //     );
    }

    updateStatus(id: number, status: number): Observable<Order> {
        if (!id || !status)
            return this.interceptor.clientError("Get data", "Id is null", null);
        return this.http
            .get<Order>(this.apiUrl + "/")
            .pipe(
                retry(3),
                catchError(
                    this.interceptor.handleError<Order>("Get data", null)
                )
            );
    }

    confirmOrder(order: Order): Observable<Order> {
        return this.http
            .post<Order>(this.apiUrl, order)
            .pipe(
                retry(3),
                catchError(
                    this.interceptor.handleError<Order>("Confirm order", null)
                )
            );
    }

    payment(order: Order, paymentId: number): Observable<boolean> {
        if (!paymentId)
            return this.interceptor.clientError(
                "Payment order",
                "Payment is null",
                null
            );
        return this.http
            .post<boolean>(this.apiUrl + "/" + paymentId, order)
            .pipe(
                retry(3),
                catchError(
                    this.interceptor.handleError<boolean>(
                        "Confirm order",
                        false
                    )
                )
            );
    }

    getListProvice(): Observable<any> {
        return this.http
            .get("api/asset/province.json")
            .pipe(
                retry(3),
                catchError(this.interceptor.handleError("Get Province", null))
            );
    }

    getListDistrict(id: number): Observable<any> {
        return this.http
            .get("api/asset/district/" + id + ".json")
            .pipe(
                retry(3),
                catchError(this.interceptor.handleError("Get District", null))
            );
    }
}
