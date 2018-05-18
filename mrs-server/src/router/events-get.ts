import { NextFunction, Request, Response, Router } from 'express';
import { ExpressWrapper } from './utils/express-wrapper';
import { EventsDb } from '../utils/events-db';
import { Logger } from '../utils/logger';

export const eventsGetRouter = ExpressWrapper.createRouter();

eventsGetRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await EventsDb.getEvents(100)
    .then(events => {
      res.status(200).send({ events, limit: 100 });
    })
    .catch(error => {
      Logger.error(error);
      res.status(500).send({ error: 'Unexpected error' });
    });
  next();
});
