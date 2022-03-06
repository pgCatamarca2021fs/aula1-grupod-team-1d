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
    public class BancoController : ApiController
    {
        cryptomarcaEntities db = new cryptomarcaEntities();

        // GET: api/Banco
        public IHttpActionResult Get()
        {
            try
            {
                List<bancos> lbancos = db.bancos.ToList();
                return Ok(lbancos);
            }
            catch(Exception e)
            {
                return NotFound();
            }
            
        }

        // GET: api/Banco/5
        public IHttpActionResult Get(Int64 id)
        {
            if (id <= 0) return NotFound();

            try
            {
                bancos banco = db.bancos.Where(x=> x.id==id).FirstOrDefault<bancos>();
                if (banco == null) return Ok();
                return Ok(banco);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
