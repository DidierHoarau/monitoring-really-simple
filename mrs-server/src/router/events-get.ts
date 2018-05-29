import { NextFunction, Request, Response, Router } from 'express';
import { EventsDb } from '../utils/events-db';
import { Logger } from '../utils/logger';
import { ExpressWrapper } from './utils/express-wrapper';

export const eventsGetRouter = ExpressWrapper.createRouter();

eventsGetRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await EventsDb.getEvents()
    .then(events => {
      res.status(200).send({ events });
    })
    .catch(error => {
      Logger.error(error);
      res.status(500).send({ error: 'Unexpected error' });
    });
  next();
});
