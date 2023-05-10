import { Station } from '../models/stationModel.js';

const getAllStations = async () => {
  const stations = await Station.findAll();
  return stations;
};

export { getAllStations };
