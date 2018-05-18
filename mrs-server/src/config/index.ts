import * as fs from 'fs';

const CONFIG_FILE = `${__dirname}/config-${process.env.NODE_ENV || 'default'}.json`;

class Config {
  //
  public readonly API_PATH: string = '/api';
  public eventsDbHost: string = 'http://mrs-events-db:5984';

  public constructor() {
    const content = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    if (content.eventsDbHost) {
      this.eventsDbHost = content.eventsDbHost;
    }
  }
}

export const config = new Config();
