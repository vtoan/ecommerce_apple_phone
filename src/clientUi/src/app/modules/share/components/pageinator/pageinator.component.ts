import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pageinator',
  templateUrl: './pageinator.component.html',
  styleUrls: ['./pageinator.component.scss']
})
export class PageinatorComponent implements OnInit {
  @Input()length:number;
  @Output()change = new EventEmitter<number>();
  
  selected:number=1;
  pages:number[]=[];
  constructor() {
    
  }

  ngOnInit() {
    for (let index = 1; index <= this.length; index++) {
      this.pages.push(index);
    }
  }

}
