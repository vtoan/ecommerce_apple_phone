import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Container } from "src/app/models/container";
import { ImportDetail } from "src/app/models/IModels";
import { ImportService } from "../../services/import.service";

@Component({
    selector: "app-import-detail-view",
    templateUrl: "./import-detail-view.component.html",
    styleUrls: ["./import-detail-view.component.scss"],
})
export class ImportDetailViewComponent implements OnInit {
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "Data is't found",
    };
    tableData = new MatTableDataSource<ImportDetail>();

    constructor(private route: ActivatedRoute, private impSer: ImportService) {}

    ngOnInit() {
        this.route.params.subscribe((parmas) => {
            let itemId = parmas["id"];
            console.log(itemId);
            if (itemId) this._getDataImp(itemId);
            else {
                this.container.isDataEmpty = true;
                this.container.isLoaded = true;
            }
        });
    }

    getNameProduct(item){
        return "Unknown"
    }

    private _getDataImp(id: number) {
        this.impSer.get(id).subscribe(
            (val) => {
                console.log(val);
                this.tableData.data = val;
                this.tableData._updateChangeSubscription();
                this.container.isLoaded = true;
            },
            (er) => {
                this.container.isDataEmpty = true;
                this.container.isLoaded = true;
            }
        );
    }
}
