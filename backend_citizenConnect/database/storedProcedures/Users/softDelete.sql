USE citizenConnect
GO
CREATE OR ALTER PROCEDURE SoftDeleteUser
    @UserID VARCHAR(255)
AS
BEGIN
    UPDATE Users SET IsDeleted = 1 WHERE UserID = @UserID
END
GO