import * as _ from 'lodash';
import { config } from '../config/';
import { MonitoringEvent } from '../models/monitoring-event';
import { Logger } from '../utils-std-ts/logger';
import { EventsDb } from './events-db';

const logger = new Logger('events-db');

const LOGTAG = '[events-no-ack]';
let eventsNoAckList: MonitoringEvent[] = [];
let eventsPostponedProcessing: MonitoringEvent[] = [];

export class EventsNoAck {
  //
  public static init(): void {
    eventsNoAckList = [];
    logger.info(`Listening for Events`);

    EventsDb.listen((error, body, id) => {
      const event: MonitoringEvent = new MonitoringEvent(body);
      event.id = id;
      if (error) {
        logger.error(error);
        process.exit(1);
      } else {
        processEvent(body, id);
      }
    });
  }

  public static list(): Promise<any> {
    return Promise.resolve(_.cloneDeep(eventsNoAckList));
  }

  public static get(id: string): Promise<any> {
    for (const event of eventsNoAckList) {
      if (event.id === id) {
        return Promise.resolve(event);
      }
    }
    return Promise.resolve(null);
  }
}

function processEvent(event: MonitoringEvent, id: string): void {
  if (event.content.id === 'easysubtitles-translations-2018-06-01T00:24:24.584Z-2216') {
    logger.debug(`${event.topic} ${event.id}`);
  }
  if (event.id === 'easysubtitles-translations-2018-06-01T00:24:24.584Z-2216') {
    logger.debug(`${event.topic} ${event.id}`);
    console.log(event);
  }
  switch (event.topic) {
    case MonitoringEvent.TOPIC_EVENT_CREATE: {
      // logger.debug(`${event.topic} ${event.id}`);
      const position = indexInPendingArray(event.id);
      if (position >= 0) {
        eventsPostponedProcessing.splice(position, 1);
      } else {
        eventsNoAckList.push(event);
      }
      break;
    }
    case MonitoringEvent.TOPIC_EVENT_ACK: {
      // logger.debug(`${event.topic} ${event.content.id}`);
      const position = indexInNoAckArray(event.content.id);
      if (position >= 0) {
        eventsNoAckList.splice(position, 1);
      } else {
        eventsPostponedProcessing.push(event);
      }
      break;
    }
  }
}

function indexInNoAckArray(id: string) {
  for (let i = 0; i < eventsNoAckList.length; i++) {
    if (eventsNoAckList[i].id === id) {
      return i;
    }
  }
  return -1;
}

function indexInPendingArray(id: string) {
  for (let i = 0; i < eventsPostponedProcessing.length; i++) {
    if (eventsPostponedProcessing[i].content.id === id) {
      return i;
    }
  }
  return -1;
}
