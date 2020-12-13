import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

//models
import { Product } from "src/app/models/IModels";
//service
import { CartService } from 'src/app/modules/user/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { FileService } from 'src/app/services/file.service';


@Component({
    selector: "app-cart-item",
    templateUrl: "./cart-item.component.html",
    styleUrls: ["./cart-item.component.scss"],
})
export class CartItemComponent implements OnInit {
    @Input() itemId: string;
    @Input() isChange: boolean = true;
    @Output() remove = new EventEmitter<string>();

    product:Product;
    promotion: number = 0;
    quantity: number = 0;
    resImage:any[];

    constructor(
        private cartService : CartService,
        private prodService : ProductService,
        public fileService: FileService
    ) {}

    ngOnInit() {
        this.prodService.getAttr(this.itemId).subscribe(val =>{
            this.product =val;
            this.resImage=Object.values(JSON.parse(val.images));
            this.getInfo();
        })    
    }

    onAddition(){
        this.cartService.addToCart(this.product);
        this.quantity++;
    }

    onSubtract(){
        this.quantity--;
        this.cartService.reduceQuantity(this.product.id);
    }

    onRemove(){
        this.remove.emit(this.product.id);
    }

    private getInfo(){
        //
        if(!this.product) return
        this.quantity = this.cartService.getQuantity(this.product.id);
        this.promotion = this.product.discount;
        if (this.product.discount % 1 != 0)
            this.promotion = this.product.price * this.product.discount;
    }
}
