import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { Observable, Subject } from "rxjs";
import { AccountService } from "./account.service";

@Injectable()
export class AdminAuthService implements CanActivate {
    constructor(private router: Router, private accSer: AccountService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.accSer.checkRole("admin", "home");
    }
}
