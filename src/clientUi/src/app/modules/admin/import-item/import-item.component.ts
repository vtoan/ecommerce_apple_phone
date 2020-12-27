import { ImplicitReceiver } from "@angular/compiler";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ImportDetail, Product, ProductDetail } from "src/app/models/IModels";
import { ProductService } from "src/app/services/product.service";
import { ImportService } from "../services/import.service";

@Component({
    selector: "app-import-item",
    templateUrl: "./import-item.component.html",
    styleUrls: ["./import-item.component.scss"],
})
export class ImportItemComponent implements OnInit {
    @Input() lsProducts: Product[] = [];
    @Input() impItem: ImportDetail;
    @Output() onDelete = new EventEmitter();
    lsAttribute: Product[] = [];
    data: ImportDetail;
    productCtrl = new FormControl("",Validators.required);
    isValid: boolean = false;
    filteredOptions: Observable<Product[]>;
    impCtrl = this.fb.group({
        productId: ["", Validators.required],
        quantity: [0, [Validators.min(1),Validators.required]],
        price: [0, [Validators.min(1),Validators.required]],
    });
    constructor(private fb: FormBuilder, private productSer: ProductService) {}

    ngOnInit() {
        this.data = this.impItem;
        this.filteredOptions = this.productCtrl.valueChanges.pipe(
            startWith(""),
            map((value) => this._filter(value))
        );
        this.impCtrl.valueChanges.pipe().subscribe((val: ImportDetail) => {
            if (!val.price || !val.productId || !val.quantity) {
                this.isValid = false;
                return;
            }
            this.data.price=Number(val.price)
            this.data.quantity=Number(val.quantity)
            this.data.productId = val.productId
            this.isValid = true;
        });
    }

    onSelectProd(itemId: string) {
        let ar = itemId.split(",");
        this._getDataAttr(ar[0]);
    }

    onChangeColor(itemId: string) {
        this.data.productId = itemId;
    }

    onTouched(){
        this.impCtrl.markAllAsTouched();
        this.productCtrl.markAsTouched();
    }

    private _filter(value: string): Product[] {
        const filterValue = value.toLowerCase();
        return this.lsProducts.filter(
            (option) => option.name.toLowerCase().indexOf(filterValue) === 0
        );
    }

    private _getDataAttr(itemId: string) {
        this.productSer.getListAttr(itemId).subscribe(
            (val) => {
                this.lsAttribute = val;
            },
            (er) => (this.lsAttribute = [])
        );
    }

}
