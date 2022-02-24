using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cryptoBackend.Models
{
    public class Usuario
    {
        // Atributos (características)
        private long id;
        private string nombre;
        private string email;
        private string contraseña;
        private string dni;
        private long fk_provincia;
        private long fk_banco;
        private string cbu;
        private DateTime fechaNacimiento;

        // Propiedades Getters y Setters
        public long Id { get => id; set => id = value; }
        public string Nombre { get => nombre; set => nombre = value; }
        public string Email { get => email; set => email = value; }
        public string Contraseña { get => contraseña; set => contraseña = value; }
        public string Dni { get => dni; set => dni = value; }
        public long Fk_provincia { get => fk_provincia; set => fk_provincia = value; }
        public long Fk_banco { get => fk_banco; set => fk_banco = value; }
        public string Cbu { get => cbu; set => cbu = value; }
        public DateTime FechaNacimiento { get => fechaNacimiento; set => fechaNacimiento = value; }

        // Constructores 
        public Usuario(long id, string nombre, string email, string contraseña, string dni, long fk_provincia, long fk_banco, string cbu, DateTime fechaNacimiento)
        {
            this.id = id;
            this.nombre = nombre;
            this.email = email;
            this.contraseña = contraseña;
            this.dni = dni;
            this.fk_provincia = fk_provincia;
            this.fk_banco = fk_banco;
            this.cbu = cbu;
            this.fechaNacimiento = fechaNacimiento;
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