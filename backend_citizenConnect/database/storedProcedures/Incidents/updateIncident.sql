USE citizenConnect
GO
CREATE OR ALTER  PROCEDURE UpdateIncident
    @IncidentID VARCHAR(255),
    @Title NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @MediaUrl NVARCHAR(255)
AS
BEGIN
    UPDATE Incidents
    SET Title = @Title, Description = @Description, MediaUrl = @MediaUrl
    WHERE IncidentID = @IncidentID
END
GO