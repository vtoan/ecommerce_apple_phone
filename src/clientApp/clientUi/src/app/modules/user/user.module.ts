import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//sub-module
import { UserRoutingModule } from './user-routing.module';
//component
import { UserMainComponent } from './user-main/user-main.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [UserMainComponent, ErrorComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
  ],
  providers:[
  ]

})
export class UserModule { }
