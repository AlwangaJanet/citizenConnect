USE citizenConnect
GO
CREATE OR ALTER PROCEDURE GetPDFByID
    @PDFID VARCHAR(255)
AS
BEGIN
    SELECT * FROM PDFs WHERE PDFID = @PDFID
END
GO