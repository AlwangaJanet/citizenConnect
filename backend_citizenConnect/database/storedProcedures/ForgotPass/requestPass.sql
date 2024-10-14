USE citizenConnect
GO

CREATE OR ALTER PROCEDURE RequestPasswordReset
    @Email NVARCHAR(100)
AS
BEGIN
    DECLARE @UserID INT;

    SELECT @UserID = UserID FROM Users WHERE Email = @Email AND IsDeleted = 0;

    IF @UserID IS NOT NULL
    BEGIN
        -- Return the UserID
        SELECT @UserID AS UserID;

        PRINT 'User found';
    END
    ELSE
    BEGIN
        PRINT 'User not found or deleted';
    END
END
