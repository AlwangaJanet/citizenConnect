export interface PDF {
    PDFID: string;
    OfficialID: string;
    Title: string;
    PDFUrl: string;
    CreatedAt: Date;
}

export interface PDFCreateModel {
    OfficialID: string;
    Title: string;
    PDFUrl: string;
}

export interface PDFUpdateModel {
    Title: string;
    PDFUrl: string;
}
