import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DbHelper } from '../databaseHelpers';
import { PDF, PDFCreateModel, PDFUpdateModel } from '../models/pdfModel';

const dbHelper = new DbHelper();

export const addPDF = async (req: Request, res: Response) => {
    try {
        const { OfficialID, Title, PDFUrl }: PDFCreateModel = req.body
        const PDFID = uid()

        await dbHelper.exec('AddPDF', { PDFID, OfficialID, Title, PDFUrl })
        res.status(201).json({ message: 'PDF added successfully', PDFID })
    } catch (err) {
        console.error('Add PDF Error:', err)
        res.status(500).json({ error: err })
    }
}

export const getPDFs = async (req: Request, res: Response) => {
    try {
        const PDFs: PDF[] = await dbHelper.getAll('GetAllPDFs')
        res.json(PDFs)
    } catch (err) {
        console.error('Get PDFs Error:', err)
        res.status(500).json({ error: err })
    }
}

export const getPDF = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const PDF: PDF | null = await dbHelper.get('GetPDFByID', { PDFID: req.params.id })
        if (!PDF) return res.status(404).json({ message: 'PDF not found' })
        res.json(PDF)
    } catch (err) {
        console.error('Get PDF Error:', err)
        res.status(500).json({ error: err })
    }
}

export const updatePDF = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { Title, PDFUrl }: PDFUpdateModel = req.body;
        await dbHelper.exec('UpdatePDF', { PDFID: req.params.id, Title, PDFUrl })
        res.json({ message: 'PDF updated successfully' })
    } catch (err) {
        console.error('Update PDF Error:', err)
        res.status(500).json({ error: err })
    }
}

export const deletePDF = async (req: Request<{ id: string }>, res: Response) => {
    try {
        await dbHelper.exec('DeletePDF', { PDFID: req.params.id })
        res.json({ message: 'PDF deleted successfully' });
    } catch (err) {
        console.error('Delete PDF Error:', err)
        res.status(500).json({ error: err })
    }
}
