import { Station } from '../models/stationModel.js';

const getAllStations = async () => {
  const stations = await Station.findAll({ order: [['nameFi']] });
  return stations;
};

const getStationById = async (id) => {
  const station = await Station.findOne({ where: { stationId: id } });
  return station;
};

const createStation = async (station) => {
  const createdStation = await Station.create(station);
  return createdStation;
};

export { getAllStations, getStationById, createStation };
