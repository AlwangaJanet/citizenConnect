USE citizenConnect;
GO

CREATE OR ALTER PROCEDURE GetUserByEmail
    @Email NVARCHAR(100)
AS
BEGIN
    SELECT * FROM Users WHERE Email = @Email AND IsDeleted = 0;
END
GO
