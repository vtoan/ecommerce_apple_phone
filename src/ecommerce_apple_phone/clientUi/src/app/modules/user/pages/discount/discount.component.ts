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
    listProducts: Product[];
    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getListDiscount().subscribe(
            (resp:Product[]) => {
                console.log(resp);
                if (resp != null && resp.length!=0) this.listProducts = resp;
                else this.ctainer.isDataEmpty =true;
                this.ctainer.isLoaded =true;
            },
            (er) => {
                this.ctainer.isDataEmpty =true;
                this.ctainer.isLoaded=true;
            },
        );
    }
}
