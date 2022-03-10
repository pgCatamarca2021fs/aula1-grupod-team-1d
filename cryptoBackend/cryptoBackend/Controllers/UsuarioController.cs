using cryptoBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cryptoBackend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsuarioController : ApiController
    {
        cryptomarcaEntities db;
        FuncionesComunes funciones= new FuncionesComunes();

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
            if (id <= 0) return NotFound();

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

        public bool existeUsuario(string email, Int64 id)
        {
            try
            {
                using (db = new cryptomarcaEntities())
                {
                    usuarios usuario = db.usuarios.Where(x => x.email == email && x.id != id).First();
                    if (usuario != null) return true;
                    else return false;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }

        // POST: api/Usuario
        public IHttpActionResult Post([FromBody]usuarios nuevo)
        {
            if (nuevo == null) return NotFound();

            //long cero o que posea algun caracter que no sea letra
            if (nuevo.nombre==null || nuevo.nombre.Trim().Length == 0) return NotFound();
            nuevo.nombre = nuevo.nombre.Trim();
            if (!funciones.esLetra(nuevo.nombre)) return NotFound();

            //long cero y valida email regex
            if (nuevo.email==null || nuevo.email.Trim().Length == 0) return NotFound();
            nuevo.email = nuevo.email.Trim();
            if (!funciones.esEmail(nuevo.email)) return NotFound();

            //long cero
            if (nuevo.password==null || nuevo.password.Trim().Length == 0) return NotFound();
            nuevo.password = nuevo.password.Trim();

            if (nuevo.dni==null || nuevo.dni.Trim().Length <= 6) return NotFound();
            nuevo.dni = nuevo.dni.Trim();
            if (!funciones.esNumero(nuevo.dni)) return NotFound();

            if (nuevo.fk_provincia <= 0) return NotFound();
            if (nuevo.fk_banco <= 0) return NotFound();

            if (nuevo.cbu==null || nuevo.cbu.Trim().Length == 0) return NotFound();
            nuevo.cbu = nuevo.cbu.Trim();
            if (!funciones.esNumero(nuevo.cbu)) return NotFound();

            if (nuevo.fechaNacimiento == null || nuevo.fechaNacimiento.ToString("dd/MM/yyyy") == "01/01/0001") return NotFound();
            TimeSpan dias = DateTime.Now.Subtract(nuevo.fechaNacimiento);
            if ( dias.Days/365 < 18) return NotFound();

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
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // PUT: api/Usuario/5
        public IHttpActionResult Put(Int64 id, [FromBody]usuarios usu)
        {
            if (usu == null) return NotFound();

            //long cero o que posea algun caracter que no sea letra
            if (usu.nombre == null || usu.nombre.Trim().Length == 0) return NotFound();
            usu.nombre = usu.nombre.Trim();
            if (!funciones.esLetra(usu.nombre)) return NotFound();

            //long cero y valida email regex
            if (usu.email == null || usu.email.Trim().Length == 0) return NotFound();
            usu.email = usu.email.Trim();
            if (!funciones.esEmail(usu.email)) return NotFound();

            //long cero
            if (usu.password == null || usu.password.Trim().Length == 0) return NotFound();
            usu.password = usu.password.Trim();

            if (usu.dni == null || usu.dni.Trim().Length <= 6) return NotFound();
            usu.dni = usu.dni.Trim();
            if (!funciones.esNumero(usu.dni)) return NotFound();

            if (usu.fk_provincia <= 0) return NotFound();
            if (usu.fk_banco <= 0) return NotFound();

            if (usu.cbu == null || usu.cbu.Trim().Length == 0) return NotFound();
            usu.cbu = usu.cbu.Trim();
            if (!funciones.esNumero(usu.cbu)) return NotFound();

            if (usu.fechaNacimiento == null || usu.fechaNacimiento.ToString("dd/MM/yyyy") == "01/01/0001") return NotFound();
            
            try
            {
                using (db = new cryptomarcaEntities())
                {
                    //valida si existe ese correo pero con distinto id
                    if (existeUsuario(usu.email, id)) return NotFound();
                }

                using (db = new cryptomarcaEntities())
                {
                    //recupera datos
                    usuarios usuario = db.usuarios.Where(x => x.id == id).First();
                    if (usuario == null) return NotFound();


                    usuario.nombre = usu.nombre;
                    usuario.email = usu.email;
                    usuario.password = usu.password;
                    usuario.dni = usu.dni;
                    usuario.fk_provincia = usu.fk_provincia;
                    usuario.fk_banco = usu.fk_banco;
                    usuario.cbu = usu.cbu;
                    usuario.fechaNacimiento = usu.fechaNacimiento;
                    usuario.activo = usu.activo;

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
            if (id <= 0) return NotFound();

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
