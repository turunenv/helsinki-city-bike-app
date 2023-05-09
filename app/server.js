import express from 'express';

import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

//configuration
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
const config = {
  port: process.env.PORT || 3000,
  dir: {
    root: __dirname,
    public: __dirname + 'static' + sep,
  },
};

const app = express();

app.use(express.static(config.dir.public));

//base route
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(config.port, () => {
  console.log(`app running on port ${config.port}`);
});

