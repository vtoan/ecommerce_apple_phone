import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { FormBuilder, Validators } from '@angular/forms';
//models
import { Category } from 'src/app/models/IModels';
//service
import { CategoryService  } from 'src/app/services/category.service';
import { FileService  } from 'src/app/services/file.service';


@Component({
selector: 'app-category',
templateUrl: './category.component.html',
styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    //
    isLoaded:boolean= false;
    isSelected:boolean =true;
    //
    listCates:Category[] =[];
    listFile:File[]= [];
    tableData = new MatTableDataSource();
    //validate
    formValidate = this.fb.group({
        id:[0],
        name:['', Validators.required],
        seoTitle:['', Validators.required],
        seoDescription:['', Validators.required]
    });

    constructor(
        private fb: FormBuilder, 
        private cateService :CategoryService,
        private fileServcie : FileService
    ) { }

    ngOnInit() {
        this.cateService
        .getList()
        .subscribe(resp => {
            this.isLoaded=true;
            this.listCates = resp;
            this.tableData.data = this.listCates;            
            this.tableData._updateChangeSubscription();
        },er => this.isLoaded=true )   
    }

     //Event
    onShowDetail(id:number){
        this.isSelected = true;
        let fee = this.listCates.find(item => item.id == id);
        //attch to from
        this.formValidate.patchValue(fee);
    }

    onSubmit() {
        let rawVal= this.formValidate.value;
        let cate:Category =Object.assign({},rawVal); 
        //
        if(this.listFile.length != 0)
            cate.seoImage = this.listFile[0].name;   
        this.update(cate);
    }

    onReset(){
        this.formValidate.reset();
        this.isSelected = false;
    }

    onChangeFile(imageInput){
        const file: File = imageInput.files[0];
        this.listFile[0]= file;
    }

    // =========== Private ===========
    private update(cate:Category){
        this.cateService.update(cate.id, cate).subscribe(resp => {
            //
            let idxMatch = this.listCates.findIndex(item => item.id == cate.id);
            this.listCates[idxMatch]=cate;
            this.tableData._updateChangeSubscription();
            //
            this.onReset();
            //
            this.fileServcie.upload(this.listFile,this.cateService.getUrlContent());
        },er =>console.log(er));
    }

}
