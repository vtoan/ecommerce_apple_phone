import { Component, OnInit, OnDestroy } from "@angular/core";

//models
import { Info, User } from "src/app/models/IModels";
//services
import { InfoService } from "src/app/services/info.service";
import { CartService } from "src/app/modules/user/services/cart.service";
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-user-main",
    templateUrl: "./user-main.component.html",
    styleUrls: ["./user-main.component.scss"],
})
export class UserMainComponent implements OnInit, OnDestroy {
    isSignIned:boolean =false;
    user:User;
    // ===== prop ======
    isShowMenu: boolean;
    isShowSearch: boolean;
    countItemCart: number = 0;
    info: Info = {
        nameStore: "none",
        logo: "none",
        email: "none",
        facebook: "none",
        messenger: "none",
        instargram: "none",
        phone: "none",
        address: "none",
        workTime: "none",
        seoImage: "none",
        seoTitle: "none",
        seoDescription: "none",
    };

    constructor(
        private infoService: InfoService,
        private cartService: CartService,
        private accountService: AccountService,
        private router: Router
    ) {}

    // ===== method ======
    ngOnInit() {
        // get info
        this.infoService.get().subscribe(
            (val) => {
                if(val)
                this.info = val;
            }
        );
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
        this.accountService.obs.subscribe(val =>{
            this.isSignIned = true;
            this.user = val;
            console.log(val);
            console.log(this.isSignIned);
        },
        er => {
            this.isSignIned = false;
            this.user = null;
            console.log("?");
            console.log(this.isSignIned);

        });
        console.log(this.isSignIned);
    }

    search(e, query) {
        if (e.keyCode == 13) location.assign("search/" + query);
    }

    ngOnDestroy(): void {
        this.cartService.saveCart();
    }

    onSignIn(){
        this.router.navigate(["login",this.router.url]);
    }


    onLogout() {
        this.accountService.logout(this.user.id).subscribe(val =>{
            if(val) this.router.navigate([""]);
        })
    }

    // // ========= use full ======
    // private initFacebookService(): void {
    //     const initParams: InitParams = { xfbml:true, version:'v9.0'};
    //     this.facebookService.init(initParams);
    // }
}
