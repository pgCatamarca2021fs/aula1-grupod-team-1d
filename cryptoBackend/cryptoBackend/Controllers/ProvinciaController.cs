using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace cryptoBackend.Controllers
{
    public class ProvinciaController : ApiController
    {
        cryptomarcaEntities db = new cryptomarcaEntities();

        // GET: api/Provincia
        public IHttpActionResult Get()
        {
            try
            {
                List<provincias> lprovincias = db.provincias.ToList();
                return Ok(lprovincias);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/Provincia/5
        public IHttpActionResult Get(Int64 id)
        {
            try
            {
                provincias provincia = db.provincias.Where(x => x.id == id).FirstOrDefault<provincias>();
                if (provincia == null) return Ok();
                return Ok(provincia);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
