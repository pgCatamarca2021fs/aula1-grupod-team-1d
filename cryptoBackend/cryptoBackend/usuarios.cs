//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace cryptoBackend
{
    using System;
    using System.Collections.Generic;
    
    public partial class usuarios
    {
        public long id { get; set; }
        public string nombre { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string dni { get; set; }
        public long fk_provincia { get; set; }
        public long fk_banco { get; set; }
        public string cbu { get; set; }
        public System.DateTime fechaNacimiento { get; set; }
        public bool activo { get; set; }
    }
}
