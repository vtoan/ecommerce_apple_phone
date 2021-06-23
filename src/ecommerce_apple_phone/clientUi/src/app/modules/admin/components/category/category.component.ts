import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, Validators } from "@angular/forms";
//models
import { Category } from "src/app/models/IModels";
//service
import { CategoryService } from "src/app/services/category.service";
import { FileService } from "src/app/services/file.service";
import { MessageService } from "src/app/services/message.service";
import { of } from "rxjs";
import { finalize } from "rxjs/operators";

@Component({
    selector: "app-category",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
    //
    isLoaded: boolean = false;
    itemSelected: Category = null;
    //
    listCates: Category[] = null;
    listFile: File[] = [];
    tableData = new MatTableDataSource();
    //validate
    formValidate = this.fb.group({
        id: [0],
        name: ["", Validators.required],
        seoTitle: ["", Validators.required],
        seoDescription: ["", Validators.required],
        // seoImage: ["", Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        public cateService: CategoryService,
        public fileServcie: FileService
    ) {}

    ngOnInit() {
        of(this.getDataCate())
            .pipe(finalize(() => (this.isLoaded = true)))
            .subscribe();
    }

    //Event
    onShowDetail(id: number) {
        this.onReset();
        let cate = this.listCates.find((item) => item.id == id);
        this.itemSelected = cate;
        //attch to from
        this.formValidate.patchValue(cate);
    }

    onSubmit(e, imgs: any[]) {
        if (this.formValidate.invalid) return;
        e.preventDefault();
        let rawVal = this.formValidate.value;
        let cate: Category = Object.assign({}, rawVal);
        this.update(cate, imgs);
        this.isLoaded = false;
    }

    onReset() {
        this.formValidate.reset();
        this.itemSelected = null;
        this.listFile.length = 0;
    }

    // onChangeFile(file: File) {
    //     this.formValidate.patchValue({
    //         seoImage: this.cateService.getUrlRes() + "/" + file.name,
    //     });
    //     this.listFile.push(file);
    // }

    // onRemoveFile() {
    //     this.formValidate.patchValue({ seoImage: "" });
    //     this.listFile.length = 0;
    // }

    // =========== Use full ===========
    private update(cate: Category, imgs: any[]) {
        // if (imgs.length > 0) cate.seoImage = imgs[0].name;
        this.cateService.update(cate.id, cate).subscribe(
            (resp) => {
                //
                let idxMatch = this.listCates.findIndex(
                    (item) => item.id == cate.id
                );
                this.listCates[idxMatch] = cate;
                this.tableData._updateChangeSubscription();
                //
                //
                // if (imgs.length > 0) {
                //     let file =imgs[0].file;
                //     this.fileServcie.upload(
                //         file,
                //         this.cateService.getUrlUpload()
                //     );
                // }
                this.onReset();
            },
            (er) => console.log(er),
            () => (this.isLoaded = true)
        );
    }

    private getDataCate() {
        this.cateService.getList().subscribe(
            (resp) => {
                this.listCates = resp;
                this.tableData.data = this.listCates;
                this.tableData._updateChangeSubscription();
            },
            (erVal) => (this.listCates = erVal)
        );
    }
}
