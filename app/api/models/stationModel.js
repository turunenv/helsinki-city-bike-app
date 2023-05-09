import sequelize from '../../database/database.js';
import { DataTypes } from 'sequelize';

const Station = sequelize.define(
  'Station',
  {
    stationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nameFi: {
      type: DataTypes.STRING,
    },
    nameSwe: {
      type: DataTypes.STRING,
    },
    nameEng: {
      type: DataTypes.STRING,
    },
    addressFi: {
      type: DataTypes.STRING,
    },
    addressSwe: {
      type: DataTypes.STRING,
    },
    cityFi: {
      type: DataTypes.STRING,
    },
    citySwe: {
      type: DataTypes.STRING,
    },
    operator: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: 'bike_station',
    underscored: true,
    timestamps: false,
  }
);

Station.removeAttribute('id');

export default Station;
