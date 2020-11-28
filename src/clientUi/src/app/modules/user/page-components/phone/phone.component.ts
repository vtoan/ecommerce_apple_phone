import { Component, OnInit } from "@angular/core";
//service
import { ProductService } from "src/app/services/product.service";
//model
import { Product } from "src/app/models/IModels";

@Component({
    selector: "app-phone",
    templateUrl: "./phone.component.html",
    styleUrls: ["./phone.component.scss"],
})
export class PhoneComponent implements OnInit {
    isLoaded: boolean = false;
    listProducts: Product[];
    message: string = "Data is empty";
    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.listProducts = [];
        this.productService.getListByCate(1).subscribe(
            (resp) => {
                if (resp != null || resp) this.listProducts = resp;
                console.log(resp);
            },
            (er) => (this.message = er),
            () => (this.isLoaded = true)
        );
    }
}
