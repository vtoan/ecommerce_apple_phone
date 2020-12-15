import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject, throwError } from "rxjs";
import { catchError, retry, tap } from "rxjs/operators";
import { User } from "../models/IModels";

@Injectable({
    providedIn: "root",
})
export class AccountService {
    user:User;
    obs = new Subject<User>();

    private apiUrl = "api/account";

    constructor(private http: HttpClient) {
        this.obs.subscribe(val => this.user = val, er => this.user = null);
    }

    private titleHeader(title) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    getUserCurrent():User{
        return {
            id: "abad",
            name: "abad",
            phone: "abad",
            address: "abad",
            email: "abad",
            roleName: "abad",
            dateCreated: new Date(),
        }
    }

    getList(): Observable<User[]> {
        // return of([
        //     {
        //         id: "abad",
        //         name: "abad",
        //         phone: "abad",
        //         address: "abad",
        //         email: "abad",
        //         roleName: "abad",
        //         dateCreated: new Date(),
        //     },
        // ]);
        return this.http
            .get<User[]>(this.apiUrl, this.titleHeader("Get list user"))
            .pipe(
                retry(3),
                catchError(() => throwError([]))
            );
    }

    get(id: string): Observable<User> {
        // return of({
        //     id: "abad",
        //     name: "abad",
        //     phone: "abad",
        //     address: "abad",
        //     email: "abad",
        //     roleName: "abad",
        //     dateCreated: new Date(),
        // });
        return this.http
            .get<User>(this.apiUrl + "/" + id, this.titleHeader("Get user"))
            .pipe(
                retry(3),
                catchError(() => of(null))
            );
    }

    changeRole(id: string, roleName: string): Observable<boolean> {
        return this.http
            .post<boolean>(
                this.apiUrl + "/roles",
                {
                    userId: id,
                    roleName: roleName,
                },
                this.titleHeader("Change role user")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }

    update(id: string, user: User): Observable<boolean> {
        return this.http
            .put<boolean>(
                this.apiUrl + "/" + id,
                user,
                this.titleHeader("Update user")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(false))
            );
    }

    add(name:string, email: string, password: string): Observable<User> {
        return this.http
            .post<User>(
                this.apiUrl + "/register",
                { email: email, password: password },
                this.titleHeader("Register user")
            )
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
    }

    remove(id: string): Observable<Boolean> {
        return this.http.delete<any>(this.apiUrl + "/" + id).pipe(
            retry(3),
            catchError(() => throwError(false))
        );
    }

    changePassword(
        userId: string,
        password: string,
        newPassword: string
    ): Observable<boolean> {
        console.log(userId +" "+ password +" "+ newPassword);
        return this.http
            .post<boolean>(this.apiUrl + "/change-password", {
                userId:userId,
                currentPassword: password,
                newPassword:newPassword
            }, this.titleHeader("Change Password"))
            .pipe(
                retry(3),
                catchError(() => of(false))
            );
    }

    logout(): Observable<boolean> {
        return this.http
            .post<boolean>(this.apiUrl + "/logout", this.titleHeader("Logout"))
            .pipe(
                retry(3),
                catchError(() => of(false))
            );
    }

    login(email: string, password: string): Observable<User> {
        let re = this.http
            .post<User>(
                this.apiUrl + "/login",
                {
                    Email: email,
                    Password: password,
                },
            )
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
        re.subscribe(val => {
            // console.log(val);
            this.obs.next(val)
        }, er => this.obs.error("Can't login"));
        return re;
    }

    loginExternal(provider: string): Observable<User> {
        return this.http
            .post<User>(
                this.apiUrl + "/login/" + provider,
                this.titleHeader("Login with " + provider)
            )
            .pipe(
                retry(3),
                catchError(() => throwError(null))
            );
    }

    getListRoles(): Observable<string[]> {
        return this.http
            .get<string[]>(
                this.apiUrl + "/roles",
                this.titleHeader("Get list roles")
            )
            .pipe(
                retry(3),
                catchError(() => of([]))
            );
    }
}
