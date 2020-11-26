import { Component, OnInit } from '@angular/core';
//service
import { ProductService } from 'src/app/services/product.service';
//model
import { Product } from 'src/app/models/IModels';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  isLoaded:boolean= false;
  listProducts:Product[];
  message:string="Data is empty";
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit() {
    this.listProducts =[];
    this.productService.getListDiscount().subscribe(
      resp =>{
        if(resp != null || resp)  this.listProducts = resp;
       },
      er => this.message =er,
      ()=> this.isLoaded =true);
  }

}
