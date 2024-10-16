USE citizenConnect
GO
CREATE TABLE Polls (
    PollID VARCHAR(255) PRIMARY KEY,
    OfficialID VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    Question NVARCHAR(255) NOT NULL,
    Option1 NVARCHAR(50) NOT NULL,
    Option2 NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
)
GO

SELECT * FROM Polls