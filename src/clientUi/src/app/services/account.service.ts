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
                dateCreated: new Date()
            },
        ]);
    }

    get(userId: string): Observable<User> {
        return of({
            id: "abad",
            name: "abad",
            phone: "abad",
            address: "abad",
            email: "abad",
            roleName: "abad",
            dateCreated: new Date()
        });
    }

    changeRole(userId: string, roleName: string): Observable<boolean> {
        return of(null);
    }

    update(itemid:string, user:User):Observable<boolean>{
        return of(true);
    }

    add(email:string, password:string): Observable<User>{
        return of(
            {
                id: "abad",
                name: "abad",
                phone: "abad",
                address: "abad",
                email: email,
                roleName: "abad",
                dateCreated: new Date()
            },
        );
    }

    remove(userId):Observable<Boolean>{
        return of(true);
    }

    changePassword(userId:string, password:string, newPassword:string): Observable<boolean>{
        return of(true);
    }

    logout(userID): Observable<boolean>{
        return of(true)
    }
}
