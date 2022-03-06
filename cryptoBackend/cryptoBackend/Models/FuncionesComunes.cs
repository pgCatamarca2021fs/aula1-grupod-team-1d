using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace cryptoBackend.Models
{
    public class FuncionesComunes
    {
        public bool esEmail(string email)
        {
            string expresion = @"\A(\w+\.?\w*\@\w+\.)(com)\Z";
            return Regex.IsMatch(email, expresion);
        }

        public bool esLetra(string campo)
        {
            return Regex.IsMatch(campo, @"^[a-zA-Z]+$");
        }

        public bool esNumero(string campo)
        {
            return Regex.IsMatch(campo, @"^[1-9]+$");
        }
    }
}