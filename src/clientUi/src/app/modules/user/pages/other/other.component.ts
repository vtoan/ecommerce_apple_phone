import { Component, OnInit } from "@angular/core";
//service
import { ProductService } from "src/app/services/product.service";
//model
import { Product } from "src/app/models/IModels";

@Component({
    selector: "app-other",
    templateUrl: "./other.component.html",
    styleUrls: ["./other.component.scss"],
})
export class OtherComponent implements OnInit {
    isLoaded: boolean = false;
    listProducts: Product[];
    message: string = "";
    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.listProducts = [];
        this.productService
            .getListByCate(3)
            .pipe()
            .subscribe(
                (val) => {
                    if (val) this.listProducts = val;
                },
                (er) => console.log(er),
                () => (this.isLoaded = true)
            );
    }
}
