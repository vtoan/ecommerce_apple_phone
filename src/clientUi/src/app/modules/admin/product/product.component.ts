import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import {
    concat,
    of,
} from "rxjs";

//model
import { Category, Product, PromProduct } from "src/app/models/IModels";
//service
import { ProductService } from "src/app/services/product.service";
import { PromotionService } from "src/app/services/promotion.service";
import { CategoryService } from "src/app/services/category.service";
import { FileService } from "src/app/services/file.service";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    isLoaded: boolean = false;
    //
    listProduct: Product[] = null;
    listPromotion: PromProduct[] = null;
    listPromName: string[] = ["Not Promotion"];
    listCategory: Category[] = null;
    //
    tableData = new MatTableDataSource();
    constructor(
        private productService: ProductService,
        private promService: PromotionService,
        private categoryService: CategoryService,
        private fileService: FileService
    ) {}

    ngOnInit() {
        concat(
            of(this.getDataPromotion()),
            of(this.getDataProduct()),
            of(this.getDataCategory())
        ).subscribe({
            complete() {
                this.isLoaded = false;
            },
        });
    }

    ngAfterViewInit(): void {
        this.tableData.paginator = this.paginator;
    }

    onChangeStatus(item: Product) {
        this.productService.updateStatus(item.id, item.isShow)
    }

    onChangePromotion(index, item) {
        let arp = item.promotion.split("%");
        let idx = this.listPromotion.findIndex((prom) => prom.id == Number(arp[0]));
        if (idx == -1 && index == 0) return;
        if (idx == index) return;
        console.log("o?");
        let itemId = Number(item.id.split("-")[0]);
        this.promService.changePromProduct(
            arp[0],
            this.listPromotion[idx-1].id,
            itemId
        );
    }

    getImageUrl(item: Product) {
        let imgs = Object.values(JSON.parse(item.images));
        return this.fileService.rootPath + "/" + imgs[0];
    }

    getCategory(item: Product) {
        let cateId = item.categoryId;
        if (!this.listCategory || this.listCategory.length == 0) return cateId;
        return this.listCategory.find((cate) => cate.id == cateId).name;
    }

    getPromotion(promId) {
        let idx = this.listPromotion.find(item => item.id==promId);
        return idx ? idx.name : "No promotion";
    }

    // ============= method ===============
    private getDataProduct() {
        this.productService.getList().subscribe(
            (resp) => {
                this.isLoaded = true;
                this.listProduct = resp;
                this.tableData.data = this.listProduct;
                this.tableData._updateChangeSubscription();
                if (this.listPromotion.length > 0) this.attachProm();
            },
            (erVal) => (this.listProduct = erVal)
        );
    }

    private getDataPromotion() {
        this.promService.getListOfProduct().subscribe(
            (resp) => {
                this.listPromotion = resp;
                resp.forEach((item) => this.listPromName.push(item.name));
            },
            (erVal) => (this.listPromotion = erVal)
        );
    }

    private getDataCategory() {
        this.categoryService.getList().subscribe(
            (resp) => {
                this.listCategory = resp;
            },
            (erVal) => (this.listCategory = erVal)
        );
    }

    private attachProm() {
        for (const prom of this.listPromotion) {
            let arIds: number[] = JSON.parse(prom.productInProms);
            if (this.listProduct)
                this.listProduct.forEach((item) => {
                    let itemId = Number(item.id.split("-")[0]);
                    if (arIds.includes(itemId))
                        item.promotion =prom.id+"";
                });
        }
    }
}
