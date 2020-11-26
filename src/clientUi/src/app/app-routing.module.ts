import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { UserMainComponent  as MainUser }  from 'src/app/modules/user/user-main.component';
import {MainComponent as MainAdmin} from 'src/app/modules/admin/main/main.component';

const routes: Routes = [
  { path:'', component: MainUser },
  { path:'admin', component: MainAdmin }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
