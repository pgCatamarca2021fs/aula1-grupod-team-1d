SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Método de insertar un Usuario
-- =============================================
CREATE PROCEDURE insertarUsuario 
	-- Add the parameters for the stored procedure here
	@nombre varchar(50),
	@email varchar(50),
	@contraseña varchar(25),
	@dni varchar(12),
	@fk_provincia bigint,
	@fk_banco bigint,
	@cbu varchar(20),
	@fechaNacimiento dateTime,
	@activo bit
AS
BEGIN
	INSERT INTO [dbo].[usuarios]
           ([nombre]
           ,[email]
           ,[contraseña]
           ,[dni]
           ,[fk_provincia]
           ,[fk_banco]
           ,[cbu]
           ,[fechaNacimiento],
	   ,[activo])
     VALUES
           (
			   @nombre,
			   @email,
			   @contraseña,
			   @dni,
			   @fk_provincia,
			   @fk_banco,
			   @cbu,
			   @fechaNacimiento,
			   @activo
           )
END
GO
