import { Component, ComponentRef, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
//service
import { ProductService } from "src/app/services/product.service";
//model
import { Product } from "src/app/models/IModels";
import { ListProductComponent } from "../../components/list-product/list-product.component";

@Component({
    selector: "app-search-product",
    templateUrl: "./search-product.component.html",
    styleUrls: ["./search-product.component.scss"],
})
export class SearchProductComponent implements OnInit {
    @ViewChild('lsProduct', {static : true}) comp :ComponentRef<ListProductComponent>

    isLoaded: boolean = false;
    listProducts: Product[] =[];
    message: string = "Not found data match with";
    queryString: any;
    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.queryString = params["query"];
            this._search(this.queryString);
        });
        //
        if (!this.queryString) {
            this.isLoaded = true;
            return;
        }
    }
    private _search(queryStr){
        this.productService.search(queryStr).subscribe(
            (resp) => {
                this.listProducts = resp;
                this.isLoaded = true;
            },
            (er) => {
                this.message = er;
                this.listProducts=[];
                this.isLoaded = true;
            },
        );
    }
}
