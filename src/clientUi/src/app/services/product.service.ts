import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
//models
import { Product, ProductDetail } from "src/app/models/IModels";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    private apiUrl = "api/product";

    constructor(
        private http: HttpClient,
    ) {}

    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    getUrlRes = (): string => "products";

    getUrlUpload = (): string => this.apiUrl + "/products";

    // ============ Method ============
    getList(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl).pipe(
            retry(3),
            catchError(() => throwError([]))
        );
    }

    getListById(ids: string): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl + "/" + ids).pipe(
            retry(3),
            catchError(() => of([]))
        );
    }

    getListBestSeller(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl + "/bests").pipe(
            retry(3),
            catchError(() => of([]))
        );
    }

    getListByCate(idCate: number): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl + "/cate/" + idCate).pipe(
            retry(3),
            catchError(() => of([]))
        );
    }

    getListDiscount(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl + "/promotions").pipe(
            retry(3),
            catchError(() => of([]))
        );
    }

    search(query: string): Observable<Product[]> {
        if (!query) return throwError("Query is empty");
        return this.http.get<Product[]>(this.apiUrl + "/search/" + query).pipe(
            retry(3),
            catchError(() => of([]))
        );
    }
    // product detail
    get(id: string): Observable<ProductDetail> {
        return this.http.get<ProductDetail>(this.apiUrl + "/" + id).pipe(
            retry(3),
            catchError(() => of(null))
        );
    }

    add(product: ProductDetail): Observable<ProductDetail> {
        return this.http
            .post<ProductDetail>(
                this.apiUrl,
                product,
                this.titleHeader("Add product")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
    }

    update(id: string, product: ProductDetail): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/" + id,
                product,
                this.titleHeader("Update product")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }

    updateStatus(id: string, status: boolean): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/" + id + "/status",
                status,
                this.titleHeader("Update product status")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<any>(this.apiUrl + "/" + id).pipe(
            retry(3),
            catchError(() => throwError(false))
        );
    }

    // product attribute
    getListAttr(id: string): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl + "/" + id + "/attrs").pipe(
            retry(3),
            catchError(() => throwError([]))
        );
    }

    getAttr(id: string): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + "/attrs/" + id).pipe(
            retry(3),
            catchError(() => of(null))
        );
    }

    addAttr(product: Product): Observable<Product> {
        return this.http
            .post<Product>(
                this.apiUrl + "/attrs",
                product,
                this.titleHeader("Add product attribute")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
    }

    updateAttr(id: number, product: Product): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/attrs/" + id,
                product,
                this.titleHeader("Update product attribute")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }

    updateStatusAttr(id: number, status: number): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/attrs/" + id + "/status",
                status,
                this.titleHeader("Update product attribute status")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }

    deleteAttr(id: number): Observable<boolean>  {
        return this.http
            .delete<any>(this.apiUrl + "/attrs/" + id ,this.titleHeader("Delete product attribute"))
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }
}
