import { Component, OnInit } from "@angular/core";
//service
import { ProductService } from "src/app/services/product.service";
//model
import { Product } from "src/app/models/IModels";
import { Container } from "src/app/models/container";

@Component({
    selector: "app-watch",
    templateUrl: "./watch.component.html",
    styleUrls: ["./watch.component.scss"],
})
export class WatchComponent implements OnInit {
    ctainer: Container = {
        isLoaded: false,
        isDataEmpty: false,
    };
    listProducts: Product[];
    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.listProducts = [];
        this.productService.getListByCate(2).subscribe(
            (resp) => {
                if (resp != null || resp) this.listProducts = resp;
                this.ctainer.isLoaded = true;
            },
            (er) => {
                this.ctainer.isDataEmpty = true;
                this.ctainer.isLoaded = true;
            }
        );
    }
}
