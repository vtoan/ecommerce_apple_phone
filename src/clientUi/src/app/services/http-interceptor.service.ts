import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders,
} from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";
import { MessageService } from "../services/message.service";
import { catchError, retry } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
        }),
    };

    constructor(private message: MessageService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        var reqAc = req.clone(this.httpOptions);
        console.log("inter");
        return next.handle(reqAc);
    }

    handleError<T>(operation = "operation", result?) {
        return (error: any): Observable<T> => {
            let erMsg = error.error ? error.error.detail : null;
            if (!erMsg) erMsg = error.statusText + "\n" + error.url;
            this.message.showFail(error.status + " - " + erMsg, operation);
            console.log(erMsg);
            return throwError(result);
        };
    }

    clientError(operation = "operation", err: string, result?) {
        this.message.showFail(err, operation);
        return throwError(result);
    }

    handleSuscees(operation = "operation") {
        this.message.showSuccess(operation);
    }
}
