import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, retry, tap } from "rxjs/operators";
//models
import { Fee } from "src/app/models/IModels";
import { HttpInterceptorService } from "../services/http-interceptor.service";

@Injectable({
    providedIn: "root",
})
export class FeeService {
    private apiUrl = "api/fee";

    constructor(
        private http: HttpClient,
        private interceptor: HttpInterceptorService
    ) {}

    get(id: number): Observable<Fee> {
        
        if (!id)
            return this.interceptor.clientError("Get data", "Id is null", null);
        return this.http
            .get<Fee>(this.apiUrl + "/" + id)
            .pipe(
                retry(3),
                catchError(this.interceptor.handleError<Fee>("Get data", null))
            );
    }

    getList(): Observable<Fee[]> {
        
        return this.http
        .get<Fee[]>(this.apiUrl)
        .pipe(
            retry(3),
            catchError(this.interceptor.handleError<Fee[]>('Get list data',[]))
        )
    }

    add(fee: Fee): Observable<Fee> {
        return this.http
            .post<Fee>(this.apiUrl, fee)
            .pipe(
                catchError(this.interceptor.handleError<Fee>("Add data", null))
            );
    }

    update(id: number, fee: Fee): Observable<any> {
        return this.http
            .put(this.apiUrl + "/" + id, fee)
            .pipe(
                catchError(this.interceptor.handleError("Update data", false))
            );
    }

    delete(id: number): Observable<any> {
        if (!id)
            return this.interceptor.clientError(
                "Delete data",
                "Id is null",
                null
            );
        return this.http
            .delete(this.apiUrl + "/" + id)
            .pipe(
                catchError(this.interceptor.handleError("Delete data", false))
            );
    }
}
