import { Journey } from '../models/journeyModel.js';
import { Station } from '../models/stationModel.js';

async function getJourneyBatch(offset, limit) {
  const journeys = Journey.findAll({
    limit,
    include: [
      { 
        model: Station, 
        as: 'departureStation',
        attributes: ['stationId', 'nameFi'] 
      },
      { 
        model: Station, 
        as: 'arrivalStation',
        attributes: ['stationId', 'nameFi'],
      },
    ]
  })

  return journeys;
}

export {
  getJourneyBatch,
}
