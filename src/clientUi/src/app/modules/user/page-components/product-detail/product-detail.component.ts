import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
import { PostService } from "src/app/services/post.service";
import { FeedbackService } from "src/app/services/feedback.service";
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
    title = "San pham";
    //
    listAttr: Product[];
    productDetail: ProductDetail;
    //
    itemActive: string;
    imageDisplay: string;
    listImage: string[] = [];
    itemPrice: number = 0;
    itemDiscount: number = 0;
    //
    postObject: Post;
    listFeedback: Feedback[];
    listProm: Promotion[] = [];
    listProductRelate: Product[];

    constructor(
        public fileService: FileService,
        private productService: ProductService,
        private promService: PromotionService,
        private feedBackService: FeedbackService,
        private postService: PostService,
        private route: ActivatedRoute,
        private errService: ErrorService,
        private cartService: CartService,
        private meesageService: MessageService,
        private location: Location
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            let itemId = params["id"];
            console.log(itemId);
            if (!itemId || itemId == null)
                this.errService.redirectError("Badrequest");
            this.getProductData(itemId);
            this.getSubData(itemId);
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
        this.errService.redirectError("asdsadas");

        // let idx = this.listAttr.findIndex((item) => item.id == this.itemActive);
        // if (idx < 0) this.meesageService.showFail("Can't item to cart");
        // else {
        //     this.cartService.addToCart(this.listAttr[idx]);
        //     this.meesageService.showSuccess("Added item to cart");
        // }
    }

    onBuyNow() {
        let idx = this.listAttr.findIndex((item) => item.id == this.itemActive);
        if (idx > 0) {
            this.location.back();
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
                console.log(val);
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
        this.promService.getListDisplay().subscribe((val) => {
            this.listProm = val;
        });
        //post
        this.postService.get(id).subscribe((val) => {
            this.postObject = val;
        });
        //feedBack
        this.feedBackService.getList(id).subscribe((val) => {
            this.listFeedback = val;
        });
    }
}
