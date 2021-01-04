import { Component, OnInit } from "@angular/core";
//service
import { ProductService } from "src/app/services/product.service";
//model
import { Product } from "src/app/models/IModels";
import { Container } from "src/app/models/container";

@Component({
    selector: "app-other",
    templateUrl: "./other.component.html",
    styleUrls: ["./other.component.scss"],
})
export class OtherComponent implements OnInit {
    ctainer:Container={
        isLoaded:false,
        isDataEmpty:false
    }
    listProducts: Product[];
    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService
            .getListByCate(3)
            .pipe()
            .subscribe(
                (val) => {
                    console.log(val);
                    if(val && val.length>0) this.listProducts = val;
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
