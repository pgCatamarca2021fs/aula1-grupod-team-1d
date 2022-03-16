using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cryptoBackend.Models
{
    public class Respuesta
    {
        public int status { get; set; }
        public object data { get; set; }
        public string message { get; set; }
    }
}