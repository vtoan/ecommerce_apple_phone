import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { of } from "rxjs";
import { finalize } from "rxjs/operators";

//models
import { Fee } from "src/app/models/IModels";
//service
import { FeeService } from "src/app/services/fee.service";
import { MessageService } from "src/app/services/message.service";

@Component({
    selector: "app-fee",
    templateUrl: "./fee.component.html",
    styleUrls: ["./fee.component.scss"],
})
export class FeeComponent implements OnInit {
    //
    isLoaded: boolean = false;
    itemSelected: Fee;
    submitTitle: string = "Thêm";
    //

    listFees: Fee[] = null;
    tableData = new MatTableDataSource();
    //validate
    formValidate = this.fb.group({
        id: [0],
        name: ["", Validators.required],
        cost: ["", Validators.required],
        suffix: ["currency", Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private feeService: FeeService,
        private message: MessageService
    ) {}

    ngOnInit(): void {
        of(this.getDataFee())
            .pipe(finalize(() => (this.isLoaded = true)))
            .subscribe();
    }

    //Event
    onShowDetail(id: number) {
        this.onReset();
        let fee = this.listFees.find((item) => item.id == id);
        this.submitTitle = "Lưu";
        this.itemSelected = fee;
        //attch to from
        this.formValidate.patchValue(fee);
        //get unit
        let unit = this.determineUnit(fee.cost);
        this.formValidate.get("cost").setValue(unit[0]);
        this.formValidate.get("suffix").setValue(unit[1]);
    }

    onDelete(id: number) {
        this.feeService.delete(id).subscribe(
            (resp) => {
                //
                let idxMatch = this.listFees.findIndex((item) => item.id == id);
                this.listFees.splice(idxMatch, 1);
                this.tableData._updateChangeSubscription();
                //
                this.message.showSuccess("Delete");
            },
            (er) => console.log(er)
        );
    }

    onSubmit(e) {
        if (this.formValidate.invalid) return;
        e.preventDefault();
        let rawVal = this.formValidate.value;
        let fee: Fee = Object.assign({}, rawVal);
        if (rawVal.suffix == "precent") fee.cost = fee.cost / 100;
        //
        fee.id ? this.update(fee) : this.create(fee);
    }

    onReset() {
        this.submitTitle = "Thêm";
        this.formValidate.reset();
        this.formValidate.get("suffix").setValue("currency");
        this.itemSelected = null;
    }

    //Private
    private create(fee: Fee) {
        fee.id = 0;
        this.feeService.add(fee).subscribe(
            (resp) => {
                this.listFees.push(resp);
                this.tableData._updateChangeSubscription();
                //
                this.message.showSuccess("Create");
                this.onReset();
            },
            (er) => console.log(er)
        );
    }

    private update(fee: Fee) {
        this.itemSelected = fee;
        this.isLoaded = false;
        this.feeService.update(fee.id, fee).subscribe(
            (resp) => {
                //
                let idxMatch = this.listFees.findIndex(
                    (item) => item.id == fee.id
                );
                this.listFees[idxMatch] = fee;
                this.tableData._updateChangeSubscription();
                //
                this.message.showSuccess("Update");
                this.onReset();
            },
            (er) => console.log(er),
            () => (this.isLoaded = true)
        );
    }

    private determineUnit(val: number): [number, string] {
        if (val < 0) return [0, "currency"];
        return val % 1 === 0 ? [val, "currency"] : [val * 100, "precent"];
    }

    private getDataFee() {
        this.feeService.getList().subscribe(
            (resp) => {
                this.listFees = resp;
                this.tableData.data = this.listFees;
                this.tableData._updateChangeSubscription();
            },
            (erVal) => (this.listFees = erVal)
        );
    }
}
