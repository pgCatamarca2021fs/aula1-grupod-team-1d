using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace cryptoBackend.Models
{
    public class GestorUsuario
    {
        string connectionString = ConfigurationManager.ConnectionStrings["CriptomarcaDB"].ToString();

        public List<Usuario> ListarUsuarios()
        {
            List<Usuario> lista = new List<Usuario>();

            using (SqlConnection connection = new SqlConnection(this.connectionString))
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = "listarUsuarios";
                command.CommandType = CommandType.StoredProcedure;

                SqlDataAdapter da = new SqlDataAdapter(command);
                DataTable dt = new DataTable();
                da.Fill(dt);

                lista = dt.AsEnumerable().Select(x => new Usuario
                {
                    Id = Int64.Parse(x["id"].ToString()),
                    Nombre = x["nombre"].ToString(),
                    Email = x["email"].ToString(),
                    Contraseña = x["contraseña"].ToString(),
                    Dni = x["dni"].ToString(),
                    Fk_provincia = Int64.Parse(x["fk_provincia"].ToString()),
                    Fk_banco = Int64.Parse(x["fk_banco"].ToString()),
                    Cbu = x["cbu"].ToString(),
                    FechaNacimiento = DateTime.Parse(x["fechaNacimiento"].ToString())
                }).ToList<Usuario>();
            }

            return lista;
        }

        public void CrearUsuario(Usuario usuario)
        {
            using (SqlConnection connection = new SqlConnection(this.connectionString))
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = "insertarUsuario";
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@nombre", usuario.Nombre));
                command.Parameters.Add(new SqlParameter("@email", usuario.Email));
                command.Parameters.Add(new SqlParameter("@contraseña", usuario.Contraseña));
                command.Parameters.Add(new SqlParameter("@dni", usuario.Dni));
                command.Parameters.Add(new SqlParameter("@fk_provincia", usuario.Fk_provincia));
                command.Parameters.Add(new SqlParameter("@fk_banco", usuario.Fk_banco));
                command.Parameters.Add(new SqlParameter("@cbu", usuario.Cbu));
                command.Parameters.Add(new SqlParameter("@fechaNacimiento", usuario.FechaNacimiento));

                command.ExecuteNonQuery();
            }
        }
    }
}