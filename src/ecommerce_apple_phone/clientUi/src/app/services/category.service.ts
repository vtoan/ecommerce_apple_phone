import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
//models
import { Category } from "src/app/models/IModels";

@Injectable({
    providedIn: "root",
})
export class CategoryService {
    private apiUrl = "api/category";

    constructor(private http: HttpClient) {}

    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    getUrlRes = (): string => "image_seo";

    getUrlUpload = (): string => this.apiUrl + "/image_seo";

    getList(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl).pipe(
            catchError(() => throwError(null))
        );
    }

    update(id: number, cate: Category): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/" + id,
                cate,
                this.titleHeader("Update category")
            )
            .pipe(
                catchError(() => throwError(false))
            );
    }
}
