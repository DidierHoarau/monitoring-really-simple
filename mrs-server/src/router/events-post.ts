import { NextFunction, Request, Response, Router } from 'express';
import { MonitoringEvent } from '../models/monitoring-event';
import { EventsDb } from '../utils/events-db';
import { ExpressWrapper } from './utils/express-wrapper';
import { Logger } from '../utils/logger';

export const eventsPostRouter = ExpressWrapper.createRouter();

eventsPostRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let errorCode = 500;
  await Promise.resolve()
    .then(async () => {
      if (!req.body.content) {
        errorCode = 403;
        throw 'Missing: content';
      }
      if (!req.body.origin) {
        errorCode = 403;
        throw 'Missing: origin';
      }
      const event = new MonitoringEvent(req.body);
      await EventsDb.addEvent(event);
      res.status(201).send({});
    })
    .catch(error => {
      Logger.warn(error);
      res.status(errorCode).send({ error: error.message });
    });
  next();
});
