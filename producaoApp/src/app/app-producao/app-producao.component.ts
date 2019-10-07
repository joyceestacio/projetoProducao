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
  dadosCastrarProducao: any;
  dadoSelecionadoProducao: any;
  etapaCadastrarProducao: any;

  constructor(private local: BsLocaleService, private http: HttpClient) {
    local.use('pt-br');
  }

  getCadastrarProducao() {
    this.http.get('http://localhost:5000/api/values/').subscribe(

     response => {
       this.dadosCastrarProducao = response;
       console.log(this.dadosCastrarProducao);
     },
     error => {console.log(error)}
     )

     this.http.get('http://localhost:5000/api/values/etapa').subscribe(
       Response => {
         this.etapaCadastrarProducao = Response;
       },
       error => {
         console.log(error)}
     )
  }

  getInformacaoInput(id:any){
    this.dadoSelecionadoProducao = this.dadosCastrarProducao.filter(d => d.id === id); 
    var input: any;
    var disciplina: any;

    var item = this.dadoSelecionadoProducao[0];

    input = document.getElementById('disciplina'); 
    input.value=item.disciplina.nomeDisciplina;
    
    input = document.getElementById('tema');
    input.value=item.tema.nomeTema;

    input = document.getElementById('conteudista');
    input.value=item.conteudista.nomeConteudista;

    input = document.getElementById('area');
    input.value=item.area.nomeArea;

    input = document.getElementById('subArea');
    input.value=item.subArea.nomeSubArea;
    
    input = document.getElementById('tipoProducao');
    input.value=item.tipoProducao.nomeTipoProducao;

    input = document.getElementById('produto');
    input.value=item.produto.nomeProduto;

    input = document.getElementById('etapaProducao');
    input.value=item.etapaProducao.nomeEtapa; 

  }


  ngOnInit() {
    this.getCadastrarProducao();
  }

}



