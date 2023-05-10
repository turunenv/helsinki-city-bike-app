import express from 'express';

import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

import { stationRouter } from './api/routes/stations.js';
import { journeyRouter } from './api/routes/journeys.js';

import { errorHandler, requestLogger } from './middleware.js';

//configuration
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
const config = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
    public: __dirname + 'static' + sep,
    views: __dirname + 'views' + sep,
  },
};

const app = express();

//log requests
app.use(requestLogger);

//base route
app.get('/api', (req, res) => {
  res.json({ message: 'welcome!' });
});

app.use('/api/stations', stationRouter);
app.use('/api/journeys', journeyRouter);

//handle requests to non-existent paths
app.use((req, res) => {
  res.status(404).json({ error: 'This page does not exist.' });
});

//handle other errors
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`app running on port ${config.port}`);
});
