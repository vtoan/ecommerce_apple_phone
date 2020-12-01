import { Injectable } from "@angular/core";
//
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
//sevice
import { HttpInterceptorService } from "../services/http-interceptor.service";

@Injectable({
    providedIn: "root",
})

export class FileService {
    
    rootPath:string =  "https://localhost:5001";

    constructor(
        private http: HttpClient,
        private interceptor: HttpInterceptorService
    ) {}

    private uploadToServer(image: File, url): Observable<any> {
        const formData = new FormData();
        formData.append("file", image);
        return this.http
            .post(url, formData)
            .pipe(
                catchError(this.interceptor.handleError("Update image", false))
            );
    }

    upload(file: File, url) {
        const reader = new FileReader();
        reader.addEventListener("load", (e: any) => {
            this.uploadToServer(file, url).subscribe(
                (resp) => console.log(resp),
                (err) => console.log(err)
            );
        });
        reader.readAsDataURL(file);
    }
}

