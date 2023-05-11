import { Router } from 'express';
import * as journeyService from '../services/journeyService.js';

const journeyRouter = Router();

journeyRouter.get('/', async (req, res, next) => {
  console.log(req.url);

  const batchSize = 1000;

  let offset = req.query.offset || 0;
  let orderBy = req.query.orderby || null;
  let desc = false;

  const orderOptions = ['departure', 'dist', 'duration'];

  // was the orderBy query parameter valid?
  if (orderBy && !orderOptions.includes(orderBy)) {
    orderBy = null;
  } else if (orderBy === 'dist') {
    orderBy = 'travelDist'
  }

  if (orderBy && req.query.desc === 'true') {
    desc = true;
  }
  
  console.log('orderBy: ', orderBy)
  try {
    const journeys = await journeyService.getJourneyBatch(offset * batchSize, batchSize, orderBy, desc);
    res.set('Access-Control-Allow-Origin', '*');
    res.json(journeys);
  } catch (error) {
    next(error);
  }
})

export { journeyRouter };