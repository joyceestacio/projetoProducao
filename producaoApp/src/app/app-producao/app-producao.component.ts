import { Component, OnInit } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import { IProducao } from '../interfaces/IProducao';

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
  producao = new IProducao(); //interface
  iserror = false;
  incluido = false;
  show;
  modal: any;

  constructor(private local: BsLocaleService, private http: HttpClient) {
    local.use('pt-br');
  }

  incluir() {

     var obj:any = document.getElementById('disciplina'); //pegando o valor do input pelo id
     console.log(obj.value);

     this.producao.idDisciplina = obj.value; // na variavel producao estou atribuindo a interface e pegando os atributos da propriedade e estou salvando no obj.value 

    obj = document.getElementById('tema');
    this.producao.idTema = obj.value;

    obj = document.getElementById('conteudista');
    this.producao.idConteudista = obj.value;

    obj = document.getElementById('area');
    this.producao.idArea = obj.value;

    obj = document.getElementById('subArea');
    this.producao.idSubArea = obj.value;

    obj = document.getElementById('producao');
    this.producao.idTipo = obj.value;

    obj = document.getElementById('produto');
    this.producao.idProduto = obj.value;

    obj = document.getElementById('etapa');
    this.producao.idEtapa = obj.value;


    // tslint:disable-next-line: align
    this.http.post('http://10.200.0.9:81/api/api/values/incluir', this.producao).subscribe(
      response => {
        // var resp:any = response;
        // console.log(this.producao);
        this.iserror = false; // console.log(response);
        this.incluido = true;
        alert('Producao incluída');
      },
      error => {
        this.iserror = true;
        this.incluido = false;
        alert('Producao não incluída');
        // console.log(this.producao);
      }
    );

  }

  getCadastrarProducao() {
    this.http.get('http://10.200.0.9:81/api/api/values/getDados').subscribe(

     response => {
       this.dadosCasdastrarProducao = response;
       // console.log(this.dadosCasdastrarProducao);
       this.getInformacaoInput();
     },
     error => {
    }
     );
  }

  getInformacaoInput() {
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



