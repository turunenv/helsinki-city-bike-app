const errorHandler = (err, req, res, next) => {
  console.log(`error: ${err.message}`);
  const status = err.status || 400;

  const title = 'Oops! Looks like something went wrong:';

  res.status(400).render('error', { title, message: err.message });
}

export { errorHandler }