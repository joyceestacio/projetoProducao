using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
            .Include(c => c.Conteudista)
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

        [HttpGet("getDados")]
        public ActionResult<dynamic> GetDados()
        {
            var Disciplina = this.ProducaoContext.Disciplina.ToList();
            var Tema = this.ProducaoContext.Tema.ToList();
            var Conteudista = this.ProducaoContext.Conteudista.ToList();
            var Area = this.ProducaoContext.Area.ToList();
            var SubArea = this.ProducaoContext.SubArea.ToList();
            var TipoProducao = this.ProducaoContext.TipoProducao.ToList();
            var Produto = this.ProducaoContext.Produto.ToList();
            var EtapaProducao = this.ProducaoContext.EtapaProducao.ToList();
            var Result = new
            {
                Disciplina,
                Tema,
                Conteudista,
                Area,
                SubArea,
                TipoProducao,
                Produto,
                EtapaProducao
            };
            return Result;
        }

        [HttpGet("etapa")]
        public ActionResult<IEnumerable<EtapaProducao>> GetEtapaProducao()
        {
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

        [HttpPost("incluir")]
        public ActionResult incluir([FromBody] FProducao _producao)
        {
            
            // int ultimoid = this.ProducaoContext.FProducao
            //                 .ToList().Max(x => x.Id) + 1;

            try
            {
                    this.ProducaoContext.FProducao.Add(_producao);
                    this.ProducaoContext.SaveChanges();
                    return Ok(_producao);
            }
            catch (System.Exception)
            { 
                return StatusCode(StatusCodes.Status500InternalServerError, "Item não foi incluído.");
            }

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
