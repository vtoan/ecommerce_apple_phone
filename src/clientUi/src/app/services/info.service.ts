import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
//models
import { Info } from "../models/IModels";

@Injectable({
    providedIn: "root",
})
export class InfoService {
    private infoUrl = "api/info";
    constructor(private http: HttpClient) {}

    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }
    //Method
    getUrlRes = () => ["logo", "image_seo"];

    getUrlUpload = () => [this.infoUrl + "/logo", this.infoUrl + "/image_seo"];

    get(): Observable<Info> {
        return this.http
            .get<Info>(this.infoUrl)
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
    }

    update(info: Info): Observable<boolean> {
        return this.http
            .put<boolean>(this.infoUrl, info, this.titleHeader("Update info"))
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }
}
