using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using producao.api.Model;

namespace producao.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        TempProducaoContext ProducaoContext;

        public ValuesController(TempProducaoContext _producaoContext)
        {
            this.ProducaoContext = _producaoContext;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<FProducao>> Get()
        {
            var query = ProducaoContext.FProducao
            .Include(a => a.Area)
            .Include( c => c.Conteudista)
            .Include(c => c.Curso)
            .Include(d => d.Disciplina)
            .Include(e => e.EtapaProducao)
            .Include(p => p.Produto)
            .Include(s => s.SubArea)
            .Include(t => t.Tema)
            .Include(t => t.TipoProducao)
            .ToList();
            return query;
        }

        [HttpGet("cadastrarProducao")]
         public ActionResult<List<dynamic>> GetDados(){
            var disciplina = this.ProducaoContext.Disciplina.ToList();
            return null;
        }

        [HttpGet("etapa")]
        public ActionResult<IEnumerable<EtapaProducao>> GetEtapaProducao(){
            var query = ProducaoContext.EtapaProducao.ToList();
            return query;
        }

        // GET api/values/5
        [HttpGet("pegarValores/{id}")]
        public ActionResult<int> PegarValores(int id)
        {
            return id;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
