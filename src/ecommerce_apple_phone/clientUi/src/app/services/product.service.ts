import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
//models
import { Product, ProductDetail } from "src/app/models/IModels";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    private apiUrl = "api/product";

    constructor(private http: HttpClient) {}

    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    getUrlRes = (): string => "product";

    getUrlUpload = (): string => this.apiUrl + "/image";

    // ============ Method ============
    getList(): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.apiUrl)
            .pipe(catchError(() => throwError([])));
    }

    getListAdmin(): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.apiUrl+"/admin")
            .pipe(catchError(() => throwError([])));
    }

    getListById(ids: string): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.apiUrl + "/" + ids)
            .pipe(catchError(() => throwError([])));
    }

    getListBestSeller(): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.apiUrl + "/bests")
            .pipe(catchError(() => throwError([])));
    }

    getListByCate(idCate: number): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.apiUrl + "/cate/" + idCate)
            .pipe(catchError(() => throwError([])));
    }

    getListDiscount(items: number=0): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.apiUrl + "/promotions/"+items)
            .pipe(catchError(() => throwError([])));
    }

    search(query: string): Observable<Product[]> {
        if (!query) return throwError("Query is empty");
        return this.http
            .get<Product[]>(this.apiUrl + "/search/" + query)
            .pipe(catchError(() => throwError([])));
    }
    // product detail
    get(id: string): Observable<ProductDetail> {
        return this.http
            .get<ProductDetail>(this.apiUrl + "/" + id)
            .pipe(catchError(() => throwError(null)));
    }

    add(product: ProductDetail): Observable<ProductDetail> {
        return this.http
            .post<ProductDetail>(
                this.apiUrl,
                product,
                this.titleHeader("Add product")
            )
            .pipe(catchError(() => throwError(null)));
    }

    update(id: string, product: ProductDetail): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/" + id,
                product,
                this.titleHeader("Update product")
            )
            .pipe(catchError(() => throwError(false)));
    }

    updateStatus(id: string, status: boolean): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/" + id + "/" + status,
                this.titleHeader("Update product status")
            )
            .pipe(catchError(() => throwError(false)));
    }

    delete(id: number): Observable<boolean> {
        return this.http
            .delete<any>(this.apiUrl + "/" + id)
            .pipe(catchError(() => throwError(false)));
    }

    // product attribute
    getListAttr(id: string): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.apiUrl + "/" + id + "/attrs")
            .pipe(catchError(() => throwError([])));
    }

    getAttr(id: string): Observable<Product> {
        console.log(id);
        return this.http
            .get<Product>(this.apiUrl + "/attrs/" + id)
            .pipe(catchError(() => throwError(null)));
    }

    addAttr(detailId: string, product: Product): Observable<Product> {
        return this.http
            .post<Product>(
                this.apiUrl + "/attrs/" + detailId,
                product,
                this.titleHeader("Add product attribute")
            )
            .pipe(catchError(() => throwError(null)));
    }

    updateAttr(id: string, product: Product): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/attrs/" + id,
                product,
                this.titleHeader("Update product attribute")
            )
            .pipe(catchError(() => throwError(false)));
    }

    updateStatusAttr(id: number, status: number): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/attrs/" + id + "/" + status,
                this.titleHeader("Update product attribute status")
            )
            .pipe(catchError(() => throwError(false)));
    }

    deleteAttr(id: string): Observable<boolean> {
        return this.http
            .delete<any>(
                this.apiUrl + "/attrs/" + id,
                this.titleHeader("Delete product attribute")
            )
            .pipe(catchError(() => throwError(false)));
    }
}
