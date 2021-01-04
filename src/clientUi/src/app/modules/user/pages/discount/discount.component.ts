import { Component, OnInit } from "@angular/core";
//service
import { ProductService } from "src/app/services/product.service";
//model
import { Product } from "src/app/models/IModels";
import { Container } from "src/app/models/container";

@Component({
    selector: "app-discount",
    templateUrl: "./discount.component.html",
    styleUrls: ["./discount.component.scss"],
})
export class DiscountComponent implements OnInit {
    ctainer: Container = {
        isLoaded: false,
        isDataEmpty: false,
    };
    isLoaded: boolean = false;
    listProducts: Product[];
    message: string = "Data is empty";
    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.listProducts = [];
        this.productService.getListDiscount().subscribe(
            (resp) => {
                if (resp != null || resp) this.listProducts = resp;
                this.ctainer.isLoaded =true;
            },
            (er) => {
                this.ctainer.isDataEmpty =true;
                this.ctainer.isLoaded=true;
            },
        );
    }
}
