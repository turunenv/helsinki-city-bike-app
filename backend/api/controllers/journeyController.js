import { Journey } from '../models/journeyModel.js';
import { Station } from '../models/stationModel.js';

const getJourneyBatch = async (offset, limit, orderBy, desc) => {
  let queryOptions = {
    limit,
    offset,
    include: [
      {
        model: Station,
        as: 'departureStation',
        attributes: ['stationId', 'nameFi'],
      },
      {
        model: Station,
        as: 'arrivalStation',
        attributes: ['stationId', 'nameFi'],
      },
    ],
  };

  if (orderBy) {
    let order;
    if (desc) {
      order = [[orderBy, 'DESC']];
    } else {
      order = [[orderBy]];
    }

    queryOptions.order = order;
  }

  const journeys = Journey.findAll(queryOptions);

  return journeys;
};

const createJourney = async (journey) => {
  const newJourney = await Journey.create(journey);
  await newJourney.reload();
  return newJourney;
};

export { getJourneyBatch, createJourney };
