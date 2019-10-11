import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
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
  idProfessorAlterado: any;
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
      // console.log(this.conteudistas);
     },
     error => {
    }
     );


  }

  selectProf() {
    var obj: any = document.querySelector('input:checked');
    this.idProfessorAlterado = obj.id;

    var prof: any = this.conteudistas.filter(x => x.id == obj.id)[0];

    // obj = document.getElementById('conteudista');
    // alert(prof.nomeConteudista);

    this.nomeProfessorTeste = prof.nomeConteudista;


  }



  filtraProfessor() {
    // alert(this.conteudistas);
    if (this.nomeConteudista.length > 3 ) {
        this.filtroConteudista = this.conteudistas.filter(x => x.nomeConteudista.search(this.nomeConteudista.toLocaleUpperCase()) !== -1);
        // console.log('NOME CONTEUDISTA' + this.nomeConteudista);
    }
    else {
      this.filtroConteudista = [];
    }

    // }
    // this.nomeConteudista = obj.value;
     var obj: any = document.getElementById('prof');
     this.nomeConteudista = obj.value;
     //console.log();

  }


   getProducao() {
     this.projetoProducaoService.getProducaoValues().subscribe(

     response => {
       this.dados = response;
       //console.log(this.dados);
       this.dadosFiltrados = this.dados;
     },
      error => {
    }
     );

     this.projetoProducaoService.getProducaoEtapa().subscribe(

       response => {
         this.etapa = response;
         // console.log('RESPONSE' + response[0].id)
       },
       error => {
         // console.log('ERROR' + error);
        }
        );
        
      }
      
      
      getInformacaoModal(id:any) {
        
        
        this.dadoSelecionado = null;
        
        this.dadoSelecionado = this.dados.filter(d => d.id === id);
        
        
        // this.conteudistas = this.getProfessores();
        
        // Carrega base professores
        this.getProfessores();
        
        
        var modal: any;
        var disciplina: any;
        
        var item = this.dadoSelecionado[0];
        
        this.idProfessorAlterado = item.conteudista.id;
        
        
        
        modal = document.getElementById('disciplina');
        modal.value = item.disciplina.nomeDisciplina;
        
        modal = document.getElementById('tema');
        modal.value = (item.tema == null) ? "" : item.tema.nomeTema;
        
        modal = document.getElementById('conteudista');
        modal.value = (item.conteudista.nomeConteudista == null) ? "" : item.conteudista.nomeConteudista;
        
        
        modal = document.getElementById('area');
        modal.value = (item.area==null) ? "" : item.area.nomeArea;
        
        
        modal = document.getElementById('subArea');
        modal.value = (item.subArea==null) ? "" : item.subArea.nomeSubArea;
        
       // alert('Rodou')
        
        modal = document.getElementById('tipoProducao');
        modal.value = (item.tipoProducao==null) ? "" : item.tipoProducao.nomeTipoProducao;
        
      modal = document.getElementById('produto');
      modal.value = (item.produto==null) ? "" : item.produto.nomeProduto;
      
      // modal = document.getElementById('etapaProducao');
      // modal.value = item.etapaProducao.nomeEtapa;
      modal = document.getElementById('sctEtapa');
      modal.value = this.dadoSelecionado[0].etapaProducao.id;


      this.producao = new IProducao();
      this.producao.id = item.id;
      this.producao.idEtapa = item.idEtapa;
    

   }

   atualizaProducao(idEtapa: number) { 
     var idprof = this.idProfessorAlterado; // this.conteudistas.filter(x => x.nomeConteudista == this.nomeConteudista)[0].id;
     var idProd = this.dadoSelecionado[0].id;
     
     var values = [idProd, idprof, idEtapa];
     // alert(values);

     this.router.onSameUrlNavigation = 'reload';
     this.router.navigate(['/listaProducao']);
     
     

     this.projetoProducaoService.atualizaProducao(values).subscribe(
       response =>
       {
         // alert(response);
         this.getProducao();
        },
        error => {
           // console.log(error);
       }
     );


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

  

   
   
   excluirProducao(id: number, nome: string) {
     
     if (confirm('Você deseja excluir ' + nome + '?')) {
       
       // Atualiza a tela da tabela
       this.router.onSameUrlNavigation = 'reload';
       this.router.navigate(['/listaProducao']);
       this.projetoProducaoService.excluirProducao(id).subscribe(
         response => {
           //console.log(response);
           this.getProducao();
           
          },
          error => {
            //console.log(error);
          }
          );
        } else {
          // alert('Não Excluída');
        }
        
        
      }
          ngOnInit()  {
            // this.router.navigation
           
            this.getProducao();
            //console.log('ETAPA' + this.etapa.id);
        
          }
      
    }
