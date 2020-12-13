import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { concat, of, throwError } from "rxjs";
//models
import { Category, ProductDetail } from "src/app/models/IModels";
//service
import { ProductService } from "src/app/services/product.service";
import { CategoryService } from "src/app/services/category.service";
import {
    catchError,
    finalize,
} from "rxjs/operators";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
    isLoaded: boolean = false;
    //
    private itemId: string;
    cateSelected;
    prodDetail: ProductDetail;
    listCate: Category[];
    //
    listPropertys: PropInput[] = [
        { label: "Man hinh", name: "screen" },
        { label: "Camera chinh", name: "fontCamera" },
        { label: "Camera phu", name: "rearCamera" },
        { label: "He dieu hanh", name: "operationSystem" },
        { label: "Chip set", name: "chipset" },
        { label: "ROM", name: "rom" },
        { label: "RAM", name: "ram" },
        { label: "Thong so", name: "parameter" },
        { label: "Khoi luong", name: "weight" },
        { label: "Pin", name: "battery" },
    ];
    formValidate = this.fb.group({
        screen: [""],
        fontCamera: [""],
        rearCamera: [""],
        operationSystem: [""],
        chipset: [""],
        rom: [""],
        ram: [""],
        connector: [""],
        parameter: [""],
        weight: [""],
        battery: [""],
        functionOther: [""],
        categoryId: ["", Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private cateService: CategoryService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        concat(
            of(this.getDataRoute()),
            of(this.getDataProduct()),
            of(this.getDataCate())
        )
            .pipe(finalize(() => (this.isLoaded = true)))
            .subscribe();
    }

    onSubmit(e) {
        if (this.formValidate.invalid) return;
        e.preventDefault();
        let prod: ProductDetail = this.formValidate.value;
        this.isLoaded = false;
        this.itemId ? this.update(prod) : this.add(prod);
    }

    onCanncel() {
        this.formValidate.setValue(this.prodDetail);
    }

    // =========== usefull ============
    private getDataRoute() {
        this.route.params.subscribe((params) => {
            this.itemId = params["id"];
        });
    }

    private getDataProduct() {
        if (!this.itemId) {
            this.prodDetail = {
                screen: "",
                fontCamera: "",
                rearCamera: "",
                operationSystem: "",
                chipset: "",
                rom: "",
                ram: "",
                connector: "",
                parameter: "",
                weight: "",
                battery: "",
                functionOther: "",
                categoryId: 0,
            };
            return;
        }

        this.productService.get(this.itemId).subscribe(
            (val) => {
                this.prodDetail = val;
                this.formValidate.setValue(val);
            },
            (valDef) => (this.prodDetail = valDef)
        );
    }

    private getDataCate() {
        this.cateService.getList().subscribe(
            (val) => {
                this.listCate = val;
            },
            (valDef) => (this.cateService = valDef)
        );
    }

    private update(prod: ProductDetail) {
        this.productService
            .update(this.itemId, prod)
            .pipe(
                catchError(() => (this.prodDetail = null)),
                finalize(() => (this.isLoaded = true))
            )
            .subscribe();
    }

    private add(prod: ProductDetail) {
        this.productService.add(prod).subscribe(
            (val) => {
                this.router.navigate(["admin/product-detail", 1]);
            },
            (er) => (this.prodDetail = null),
            () => (this.isLoaded = true)
        );
    }
}

export interface PropInput {
    label: string;
    name: string;
}
