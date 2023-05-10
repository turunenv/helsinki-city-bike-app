import { Router } from 'express';

const journeyRouter = Router();

journeyRouter.get('/', (req, res, next) => {
  console.log(req.query);

  res.send('moi');
})

export { journeyRouter };