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
    obs = new Subject<User>();
    //   
    private _apiUrl = "api/account";

    constructor(private router: Router, private http: HttpClient) {
        this.obs.subscribe((val) => (this.user = val));
        this.checkLogin();
    }

    private _titleHeader(title:string) {
        return { headers: new HttpHeaders({ Action: title }) };
    }

    getUserCurrent(): User {
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
        });
        return re;
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
            (val) => this.obs.next(val),
            (er) => this.obs.error("Can't login")
        );
        return re;
    }

    loginExternal(provider: string): Observable<User> {
        return this.http.post<User>(
            this._apiUrl + "/login/" + provider,
            this._titleHeader("Login with " + provider)
        );
    }

    getListRoles(): Observable<string[]> {
        return this.http.get<string[]>(this._apiUrl + "/roles");
    }

    checkLogin(): void {
        this.http.get<User>(this._apiUrl + "/check-login").subscribe(
            (val) => {
                this.user = val;
                this.obs.next(val);
            },
            (er) => (this.user = null)
        );
    }

    checkRole(role: string, urlBack: string = null): Observable<boolean> {
        let obs = new Subject<boolean>();
        this.http
            .post(this._apiUrl + "/check-role", {role: role,})
            .subscribe(
                () => obs.next(true),
                () => {
                    // if (urlBack != null) this.router.navigate(["home"]);
                    obs.next(true);
                }
            );
        return obs;
    }
}
