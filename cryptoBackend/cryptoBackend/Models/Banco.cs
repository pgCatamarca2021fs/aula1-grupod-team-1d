using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cryptoBackend.Models
{
    public class Banco
    {
        private Int64 id;
        private string nombre;

        public Int64 Id { get => id; }
        public string Nombre { get => nombre; set => nombre = value; }

    }
}