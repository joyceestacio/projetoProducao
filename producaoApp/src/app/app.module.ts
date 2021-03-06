import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDatepickerModule, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppProducaoComponent } from './app-producao/app-producao.component';
import { AppListaProducaoComponent } from './app-lista-producao/app-lista-producao.component';

@NgModule({
   declarations: [
      AppComponent,
      AppHomeComponent,
      AppProducaoComponent,
      AppListaProducaoComponent,
   ],

   imports: [
      BrowserModule,
      AppRoutingModule,
      BsDatepickerModule.forRoot(),
      BrowserAnimationsModule,
      HttpClientModule,
      ModalModule,
      TooltipModule.forRoot(),
      FormsModule,
      ReactiveFormsModule
   ],

   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
