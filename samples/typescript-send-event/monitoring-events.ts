import * as request from 'request';

export class MonitoringEvents {
  //
  public static send(json: IMonitoringEvent, server?: string): Promise<void> {
    if (!server) {
      server = 'http://mrs-proxy';
    }
    const url = `${server}/api/events/`;
    return new Promise((resolve, reject) => {
      request.post({ url, json }, (error, response) => {
        if (error) {
          reject(error);
        } else {
          if (response.statusCode < 300) {
            resolve();
          } else {
            reject(new Error(response.body));
          }
        }
      });
    });
  }
}

export interface IMonitoringEvent {
  tags: string[];
  content: any;
  origin: string;
  level: MonitoringLevel;
}

export enum MonitoringLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  functional = 'functional'
}
