import { Component, OnInit } from '@angular/core';
//models
import {InfoStore} from 'src/app/models/info';
//services
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {

  isShowMenu:boolean;
  isShowSearch:boolean;
  countItemCart:number =1;
  info:InfoStore;

  
  constructor(
    private infoService:InfoService) {}

  //Method
  ngOnInit() {
    this.infoService.get().subscribe(resp => {
      this.info =resp;
    })
  }  

  search(e,query){
    if(e.keyCode == 13)
      console.log(query);
  }

}
