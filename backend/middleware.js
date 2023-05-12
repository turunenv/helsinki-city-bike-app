const errorHandler = (err, req, res, next) => {
  console.log(`error: ${err.message}`);
  const status = err.status || 400;

  const message = 'Oops! Looks like something went wrong:';

  res.status(status).json({ error: message });
};

const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export { errorHandler, requestLogger };
