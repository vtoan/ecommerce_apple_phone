import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../models/IModels";

@Injectable({
    providedIn: "root",
})
export class AccountService {
    constructor() {}

    getList(): Observable<User[]> {
        return of([
            {
                id: "abad",
                name: "abad",
                phone: "abad",
                address: "abad",
                email: "abad",
                roleName: "abad",
            },
        ]);
    }

    getUser(userId: string): Observable<User> {
        return of(null);
    }

    changeRole(userId: string, roleName: string): Observable<boolean> {
        return of(null);
    }
}
