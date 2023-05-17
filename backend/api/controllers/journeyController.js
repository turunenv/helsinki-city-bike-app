import { Journey } from '../models/journeyModel.js';
import { Station } from '../models/stationModel.js';

async function getJourneyBatch(offset, limit, orderBy, desc) {
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
}

export { getJourneyBatch };
