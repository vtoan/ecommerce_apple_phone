import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET' })
    };

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var reqAc = req.clone(this.httpOptions);
        console.log("Interceptor HTTP");
        return next.handle(reqAc);
    }
}
