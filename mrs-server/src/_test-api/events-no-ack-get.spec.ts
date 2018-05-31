import { config } from '../config';
import { HttpTools } from '../utils/http-tools';
import { Timeout } from '../utils/timeout';

describe('[API] Get Events', () => {
  //
  test('should get the last events', async () => {
    const url = `http://localhost:3000${config.API_PATH}/events/no-ack`;
    const json = true;
    await Timeout.wait(100);
    const events = await HttpTools.get({ json, url });
    expect(events).toHaveProperty('events');
  });
});
