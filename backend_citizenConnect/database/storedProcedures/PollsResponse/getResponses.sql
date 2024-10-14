USE citizenConnect
GO
CREATE OR ALTER  PROCEDURE GetAllPollResponses
    @PollID VARCHAR(255)
AS
BEGIN
    SELECT * FROM PollResponses WHERE PollID = @PollID
END
GO