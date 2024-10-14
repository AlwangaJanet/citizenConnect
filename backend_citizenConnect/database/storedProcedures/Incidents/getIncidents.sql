USE citizenConnect
GO
CREATE PROCEDURE GetAllIncidents
AS
BEGIN
    SELECT * FROM Incidents
END
GO