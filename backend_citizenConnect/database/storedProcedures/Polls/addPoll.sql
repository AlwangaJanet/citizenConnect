USE citizenConnect
GO
CREATE OR ALTER PROCEDURE AddPoll
    @PollID VARCHAR(255),
    @OfficialID VARCHAR(255),
    @Question NVARCHAR(255),
    @Option1 NVARCHAR(50),
    @Option2 NVARCHAR(50)
AS
BEGIN
    INSERT INTO Polls (PollID,OfficialID, Question, Option1, Option2)
    VALUES (@PollID,@OfficialID, @Question, @Option1, @Option2)
END
GO