USE citizenConnect
GO
CREATE OR ALTER PROCEDURE AddUser
  @UserID VARCHAR(255),
    @Name NVARCHAR(100),
    @Email NVARCHAR(100),
    @PasswordHash NVARCHAR(255),
    @Role NVARCHAR(20),
    @IsApproved BIT,
    @IsDeleted BIT
AS
BEGIN
    INSERT INTO Users (UserID, Name, Email, PasswordHash, Role, IsApproved, IsDeleted, CreatedAt)
    VALUES (@UserID, @Name, @Email, @PasswordHash, @Role, @IsApproved, @IsDeleted, GETDATE())
END