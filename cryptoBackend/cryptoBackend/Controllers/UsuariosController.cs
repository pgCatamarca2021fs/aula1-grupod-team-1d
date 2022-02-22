using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using cryptoBackend.Models;

namespace cryptoBackend.Controllers
{
    public class UsuariosController : ApiController
    {
        // GET: api/Usuarios
        public IEnumerable<string> Get()
        {
            return null;
        }

        // GET: api/Usuarios/5
        public Usuario Get(int id)
        {
            return new Usuario();
        }

        // POST: api/Usuarios
        public void Post([FromBody] Usuario value)
        {
        }

        // PUT: api/Usuarios/5
        public void Put(int id, [FromBody] Usuario value)
        {
        }

        // DELETE: api/Usuarios/5
        public void Delete(int id)
        {
        }
    }
}
