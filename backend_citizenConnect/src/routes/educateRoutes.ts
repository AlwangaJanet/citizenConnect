import { Router } from 'express';
import { addPDF, deletePDF, getPDFs, getPDF } from '../controllers/educateControllers';
import { isOfficial, isCitizen, verifyToken } from '../middlewares/authMiddle';

const educateRouter = Router()

educateRouter.post('/', verifyToken, isOfficial, addPDF)
educateRouter.delete('/:id', verifyToken, isOfficial, deletePDF)
educateRouter.get('/', verifyToken, isCitizen, getPDFs)
educateRouter.get('/:id', verifyToken, isCitizen, getPDF)

export default educateRouter