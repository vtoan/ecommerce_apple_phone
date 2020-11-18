import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
//models
import { Fee } from 'src/app/models/IModels';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  
  private apiUrl ="api/fee";

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
          .get<Fee>(this.apiUrl)
          .pipe(
              catchError(this.handleError<Fee>('Get data Info'))
          )
    }


    

     //
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      let erMsg = error.error.message;
      if (!erMsg) erMsg = error.error.title;
      this.message.showFail(error.status+" - "+ erMsg,operation);
      console.log(error);
      return of(result as T);
    };
  }
}
