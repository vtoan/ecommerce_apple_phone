import { Component, Input, Output,EventEmitter, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

@Component({
    selector: "app-input-image",
    templateUrl: "./input-image.component.html",
    styleUrls: ["./input-image.component.scss"],
})
export class InputImageComponent implements AfterViewInit {
    @Input() width: number = 350;
    @Input() resImage: string = "";
    @Input() resRoot: string = "";
    @Output() onUpload = new EventEmitter<any>();
    @Output() onRemove = new EventEmitter<string>();
    //
    @ViewChild('inputImage',{static:true})input: ElementRef
    @ViewChild('image',{static:true})imageElm: ElementRef
    constructor() {}

    ngAfterViewInit(): void {
        if(this.resImage!="" && this.resRoot!= "") this.resImage = this.resRoot +"/" +this.resImage;
        this.imageElm.nativeElement.src = this.resImage;
    }

    onRemoveFile():void{
        this.imageElm.nativeElement.src = null;
        this.onRemove.emit(this.resImage);
    }


    onChangeFile(inputImage: ElementRef){
        const file:File =this.input.nativeElement.files[0];
        let newFile =URL.createObjectURL(file);
        this.imageElm.nativeElement.src = newFile;
        this.onUpload.emit(file)
    }
}
