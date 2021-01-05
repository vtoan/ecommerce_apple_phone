import { Injectable } from "@angular/core";
//
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})

export class FileService {
    
    rootPath:string =  "api";

    constructor(
        private http: HttpClient,
    ) {}

    private uploadToServer(image: File, url): Observable<any> {
        const formData = new FormData();
        formData.append("file", image);
        return this.http
            .post(url, formData)
            .pipe(
                retry(3)
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

