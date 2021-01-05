import { Component, OnInit } from "@angular/core";
//service
import { ProductService } from "src/app/services/product.service";
//model
import { Product } from "src/app/models/IModels";
import { Container } from "src/app/models/container";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    ctaierSeller: Container = {
        isLoaded: false,
        isDataEmpty: false,
    };

    ctaierDiscount: Container = {
        isLoaded: false,
        isDataEmpty: false,
    };

    listSeller: Product[];
    listDiscount: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.getSeller();
        this.getDiscount();
    }

    private getSeller() {
        this.productService.getListBestSeller().subscribe(
            (resp) => {
                if(resp &&resp.length>0) this.listSeller = resp;
                else this.ctaierSeller.isDataEmpty =true;
                this.ctaierSeller.isLoaded = true;
            },
            (er) => {
                this.ctaierSeller.isDataEmpty = true;
                this.ctaierSeller.isLoaded = true;
            }
        );
    }

    private getDiscount() {
        this.productService.getListDiscount(4).subscribe(
            (resp) => {
                if(resp &&resp.length>0) this.listDiscount = resp;
                else this.ctaierDiscount.isDataEmpty =true;
                this.ctaierDiscount.isLoaded = true;
            },
            (er) => {
                this.ctaierDiscount.isDataEmpty = true;
                this.ctaierDiscount.isLoaded = true;
            }        );
    }
}
