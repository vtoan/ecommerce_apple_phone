import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//component
import { UserMainComponent } from './user-main/user-main.component';
import { ErrorComponent } from './error/error.component';
//
const routes: Routes = [
  { 
    path:"", component: UserMainComponent,
    children: [
      {path:"**", component:ErrorComponent}
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
