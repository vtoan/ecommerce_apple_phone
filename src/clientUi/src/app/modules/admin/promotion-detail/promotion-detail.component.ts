import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//module
import {
    Promotion,
    PromBill,
    PromProduct,
    // PromPoint,
    Category,
} from "src/app/models/IModels";
//service
import { PromotionService } from "src/app/services/promotion.service";
import { CategoryService } from "src/app/services/category.service";
import { Observable, Subject, concat } from "rxjs";
import { finalize } from "rxjs/operators";
import { Container } from "src/app/models/container";

@Component({
    selector: "app-promotion-detail",
    templateUrl: "./promotion-detail.component.html",
    styleUrls: ["./promotion-detail.component.scss"],
})
export class PromotionDetailComponent implements OnInit {
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "Promotion not found",
    };
    //
    itemId: number;
    itemType: number;
    promotion: Promotion;
    promDetail: any;
    listCate: Category[];
    //
    promValidate = this.fb.group({
        name: ["", Validators.required],
        fromDate: [new Date(), Validators.required],
        toDate: [new Date(), Validators.required],
    });
    //
    productValidate = this.fb.group({
        discount: [0, Validators.required],
        suffix: ["currency", Validators.required],
        categoryId: [0],
    });
    //
    billValidate = this.fb.group({
        discount: [0, Validators.required],
        suffix: ["currency", Validators.required],
        conditionItem: [0],
        conditionAmount: [0],
    });

    constructor(
        private promService: PromotionService,
        private cateService: CategoryService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit() {
        concat(this.getDataRoute(), this.getDataProm())
            .pipe(
                finalize(() => {
                    this.container.isLoaded = true;
                })
            )
            .subscribe();
        this.getDataCate();
    }

    onSave(e) {
        this.promValidate.markAllAsTouched();
        if (this.promValidate.invalid) return;
        e.preventDefault();
        let obj: Promotion = this.promValidate.value;
        let detail = this.getValueDetail(this.itemType);
        if (!detail) return;
        obj.itemDetail = JSON.stringify(detail);
        if (this.itemId) this.update(obj);
        else this.add(obj);
    }

    onReset() {
        this.router.navigate(["admin/promotion"]);
    }

    // =========== helpful ============
    private getDataRoute(): Observable<any> {
        let obs = new Subject();
        this.route.params.subscribe((parmas) => {
            this.itemId = parmas["id"];
            this.itemType = parmas["type"];
            obs.complete();
        });
        return obs;
    }

    private getDataCate() {
        let obs = new Subject();
        this.cateService.getList().subscribe((val) => {
            if (!val) this.container.displayText = "Can't get category data";
            else this.listCate = val;
            obs.complete();
        });
        return obs;
    }

    private getDataProm(): Observable<any> {
        let obs = new Subject();
        if (!this.itemType) {
            this.container.displayText = "Type of promotion invalid";
            obs.complete();
            return obs;
        }
        if (!this.itemId) {
            this.itemId = 0;
            obs.complete();
            return obs;
        } else
            this.promService.get(this.itemId).subscribe((val) => {
                console.log(val);
                if (!val.itemDetail)
                    this.container.displayText = "Can't get promotion";
                else {
                    this.promotion = val;
                    this.promValidate.patchValue({
                        name: val.name,
                        fromDate: val.fromDate,
                        toDate: val.toDate,
                    });
                    let detail = JSON.parse(this.promotion.itemDetail);
                    console.log(detail);
                    this.showDetail(detail);
                }

                obs.complete();
            });
        return obs;
    }

    private showDetail(detail) {
        switch (Number(this.itemType)) {
            case 1:
                this.productValidate.patchValue(detail);
                let disco = detail.discount;
                if (disco % 1 == 0)
                    this.productValidate.patchValue({
                        suffix: "currency",
                    });
                else
                    this.productValidate.patchValue({
                        suffix: "precent",
                        discount: disco * 100,
                    });
                break;
            case 2:
                this.billValidate.patchValue(detail);
                this.billValidate.patchValue({
                    suffix: detail.discount % 1 == 0 ? "currency" : "precent",
                });
                break;
        }
    }

    private getValueDetail(typeItem) {
        let detail = null;
        switch (Number(typeItem)) {
            case 1:
                if (this.productValidate.invalid) return;
                detail = this.productValidate.value;
                break;
            case 2:
                if (this.billValidate.invalid) return;
                detail = this.billValidate.value;
                detail.conditionItem = Number(detail.conditionItem ); 
                detail.conditionAmount = Number(detail.conditionAmount ); 
                break;
        }
        if (detail.suffix == "precent") detail.discount = detail.discount / 100;
        detail.discount = Number(detail.discount);
        console.log(detail);
        return detail;
    }

    private update(prom) {
        this.promService.update(this.itemId, prom).subscribe();
    }

    private add(prom: Promotion) {
        this.promService.add(this.itemType, prom).subscribe((val) => {
            if (val) this.router.navigate(["admin/promotion"]);
        });
    }
}
