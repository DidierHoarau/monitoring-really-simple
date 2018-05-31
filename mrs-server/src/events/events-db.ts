import * as _ from 'lodash';
import * as Nano from 'nano';
import { config } from '../config/';
import { MonitoringEvent } from '../models/monitoring-event';
import * as logger from '../utils/logger';

const nano = Nano({
  requestDefaults: {
    pool: {
      maxSockets: 3
    }
  },
  url: config.eventsDbHost
});
nano.db.create('mrs-events');
const db = nano.db.use('mrs-events');

export class EventsDb {
  //
  public static addEvent(event: MonitoringEvent): Promise<string> {
    return new Promise((resolve, reject) => {
      const id = EventsDb.generateDbId(event);
      event.id = id;
      db.insert(EventsDb.convertToDbFormat(event), id, error => {
        if (error) {
          reject(error);
        } else {
          resolve(id);
        }
      });
    });
  }

  public static getEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      db.list({ include_docs: true, sort: [{ date: 'desc' }] }, (error, body) => {
        if (error) {
          reject(error);
        } else {
          const eventsResult = [];
          for (let i = 0; i < body.rows.length; i++) {
            eventsResult.push(body.rows[body.rows.length - i - 1].doc);
          }
          resolve(eventsResult);
        }
      });
    });
  }

  public static listen(callback: any, since: number | Date = 0): void {
    const feed = db.follow({ since });
    feed.on('change', change => {
      db.get(change.id, (err, body) => {
        callback(err, body, change.id);
      });
    });
    feed.follow();
  }

  private static generateDbId(event: MonitoringEvent): string {
    return `${event.origin}-${event.date.toISOString()}-${Math.floor(Math.random() * 8999) + 1000}`;
  }

  private static convertToDbFormat(event: MonitoringEvent): any {
    return {
      content: event.content,
      date: event.date,
      id: event.id,
      level: event.level,
      origin: event.origin,
      tags: event.tags,
      topic: event.topic
    };
  }
}
