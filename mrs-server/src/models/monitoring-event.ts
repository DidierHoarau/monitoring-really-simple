export class MonitoringEvent {
  public date: Date;
  public tags: string[];
  public content: any;
  public origin: string;
  public level: MonitoringLevel;
}

enum MonitoringLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  functional = 'functional'
}
