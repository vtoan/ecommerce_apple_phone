import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
// model
import { Product } from 'src/app/models/IModels';
//Service
import { FileService } from 'src/app/services/file.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    @Input("product")item:Product;
    //
    @Output() onAddCart=  new EventEmitter<Product>()
    @Output() onShowDetail =  new EventEmitter<Product>();
    //
    constructor(
        public fileService: FileService
    ){}
    //
    promotion:number =0; 
    resImage: any[];
    ngOnInit(): void {
        this.promotion = this.item.discount;
        this.resImage = Object.values(JSON.parse(this.item.images));
        if(this.item.discount %1!=0)
            this.promotion = this.item.price * (this.item.discount);
    }

    
}
