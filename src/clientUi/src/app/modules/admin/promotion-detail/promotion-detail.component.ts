import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, NgForm, Validators } from "@angular/forms";
import { merge } from "rxjs";
//module
import {
    Promotion,
    PromBill,
    PromProduct,
    PromPoint,
    Category,
} from "src/app/models/IModels";
//service
import { PromotionService } from "src/app/services/promotion.service";
import { CategoryService } from "src/app/services/category.service";
import { Observable, Subject } from "rxjs";
import { finalize } from "rxjs/operators";

@Component({
    selector: "app-promotion-detail",
    templateUrl: "./promotion-detail.component.html",
    styleUrls: ["./promotion-detail.component.scss"],
})
export class PromotionDetailComponent implements OnInit {
    isLoaded: boolean = true;
    message: string = "Can't get data";
    //
    itemId: number;
    itemType: number;
    promotion: Promotion;
    promDetail: any;
    listCate: Category[];
    listPropDetail: string[];
    //
    promFormValidate = this.fb.group({
        name: ["", Validators.required],
        fromDate: [new Date(), Validators.required],
        toDate: [new Date(), Validators.required],
    });
    //
    productFormValidate = this.fb.group({
        discount: [0, Validators.required],
        categoryId: [0],
    });
    //
    billFormValidate = this.fb.group({
        discount: [0, Validators.required],
        conditionItem: [0],
        conditionAmount: [0],
    });
    //
    pointFormValidate = this.fb.group({
        discountIn: [0, Validators.required],
        discountOut: [0, Validators.required],
    });

    constructor(
        private promService: PromotionService,
        private cateService: CategoryService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit() {
        merge(this.getDataCate(), this.getDataRoute(), this.getDataProm())
            .pipe(finalize(() => (this.isLoaded = true)))
            .subscribe();

    }

    onSave(e) {
        if (this.promFormValidate.invalid) return;
        e.preventDefault();
        let obj: Promotion = this.promFormValidate.value;
        obj["type"]=1;
        let detail;
        switch ( Number(this.itemType)) {
            case 1:
                if (this.productFormValidate.invalid) return;
                detail = this.productFormValidate.value;
                break;
            case 2:
                if (this.billFormValidate.invalid) return;
                detail = this.billFormValidate.value;
                break;
            case 3:
                if (this.pointFormValidate.invalid) return;
                detail = this.pointFormValidate.value;
                break;
        }
        if (!detail) return;
        obj.itemDetail = JSON.stringify(detail);
        // obj.type=this.itemType;
        this.itemId ? this.update(obj) : this.add(obj);
    }

    onReset() {}

    

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
            if (!val) this.message = "Can't get category data";
            else this.listCate = val;
            obs.complete();
        });
        return obs;
    }

    private getDataProm(): Observable<any> {
        let obs = new Subject();
        if (!this.itemType) {
            this.message = "Type of promotion invalid";
            obs.complete();
            return obs;
        }
        if (!this.itemId) {
            this.itemId =0;
            obs.complete();
            return obs;
        }
        else
        this.promService.get(this.itemId).subscribe((val) => {
            if (!this.promotion.itemDetail) {
                this.message = "Can't get detail promotion";
                return;
            }
            this.promotion = val;
            this.promFormValidate.setValue(val);
            let detail = JSON.parse(this.promotion.itemDetail);
            this.showDetail(detail);
            obs.complete();
        });
        return obs;
    }

    private showDetail(detail) {
        switch (this.itemType) {
            case 1:
                this.promFormValidate.setValue(detail);
                break;
            case 2:
                this.billFormValidate.setValue(detail);
                break;
            case 3:
                this.pointFormValidate.setValue(detail);
                break;
        }
    }

    private update(prom) {
        this.promService.update(this.itemId, prom).subscribe();
    }

    private add(prom: Promotion) {
        this.promService.add(prom).subscribe((val) => {
            if (val) this.router.navigate(["promotion-detail", val]);
        });
    }

    // private showDetail(){
    //     if(this.)
    // }
}
