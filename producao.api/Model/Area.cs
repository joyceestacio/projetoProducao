using System.ComponentModel.DataAnnotations.Schema;

namespace producao.api.Model
{
    public class Area
    {
       
       
        public int Id { get; set; }
       
      // [ForeignKey("Id")]  
      // [Primary]

        public string NomeArea { get; set; }
        
    }
}