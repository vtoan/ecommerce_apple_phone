import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { concat, of } from "rxjs";
import { finalize } from "rxjs/operators";
//model
import { Promotion } from "src/app/models/IModels";
//service
import { PromotionService } from "src/app/services/promotion.service";
import { Container } from "src/app/models/container";

@Component({
    selector: "app-promotion",
    templateUrl: "./promotion.component.html",
    styleUrls: ["./promotion.component.scss"],
})
export class PromotionComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "Data is'n found",
    };
    //
    listPromotion: Promotion[];
    //
    tableData = new MatTableDataSource<Promotion>();

    constructor(private promService: PromotionService) {}

    ngOnInit() {
        this.promService.getList().subscribe((val) => {
            this.listPromotion = val;
            if (val) this.tableData.data = this.listPromotion;
            this.tableData._updateChangeSubscription();
            this.container.isLoaded = true;
        },er => {
            this.container.isDataEmpty =true;
            this.container.isLoaded =true;
        });
    }

    ngAfterViewInit(): void {
        this.tableData.paginator = this.paginator;
    }

    onChangeStatus(item:Promotion) {
        this.promService.updateStatus(item.id, !item.status).subscribe(val =>{
            // if(val) item.status!=item.status;
        });
    }

    onRemove(id){
        this.promService.delete(id).subscribe(val =>{
            let idx = this.tableData.data.findIndex(item => item.id == id);
            if(idx !=-1) {
                this.tableData.data.splice(idx,1);
                this.tableData._updateChangeSubscription();
            }
        });
    }
}
