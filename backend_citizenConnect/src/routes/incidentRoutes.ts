// incidentRoutes.ts
import { Router } from 'express';
import { addIncident, getIncidents, getIncident, updateIncident, deleteIncident } from '../controllers/incidentsControllers'
import { verifyToken, isCitizen, isOfficial } from '../middlewares/authMiddle';

const citizenrouter = Router()

// Citizen routes
citizenrouter.post('/', verifyToken, isCitizen, addIncident)
citizenrouter.get('/',  getIncidents)
citizenrouter.get('/:id', getIncident)
citizenrouter.put('/:id', updateIncident)

// Official routes
citizenrouter.delete('/:id', deleteIncident)
citizenrouter.put('/:id', updateIncident)

export default citizenrouter