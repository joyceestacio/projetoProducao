import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppProducaoComponent } from './app-producao/app-producao.component';
import { AppListaProducaoComponent } from './app-lista-producao/app-lista-producao.component';


const routes: Routes = [
  {path: '' , component:AppHomeComponent},
  {path: 'producao', component:AppProducaoComponent},
  {path: 'listaProducao', component:AppListaProducaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]

})
export class AppRoutingModule { }
