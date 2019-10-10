import { Component, OnInit } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { IProducao } from '../interfaces/IProducao';
import { ProjetoProducaoService } from '../_services/projetoProducao.service';
import { Router } from '@angular/router';



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
  nomeProfessorTeste: any = '';
  idProfessorTeste: any;
  dadosFiltrados: any[];



  constructor(private local: BsLocaleService,
              private projetoProducaoService: ProjetoProducaoService,
              private router: Router) {
    local.use('pt-br');


   }

   getProfessores() {

    this.projetoProducaoService.getProfessores().subscribe(

     response => {
  
       this.conteudistas = response;
       console.log(response);
     },
     error => {
    }
     );


  }

  selectProf() {
    // var obj: any = document.querySelector('input:checked');
    console.log('nome do binding: ' + this.nomeProfessorTeste);

    var prof: any = this.conteudistas.filter(x => x.id == this.idProfessorTeste)[0];

    // obj = document.getElementById('conteudista');

    this.nomeProfessorTeste = prof.nomeConteudista;


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
     this.projetoProducaoService.getProducaoValues().subscribe(

     response => {
       this.dados = response;
       console.log(this.dados);
       this.dadosFiltrados = this.dados;
     },
      error => {
    }
     );

     this.projetoProducaoService.getProducaoEtapa().subscribe(
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

   salvarProducao() {

   }

   filtrarItem(value: any) {
     this.dadosFiltrados = this.dados;
    this.dadosFiltrados = this.dadosFiltrados
      .filter(x => x.disciplina.nomeDisciplina
          .search(value.toLocaleUpperCase()) !== -1 ||
              x.tema.nomeTema
          .search(value.toLocaleUpperCase()) !== -1 ||
          x.etapaProducao.nomeEtapa
      .search(value.toLocaleUpperCase()) !== -1 ||
          x.disciplina.codigoDisciplina.search(value.toLocaleUpperCase()) !== -1);

   }

  

  ngOnInit()  {
    // this.router.navigation

    this.getProducao();

  }


  excluirProducao(id: number, nome: string) {

    if (confirm('Você deseja excluir ' + nome + '?')) {
        alert('Excluída');
        // Atualiza a tela da tabela
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/listaProducao']);
        this.projetoProducaoService.excluirProducao(id).subscribe(
          response => {
            console.log(response);
            this.getProducao();
            
          },
          error => {
            console.log(error);
          }
          );
          } else {
      // alert('Não Excluída');
    }


  }

}
