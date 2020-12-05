import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { concat, of } from "rxjs";
import { finalize } from "rxjs/operators";
//model
import { Promotion } from "src/app/models/IModels";
//service
import { PromotionService } from "src/app/services/promotion.service";

@Component({
    selector: "app-promotion",
    templateUrl: "./promotion.component.html",
    styleUrls: ["./promotion.component.scss"],
})
export class PromotionComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    isLoaded: boolean = false;
    //
    listPromotion: Promotion[];
    //
    tableData = new MatTableDataSource();

    constructor(private promService: PromotionService) {}

    ngOnInit() {
        this.promService.getList().subscribe((val) => {
            this.listPromotion = val;
            if (val) this.tableData.data = this.listPromotion;
            this.tableData._updateChangeSubscription();
        });
    }

    ngAfterViewInit(): void {
        this.tableData.paginator = this.paginator;
    }

    onChangeStatus(item:Promotion) {
        console.log(item);
        this.promService.updateStatus(item.id, !item.status).subscribe(val =>{
            // if(val) item.status!=item.status;
        });
    }

    onRemove(id){
        console.log(id);
        this.promService.remove(id).subscribe();
    }
}
