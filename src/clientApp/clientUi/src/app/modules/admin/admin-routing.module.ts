import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {FeeComponent} from './fee/fee.component';
import {MainComponent} from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { 
    path:"admin", component: MainComponent,
    children: [
      { path:"dashboard", component:DashboardComponent },

      { path:"fee", component:FeeComponent }
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
export class AdminRoutingModule { }
