USE citizenConnect
GO
CREATE OR ALTER PROCEDURE AddView
    @ViewID VARCHAR(255),
    @UserID VARCHAR(255),
    @Title NVARCHAR(255),
    @Description NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Views (ViewID,UserID, Title, Description)
    VALUES (@ViewID,@UserID, @Title, @Description)
END
GO