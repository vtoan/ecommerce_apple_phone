import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    
    constructor() {}
    
    redirectError(message: string, title?: string): void {
        title = title ? title : 'Error';
        message = message ? message : 'No determine';
        location.assign("/error/"+title+"/"+message);
    }
}
