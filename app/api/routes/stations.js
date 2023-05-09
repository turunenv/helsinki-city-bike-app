import { Router } from 'express';
import * as stationService from '../services/stationService.js';

const stationRouter = Router();

stationRouter.get('/', async (req, res, next) => {
  try {
    const stations = await stationService.getAllStations();
    res.render('stations', { stations });
  } catch (error) {
    next(error);
  }
});

export { stationRouter };
