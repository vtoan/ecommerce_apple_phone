import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ImportDetail, ImportProduct } from "src/app/models/IModels";

@Injectable({
    providedIn: "root",
})
export class ImportService {
    private apiUrl = "api/import";

    constructor(private http: HttpClient) {}

    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    add(list: ImportDetail[]): Observable<ImportProduct> {
        return this.http
            .post<ImportProduct>(
                this.apiUrl,
                {
                    importItems: JSON.stringify(list),
                },
                this.titleHeader("Add Import")
            )
            .pipe(catchError(() => throwError(null)));
    }

    getList(start: Date, end: Date): Observable<ImportProduct[]> {
        let sDate: string = `${
            start.getMonth() + 1
        }-${start.getDate()}-${start.getFullYear()}`;
        let eDate: string = `${
            end.getMonth() + 1
        }-${end.getDate()}-${end.getFullYear()}`;
        return this.http
            .get<ImportProduct[]>(this.apiUrl + "/report/" + sDate + "/" + eDate)
            .pipe(catchError(() => throwError(null)));
    }

    get(id: number): Observable<ImportDetail[]> {
        return this.http
            .get<ImportDetail[]>(this.apiUrl+"/"+id)
            .pipe(catchError(() => throwError([])));
    }
}
