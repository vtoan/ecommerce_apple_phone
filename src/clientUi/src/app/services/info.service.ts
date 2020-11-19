import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
//models
import { Info } from '../models/IModels';
import { MessageService } from '../services/message.service';
//service
// import {HelpfulModule, } from 'src/app/helpful/helpful.module';


@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private infoUrl ="/s";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private mockData ={
    nameStore:"sad",
    logo:"sad",
    email:"sad",
    facebook:"sad",
    messenger:"sad",
    instargram:"sad",
    phone:"sad",
    address:"sad",
    ưorkTime:"sad",
    seoImage:"sad",
    seoTitle:"sad",
    seoDescription:"sad",
  };

  constructor( 
    private http:HttpClient,
    private message: MessageService ) { }

  //Method
  get():Observable<Info>{
    console.log(this.message);
    this.message.showSuccess("s");
    return of(this.mockData);
    // return this.http
    //     .get<InfoStore>(this.infoUrl)
    //     .pipe(
    //         catchError(this.handleError<InfoStore>('Get data Info', this.mockData))
    //     )
  }

  update(info:Info):Observable<any>{
    return this.http
        .put(this.infoUrl, info, this.httpOptions)
        .pipe(
            catchError(this.handleError<Info>('Update data Info'))
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
