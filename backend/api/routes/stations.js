import { Router } from 'express';
import * as stationService from '../services/stationService.js';

const stationRouter = Router();

stationRouter.get('/', async (req, res, next) => {
  try {
    const stations = await stationService.getAllStations();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(stations);
  } catch (error) {
    next(error);
  }
});

export { stationRouter };
