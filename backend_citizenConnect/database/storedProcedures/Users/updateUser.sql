USE citizenConnect
GO
CREATE PROCEDURE UpdateUser
    @UserID VARCHAR(255),
    @Name NVARCHAR(100),
    @Email NVARCHAR(100),
    @PasswordHash NVARCHAR(255),
    @Role NVARCHAR(20),
    @IsApproved BIT
AS
BEGIN
    UPDATE Users
    SET Name = @Name, Email = @Email, PasswordHash = @PasswordHash, Role = @Role, IsApproved = @IsApproved
    WHERE UserID = @UserID;
END;
GO