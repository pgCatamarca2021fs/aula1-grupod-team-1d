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
    
    public partial class movimientos
    {
        public long id { get; set; }
        public Nullable<long> fk_billeteraMoneda_Origen { get; set; }
        public long fk_billeteraMoneda_Destino { get; set; }
        public Nullable<decimal> cantidad_Origen { get; set; }
        public decimal cantidad_Destino { get; set; }
        public System.DateTime fecha { get; set; }
        public decimal fk_tipoMovimiento { get; set; }
    }
}
