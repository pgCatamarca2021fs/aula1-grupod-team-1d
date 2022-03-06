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
    public class PaisController : ApiController
    {
        cryptomarcaEntities db = new cryptomarcaEntities();

        // GET: api/Pais
        public IHttpActionResult Get()
        {
            try
            {
                List<paises> lpaises = db.paises.ToList();
                return Ok(lpaises);
            }
            catch(Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/Pais/5
        public IHttpActionResult Get(Int64 id)
        {
            try
            {
                paises pais = db.paises.Where(x => x.id == id).FirstOrDefault<paises>();
                if (pais == null) return Ok();
                return Ok(pais);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        
    }
}
