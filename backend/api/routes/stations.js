import { Router } from 'express';
import * as stationController from '../controllers/stationController.js';
import { Journey } from '../models/journeyModel.js';
import { stationPostValidator } from '../validators.js';
import { matchedData, validationResult } from 'express-validator';

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

stationRouter.post('/', stationPostValidator, async (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    const validatedStation = matchedData(req);

    try {
      const newStation = await stationController.createStation(
        validatedStation
      );

      res.json(newStation);
    } catch (error) {
      next(error);
    }
  } else {
    res.json({ errors: result.array() });
  }
});

export { stationRouter };
