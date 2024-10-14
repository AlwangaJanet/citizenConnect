USE citizenConnect
GO
CREATE OR ALTER PROCEDURE ResetPassword
    @UserID VARCHAR(255),
    @NewPasswordHash NVARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET PasswordHash = @NewPasswordHash
    WHERE UserID = @UserID
END
GO