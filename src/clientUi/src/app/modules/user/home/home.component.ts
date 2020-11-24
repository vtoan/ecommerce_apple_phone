import { Component, OnInit } from "@angular/core";
//service
import { ProductService } from "src/app/services/product.service";
//model
import { Product } from "src/app/models/IModels";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    listSeller: Product[] = null;
    listDiscount: Product[] = null;
    message: string;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.getSeller();
        this.getDiscount();
    }

    private getSeller() {
        this.productService.getListBestSeller().subscribe(
            (resp) => {
                if (resp != null || resp) {
                    this.listSeller = [];
                    this.listSeller = resp;
                }
            },
            (er) => (this.message = er),
            () => (this.listSeller = [])
        );
    }

    private getDiscount() {
        this.productService.getListDiscount().subscribe(
            (resp) => {
                if (resp != null || resp) {
                    this.listDiscount = [];
                    this.listDiscount = resp;
                }
            },
            (er) => (this.message = er),
            () => (this.listDiscount = [])
        );
    }
}
