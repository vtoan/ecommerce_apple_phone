import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
// models
import {
    Product,
    ProductDetail,
    Post,
    Feedback,
    Promotion,
    PromBill,
} from "src/app/models/IModels";
//service
import { ProductService } from "src/app/services/product.service";
import { FileService } from "src/app/services/file.service";
import { PromotionService } from "src/app/services/promotion.service";
import { ErrorService } from "../../services/error.service";
import { CartService } from "../../services/cart.service";
import { MessageService } from "src/app/services/message.service";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
    isLoaded: boolean = false;
    //
    itemId:string;
    listAttr: Product[];
    productDetail: ProductDetail;
    //
    itemActive: string;
    imageDisplay: string;
    listImage: string[] = [];
    itemPrice: number = 0;
    itemDiscount: number = 0;
    //
    listProm: PromBill[] = [];
    listProductRelate: Product[];

    constructor(
        public fileService: FileService,
        private productService: ProductService,
        private promService: PromotionService,
        private route: ActivatedRoute,
        private errService: ErrorService,
        private cartService: CartService,
        private meesageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            let prodId = params["id"];
            if (!prodId || prodId == null){
                this.errService.redirectError("Badrequest");
                return;
            }
            this.itemId = prodId;
            this.getProductData(prodId);
            this.getSubData(prodId);
        });
    }

    onChangeColor(id: string) {
        let idx = this.listAttr.findIndex((item) => item.id == id);
        if (idx >= 0) this.productAttrDisplay(idx);
    }

    onNextGallery() {
    }

    onPrevGallery() {}

    onAddCart() {
        let idx = this.listAttr.findIndex((item) => item.id == this.itemActive);
        if (idx < 0) this.meesageService.showFail("Can't item to cart");
        else {
            this.cartService.addToCart(this.listAttr[idx]);
            this.meesageService.showSuccess("Added item to cart");
        }
    }

    onBuyNow() {
        let idx = this.listAttr.findIndex((item) => item.id == this.itemActive);
        if (idx > 0) {
            this.router.navigate(["cart"])
            this.meesageService.showFail("Can't item to cart");
        }
        else {
            this.cartService.addToCart(this.listAttr[idx])
        }
    }

    // =========== private =============
    private getProductData(id: string) {
        // get detail
        this.productService.get(id).subscribe(
            (val) => {
                this.productDetail = val;
            },
            (er) => this.errService.redirectError("Not found product detail")
        );
        // get list product attribute
        this.productService.getListAttr(id).subscribe(
            (val) => {
                this.listAttr = val;
                if (this.listAttr != null)
                    // get product relate
                    this.productService.search("iphone").subscribe((val) => {
                        this.listProductRelate = val.slice(0, 4);
                    });
                this.productAttrDisplay(0);
            },
            (er) => this.errService.redirectError("Not found product detail"),
            () => (this.isLoaded = true)
        );
    }

    private productAttrDisplay(idx) {
        let item = this.listAttr[idx];
        this.itemPrice = item.price;
        this.itemDiscount =
            item.discount % 1 == 0 ? item.discount : item.price * item.discount;
        this.listImage = Object.values(JSON.parse(item.images));
        this.imageDisplay = this.listImage[0];
        this.itemActive = item.id;
    }

    private getSubData(id: string) {
        this.promService.getListOfBill().subscribe((val) => {
            this.listProm = val;
        });
    }
}
