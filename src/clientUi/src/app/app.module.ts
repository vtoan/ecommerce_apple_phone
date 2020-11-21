import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }  from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Material Modules
import { MaterialModule } from 'src/app/modules/material.module';
import { AdminModule } from 'src/app/modules/admin/admin.module';
import { UserModule } from 'src/app/modules/user/user.module';
import { ShareModule }  from 'src/app/modules/share/share.module';
//Components
import { AppComponent } from './app.component';
//
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AdminModule,
    UserModule,
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
