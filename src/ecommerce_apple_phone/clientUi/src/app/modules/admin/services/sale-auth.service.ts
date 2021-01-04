import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "src/app/services/account.service";

@Injectable()
export class SaleAuthService implements CanActivate {
    constructor(private router: Router, private accSer: AccountService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.accSer.checkRole("admin,sale", "admin/dashboard");
    }
}
