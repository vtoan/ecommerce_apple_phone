import { Component, Input, OnInit } from "@angular/core";
import { Container } from "src/app/models/container";
import { Product } from "src/app/models/IModels";
import { ProductService } from "src/app/services/product.service";

@Component({
    selector: "app-products-relate",
    templateUrl: "./products-relate.component.html",
    styleUrls: ["./products-relate.component.scss"],
})
export class ProductsRelateComponent implements OnInit {
    @Input() query: string;
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "Not found product relate",
    };

    listProduct:Product[];

    constructor(private productSer: ProductService) {}

    ngOnInit() {
        if (!this.query) {
            this.container.isDataEmpty = true;
            this.container.isLoaded = true;
        }
        this.productSer.search(this.query).subscribe(
            (val) => {
                // console.log(val);
                this.listProduct = val.slice(0,4);
                this.container.isDataEmpty = false;
                this.container.isLoaded = true;
            },
            (er) => {
                this.container.isDataEmpty = true;
                this.container.isLoaded = true;
            }
        ); 
    }
}
