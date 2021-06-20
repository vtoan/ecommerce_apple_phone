import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    OnInit,
    OnChanges,
} from "@angular/core";
import { FileService } from "src/app/services/file.service";
import { DomSanitizer } from "@angular/platform-browser";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
    selector: "app-input-image",
    templateUrl: "./input-image.component.html",
    styleUrls: ["./input-image.component.scss"],
})
export class InputImageComponent implements OnInit, OnChanges {
    @Input() widthImg: number = 250;
    @Input() isProduct: boolean = false;
    @Input() isMulitple: boolean = false;
    @Input() resImage: string | string[];
    @Input() resStored: string;
    //
    @ViewChild("inputImage", { static: true }) input: ElementRef;
    //
    listImageUrl: ImgObject[] = [];
    rootUrl: string;

    constructor(private fileSer: FileService, public dom: DomSanitizer) {}

    ngOnInit() {
        this.showData();
    }
    ngOnChanges() {
        this.showData();
    }

    onRemoveFile(target: string): void {
        if (!target) return;
        let idx = this.listImageUrl.findIndex((item) => item.name == target);
        if (idx != -1) this.listImageUrl.splice(idx, 1);
    }

    onChangeFile(inputImage: ElementRef) {
        const file: File = this.input.nativeElement.files[0];
        let newFile = URL.createObjectURL(file);
        if (this.isMulitple)
            this.listImageUrl.push({
                src: newFile,
                name: this.resStored + "/" + file.name,
                // name: this._checkSegment(file.name, "product"),
                file: file,
            });
        else
            this.listImageUrl[0] = {
                src: newFile,
                name: this.resStored + "/" + file.name,
                // name: this._checkSegment(file.name, "product"),
                file: file,
            };
        console.log(this.listImageUrl);
    }

    private _checkSegment(pathName: string, targetCheck): string {
        let segments = pathName.split("/");
        console.log(segments);
        if (segments.find(targetCheck)) return pathName;
        return targetCheck + "/" + pathName;
    }

    trackItem(index: number, item: any) {
        return item;
    }

    showData(): void {
        if (!this.resImage) return;
        this.rootUrl = this.fileSer.rootPath;
        console.log(this.resImage);
        if (Array.isArray(this.resImage))
            this.listImageUrl = this.resImage.map((item) => ({
                src: this.rootUrl + "/" + item,
                file: null,
                // name: this._checkSegment(item, "product"),
                // name: this.resStored + "/" + item,
                name: item,
            }));
        else
            this.listImageUrl[0] = {
                src: this.rootUrl + "/" + this.resImage,
                file: null,
                name: this.resStored + "/" + this.resImage,
            };
        console.log(this.listImageUrl);
    }
}
export interface ImgObject {
    src: string;
    name: string;
    file: File;
}
