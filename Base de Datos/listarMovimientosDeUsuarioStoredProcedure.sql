-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[listarMovimientosDeUsuario]
	-- Add the parameters for the stored procedure here
	@fk_usuario bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select distinct [dbo].[movimientos].[id], [dbo].[movimientos].[fk_billeteraMoneda_Origen], [dbo].[movimientos].[fk_billeteraMoneda_Destino], [dbo].[movimientos].[cantidad_Origen], [dbo].[movimientos].[cantidad_Destino], [dbo].[movimientos].[fecha], [dbo].[movimientos].[fk_tipoMovimiento]
	from [dbo].[movimientos], [dbo].[billeterasMonedas] 
	where ( [dbo].[movimientos].[fk_billeteraMoneda_Destino] = [dbo].[billeterasMonedas].[id] and [dbo].[billeterasMonedas].[fk_usuario] = @fk_usuario )
	or ( [dbo].[movimientos].[fk_billeteraMoneda_Origen] = [dbo].[billeterasMonedas].[id] and [dbo].[billeterasMonedas].[fk_usuario] = @fk_usuario )
	or ( [dbo].[movimientos].[fk_billeteraMoneda_Destino] = [dbo].[billeterasMonedas].[id] and [dbo].[movimientos].[fk_billeteraMoneda_Origen] = [dbo].[billeterasMonedas].[id] and [dbo].[billeterasMonedas].[fk_usuario] = @fk_usuario)

END
GO