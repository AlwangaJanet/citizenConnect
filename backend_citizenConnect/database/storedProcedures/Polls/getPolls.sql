USE citizenConnect
GO
CREATE OR ALTER PROCEDURE GetAllPolls
AS
BEGIN
    SELECT * FROM Polls
END
GO