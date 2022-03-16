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
        public Respuesta Get()
        {
            Respuesta oR = new Respuesta();
            oR.status = 0;

            try
            {
                using (db = new cryptomarcaEntities())
                {
                    List<usuarios> lusuarios = db.usuarios.ToList();
                    oR.status = 1;
                    oR.data = lusuarios;
                    return oR;
                }
            }
            catch (Exception e)
            {
                oR.data = e;
                oR.message = "Ocurrió un problema en el servidor.";
                return oR;
            }
        }

        // GET: api/Usuario/5
        public Respuesta Get(Int64 id)
        {
            Respuesta oR = new Respuesta();
            oR.status = 0;

            if (id <= 0) {
                oR.message = "El id enviado no es válido";
                return oR;
            } 

            try
            {
                using (db = new cryptomarcaEntities())
                {
                    usuarios usuario = db.usuarios.Where(x => x.id == id).FirstOrDefault();
                    if (usuario == null) {
                        oR.message = "El usuario no existe";
                        return oR;
                    } else {
                        oR.status = 1;
                        oR.data = usuario;
                        return oR;
                    }                    
                }
            }
            catch (Exception e)
            {
                oR.data = e;
                oR.message = "Ocurrió un problema en el servidor.";
                return oR; 
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
        public Respuesta Post([FromBody]usuarios nuevo)
        {
            Respuesta oR = new Respuesta();
            oR.status = 0;

            // Validación que se envíen datos
            if (nuevo == null) {
                oR.message = "No se ha enviado ningún dato";
                return oR;                
            }

            //Validación del nombre
            if (nuevo.nombre == null || nuevo.nombre.Trim().Length == 0) {
                oR.message = "El nombre es un campo requerido";
                return oR;
            } 
            
            if (!funciones.esLetra(nuevo.nombre.Trim())) {
                oR.message = "El nombre no puede contener números";
                return oR;
            }

            //Validación del email
            if (nuevo.email == null || nuevo.email.Trim().Length == 0) {
                oR.message = "El email es un campo requerido";
                return oR;
            } 
                        
            if (!funciones.esEmail(nuevo.email.Trim())) {
                oR.message = "El email no es válido";
                return oR;
            }

            //Validación del password
            if (nuevo.password == null || nuevo.password.Trim().Length == 0) {
                oR.message = "El password es un campo requerido";
                return oR;
            }

            if (nuevo.password.Trim().Length < 6) {
                oR.message = "El password debe contener al menos seis caracteres";
                return oR;
            }

            //Validación del dni            
            if (nuevo.dni == null || nuevo.dni.Trim().Length == 0) {
                oR.message = "El dni es un campo requerido";
                return oR;
            }

            if (!funciones.esNumero(nuevo.dni.Trim())) {
                oR.message = "El dni no puede contener letras";
                return oR;
            }

            //Validación de la provincia
            if (nuevo.fk_provincia <= 0) {
                oR.message = "Debe seleccionar una provincia";
                return oR;
            }

            //Validación del banco
            if (nuevo.fk_banco <= 0) {
                oR.message = "Debe seleccionar un banco";
                return oR;
            }

            //Validación del cbu
            if (nuevo.cbu == null || nuevo.cbu.Trim().Length == 0) {
                oR.message = "El cbu es un campo requerido";
                return oR;
            } 
            
            if (!funciones.esNumero(nuevo.cbu.Trim())) {
                oR.message = "El cbu no puede contener letras";
                return oR;
            }

            //Validación de la fecha de nacimiento
            if (nuevo.fechaNacimiento == null || nuevo.fechaNacimiento.ToString("dd/MM/yyyy") == "01/01/0001") {
                oR.message = "La fecha de nacimiento es un campo requerido";
                return oR;
            } 

            TimeSpan dias = DateTime.Now.Subtract(nuevo.fechaNacimiento);
            if (dias.Days / 365 < 18) {
                oR.message = "La persona debe ser mayor a 18 años para poder operar";
                return oR;
            }            

            try
            {
                using (db = new cryptomarcaEntities())
                {
                    usuarios usuario = db.usuarios.Where(x => x.email == nuevo.email && x.password == nuevo.password).FirstOrDefault();
                    if (usuario != null)
                    {
                        oR.message = "El usuario ya existe";
                        return oR;
                    }

                    db.usuarios.Add(nuevo);
                    db.SaveChanges();
                    oR.status = 1;
                    oR.data = nuevo;
                    return oR;
                }
            }
            catch (Exception e)
            {
                oR.data = e;
                oR.message = "Ocurrió un problema en el servidor.";
                return oR;
            }
        }

        // PUT: api/Usuario/5
        public Respuesta Put(Int64 id, [FromBody]usuarios usu)
        {
            Respuesta oR = new Respuesta();
            oR.status = 0;

            // Validación que se envíen datos
            if (usu == null) {
                oR.message = "No se ha enviado ningún dato";
                return oR;
            }

            // Validación que se envíen datos
            if (usu == null)
            {
                oR.message = "No se ha enviado ningún dato";
                return oR;
            }

            //Validación del nombre
            if (usu.nombre == null || usu.nombre.Trim().Length == 0)
            {
                oR.message = "El nombre es un campo requerido";
                return oR;
            }

            if (!funciones.esLetra(usu.nombre.Trim()))
            {
                oR.message = "El nombre no puede contener números";
                return oR;
            }

            //Validación del email
            if (usu.email == null || usu.email.Trim().Length == 0)
            {
                oR.message = "El email es un campo requerido";
                return oR;
            }

            if (!funciones.esEmail(usu.email.Trim()))
            {
                oR.message = "El email no es válido";
                return oR;
            }

            //Validación del password
            if (usu.password == null || usu.password.Trim().Length == 0)
            {
                oR.message = "El password es un campo requerido";
                return oR;
            }

            if (usu.password.Trim().Length < 6)
            {
                oR.message = "El password debe contener al menos seis caracteres";
                return oR;
            }

            //Validación del dni            
            if (usu.dni == null || usu.dni.Trim().Length == 0)
            {
                oR.message = "El dni es un campo requerido";
                return oR;
            }

            if (!funciones.esNumero(usu.dni.Trim()))
            {
                oR.message = "El dni no puede contener letras";
                return oR;
            }

            //Validación de la provincia
            if (usu.fk_provincia <= 0)
            {
                oR.message = "Debe seleccionar una provincia";
                return oR;
            }

            //Validación del banco
            if (usu.fk_banco <= 0)
            {
                oR.message = "Debe seleccionar un banco";
                return oR;
            }

            //Validación del cbu
            if (usu.cbu == null || usu.cbu.Trim().Length == 0)
            {
                oR.message = "El cbu es un campo requerido";
                return oR;
            }

            if (!funciones.esNumero(usu.cbu.Trim()))
            {
                oR.message = "El cbu no puede contener letras";
                return oR;
            }

            //Validación de la fecha de nacimiento
            if (usu.fechaNacimiento == null || usu.fechaNacimiento.ToString("dd/MM/yyyy") == "01/01/0001")
            {
                oR.message = "La fecha de nacimiento es un campo requerido";
                return oR;
            }

            TimeSpan dias = DateTime.Now.Subtract(usu.fechaNacimiento);
            if (dias.Days / 365 < 18)
            {
                oR.message = "La persona debe ser mayor a 18 años para poder operar";
                return oR;
            }

            try
            {
                using (db = new cryptomarcaEntities())
                {
                    //valida si existe ese correo pero con distinto id
                    if (existeUsuario(usu.email, id)) {
                        oR.message = "El usuario ya existe";
                        return oR;
                    } 
                }

                using (db = new cryptomarcaEntities())
                {
                    //recupera datos
                    usuarios usuario = db.usuarios.Where(x => x.id == id).First();
                    if (usuario == null) {
                        oR.message = "El usuario no existe";
                        return oR;
                    }

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
                    oR.status = 1;
                    oR.data = usu;
                    return oR;
                }
            }
            catch (Exception e)
            {
                oR.data = e;
                oR.message = "Ocurrió un problema en el servidor.";
                return oR;
            }
        }

        // DELETE: api/Usuario/5
        public Respuesta Delete(int id)
        {
            Respuesta oR = new Respuesta();
            oR.status = 0;

            if (id <= 0) {
                oR.message = "El id enviado no es válido";
                return oR;
            } 

            try
            {
                using (db = new cryptomarcaEntities())
                {
                    if (!ModelState.IsValid) {
                        oR.message = "Ocurrió un error, no se pudo eliminar";
                        return oR;
                    } 

                    usuarios usuario = db.usuarios.Where(x => x.id == id).First();
                    db.usuarios.Remove(usuario);
                    db.SaveChanges();
                    oR.status = 1;
                    oR.message = "Usuario eliminado exitosamente";
                    return oR;
                }
            }
            catch (Exception e)
            {
                oR.data = e;
                oR.message = "Ocurrió un problema en el servidor.";
                return oR;
            }
        }
    }
}
