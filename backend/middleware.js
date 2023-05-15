import logger from './utils/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error(`error: ${err.message}`);
  const status = err.status || 400;

  const message = `Oops! Looks like something went wrong: ${err.message}`;

  res.status(status).json({ error: message });
};

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

export { errorHandler, requestLogger };
