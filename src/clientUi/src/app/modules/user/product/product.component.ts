import { isNgTemplate } from '@angular/compiler';
import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/app/models/IModels';


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
    promotion:number =0; 
    ngOnInit(): void {
        this.promotion = this.item.discount;
        if(this.item.discount %1!=0)
            this.promotion = this.item.price * (this.item.discount);
    }

    
}
