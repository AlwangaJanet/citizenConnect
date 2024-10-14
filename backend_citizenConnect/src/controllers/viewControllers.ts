import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DbHelper } from '../databaseHelpers';
import { View, ViewCreateModel, ViewUpdateModel } from '../models/viewsModel';

const dbHelper = new DbHelper();

export const addView = async (req: Request, res: Response) => {
  try {
    console.log('Received request body:', req.body);

    const { UserID, Title, Description }: ViewCreateModel = req.body;
    
    if (!UserID || !Title || !Description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Generating viewID');
    const viewID = uid();
    console.log('Generated viewID:', viewID);

    console.log('Executing database operation');
    await dbHelper.exec('AddView', { ViewID: viewID, UserID, Title, Description });
    console.log('Database operation completed');

    res.status(201).json({ message: 'View added successfully', viewID });
  } catch (err) {
    console.error('Error in addView:', err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

export const getViews = async (req: Request, res: Response) => {
  try {
    const views: View[] = await dbHelper.getAll('GetAllViews');
    res.json(views);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getView = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const view: View | null = await dbHelper.get('GetViewByID', { ViewID: req.params.id });
    if (!view) return res.status(404).json({ message: 'View not found' });
    res.json(view);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateView = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { Title, Description }: ViewUpdateModel = req.body;
    await dbHelper.exec('UpdateView', { ViewID: req.params.id, Title, Description });
    res.json({ message: 'View updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteView = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await dbHelper.exec('DeleteView', { ViewID: req.params.id });
    res.json({ message: 'View deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

