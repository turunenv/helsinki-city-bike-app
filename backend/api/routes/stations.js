import { Router } from 'express';
import * as stationController from '../controllers/stationController.js';
import { Journey } from '../models/journeyModel.js';

const stationRouter = Router();

stationRouter.get('/', async (req, res, next) => {
  try {
    const stations = await stationController.getAllStations();

    res.json(stations);
  } catch (error) {
    next(error);
  }
});

stationRouter.get('/:stationId', async (req, res, next) => {
  const id = req.params.stationId;

  try {
    let station = await stationController.getStationById(id);
    if (!station) {
      throw new Error(`Station with id ${id} does not exist!`);
    }
    const stationAsDepartureCount = await Journey.count({
      where: {
        departureStationId: id,
      },
    });
    const stationAsArrivalCount = await Journey.count({
      where: {
        arrivalStationId: id,
      },
    });

    station = station.toJSON();

    station.asDepartureCount = stationAsDepartureCount;
    station.asArrivalCount = stationAsArrivalCount;

    res.json(station);
  } catch (error) {
    next(error);
  }
});

stationRouter.post('/');

export { stationRouter };
