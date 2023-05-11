import { Router } from 'express';
import * as stationService from '../services/stationService.js';
import { Journey } from '../models/journeyModel.js';

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

stationRouter.get('/:stationId', async (req, res, next) => {
  const id = Number(req.params.stationId);
  console.log('id is: ', id);
  try {
    let station = await stationService.getStationById(id);
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

    console.log(station);

    res.set('Access-Control-Allow-Origin', '*');
    res.json(station);
  } catch (error) {
    next(error);
  }
});

export { stationRouter };
