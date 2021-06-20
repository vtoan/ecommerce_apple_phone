import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError, retry } from "rxjs/operators";
//Post
import { Feedback } from "src/app/models/IModels";
//
@Injectable({
    providedIn: "root",
})
export class FeedbackService {
    private apiUrl = "api/product/feedback";

    constructor(private http: HttpClient) {}
    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    getList(id: string): Observable<Feedback[]> {
        return this.http
            .get<Feedback[]>(this.apiUrl + "/" + id)
            .pipe(catchError(() => throwError(null)));
    }

    add(fee: Feedback): Observable<Feedback> {
        return this.http
            .post<Feedback>(this.apiUrl, fee, this.titleHeader("Add feedback"))
            .pipe(catchError(() => throwError(null)));
    }

    delete(id: number): Observable<boolean> {
        return this.http
            .delete<any>(
                this.apiUrl + "/" + id,
                this.titleHeader("Delete feedback")
            )
            .pipe(catchError(() => throwError(false)));
    }
}
