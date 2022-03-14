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
    [EnableCors(origins: "*", headers: "*", methods: "*")]

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
        public IHttpActionResult Post([FromBody] movimientos movimiento)
        {
            //if (movimiento.id <= 0) return NotFound();
            if ((movimiento.fk_billeteraMoneda_Origen < 0)) return NotFound();
            if (movimiento.fk_billeteraMoneda_Destino <= 0) return NotFound();
            //if (movimiento.cantidad_Origen < 0) return NotFound();
            //if (movimiento.cantidad_Destino <= 0) return NotFound();
            if (movimiento.fk_tipoMovimiento <= 0) return NotFound();

            try
            {
                using (db = new cryptomarcaEntities())
                {
                    movimientos newMovimiento = new movimientos()
                    {
                        //id = movimiento.id,
                        fk_billeteraMoneda_Origen = movimiento.fk_billeteraMoneda_Origen,
                        fk_billeteraMoneda_Destino = movimiento.fk_billeteraMoneda_Destino,
                        cantidad_Origen = movimiento.cantidad_Origen,
                        cantidad_Destino = movimiento.cantidad_Destino,
                        fecha = DateTime.Now, //movimiento.fecha,
                        fk_tipoMovimiento = movimiento.fk_tipoMovimiento
                    };


                    db.movimientos.Add(newMovimiento);
                    db.SaveChanges();

                    return Created("Creado", newMovimiento);
                }
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
