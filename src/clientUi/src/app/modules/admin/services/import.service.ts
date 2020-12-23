import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { ImportDetail, ImportProduct } from "src/app/models/IModels";

@Injectable({
    providedIn: "root",
})
export class ImportService {
    private listImp: ImportDetail[] = [];

    obs = new Subject<ImportDetail[]>();

    constructor() {}

    add(list:ImportDetail[]):Observable<boolean>{
        return of(null);
    }

    getList():Observable<ImportProduct>{
        return of(null);
    }

    get(id:number):Observable<ImportProduct>{
        return of(null);
    }
}
