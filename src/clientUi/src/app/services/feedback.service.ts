import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//Post
import { Feedback } from 'src/app/models/IModels';
//
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }

  public getList(id:string):Observable<Feedback[]>{
    return of(null);
  }
}

