import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

  baseUrl = environment.apiUrl + 'values/';

  constructor(private http: HttpClient) { }

  getProducaoValues() { // obtem lista de produções
    return this.http.get(this.baseUrl);
  }

  getProducaoEtapa() {
    return this.http.get(this.baseUrl +'etapa');
  }

  getProfessores() {
    return this.http.get(this.baseUrl + 'getProfessores');
  }

  Incluir(body: any) {
    return this.http.post(this.baseUrl +'incluir', body);
  }

  getProducao() {
    return this.http.get(this.baseUrl + 'getDados');
  }

  excluirProducao(idProducao: number) {
    return this.http.put(this.baseUrl + 'excluir', idProducao);
  }

  atualizaProducao(values: any[]) {

    return this.http.post(this.baseUrl + 'atualizar', values);
    
  }

  /* ambiente teste
  getProfessores() {
    return this.http.get(this.baseUrlGetProfessores);
    }
  */


}
