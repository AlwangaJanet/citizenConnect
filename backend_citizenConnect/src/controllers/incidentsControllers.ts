import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DbHelper } from '../databaseHelpers';
import { Incident, IncidentCreateModel, IncidentUpdateModel } from '../models/incidentModel';

const dbHelper = new DbHelper();

export const addIncident = async (req: Request, res: Response) => {
  try {
    const { UserID, Title, Description, MediaUrl }: IncidentCreateModel = req.body
    const incidentID = uid()

    await dbHelper.exec('AddIncident', { IncidentID: incidentID, UserID, Title, Description, MediaUrl })
    res.status(201).json({ message: 'Incident added successfully', incidentID })
  } catch (err) {
    console.error('Add Incident Error:', err)
    res.status(500).json({ error: err })
  }
}

export const getIncidents = async (req: Request, res: Response) => {
  try {
    const incidents: Incident[] = await dbHelper.getAll('GetAllIncidents')
    res.json(incidents)
  } catch (err) {
    console.error('Get Incidents Error:', err)
    res.status(500).json({ error: err })
  }
}

export const getIncident = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const incident: Incident | null = await dbHelper.get('GetIncidentByID', { IncidentID: req.params.id })
    if (!incident) return res.status(404).json({ message: 'Incident not found' })
    res.json(incident)
  } catch (err) {
    console.error('Get Incident Error:', err)
    res.status(500).json({ error: err })
  }
}

export const updateIncident = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { Title, Description, MediaUrl }: IncidentUpdateModel = req.body;
    await dbHelper.exec('UpdateIncident', { IncidentID: req.params.id, Title, Description, MediaUrl })
    res.json({ message: 'Incident updated successfully' })
  } catch (err) {
    console.error('Update Incident Error:', err)
    res.status(500).json({ error: err })
  }
};

export const deleteIncident = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await dbHelper.exec('DeleteIncident', { IncidentID: req.params.id });
    res.json({ message: 'Incident deleted successfully' });
  } catch (err) {
    console.error('Delete Incident Error:', err);
    res.status(500).json({ error: err });
  }
};
