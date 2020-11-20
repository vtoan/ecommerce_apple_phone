import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
//models
import { Info } from '../models/IModels';
import { HttpInterceptorService } from '../services/http-interceptor.service';


//service
// import {HelpfulModule, } from 'src/app/helpful/helpful.module';


@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private infoUrl ="api/info";
  constructor( 
    private http:HttpClient,
    private interceptor: HttpInterceptorService 
    ) { }

  //Method

  getUrlContent = () => [this.infoUrl +"/logo", this.infoUrl+"/image-seo"]

  get():Observable<Info>{
    return this.http
        .get<Info>(this.infoUrl)
        .pipe(
            catchError(this.interceptor.handleError<Info>('Get data Info'))
        )
  }

  update(info:Info):Observable<any>{
    return this.http
        .put(this.infoUrl, info)
        .pipe(
            catchError(this.interceptor.handleError<Info>('Update data Info'))
        )
  }
}
