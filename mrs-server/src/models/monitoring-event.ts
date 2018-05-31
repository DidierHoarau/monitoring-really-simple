export class MonitoringEvent {
  //
  public static readonly TOPIC_EVENT_CREATE: string = 'events.create';
  public static readonly TOPIC_EVENT_ACK: string = 'events.ack';

  public id: string;
  public date: Date;
  public topic: string;
  public tags: string[];
  public content: any;
  public origin: string;
  public level: MonitoringLevel;
  public version: number;

  constructor(jsonFormat?: any) {
    const setIfSet = (attribute: string, defaultValue?: any) => {
      if (jsonFormat && jsonFormat[attribute]) {
        this[attribute] = jsonFormat[attribute];
      } else if (defaultValue) {
        this[attribute] = defaultValue;
      }
    };
    setIfSet('id');
    setIfSet('date', new Date());
    setIfSet('tags', []);
    setIfSet('topic', 'events.create');
    setIfSet('version', 1);
    setIfSet('content', {});
    setIfSet('origin', 'unknown_origin');
    setIfSet('level', MonitoringLevel.info);
  }
}

enum MonitoringLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  functional = 'functional'
}
