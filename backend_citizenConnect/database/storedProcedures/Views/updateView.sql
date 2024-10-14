USE citizenConnect
GO
CREATE OR ALTER PROCEDURE UpdateView
    @ViewID VARCHAR(255),
    @Title NVARCHAR(255),
    @Description NVARCHAR(MAX)
AS
BEGIN
    UPDATE Views
    SET Title = @Title, Description = @Description
    WHERE ViewID = @ViewID
END
GO