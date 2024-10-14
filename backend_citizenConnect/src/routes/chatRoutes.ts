import { Router } from 'express';
import { chatWithPDF } from '../controllers/chatController';
import { verifyToken, isCitizen } from '../middlewares/authMiddle';

const chatrouter = Router();

chatrouter.post('/chat/:id', verifyToken, isCitizen, chatWithPDF);

export default chatrouter;