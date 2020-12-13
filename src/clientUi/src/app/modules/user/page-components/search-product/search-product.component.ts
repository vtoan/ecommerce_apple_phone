import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
//service
import { ProductService } from "src/app/services/product.service";
//model
import { Product } from "src/app/models/IModels";

@Component({
    selector: "app-search-product",
    templateUrl: "./search-product.component.html",
    styleUrls: ["./search-product.component.scss"],
})
export class SearchProductComponent implements OnInit {
    isLoaded: boolean = false;
    listProducts: Product[];
    message: string = "Not found data match with";
    queryString: any;
    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.queryString = params["query"];
        });
        this.listProducts = [];
        //
        if (!this.queryString) {
            this.isLoaded = true;
            return;
        }
        this.productService.search(this.queryString).subscribe(
            (resp) => {
                if (resp != null || resp) this.listProducts = resp;
            },
            (er) => (this.message = er),
            () => (this.isLoaded = true)
        );
    }
}
