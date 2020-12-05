import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";

//models
import {
    PromBill,
    Promotion,
    PromPoint,
    PromProduct,
} from "src/app/models/IModels";
import { HttpInterceptorService } from "../services/http-interceptor.service";

@Injectable({
    providedIn: "root",
})
export class PromotionService {
    private apiUrl = "api/promotion";

    constructor(
        private http: HttpClient,
        private interceptor: HttpInterceptorService
    ) {}


    get(id:number):Observable<Promotion>{
        return of();
    }

    add(prom:Promotion):Observable<number>{
        return of(1);
    }

    update(id:number, prom:Promotion):Observable<boolean>{
        return of();
    }

    remove(id:number):Observable<boolean>{
        return of();
    }

    getListOfBill(): Observable<PromBill[]> {
        return of([
            {
                id: 1,
                name: "A",
                discount: 0.5,
                conditionItem: -1,
                conditionAmount: 20000000,
            },
            {
                id: 2,
                name: "B",
                discount: 0.2,
                conditionItem: -1,
                conditionAmount: 1000000,
            },
        ]);
    }

    getListOfPoint(): Observable<PromPoint[]> {
        return of([]);
    }

    getList(): Observable<Promotion[]> {
        return of([
            {
                id: 1,
                name: "Khuyen mai",
                fromDate: new Date(),
                toDate: new Date(),
                status: false,
                type: 1,
                itemDetail: "Khuyen mai",
            },

            {
                id: 2,
                name: "Khuyen mai",
                fromDate: new Date(),
                toDate: new Date(),
                status: true,
                type: 1,
                itemDetail: "Khuyen mai",
            },
            {
                id: 3,
                name: "Khuyen mai",
                fromDate: new Date(),
                toDate: new Date(),
                status: true,
                type: 1,
                itemDetail: "Khuyen mai",
            },
        ]);
    }

    getListOfProduct(): Observable<PromProduct[]> {
        // return this.http
        // .get<PromProduct[]>(this.apiUrl+"/product")
        // .pipe(
        //     retry(3),
        //     catchError(this.interceptor.handleError<PromProduct[]>('Get list data',[]))
        // )
        return of([
            {
                id: 1,
                name: "Khuyen mai 1",
                discount: 0.3,
                productInProms: "[1,2,3,4,5]",
                categoryId: 0,
            },
            {
                id: 2,
                name: "Khuyen mai 2",
                discount: 0.2,
                productInProms: "[1,2,3,4,5]",
                categoryId: 0,
            },
        ]);
    }

    changePromProduct(
        promOld: number,
        promNew: number,
        prodId: number
    ): Observable<boolean> {
        console.log(promOld, promNew, prodId);
        return of();
        // let obs = this.http
        //     .put<boolean>(
        //         this.apiUrl + "/change/" + promOld + "/" + promNew,
        //         {productId: prodId}
        //     )
        //     .pipe(
        //         retry(3),
        //         catchError(
        //             this.interceptor.handleError<boolean>(
        //                 "Get list data",
        //                 false
        //             )
        //         )
        //     );
        // obs.subscribe(val => console.log("sussecc"))
        // return obs;
    }

    updateStatus(id:number, sts:boolean ): Observable<boolean>{
        return of();
    }
}
