import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
//models
import { PromBill, Promotion, PromPoint } from "src/app/models/IModels";

@Injectable({
    providedIn: "root",
})
export class PromotionService {
    constructor() {}

    getListOfBill(): Observable<PromBill[]> {
        return of([
            {
                id: 1,
                discount: 0.5,
                conditionItem: -1,
                conditionAmount: 20000000,
            },
            {
                id: 2,
                discount: 0.2,
                conditionItem: -1,
                conditionAmount: 1000000,
            },
        ]);
    }

    getListOfPoint(): Observable<PromPoint[]> {
        return of([]);
    }


    getListDisplay():Observable<Promotion[]>{
        return of([
            {
                id: 1,
                name: "Khuyen mai",
                fromDate: new Date(),
                toDate: new Date(),
                status: true,
                type: 1,
                itemDetail: "Khuyen mai",
            },
    
            {
                id: 1,
                name: "Khuyen mai",
                fromDate: new Date(),
                toDate: new Date(),
                status: true,
                type: 1,
                itemDetail: "Khuyen mai",
            },
            {
                id: 1,
                name: "Khuyen mai",
                fromDate: new Date(),
                toDate: new Date(),
                status: true,
                type: 1,
                itemDetail: "Khuyen mai",
            },
        ])
    }

    getListOfProduct():Observable<Promotion[]>{
        return of([
            {
                id: 1,
                name: "Khuyen mai",
                fromDate: new Date(),
                toDate: new Date(),
                status: true,
                type: 1,
                itemDetail: "Khuyen mai",
            },
    
            {
                id: 1,
                name: "Khuyen mai 40%",
                fromDate: new Date(),
                toDate: new Date(),
                status: true,
                type: 1,
                itemDetail: "Khuyen mai",
            },
            {
                id: 1,
                name: "Khuyen mai 50%",
                fromDate: new Date(),
                toDate: new Date(),
                status: true,
                type: 1,
                itemDetail: "Khuyen mai 50%",
            },
        ])
    }
}
