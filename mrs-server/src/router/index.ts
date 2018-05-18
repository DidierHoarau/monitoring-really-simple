import { config } from '../config';
import { eventsGetRouter } from './events-get';
import { eventsPostRouter } from './events-post';
import { ExpressWrapper } from './utils/express-wrapper';

export const router = ExpressWrapper.createRouter();

router.use(`${config.API_PATH}/events/`, eventsGetRouter);
router.use(`${config.API_PATH}/events/`, eventsPostRouter);
