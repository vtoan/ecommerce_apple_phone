import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//sub - module
import { AdminRoutingModule } from './admin-routing.module';
import { ShareModule }  from '../share/share.module';
import { MaterialModule } from '../material.module';
//
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { FeeComponent } from './fee/fee.component';


@NgModule({
  declarations: [
    MainComponent, 
    FeeComponent, 
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ShareModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
