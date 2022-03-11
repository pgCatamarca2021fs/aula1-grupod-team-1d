using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using cryptoBackend.Models;


namespace cryptoBackend.Controllers
{
    public class MovimientoController : ApiController
    {
        // GET: api/Movimiento
        public IEnumerable<Movimiento> Get()
        {
            GestorMovimiento gestor = new GestorMovimiento();

            return gestor.ListarMovimientosDeUsuario(2);
        }

        // GET: api/Movimiento/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Movimiento
        public void Post([FromBody] Movimiento nuevoMovimiento)
        {
            GestorMovimiento gestor = new GestorMovimiento();
            gestor.CrearMovimiento(nuevoMovimiento);
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
