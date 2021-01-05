import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { concat, Observable, Subject } from "rxjs";
import { finalize } from "rxjs/operators";
//model
import { Category, Product, PromProduct } from "src/app/models/IModels";
//service
import { ProductService } from "src/app/services/product.service";
import { PromotionService } from "src/app/services/promotion.service";
import { CategoryService } from "src/app/services/category.service";
import { FileService } from "src/app/services/file.service";
import { Container } from "src/app/models/container";
import { MessageService } from "src/app/services/message.service";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    //
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "Data is't found",
    };
    //
    listProduct: Product[];
    listPromotion: PromProduct[];
    listPromName: string[] = ["Not Promotion"];
    listCategory: Category[];
    //
    tableData = new MatTableDataSource();
    constructor(
        private productService: ProductService,
        private promService: PromotionService,
        private categoryService: CategoryService,
        private fileService: FileService,
        private msgSer: MessageService
    ) {}

    ngOnInit() {
        concat(
            this.getDataPromotion(),
            this.getDataProduct(),
            this.getDataCategory()
        )
            .pipe(
                finalize(() => {
                    if (this.listPromotion && this.listPromotion.length > 0)
                        this.attachProm();
                    this.container.isLoaded = true;
                })
            )
            .subscribe();
    }

    ngAfterViewInit(): void {
        this.tableData.paginator = this.paginator;
    }

    onChangeStatus(item: Product) {
        this.productService
            .updateStatus(item.id, !item.isShow)
            .subscribe((val) => {
                item.isShow = !item.isShow;
            });
    }

    onChangePromotion(index, item: Product) {
        if (item.promId < 0) {
            this.msgSer.showFail("Product belong to promotion of category");
            return;
        }
        let idx = this.listPromotion.findIndex(
            (prom) =>
                prom.id == (item.promId < 0 ? item.promId * -1 : item.promId)
        );
        if (index == idx + 1) return;
        //
        let newPromId = index == 0 ? 0 : this.listPromotion[index - 1].id;
        this.promService
            .changePromProduct(item.promId, newPromId, item.id)
            .subscribe((val) => {
                item.promId = newPromId;
            });
    }

    getImageUrl(item: Product) {
        if (!item.images) return;
        let imgs = Object.values(JSON.parse(item.images));
        return this.fileService.rootPath + "/" + imgs[0];
    }

    getCategory(item: Product) {
        let cateId = item.categoryId;
        if (!this.listCategory || this.listCategory.length == 0) return cateId;
        return this.listCategory.find((cate) => cate.id == cateId).name;
    }

    getPromotion(item: Product) {
        if (!this.listPromotion) return "Unknown";
        let idx = this.listPromotion.find((prom) => prom.id == (item.promId < 0 ? item.promId * -1 : item.promId));
        return idx ? idx.name : "Not promotion";
    }

    // ============= method ===============
    private getDataProduct(): Observable<any> {
        let obs = new Subject();
        this.productService.getList().subscribe(
            (resp) => {
                this.listProduct = resp;
                this.tableData.data = this.listProduct;
                this.tableData._updateChangeSubscription();
                obs.complete();
            },
            (erVal) => {
                this.container.isDataEmpty = true;
                obs.complete();
            }
        );
        return obs;
    }

    private getDataPromotion(): Observable<any> {
        let obs = new Subject();
        this.promService.getListOfProduct().subscribe(
            (resp) => {
                console.log(resp);
                this.listPromotion = resp;
                resp.forEach((item) => this.listPromName.push(item.name));
                obs.complete();
            },
            (erVal) => {
                // this.listPromotion = erVal;
                obs.complete();
            }
        );
        return obs;
    }

    private getDataCategory(): Observable<any> {
        let obs = new Subject();
        this.categoryService.getList().subscribe(
            (resp) => {
                this.listCategory = resp;
                obs.complete();
            },
            (erVal) => {
                this.listCategory = erVal;
                obs.complete();
            }
        );
        return obs;
    }

    private attachProm() {
        for (const prom of this.listPromotion) {
            let arIds: number[] = JSON.parse(prom.productInProms);
            let cateIds: number = prom.categoryId;
            if (cateIds) {
                this.listProduct.forEach((product) => {
                    if (product.categoryId == cateIds)
                        product.promId = -prom.id;
                    // else product.promId = 0;
                });
            }
            if (arIds != null)
                this.listProduct.forEach((product) => {
                    let itemId = Number(product.id.split("A")[0]);
                    if (arIds.indexOf(itemId) >= 0) product.promId = prom.id;
                    // else product.promId = 0;
                });
        }
    }
}
