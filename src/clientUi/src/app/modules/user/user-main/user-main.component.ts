import { Component, OnInit } from '@angular/core';
//models
import {Info} from 'src/app/models/IModels';
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
    info:Info ={
        nameStore:"sad",
        logo:"sad",
        email:"sad",
        facebook:"sad",
        messenger:"sad",
        instargram:"sad",
        phone:"sad",
        address:"sad",
        workTime:"sad",
        seoImage:"sad",
        seoTitle:"sad",
        seoDescription:"sad",
    };

    constructor(
        private infoService:InfoService) {}

    //Method
    ngOnInit() {
        this.infoService.get()
            .subscribe(resp => {
                 this.info =resp;
        }, err =>console.log(err) )
  }  

    search(e,query){
        if(e.keyCode == 13)
        console.log(query);
    }

}
