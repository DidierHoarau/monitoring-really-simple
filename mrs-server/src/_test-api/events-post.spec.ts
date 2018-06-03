import { config } from '../config';
import { HttpTools } from '../utils-std-ts/http-tools';
import { Timeout } from '../utils-std-ts/timeout';
import { TestCommon } from './test-common';

const headers = TestCommon.getHeaders();

describe('[API] Post Events', () => {
  //
  test('should post a new event', async () => {
    const url = `http://localhost:3000${config.API_PATH}/events/`;
    const json = {
      content: { a: 'b', c: 'd' },
      level: 'info',
      origin: 'api-test',
      tags: ['test']
    };
    await Timeout.wait(100);
    await HttpTools.post({ headers, json, url });
  });

  test('should reject an event without the required field', async done => {
    const url = `http://localhost:3000${config.API_PATH}/events/`;
    const json = {
      level: 'info',
      origin: 'api-test',
      tags: ['test'],
      wrongcontent: { a: 'b', c: 'd' }
    };
    await Timeout.wait(100);
    await HttpTools.post({ headers, json, url })
      .then(() => {
        done(new Error('should have failed'));
      })
      .catch(error => {
        done();
      });
  });
});
