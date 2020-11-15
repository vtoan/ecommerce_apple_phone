import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
//models
import { Fee } from 'src/app/models/fee';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  
  private infoUrl ="https://localhost:5001/fee";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET'  })
  };

  constructor( 
    private http:HttpClient,
    private message: MessageService ) { }

    get():Observable<Fee>{
      // this.message.showSuccess("s");
      // return of(this.mockData);
      return this.http
          .get<Fee>(this.infoUrl)
          .pipe(
              catchError(this.handleError<Fee>('Get data Info'))
          )
    }

     //
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.message.showFail(error.message,operation);
      return of(result as T);
    };
  }
}
