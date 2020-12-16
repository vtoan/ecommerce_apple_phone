import { Injectable } from "@angular/core";
import { Observable, of, Subject, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";

//models
import {
    PromBill,
    Promotion,
    PromPoint,
    PromProduct,
} from "src/app/models/IModels";

@Injectable({
    providedIn: "root",
})
export class PromotionService {
    private apiUrl = "api/promotion";

    constructor(private http: HttpClient) {}

    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    get(id: number): Observable<Promotion> {
        return this.http.get<Promotion>(this.apiUrl + "/" + id).pipe(
            retry(3),
            catchError(() => of(null))
        );
    }

    add(typeItem: number, prom: Promotion): Observable<Promotion> {
        return this.http
            .post<Promotion>(
                this.apiUrl + "/" + typeItem,
                prom,
                this.titleHeader("Add promotion")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
    }

    update(id: number, prom: Promotion): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/" + id,
                prom,
                this.titleHeader("Update promotion")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }

    delete(id: number): Observable<boolean> {
        return this.http
            .delete<boolean>(
                this.apiUrl + "/" + id,
                this.titleHeader("Delete promotion")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }

    getListOfBill(): Observable<PromBill[]> {
        return this.http.get<PromBill[]>(this.apiUrl).pipe(
            retry(3),
            catchError(() => throwError([]))
        );
    }

    getListOfPoint(): Observable<PromPoint[]> {
        return this.http.get<PromPoint[]>(this.apiUrl).pipe(
            retry(3),
            catchError(() => throwError([]))
        );
    }

    getList(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(this.apiUrl).pipe(
            retry(3),
            catchError(() => throwError([]))
        );
    }

    getListOfProduct(): Observable<PromProduct[]> {
        return this.http.get<PromProduct[]>(this.apiUrl + "/product").pipe(
            retry(3),
            catchError(() => throwError([]))
        );
    }

    changePromProduct(
        promOld: number,
        promNew: number,
        prodId: number
    ): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/change",
                { productId: prodId, promOldId: promOld, promNewId: promNew },
                this.titleHeader("Change promotion")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }

    updateStatus(id: number, status: boolean): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/" + id,
                { status: status },
                this.titleHeader("Update promotion status")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }
}
