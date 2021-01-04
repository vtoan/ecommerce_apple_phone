import { Component, OnInit } from "@angular/core";
//service
import { ProductService } from "src/app/services/product.service";
//model
import { Product } from "src/app/models/IModels";
import { Container } from "src/app/models/container";
import { Subject } from "rxjs";

@Component({
    selector: "app-phone",
    templateUrl: "./phone.component.html",
    styleUrls: ["./phone.component.scss"],
})
export class PhoneComponent implements OnInit {
    ctainer:Container={
        isLoaded:false,
        isDataEmpty:false
    }
    listProducts: Product[];
    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getListByCate(1).subscribe(
            (resp) => {
                if(resp && resp.length>0) this.listProducts = resp;
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
