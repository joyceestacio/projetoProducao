using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace producao.api.Model
{
    public partial class FProducao
    {
        public int Id { get; set; }
        [ForeignKey("Curso")]
        public int? IdCodCurso { get; set; }
        public int IdPeriodo { get; set; }
        [ForeignKey("Disciplina")]
        public int? IdDisciplina { get; set; }
        [ForeignKey("Tema")]
        public int? IdTema { get; set; }
        [ForeignKey("Conteudista")]
        public int? IdConteudista { get; set; }
        [ForeignKey("Area")]
        public int? IdArea { get; set; }
        [ForeignKey("SubArea")]
        public int? IdSubarea { get; set; }
        [ForeignKey("Produto")]
        public int? IdProduto { get; set; }
        [ForeignKey("EtapaProducao")]
        public int? IdEtapa { get; set; }
        [ForeignKey("TipoProducao")]
        public int? IdTipo { get; set; }  
        // public int indDeletada { get; set; }
         
        // public DateTime Data { get; set; }

        /*essas informações vem do model criado (Relações)*/
        public virtual Area Area { get; set; }
        public virtual Conteudista Conteudista { get; set;}
        public virtual Curso Curso { get; set;}
        public virtual Disciplina Disciplina {get; set; }
        public virtual EtapaProducao EtapaProducao { get; set; }
        public virtual Produto Produto { get; set;}
        public virtual SubArea SubArea { get; set;}
        public virtual Tema Tema { get; set; }
        public virtual TipoProducao TipoProducao { get; set; }


    }
}
