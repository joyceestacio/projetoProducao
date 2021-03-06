﻿using System;
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
            //.Include(c => c.Curso)
            .Include(d => d.Disciplina)
            .Include(e => e.EtapaProducao)
            .Include(p => p.Produto)
            .Include(s => s.SubArea)
            .Include(t => t.Tema)
            .Include(t => t.TipoProducao)
            .Where(x => x.indDeletada == null)
            .OrderBy(x => x.Id)
            .ToList();
            return query;
        }

        [HttpGet("getProfessores")]
        public ActionResult<Conteudista> getProfessores() {

            var result =  this.ProducaoContext.Conteudista.ToList();

            return Ok(result);
        }

        [HttpGet("getDados")]
        public ActionResult<dynamic> GetDados()
        {

        try
        {
            var Disciplina = this.ProducaoContext.Disciplina.OrderBy(x => x.NomeDisciplina).ToList();
            var Tema = this.ProducaoContext.Tema.OrderBy(t => t.NomeTema).ToList();
            var Conteudista = this.ProducaoContext.Conteudista.OrderBy(c => c.NomeConteudista).ToList();
            var Area = this.ProducaoContext.Area.ToList();
            var SubArea = this.ProducaoContext.SubArea.OrderBy(s => s.NomeSubArea).ToList();
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
            return Ok(Result);
            
        }
        catch (System.Exception e)
        {
            return  e.Message;
        }
            
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
        [HttpPost("atualizar")]
        public ActionResult Post([FromBody] dynamic values )
        {

            FProducaoHistorico prdH = new FProducaoHistorico();

        
            
            // int? idProf = (values[1] == null) ? nullConvert.ToInt32(values[1])
            FProducao Prod = this.ProducaoContext.FProducao.Find(Convert.ToInt32(values[0]));

            prdH.IdProducao =Prod.Id;
            prdH.IdConteudista = Prod.IdConteudista;
            prdH.IdEtapa = Prod.IdEtapa;
            prdH.DataLog = Prod.Data;
            // prdH.indDeletada = values.indDeletada;
            this.ProducaoContext.FProducaoHistorico.Add(prdH);

            Prod.IdConteudista = Convert.ToInt32(values[1]);
            Prod.IdEtapa = Convert.ToInt32(values[2]);
            Prod.Data = DateTime.Now;
            this.ProducaoContext.SaveChanges();

            return Ok(Prod);
                    

        }

        [HttpPost("incluir")]
        public ActionResult incluir([FromBody] FProducao _producao)
        {
            
            // int ultimoid = this.ProducaoContext.FProducao
            //                 .ToList().Max(x => x.Id) + 1;

            // FProducaoHistorico prdH = new FProducaoHistorico();

            // prdH.IdProducao = _producao.Id;
            // prdH.IdConteudista = _producao.IdConteudista;
            // prdH.IdEtapa = _producao.IdEtapa;
            // prdH.indDeletada = _producao.indDeletada;
            // this.ProducaoContext.FProducaoHistorico.Add(prdH);

            
            try
            {

                    this.ProducaoContext.FProducao.Add(_producao);
                    this.ProducaoContext.SaveChanges();
                    return Ok(_producao);
            }
            catch (System.Exception e)
            { 
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

        }


        [HttpPut("excluir")]
        public ActionResult<dynamic> Excluir([FromBody] int id) {
            
            FProducao prof = this.ProducaoContext.FProducao.Find(id);

            FProducaoHistorico prdH = new FProducaoHistorico();

            prdH.IdProducao = prof.Id;
            prdH.IdConteudista = prof.IdConteudista;
            prdH.IdEtapa = prof.IdEtapa;
            prdH.indDeletada = -1;
            this.ProducaoContext.FProducaoHistorico.Add(prdH);

            prof.indDeletada = 1;
            this.ProducaoContext.SaveChanges();

            return prof;

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
