import { Component, OnInit } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';

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

  constructor(private local: BsLocaleService, private http: HttpClient) {
    local.use('pt-br');

   }

   getProducao () {
     this.http.get('http://localhost:5000/api/values/').subscribe(

     response => {
       this.dados = response;
       console.log(this.dados);
     },
     error => {console.log(error)}
     )

     this.http.get('http://localhost:5000/api/values/etapa').subscribe(
       Response => {
         this.etapa = Response;
       },
       error => {
         console.log(error)}
     )

   }



   getInformacaoModal(id:any){
      this.dadoSelecionado = this.dados.filter(d => d.id === id); 
      var modal: any;
      var disciplina: any;

      var item = this.dadoSelecionado[0];

      modal = document.getElementById('disciplina'); 
      modal.value=item.disciplina.nomeDisciplina;
      
      modal = document.getElementById('tema');
      modal.value=item.tema.nomeTema;

      modal = document.getElementById('conteudista');
      modal.value=item.conteudista.nomeConteudista;

      modal = document.getElementById('area');
      modal.value=item.area.nomeArea;

      modal = document.getElementById('subArea');
      modal.value=item.subArea.nomeSubArea;
      
      modal = document.getElementById('tipoProducao');
      modal.value=item.tipoProducao.nomeTipoProducao;

      modal = document.getElementById('produto');
      modal.value=item.produto.nomeProduto;

      modal = document.getElementById('etapaProducao');
      modal.value=item.etapaProducao.nomeEtapa; 

      
   }

  ngOnInit() {
    this.getProducao();
  }

}
