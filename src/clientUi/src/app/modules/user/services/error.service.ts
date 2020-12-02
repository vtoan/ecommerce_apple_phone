import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class ErrorService {
    constructor(private router: Router) {}

    redirectError(message: string, title?: string): void {
        title = title ? title : "Error 500";
        message = message ? message : "No determine";
        this.router.navigate(["error", title, message]);
    }
}
