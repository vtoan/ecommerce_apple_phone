import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,retry } from 'rxjs/operators';
//models
import { Category, } from 'src/app/models/IModels';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    private apiUrl ="api/category"

    constructor(  
        private http:HttpClient,
        private message: MessageService) { }


    getList(): Observable<Category[]>{
            return this.http
                .get<Category[]>(this.apiUrl)
                .pipe(
                    retry(3),
                    catchError(this.handleError<Category[]>("Get list data",[]))
                );
    }

    update(id:number, cate:Category): Observable<any>{
        return this.http.put(this.apiUrl+"/"+id,  cate)
        .pipe(
            catchError(this.handleError('Update data',false))
        )
    }

    private handleError<T>(operation = 'operation', result?) {
        return (error: any): Observable<T> => {
            let erMsg = error.error.detail;
            if (!erMsg) erMsg =  error.statusText +"\n"+ error.url;
            this.message.showFail(error.status+" - "+ erMsg,operation);
            console.log(error);
            return throwError(result);
        }
        }
};

