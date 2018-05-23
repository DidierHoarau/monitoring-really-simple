import * as Nano from 'nano';
import { config } from '../config/';
import * as _ from 'lodash';
import { MonitoringEvent } from '../models/monitoring-event';
import * as logger from '../utils/logger';

const nano = Nano({
  url: config.eventsDbHost,
  requestDefaults: {
    pool: {
      maxSockets: 3
    }
  }
});
nano.db.create('mrs-events');
const db = nano.db.use('mrs-events');
let eventQueue = [];
let isProcessingEvent = false;

export class EventsDb {
  //
  public static addEvent(event: MonitoringEvent): Promise<void> {
    return new Promise((resolve, reject) => {
      db.insert(EventsDb.convertToDbFormat(event), EventsDb.generateDbId(event), error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public static getEvents(limit: number) {
    return new Promise((resolve, reject) => {
      db.list({ include_docs: true, limit, sort: [{ date: 'desc' }] }, (error, body) => {
        if (error) {
          reject(error);
        } else {
          const eventsResult = [];
          for (const event of body.rows) {
            eventsResult.push(event.doc);
          }
          resolve(eventsResult);
        }
      });
    });
  }

  private static generateDbId(event: MonitoringEvent): string {
    return `${event.origin}-${event.date.toISOString()}-${Math.floor(Math.random() * 8999) + 1000}`;
  }

  private static convertToDbFormat(event: MonitoringEvent): any {
    return {
      content: event.content,
      date: event.date,
      origin: event.origin,
      level: event.level,
      tags: event.tags
    };
  }
}
