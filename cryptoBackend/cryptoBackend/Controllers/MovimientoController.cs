using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
            try
            {
                List<movimientos> lmovimientos = db.movimientos.ToList();
                return Ok(lmovimientos);
            }
            catch (Exception e)
            {
                return NotFound();
            }

        }

        // GET: api/Movimiento/5
        public IHttpActionResult Get(Int64 id)
        {
            if (id <= 0) return NotFound();

            try
            {
                movimientos movimiento = db.movimientos.Where(x => x.id == id).FirstOrDefault<movimientos>();
                if (movimiento == null) return Ok();
                return Ok(movimiento);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
