import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//models
import { PromBill, PromPoint} from 'src/app/models/IModels';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getListOfBill():Observable<PromBill[]>{
      return of([
        {
            id:1,
            discount:0.5,
            conditionItem:-1,
            conditionAmount: 20000000,
        },
        {
            id:2,
            discount: 0.2,
            conditionItem:-1,
            conditionAmount: 1000000,
        }
      ])
  }

  getListOfPoint():Observable<PromPoint[]>{
    return of([])
}
}
