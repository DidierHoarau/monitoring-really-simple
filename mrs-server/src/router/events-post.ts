import { NextFunction, Request, Response, Router } from 'express';
import { AuthRequest } from '../auth/auth-request';
import { EventsDb } from '../events/events-db';
import { MonitoringEvent } from '../models/monitoring-event';
import { Logger } from '../utils-std-ts/logger';
import { ExpressWrapper } from './utils/express-wrapper';

const logger = new Logger('router/events-post');

export const eventsPostRouter = ExpressWrapper.createRouter();

eventsPostRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  let errorCode = 500;
  await Promise.resolve()
    .then(async () => {
      if (!AuthRequest.isAuthenticated(req)) {
        errorCode = 403;
        throw new Error('Authentication failed');
      }
      if (!req.body.content) {
        errorCode = 403;
        throw new Error('Missing: content');
      }
      if (!req.body.origin) {
        errorCode = 403;
        throw new Error('Missing: origin');
      }
      const event = new MonitoringEvent(req.body);
      const id = await EventsDb.addEvent(event);
      res.status(201).send({ id });
    })
    .catch(error => {
      logger.warn(error);
      res.status(errorCode).send({ error: error.message });
    });
  next();
});
