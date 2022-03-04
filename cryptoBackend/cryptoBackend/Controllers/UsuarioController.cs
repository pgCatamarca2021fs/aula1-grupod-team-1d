using cryptoBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace cryptoBackend.Controllers
{
    public class UsuarioController : ApiController
    {
        cryptomarcaEntities db;

        // GET: api/Usuario
        public IHttpActionResult Get()
        {
            try
            {
                using (db = new cryptomarcaEntities())
                {
                    List<usuarios> lusuarios = db.usuarios.ToList();
                    return Ok(lusuarios);
                }
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/Usuario/5
        public IHttpActionResult Get(Int64 id)
        {
            try
            {
                using (db = new cryptomarcaEntities())
                {
                    usuarios usuario = db.usuarios.Where(x => x.id == id).FirstOrDefault();
                    if (usuario == null) return Ok();
                    return Ok(usuario);
                }
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        
        // POST: api/Usuario
        public IHttpActionResult Post([FromBody]usuarios nuevo)
        {
            try
            {
                using (db = new cryptomarcaEntities())
                {
                    usuarios usuario = db.usuarios.Where(x => x.email == nuevo.email && x.password == nuevo.password).FirstOrDefault();
                    if (usuario != null)
                    {
                        return NotFound();
                    }

                    db.usuarios.Add(nuevo);
                    db.SaveChanges();
                    return Created("Creado", nuevo);
                }
            }
            catch(Exception e)
            {
                return NotFound();
            }
        }

        // PUT: api/Usuario/5
        public IHttpActionResult Put(Int64 id, [FromBody]Usuario usu)
        {
            try
            {
                using (db = new cryptomarcaEntities())
                {
                    usuarios usuario = db.usuarios.Where(x => x.id == id).First();
                    if (usuario == null)
                    {
                        return NotFound();
                    }

                    usuario.nombre = usu.Nombre;
                    usuario.email = usu.Email;
                    usuario.password = usu.Password;
                    usuario.dni = usu.Dni;
                    usuario.fk_provincia = usu.Fk_provincia;
                    usuario.fk_banco = usu.Fk_banco;
                    usuario.cbu = usu.Cbu;
                    usuario.fechaNacimiento = usu.FechaNacimiento;
                    usuario.activo = usu.Activo;

                    db.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // DELETE: api/Usuario/5
        public IHttpActionResult Delete(int id)
        {
            try
            {
                using (db = new cryptomarcaEntities())
                {
                    if (!ModelState.IsValid) return NotFound();

                    usuarios usuario = db.usuarios.Where(x => x.id == id).First();
                    db.usuarios.Remove(usuario);
                    db.SaveChanges();
                    return Ok();
                }
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
