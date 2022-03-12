using cryptoBackend.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cryptoBackend.Controllers
{
    public class MovimientoController : ApiController
    {
        cryptomarcaEntities db = new cryptomarcaEntities();

        // GET: api/Movimiento
        public IHttpActionResult Get()
        {
            /*try
            {
                List<movimientos> lmovimientos = db.movimientos.ToList();
                return Ok(lmovimientos);
            }
            catch (Exception e)
            {
                return NotFound();
            }*/
            return NotFound();
        }

        // GET: api/Movimiento/5
        public IHttpActionResult Get(Int64 id)
        {
            if (id <= 0) return NotFound();

            try
            {
                string query = "select distinct [dbo].[movimientos].* from [dbo].[movimientos], [dbo].[billeterasMonedas] where( [dbo].[movimientos].[fk_billeteraMoneda_Destino] = [dbo].[billeterasMonedas].[id] and[dbo].[billeterasMonedas].[fk_usuario] = {0}) or( [dbo].[movimientos].[fk_billeteraMoneda_Origen] = [dbo].[billeterasMonedas].[id] and[dbo].[billeterasMonedas].[fk_usuario] = {0} ) or( [dbo].[movimientos].[fk_billeteraMoneda_Destino] = [dbo].[billeterasMonedas].[id] and[dbo].[movimientos].[fk_billeteraMoneda_Origen] = [dbo].[billeterasMonedas].[id] and[dbo].[billeterasMonedas].[fk_usuario] = {0})";
                List <movimientos> movimiento = db.movimientos.SqlQuery(query, id).ToList();

                if (movimiento == null) return Ok();
                return Ok(movimiento);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // POST: api/Movimiento
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Movimiento/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Movimiento/5
        public void Delete(int id)
        {
        }
    }
}
