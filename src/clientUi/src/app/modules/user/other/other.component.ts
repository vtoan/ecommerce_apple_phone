import { Component, OnInit } from '@angular/core';
//service
import { ProductService } from 'src/app/services/product.service';
//model
import { Product } from 'src/app/models/IModels';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  isLoaded:boolean= false;
  listProducts:Product[];
  message:string="Data is empty";
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit() {
    this.listProducts =[];
    this.productService.getListByCate(3).subscribe(
      resp =>{
        if(resp != null || resp)  this.listProducts = resp;
       },
      er => this.message =er,
      ()=> this.isLoaded =true);
  }

}
