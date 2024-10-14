USE citizenConnect
GO
CREATE OR ALTER PROCEDURE AddIncident
@IncidentID VARCHAR(255),
    @UserID VARCHAR(255),
    @Title NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @MediaUrl NVARCHAR(255)
AS
BEGIN
    INSERT INTO Incidents (IncidentID,UserID, Title, Description, MediaUrl)
    VALUES (@IncidentID,@UserID, @Title, @Description, @MediaUrl)
END
GO