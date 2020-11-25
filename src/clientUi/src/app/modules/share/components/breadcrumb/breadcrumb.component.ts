import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  path:string;
  host:string;
  constructor(
    private location:Location
  ) { }

  ngOnInit() {
    this.host = "home";
    this.path =location.pathname;
  }

}
