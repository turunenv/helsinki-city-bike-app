import { Router } from 'express';

const stationRouter = Router();

stationRouter.get('/', (req, res) => {
  res.render('stations', { stations })
})

export { stationRouter };

