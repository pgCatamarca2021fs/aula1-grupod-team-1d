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
    public class MonedaController : ApiController
    {
        cryptomarcaEntities db = new cryptomarcaEntities();

        // GET: api/Moneda
        public IHttpActionResult Get()
        {
            try
            {
                List<monedas> lMonedas = db.monedas.ToList();
                return Ok(lMonedas);
            }
            catch (Exception e)
            {
                return NotFound();
            }

        }

        // GET: api/Moneda/5
        public IHttpActionResult Get(Int64 id)
        {
            if (id <= 0) return NotFound();

            try
            {
                monedas moneda = db.monedas.Where(x => x.id == id).FirstOrDefault<monedas>();
                if (moneda == null) return Ok();
                return Ok(moneda);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
