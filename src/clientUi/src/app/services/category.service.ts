import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
//models
import { Category } from "src/app/models/IModels";
import { HttpInterceptorService } from "../services/http-interceptor.service";

@Injectable({
    providedIn: "root",
})
export class CategoryService {
    private apiUrl = "api/category";

    constructor(
        private http: HttpClient,
        private interceptor: HttpInterceptorService
    ) {}

    getUrlRes = (): string => "image_seo";

    getUrlUpload = (): string => this.apiUrl + "/image_seo";

    getList(): Observable<Category[]> {
        return this.http
            .get<Category[]>(this.apiUrl)
            .pipe(
                retry(3),
                catchError(
                    this.interceptor.handleError<Category[]>(
                        "Get list category",
                        []
                    )
                )
            );
    }

    update(id: number, cate: Category): Observable<any> {
        let obs = this.http
            .put(this.apiUrl + "/" + id, cate)
            .pipe(
                catchError(
                    this.interceptor.handleError("Update category", false)
                )
            );
        obs.subscribe((next) => this.interceptor.suscees("Update category"));
        return obs;
    }
}
