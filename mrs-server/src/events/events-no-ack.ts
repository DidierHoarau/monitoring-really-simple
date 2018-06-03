import * as _ from 'lodash';
import { config } from '../config/';
import { MonitoringEvent } from '../models/monitoring-event';
import { Logger } from '../utils-std-ts/logger';
import { EventsDb } from './events-db';

const logger = new Logger('events-db');

const LOGTAG = '[events-no-ack]';
let eventsNoAckList: MonitoringEvent[] = [];

export class EventsNoAck {
  //
  public static init(): void {
    eventsNoAckList = [];
    logger.info(`Listening for Events`);
    EventsDb.listen((error, body, id) => {
      const event: MonitoringEvent = new MonitoringEvent(body);
      event.id = id;
      if (error) {
        return logger.error(error);
      }
      //
      switch (event.topic) {
        case MonitoringEvent.TOPIC_EVENT_CREATE: {
          eventsNoAckList.push(event);
          logger.debug(`${event.topic} ${event.id}`);
          break;
        }
        case MonitoringEvent.TOPIC_EVENT_ACK: {
          logger.debug(`${event.topic} ${event.content.id}`);
          for (let i = 0; i < eventsNoAckList.length; i++) {
            if (eventsNoAckList[i].id === event.content.id) {
              eventsNoAckList.splice(i, 1);
              return;
            }
          }
          break;
        }
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
