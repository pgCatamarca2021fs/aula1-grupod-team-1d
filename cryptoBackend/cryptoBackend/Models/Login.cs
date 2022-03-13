using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cryptoBackend.Models
{
    public class Login
    {
        public string email { get; set; }
        public string token { get; set; }
        public IQueryable<usuarios> lista { get; set; }
    }
}