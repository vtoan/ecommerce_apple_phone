import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/IModels';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

    listProduct:Product[] = [
        {
            id:1,
            name:"asd",
            rOM:"64 GB",
            images:"",
            categoryId:1,
            price:3480000,
            saleCount:100,
            discount:0.1,
        },
        {
            id:2,
            name:"dasda",
            rOM:"34 GB",
            images:"",
            categoryId:2,
            price:3480000,
            saleCount:100,
            discount:50,
        },
        {
            id:3,
            name:"dasda",
            rOM:"16 GB",
            images:"",
            categoryId:2,
            price:3480000,
            saleCount:100,
            discount:50,
        }
    ]

  constructor() { }

  ngOnInit() {
  }

}
