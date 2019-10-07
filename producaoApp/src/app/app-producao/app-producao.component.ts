import { Component, OnInit } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';

defineLocale('pt-br', ptBrLocale);


@Component({
  selector: 'app-app-producao',
  templateUrl: './app-producao.component.html',
  styleUrls: ['./app-producao.component.css']
})

export class AppProducaoComponent implements OnInit {

  bsConfig = { containerClass: 'theme-dark-blue' };
  dadosCasdastrarProducao: any;
  dadoSelecionadoProducao: any;
  etapaCadastrarProducao: any;
  disciplinas: any;
  temas: any;
  conteudistas: any;
  areas: any;
  subAreas: any;
  producoes: any;
  produtos: any;
  etapasProducoes: any;
  bsValue = new Date();

  constructor(private local: BsLocaleService, private http: HttpClient) {
    local.use('pt-br');
  }

  getCadastrarProducao() {
    this.http.get('http://localhost:5000/api/values/getDados').subscribe(

     response => {
       this.dadosCasdastrarProducao = response;
       console.log(this.dadosCasdastrarProducao);
       this.getInformacaoInput();
     },
     error => {console.log(error)}
     )
  }

  getInformacaoInput(){
    var input: any;
    this.disciplinas = this.dadosCasdastrarProducao.disciplina;
    this.temas = this.dadosCasdastrarProducao.tema;
    this.conteudistas = this.dadosCasdastrarProducao.conteudista;
    this.areas = this.dadosCasdastrarProducao.area;
    this.subAreas = this.dadosCasdastrarProducao.subArea;
    this.producoes = this.dadosCasdastrarProducao.tipoProducao;
    this.produtos = this.dadosCasdastrarProducao.produto;
    this.etapasProducoes = this.dadosCasdastrarProducao.etapaProducao;
  }


  ngOnInit() {
    this.getCadastrarProducao();


  }

}



