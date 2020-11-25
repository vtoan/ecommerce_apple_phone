import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
//models
import { Info } from "src/app/models/IModels";
//services
import { InfoService } from "src/app/services/info.service";
import { CartService } from "src/app/services/cart.service";

@Component({
    selector: "app-user-main",
    templateUrl: "./user-main.component.html",
    styleUrls: ["./user-main.component.scss"],
})
export class UserMainComponent implements OnInit, OnDestroy {
    // ===== prop ======
    isShowMenu: boolean;
    isShowSearch: boolean;
    countItemCart: number = 0;
    info: Info = {
        nameStore: "sad",
        logo: "sad",
        email: "sad",
        facebook: "sad",
        messenger: "sad",
        instargram: "sad",
        phone: "sad",
        address: "sad",
        workTime: "sad",
        seoImage: "sad",
        seoTitle: "sad",
        seoDescription: "sad",
    };

    constructor(
        private infoService: InfoService,
        private cartService: CartService,
        private location: Location
    ) {}

    // ===== method ======
    ngOnInit() {
        //
        this.cartService.retriveCart();
        //
        this.infoService.get().subscribe(
            (resp) => {
                this.info = resp;
            },
            (err) => console.log(err)
        );

        //
        this.countItemCart = this.cartService.getQuantity();
        this.cartService.subject.subscribe((val) => {
            this.countItemCart = val.reduce(
                (accur, val) => (accur += val.quantity),
                0
            );
        });
    }

    search(e, query) {
        if (e.keyCode == 13) location.assign("search/" + query);
    }

    ngOnDestroy(): void {
        this.cartService.saveCart();
    }
}
