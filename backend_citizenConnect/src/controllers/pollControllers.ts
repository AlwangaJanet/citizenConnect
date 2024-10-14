import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DbHelper } from '../databaseHelpers';
import { PollCreateModel, PollResponseCreateModel } from '../models/pollModels';

const dbHelper = new DbHelper();

export const addPoll = async (req: Request, res: Response) => {
    try {
        const { OfficialID, Question, Option1, Option2 }: PollCreateModel = req.body;
        const PollID = uid();

        await dbHelper.exec('AddPoll', { PollID, OfficialID, Question, Option1, Option2 });
        res.status(201).json({ message: 'Poll added successfully', PollID });
    } catch (err) {
        console.error('Add Poll Error:', err);
        res.status(500).json({ error: err });
    }
};

export const deletePoll = async (req: Request<{ id: string }>, res: Response) => {
    try {
        await dbHelper.exec('DeletePoll', { PollID: req.params.id });
        res.json({ message: 'Poll deleted successfully' });
    } catch (err) {
        console.error('Delete Poll Error:', err);
        res.status(500).json({ error: err });
    }
};

export const getPollByID = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const poll = await dbHelper.get('GetPollByID', { PollID: req.params.id });
        if (!poll) return res.status(404).json({ message: 'Poll not found' });
        res.json(poll);
    } catch (err) {
        console.error('Get Poll Error:', err);
        res.status(500).json({ error: err });
    }
};

export const getAllPolls = async (req: Request, res: Response) => {
    try {
        const polls = await dbHelper.getAll('GetAllPolls');
        res.json(polls);
    } catch (err) {
        console.error('Get All Polls Error:', err);
        res.status(500).json({ error: err });
    }
};

export const addPollResponse = async (req: Request, res: Response) => {
    try {
        const { PollID, UserID, SelectedOption }: PollResponseCreateModel = req.body;
        const ResponseID = uid();

        await dbHelper.exec('AddPollResponse', { ResponseID, PollID, UserID, SelectedOption });
        res.status(201).json({ message: 'Poll response added successfully', ResponseID });
    } catch (err) {
        console.error('Add Poll Response Error:', err);
        res.status(500).json({ error: err });
    }
};

export const getAllPollResponses = async (req: Request<{ pollId: string }>, res: Response) => {
    try {
        const responses = await dbHelper.query('SELECT * FROM PollResponses WHERE PollID = @PollID', { PollID: req.params.pollId });
        res.json(responses);
    } catch (err) {
        console.error('Get All Poll Responses Error:', err);
        res.status(500).json({ error: err });
    }
};

