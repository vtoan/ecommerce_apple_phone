import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { OrderDetail, Product } from "../../../models/IModels";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CartService {
    // ===== prop ======
    private cart: Cart = {
        item: [],
    };
    subject = new Subject<OrderDetail[]>();

    constructor(private cookie: CookieService) {}

    // ===== method ======
    addToCart(product: Product): void {
        let idx = this.cart.item.findIndex(
            (item) => item.productId == product.id
        );
        if (idx != -1) this.cart.item[idx].quantity++;
        else
            this.cart.item.push({
                orderId: 0,
                productId: product.id,
                quantity: 1,
                discount: product.discount,
                price: product.price,
            });
        this.notifyChange();
    }

    reduceQuantity(id: string): void {
        let idx = this.cart.item.findIndex((item) => item.productId == id);
        if (idx == -1) return;
        this.cart.item[idx].quantity--;
        this.notifyChange();
    }

    remove(id: string): void {
        let idx = this.cart.item.findIndex((item) => item.productId == id);
        if (idx == -1) return;
        this.cart.item.splice(idx, 1);
        this.notifyChange();
    }

    getCart(): OrderDetail[] {
        return this.cart.item;
    }

    clear(): void {
        this.cart.item.length = 0;
        this.notifyChange();
    }

    getQuantity(id?: string) {
        if (!id) {
            if (!this.cart.item || this.cart.item.length == 0) return 0;
            return this.cart.item.reduce(
                (accur, val) => (accur += val.quantity),
                0
            );
        }
        let idx = this.cart.item.findIndex((item) => item.productId == id);
        if (idx == -1) return 0;
        return this.cart.item[idx].quantity;
    }

    retriveCart(): void {
        let rawVal = this.cookie.get("cart-items");
        if (rawVal && rawVal.length > 0) this.cart = JSON.parse(rawVal);
        this.notifyChange();
    }

    saveCart(): void {
        const json = JSON.stringify(this.cart);
        this.cookie.put("cart-items", json);
    }

    notifyChange(): void {
        this.subject.next(this.cart.item);
    }
}

export interface Cart {
    item: OrderDetail[];
}
