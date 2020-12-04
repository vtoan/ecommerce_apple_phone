import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError,retry } from 'rxjs/operators';
//models
import { Product,ProductDetail } from 'src/app/models/IModels';
import { HttpInterceptorService } from '../services/http-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private apiUrl ="api/product";

    constructor(
        private http:HttpClient,
        private interceptor: HttpInterceptorService
    ) { }
    
    getUrlContent = () =>  this.apiUrl +"/products";

    // ============ Method ============
    getList(): Observable<Product[]>{
        let obs = this.http
        .get<Product[]>(this.apiUrl)
        .pipe(
            retry(3),
            catchError(this.interceptor.handleError<Product[]>('Get list data',[]))
        )
        return obs;
    }

    getListById(ids:string): Observable<Product[]>{
        return this.http
        .get<Product[]>(this.apiUrl+"/"+ids)
        .pipe(
            retry(3),
            catchError(this.interceptor.handleError<Product[]>('Get list by id',[]))
        )
    }

    getListBestSeller(): Observable<Product[]>{
        return this.http
        .get<Product[]>(this.apiUrl+"/bests")
        .pipe(
            retry(3),
            catchError(this.interceptor.handleError<Product[]>('Get list best seller',[]))
        )
    }

    getListByCate(idCate:number): Observable<Product[]>{
        if(!idCate) return throwError("Category Id is invalid");
        return this.http
        .get<Product[]>(this.apiUrl+"/cate/"+idCate)
        .pipe(
            retry(3),
            catchError(this.interceptor.handleError<Product[]>('Get list by category',[]))
        )
    }

    getListDiscount(): Observable<Product[]>{
        return this.http
        .get<Product[]>(this.apiUrl+"/promotions")
        .pipe(
            retry(3),
            catchError(this.interceptor.handleError<Product[]>('Get list promotion',[]))
        )
    }

    search(query:string): Observable<Product[]>{
        if(!query) return throwError("Query is empty");
        return this.http
        .get<Product[]>(this.apiUrl+"/search/"+query)
        .pipe(
            retry(3),
            catchError(this.interceptor.handleError<Product[]>('Get list by query',[]))
        )
    }
    // product detail

    get(id:string): Observable<ProductDetail>{
        if(!id && id =="") return throwError("Id is invalid");
        return this.http
        .get<ProductDetail>(this.apiUrl+"/"+id)
        .pipe(
            retry(3),
            catchError(this.interceptor.handleError<ProductDetail>('Get product detail '+id))
        )
    }

    add(product:ProductDetail): Observable<number>{
        return of(1);
    }

    update(id:string, product:ProductDetail): Observable<ProductDetail>{
        return of(null)
    }

    updateStatus(id:string, status:boolean): Observable<boolean>{
        return of(true)
    }

    remove(id:number): boolean{
        return
    }

    // product attribute
    getListAttr(id:string): Observable<Product[]>{
        return this.http
        .get<Product[]>(this.apiUrl+"/"+id+"/attrs")
        .pipe(
            retry(3),
            catchError(this.interceptor.handleError<Product[]>('Get list attr',[]))
        )
    }

    getAttr(id:string): Observable<Product>{
        console.log("Get "+id);
        if(!id) return throwError("Query is empty");
        return this.http
        .get<Product>(this.apiUrl+"/attrs/"+id)
        .pipe(
            retry(3),
            catchError(this.interceptor.handleError<Product>('Get item attribute',[]))
        )
    }

    addAttr(idCate:number, product:ProductDetail): Observable<ProductDetail>{
        return
    }

    updateAttr(id:number, product:ProductDetail): Observable<ProductDetail>{
        return
    }

    updateStatusAttr(id:number, status:number): boolean{
        return
    }

    removeAttr(id:number): boolean{
        return
    }
}
