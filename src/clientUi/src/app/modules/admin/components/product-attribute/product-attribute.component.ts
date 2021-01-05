import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { Container } from "src/app/models/container";
import { Product } from "src/app/models/IModels";
import { FileService } from "src/app/services/file.service";
import { ProductService } from "src/app/services/product.service";

@Component({
    selector: "app-product-attribute",
    templateUrl: "./product-attribute.component.html",
    styleUrls: ["./product-attribute.component.scss"],
})
export class ProductAttributeComponent implements OnInit {
    @Input() itemId: string;
    ctainerForm: Container = {
        isLoaded: true,
        isDataEmpty: false,
        displayText: "Can't save data !",
    };

    ctainerList: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "Data is't found !",
    };

    itemSelected: Product;
    lsImages: string[];
    lsProductAttrs: Product[];

    tableData = new MatTableDataSource<Product>();

    formProdAttr = this.fb.group({
        price: [0, Validators.required],
        color: ["", Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        public productSer: ProductService,
        public fileSer: FileService
    ) {}

    ngOnInit() {
        this.getDataProduct();
    }

    onShowDetail(item: Product) {
        this.itemSelected = item;
        this.lsImages = JSON.parse(item.images);
        this.formProdAttr.patchValue(item);
    }

    onDelete(item: Product) {
        this.productSer.deleteAttr(item.id).subscribe((val) => {
            let idx = this.tableData.data.findIndex((p) => p.id == item.id);
            if (idx != -1) {
                this.lsProductAttrs.splice(idx, 1);
                this.tableData._updateChangeSubscription();

                this.ctainerList.isLoaded = true;
            } else this.getDataProduct();
        });
    }

    onSubmit(e, imgs: any[]) {
        this.formProdAttr.markAllAsTouched();
        if (this.formProdAttr.invalid) return;
        e.preventDefault();
        let product: Product = this.formProdAttr.getRawValue();
        product.price = Number(product.price);
        this.itemSelected
            ? this.update(product, imgs)
            : this.add(product, imgs);
    }

    onReset(e) {}

    //====================
    getDataProduct() {
        this.productSer.getListAttr(this.itemId).subscribe(
            (val) => {
                console.log(val);
                this.lsProductAttrs = val;
                this.tableData.data = this.lsProductAttrs;
                this.tableData._updateChangeSubscription();
                this.ctainerList.isLoaded = true;
            },
            (er) => {
                this.ctainerList.isDataEmpty = true;
                this.ctainerList.isLoaded = true;
            }
        );
    }

    update(item: Product, imgs: any[]) {
        this.ctainerForm.isLoaded = false;
        let stringImg:string[] = [];
        let files: File[] = [];
        if (imgs)
            imgs.forEach((item) => {
                stringImg.push(item.name);
                if (item.file) {
                    files.push(item.file);
                }
            });
        item.images =JSON.stringify(stringImg) ;
        //
        this.productSer.updateAttr(this.itemSelected.id, item).subscribe(
            (val) => {
                let idx = this.lsProductAttrs.findIndex((p) => p.id == item.id);
                if (idx != 1) {
                    // this.lsProductAttrs[idx] = item;
                    let url = this.productSer.getUrlUpload();
                    if (files.length > 0)
                        files.forEach((item) => this.fileSer.upload(item, url));
                    this.tableData._updateChangeSubscription();
                } else this.getDataProduct();
                this.ctainerForm.isLoaded = true;
            },
            (er) => {
                this.ctainerForm.isDataEmpty = true;
                this.ctainerForm.isLoaded = true;
            }
        );
    }

    add(item: Product, imgs: any[]) {
        this.ctainerForm.isLoaded = false;
        let stringImg:string[] = [];
        let files: File[] = [];
        if (imgs)
            imgs.forEach((item) => {
                stringImg.push(item.name);
                if (item.file) {
                    files.push(item.file);
                }
            });
        item.images =JSON.stringify(stringImg);
        //
        this.productSer.addAttr(this.itemId, item).subscribe(
            (val) => {
                this.lsProductAttrs.unshift(val);
                let url = this.productSer.getUrlUpload();
                if (files.length > 0)
                    files.forEach((item) => this.fileSer.upload(item, url));
                this.tableData._updateChangeSubscription();
                this.itemSelected =null;
                this.ctainerForm.isLoaded = true;
            },
            (er) => {
                this.ctainerForm.isDataEmpty = true;
                this.ctainerForm.isLoaded = true;
            }
        );
    }
}
