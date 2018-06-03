import { NextFunction, Request, Response, Router } from 'express';
import { AuthRequest } from '../auth/auth-request';
import { EventsNoAck } from '../events/events-no-ack';
import { Logger } from '../utils-std-ts/logger';
import { ExpressWrapper } from './utils/express-wrapper';

const logger = new Logger('router/events-no-ack');

export const eventsNoAckGetRouter = ExpressWrapper.createRouter();

eventsNoAckGetRouter.get('/no-ack', async (req: Request, res: Response, next: NextFunction) => {
  let errorCode = 500;
  await Promise.resolve()
    .then(async () => {
      if (!AuthRequest.isAuthenticated(req)) {
        errorCode = 403;
        throw new Error('Authentication failed');
      }
      const events = await EventsNoAck.list();
      res.status(200).send({ events });
    })
    .catch(error => {
      logger.warn(error);
      res.status(errorCode).send({ error: error.message });
    });
  next();
});
