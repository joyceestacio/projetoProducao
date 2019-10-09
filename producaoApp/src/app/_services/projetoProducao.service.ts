import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjetoProducaoService {
  /*app-lista-producao*/ 
  baseUrlGetProducaoValues = 'http://localhost:5000/api/values/';
  baseUrlGetProducaoEtapa = 'http://localhost:5000/api/values/etapa';
  baseUrlGetProfessores ='http://localhost:5000/api/values/getProfessores';

  /*app-producao*/
  baseUrlPostValuesIncluir = 'http://localhost:5000/api/values/incluir';
  baseUrlGetValuesDados = 'http://localhost:5000/api/values/getDados'; 

constructor(private http: HttpClient) { }

getProducaoValues() {
    return this.http.get(this.baseUrlGetProducaoValues);
  }
  
getProducaoEtapa() {
    return this.http.get(this.baseUrlGetProducaoEtapa);
  }

getProfessores() {
  return this.http.get(this.baseUrlGetProfessores);
  }




}
