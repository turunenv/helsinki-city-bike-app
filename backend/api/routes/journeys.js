import { Router } from 'express';
import * as journeyService from '../services/journeyService.js';

const journeyRouter = Router();

journeyRouter.get('/', async (req, res, next) => {
  console.log(req.url);

  try {
    const journeys = await journeyService.getJourneyBatch(1, 1000);
    res.set('Access-Control-Allow-Origin', '*');
    res.json(journeys);
  } catch (error) {
    next(error);
  }
})

export { journeyRouter };