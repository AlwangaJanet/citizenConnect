USE citizenConnect
GO
CREATE OR ALTER PROCEDURE AddPollResponse
    @ResponseID VARCHAR(255),
    @PollID VARCHAR(255),
    @UserID VARCHAR (255),
    @SelectedOption NVARCHAR(50)
AS
BEGIN
    INSERT INTO PollResponses (ResponseID,PollID, UserID, SelectedOption)
    VALUES (@ResponseID,@PollID, @UserID, @SelectedOption)
END
GO