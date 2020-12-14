import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { MessageService } from "./message.service";

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
    constructor(private message: MessageService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let msgTitle = req.headers.get("Action");

        return next.handle(req).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    if(msgTitle) this.message.showSuccess(msgTitle);
                }
            }),
            catchError((error: any) => {
                let erMsg = error.error ? error.error.detail : null;
                if (!erMsg) erMsg = error.statusText + "\n" + error.url;
                this.message.showFail(error.status + " - " + erMsg, msgTitle);
                return throwError(error);
            })
        );
    }
}
