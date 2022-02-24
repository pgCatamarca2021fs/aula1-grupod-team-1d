SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Método de listar Usuarios
-- =============================================
CREATE PROCEDURE listarUsuarios 
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [id],[nombre],[email],[contraseña],[dni],[fk_provincia],[fk_banco],[cbu],[fechaNacimiento] FROM [dbo].[usuarios]
END
GO
