import { Component, OnInit } from "@angular/core";
import { Container } from "src/app/models/container";
import { PromBill } from "src/app/models/IModels";
import { FileService } from "src/app/services/file.service";
import { PromotionService } from "src/app/services/promotion.service";

@Component({
    selector: "app-product-promotion",
    templateUrl: "./product-promotion.component.html",
    styleUrls: ["./product-promotion.component.scss"],
})
export class ProductPromotionComponent implements OnInit {
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        // displayText: "No promotion",
    };
    listProm: PromBill[];
    constructor(
        public fileService:FileService,
        private promSer:PromotionService
    ) {}

    ngOnInit() {
        this.promSer.getListOfBill().subscribe(
            (val) => {
                this.listProm = val;
                console.log(this.listProm);
                this.container.isDataEmpty = false;
                this.container.isLoaded = true;
            },
            (er) => {
                console.log("object");
                this.container.isDataEmpty = true;
                this.container.isLoaded = true;
            }
        );
    }
}
