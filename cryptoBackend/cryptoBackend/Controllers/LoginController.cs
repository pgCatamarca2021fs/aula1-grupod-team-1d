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
        public Login Post([FromBody] Usuario model)
        {
            Login oR = new Login();
            oR.email = "";
            oR.token = "";
            oR.lista = null;

            try
            {
                
                var lst = db.usuarios.Where(d => d.email == model.Email && d.password == model.Password);
                if (lst.Count() > 0)
                {
                    var token = Guid.NewGuid().ToString();

                    
                    
                    oR.email = model.Email;
                    oR.token = token;
                    oR.lista = lst;

                    return oR;
                    //return Ok(token);                    
                }
                else
                {

                    return oR;
                    //return NotFound();
                }
                    
            }
            catch (Exception e)
            {
                return oR;
                //return NotFound();
            }

        }
    }
}
