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

        public IHttpActionResult Get()
        {
            return Ok();
        }

        public IHttpActionResult Get(Int64 id)
        {
            if (id <= 0) return NotFound();

            try
            {
                List<object> lBilletera = db.billeterasMonedas.Where(x => x.fk_usuario == id).Join(db.monedas,billetera=>billetera.fk_moneda,moneda=>moneda.id,(billetera,moneda)=>new {precio=billetera.cantidad,moneda=moneda.nombre,idBilletera=billetera.id,idMoneda=moneda.id }).ToList<object>();
                if (lBilletera == null) return Ok();
                return Ok(lBilletera);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        public IHttpActionResult Post([FromBody]Operacion operacion)
        {
            billeterasMonedas billetera = new billeterasMonedas();
            if (operacion.FkUsuario <= 0) return NotFound();
            //if (operacion.FkMoneda <= 0 && operacion.Destino==true) return NotFound();
            if (operacion.TipoMovimiento <= 0) return NotFound();
            if (operacion.Cantidad < 0) return NotFound();

            try
            {
                using (db = new cryptomarcaEntities())
                {
                    billetera = db.billeterasMonedas.Where(x => x.fk_usuario == operacion.FkUsuario && x.fk_moneda == operacion.FkMoneda).FirstOrDefault();
                    tipoMovimientos tipoMovimientos = db.tipoMovimientos.Where(x => x.id == operacion.TipoMovimiento).First();
                    /*
                    if (tipoMovimientos.descripcion == "Compra" && billetera.cantidad < operacion.Cantidad) return NotFound();
                    if (tipoMovimientos.descripcion == "Venta" && billetera.cantidad < operacion.Cantidad) return NotFound();
                    */
                    if(billetera==null)
                    {
                        billetera = new billeterasMonedas() {
                            fk_moneda = operacion.FkMoneda,
                            fk_usuario = operacion.FkUsuario,
                            cantidad = operacion.Cantidad
                        };
                    }

                    billetera.cantidad = operacion.Cantidad;
                    /*
                    if (tipoMovimientos != null)
                    {
                        switch(tipoMovimientos.descripcion) {
                            case "Compra":
                            case "Transferencia":
                                billetera.cantidad += operacion.Cantidad;
                                break;
                            case "Venta":
                                billetera.cantidad -= operacion.Cantidad;
                                break;
                        }
                    }*/


                    if (billetera.id == 0) db.billeterasMonedas.Add(billetera);
                    db.SaveChanges();
                    
                }

                return Created("Creado", billetera);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
