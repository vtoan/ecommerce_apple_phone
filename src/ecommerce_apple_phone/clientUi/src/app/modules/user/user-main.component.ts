import { Component, OnInit, OnDestroy } from "@angular/core";

//models
import { Info, User } from "src/app/models/IModels";
//services
import { InfoService } from "src/app/services/info.service";
import { CartService } from "src/app/modules/user/services/cart.service";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-user-main",
    templateUrl: "./user-main.component.html",
    styleUrls: ["./user-main.component.scss"],
})
export class UserMainComponent implements OnInit, OnDestroy {
    isSignIned: boolean = false;
    user: User;
    // ===== prop ======
    isShowMenu: boolean;
    isShowSearch: boolean;
    countItemCart: number = 0;
    info: Info;
    constructor(
        private infoService: InfoService,
        private cartService: CartService,
        private accountService: AccountService,
        private router: Router
    ) {}

    // ===== method ======
    ngOnInit() {
        // get info
        this.infoService.get().subscribe((val) => {
            if (val) this.info = val;
        });
        //get cart in cookie
        this.cartService.retriveCart();
        this.countItemCart = this.cartService.getQuantity();
        //subsribe total qauntity in cart
        this.cartService.subject.subscribe((val) => {
            this.countItemCart = val.reduce(
                (accur, val) => (accur += val.quantity),
                0
            );
        });
        //
        this.router.navigate(["home"]);
    }

    search(e, query) {
        if (e.keyCode == 13){
            let currentUrl = "search";
            this.router
                .navigateByUrl("/search/"+query, { skipLocationChange: true })
                .then(() => {
                    // this.router.navigate([currentUrl,query]);
                });
        // // }
        //     location.assign("search/" +query);
        }
        // this.router.navigateByUrl()
      
    }

    ngOnDestroy(): void {
        this.cartService.saveCart();
    }

    // // ========= use full ======
    // private initFacebookService(): void {
    //     const initParams: InitParams = { xfbml:true, version:'v9.0'};
    //     this.facebookService.init(initParams);
    // }
}
