import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
//Components
import { UserMainComponent  as MainUser }  from 'src/app/modules/user/user-main.component';
import { MainComponent as MainAdmin} from 'src/app/modules/admin/main.component';
//
import { AdminAuthService } from './services/admin-auth.service';

const routes: Routes = [
  { path:'', component: MainUser },
  { path:'admin', component: MainAdmin, canActivate:[AdminAuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminAuthService]
})
export class AppRoutingModule { }
