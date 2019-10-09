import { Component, OnInit, ɵConsole } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import { IProducao } from '../interfaces/IProducao';

defineLocale ('pt-br', ptBrLocale);

@Component({
  selector: 'app-app-lista-producao',
  templateUrl: './app-lista-producao.component.html',
  styleUrls: ['./app-lista-producao.component.css']
})
export class AppListaProducaoComponent implements OnInit {

  bsConfig = {containerClass: 'theme-dark-blue'};
  posicaoDatepicker = 'bottom';
  dados: any;
  dadoSelecionado: any;
  etapa: any;
  bsValue = new Date();
  conteudistas: any;
  filtroConteudista: any[];
  nomeConteudista = '';
  producao: IProducao;


  constructor(private local: BsLocaleService, private http: HttpClient) {
    local.use('pt-br');

   }

   getProfessores() {

    this.http.get('http://10.200.0.9/api/values/getProfessores').subscribe(

     response => {
       
       this.conteudistas = response;
       console.log(response);
     },
     error => {
    }
     );


  }

  selectProf() {
    var obj: any = document.querySelector('input:checked');

    var nomeProf = this.conteudistas.filter(x => x.id == obj.value)[0].nomeConteudista;

    obj = document.getElementById('conteudista');
    obj.value = nomeProf;




    console.log(nomeProf);

  }


  filtraProfessor() {

    if (this.nomeConteudista.length > 3 ) {
        this.filtroConteudista = this.conteudistas.filter(x => x.nomeConteudista.search(this.nomeConteudista.toLocaleUpperCase()) !== -1);
        console.log(this.nomeConteudista);
    }
    else {
      this.filtroConteudista = [];
    }

    // }
    // this.nomeConteudista = obj.value;
     var obj: any = document.getElementById('prof');
     this.nomeConteudista = obj.value;
     console.log();

  }


   getProducao() {
     this.http.get('http://10.200.0.9/api/api/values/').subscribe(

     response => {
       this.dados = response;
       console.log(this.dados);
     },
      error => {
    }
     );

     this.http.get('http://10.200.0.9/api/api/values/etapa').subscribe(
       Response => {
         this.etapa = Response;
       },
       error => {
         console.log(error)}
     );

   }


   getInformacaoModal(id:any) {
      this.dadoSelecionado = this.dados.filter(d => d.id === id);

      var conteudistas = this.getProfessores();

      var modal: any;
      var disciplina: any;

      var item = this.dadoSelecionado[0];

      modal = document.getElementById('disciplina'); 
      modal.value = item.disciplina.nomeDisciplina;
      
      modal = document.getElementById('tema');
      modal.value = item.tema.nomeTema;

      modal = document.getElementById('conteudista');
      modal.value = item.conteudista.nomeConteudista;

      modal = document.getElementById('area');
      modal.value = item.area.nomeArea;

      modal = document.getElementById('subArea');
      modal.value = item.subArea.nomeSubArea;
      
      modal = document.getElementById('tipoProducao');
      modal.value = item.tipoProducao.nomeTipoProducao;

      modal = document.getElementById('produto');
      modal.value = item.produto.nomeProduto;

      modal = document.getElementById('etapaProducao');
      modal.value = item.etapaProducao.nomeEtapa;

      this.producao = new IProducao();
      this.producao.id = item.id;
      this.producao.idEtapa = item.idEtapa;
      
   }

   incluir(){
      
   }


  ngOnInit() {
    this.getProducao();
  }

}
