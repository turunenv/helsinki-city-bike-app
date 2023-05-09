import express from 'express';

import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

import { stationRouter } from './api/routes/stations.js';

import { errorHandler, requestLogger } from './middleware.js';
import { error } from 'console';

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

app.use(express.static(config.dir.public));

app.set('view engine', 'ejs');
app.set('views', config.dir.views);

//log requests
app.use(requestLogger);

//base route
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/stations', stationRouter);

//handle requests to non-existent paths
app.use((req, res) => {
  const title = 'This page does not exist';
  res.render('error', { title, message: req.url });
});

//handle other errors
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`app running on port ${config.port}`);
});
