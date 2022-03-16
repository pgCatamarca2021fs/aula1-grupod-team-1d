using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using cryptoBackend.Models;

namespace cryptoBackend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    
    public class BilleteraMonedasController : ApiController
    {
        cryptomarcaEntities db = new cryptomarcaEntities();

        [HttpGet]
        [Route("api/BilleteraMonedas/getBilleteraUsuario/{idUsuario:int}")]
        public IHttpActionResult Get(Int64 idUsuario)
        {
            if (idUsuario <= 0) return BadRequest("IdUsuario incorrecto");

            try
            {
                List<object> lBilletera = db.billeterasMonedas.Where(x => x.fk_usuario == idUsuario).Join(db.monedas,billetera=>billetera.fk_moneda,moneda=>moneda.id,(billetera,moneda)=>new {cantidad=billetera.cantidad,moneda=moneda.nombre,idBilletera=billetera.id,idMoneda=moneda.id }).Where(x=>(x.cantidad>0 && x.moneda!="Pesos")|| x.moneda == "Pesos").ToList<object>();
                if (lBilletera == null) return Ok();
                return Ok(lBilletera);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        public IHttpActionResult Post([FromBody] Operacion operacion)
        {
            billeterasMonedas billetera = new billeterasMonedas();
            if (operacion == null) return BadRequest("Problemas con el envio de Datos");
            if (operacion.FkUsuario <= 0) return BadRequest("IdUsuario incorrecto");
            //if (operacion.FkMoneda <= 0 && operacion.Destino==true) return NotFound();
            if (operacion.TipoMovimiento <= 0)  return BadRequest("Tipo de Movimiento Incorrecto");
            if (operacion.Cantidad < -1)  return BadRequest("Cantidad Incorrecta");

            try
            {
                using (db = new cryptomarcaEntities())
                {
                    billetera = db.billeterasMonedas.Where(x => x.fk_usuario == operacion.FkUsuario && x.fk_moneda == operacion.FkMoneda).FirstOrDefault();
                    tipoMovimientos tipoMovimientos = db.tipoMovimientos.Where(x => x.id == operacion.TipoMovimiento).First();
                    
                    if(billetera==null)
                    {
                        billetera = new billeterasMonedas() {
                            fk_moneda = operacion.FkMoneda,
                            fk_usuario = operacion.FkUsuario,
                            cantidad = operacion.Cantidad
                        };
                    }

                    billetera.cantidad = operacion.Cantidad;
                    
                    if (billetera.id == 0) billetera=db.billeterasMonedas.Add(billetera);
                    db.SaveChanges();                    
                }

                return Created("Creado", billetera);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
