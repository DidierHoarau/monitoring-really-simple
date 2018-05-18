export class MonitoringEvent {
  //
  public date: Date;
  public tags: string[];
  public content: any;
  public origin: string;
  public level: MonitoringLevel;

  constructor(jsonFormat?: any) {
    const setIfSet = (attribute: string, defaultValue?: any) => {
      if (jsonFormat && jsonFormat[attribute]) {
        this[attribute] = jsonFormat[attribute];
      } else if (defaultValue) {
        this[attribute] = defaultValue;
      }
    };
    setIfSet('date', new Date());
    setIfSet('tags', []);
    setIfSet('content', {});
    setIfSet('origin', 'unknown_origin');
    setIfSet('level', MonitoringLevel.info);
  }

  public validateFormat(): void {}
}

enum MonitoringLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  functional = 'functional'
}
