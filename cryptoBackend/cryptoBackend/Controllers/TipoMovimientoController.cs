using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cryptoBackend.Controllers
{
    [EnableCors(origins: "*", headers:"*", methods:"*")]
    public class TipoMovimientoController : ApiController
    {
        cryptomarcaEntities db = new cryptomarcaEntities();
        // GET: api/TipoMovimiento
        public IHttpActionResult Get()
        {
            try
            {
                List<tipoMovimientos> ltipoMovimientos = db.tipoMovimientos.ToList();
                return Ok(ltipoMovimientos);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/TipoMovimiento/5
        public IHttpActionResult Get(Int64 id)
        {
            if (id <= 0) return NotFound();

            try
            {
                tipoMovimientos tipoMovimientos = db.tipoMovimientos.Where(x => x.id == id).FirstOrDefault<tipoMovimientos>();
                if (tipoMovimientos == null) return Ok();
                return Ok(tipoMovimientos);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
