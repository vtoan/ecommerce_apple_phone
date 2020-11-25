import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable  } from 'rxjs';

//models
import { Product } from "src/app/models/IModels";
//service
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
    selector: "app-cart-item",
    templateUrl: "./cart-item.component.html",
    styleUrls: ["./cart-item.component.scss"],
})
export class CartItemComponent implements OnInit {
    @Input() itemId: number;
    @Input() isChange: boolean = true;
    @Output() remove = new EventEmitter<number>();

    product:Product;
    promotion: number = 0;
    quantity: number = 0;

    constructor(
        private cartService : CartService,
        private prodService : ProductService
    ) {
        this.product = {
            id: 123,
            name: "Asdasda",
            rOM: "XDEMAS",
            images: ".SDAD",
            categoryId: 123,
            price: 12554543,
            saleCount: 123,
            discount: 123,
            color: "Red",
            quantity: 123,
        };
    }

    ngOnInit() {
        this.prodService.getAttr(this.product.id).subscribe(val =>{
            this.product =val;
        })
        //
        if(!this.product) return
        this.quantity = this.cartService.getQuantity(this.product.id);
        this.promotion = this.product.discount;
        if (this.product.discount % 1 != 0)
            this.promotion = this.product.price * this.product.discount;
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
}
