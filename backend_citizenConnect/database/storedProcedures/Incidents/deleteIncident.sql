USE citizenConnect
GO
CREATE OR ALTER  PROCEDURE DeleteIncident
    @IncidentID VARCHAR(255)
AS
BEGIN
    DELETE FROM Incidents WHERE IncidentID = @IncidentID
END
GO