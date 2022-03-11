using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cryptoBackend.Models
{
    public class Movimiento
    {
        // Atributos (características)
        private Int64 id;
        private long fk_billeteraMoneda_Origen;
        private long fk_billeteraMoneda_Destino;
        private float cantidad_Origen;
        private float cantidad_Destino;
        private DateTime fecha;
        private long fk_tipoMovimiento;

        // Propiedades Getters y Setters
        public Int64 Id { get => id; set => id = value; }
        public long Fk_billeteraMoneda_Origen { get => fk_billeteraMoneda_Origen; set => fk_billeteraMoneda_Origen = value; }
        public long Fk_billeteraMoneda_Destino { get => fk_billeteraMoneda_Destino; set => fk_billeteraMoneda_Destino = value; }
        public float Cantidad_Origen { get => cantidad_Origen; set => cantidad_Origen = value; }
        public float Cantidad_Destino { get => cantidad_Destino; set => cantidad_Destino = value; }
        public DateTime Fecha { get => fecha; set => fecha = value; }
        public long Fk_tipoMovimiento { get => fk_tipoMovimiento; set => fk_tipoMovimiento = value; }


        public Movimiento(long id, long fk_billeteraMoneda_Origen, long fk_billeteraMoneda_Destino, float cantidad_Origen, float cantidad_Destino, DateTime fecha, long fk_tipoMovimiento)
        {
            this.id = id;
            this.fk_billeteraMoneda_Origen = fk_billeteraMoneda_Origen;
            this.fk_billeteraMoneda_Destino = fk_billeteraMoneda_Destino;
            this.cantidad_Origen = cantidad_Origen;
            this.cantidad_Destino = cantidad_Destino;
            this.fecha = fecha;
            this.fk_tipoMovimiento = fk_tipoMovimiento;
        }
    }
}