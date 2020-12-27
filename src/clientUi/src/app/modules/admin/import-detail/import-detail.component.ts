import { QueryList } from "@angular/core";
import { ViewChildren } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Container } from "src/app/models/container";
import { ImportDetail, Product } from "src/app/models/IModels";
import { ProductService } from "src/app/services/product.service";
import { ImportItemComponent } from "../import-item/import-item.component";
import { ImportService } from "../services/import.service";

@Component({
    selector: "app-import-detail",
    templateUrl: "./import-detail.component.html",
    styleUrls: ["./import-detail.component.scss"],
})
export class ImportDetailComponent implements OnInit {
    @ViewChildren("impItem") contai: QueryList<any>;

    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
    };
    lsImport: ImportDetail[] = [];
    lsProducts: Product[] = [];
    constructor(
        private impSer: ImportService,
        private productSer: ProductService
    ) {}
    ngAfterViewInit(): void {}

    ngOnInit() {
        this._getDataProduct();
    }

    onAddItem() {
        this.lsImport.push({
            importId: 0,
            productId: "",
            quantity: 0,
            price: 0,
        });
    }

    trackItem(index: number, item: any) {
        return item;
    }

    onSubmit() {
        let ar: ImportDetail[] = [];
        let flag: boolean = true;
        this.contai.forEach((item: ImportItemComponent) => {
            if (!item.isValid) {
                item.onTouched();
                flag = false;
                return;
            }
            ar.push(item.data);
        });
        if (flag) this._addData(ar);
    }

    onDelete(idx: number) {
        this.lsImport.splice(idx, 1);
    }

    private _getDataProduct() {
        this.productSer.getList().subscribe(
            (val) => {
                this.lsProducts = val;
                this.container.isLoaded = true;
            },
            (er) => {
                this.lsProducts = [];
                this.container.isDataEmpty = true;
                this.container.isLoaded = true;
            }
        );
    }

    private _addData(list: ImportDetail[]) {
        this.impSer.add(list).subscribe();
    }
}
