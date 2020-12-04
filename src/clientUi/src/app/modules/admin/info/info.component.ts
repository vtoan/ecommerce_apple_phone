import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
//models
import { Info } from "src/app/models/IModels";
//service
import { InfoService } from "src/app/services/info.service";
import { FileService } from "src/app/services/file.service";
import { MessageService } from "src/app/services/message.service";
import { of } from "rxjs";
import { finalize } from "rxjs/operators";

@Component({
    selector: "app-info",
    templateUrl: "./info.component.html",
    styleUrls: ["./info.component.scss"],
})
export class InfoComponent implements OnInit {
    isLoaded: boolean = false;
    //
    info: Info;
    listFile: File[] = [];
    listLogo: File[] = [];
    //validate
    formValidate = this.fb.group({
        logo: [""],
        nameStore: ["", Validators.required],
        email: ["", Validators.required],
        facebook: ["", Validators.required],
        messenger: ["", Validators.required],
        instargram: ["", Validators.required],
        phone: ["", Validators.required],
        address: ["", Validators.required],
        workTime: ["", Validators.required],
        seoImage: [""],
        seoTitle: [""],
        seoDescription: [""],
    });

    constructor(
        private fb: FormBuilder,
        private infoService: InfoService,
        public fileServcie: FileService,
        private message: MessageService,
        private location: Location
    ) {}

    ngOnInit() {
        of(this.getDataInfo())
            .pipe(finalize(() => (this.isLoaded = true)))
            .subscribe();
    }

    // =========== Event ==========
    onSubmit(e) {
        if (this.formValidate.invalid) return;
        e.preventDefault();
        let rawVal = this.formValidate.value;
        let info: Info = Object.assign({}, rawVal);
        this.update(info);
    }

    onChangeFile(file: File) {
        this.formValidate.patchValue({
            seoImage: this.infoService.getUrlRes()[1] + "/" + file.name,
        });
        this.listFile.push(file);
    }

    onRemoveFile() {
        this.formValidate.patchValue({ seoImage: "" });
        this.listFile.length = 0;
    }

    onChangeLogo(file: File) {
        this.formValidate.patchValue({
            logo: this.infoService.getUrlRes()[0] + "/" + file.name,
        });
        this.listLogo.push(file);
    }

    onRemoveLogo() {
        this.formValidate.patchValue({ logo: "" });
        this.listLogo.length = 0;
    }

    // =========== Private ===========
    private update(info: Info) {
        console.log(info);
        this.isLoaded = false;
        this.infoService.update(info).subscribe(
            (resp) => {
                const urlRes = this.infoService.getUrlUpload();
                if (this.listLogo.length > 0) {
                    let file = this.listLogo.pop();
                    this.fileServcie.upload(file, urlRes[0]);
                }
                if (this.listFile.length > 0) {
                    let file = this.listFile.pop();
                    this.fileServcie.upload(file, urlRes[1]);
                }
                this.message.showSuccess("Update");
                location.reload();
            },
            (er) => console.log(er)
        );
    }

    private getDataInfo() {
        this.infoService.get().subscribe(
            (resp) => {
                this.info = resp;
                console.log(resp);
                this.formValidate.patchValue(resp);
            },
            (erVal) => (this.info = erVal)
        );
    }
}
