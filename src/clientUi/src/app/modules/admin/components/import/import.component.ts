import {
    AfterViewInit,
    Component,
    ComponentRef,
    NgModule,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import * as dayjs from "dayjs";
import { Observable, of, Subject } from "rxjs";
import { finalize, map, startWith } from "rxjs/operators";
import { Container } from "src/app/models/container";
import { ImportDetail, ImportProduct, Product } from "src/app/models/IModels";
import { ProductService } from "src/app/services/product.service";
import { ImportItemComponent } from "../import-item/import-item.component";
import { ImportService } from "../../services/import.service";

@Component({
    selector: "app-import",
    templateUrl: "./import.component.html",
    styleUrls: ["./import.component.scss"],
})
export class ImportComponent implements OnInit {
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "Data is't found",
    };
    //
    dateRange = {
        begin: dayjs().subtract(30, "day").toDate(),
        end: dayjs().add(1, "day").toDate(),
    };

    lsImport: ImportProduct[] = [];

    tableData = new MatTableDataSource();

    constructor(private impSer: ImportService) {}

    ngOnInit() {
        this._getDataImport(this.dateRange.begin, this.dateRange.end)
            .pipe(
                finalize(() => {
                    this.container.isLoaded = true;
                })
            )
            .subscribe();
    }

    onChangeDate() {
        this.container.isLoaded = false;
        of(this._getDataImport(this.dateRange.begin, this.dateRange.end))
            .pipe(finalize(() => (this.container.isLoaded = true)))
            .subscribe();
    }

    private _getDataImport(start, end) {
        let obs = new Subject();
        this.impSer.getList(start, end).subscribe(
            (val) => {
                this.lsImport = val;
                this.tableData.data = this.lsImport;
                this.tableData._updateChangeSubscription();
                obs.complete();
            },
            (er) => {
                this.container.isDataEmpty = true;
                obs.complete();
            }
        );
        return obs;
    }
}
