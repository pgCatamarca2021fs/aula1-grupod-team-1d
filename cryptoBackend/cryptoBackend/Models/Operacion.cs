using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cryptoBackend.Models
{
    public class Operacion
    {
        private Int64 fkUsuario;
        private int tipoMovimiento;
        private Int64 fkMoneda;
        private decimal cantidad;
        private bool destino;

        public Int64 FkUsuario { get => fkUsuario; set => fkUsuario = value; }
        public int TipoMovimiento { get => tipoMovimiento; set => tipoMovimiento = value; }
        public Int64 FkMoneda { get => fkMoneda; set => fkMoneda = value; }
        public decimal Cantidad { get => cantidad; set => cantidad = value; }
        public bool Destino { get => destino; set => destino = value; }
    }
}