using cryptoBackend.Models;
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
    public class LoginController : ApiController
    {
        cryptomarcaEntities db = new cryptomarcaEntities();

        // GET: api/Login
        public IHttpActionResult Post([FromBody] Usuario model)
        {
            try
            {
                var lst = db.usuarios.Where(d => d.email == model.Email && d.password == model.Password);
                if (lst.Count() > 0)
                {
                    var token = Guid.NewGuid().ToString();
                    return Ok(token);
                }
                else
                {
                    return NotFound();
                }
                    
            }
            catch (Exception e)
            {
                return NotFound();
            }

        }
    }
}
