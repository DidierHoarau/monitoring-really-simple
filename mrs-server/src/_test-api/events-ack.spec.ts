import { config } from '../config';
import { HttpTools } from '../utils/http-tools';
import { Timeout } from '../utils/timeout';

describe('[API] Acknowldedge Events', () => {
  //
  test('should acknowledge an event event', async () => {
    let url = `http://localhost:3000${config.API_PATH}/events/`;
    const json = {
      content: { a: 'b', c: 'd' },
      level: 'info',
      origin: 'api-test-ack',
      tags: ['test']
    };
    await Timeout.wait(100);
    const response = await HttpTools.post({ json, url });
    expect(response).toHaveProperty('id');
    await Timeout.wait(100);
    url = `http://localhost:3000${config.API_PATH}/events/no-ack`;
    const nbNoAckBefore = (await HttpTools.get({ json: true, url })).events.length;
    url = `http://localhost:3000${config.API_PATH}/events/${response.id}/ack`;
    await HttpTools.post({ json: {}, url });
    await Timeout.wait(100);
    url = `http://localhost:3000${config.API_PATH}/events/no-ack`;
    const nbNoAckAfter = (await HttpTools.get({ json: true, url })).events.length;
    expect(nbNoAckAfter).toEqual(nbNoAckBefore - 1);
  });
});
