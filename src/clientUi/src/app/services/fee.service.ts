import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable, of, Subscriber, throwError } from 'rxjs';
import { catchError,retry ,finalize} from 'rxjs/operators';
//models
import { Fee } from 'src/app/models/IModels';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  
  private apiUrl ="api/fee";
  
  constructor( 
    private http:HttpClient,
    private message: MessageService ) { }

    get(id:number):Observable<Fee>{
        if(!id) {
            this.message.showFail("Id is null");
            return throwError(null);
        }
        return this.http
            .get<Fee>(this.apiUrl+"/"+id)
            .pipe(
                retry(3),
                catchError(this.handleError<Fee>('Get data', null))
            );
    }


    getList(): Observable<Fee[]>{
        return this.http
        .get<Fee[]>(this.apiUrl)
        .pipe(
            retry(3),
            catchError(this.handleError<Fee[]>('Get list data',[]))
        )
    }


    add(fee:Fee): Observable<Fee>{
        return this.http.post<Fee>(this.apiUrl, fee)
        .pipe(
            catchError(this.handleError<Fee>('Add data',null)),
        )
    }

    update(id:number, fee:Fee): Observable<Fee>{
        return this.http.put<Fee>(this.apiUrl+"/"+id, fee)
        .pipe(
            catchError(this.handleError<Fee>('Update data',false))
        )
    }

    delete(id:number): Observable<any>{
        if(!id) {
            this.message.showFail("Id is null");
            return of(null);
        }
        return this.http.delete(this.apiUrl+"/"+id)
        .pipe(
            catchError(this.handleError('Delete data',false))
        )
    }

     //
    private handleError<T>(operation = 'operation', result?) {
        return (error: any): Observable<T> => {
            let erMsg = error.error.detail;
            if (!erMsg) erMsg =  error.statusText +"\n"+ error.url;
            this.message.showFail(error.status+" - "+ erMsg,operation);
            console.log(error);
            return throwError(result);
    };
  }
}
