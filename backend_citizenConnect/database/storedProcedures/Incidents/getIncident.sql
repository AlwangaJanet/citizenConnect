USE citizenConnect
GO
CREATE OR ALTER PROCEDURE GetIncidentByID
    @IncidentID VARCHAR(255)
AS
BEGIN
    SELECT * FROM Incidents WHERE IncidentID = @IncidentID
END
GO