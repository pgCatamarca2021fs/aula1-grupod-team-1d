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

                SqlDataReader dataReader = command.ExecuteReader();
                while (dataReader.Read())
                {
                    Usuario usuario = new Usuario();
                    usuario.Id = dataReader.GetSqlInt64(0);
                    usuario.Nombre = dataReader.GetString(1);
                    usuario.Email = dataReader.GetString(2);
                    usuario.Contraseña = dataReader.GetString(3);
                    usuario.Dni = dataReader.GetString(4);
                    usuario.Fk_provincia = dataReader.GetSqlInt64(5);
                    usuario.Fk_banco = dataReader.GetSqlInt64(6);
                    usuario.Cbu = dataReader.GetString(7);
                    usuario.FechaNacimiento = dataReader.GetDateTime(8);

                    lista.Add(usuario);
                }
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