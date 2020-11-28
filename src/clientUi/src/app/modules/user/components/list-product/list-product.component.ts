import { Component, Input, OnInit } from '@angular/core';
//service
import { CartService } from 'src/app/modules/user/services/cart.service';
import { MessageService } from 'src/app/services/message.service';
//model
import { Product } from 'src/app/models/IModels';

@Component({
selector: 'app-list-product',
templateUrl: './list-product.component.html',
styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
	@Input()isPage:boolean =true;
	@Input()isFilter:boolean =true;
	@Input()products:Product[]=[];
	// ========= prop =========
	pageSize:number= 8;
	dataLength:number =0;
	pageNumber:number=0;
	//
	listData:Product[] = [];
	optOrder:string[]=["Popular","Low","High"];
	// ========= ctor =========
	constructor(
		private cartService: CartService,
		private meesageService :MessageService
	) {}
	// ========= event =========
	ngOnInit() {
		this.dataLength = this.products.length;
		this.pageNumber = Math.ceil(this.dataLength/this.pageSize);
		this.showDataPage(1);	
	}

	onChangeOrder(id){
		this.orderBy(id);
	}

	onChangePage(index:number){
		this.showDataPage(index);
	}

	onAddCart(item:Product){
		this.cartService.addToCart(item);
		this.meesageService.showSuccess("Added item to cart");
	}

	onShowDetail(item:Product){
		console.log("show detail");
		console.log(item);
	}

	// ========= method ===========
	private orderBy(idex){
		switch (idex) {
			case 0:
				this.products.sort((a,b) => a.saleCount - b.saleCount);	
				break;		
			case 1:
				this.products.sort((a, b) =>( a.price - this.calDiscount(a)) - (b.price - this.calDiscount(b)));
				break;
			case 2:
				this.products.sort((a, b) => (b.price - this.calDiscount(b)) - (a.price - this.calDiscount(a)));
				break;
		}
		this.showDataPage(1);		
	}

	private calDiscount(p:Product):number{
		return p.discount % 1== 0 ? p.discount : p.price * p.discount;
	}

	private showDataPage(indexPage){
		let start = (indexPage -1)* this.pageSize; 
		if(indexPage === this.pageNumber) this.listData = this.products.slice(start);
		else this.listData = this.products.slice(start,start+ this.pageSize);
		window.scroll({top:0, behavior:"smooth"})
	}

}
