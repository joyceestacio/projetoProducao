namespace producao.api.Model
{
    public class FProducaoHistorico
    {
        public int Id { get; set; }
        public int IdProducao { get; set; }
        public int? IdConteudista { get; set; }
        public int? IdEtapa { get; set; }
        public int? indDeletada { get; set; }
    }
}