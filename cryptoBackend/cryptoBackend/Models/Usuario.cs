using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cryptoBackend.Models
{
    public class Usuario
    {
        // Atributos (características)
        private int id;
        private string nombre;
        private string email;
        private string contraseña;
        private string dni;
        private int fk_provincia;
        private int fk_banco;
        private string cbu;
        private DateTime fechaNacimiento;

        // Propiedades Getters y Setters
        public int Id { get => id; }
        public string Nombre { get => nombre; set => nombre = value; }
        public string Email { get => email; set => email = value; }
        public string Contraseña { get => contraseña; set => contraseña = value; }
        public string Dni { get => dni; set => dni = value; }
        public int Fk_provincia { get => fk_provincia; set => fk_provincia = value; }
        public int Fk_banco { get => fk_banco; set => fk_banco = value; }
        public string Cbu { get => cbu; set => cbu = value; }
        public DateTime FechaNacimiento { get => fechaNacimiento; set => fechaNacimiento = value; }

        // Constructores 
        public Usuario(int id, string nombre, string email, string contraseña, string dni, int fk_provincia, int fk_banco, string cbu, DateTime fechaNacimiento)
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
            this.id = 1234;
            this.nombre = "Nombre de ejemplo";
            this.email = "ejemplo@correo.com";
            this.contraseña = "contraseña";
            this.dni = "11111111";
            this.fk_provincia = 1;
            this.fk_banco = 1;
            this.cbu = "111/1111111111111111";
            this.fechaNacimiento = DateTime.Today;
        }

        // Función de ejemplo
        public void saludar ()
        {

        }
    }
}