import sequelize from '../../database/database.js';
import { DataTypes } from 'sequelize';
import { Station } from './stationModel.js';

const Journey = sequelize.define(
  'Journey',
  {
    journeyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    departure: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrival: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    departureStationId: {
      type: DataTypes.DATE,
      allowNull: false,
      references: {
        model: Station,
        key: 'stationId',
      },
    },
    arrivalStationId: {
      type: DataTypes.DATE,
      allowNull: false,
      references: {
        model: Station,
        key: 'stationId',
      },
    },
    travelDist: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'journey',
    underscored: true,
    timestamps: false,
  }
);

Journey.belongsTo(Station, {
  as: 'departureStation',
  foreignKey: 'departureStationId',
});

Journey.belongsTo(Station, {
  as: 'arrivalStation',
  foreignKey: 'arrivalStationId',
});

Journey.removeAttribute('id');

export { Journey };
