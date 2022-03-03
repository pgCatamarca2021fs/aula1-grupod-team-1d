using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cryptoBackend.Models
{
    public class Usuario
    {
        // Atributos (características)
        private Int64 id;
        private string nombre;
        private string email;
        private string password;
        private string dni;
        private long fk_provincia;
        private long fk_banco;
        private string cbu;
        private DateTime fechaNacimiento;
        private bool activo;

        // Propiedades Getters y Setters
        public Int64 Id { get => id; set => id = value; }
        public string Nombre { get => nombre; set => nombre = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string Dni { get => dni; set => dni = value; }
        public long Fk_provincia { get => fk_provincia; set => fk_provincia = value; }
        public long Fk_banco { get => fk_banco; set => fk_banco = value; }
        public string Cbu { get => cbu; set => cbu = value; }
        public DateTime FechaNacimiento { get => fechaNacimiento; set => fechaNacimiento = value; }
        public bool Activo { get => activo; set => activo = value; }

        // Constructores 
        public Usuario(string nombre, string email, string password, string dni, long fk_provincia, long fk_banco, string cbu, DateTime fechaNacimiento)
        {
            this.nombre = nombre;
            this.email = email;
            this.password = password;
            this.dni = dni;
            this.fk_provincia = fk_provincia;
            this.fk_banco = fk_banco;
            this.cbu = cbu;
            this.fechaNacimiento = fechaNacimiento;
            this.activo = true;
        }

        public Usuario()
        {
        }

        // Función de ejemplo
        public void Saludar ()
        {

        }
    }
}