using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace cryptoBackend.Models
{
    public class GestorMovimiento
    {
        string connectionString = ConfigurationManager.ConnectionStrings["cryptomarcaEntities"].ToString();

        public List<Movimiento> ListarMovimientosDeUsuario(long fk_usuario)
        {
            List<Movimiento> lista = new List<Movimiento>();

            using (SqlConnection connection = new SqlConnection(this.connectionString))
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = "listarMovimientosDeUsuario";
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@fk_usuario", fk_usuario));

                SqlDataAdapter da = new SqlDataAdapter(command);
                DataTable dt = new DataTable();
                da.Fill(dt);

                lista = dt.AsEnumerable().Select(x => new Movimiento
                {
                    Id = Int64.Parse(x["id"].ToString()),
                    Fk_billeteraMoneda_Origen = Int64.Parse(x["fk_billeteraMoneda_Origen"].ToString()),
                    Fk_billeteraMoneda_Destino = Int64.Parse(x["fk_billeteraMoneda_Destino"].ToString()),
                    Cantidad_Origen = float.Parse(x["cantidad_Origen"].ToString()),
                    Cantidad_Destino = float.Parse(x["cantidad_Destino"].ToString()),
                    Fecha = DateTime.Parse(x["fecha"].ToString()),
                    Fk_tipoMovimiento = Int64.Parse(x["fk_tipoMovimiento"].ToString()),

                }).ToList<Movimiento>();
            }

            return lista;
        }

        public void CrearMovimiento(Movimiento movimiento)
        {
            using (SqlConnection connection = new SqlConnection(this.connectionString))
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = "insertarMovimiento";
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@fk_billeteraMoneda_Origen", movimiento.Fk_billeteraMoneda_Origen));
                command.Parameters.Add(new SqlParameter("@fk_billeteraMoneda_Destino", movimiento.Fk_billeteraMoneda_Destino));
                command.Parameters.Add(new SqlParameter("@cantidad_Origen", movimiento.Cantidad_Origen));
                command.Parameters.Add(new SqlParameter("@cantidad_Destino", movimiento.Cantidad_Destino));
                command.Parameters.Add(new SqlParameter("@fecha", movimiento.Fecha));
                command.Parameters.Add(new SqlParameter("@fk_tipoMovimiento", movimiento.Fk_tipoMovimiento));

                command.ExecuteNonQuery();
            }
        }
    }
}