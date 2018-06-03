import * as bodyParser from 'body-parser';
import { NextFunction, Request, Response, Router } from 'express';
import * as url from 'url';
import { config } from './config';
import { EventsNoAck } from './events/events-no-ack';
import { router } from './router';
import { ExpressWrapper } from './router/utils/express-wrapper';
import { Logger } from './utils-std-ts/logger';

const logger = new Logger('app');

logger.info(`====== Starting MRS Server ======`);

EventsNoAck.init();

const api = ExpressWrapper.createApi();
const PORT = 80;

api.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
});

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Authorization');
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate');
  next();
});

api.use((req: any, res: Response, next: NextFunction) => {
  res.status(404);
  req.customApiLogging = { startDate: new Date() };
  logger.info(`${req.method} ${url.parse(req.url).pathname}`);
  next();
});

api.use(bodyParser.json());

api.use(router);

router.use((req: any, res: Response, next: NextFunction) => {
  logger.info(
    `API Response: ${res.statusCode}; ${new Date().getTime() -
      req.customApiLogging.startDate.getTime()}ms`
  );
  next();
});
