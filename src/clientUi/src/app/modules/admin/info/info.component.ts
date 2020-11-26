import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//models
import { Info } from 'src/app/models/IModels';
//service
import { InfoService  } from 'src/app/services/info.service';
import { FileService  } from 'src/app/services/file.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

    isLoaded:boolean= false;
    isSelected:boolean =true;
    //
    info:Info;
    listFile:File[]= [];
    listLogo:File[]= [];
    //validate
    formValidate = this.fb.group({
        nameStore:['', Validators.required],
        email:['', Validators.required],
        facebook:['', Validators.required],
        messenger:['', Validators.required],
        instargram :['', Validators.required],
        phone:['', Validators.required],
        address:['', Validators.required],
        workTime:['', Validators.required],
        seoTitle:['', Validators.required],
        seoDescription:['', Validators.required]
    });

    constructor(
        private fb: FormBuilder, 
        private infoService :InfoService,
        private fileServcie : FileService
    ) { }

    ngOnInit() {
        this.infoService.get()
        .subscribe(resp => {
            this.isLoaded=true;
            this.info = resp;
            this.formValidate.patchValue(resp);
        },er => this.isLoaded=true )  
    }

    // =========== Event ==========
    onSubmit() {
        let rawVal= this.formValidate.value;
        let info:Info =Object.assign({},rawVal); 
        //
        if(this.listFile.length != 0)
            info.seoImage = this.listFile[0].name;   
        if(this.listLogo.length != 0)
            info.logo = this.listLogo[0].name;   
        this.update(info);
    }

    onChangeFile(imageInput){
        const file: File = imageInput.files[0];
        this.listFile[0]= file;
    }

    onChangeLogo(imageInput){
        const file: File = imageInput.files[0];
        this.listFile[0]= file;
    }

    // =========== Private ===========
    private update(info:Info){
        this.infoService.update(info).subscribe(resp => {
            const urlRes = this.infoService.getUrlContent();
            this.fileServcie.upload(this.listLogo,urlRes[0]);
            this.fileServcie.upload(this.listFile,urlRes[1]);
        },er =>console.log(er));
    }

}
