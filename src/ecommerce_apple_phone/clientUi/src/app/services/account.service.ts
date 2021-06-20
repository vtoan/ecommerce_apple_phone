import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, Subject, throwError } from "rxjs";
import { catchError, retry, tap } from "rxjs/operators";
import { User } from "../models/IModels";

@Injectable({
    providedIn: "root",
})
export class AccountService {
    user: User;
    obsUser = new Subject<User>();
    //
    private _apiUrl = "api/account";

    constructor(private router: Router, private http: HttpClient) {
        this.obsUser.subscribe((val) => (this.user = val));
        this.checkLogin();
    }

    private _titleHeader(title: string) {
        return {
            headers: new HttpHeaders({ Action: title }),
        };
    }

    getUserCurrent(): User {
        console.log(this.user);
        return this.user;
    }

    getList(): Observable<User[]> {
        return this.http.get<User[]>(this._apiUrl);
    }

    get(id: string): Observable<User> {
        return this.http.get<User>(this._apiUrl + "/" + id);
    }

    //role
    changeRole(id: string, roleName: string): Observable<boolean> {
        return this.http.post<boolean>(
            this._apiUrl + "/roles",
            {
                userId: id,
                roleName: roleName,
            },
            this._titleHeader("Change role user")
        );
    }

    update(id: string, user: User): Observable<boolean> {
        return this.http.put<boolean>(
            this._apiUrl + "/" + id,
            user,
            this._titleHeader("Update user")
        );
    }

    add(name: string, email: string, password: string): Observable<User> {
        return this.http.post<User>(
            this._apiUrl + "/register",
            { name: name, email: email, password: password },
            this._titleHeader("Register user")
        );
    }

    remove(id: string): Observable<Boolean> {
        return this.http.delete<any>(this._apiUrl + "/" + id).pipe();
    }

    changePassword(
        userId: string,
        password: string,
        newPassword: string
    ): Observable<boolean> {
        return this.http.post<boolean>(
            this._apiUrl + "/change-password",
            {
                userId: userId,
                currentPassword: password,
                newPassword: newPassword,
            },
            this._titleHeader("Change Password")
        );
    }

    logout(): Observable<boolean> {
        let re = this.http.post<boolean>(
            this._apiUrl + "/logout",
            this._titleHeader("Logout")
        );
        re.subscribe((val) => {
            this.user = null;
            this.obsUser.error(null);
        });
        return re;
    }

    checkLogin(): void {
        this.http
            .get<User>(this._apiUrl + "/check-login")
            .pipe(catchError(() => throwError(null)))
            .subscribe(
                (val) => {
                    this.user = val;
                    this.obsUser.next(val);
                },
                (er) => this.obsUser.error(null)
            );
    }

    login(email: string, password: string): Observable<User> {
        let re = this.http
            .post<User>(
                this._apiUrl + "/login",
                {
                    Email: email,
                    Password: password,
                },
                this._titleHeader("Login")
            )
            .pipe(catchError(() => throwError(null)));
        re.subscribe(
            (val) => {
                console.log("Server Account");
                console.log(val);
                this.obsUser.next(val);
            },
            (er) => this.obsUser.error("Can't login")
        );
        return re;
    }

    loginExternal(provider: string): Observable<User> {
        let re = this.http.post<User>(
            this._apiUrl + "/login/" + provider,
            this._titleHeader("Login with " + provider)
        );
        re.subscribe(
            (val) => this.obsUser.next(val),
            (er) => this.obsUser.error("Can't login")
        );
        return re;
    }

    getListRoles(): Observable<string[]> {
        return this.http.get<string[]>(this._apiUrl + "/roles");
    }

    checkRole(role: string, urlBack: string = null): Observable<boolean> {
        let obs = new Subject<boolean>();
        this.http
            .post(this._apiUrl + "/check-role", { roleName: role })
            .subscribe(
                () => obs.next(true),
                () => {
                    if (urlBack != null) this.router.navigate(["home"]);
                    obs.next(false);
                }
            );
        return obs;
    }
}
