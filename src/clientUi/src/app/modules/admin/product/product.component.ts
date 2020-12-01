import { Component, OnInit,AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';


//model
import { Category, Product, Promotion } from "src/app/models/IModels";
//service
import { ProductService } from 'src/app/services/product.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { MessageService } from 'src/app/services/message.service';
import { CategoryService } from 'src/app/services/category.service';
import { FileService } from 'src/app/services/file.service';


@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;

    isLoaded: boolean = false;
    defNameProm:string="Khong";
    //
    listProduct: Product[] = null;
    listPromotion: string[] =null;
    listCategory: Category[] =null;
    //
    tableData = new MatTableDataSource();
    constructor(
        private productService: ProductService,
        private promService: PromotionService,
        private message: MessageService,
        private categoryService: CategoryService,
        private fileService : FileService
    ) {}
    
    ngOnInit() {
        this.productService
        .getList()
        .subscribe(resp => {
            this.isLoaded=true;
            this.listProduct = resp;
            this.tableData.data = this.listProduct;            
            this.tableData._updateChangeSubscription();
        },er => this.isLoaded=true )  
        //get category
        this.categoryService.getList().subscribe(resp => {
            this.listCategory = resp;
        })  
        //get promotion
        this.promService.getListOfProduct().subscribe(resp => {
            this.listPromotion = resp.map(item => item.name);
        })

    }

    ngAfterViewInit(): void {
        this.tableData.paginator = this.paginator;
    }


    onShowDetail(item:Product){

    }

    onChangeStatus(item:Product){
        this.productService.updateStatus(item.id, item.isShow)
    }

    onChangePromotion(index){
        
    }

    getImageUrl(item:Product){
        let imgs = Object.values(JSON.parse(item.images));
        return this.fileService.rootPath +"/"+imgs[0];
    }

    getCategory(item:Product){
        let cateId =item.categoryId
        if(!this.listCategory || this.listCategory.length==0) return cateId;
        return this.listCategory.find(cate => cate.id ==cateId).name;
    }


}
