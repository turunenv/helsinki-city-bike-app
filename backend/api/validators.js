import { body } from 'express-validator';

const stationPostValidator = [
  body('stationId')
  .notEmpty().withMessage('stationId field is required')
  .isInt().withMessage('stationId should be an integer'),

  body('nameFi')
  .notEmpty().withMessage('nameFi field is required')
  .isLength({ min: 3 }).withMessage('nameFi should be at least 3 characters'),
  
  body('nameSwe')
  .optional()
  .isLength({ min: 3 }).withMessage('nameSwe should be at least 3 characters'),

  body('nameEng')
  .optional()
  .isLength({ min: 3 }).withMessage('nameEng should be at least 3 characters'),

  body('addressFi')
  .notEmpty().withMessage('addressFi field is required')
  .isLength({ min: 5 }).withMessage('addressFi should be at least 5 characters'),

  body('addressSwe')
  .optional()
  .isLength({ min: 3 }).withMessage('addressSwe should be at least 5 characters'),

  body('cityFi')
  .notEmpty().withMessage('cityFi field is required')
  .isLength({ min: 3 }).withMessage('cityFi should be at least 3 characters'),

  body('citySwe')
  .optional()
  .isLength({ min: 3 }).withMessage('citySwe should be at least 3 characters'),

  body('operator')
  .optional()
  .isLength({ min: 3 }).withMessage('operator should be at least 2 characters'),

  body('capacity')
  .optional()
  .isInt().withMessage('capacity should be an integer'),

  body('longitude')
  .optional()
  .isFloat().withMessage('longitude should be a float'),

  body('latitude')
  .optional()
  .isFloat().withMessage('latitude should be a float'), 
];

const journeyPostValidator = [
  body('departure')
  .notEmpty().withMessage('departure is required')
  .isISO8601().withMessage('departure should be a valid ISO 8601 datetime'),

  body('arrival')
  .notEmpty().withMessage('arrival is required')
  .isISO8601().withMessage('arrival should be a date')
  .custom((value, { req }) => {
    const departure = new Date(req.body.departure);
    const arrival = new Date(value);

    const timeDiff = arrival.getTime() - departure.getTime()
    if (timeDiff < 10000) {
      throw new Error('duration was less than 10 seconds');
    }

    return true;
  }),

  body('departureStationId')
  .notEmpty().withMessage('departureStationId is required')
  .isInt().withMessage('departureStationId should be an integer'),

  body('arrivalStationId')
  .notEmpty().withMessage('arrivalStationId is required')
  .isInt().withMessage('arrivalStationId should be an integer'),

  body('travelDist')
  .notEmpty().withMessage('travelDist is required')
  .isInt({ min: 10 }).withMessage('travelDist should be an integer, at least 10'),

  body('duration')
  .not().exists()
  .withMessage('duration is calculated on the server'),
];

export { stationPostValidator, journeyPostValidator };
