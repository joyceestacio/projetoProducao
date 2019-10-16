using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace producao.api.Model
{
    public partial class TempProducaoContext : DbContext
    {
        public TempProducaoContext()
        {
        }

        public TempProducaoContext(DbContextOptions<TempProducaoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Area> Area { get; set; }
        public virtual DbSet<Conteudista> Conteudista { get; set; }
        public virtual DbSet<Curso> Curso { get; set; }
        public virtual DbSet<Disciplina> Disciplina { get; set; }
        public virtual DbSet<EtapaProducao> EtapaProducao { get; set; }
        public virtual DbSet<FProducao> FProducao { get; set; }
        public virtual DbSet<Produto> Produto { get; set; }
        public virtual DbSet<SubArea> SubArea { get; set; }
        public virtual DbSet<Tema> Tema { get; set; }
        public virtual DbSet<TipoProducao> TipoProducao { get; set; }
        public virtual DbSet<FProducaoHistorico> FProducaoHistorico { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<FProducao>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("fProducao");

                entity.Property(e => e.Id).HasColumnName("ID");

                // entity.Property(e => e.Data)
                //     .HasColumnName("DATA")
                //     .HasColumnType("date");

                entity.Property(e => e.IdArea).HasColumnName("ID_AREA");

                entity.Property(e => e.IdCodCurso).HasColumnName("ID_CURSO");

                entity.Property(e => e.IdConteudista).HasColumnName("ID_CONTEUDISTA");

                entity.Property(e => e.IdDisciplina).HasColumnName("ID_DISCIPLINA");

                entity.Property(e => e.IdEtapa).HasColumnName("ID_ETAPA");

                entity.Property(e => e.IdPeriodo).HasColumnName("ID_PERIODO");

                entity.Property(e => e.IdProduto).HasColumnName("ID_PRODUTO");

                entity.Property(e => e.IdSubarea).HasColumnName("ID_SUBAREA");

                entity.Property(e => e.IdTema).HasColumnName("ID_TEMA");

                entity.Property(e => e.IdTipo).HasColumnName("ID_TIPO");

                entity.Property(e => e.indDeletada).HasColumnName("IND_DELETADA");
            });

            modelBuilder.Entity<Area>(entity =>
           {
               entity.HasKey(e => e.Id)
                   .ForSqlServerIsClustered(false);

               entity.ToTable("dArea");

               entity.Property(e => e.Id).HasColumnName("ID");

               entity.Property(e => e.NomeArea).HasColumnName("AREA");

           });

            modelBuilder.Entity<Conteudista>(entity =>
           {
               entity.HasKey(e => e.Id)
                   .ForSqlServerIsClustered(false);

               entity.ToTable("dConteudista");

               entity.Property(e => e.Id).HasColumnName("ID");

               entity.Property(e => e.Cpf).HasColumnName("CPF");

               entity.Property(e => e.NomeConteudista).HasColumnName("NOM_CONTEUDISTA");

           });

            modelBuilder.Entity<Curso>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("dCurso");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CodigoCurso).HasColumnName("COD_CURSO");

                entity.Property(e => e.NomeCurso).HasColumnName("NOM_CURSO");

            });

            modelBuilder.Entity<Disciplina>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("dDisciplina");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CodigoDisciplina).HasColumnName("COD_DISCIPLINA");

                entity.Property(e => e.NomeDisciplina).HasColumnName("NOM_DISCIPLINA");

            });

            modelBuilder.Entity<EtapaProducao>(entity =>
           {
               entity.HasKey(e => e.Id)
                   .ForSqlServerIsClustered(false);

               entity.ToTable("dEtapa_Producao");

               entity.Property(e => e.Id).HasColumnName("ID");

               entity.Property(e => e.NomeEtapa).HasColumnName("NOM_ETAPA");

           });

            modelBuilder.Entity<Produto>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .ForSqlServerIsClustered(false);

                entity.ToTable("dProduto");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.NomeProduto).HasColumnName("NOM_PRODUTO");

            });

            modelBuilder.Entity<SubArea>(entity =>
           {
               entity.HasKey(e => e.Id)
                   .ForSqlServerIsClustered(false);

               entity.ToTable("dSub_Area");
               entity.Property(e => e.Id).HasColumnName("ID");
               entity.Property(e => e.NomeSubArea).HasColumnName("NOM_SUBAREA");

           });

            modelBuilder.Entity<Tema>(entity =>
           {
                entity.HasKey(e => e.Id)
                               .ForSqlServerIsClustered(false);

                entity.ToTable("dTema");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.NomeTema).HasColumnName("NOM_TEMA");
                entity.Property(e => e.IdAreaCuradoria).HasColumnName("ID_AREA_CURADORIA");
                entity.Property(e => e.SubAreaCuradora).HasColumnName("ID_SUBAREA_CURADORIA");

           });

           modelBuilder.Entity<TipoProducao>(entity =>
           {
                entity.HasKey(e => e.Id)
                               .ForSqlServerIsClustered(false);

                entity.ToTable("dTipo_Producao");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.NomeTipoProducao).HasColumnName("NOM_TIPO_PRODUCAO");

           });

           modelBuilder.Entity<FProducaoHistorico>(entity =>
           {
                entity.HasKey(e => e.Id);

                entity.ToTable("fProducao_historico");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IdProducao).HasColumnName("ID_PRODUCAO");

                entity.Property(e => e.IdConteudista).HasColumnName("ID_CONTEUDISTA");

                entity.Property(e => e.IdEtapa).HasColumnName("ID_ETAPA");

                entity.Property(e => e.indDeletada).HasColumnName("IND_DELETADA");

           });

        }
    }
}
