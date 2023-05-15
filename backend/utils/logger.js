const info = (...params) => {
  if (process.env.NODE_ENV !== 'TEST') {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== 'TEST') {
    console.log(...params);
  }
};

const logger = {
  info,
  error,
};

export default logger;
