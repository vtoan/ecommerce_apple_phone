import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class RoleService {
    constructor() {}

    getList(): Observable<string[]> {
        return of(["admin","user","sale","warehouse"]);
    }

    get(userId: string): Observable<string> {
        return of(null);
    }
}
