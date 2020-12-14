import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
//Post
import { Post } from "src/app/models/IModels";
//

@Injectable({
    providedIn: "root",
})
export class PostService {
    private apiUrl = "api/post";

    constructor(private http: HttpClient) {}

    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    get(id: number): Observable<Post> {
        return this.http
            .get<Post>(this.apiUrl + "/" + id, this.titleHeader("Get post"))
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
    }

    add(post: string): Observable<Post> {
        return this.http
            .post<Post>(this.apiUrl, post, this.titleHeader("Add post"))
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
    }

    update(id: number, post: string): Observable<boolean> {
        return this.http
            .put<any>(
                this.apiUrl + "/" + id,
                post,
                this.titleHeader("Update post")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }

    delete(id: number): Observable<boolean> {
        return this.http
            .delete<any>(
                this.apiUrl + "/" + id,
                this.titleHeader("Delete post")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }
}
