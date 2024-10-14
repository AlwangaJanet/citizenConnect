import { Router } from 'express';
import { addPoll, deletePoll, getPollByID, getAllPolls, addPollResponse, getAllPollResponses } from '../controllers/pollControllers';
import { verifyToken, isOfficial, isCitizen, isAdmin } from '../middlewares/authMiddle';

const pollRouter = Router();

pollRouter.post('/', verifyToken, isOfficial,addPoll);
pollRouter.delete('/:id',verifyToken, isOfficial,deletePoll);
pollRouter.get('/:id', getPollByID);
pollRouter.get('/', getAllPolls);
pollRouter.post('/pollResponses',verifyToken, isCitizen, addPollResponse);
pollRouter.get('/pollResponses/:pollId',verifyToken, isOfficial, getAllPollResponses);

export default pollRouter;
