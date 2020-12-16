import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {
    Fee,
    MethodPay,
    Order,
    OrderDetail,
    PromBill,
} from "../models/IModels";

@Injectable({
    providedIn: "root",
})
export class OrderService {
    private apiUrl = "api/order";
    // private options = { year: "numeric", month: "numeric", day: "numeric" };

    constructor(private http: HttpClient) {}

    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    getListStatus(): string[] {
        return ["Chua xac nhan", "Da xac nhan", "Dang giao", "Hoan thanh"];
    }

    get(id: number): Observable<Order> {
        return this.http
            .get<Order>(this.apiUrl + "/" + id, this.titleHeader("Get order"))
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
    }

    getItems(id: number): Observable<OrderDetail[]> {
        return this.http
            .get<OrderDetail[]>(this.apiUrl + "items/" + id, this.titleHeader("Get item order"))
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
    }

    getList(start: Date, end: Date): Observable<Order[]> {
        let sDate: string = start.toLocaleDateString();
        let eDate: string = end.toLocaleDateString();
       
        return this.http
            .get<Order[]>(
                this.apiUrl + "/report?start=" + sDate + "&end=" + eDate,
                this.titleHeader("Report order")
            )
            .pipe(
                retry(3),
                catchError(() => of([]))
            );
    }

    updateStatus(id: number, status: number): Observable<boolean> {
        return this.http
            .get<boolean>(
                this.apiUrl + "/",
                this.titleHeader("Update status order")
            )
            .pipe(
                retry(3),
                catchError(() => of(false))
            );
    }

    confirmOrder(order: Order): Observable<Order> {
        return this.http
            .post<Order>(
                this.apiUrl + "/confirm",
                order,
            )
            .pipe(
                retry(3),
                catchError(() => of(null))
            );
    }

    payment(order: Order, paymentId: number): Observable<boolean> {
        return this.http
            .post<boolean>(
                this.apiUrl + "/" + paymentId,
                order,
                this.titleHeader("Ordered")
            )
            .pipe(
                retry(3),
                catchError(() => of(false))
            );
    }

    getListProvice(): Observable<any> {
        return this.http.get("api/asset/province.json").pipe(
            retry(3),
            catchError(() => of(null))
        );
    }

    getListDistrict(id: number): Observable<any> {
        return this.http.get("api/asset/district/" + id + ".json").pipe(
            retry(3),
            catchError(() => of(null))
        );
    }

    calTotalOrder(listOrderDetails: OrderDetail[]): [number, number] {
        let quantity = 0;
        let amount = 0;
        listOrderDetails.forEach((item) => {
            quantity += item.quantity;
            amount +=
                item.quantity *
                (item.price -
                    (item.discount % 1 == 0
                        ? item.discount
                        : item.price * item.discount));
        });
        return [quantity, amount];
    }

    calFee(amount: number, listFees: Fee[]): number {
        let totalFee = 0;
        if (listFees && listFees.length > 0) {
            totalFee = listFees.reduce(
                (accur, val) =>
                    (accur += val.cost % 1 == 0 ? val.cost : amount * val.cost),
                0
            );
        }
        return totalFee;
    }

    calProm(amount: number, quantity: number, listProms: PromBill[]): number {
        let totalProm = 0;
        if (listProms && listProms.length > 0) {
            for (const prom of listProms) {
                if (
                    prom.conditionAmount >= 0 &&
                    prom.conditionAmount <= quantity
                ) {
                    totalProm = prom.discount;
                    break;
                }
                if (
                    prom.conditionAmount >= 0 &&
                    prom.conditionAmount <= amount
                ) {
                    totalProm = prom.discount;
                    break;
                }
            }
        }
        return totalProm;
    }

    getListMethodPay(): Observable<MethodPay[]> {
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
