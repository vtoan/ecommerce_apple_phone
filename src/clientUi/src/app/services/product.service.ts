import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError,retry } from 'rxjs/operators';
//models
import { Product,ProductDetail, ProductAttr } from 'src/app/models/IModels';
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
        return
    }

    getListById(): Observable<Product[]>{
        return
    }

    getListBestSeller(): Observable<Product[]>{
        return of(null);
    }

    getListByCate(idCate:number): Observable<Product[]>{
        return of(null);
    }

    getListDiscount(): Observable<Product[]>{
        return of(null);
    }

    search(query:string): Observable<Product[]>{
        return of(null);
    }
    // product detail

    get(id:number): Observable<ProductDetail>{
        return
    }

    add(idCate:number, product:ProductDetail): Observable<ProductDetail>{
        return
    }

    update(id:number, product:ProductDetail): Observable<ProductDetail>{
        return
    }

    updateStatus(id:number, status:number): boolean{
        return
    }

    remove(id:number): boolean{
        return
    }

    // product attribute
    getListAttr(): Observable<ProductAttr[]>{
        return
    }

    getAttr(id:number): Observable<ProductAttr>{
        return
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
