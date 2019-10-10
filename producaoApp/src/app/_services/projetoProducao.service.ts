import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjetoProducaoService {

  /*  ambiente teste
  
  //--app-lista-producao--// 
  baseUrlGetProducaoValues = 'http://localhost:5000/api/values/';
  baseUrlGetProducaoEtapa = 'http://localhost:5000/api/values/etapa';
  baseUrlGetProfessores ='http://localhost:5000/api/values/getProfessores';

   //--app-producao --//
  baseUrlPostValuesIncluir = 'http://localhost:5000/api/values/incluir';
  baseUrlGetValuesDados = 'http://localhost:5000/api/values/getDados'; */

  baseUrl = 'http://localhost:5000/api/values/';


  constructor(private http: HttpClient) { }

  getProducaoValues() {
    return this.http.get(this.baseUrl);
  }

  getProducaoEtapa() {
    return this.http.get(this.baseUrl + 'etapa');
  }

  getProfessores() {
    return this.http.get(this.baseUrl + 'getProfessores');
  }

  Incluir(body: any) {
    return this.http.post(this.baseUrl +'incluir',body);
  }

  getProducao() {
    return this.http.get(this.baseUrl + 'getDados');
  }

  /* ambiente teste
  getProfessores() {
    return this.http.get(this.baseUrlGetProfessores);
    }
  */


}
