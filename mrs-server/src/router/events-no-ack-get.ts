import { NextFunction, Request, Response, Router } from 'express';
import { EventsNoAck } from '../events/events-no-ack';
import { Logger } from '../utils/logger';
import { ExpressWrapper } from './utils/express-wrapper';

export const eventsNoAckGetRouter = ExpressWrapper.createRouter();

eventsNoAckGetRouter.get('/no-ack', async (req: Request, res: Response, next: NextFunction) => {
  await EventsNoAck.list()
    .then(events => {
      res.status(200).send({ events });
    })
    .catch(error => {
      Logger.error(error);
      res.status(500).send({ error: 'Unexpected error' });
    });
  next();
});
