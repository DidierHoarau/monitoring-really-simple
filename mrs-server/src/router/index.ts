import { config } from '../config';
import { eventsIdAckPostRouter } from './events-id-ack-post';
import { eventsNoAckGetRouter } from './events-no-ack-get';
import { eventsPostRouter } from './events-post';
import { ExpressWrapper } from './utils/express-wrapper';

export const router = ExpressWrapper.createRouter();

router.use(`${config.API_PATH}/events/`, eventsNoAckGetRouter);
router.use(`${config.API_PATH}/events/`, eventsPostRouter);
router.use(`${config.API_PATH}/events/`, eventsIdAckPostRouter);
