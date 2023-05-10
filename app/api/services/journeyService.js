import { Journey } from '../models/journeyModel.js';

const journeys = await Journey.findAll({ limit: 5 });
console.log(journeys);
