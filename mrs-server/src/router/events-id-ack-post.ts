import { NextFunction, Request, Response, Router } from 'express';
import { AuthRequest } from '../auth/auth-request';
import { EventsDb } from '../events/events-db';
import { EventsNoAck } from '../events/events-no-ack';
import { MonitoringEvent } from '../models/monitoring-event';
import { Logger } from '../utils-std-ts/logger';
import { ExpressWrapper } from './utils/express-wrapper';

const logger = new Logger('router/events-id-ack-post');

export const eventsIdAckPostRouter = ExpressWrapper.createRouter();

eventsIdAckPostRouter.post('/:id/ack', async (req: Request, res: Response, next: NextFunction) => {
  let errorCode = 500;
  await Promise.resolve()
    .then(async () => {
      if (!AuthRequest.isAuthenticated(req)) {
        errorCode = 403;
        throw new Error('Authentication failed');
      }
      const eventNoAck = await EventsNoAck.get(req.params.id);
      if (!eventNoAck) {
        errorCode = 404;
        throw new Error('Event not found');
      }
      const eventAck = new MonitoringEvent();
      eventAck.topic = MonitoringEvent.TOPIC_EVENT_ACK;
      eventAck.content = { id: req.params.id };
      await EventsDb.addEvent(eventAck);
      res.status(201).send({});
    })
    .catch(error => {
      logger.warn(error);
      res.status(errorCode).send({ error: error.message });
    });
  next();
});
