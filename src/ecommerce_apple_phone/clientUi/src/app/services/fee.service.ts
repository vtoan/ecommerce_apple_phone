import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
//models
import { Fee } from "src/app/models/IModels";

@Injectable({
    providedIn: "root",
})
export class FeeService {
    private apiUrl = "api/fee";

    constructor(private http: HttpClient) {}

    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    get(id: number): Observable<Fee> {
        return this.http
            .get<Fee>(this.apiUrl + "/" + id)
            .pipe(catchError(() => throwError(null)));
    }

    getList(): Observable<Fee[]> {
        return this.http
            .get<Fee[]>(this.apiUrl)
            .pipe(catchError(() => throwError([])));
    }

    add(fee: Fee): Observable<Fee> {
        return this.http
            .post<Fee>(this.apiUrl, fee, this.titleHeader("Add fee"))
            .pipe(catchError(() => throwError(null)));
    }

    update(id: number, fee: Fee): Observable<boolean> {
        return this.http
            .put<any>(this.apiUrl + "/" + id, fee, this.titleHeader("Update fee"))
            .pipe(
                catchError(() => throwError(false))
            );
    }

    delete(id: number): Observable<boolean> {
        return this.http
            .delete<any>(this.apiUrl + "/" + id, this.titleHeader("Delete fee"))
            .pipe(catchError(() => throwError(false)));
    }
}
