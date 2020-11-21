import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';



import { Product } from 'src/app/models/IModels';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


    @Input("product")item:Product;

    @Output() addCart =  new EventEmitter<Product>()
    @Output() showDetail =  new EventEmitter<Product>();

    constructor() { }

    ngOnInit() { }

    onAddCart(item:Product){
        this.addCart.emit(item);
    }

    onShowDetail(item:Product){
        this.showDetail.emit(item);
    }

}
